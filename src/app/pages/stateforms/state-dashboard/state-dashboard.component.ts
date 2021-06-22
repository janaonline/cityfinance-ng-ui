import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { pipe } from 'rxjs';
import { StateDashboardService } from "./state-dashboard.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import * as $ from 'jquery';
import { constants } from 'buffer';
import * as JSC from "jscharting";


@Component({
  selector: "app-state-dashboard",
  templateUrl: "./state-dashboard.component.html",
  styleUrls: ["./state-dashboard.component.scss"],
})
export class StateDashboardComponent implements OnInit {
  constructor(public stateDashboardService: StateDashboardService) { }

  ngOnInit(): void {

    this.onLoad();

  }
  values = {
    overall_approvedByState: 0,
    overall_pendingForSubmission: 0,
    overall_underReviewByState: 0,
    pfms_notRegistered: 0,
    pfms_pendingResponse: 0,
    pfms_registered: 0,
    slb_approvedbyState: 0,
    slb_completedAndPendingSubmission: 0,
    slb_pendingCompletion: 0,
    slb_underStateReview: 0,
    util_approvedbyState: 0,
    util_completedAndPendingSubmission: 0,
    util_pendingCompletion: 0,
    util_underStateReview: 0,
    annualAcc_audited: 0,
    annualAcc_provisional: 0

  };
  errMessage = ''
  totalUlbs = 0;
  nonMillionCities = 0;
  millionPlusUAs = 0;
  UlbInMillionPlusUA = 0;
  formDataApiRes;
  selectedLevel;
  selectUa = '';
  plansDataApiRes;
  rejuvenationPlans;
  plans = 0;
  width1 = '';
  width2 = '';
  width3 = '';
  width4 = '';
  UANames = []
  onLoad() {
    this.mainDonughtChart();
    this.gaugeChart1();
    this.gaugeChart2();
    this.pfmsDonughtChart();
    this.utilReportDonughtChart();
    this.slbDonughtChart();
    this.pieChart();
    this.getCardData();
    this.getFormData()
    this.getPlansData();
  }


  getPlansData() {
    this.stateDashboardService.getPlansData().subscribe(
      (res) => {
        console.log(res);
        this.plansDataApiRes = res
      },
      (err) => {
        console.log(err);
      })
  }
  pfmsDonughtChart() {
    const data = {
      labels: [
        'Registered',
        'Not Registered',
        'Pending Response                                                '
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [
          this.values.pfms_registered,
          this.values.pfms_notRegistered,
          this.values.pfms_pendingResponse],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',

        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('pfms');
    const ctx = canvas.getContext('2d');
    let pfms = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 25,
          }
        }
      }

    });
  }
  utilReportDonughtChart() {
    const data = {
      labels: [
        '103 - Pending Completion',
        '213 - Completed and Pending Submission',
        '213 - Completed and Pending Submission',
        '213 - Approved by State'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [
          this.values.util_pendingCompletion,
          this.values.util_completedAndPendingSubmission,
          this.values.util_underStateReview,
          this.values.util_approvedbyState],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(155, 215, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('utilReport');
    const ctx = canvas.getContext('2d');
    let utilReport = new Chart(ctx, {
      type: 'doughnut',
      data: data,

      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 15,
          }
        }
      }

    });
  }
  slbDonughtChart() {
    const data = {
      labels: [
        '103 - Pending Completion',
        '213 - Completed and Pending Submission',
        '213 - Completed and Pending Submission',
        '213 - Approved by State'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [
          this.values.slb_pendingCompletion,
          this.values.slb_completedAndPendingSubmission,
          this.values.slb_underStateReview,
          this.values.slb_approvedbyState],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(155, 215, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('slb');
    const ctx = canvas.getContext('2d');
    let slb = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {

          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 15,
          }
        }
      }

    });
  }
  gaugeChart1() {
    var chart = JSC.chart('chartDiv', {
      debug: true,
      legend_visible: false,
      defaultTooltip_enabled: false,
      xAxis_spacingPercentage: 0.4,
      yAxis: [
        {
          id: 'ax1',
          defaultTick: { padding: 10, enabled: false },
          customTicks: [0, 40, 60, 80, 100],
          line: {
            width: 3,

            /*Defining the option will enable it.*/
            breaks: {},

            /*Palette is defined at series level with an ID referenced here.*/
            color: 'smartPalette:pal1'
          },
          scale_range: [0, 100]
        },

      ],
      defaultSeries: {
        type: 'gauge column roundcaps',
        shape: {
          label: {

            text: '%value%',
            align: 'center',
            verticalAlign: 'middle'
          }
        }
      },
      series: [
        {
          type: 'column roundcaps',
          name: 'Temperatures',
          yAxis: 'ax1',
          palette: {
            id: 'pal1',
            pointValue: 'ff',
            ranges: [
              { value: 0, color: '#FF5353' },
              { value: 40, color: '#FFD221' },
              { value: 60, color: '#77E6B4' },
              { value: [80, 100], color: '#21D683' }
            ]
          },
          shape_label: { style: { fontSize: 22 } },
          points: [['x', [0, this.values.annualAcc_provisional]]]
        },

      ]
    });

  }
  gaugeChart2() {
    var chart = JSC.chart('chartDiv2', {
      debug: true,
      legend_visible: false,
      defaultTooltip_enabled: false,
      xAxis_spacingPercentage: 0.4,
      yAxis: [
        {
          id: 'ax1',
          defaultTick: { padding: 10, enabled: false },
          customTicks: [0, 40, 60, 80, 100],
          line: {
            width: 3,

            /*Defining the option will enable it.*/
            breaks: {},

            /*Palette is defined at series level with an ID referenced here.*/
            color: 'smartPalette:pal1'
          },
          scale_range: [0, 100]
        },

      ],
      defaultSeries: {
        type: 'gauge column roundcaps',
        shape: {
          label: {

            text: '%value%',
            align: 'center',
            verticalAlign: 'middle'
          }
        }
      },
      series: [
        {
          type: 'column roundcaps',
          name: 'Temperatures',
          yAxis: 'ax1',
          palette: {
            id: 'pal1',
            pointValue: 'ff',
            ranges: [
              { value: 0, color: '#FF5353' },
              { value: 40, color: '#FFD221' },
              { value: 60, color: '#77E6B4' },
              { value: [80, 100], color: '#21D683' }
            ]
          },
          shape_label: { style: { fontSize: 22 } },
          points: [['x', [0, this.values.annualAcc_audited]]]
        },

      ]
    });
  }
  mainDonughtChart() {
    const data = {
      labels: [
        'Pending for Submission',
        'Pending Review by State',
        'Approved by State'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [
          this.values.overall_pendingForSubmission,
          this.values.overall_underReviewByState,
          this.values.overall_approvedByState],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'white',
            usePointStyle: true,
            padding: 30,
          }
        }
      }

    });
  }
  pieChart() {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }],
      options: {
        maintainAspectRatio: false,
        legend: {

          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 15,
          }
        }
      }
    };


    const canvas = <HTMLCanvasElement>document.getElementById('pie');
    const ctx = canvas.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'pie',
      data: data
    });
  }
  getCardData() {
    this.stateDashboardService.getCardData().subscribe(
      (res) => {
        console.log(res["data"]);
        let data = res["data"];

        this.totalUlbs = data['totalUlb'];
        this.nonMillionCities = data['totalUlbNonMil'];
        this.millionPlusUAs = data['totalUa'];
        this.UlbInMillionPlusUA = data['totalUlbInUas'];

        let newList = {};
        res["data"]["uaList"].forEach((element) => {
          this.UANames.push(element.name)
          newList[element._id] = element;
        });
        console.log(this.UANames)
        sessionStorage.setItem("UasList", JSON.stringify(newList));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getFormData() {
    this.stateDashboardService.getFormData().subscribe(
      (res) => {
        console.log(res);
        this.formDataApiRes = res
      },
      (err) => {
        console.log(err);
      })
  }

  updateCharts() {
    this.mainDonughtChart();
    this.gaugeChart1();
    this.gaugeChart2();
    this.pfmsDonughtChart();
    this.utilReportDonughtChart();
    this.slbDonughtChart();
    this.pieChart();
  }
  selected() {
    console.log(this.selectedLevel)
    if (this.selectedLevel === "allUlbs") {
      let data = this.formDataApiRes['data'][0]

      this.mapValues(data);
      this.updateCharts();
    } else if (this.selectedLevel === "ulbsInMillionPlusUa") {
      let data = this.formDataApiRes['data'][1]
      this.mapValues(data);
      this.updateCharts();
    } else if (this.selectedLevel === "NonMillionPlusULBs") {
      let data = this.formDataApiRes['data'][2]
      this.mapValues(data);
      this.updateCharts();
    }


  }
  selectedUA() {
    console.log('selectedUA', this.selectUa)
    this.plansDataApiRes.forEach(element => {
      if (element.UA === this.selectUa) {
        this.plans = element.plans;
        this.rejuvenationPlans = element.submissionOfPlans
      }

    });



    this.calculateValue();
  }

  calculateValue() {
    if (this.plans <= 25) {
      this.width1 = String(33 - ((16 / 12.5) * this.plans)) + 'px';
      this.width2 = '33px';
      this.width3 = '33px';
      this.width4 = '33px';
    } else if (this.plans <= 50 && this.plans > 25) {
      this.width1 = '0px';
      this.width2 = String(33 - ((16 / 12.5) * (this.plans - 25))) + 'px';
      this.width3 = '33px';
      this.width4 = '33px';
    } else if (this.plans <= 75 && this.plans > 50) {
      this.width1 = '0px';
      this.width2 = '0px';
      this.width3 = String(33 - ((16 / 12.5) * (this.plans - 50))) + 'px';
      this.width4 = '33px';
    } else if (this.plans <= 100 && this.plans > 75) {
      this.width1 = '0px';
      this.width2 = '0px';
      this.width3 = '0px';
      this.width4 = String(33 - ((16 / 12.5) * (this.plans - 75))) + 'px';

    }

  }
  mapValues(data) {
    this.values.overall_approvedByState = data['overallFormStatus']['approvedByState'],
      this.values.overall_pendingForSubmission = data['overallFormStatus']['pendingForSubmission'],
      this.values.overall_underReviewByState = data['overallFormStatus']['underReviewByState'],
      this.values.pfms_notRegistered = data['pfms']['notRegistered'],
      this.values.pfms_pendingResponse = data['pfms']['pendingResponse'],
      this.values.pfms_registered = data['pfms']['registered'],
      this.values.slb_approvedbyState = data['slb']['approvedbyState'],
      this.values.slb_completedAndPendingSubmission = data['slb']['completedAndPendingSubmission'],
      this.values.slb_pendingCompletion = data['slb']['pendingCompletion'],
      this.values.slb_underStateReview = data['slb']['underStateReview'],
      this.values.util_approvedbyState = data['utilReport']['approvedbyState'],
      this.values.util_completedAndPendingSubmission = data['utilReport']['completedAndPendingSubmission'],
      this.values.util_pendingCompletion = data['utilReport']['pendingCompletion'],
      this.values.util_underStateReview = data['utilReport']['underStateReview'],
      this.values.annualAcc_audited = data['annualAccounts']['audited'],
      this.values.annualAcc_provisional = data['annualAccounts']['provisional']
  }




}

