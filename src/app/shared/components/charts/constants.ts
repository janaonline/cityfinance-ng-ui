// import 'chart.js';
import { ChartOptions, ChartType, Chart } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.register(...registerables, ChartDataLabels);

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    customDataLabel?: {
      enabled: boolean;
      format: string;
    };
  }
}

export const DEFAULT_FONT_FAMILY = 'Montserrat';
const TEXT_LIGHT = '#374151';
const DEFAULT_FONT_SIZE = 11;
export const baseChartOptions = (
  fontFamily = 'DEFAULT_FONT_FAMILY',
  showAxes = true,
  xAxisLabel = 'X Axis',
  yAxisLabel = 'Y Axis',
  showLabelOnChart = false,
  label = '',
): any => ({
  responsive: true,
  maintainAspectRatio: false,
  // aspectRatio: 1,
  font: { family: fontFamily, size: 11 },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    customDataLabel: {
      enabled: showLabelOnChart,
      format: label
    },
    datalabels: {
      display: false, // Ensure labels are always displayed
      color: 'black', // Set label color
      anchor: 'end', // Position the label at the end of the bar
      align: 'top', // Align the label to the top of the bar
      // formatter: function (value, context) {
      //   return value; // Display the data value as the label
      // }
    },
    legend: { labels: { font: { family: fontFamily, size: 12 } }, position: "bottom", },
    tooltip: {
      titleFont: { family: fontFamily },
      bodyFont: { family: fontFamily },
    },
  },
  layout: { padding: 5 },
  scales: {
    x: {
      display: showAxes,
      ticks: { font: { family: fontFamily } },
      title: {
        display: showAxes,
        text: xAxisLabel,
        font: {
          family: fontFamily,
          size: DEFAULT_FONT_SIZE,
          weight: 'bold',
        },
        color: TEXT_LIGHT,
      },
    },
    y: {
      grace: '5%',
      display: showAxes,
      ticks: { font: { family: fontFamily } },
      title: {
        display: showAxes,
        text: yAxisLabel,
        font: {
          family: fontFamily,
          size: DEFAULT_FONT_SIZE,
          weight: 'bold',
        },
        color: TEXT_LIGHT,
      },
      afterDataLimits: (axis) => {
        if (axis.max < 10) {
          axis.max = 10;
        }
      }
    },
  },
});

export const gaugeChartOptions: any = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  circumference: 180,
  rotation: 270,
  cutout: '55%',
  plugins: {
    datalabels: {
      display: false,
    },
    legend: { display: false },
    tooltip: {
      filter: (tooltipItem) => tooltipItem.dataIndex === 0,
    },
  },
};
