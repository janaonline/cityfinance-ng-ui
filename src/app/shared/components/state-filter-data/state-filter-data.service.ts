import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { retry, catchError, map, filter, switchMap, tap } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { CommonService } from "../../services/common.service";
import Chart from "chart.js";
// ./shared/services/common.service
@Injectable({
  providedIn: "root",
})
export class StateFilterDataService {

  croreBarChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        maxBarThickness: 60,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            labelString:"City Ranking",
            fontStyle: 'bold'
          },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString:"Amount (Cr.)",
          fontStyle: 'bold'
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
      /* Formatting the value of the column as a number with the correct format for India. */
        callback: function(value, index, values) {
          return new Intl.NumberFormat("en-IN").format(value);
        }
      }
      }]
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log('function', tooltipItem, data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          console.log('dataset', dataset);
          var currentValue = dataset.data[tooltipItem.index];
          console.log('currentValue', currentValue);
          // currentValue = currentValue > 0 ? (currentValue / 10000000).toFixed(2) : 0;
          // return new Intl.NumberFormat("en-IN").format(currentValue);
          return currentValue;
        },
      },
    },
    animation: {
      onComplete: function (animation) {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.fillStyle = "#6E7281";
        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontSize,
          Chart.defaults.global.defaultFontStyle,
          Chart.defaults.global.defaultFontFamily
        );
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
  
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          if (meta.type == "line") return true;
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            // data = data > 0 ? (data / 10000000).toFixed(2) : 0;
            ctx.fillText("₹ " + data, bar._model.x, bar._model.y - 5);
          });
        });
        console.log(animation, "animation");
      },
    }
  };
  lakhBarChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        maxBarThickness: 60,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            labelString:"City Ranking",
            fontStyle: 'bold'
          },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString:"Amount (in Lakhs)",
          fontStyle: 'bold'
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
      /* Formatting the value of the column as a number with the correct format for India. */
        callback: function(value, index, values) {
          return new Intl.NumberFormat("en-IN").format(value);
        }
      }
      }]
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log('function', tooltipItem, data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          console.log('dataset', dataset);
          var currentValue = dataset.data[tooltipItem.index];
          // currentValue = currentValue > 0 ? (currentValue / 1000000).toFixed(2) : 0;
          console.log('currentValue', currentValue);
          // return new Intl.NumberFormat("en-IN").format(currentValue);
          return currentValue;
        },
      },
    },
    animation: {
      onComplete: function (animation) {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.fillStyle = "#6E7281";
        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontSize,
          Chart.defaults.global.defaultFontStyle,
          Chart.defaults.global.defaultFontFamily
        );
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
  
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          if (meta.type == "line") return true;
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            // data = data > 0 ? (data / 1000000).toFixed(2) : 0;
            ctx.fillText("₹ " + data, bar._model.x, bar._model.y - 5);
          });
        });
        console.log(animation, "animation");
      },
    }
  };
  defaultBarChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        maxBarThickness: 60,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            labelString:"City Ranking",
            fontStyle: 'bold'
          },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString:"Amount (in INR)",
          fontStyle: 'bold'
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
      /* Formatting the value of the column as a number with the correct format for India. */
        callback: function(value, index, values) {
          return new Intl.NumberFormat("en-IN").format(value);
        }
      }
      }]
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log('function', tooltipItem, data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          console.log('dataset', dataset);
          var currentValue = Number(dataset.data[tooltipItem.index]);
          console.log('currentValue', currentValue);
          return new Intl.NumberFormat("en-IN").format(currentValue);
        },
      },
    },
    animation: {
      onComplete: function (animation) {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.fillStyle = "#6E7281";
        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontSize,
          Chart.defaults.global.defaultFontStyle,
          Chart.defaults.global.defaultFontFamily
        );
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
  
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          if (meta.type == "line") return true;
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            console.log('data', data)
            ctx.fillText("₹ " + data, bar._model.x, bar._model.y - 5);
          });
        });
        console.log(animation, "animation");
      },
    }
  };
  
  stateLevelDashboardAPIs: any []
  constructor(private http: HttpClient,
    private commonService: CommonService) {}

  getScatterdData(payload: any, apiEndPoint: string) {
    // return this.http.post(environment.api.url + "/state-revenue", payload);
    return this.http.post(environment.api.url + `${apiEndPoint}`, payload);
  }

  getRevID() {
    return this.http.get(environment.api.url + "LineItem");
  }

  getServiceDropDown(type) {
    return this.http.get(
      environment.api.url + `state-list-of-indics?type=${type}`
    );
  }

  getStateUlbsGroupedByPopulation(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(
      `${environment.api.url}state-ulbs-grouped-by-population`, {
        params: bodyParams,
      }
    );
  }

  getStateRevenueForDifferentTabs(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(
      `${environment.api.url}state-revenue-tabs`, {
        params: bodyParams,
      }
    );
  }

  getStateWiseFYs(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(
      `${environment.api.url}get-FYs-with-specification`, {
        params: bodyParams,
      }
    );
  }


  handleError(error: any) {
    console.log("error", error);
    return throwError(error.message || "SERVER ERROR");
  }
}
