import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { retry, catchError, map, filter, switchMap, tap } from "rxjs/operators";
import { BehaviorSubject, of, throwError } from "rxjs";
import { CommonService } from "../../services/common.service";
import Chart from "chart.js";
// ./shared/services/common.service
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
@Injectable({
  providedIn: "root",
})
export class StateFilterDataService {
  croreBarChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          maxBarThickness: 60,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            // labelString: "City Ranking",
            labelString: "Cities",
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Amount (Cr.)",
            fontStyle: "bold",
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            /* Formatting the value of the column as a number with the correct format for India. */
            callback: function (value, index, values) {
              return new Intl.NumberFormat("en-IN").format(value);
            },
          },
          afterDataLimits: function (axis) {
            axis.max += 5;
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log("function", tooltipItem, data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          console.log("dataset", dataset);
          var currentValue = dataset.data[tooltipItem.index];
          console.log("currentValue", currentValue);
          // currentValue = currentValue > 0 ? (currentValue / 10000000).toFixed(2) : 0;
          // return new Intl.NumberFormat("en-IN").format(currentValue);
          // return currentValue;
          return `₹ ${currentValue} Cr.`
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
            ctx.fillText("₹ " + data + " Cr.", bar._model.x, bar._model.y - 5);
          });
        });
        console.log("animation", animation);
      },
    },
  };
  lakhBarChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          maxBarThickness: 60,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            // labelString: "City Ranking",
            labelString: "Cities",
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Amount (in Lakhs)",
            fontStyle: "bold",
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            /* Formatting the value of the column as a number with the correct format for India. */
            callback: function (value, index, values) {
              return new Intl.NumberFormat("en-IN").format(value);
            },
          },
          afterDataLimits: function (axis) {
            axis.max += 5;
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log("function", tooltipItem, data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          console.log("dataset", dataset);
          var currentValue = dataset.data[tooltipItem.index];
          // currentValue = currentValue > 0 ? (currentValue / 1000000).toFixed(2) : 0;
          console.log("currentValue", currentValue);
          // return new Intl.NumberFormat("en-IN").format(currentValue);
          // return currentValue;
          return `₹ ${currentValue} Lakh`
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
            ctx.fillText("₹ " + data + " Lakh", bar._model.x, bar._model.y - 5);
          });
        });
        console.log(animation, "animation");
      },
    },
  };
  defaultBarChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          maxBarThickness: 60,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            // labelString: "City Ranking",
            labelString: "Cities",
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Amount (in INR)",
            fontStyle: "bold",
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            /* Formatting the value of the column as a number with the correct format for India. */
            callback: function (value, index, values) {
              return new Intl.NumberFormat("en-IN").format(value);
            },
          },
          afterDataLimits: function (axis) {
            console.log("afterDataLimits", axis);
            // axis.max += 5;

            var data = axis?.chart?.config?.data?.datasets[0]?.data;
            console.log("data", data);
            var maxCount = Math.max(...data);
            var minCount = Math.min(...data);
            console.log("maxCount", maxCount, "minCount", minCount);
            // axis.max = axis.max + (minCount && minCount >= 100000) ? Math.floor(minCount/6) : 50;
            axis.max =
              axis.max +
              (minCount && minCount >= 100000 ? Math.floor(minCount / 2) : 50);
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log("function", tooltipItem, data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          console.log("dataset", dataset);
          var currentValue = Number(dataset.data[tooltipItem.index]);
          console.log("currentValue", currentValue);
          return `₹ ${new Intl.NumberFormat("en-IN").format(currentValue)}`;
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
            // console.log('data', data)
            var value = Number(data);

            let currentValue = new Intl.NumberFormat("en-IN").format(value);

            ctx.fillText("₹ " + currentValue, bar._model.x, bar._model.y - 5);
          });
        });
        console.log(animation, "animation");
      },
    },
  };

  serviceLevelBenchmarkBarChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          maxBarThickness: 60,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            // labelString: "City Ranking",
            labelString: "Cities",
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Percentage",
            fontStyle: "bold",
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            /* Formatting the value of the column as a number with the correct format for India. */
            callback: function (value, index, values) {
              return value;
              // return new Intl.NumberFormat("en-IN").format(value);
            },
          },
          afterDataLimits: function (axis) {
            axis.max += 5;
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log("function", tooltipItem, data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          console.log("dataset", dataset);
          var currentValue = Number(dataset.data[tooltipItem.index]);
          console.log("currentValue", currentValue);
          return `${Math.round(currentValue)} %`;
          // return `${currentValue.toFixed(2)} %`;
          // return new Intl.NumberFormat("en-IN").format(currentValue);
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
            console.log("data", data);
            // data.toFixed(2) + " %",
            ctx.fillText(
              Math.round(data) + " %",
              bar._model.x,
              bar._model.y - 5
            );
          });
        });
        console.log(animation, "animation");
      },
    },
  };

  stateLevelDashboardAPIs: any[];

  nationLevelScatterDataSet = {
    label: "National Average",
    data: [],
    rev: [],
    labels: ["National Average"],
    showLine: true,
    fill: false,
    backgroundColor: "#11BC46",
    borderColor: "#11BC46",
  };

  scatterData = {
    type: "scatter",
    data: {
      datasets: [
        {
          labels: [],
          rev: [],
          label: "Municipality",
          data: [],
          showLine: false,
          fill: true,
          borderColor: "#1EBFC6",
          backgroundColor: "#1EBFC6",
        },
        {
          labels: [],
          rev: [],
          label: "Municipal Corporation",
          data: [],
          showLine: false,
          fill: true,
          borderColor: "#3E5DB1",
          backgroundColor: "#3E5DB1",
        },
        {
          label: "Town Panchayat",
          labels: [],
          rev: [],
          data: [],
          showLine: false,
          fill: true,
          borderColor: "#F5B742",
          backgroundColor: "#F5B742",
        },
        {
          label: "State Average",
          data: [],
          rev: [],
          labels: ["State Average"],
          showLine: true,
          fill: true,
          backgroundColor: "red",
          borderColor: "red",
        },
      ],
    },
  };

  ulbTypeAvgScatterDataSet = [
    {
      label: "Municipal Corporation Average",
      data: [],
      rev: [],
      labels: ["Municipal Corporation Average"],
      showLine: true,
      fill: true,
      backgroundColor: "#11BC46",
      borderColor: "#11BC46",
    },
    {
      label: "Municipality Average",
      data: [],
      rev: [],
      labels: ["Municipality Average"],
      showLine: true,
      fill: true,
      backgroundColor: "#FF608B",
      borderColor: "#FF608B",
    },
    {
      label: "Town Panchayat Average",
      data: [],
      rev: [],
      labels: ["Town Panchayat Average"],
      showLine: true,
      fill: true,
      backgroundColor: "#E57504",
      borderColor: "#E57504",
    },
  ];

  populationAvgScatterDataSet = [
    {
      label: "< 100 Thousand",
      data: [],
      rev: [],
      labels: ["< 100 Thousand"],
      showLine: true,
      fill: true,
      backgroundColor: "#11BC46",
      borderColor: "#11BC46",
    },
    {
      label: "100 Thousand - 500 Thousand",
      data: [],
      rev: [],
      labels: ["100 Thousand - 500 Thousand"],
      showLine: true,
      fill: true,
      backgroundColor: "#FF608B",
      borderColor: "#FF608B",
    },
    {
      label: "500 Thousand - 1 Million",
      data: [],
      rev: [],
      labels: ["500 Thousand - 1 Million"],
      showLine: true,
      fill: true,
      backgroundColor: "#E57504",
      borderColor: "#E57504",
    },
    {
      label: "1 Million - 4 Million",
      data: [],
      rev: [],
      labels: ["1 Million - 4 Million"],
      showLine: true,
      fill: true,
      backgroundColor: "#32CCFA",
      borderColor: "#32CCFA",
    },
    {
      label: "4 Million+",
      data: [],
      rev: [],
      labels: ["4 Million+"],
      showLine: true,
      fill: true,
      backgroundColor: "#585FFF",
      borderColor: "#585FFF",
    },
  ];

  selectedStateFromSlbDashboard: BehaviorSubject<any> =
    new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private sanitizer: DomSanitizer
  ) {}

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

  getYearListSLB() {
    return this.http.get(environment.api.url + `get-FYs-slb`);
  }

  getStateUlbsGroupedByPopulation(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(
      `${environment.api.url}state-ulbs-grouped-by-population`,
      {
        params: bodyParams,
      }
    );
  }

  getStateRevenueForDifferentTabs(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(`${environment.api.url}state-revenue-tabs`, {
      params: bodyParams,
    });
  }

  getStateWiseFYs(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(`${environment.api.url}get-FYs-with-specification`, {
      params: bodyParams,
    });
  }

  getAvgScatterdData(paramContent: any, apiEndPoint: string) {
    // let bodyParams: any;
    // bodyParams = this.commonService.getHttpClientParams(paramContent);
    // return this.http.get(environment.api.url + `${apiEndPoint}`, {
    //   params: bodyParams,
    // });
    return this.http.post(environment.api.url + `${apiEndPoint}`, paramContent);
  }

  handleError(error: any) {
    console.log("error", error);
    return throwError(error.message || "SERVER ERROR");
  }

  populationWiseScatterData(data: any) {
    if (Object.keys(data).length > 0) {
      let keys = Object.keys(data);
      let colors: any = ["#1EBFC6", "#3E5DB1", "#F5B742", "red", "#11BC46"];
      let popCount: any = [];
      let popData = JSON.parse(JSON.stringify(this.scatterData));

      // popData.data.datasets = [...popData.data.datasets, ...this.populationAvgScatterDataSet]

      popData.data.datasets = [];

      keys.forEach((element, index) => {
        let obj = {
          labels: [],
          rev: [],
          label: element,
          data: [],
          showLine: false,
          fill: true,
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length],
        };
        popData.data.datasets.push(obj);
        popCount.push(data[element]);
      });

      let stateLevelMaxPopuCount = Math.max(...popCount);

      popData.data.datasets.forEach((el) => {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(data[el.label]);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: stateLevelMaxPopuCount ? stateLevelMaxPopuCount : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = data[el.label];
          el["data"].push(el2);
        });
      });
      console.log("popData", popData);
      return { ...JSON.parse(JSON.stringify(popData)) };
      // this.scatterData = { ...this.scatterData };
    }
  }

  initializeScatterData(selectedAvgValue: any) {
    this.scatterData = {
      type: "scatter",
      data: {
        datasets: [
          {
            labels: [],
            rev: [],
            label: "Municipality",
            data: [],
            showLine: false,
            fill: true,
            borderColor: "#1EBFC6",
            backgroundColor: "#1EBFC6",
          },
          {
            labels: [],
            rev: [],
            label: "Municipal Corporation",
            data: [],
            showLine: false,
            fill: true,
            borderColor: "#3E5DB1",
            backgroundColor: "#3E5DB1",
          },
          {
            label: "Town Panchayat",
            labels: [],
            rev: [],
            data: [],
            showLine: false,
            fill: true,
            borderColor: "#F5B742",
            backgroundColor: "#F5B742",
          },
          {
            label: "State Average",
            data: [],
            rev: [],
            labels: ["State Average"],
            showLine: true,
            fill: true,
            backgroundColor: "red",
            borderColor: "red",
          },
        ],
      },
    };
    if (selectedAvgValue == "populationAvg") {
      this.populationAvgScatterDataSet = [
        {
          label: "< 100 Thousand",
          data: [],
          rev: [],
          labels: ["< 100 Thousand"],
          showLine: true,
          fill: true,
          backgroundColor: "#11BC46",
          borderColor: "#11BC46",
        },
        {
          label: "100 Thousand - 500 Thousand",
          data: [],
          rev: [],
          labels: ["100 Thousand - 500 Thousand"],
          showLine: true,
          fill: true,
          backgroundColor: "#FF608B",
          borderColor: "#FF608B",
        },
        {
          label: "500 Thousand - 1 Million",
          data: [],
          rev: [],
          labels: ["500 Thousand - 1 Million"],
          showLine: true,
          fill: true,
          backgroundColor: "#E57504",
          borderColor: "#E57504",
        },
        {
          label: "1 Million - 4 Million",
          data: [],
          rev: [],
          labels: ["1 Million - 4 Million"],
          showLine: true,
          fill: true,
          backgroundColor: "#32CCFA",
          borderColor: "#32CCFA",
        },
        {
          label: "4 Million+",
          data: [],
          rev: [],
          labels: ["4 Million+"],
          showLine: true,
          fill: true,
          backgroundColor: "#585FFF",
          borderColor: "#585FFF",
        },
      ];
    }
    if (selectedAvgValue == "ulbTypeAvg") {
      this.ulbTypeAvgScatterDataSet = [
        {
          label: "Municipal Corporation Average",
          data: [],
          rev: [],
          labels: ["Municipal Corporation Average"],
          showLine: true,
          fill: true,
          backgroundColor: "#11BC46",
          borderColor: "#11BC46",
        },
        {
          label: "Municipality Average",
          data: [],
          rev: [],
          labels: ["Municipality Average"],
          showLine: true,
          fill: true,
          backgroundColor: "#FF608B",
          borderColor: "#FF608B",
        },
        {
          label: "Town Panchayat Average",
          data: [],
          rev: [],
          labels: ["Town Panchayat Average"],
          showLine: true,
          fill: true,
          backgroundColor: "#E57504",
          borderColor: "#E57504",
        },
      ];
    }
    if (selectedAvgValue == "nationalAvg") {
      this.nationLevelScatterDataSet = Object.assign({
        label: "National Average",
        data: [],
        rev: [],
        labels: ["National Average"],
        showLine: true,
        fill: false,
        backgroundColor: "#11BC46",
        borderColor: "#11BC46",
      });
    }
  }

  // plotScatterChart(municipalCorpData: any, townPanchayatData: any, municipalityData: any, stateAvgData: any, nationalAvgData: any, selectedAvgValue: string = '') {
  plotScatterChart(scatterChartObj: any, selectedAvgValue: string = "") {
    console.log("plotScatterChart", scatterChartObj, selectedAvgValue);
    this.initializeScatterData(selectedAvgValue);
    // let averageCountList = [scatterChartObj?.mCorporationAvg, scatterChartObj?.townPanchayatAvg, scatterChartObj?.municipalityAvg, scatterChartObj?.stateAvg];
    let averageCountList = [
      scatterChartObj?.mCorporationAvg,
      scatterChartObj?.townPanchayatAvg,
      scatterChartObj?.municipalityAvg,
    ];
    let stateLevelMaxPopuCount = Math.max(...averageCountList);
    console.log("stateLevelMaxPopuCount", stateLevelMaxPopuCount);
    let scatterChartData: any = {};
    scatterChartData = JSON.parse(JSON.stringify(this.scatterData));

    if (selectedAvgValue == "nationalAvg") {
      scatterChartData.data.datasets.push(this.nationLevelScatterDataSet);
    } else if (selectedAvgValue == "populationAvg") {
      scatterChartData.data.datasets = [
        ...scatterChartData.data.datasets,
        ...this.populationAvgScatterDataSet,
      ];
    } else {
      scatterChartData.data.datasets = [
        ...scatterChartData.data.datasets,
        ...this.ulbTypeAvgScatterDataSet,
      ];
    }

    console.log("scatterChartData", scatterChartData.data.datasets);
    scatterChartData.data.datasets.forEach((el) => {
      console.log("element===>", el);
      let obj = { x: 0, y: 0 };
      if (el.label == "Town Panchayat") {
        el.showLine = false;
        el.fill = false;
        // el["rev"].push(townPanchayatData);
        // let defaultDataSet = [{ x: 0, y: 0 }, { x: stateLevelMaxPopuCount ? stateLevelMaxPopuCount : 1200000, y: 0 }];
        // defaultDataSet.forEach(el2=>{
        //   el2['y'] = townPanchayatData;
        //   el["data"].push(el2);
        // });
        obj = { x: 0, y: 0 };
        scatterChartObj?.townPanchayat.forEach((el2, index) => {
          obj.x = el2.population;
          obj.y = el2.amount;
          el["labels"].push(el2.ulbName);
          el["rev"].push(el2.amount);
          el.data.push(obj);
          obj = { x: 0, y: 0 };
        });
      } else if (el.label == "Municipal Corporation") {
        el.showLine = false;
        el.fill = false;
        // el["rev"].push(municipalCorpData);
        // let defaultDataSet = [{ x: 0, y: 0 }, { x: stateLevelMaxPopuCount ? stateLevelMaxPopuCount : 1200000, y: 0 }];
        // defaultDataSet.forEach(el2=>{
        //   el2['y'] = municipalCorpData
        //   el["data"].push(el2)
        // });
        scatterChartObj?.mCorporation.forEach((el2, index) => {
          obj.x = el2.population;
          obj.y = el2.amount;
          el["labels"].push(el2.ulbName);
          el["rev"].push(el2.amount);
          el.data.push(obj);

          obj = { x: 0, y: 0 };
        });
      } else if (el.label == "Municipality") {
        el.showLine = false;
        el.fill = false;
        // el["rev"].push(municipalityData);
        // let defaultDataSet = [{ x: 0, y: 0 }, { x: stateLevelMaxPopuCount ? stateLevelMaxPopuCount : 1200000, y: 0 }];
        // defaultDataSet.forEach(el2=>{
        //   el2['y'] = municipalityData
        //   el["data"].push(el2)
        // });
        scatterChartObj?.municipality.forEach((el2, index) => {
          obj = { x: 0, y: 0 };
          obj.x = el2.population;
          obj.y = el2.amount;
          el["labels"].push(el2.ulbName);
          el["rev"].push(el2.amount);
          el.data.push(obj);
          obj = { x: 0, y: 0 };
        });
      } else if (el.label == "State Average") {
        el.fill = false;
        el["rev"].push(scatterChartObj?.stateAvg);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.stateAvg;
          el["data"].push(el2);
        });
      } else if (el.label == "National Average") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.nationalAvg);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.nationalAvg;
          el["data"].push(el2);
        });
      } else if (el.label == "Municipal Corporation Average") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.mCorporationAvg);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.mCorporationAvg;
          el["data"].push(el2);
        });
      } else if (el.label == "Municipality Average") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.municipalityAvg);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.municipalityAvg;
          el["data"].push(el2);
        });
      } else if (el.label == "Town Panchayat Average") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.townPanchayatAvg);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.townPanchayatAvg;
          el["data"].push(el2);
        });
      } else if (el.label == "< 100 Thousand") {
        console.log("calledLabel", el.label);
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.lessThan100k);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.lessThan100k;
          el["data"].push(el2);
        });
      } else if (el.label == "100 Thousand - 500 Thousand") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.bwt100kTo500k);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.bwt100kTo500k;
          el["data"].push(el2);
        });
      } else if (el.label == "500 Thousand - 1 Million") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.bwt500kTo1m);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.bwt500kTo1m;
          el["data"].push(el2);
        });
      } else if (el.label == "1 Million - 4 Million") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.bwt1mTo4m);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.bwt1mTo4m;
          el["data"].push(el2);
        });
      } else if (el.label == "4 Million+") {
        el.showLine = true;
        el.fill = false;
        el["rev"].push(scatterChartObj?.greaterThan4m);
        let defaultDataSet = [
          { x: 0, y: 0 },
          {
            x: scatterChartObj?.stateLevelMaxPopuCount
              ? scatterChartObj?.stateLevelMaxPopuCount
              : 1200000,
            y: 0,
          },
        ];
        defaultDataSet.forEach((el2) => {
          el2["y"] = scatterChartObj?.greaterThan4m;
          el["data"].push(el2);
        });
      }
    });
    console.log("scatterChartData", scatterChartData);
    // return { ...JSON.parse(JSON.stringify(scatterChartData)) };
    return Object.assign(scatterChartData);
  }

  /**
   * It takes in three arrays of objects, each with a property called population, and returns the maximum
   * value of the population property across all three arrays.
   * @param {any} mCorporation - [{population: 100}, {population: 200}]
   * @param {any} townPanchayat - [{
   * @param {any} municipality - [{
   * @returns getMaximumPopulationCount(mCorporation: any, townPanchayat: any, municipality: any ) {
   *     let populationCountList = [];
   *     populationCountList = mCorporation.map(popCount => popCount.population)
   *     populationCountList = [...populationCountList, ...townPanchayat
   */
  getMaximumPopulationCount(
    mCorporation: any,
    townPanchayat: any,
    municipality: any
  ) {
    let populationCountList = [];

    populationCountList = mCorporation.map((popCount) => popCount.population);
    populationCountList = [
      ...populationCountList,
      ...townPanchayat.map((popCount) => popCount.population),
    ];
    populationCountList = [
      ...populationCountList,
      ...municipality.map((popCount) => popCount.population),
    ];

    let maxPopulationCount = Math.max(...populationCountList);
    return maxPopulationCount;
  }
}
