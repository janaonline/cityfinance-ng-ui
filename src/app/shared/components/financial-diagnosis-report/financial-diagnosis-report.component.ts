import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import Chart from "chart.js";

import {
  IAfsFinancialMetricsRow,
  IFinancialDiagnosisReportData,
} from "src/app/models/financial-diagnosis/afsFinancialMetrics";
import {
  calculateCagr,
  formatCrore,
  formatIndianNumber,
  formatPercent,
} from "src/app/util/financialDiagnosisFormat.util";

const EMPTY_ROW: IAfsFinancialMetricsRow = {
  ulb_code: "",
  ulb_name: "",
  state_name: "",
  financial_year: "",
  ulb_type: "",
};

/**
 * A PDF is a flat image, so there's no such thing as a chart tooltip on
 * hover once it's exported - the closest equivalent is baking the actual
 * value onto each bar/point directly (which is also what the source AFS
 * template does). This plugin draws that label after Chart.js finishes its
 * own drawing, for every dataset in the chart it's attached to.
 */
const valueLabelPlugin = {
  id: "valueLabels",
  afterDatasetsDraw(chart: any): void {
    const ctx: CanvasRenderingContext2D = chart.ctx;
    chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (meta.hidden) return;

      meta.data.forEach((element: any, index: number) => {
        const value = dataset.data[index];
        if (value === null || value === undefined) return;

        const label = formatIndianNumber(value, 0);
        const position = element.tooltipPosition();
        const isLine = dataset.type === "line" || chart.config.type === "line";

        ctx.save();
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        const x = position.x;
        const y = position.y - (isLine ? 10 : 4);

        // The line's own label gets a small background pill so it stays
        // legible (and unambiguously "belongs to the line") even where its
        // dot sits close to a bar's own value label right above it.
        if (isLine) {
          const width = ctx.measureText(label).width;
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.fillRect(x - width / 2 - 3, y - 11, width + 6, 13);
        }

        ctx.fillStyle = isLine ? dataset.borderColor || "#1f2d3d" : "#1f2d3d";
        ctx.fillText(label, x, y);
        ctx.restore();
      });
    });
  },
};

/**
 * Printable, app-themed "Urban Local Body - Financial Diagnosis" one-pager,
 * modelled on the sample AFS report template. Meant to be rendered
 * off-screen and captured to PDF via `exportElementToPdf()` - see
 * `dalgo.component.ts` for how it's wired up on the city-brief screen.
 */
@Component({
  standalone: true,
  selector: "app-financial-diagnosis-report",
  templateUrl: "./financial-diagnosis-report.component.html",
  styleUrls: ["./financial-diagnosis-report.component.scss"],
  imports: [CommonModule],
})
export class FinancialDiagnosisReportComponent implements OnChanges, AfterViewInit {
  @Input() data: IFinancialDiagnosisReportData | null = null;

  // Not `static: true`: the root element sits behind `*ngIf="data"` in the
  // template, so it only exists (and this query only resolves) once report
  // data has actually arrived.
  @ViewChild("reportRoot") reportRoot?: ElementRef<HTMLElement>;
  @ViewChild("propertyTaxCanvas") private propertyTaxCanvasRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild("incomeExpenditureCanvas") private incomeExpenditureCanvasRef?: ElementRef<HTMLCanvasElement>;

  readonly cr = formatCrore;
  readonly pct = formatPercent;
  readonly num = formatIndianNumber;
  readonly generatedOn = new Date();

  private propertyTaxChart?: Chart;
  private incomeExpenditureChart?: Chart;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.data) {
      this.renderCharts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data && this.viewReady) {
      // Let the table/canvas elements re-render with the new @Input before drawing.
      setTimeout(() => this.renderCharts(), 0);
    }
  }

  get years(): string[] {
    return this.data?.years || [];
  }

  row(year: string): IAfsFinancialMetricsRow {
    return this.data?.yearlyData?.[year] || EMPTY_ROW;
  }

  cagrRow(): IAfsFinancialMetricsRow {
    return this.data?.cagr || EMPTY_ROW;
  }

  /**
   * A year counts as "available" when the report has any revenue or
   * expenditure figure for it. (A lighter-weight stand-in for Dataset 1's
   * per-line-item availability check, which is a separate query.)
   */
  isYearAvailable(year: string): boolean {
    const row = this.data?.yearlyData?.[year];
    return !!row && (row.totalRevenue != null || row.totalExpenditure != null);
  }

  surplusDeficit(year: string): number | null {
    const row = this.row(year);
    if (row.totalRevenue == null || row.totalExpenditure == null) return null;
    return row.totalRevenue - row.totalExpenditure;
  }

  /** Surplus/Deficit isn't one of the API's Dataset 2 columns, so its CAGR is computed here. */
  surplusDeficitCagr(): number | null {
    if (!this.years.length) return null;
    const base = this.surplusDeficit(this.years[0]);
    const latest = this.surplusDeficit(this.years[this.years.length - 1]);
    return calculateCagr(base, latest);
  }

  private renderCharts(): void {
    this.renderPropertyTaxChart();
    this.renderIncomeExpenditureChart();
  }

  private renderPropertyTaxChart(): void {
    const canvas = this.propertyTaxCanvasRef?.nativeElement;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    this.propertyTaxChart?.destroy();

    // The trend endpoint (`property-tax/:ulbId/collection-trend`) covers its
    // own 6-year range (2018-19 to 2023-24), independent of the 4-year tables
    // above. Fall back to the 4 report years (from the ledger dump/AFS value)
    // only if that endpoint returned nothing.
    const trend = this.data?.propertyTaxTrend;
    const labels = trend?.length ? trend.map((point) => point.financialYear) : this.years;
    const values = trend?.length
      ? trend.map((point) => (point.valueInRupees != null ? point.valueInRupees / 1_00_00_000 : null))
      : this.years.map((year) => {
          const value = this.row(year).propertyTax;
          return value != null ? value / 1_00_00_000 : null;
        });

    this.propertyTaxChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Property Tax* (Cr.)",
            data: values,
            backgroundColor: "#059b9a",
          },
        ],
      },
      plugins: [valueLabelPlugin],
      options: {
        maintainAspectRatio: false,
        // No animation: the chart must be fully painted the instant it's
        // created, since it gets screenshotted into the PDF moments later.
        animation: { duration: 0 },
        legend: { display: false },
        title: { display: true, text: "Property Tax* (Cr.)", fontColor: "#095169" },
        layout: { padding: { top: 16 } }, // room for the value label above the tallest bar
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
        },
      },
    });
  }

  private renderIncomeExpenditureChart(): void {
    const canvas = this.incomeExpenditureCanvasRef?.nativeElement;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    this.incomeExpenditureChart?.destroy();

    const revenue = this.years.map((year) => (this.row(year).totalRevenue ?? 0) / 1_00_00_000);
    const expenditure = this.years.map(
      (year) => (this.row(year).totalExpenditure ?? 0) / 1_00_00_000
    );
    const surplusDeficit = this.years.map((year) => {
      const value = this.surplusDeficit(year);
      return value != null ? value / 1_00_00_000 : 0;
    });

    // The Surplus/Deficit line plots on its own right-hand axis, scaled
    // independently from the Revenue/Expenditure bars' left-hand axis. Left
    // to auto-scale, the two axes can coincidentally line the dot up right
    // next to a bar's own value label, making the two look like they belong
    // to the same series. Padding the line's axis range pushes it clear of
    // the bar tops so each value reads unambiguously.
    const maxAbsSurplus = Math.max(...surplusDeficit.map((value) => Math.abs(value)), 1);

    this.incomeExpenditureChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.years,
        datasets: [
          {
            type: "bar",
            label: "Total Revenue",
            data: revenue,
            backgroundColor: "#095169",
            yAxisID: "y-amount",
          },
          {
            type: "bar",
            label: "Total Expenditure",
            data: expenditure,
            backgroundColor: "#059b9a",
            yAxisID: "y-amount",
          },
          {
            type: "line",
            label: "Surplus/Deficit",
            data: surplusDeficit,
            borderColor: "#F5B742",
            backgroundColor: "#F5B742",
            fill: false,
            yAxisID: "y-surplus",
          },
        ],
      },
      plugins: [valueLabelPlugin],
      options: {
        maintainAspectRatio: false,
        animation: { duration: 0 },
        title: {
          display: true,
          text: "Income Expenditure Analysis: Surplus/Deficit",
          fontColor: "#095169",
        },
        legend: { position: "bottom" },
        layout: { padding: { top: 16 } },
        scales: {
          yAxes: [
            { id: "y-amount", position: "left", ticks: { beginAtZero: true } },
            {
              id: "y-surplus",
              position: "right",
              gridLines: { display: false },
              ticks: {
                suggestedMax: maxAbsSurplus * 2.2,
                suggestedMin: Math.min(0, -maxAbsSurplus * 0.5),
              },
            },
          ],
        },
      },
    });
  }
}
