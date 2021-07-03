import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { pipe } from 'rxjs';
import { StateDashboardService } from "../../stateforms/state-dashboard/state-dashboard.service";
import { OverallListComponent } from '../../stateforms/state-dashboard/overall-list/overall-list.component'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { PfmsListComponent } from '../../stateforms/state-dashboard/pfms-list/pfms-list.component'
import { PlansListComponent } from '../../stateforms/state-dashboard/plans-list/plans-list.component'
import { SlbListComponent } from '../../stateforms/state-dashboard/slb-list/slb-list.component'
import { UtilreportListComponent } from '../../stateforms/state-dashboard/utilreport-list/utilreport-list.component'
import { AnnualaccListComponent } from '../../stateforms/state-dashboard/annualacc-list/annualacc-list.component'
import { ReUseableHeatMapComponent } from '../../../shared/components/re-useable-heat-map/re-useable-heat-map.component';
import * as $ from 'jquery';
import { constants } from 'buffer';
import * as JSC from "jscharting";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { ULBWithMapData } from 'src/app/shared/models/ulbsForMapResponse';
import { CommonService } from 'src/app/shared/services/common.service';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { IMapCreationConfig } from 'src/app/util/map/models/mapCreationConfig';
import { UserUtility } from 'src/app/util/user/user';



@Component({
  selector: 'app-mohua-dashboard',
  templateUrl: './mohua-dashboard.component.html',
  styleUrls: ['./mohua-dashboard.component.scss']
})
export class MohuaDashboardComponent implements OnInit {
  constructor(
    public stateDashboardService: StateDashboardService,
    public dialog: MatDialog,
    protected commonService: CommonService,
    protected _snackbar: MatSnackBar,
    protected geoService: GeographicalService,
    protected _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.geoService.loadConvertedIndiaGeoData().subscribe((data) => {
      try {
        this.mapGeoData = data;
        setTimeout(() => {
          this.createNationalLevelMap(data, "finance-law-map");
          // this.loadSlides();
        }, 1);
      } catch (error) {
        console.error(error);
      }
    });
    this.commonService.states.subscribe((res) => {
      this.states = res;
    });
    this.commonService.loadStates(true);
    this.onLoad();
  }
  mapGeoData: FeatureCollection<
    Geometry,
    {
      [name: string]: any;
    }
  >;
  states: any;
  list = [];
  selectedStates = ["criteria"];
  stateName = "";

  stateColors = {
    unselected: "#E5E5E5",
    selected: "#059b9a",
  };
  nationalLevelMap: L.Map;

  statesLayer: L.GeoJSON<any>;

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
  ulbs = 0;
  width1 = '';
  width2 = '';
  width3 = '';
  width4 = '';
  UANames = []
  maindonughtChart;
  pfmsdonughtChart;
  utilreportDonughtChart;
  slbdonughtChart
  piechart;

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
  calculateVH(vh: number) {
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (vh * h) / 100;
  }

  calculateMapZoomLevel() {
    let zoom: number;
    const userUtil = new UserUtility();
    if (userUtil.isUserOnMobile()) {
      zoom = 3.8 + (window.devicePixelRatio - 2) / 10;
      if (window.innerHeight < 600) zoom = 3.6;
      const valueOf1vh = this.calculateVH(1);
      if (valueOf1vh < 5) zoom = 3;
      else if (valueOf1vh < 7) zoom = zoom - 0.2;
      return zoom;
    }

    const defaultZoomLevel =
      (Math.max(document.documentElement.clientWidth) - 1366) / 1366 + 4;
    try {
      zoom = localStorage.getItem("mapZoomLevel")
        ? +localStorage.getItem("mapZoomLevel")
        : defaultZoomLevel;
    } catch (error) {
      zoom = defaultZoomLevel;
    }

    return zoom;
  }
  createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    const zoom = this.calculateMapZoomLevel();

    const configuration = {
      containerId,
      geoData,
      options: {
        zoom,
        minZoom: zoom,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
        tap: false,
      },
    };
    let map;

    ({ stateLayers: this.statesLayer, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;

    this.statesLayer.eachLayer((layer) => {
      (layer as any).bringToBack();
      (layer as any).on({
        click: (args: ILeafletStateClickEvent) => {
          // this.onClickingStateOnMap(args);
        },
      });
    });
  }
  // onClickingStateOnMap(stateLayer: ILeafletStateClickEvent) {
  //   const stateName = MapUtil.getStateName(stateLayer).toLowerCase();
  //   // const stateList = this.slides[this.currentSlideIndex].states;
  //   const list = this.slides.find((slide) => {
  //     const slideHasState = !!slide.states.find(
  //       (name) => name.toLowerCase() === stateName
  //     );
  //     return slideHasState;
  //   });

  //   if (!list) {
  //     return;
  //   }

  //   // const stateFound = !!stateList.find(
  //   //   (name) => name.toLowerCase() == stateName
  //   // );

  //   this.showStateGroup({ states: list.states }, stateName);
  // }
  // showStateGroup(item, stateToShow?: string) {
  //   const stateList = item.states;
  //   this.selectedStates = ["criteria"];

  //   this.states.forEach((state) => {
  //     if (
  //       stateList.indexOf(state.name.toLowerCase()) > -1 &&
  //       (stateToShow ? stateToShow == state.name.toLowerCase() : true)
  //     ) {
  //       this.addToCompare(state);
  //     } else {
  //       state.selected = false;
  //     }
  //   });
  //   this.showComparisionPage();
  // }

  openDialogAnnual() {
    const dialogRef = this.dialog.open(AnnualaccListComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogSlb() {
    const dialogRef = this.dialog.open(SlbListComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogPlans() {
    const dialogRef = this.dialog.open(PlansListComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogPfms() {
    const dialogRef = this.dialog.open(PfmsListComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogUtil() {
    const dialogRef = this.dialog.open(UtilreportListComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialog() {

    const dialogRef = this.dialog.open(OverallListComponent, {
      height: '1000px',
      width: '1600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    this.pfmsdonughtChart = new Chart(ctx, {
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
        '213 - Under State Review',
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
    this.utilreportDonughtChart = new Chart(ctx, {
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
        '213 - Under State Review',
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
    this.slbdonughtChart = new Chart(ctx, {
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
    this.maindonughtChart = new Chart(ctx, {
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
        '103 - Pending Completion',
        '213 - Completed and Pending Submission',
        '76 - Under State Review',
        '213 - Approved by State'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 30],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(155, 215, 86)'

        ],
        hoverOffset: 4
      }],

    };


    const canvas = <HTMLCanvasElement>document.getElementById('pfm');
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

            padding: 18,
          }
        }
      }
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
    this.maindonughtChart.destroy();
    this.utilreportDonughtChart.destroy();
    this.slbdonughtChart.destroy();
    this.pfmsdonughtChart.destroy();
    this.piechart.destroy();
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
    this.ulbs = 0;
    this.plans = 0;
    this.plansDataApiRes['data'].forEach(element => {
      if (element.UA === this.selectUa) {
        this.ulbs = element.ulbs;
        this.plans = element.ulbCount;
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
