import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalcType, IFinancialIndicatorInfo, IFinancialIndicatorRes, IFinancialIndicatorsChart, LineItemType } from 'src/app/models/interface';
import { IULB } from 'src/app/models/ulb';
import { ChartConfig, ChartResStruct } from 'src/app/shared/components/charts/chart-interfaces';
import { baseChartOptions, DEFAULT_FONT_FAMILY } from 'src/app/shared/components/charts/constants';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
  ) { }


  subButtons = [
    { key: 'totRev', label: 'Total Revenue' },
    { key: 'revPerCapita', label: 'Revenue per Capita' },
    { key: 'revMix', label: 'Revenue Mix' },
  ];
  myForm!: FormGroup;
  chartsData: ChartConfig[] = [];
  output: ChartResStruct | undefined = undefined;
  dialogResult!: IFinancialIndicatorsChart;
  compareUlbsFromPopup!: IULB[] | undefined;
  compareTypeFromPopup!: string;
  years: string[] = ["2021-22", "2022-23", "2023-24"]; // TODO: do a api call
  ulbIdSignal = '5f5610b3aab0f778b2d2cac0'; // TODO: get this from query params?
  currentSelectedButtonKey: LineItemType = 'revenue';
  subButton: string = 'totRev';
  infoMsg: IFinancialIndicatorInfo = { msg: '', text: 'success' };
  isChartLoading: boolean = false;
  isChartDataAvailable: boolean = false;

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.myForm = this.fb.group({ year: [this.years[0]] });
    // this.isLoading.set(false);
    this.getChartData();

    this.myForm.get('year')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.getChartData()
      })
  }
  // Create chart.
  private getChartData(): void {
    this.isChartLoading = true;

    // Create body/ payload structure.
    const body = this.createBodyStructure();
    console.log("body: ", body)

    // Don't call API if year is unavailable.
    if (body.years.length > 0) {

      this.dashboardService.getFinancialIndicatorsChartData(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (apiRes: IFinancialIndicatorRes) => {
            console.log("api res - ", apiRes)
            const res = apiRes.data;

            // Check if data is available.
            if (!apiRes.success) { this.isChartDataAvailable = false }
            else {
              this.infoMsg = apiRes.data.info;

              this.isChartDataAvailable = true;
              if (res.chartType === 'barChart') {
                const structureData = this.buildBarChartConfigurations(res);
                this.chartsData = structureData;
                console.log("chart data = ", this.chartsData)
              }
              else if (res.chartType === 'gaugeChart' && this.getcalcType() === 'mix') {
                const structureData = this.buildGaugeChartConfigurations(res);
                this.chartsData = structureData;
              }
            }

            this.isChartLoading = false;
          },
          error: () => {
            console.error('Failed to create chart.');
            this.isChartLoading = false;
          },
        })

    }
  }

  // Helper: Consolidate all the data - payload/ body for the API.
  private createBodyStructure(): IFinancialIndicatorsChart {
    const { compareType = 'state', calcType = this.getcalcType(), compareUlbs = [], compareUlbsObj } = this.dialogResult ?? {};
    this.compareUlbsFromPopup = compareUlbsObj;
    this.compareTypeFromPopup = compareType;

    // If 'mix' then only one year data has to be fetched.
    const body: IFinancialIndicatorsChart = {
      years: this.getcalcType() === 'mix' ? [this.getYear()] : this.createYearsArr(),
      compareType,
      ulbId: this.ulbIdSignal,
      lineItem: this.currentSelectedButtonKey,
      calcType,
      compareUlbs
    };

    return body;
  }

  // Helper: Based on current year selected create years array with T, T-2, T-1.
  private createYearsArr(): string[] {
    const yearStr: string = this.myForm.get('year')?.value;

    if (!yearStr || !/^\d{4}-\d{2}$/.test(yearStr)) {
      // console.warn('Invalid year format. Expected format: YYYY-YY');
      return [];
    }

    const endYear = parseInt(yearStr.slice(0, 4), 10);

    const minYear = 2015;
    const years: string[] = [];

    for (let i = 2; i >= 0; i--) {
      const start = endYear - i;
      if (start < minYear) {
        continue;
      }
      const end = (start + 1).toString().slice(-2);
      years.push(`${start}-${end}`);
    }

    return years;
  }

  // Helper: Add additional options to the API res - Bar chart.
  private buildBarChartConfigurations(chartData: ChartResStruct): ChartConfig[] {
    // Set chart output state
    this.output = chartData;
    // console.log('chart data', chartData)

    // Initialize chart config object
    const config: ChartConfig = {
      chartId: `${chartData.chartType}_0`,
      chartType: chartData.chartType,
      labels: chartData.labels,
      datasets: [],
      options: baseChartOptions(DEFAULT_FONT_FAMILY, true, chartData.axes?.x, chartData.axes?.y),
    };

    // Populate datasets based on type
    for (const chart of chartData.data) {
      const barThickness = chart.data.length < 3 ? { barThickness: 60 } : {}

      const dataset: any = {
        type: chart.type,
        label: chart.label,
        data: chart.data,
      };

      if (chart.type === 'line') {
        Object.assign(dataset, {
          borderColor: chart.backgroundColor?.[0],
          pointBackgroundColor: chart.backgroundColor?.[0],
          borderWidth: 2,
          fill: false,
          tension: 0.3,
        });
      } else {
        Object.assign(dataset, {
          backgroundColor: chart.backgroundColor?.[0],
          borderRadius: 5,
          ...barThickness
        });
      }

      config.datasets.push(dataset);
    }

    return [config];
  }

  // Return selected year.
  private getYear() {
    return this.myForm.get('year')?.value;
  }

  // Get calcType based on sub button selected.
  private getcalcType(): CalcType {
    const subBtn = this.subButton;

    if (['totRev', 'totOwnRev', 'totRevex', 'capex',].includes(subBtn)) return 'total';
    else if (['revPerCapita', 'ownRevPerCapita', 'revexPerCapita', 'capexPerCapita',].includes(subBtn)) return 'perCapita';
    // else if (['revMix', 'ownRevMix', 'revexMix'].includes(subBtn)) return 'mix';
    return 'mix';
  }


  // Helper: Add additional options to the API res - Gauge chart.
  private buildGaugeChartConfigurations(res: ChartResStruct): ChartConfig[] {
    this.chartsData = [];
    this.output = res;

    const config: ChartConfig[] = res.data.map((chart, idx) => {
      return {
        chartId: `${res.chartType}_${idx}`,
        chartType: `${res.chartType}`,
        datasets: [
          {
            label: chart.label,
            data: chart.data,
            backgroundColor: res.legendColors,
            borderRadius: 3,
            borderWidth: 1,
          },
        ],
        options: baseChartOptions(DEFAULT_FONT_FAMILY, false, '', '', true, '%'),
      }
    })

    console.log("config: ", config);

    return config;
  }

  // tab change.
  btnClick(key: string) {
    this.subButton = key;
    this.getChartData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}