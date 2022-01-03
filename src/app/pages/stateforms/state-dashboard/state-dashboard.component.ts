import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { pipe } from 'rxjs';
import { StateDashboardService } from "./state-dashboard.service";
import { OverallListComponent } from './overall-list/overall-list.component'
import { ReviewUlbFormComponent } from '../review-ulb-form/review-ulb-form.component'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { PfmsListComponent } from './pfms-list/pfms-list.component'
import { PlansListComponent } from './plans-list/plans-list.component'
import { SlbListComponent } from './slb-list/slb-list.component'
import { UtilreportListComponent } from './utilreport-list/utilreport-list.component'
import { AnnualaccListComponent } from './annualacc-list/annualacc-list.component'
import { MpfcListComponent } from './mpfc-list/mpfc-list.component'
import { NonMillionListComponent } from './non-million-list/non-million-list.component'
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { CommonService } from "src/app/shared/services/common.service";
import { StateformsService } from '../stateforms.service'
import * as $ from 'jquery';
import { constants } from 'buffer';
import * as JSC from "jscharting";
import * as fileSaver from "file-saver";
import { WaterSupplyService } from '../water-supply/water-supply.service';


@Component({
  selector: "app-state-dashboard",
  templateUrl: "./state-dashboard.component.html",
  styleUrls: ["./state-dashboard.component.scss"],
})
export class StateDashboardComponent extends BaseComponent implements OnInit {
  constructor(
    public stateDashboardService: StateDashboardService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private _WaterSupplyService: WaterSupplyService,
    public stateformsService: StateformsService

  ) {
    super();

    this.activatedRoute.params.subscribe((val) => {
      const { id } = val;
      if (id) {
        this.id = id;
        console.log('state dashboard', id)
        sessionStorage.setItem('state_id', id);
      }
    });

  }
  id
  states = null;
  isMillionPlusState = null
  eligibleForGrant = false;
  grantTooltip =''
  ngOnInit(): void {

    this.stateformsService.isMillionPlusState(this.id).subscribe(res => {
      this.isMillionPlusState = res['data']
    })
this.stateDashboardService.getEligibilityNMPC(this.id).subscribe(res=>{
  this.eligibleForGrant = true
  let acheived = res['percentage'];
  let cutoff = res['cutOff']
  this.grantTooltip = `${acheived}% of Annual accounts filled and Approved. Need ${cutoff}% to claim NMPC Grant`
  // this.eligibleForGrant = res['percentage'] >= res['cutoff']
})

    this.stateDashboardService.closeDialog.subscribe((form) => {
      console.log(form)
      this.dialog.closeAll()
    })
    this.onLoad();
    window.onload = () => {
      this.selectedUA();
      this.updateCharts();

    };

  }
  values = {
    overall_approvedByState: 0,
    overall_pendingForSubmission: 0,
    overall_underReviewByState: 0,

    util_approvedbyState: 0,
    util_completedAndPendingSubmission: 0,
    util_pendingCompletion: 0,
    util_underStateReview: 0,
    annualAcc_audited: 0,
    annualAcc_provisional: 0,
    million_approvedByState: 0,
    million_completedAndPendingSubmission: 0,
    million_pendingCompletion: 0,
    million_underReviewByState: 0,
    nonMillion_approvedByState: 0,
    nonMillion_completedAndPendingSubmission: 0,
    nonMillion_pendingCompletion: 0,
    nonMillion_underReviewByState: 0,

  };
  grantTransferCardData;
  grantTransferDate
  GrantTransferparams = {
    year: "2020-21",
    installment: 2,
    state_id: null,
    csv: false
  };
  dateSelect = true
  installmentSelect = true
  year21 = true
  errMessage = ''
  totalUlbs = 0;
  nonMillionCities = 0;
  millionPlusUAs = 0;
  UlbInMillionPlusUA = 0;
  formDataApiRes;
  selectedLevel = "allUlbs";
  selectUa = 'all';
  plansDataApiRes;
  rejuvenationPlans;
  plans = 0;
  ulbs = 0;
  width1 = '';
  width2 = '';
  width3 = '';
  width4 = '';
  UANames = []
  maindonughtChart = null;
  pfmsdonughtChart;
  utilreportDonughtChart = null;
  gauge_provisional = null
  gauge_audited = null
  slbdonughtChart
  piechart = null;
  userData = JSON.parse(localStorage.getItem("userData"))

  onLoad() {
    this.getGrantTranfer(this.id ? this.id : this.userData.state)
    this.getCardData();
    this.getFormData()
    this.getUAList();
    this.selectedUA();
  }
  UAs;
  getUAList() {
    this.stateDashboardService.getUAList(this.id).subscribe(
      (res) => {
        this.UAs = res['data']

      },
      (err) => {
        console.log(err.message)
      }
    )
  }
  openDialogAnnual() {
    console.log(this.id)
    const dialogRef = this.dialog.open(AnnualaccListComponent, {
      height: '700px',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogSlb() {
    const dialogRef = this.dialog.open(SlbListComponent, {
      height: '700px',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogPlans() {
    const dialogRef = this.dialog.open(PlansListComponent, {
      height: '700px',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogPfms() {
    const dialogRef = this.dialog.open(PfmsListComponent, {
      height: '700px',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogUtil() {
    const dialogRef = this.dialog.open(UtilreportListComponent, {
      height: '700px',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialog() {

    const dialogRef = this.dialog.open(OverallListComponent, {
      height: '700px',
      width: '95vw',
      maxWidth: '200vw',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogMillion() {
    console.log('clicked million');
    const dialogRef = this.dialog.open(MpfcListComponent, {
      height: '700px',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogNonMillion() {
    console.log('clicked non million');
    const dialogRef = this.dialog.open(NonMillionListComponent, {
      height: '700px',
      data: {
        state_id: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // pfmsDonughtChart() {
  //   const data = {
  //     labels: [
  //       'Registered',
  //       'Not Registered',
  //       'Pending Response                                                '
  //     ],
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [
  //         this.values.pfms_registered,
  //         this.values.pfms_notRegistered,
  //         this.values.pfms_pendingResponse],
  //       backgroundColor: [
  //         '#67DF7B',
  //         '#DBDBDB',
  //         '#FF7154',

  //       ],
  //       hoverOffset: 4
  //     }]
  //   };
  //   const canvas = <HTMLCanvasElement>document.getElementById('pfms');
  //   const ctx = canvas.getContext('2d');
  //   this.pfmsdonughtChart = new Chart(ctx, {
  //     type: 'doughnut',
  //     data: data,
  //     options: {
  //       maintainAspectRatio: false,
  //       legend: {
  //         position: 'left',

  //         align: 'start',
  //         labels: {
  //           fontSize: 13,
  //           fontColor: 'black',
  //           usePointStyle: true,
  //           // padding: 22,
  //         }
  //       },
  //       responsive: true,

  //     }


  //   });
  // }



  utilReportDonughtChart() {
    const data = {
      labels: [
        'Pending Completion',
        'Completed and Pending Submission',
        'Under State Review',
        'Approved by State'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [
          this.values.util_pendingCompletion,
          this.values.util_completedAndPendingSubmission,
          this.values.util_underStateReview,
          this.values.util_approvedbyState],
        backgroundColor: [
          '#F95151',
          '#FF9E30',
          '#DBDBDB',
          '#67DF7B'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('utilReport');
    const ctx = canvas.getContext('2d');
    this.utilreportDonughtChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,

      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 28,
          }
        },
        responsive: true
      }

    });
  }

  gaugeChart1() {

    let mainColor = "",
      complimentColor = "",
      borderColor = "";
    console.log(this.values.annualAcc_provisional,)
    if (this.values.annualAcc_provisional < 25) {
      mainColor = "#FF7154";
      complimentColor = "#ffcabf";
      borderColor = "#FF7154";
    } else {
      mainColor = "#09C266";
      complimentColor = "#C6FBE0";
      borderColor = "#09C266";
    }
    const canvas = <HTMLCanvasElement>document.getElementById("chartDiv");
    const ctx = canvas.getContext("2d");
    this.gauge_provisional = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ['Completed and Accounts Submitted',
          'Completed and Accounts Not Submitted'],
        datasets: [
          {
            data: [
              this.values.annualAcc_provisional,
              100 - this.values.annualAcc_provisional,
            ],
            backgroundColor: [mainColor, complimentColor],
            borderColor: [borderColor],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 68,
        legend: {
          display: false
        },
        onClick(...args) {
          console.log(args);
        },
      },
    });
  }
  constChart() {
    const canvas = <HTMLCanvasElement>document.getElementById("meter");
    const ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [25, 75],
            backgroundColor: ["#FF7154", "#67DF7B"],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 94,

        onClick(...args) {
          console.log(args);
        },
      },
    });
  }
  constChart1() {
    const canvas = <HTMLCanvasElement>document.getElementById("meter1");
    const ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [25, 75],
            backgroundColor: ["#FF7154", "#67DF7B"],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 94,

        onClick(...args) {
          console.log(args);
        },
      },
    });
  }
  gaugeChart2() {
    let mainColor = "",
      complimentColor = "",
      borderColor = "";
    console.log(this.values.annualAcc_audited)
    if (this.values.annualAcc_audited < 25) {
      mainColor = "#FF7154";
      complimentColor = "#ffcabf";
      borderColor = "#FF7154";
    } else {
      mainColor = "#09C266";
      complimentColor = "#C6FBE0";
      borderColor = "#09C266";
    }
    const canvas = <HTMLCanvasElement>document.getElementById("chartDiv2");
    const ctx = canvas.getContext("2d");
    this.gauge_audited = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ['Completed and Accounts Submitted',
          'Completed and Accounts Not Submitted'],
        datasets: [
          {
            data: [
              this.values.annualAcc_audited,
              100 - this.values.annualAcc_audited,
            ],
            backgroundColor: [mainColor, complimentColor],
            borderColor: [borderColor],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 68,
        legend: {
          display: false
        },
        onClick(...args) {
          console.log(args);
        },
      },
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
          '#FF7575',
          '#FFCE56',
          '#A1CE65'
        ],
        hoverOffset: 4,
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    this.maindonughtChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,

      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'bottom',
          align: 'center',

          labels: {
            fontSize: 15,
            fontColor: 'white',
            usePointStyle: true,
            padding: 32,

          }
        }
      },


    });

  }
  pieChartMillion() {
    if (this.piechart) {
      this.piechart.destroy();
    }
    const data = {
      labels: [
        'Pending Completion',
        'Completed and Pending Submission',
        'Under State Review',
        'Approved by State'],
      datasets: [{
        label: 'My First Dataset',
        data: [
          this.values.million_pendingCompletion,
          this.values.million_completedAndPendingSubmission,
          this.values.million_underReviewByState,
          this.values.million_approvedByState],
        backgroundColor: [
          '#F95151',
          '#FF9E30',
          '#DBDBDB',
          '#67DF7B'

        ],
        hoverOffset: 4
      }],

    };


    const canvas = <HTMLCanvasElement>document.getElementById('mpcf');
    const ctx = canvas.getContext('2d');
    this.piechart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {

          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,

            padding: 22,
          }
        }
      }
    });
  }
  piechart2 = null;
  pieChartNonMillion = () => {
    if (this.piechart2) {
      this.piechart2.destroy();
    }
    const data = {
      labels: [
        'Pending Completion',
        'Completed and Pending Submission',
        'Under State Review',
        'Approved by State'],
      datasets: [{
        label: 'My First Dataset',
        data: [
          this.values.nonMillion_pendingCompletion,
          this.values.nonMillion_completedAndPendingSubmission,
          this.values.nonMillion_underReviewByState,
          this.values.nonMillion_approvedByState],
        backgroundColor: [
          '#F95151',
          '#FF9E30',
          '#DBDBDB',
          '#67DF7B'

        ],
        hoverOffset: 4
      }],

    };


    const canvas = <HTMLCanvasElement>document.getElementById('nmpcf');
    const ctx = canvas.getContext('2d');
    this.piechart2 = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {

          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,

            padding: 22,
          }
        }
      }
    });
  }

  getCardData() {
    this.stateDashboardService.getCardData(this.id).subscribe(
      (res) => {
        console.log(res["data"]);
        let data = res["data"];
        let newList = {};
        this.totalUlbs = data['totalUlb'];
        this.nonMillionCities = data['totalUlbNonMil'];
        this.millionPlusUAs = data['totalUa'];
        this.UlbInMillionPlusUA = data['totalUlbInUas'];
        this.stateDashboardService.totalUaS.next(this.millionPlusUAs);

        res["data"]["uaList"].forEach((element) => {
          this.UANames.push(element.name)
          newList[element._id] = element;
        });
        console.log(this.UANames)
        sessionStorage.setItem("UasList", JSON.stringify(newList));
        this.getwaterSuppyData();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getFormData() {
    this.stateDashboardService.getFormData(this.id).subscribe(
      (res) => {
        console.log(res);
        this.formDataApiRes = res
        this.selected();
      },
      (err) => {
        console.log(err);
      })
  }

  updateCharts() {
    this.mainDonughtChart();
    this.gaugeChart1();
    this.gaugeChart2();
    this.constChart();
    this.constChart1();
    this.pieChartMillion();
    this.pieChartNonMillion();
    // this.pfmsDonughtChart();
    this.utilReportDonughtChart();
    // this.slbDonughtChart();

  }
  selected() {
    if (this.maindonughtChart) {
      this.maindonughtChart.destroy();
    }
    if (this.utilreportDonughtChart) {
      this.utilreportDonughtChart.destroy();
    }
    if (this.gauge_audited) {
      this.gauge_audited.destroy();
    }
    if (this.gauge_provisional) {
      this.gauge_provisional.destroy();
    }


    console.log(this.selectedLevel)
    if (this.selectedLevel === "allUlbs") {

      console.log(this.formDataApiRes['data'][0])
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
  filledULBs = 0;
  totalULBs = 0;
  percentage;
  noDataFound_millionSLB = false
  noDataFound_nonMillionSLB = false
  selectedUA() {

    this.noDataFound_millionSLB = false
    this.noDataFound_nonMillionSLB = false
    if (this.piechart) {
      this.piechart.destroy();
    }
    if (this.piechart2) {
      this.piechart2.destroy();
    }

    console.log('selectedUA', this.selectUa)

    this.stateDashboardService.getSlbData(this.selectUa, this.id).subscribe(
      (res) => {
        console.log(res['data'])
        let data = res['data']
        data.forEach(el => {
          if (el['category'] == 'UA') {
            this.values.million_approvedByState = el['approvedByState'];
            this.values.million_completedAndPendingSubmission = el['completedAndPendingSubmission'],
              this.values.million_pendingCompletion = el['pendingCompletion']
            this.values.million_underReviewByState = el['underReviewByState']
          } else if (el['category'] == 'NonMillionNonUA') {
            this.values.nonMillion_approvedByState = el['approvedByState'];
            this.values.nonMillion_completedAndPendingSubmission = el['completedAndPendingSubmission'],
              this.values.nonMillion_pendingCompletion = el['pendingCompletion']
            this.values.nonMillion_underReviewByState = el['underReviewByState']
          }
        })
        if (this.piechart) {
          this.piechart.destroy();
        }
        if (this.piechart2) {
          this.piechart2.destroy();
        }
        this.pieChartMillion();
        this.pieChartNonMillion();
        if (this.values.million_approvedByState == 0 &&
          this.values.million_completedAndPendingSubmission == 0 &&
          this.values.million_pendingCompletion == 0 &&
          this.values.million_underReviewByState == 0
        ) {
          this.noDataFound_millionSLB = true
        } else {
          if (this.piechart) {
            this.piechart.destroy();
          }
          this.pieChartMillion();
        }
        if (this.values.nonMillion_approvedByState == 0 &&
          this.values.nonMillion_completedAndPendingSubmission == 0 &&
          this.values.nonMillion_pendingCompletion == 0 &&
          this.values.nonMillion_underReviewByState == 0
        ) {
          this.noDataFound_nonMillionSLB = true
        } else {
          if (this.piechart2) {
            this.piechart2.destroy();
          }
          this.pieChartNonMillion();

        }

      },
      (err) => {

      }
    )

  }

  calculateValue() {
    if (this.percentage <= 25) {
      this.width1 = String(33 - ((16 / 12.5) * this.percentage)) + 'px';
      this.width2 = '33px';
      this.width3 = '33px';
      this.width4 = '33px';
    } else if (this.percentage <= 50 && this.percentage > 25) {
      this.width1 = '0px';
      this.width2 = String(33 - ((16 / 12.5) * (this.percentage - 25))) + 'px';
      this.width3 = '33px';
      this.width4 = '33px';
    } else if (this.percentage <= 75 && this.percentage > 50) {
      this.width1 = '0px';
      this.width2 = '0px';
      this.width3 = String(33 - ((16 / 12.5) * (this.percentage - 50))) + 'px';
      this.width4 = '33px';
    } else if (this.percentage <= 100 && this.percentage > 75) {
      this.width1 = '0px';
      this.width2 = '0px';
      this.width3 = '0px';
      this.width4 = String(33 - ((16 / 12.5) * (this.percentage - 75))) + 'px';

    }

  }
  noDataFound_Overall = false
  noDataFound_pfms = false
  noDataFound_util = false
  noDataFound_slb = false
  noDataFound_plans = false
  mapValues(data) {
    this.values.overall_approvedByState = data['overallFormStatus']['approvedByState'],
      this.values.overall_pendingForSubmission = data['overallFormStatus']['pendingForSubmission'],
      this.values.overall_underReviewByState = data['overallFormStatus']['underReviewByState'],
      // this.values.pfms_notRegistered = data['pfms']['notRegistered'],
      // this.values.pfms_pendingResponse = data['pfms']['pendingResponse'],
      // this.values.pfms_registered = data['pfms']['registered'],
      // this.values.slb_approvedbyState = data['slb']['approvedbyState'],
      // this.values.slb_completedAndPendingSubmission = data['slb']['completedAndPendingSubmission'],
      // this.values.slb_pendingCompletion = data['slb']['pendingCompletion'],
      // this.values.slb_underStateReview = data['slb']['underStateReview'],
      this.values.util_approvedbyState = data['utilReport']['approvedbyState'],
      this.values.util_completedAndPendingSubmission = data['utilReport']['completedAndPendingSubmission'],
      this.values.util_pendingCompletion = data['utilReport']['pendingCompletion'],
      this.values.util_underStateReview = data['utilReport']['underStateReview'],
      // this.values.plans_approvedbyState = data['plans']['approvedbyState'],
      // this.values.plans_completedAndPendingSubmission = data['plans']['completedAndPendingSubmission'],
      // this.values.plans_pendingCompletion = data['plans']['pendingCompletion'],
      // this.values.plans_underStateReview = data['plans']['underStateReview'],
      this.values.annualAcc_audited = data['annualAccounts']['audited'],
      this.values.annualAcc_provisional = data['annualAccounts']['provisional']



    if (this.values.overall_approvedByState +
      this.values.overall_pendingForSubmission +
      this.values.overall_underReviewByState == 0
    ) {
      this.noDataFound_Overall = true
    }

    // if (this.values.pfms_notRegistered +
    //   this.values.pfms_pendingResponse +
    //   this.values.pfms_registered +
    //   this.values.slb_approvedbyState == 0
    // ) {
    //   this.noDataFound_pfms = true
    // }
    if (this.values.util_approvedbyState +
      this.values.util_completedAndPendingSubmission +
      this.values.util_pendingCompletion +
      this.values.util_underStateReview == 0
    ) {
      this.noDataFound_util = true
    }
    // if (this.values.slb_approvedbyState +
    //   this.values.slb_completedAndPendingSubmission +
    //   this.values.slb_pendingCompletion +
    //   this.values.slb_underStateReview == 0
    // ) {
    //   this.noDataFound_slb = true
    // }
    // if (this.values.plans_approvedbyState +
    //   this.values.plans_completedAndPendingSubmission +
    //   this.values.plans_pendingCompletion +
    //   this.values.plans_underStateReview == 0
    // ) {
    //   this.noDataFound_plans = true
    // }

  }


  getGrantTranfer(state_id = null, csv = null) {
    if (state_id) {
      this.GrantTransferparams.state_id = state_id
    } else {
      this.GrantTransferparams.state_id = ''
    }
    if (csv) {
      this.GrantTransferparams.csv = true
    }
    this.stateDashboardService.getGrantTransfer(this.GrantTransferparams, csv).subscribe(
      (res: any) => {
        if (csv) {
          let blob: any = new Blob([res], {
            type: "text/json; charset=utf-8",
          });
          const url = window.URL.createObjectURL(blob);
          fileSaver.saveAs(blob, "grantTransfer.xlsx");
        } else {

          this.grantTransferCardData = res['data'].ExcelData[0]
          this.grantTransferDate = res['data'].latestTime
        }
      }, (error) => {
      }
    )
    this.GrantTransferparams.csv = false
  }

  grantTransferFilter(value) {
    let data = value.split(",")
    if (data[1] == 'date') {
      this.GrantTransferparams.year = data[0]
      this.dateSelect = false
      if (data[0] == "2020-21")
        this.year21 = true
      else
        this.year21 = false
    }
    if (data[1] == 'installment') {
      this.GrantTransferparams.installment = data[0]
      this.installmentSelect = false
    }
    this.getGrantTranfer(this.id ? this.id : this.userData.state)
  }

  clearGrantTransferFillter() {
    this.GrantTransferparams.installment = null
    this.GrantTransferparams.year = null
    this.dateSelect = true
    this.installmentSelect = true
    this.getGrantTranfer(this.id ? this.id : this.userData.state)
  }

  grantTransferDownload() {
    this.getGrantTranfer(this.id ? this.id : this.userData.state, true)
  }
  getData: any = [];
  totalULBsInUA: any = [];
  totalCompletedUlb: any = [];
  totalPendingUlb: any = [];
  approvedStatusData = []
  statusData = []
  getwaterSuppyData() {
    let uasList;
    uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
    console.log('ua list for pre...', uasList)
    for (let i = 0; i < uasList.length; i++) {
      //  this.uasList.forEach(item => {
      this._WaterSupplyService.getslbsData(uasList[i]._id)
        .subscribe((res) => {
          let data = res['data']
          this.statusData = []
          this.approvedStatusData = []
          this.getData[i] = data;

          if (this.getData[i] != 'null') {
            console.log('data', i, this.totalULBsInUA, data[1]?.completedAndpendingSubmission.length +
              data[1]?.pendingCompletion.length +
              data[1]?.underStateReview.length +
              data[0]?.total);
            this.totalULBsInUA[i] = data[1]?.completedAndpendingSubmission.length +
              data[1]?.pendingCompletion.length +
              data[1]?.underStateReview.length +
              data[0]?.total;

            this.totalCompletedUlb[i] = data[0]?.total;
            this.totalPendingUlb[i] = data[1]?.completedAndpendingSubmission.length +
              data[1]?.pendingCompletion.length +
              data[1]?.underStateReview.length;
          }
        },
          (err) => {
            // this.getData.push('null');
            this.getData[i] = 'null';
            this.totalULBsInUA[i] = 'NA'
            this.totalPendingUlb[i] = 'NA'
            this.totalCompletedUlb[i] = 'NA'

          }
        )
    }
    setTimeout(() => {
      console.log('preview........full array from dashbord', this.getData)
      sessionStorage.setItem("slbStateData", JSON.stringify(this.getData));
    }, 500);
  }
}

