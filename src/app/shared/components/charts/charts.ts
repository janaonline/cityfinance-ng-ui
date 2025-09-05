import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { ChartConfig } from './chart-interfaces';
// Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  // imports: [],
  templateUrl: './charts.html',
  styleUrls: ['./charts.scss'],
})
export class Charts implements AfterViewInit, OnDestroy {

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() chartConfig: ChartConfig;
  chartInstance: Chart | undefined;


  constructor() {

    console.log("constru");
  }

  // ngOnInti() {
  //   console.log("on init called", this.chartConfig);
  // }

  // ngOnChanges(changes: SimpleChange) {
  //   console.log("changes: ", changes, this.chartConfig)
  // }

  ngAfterViewInit(): void {
    console.log("afterviwe called", this.chartConfig);
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  private createChart(): void {
    // console.log('Canvas element:', this.chartCanvas);
    console.log('Chart called: ', this.chartConfig);
    if (!this.chartCanvas) {
      // console.error(
      //   'Canvas element not found for chart:',
      //   this.chartConfig().chartId
      // );
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context for canvas.');
      return;
    }

    // Destroy existing chart instance if any (for updates later)
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const config = this.chartConfig;

    switch (config.chartType) {
      case 'barChart':
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: config.labels,
            datasets: config.datasets,
          },
          options: config.options,
          // config.options || baseChartOptions(DEFAULT_FONT_FAMILY, true, 'Years', 'Amt in ₹ Cr'),
        });
        break;
      case 'lineChart':
        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: config.labels,
            datasets: config.datasets,
          },
          options: config.options,
          // config.options || baseChartOptions(DEFAULT_FONT_FAMILY, true, 'Months', 'Amt in ₹ Cr'),
        });
        break;
      case 'pieChart':
        this.chartInstance = new Chart(ctx, {
          type: 'doughnut', // Or 'pie' based on actual usage
          data: {
            labels: config.labels,
            datasets: config.datasets,
          },
          options: config.options,
          // options: config.options || baseChartOptions(DEFAULT_FONT_FAMILY, false, '', ''),
        });
        break;
      // case 'mixedChart':
      //   this.chartInstance = new Chart(ctx, {
      //     type: 'bar',
      //     data: config.data,
      //     options: config.options,
      //     // config.options || baseChartOptions(DEFAULT_FONT_FAMILY, true, 'Revenue', 'Amt in ₹ Cr'),
      //   });
      //   break;
      // For gauge chart use gaugeChartOptions
      case 'gaugeChart':
        const plugins = [];
        // if (config.options?.plugins?.customDataLabel?.enabled) {
        //   plugins.push(this.customDataLabel);
        // }

        this.chartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: config.labels,
            datasets: config.datasets,
          },
          options: config.options,
          plugins,
        });
        break;
      case 'scatterChart':
        this.chartInstance = new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: config.datasets, // No labels for scatter
          },
          options: config.options,
        });
        break;
      default:
        console.warn(`Unknown chart type: ${config.chartType}`);
        break;
    }
  }

  // Helper: To add text on pie chart.
  customDataLabel = {
    id: 'customDataLabel',
    afterDatasetsDraw(chart: Chart) {
      const pluginOpts = chart.options.plugins?.customDataLabel;
      if (!pluginOpts?.enabled) return;

      const format = pluginOpts.format || '';
      const { ctx } = chart;

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);

        meta.data.forEach((element, index) => {
          const rawValue = Number(dataset.data[index]);
          if (rawValue) {
            const label = `${rawValue}${format}`;
            // const position = element.tooltipPosition(true);

            ctx.font = '500 10px Montserrat';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // ctx.fillText(label, position.x, position.y);
          }
        });
      });
    }
  };


  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    // this.chartChangeEffect.destroy();
  }
}