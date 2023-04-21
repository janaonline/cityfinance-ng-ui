import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { WaterRejenuvations2223PreviewComponent } from 'src/app/newPagesFc/xvfc2223-state/water-rejenuvations2223/water-rejenuvations2223-preview/water-rejenuvations2223-preview.component';
import { WaterRejenuvations2223ServiceService } from 'src/app/newPagesFc/xvfc2223-state/water-rejenuvations2223/water-rejenuvations2223-service.service';
import { StateDashboardService } from 'src/app/pages/stateforms/state-dashboard/state-dashboard.service';
import { StateformsService } from 'src/app/pages/stateforms/stateforms.service';
import { ImagePreviewComponent } from 'src/app/pages/ulbform/utilisation-report/image-preview/image-preview.component';
import { MapDialogComponent } from 'src/app/shared/components/map-dialog/map-dialog.component';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-projects-water-rej',
  templateUrl: './projects-water-rej.component.html',
  styleUrls: ['./projects-water-rej.component.scss']
})

export class ProjectsWaterRejComponent implements OnInit {
  
  @ViewChild("templateSave") template;
  routerNavigate = null;
  showLoader = true;
  data;
  waterRejenuvation: FormGroup;
  maxPhotos = 5;
  photosArray = [];
  errorPhotosArray = [];
  isDraft = null;
  submitted = false
  UANames = [];
  uasList
  userData = JSON.parse(localStorage.getItem("userData"));
  Year = JSON.parse(localStorage.getItem("Years"));
  uasData = JSON.parse(sessionStorage.getItem("UasList"));
  latLongRegex = "^-?([0-8]?[0-9]|[0-9]0)\\.{1}\\d{1,6}";
  isPreYear = false;
  preMess = '';
  waterIndicators = [
    "Continuity of Water supplied",
    "Cost Recovery",
    "Coverage of Water Supply connections",
    "Extent of Metering",
    "Extent of Non-revenue WaterSanitationComponent",
    "Efficiency in Collection of Water Charges",
    "Efficiency in redressal of customer complaints",
    "Per Capita Supply of Water",
    "Quality of Water Supplied",
  ];
  ;
  isDisabled = false;
  errorMsg = "One or more required fields are empty or contains invalid data. Please check your input.";;
  alertError;
  dialogRef;
  isApiInProgress = true;
  sideMenuItem;
  backRouter = '';
  nextRouter = '';
  design_year = "";
  stateId= '';
  formDisable = false;
  constructor(
    private fb: FormBuilder,
    private waterRejenuvationService: WaterRejenuvations2223ServiceService,
    private dialog: MatDialog,
    private dataEntryService: DataEntryService,
    public _stateformsService: StateformsService,
    public stateDashboardService: StateDashboardService,
    public newCommonService: NewCommonService,
  ) {
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
  }

  ngOnInit() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.setRouter();
    this.design_year = this.Year["2022-23"];
    this.setUaList();
  }

  indicatorSet(event, index, rowIndex) {
    console.log(event.target.value, rowIndex)
    let indicatorValue = event.target.value

    let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
    console.log(uaDataAtIndex._id);
    for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
      if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
        el['controls']['serviceLevelIndicators']['controls'][rowIndex]['controls']['indicator'].patchValue(indicatorValue)
      }
    }
    console.log(this.waterRejenuvation)
    // this.checkDiff();
  }


  public initializeReport() {
    this.waterRejenuvation = this.fb.group({
      state: this.fb.control(this.stateId, [Validators.required]),
      design_year: this.fb.control(this.Year["2022-23"], [Validators.required]),
      uaData: this.fb.array(this.getUas()),
      status: this.fb.control('', []),
   //   isDraft: this.fb.control(this.isDraft, []),
      declaration: this.fb.group({
        url: ['', Validators.required],
        name: ['', Validators.required]
      }),
    });

    this.patchSimValue();
  // this.changesDetection();



  }
  patchSimValue() {
    // this.waterRejenuvation?.controls?.declaration.patchValue({
    //   url: this.wData?.declaration?.url,
    //   name: this.wData?.declaration?.name,
    // })
  }

  get Uas() {
    if (!this.showLoader)
      return this.waterRejenuvation.get("uaData")["controls"] as FormArray;
  }

  getSubControlsWaterBodies(index) {
    return this.f.uaData["controls"][index]["controls"]["waterBodies"][
      "controls"
    ] as FormArray;
  }

  getSubControlsWaterReuse(index) {
    return this.f.uaData["controls"][index]["controls"]["reuseWater"][
      "controls"
    ] as FormArray;
  }
  getSubControlsServiceLevelIndicator(index) {
    return this.f.uaData["controls"][index]["controls"]["serviceLevelIndicators"][
      "controls"
    ] as FormArray;
  }

  get f() {
    return this.waterRejenuvation.controls;
  }

  getUas() {
    console.log("rejen heading...", this.data);
    return this.data.map((data) =>
      this.fb.group({
        ua: data.ua,
        status: data?.status ?? "PENDING",
        rejectReason: data?.rejectReason ?? null,
        waterBodies: this.fb.array(this.getWaterBodies(data.waterBodies)),
        reuseWater: this.fb.array(this.getReuseWater(data.reuseWater)),
        serviceLevelIndicators: this.fb.array(this.getServiceLevelIndicator(data.serviceLevelIndicators)),
        foldCard: false,
      })
    );
  }

  setUaList(){
    this.stateDashboardService.getCardData(this.stateId).subscribe(
      (res) => {
        let newList = {};
        res["data"]["uaList"].forEach((element) => {
          this.UANames.push(element.name)
          newList[element._id] = element;
        });
        sessionStorage.setItem("UasList", JSON.stringify(newList));
        this.uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
        this.uasData = JSON.parse(sessionStorage.getItem("UasList"));
        this.loadData();

      },
      (err) => {
        console.log(err);
      }
    );
  }

  getWaterBodies(dataArray) {
    console.log('dataArray dataArray', dataArray);
    return dataArray.map((data) =>
      this.fb.group({
        name: this.fb.control(data.name, [
          Validators.required,
          Validators.maxLength(50),
        ]),
        area: this.fb.control(data.area, [
          Validators.required,
          Validators.min(1),
        ]),
        nameOfBody: this.fb.control(data.nameOfBody, [
          Validators.required,
          Validators.maxLength(50),
        ]),
        lat: this.fb.control(data.lat, [
          Validators.required,
          Validators.pattern(this.latLongRegex)
        ]),
        long: this.fb.control(data.long, [
          Validators.required,
          Validators.pattern(this.latLongRegex)

        ]),
        photos: this.fb.array(this.getPhotos(data.photos), [
          Validators.required,
        ]),
        bod: this.fb.control(data.bod, [
          Validators.required,
          Validators.min(1),
        ]),
        cod: this.fb.control(data.cod, [
          Validators.required,
          Validators.min(1),
        ]),
        do: this.fb.control(data.do, [Validators.required, Validators.min(1)]),
        tds: this.fb.control(data.tds, [
          Validators.required,
          Validators.min(1),
        ]),
        turbidity: this.fb.control(data.turbidity, [
          Validators.required,
          Validators.min(1),
        ]),
        bod_expected: this.fb.control(data.bod_expected, [
          Validators.required,
          Validators.min(1),
        ]),
        cod_expected: this.fb.control(data.cod_expected, [
          Validators.required,
          Validators.min(1),
        ]),
        do_expected: this.fb.control(data.do_expected, [Validators.required, Validators.min(1)]),
        tds_expected: this.fb.control(data.tds_expected, [
          Validators.required,
          Validators.min(1),
        ]),
        turbidity_expected: this.fb.control(data.turbidity_expected, [
          Validators.required,
          Validators.min(1),
        ]),
        details: this.fb.control(data.details, [
          Validators.required,
          Validators.maxLength(200),
        ]),
        dprPreparation: this.fb.control((data?.dprPreparation ? data?.dprPreparation : ""), [
          Validators.required,
        ]),
        dprCompletion: this.fb.control((data?.dprCompletion ? data?.dprCompletion : ""), [
        ]),
        workCompletion: this.fb.control((data?.workCompletion ? data?.workCompletion : ""), [

        ]),
        isDisable: this.fb.control(data?.isDisable, [
        ]),
      })
    );
  }

  getPhotos(dataArray) {
    return dataArray?.map((data) =>
      this.fb.group({
        url: this.fb.control(data?.url, [Validators.required]),
        name: this.fb.control(data?.name, [Validators.required]),
      })
    );
  }

  getServiceLevelIndicator(dataArray) {
    console.log(dataArray)
    return dataArray?.map((data) =>
      this.fb.group({
        name: this.fb.control(data.name, [
          Validators.required,
          Validators.maxLength(50),
        ]),
        component: this.fb.control(data.component, [
          Validators.required,
          Validators.maxLength(200),
        ]),
        indicator: this.fb.control(data.indicator, [
          Validators.required,

        ]),
        existing: this.fb.control(data.existing, [
          Validators.required,

        ]),
        after: this.fb.control(data.after, [
          Validators.required,
          Validators.min(1),
        ]),
        cost: this.fb.control(data.cost, [
          Validators.required,
          Validators.min(1),
        ]),
        dprPreparation: this.fb.control((data?.dprPreparation ? data?.dprPreparation : ""), [
          Validators.required,
        ]),
        dprCompletion: this.fb.control((data?.dprCompletion ? data?.dprCompletion : ""), [
        ]),
        workCompletion: this.fb.control((data?.workCompletion ? data?.workCompletion : ""), [
        ]),
        isDisable: this.fb.control(data?.isDisable, [
          Validators.required,
        ]),

      })

    );
  }
  getReuseWater(dataArray) {
    return dataArray?.map((data) =>
      this.fb.group({
        name: this.fb.control(data.name, [
          Validators.required,
          Validators.maxLength(50),
        ]),
        treatmentPlant: this.fb.control(data.treatmentPlant, [
          Validators.required,
          Validators.maxLength(50),
        ]),
        targetCust: this.fb.control(data.targetCust, [
          Validators.required,
          Validators.maxLength(300),
        ]),
        lat: this.fb.control(data.lat, [
          Validators.required,
          Validators.pattern(this.latLongRegex)
        ]),
        long: this.fb.control(data.long, [
          Validators.required,
          Validators.pattern(this.latLongRegex)
        ]),
        stp: this.fb.control(data.stp, [
          Validators.required,
          Validators.min(1),
        ]),
        dprPreparation: this.fb.control((data?.dprPreparation ? data?.dprPreparation : ""), [
          Validators.required,
        ]),
        dprCompletion: this.fb.control((data?.dprCompletion ? data?.dprCompletion : ""), [
        ]),
        workCompletion: this.fb.control((data?.workCompletion ? data?.workCompletion : ""), [
        ]),
        isDisable: this.fb.control(data?.isDisable, [
          Validators.required,
        ]),
      })

    );
  }
 
  loadData() {
    console.log('ggggggg', this.uasData)
    this.isApiInProgress = true;
    this.waterRejenuvationService.getData(this.Year["2022-23"], this.stateId).subscribe(
      (res) => {
        this.isPreYear = true;
        this.isApiInProgress = false;
        this.data = res["data"]["uaData"];
        this.isDraft = res["data"].isDraft;
      //  this.storeData(res["data"]);
        this.showLoader = false;
        console.log("water rej data", this.data);
        this.initializeReport();
        this.setSkipLogic(this.data);
        // resolve("ss");
      },
      (err) => {
        this.showLoader = false;
        // this.data = [];
        this.isApiInProgress = false;
        this.preMess = err?.error?.message;
        this.isPreYear = false;

      }
    );
  }
  setSkipLogic(data){
    for(let i=0; i < data.length; i++){
      let uaItem = this.data[i];
      let len = uaItem?.waterBodies?.length;
      for(let j = 0; j< len; j++) {
        let dprVal = uaItem?.waterBodies[j]?.dprPreparation;
        this.onChange(dprVal, j, 'waterB', i)
        if(dprVal == 'Yes'){
          let comVal = uaItem?.waterBodies[j]?.dprCompletion
          this.onChange(comVal, j, 'waterBCom', i)
        }
      }
      let lenRej = uaItem?.reuseWater?.length;
      for(let j = 0; j < lenRej; j++) {
        let dprVal = uaItem?.reuseWater[j]?.dprPreparation;
        this.onChange(dprVal, j, 'rWater', i)
        if(dprVal == 'Yes'){
          let comVal = uaItem?.reuseWater[j]?.dprCompletion;
          this.onChange(comVal, j, 'rWaterCom', i)
        }
      }
      let lenSev = uaItem?.reuseWater?.length;
      for(let j = 0; j< lenSev; j++) {
        let dprVal = uaItem?.serviceLevelIndicators[j]?.dprPreparation;
        this.onChange(dprVal, j, 'sWater', i)
        if(dprVal == 'Yes'){
          let comVal = uaItem?.serviceLevelIndicators[j]?.dprCompletion;
          this.onChange(comVal, j, 'sWaterCom', i)
        }
      }
    }

 }

  getDisableRow(pRow) {
    //  console.log('prow...', pRow);
    return pRow?.value?.isDisable;
    // return false
  }
  // addRow2(index) {
  //   let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
  //   this.projectIndex = uaDataAtIndex
  //   console.log('22222222222222222222', uaDataAtIndex._id);
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       if (el['controls']['reuseWater'].length > 9) {
  //         this.disableAddMore1 = true;
  //         return swal('Maximum 10 Rows can be added.')
  //       }
  //     }
  //   }
  //   console.log(this.data)
  //   console.log(this.waterRejenuvation['controls']['uaData']['controls'])
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       el['controls']['reuseWater'].push(this.fb.group({
  //         name: this.fb.control({ value: null, disabled: false }, [
  //           Validators.required,
  //           Validators.maxLength(25),
  //         ]),
  //         treatmentPlant: this.fb.control({ value: null, disabled: false }, [
  //           Validators.required,
  //           Validators.maxLength(25),
  //         ]),
  //         targetCust: this.fb.control(null, [
  //           Validators.required,
  //           Validators.maxLength(300),
  //         ]),
  //         lat: this.fb.control(null, [
  //           Validators.required,
  //           Validators.pattern(this.latLongRegex)
  //         ]),
  //         long: this.fb.control(null, [
  //           Validators.required,
  //           Validators.pattern(this.latLongRegex)
  //         ]),
  //         stp: this.fb.control(null, [
  //           Validators.required,
  //           Validators.min(1),
  //         ]),
  //         dprPreparation: this.fb.control('', [
  //           Validators.required,
  //           // Validators.min(1),
  //         ]),
  //         dprCompletion: this.fb.control('', [
  //          // Validators.required,
  //           // Validators.min(1),
  //         ]),
  //         workCompletion: this.fb.control('', [
  //          // Validators.required,
  //           // Validators.min(1),
  //         ]),
  //         isDisable: this.fb.control(false, [
  //           Validators.required,
  //           // Validators.min(1),
  //         ]),
  //       })
  //       )
  //     }
  //   }
  // }
  // addRow3(index) {
  //   let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
  //   console.log(uaDataAtIndex._id);
  //   console.log(this.data)
  //   console.log('1111111', uaDataAtIndex._id);
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       if (el['controls']['serviceLevelIndicators'].length > 9) {
  //         this.disableAddMore2 = true
  //         return swal('Maximum 10 Rows can be added.')
  //       }

  //     }
  //   }
  //   console.log(this.waterRejenuvation['controls']['uaData']['controls'])
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {

  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       el['controls']['serviceLevelIndicators'].push(
  //         this.fb.group({
  //           name: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.maxLength(25),
  //           ]),
  //           component: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.maxLength(25),
  //           ]),
  //           indicator: this.fb.control(null, [
  //             Validators.required,

  //           ]),
  //           existing: this.fb.control(null, [
  //             Validators.required,

  //           ]),
  //           after: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           cost: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           dprPreparation: this.fb.control('', [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           dprCompletion: this.fb.control('', [
  //           //  Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           workCompletion: this.fb.control('', [
  //           //  Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           isDisable: this.fb.control(false, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //         })
  //       )
  //     }
  //   }
  // }
  // addRow1(index) {
  //   console.log('aaaa da', this.data)
  //   console.log('aaaa da 22321', this.waterRejenuvation)
  //   let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
  //   console.log(uaDataAtIndex._id);
  //   console.log('333333333333', uaDataAtIndex._id);
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       if (el['controls']['waterBodies'].length > 9) {
  //         this.disableAddMore3 = true;
  //         return swal('Maximum 10 Rows can be added.')
  //       }

  //     }
  //   }
  //   console.log(this.waterRejenuvation['controls']['uaData']['controls'])
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id && el['controls']['waterBodies']) {
  //       console.log('aaa el el', el['controls']['waterBodies']);
  //       el['controls']['waterBodies'].push(
  //         this.fb.group({
  //           name: this.fb.control({ value: null, disabled: false }, [
  //             Validators.required,
  //             Validators.maxLength(25),
  //           ]),
  //           nameOfBody: this.fb.control({ value: null, disabled: false }, [
  //             Validators.required,
  //             Validators.maxLength(25),
  //           ]),
  //           area: this.fb.control(null, [
  //             Validators.required,

  //           ]),
  //           photos: this.fb.array([], [
  //             Validators.required,
  //           ]),
  //           lat: this.fb.control(null, [
  //             Validators.required,
  //             Validators.pattern(this.latLongRegex)
  //           ]),
  //           long: this.fb.control(null, [
  //             Validators.required,
  //             Validators.pattern(this.latLongRegex)
  //           ]),
  //           bod: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           bod_expected: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           cod: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           cod_expected: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           do: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           do_expected: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           tds: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           tds_expected: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           turbidity: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           turbidity_expected: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           details: this.fb.control(null, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           dprPreparation: this.fb.control('', [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           dprCompletion: this.fb.control('', [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           workCompletion: this.fb.control('', [
  //            // Validators.required,
  //             // Validators.min(1),
  //           ]),
  //           isDisable: this.fb.control(false, [
  //             Validators.required,
  //             // Validators.min(1),
  //           ]),
  //         })
  //       )
  //     }
  //   }
  //   console.log('aa data', this.waterRejenuvation);

  // }

  // deleteRow1(uaIndex, rowIndex) {
  //   let uaDataAtIndex = this.uasData[this.Uas[uaIndex].value["ua"]];
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {

  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       el['controls']['reuseWater'].removeAt(rowIndex);
  //     }
  //   }
  // }
  // deleteRow2(uaIndex, rowIndex) {
  //   let uaDataAtIndex = this.uasData[this.Uas[uaIndex].value["ua"]];
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {

  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       el['controls']['serviceLevelIndicators'].removeAt(rowIndex);
  //     }
  //   }
  // }
  // deleteRow3(uaIndex, rowIndex) {
  //   let uaDataAtIndex = this.uasData[this.Uas[uaIndex].value["ua"]];
  //   for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {

  //     if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
  //       el['controls']['waterBodies'].removeAt(rowIndex);
  //       if (el['controls']['waterBodies'].length < 10) {
  //         this.disableAddMore3 = false
  //       }
  //     }
  //   }

  // }
   onChange(val, pIndex, type, uaIndex) {
    console.log('radio', val, pIndex, type, uaIndex)
    if (type == 'waterB') {
      let formSelector = this.waterRejenuvation.get("uaData").get(`${uaIndex}`)["controls"]?.waterBodies?.controls[pIndex]?.controls;
      if (val == 'Yes') {
        formSelector?.dprCompletion.setValidators(Validators.required);
        formSelector?.dprCompletion.updateValueAndValidity();
      } else {
        formSelector?.dprCompletion.reset();
        formSelector?.workCompletion.reset();
        formSelector?.dprCompletion.clearValidators();
        formSelector?.dprCompletion.updateValueAndValidity();
        formSelector?.workCompletion.clearValidators();
        formSelector?.workCompletion.updateValueAndValidity();
      }
    }
    if (type == 'waterBCom') {
      let formSelector = this.waterRejenuvation.get("uaData").get(`${uaIndex}`)["controls"]?.waterBodies?.controls[pIndex]?.controls;
      if (val == 'Yes') {
        formSelector?.workCompletion.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
        formSelector?.workCompletion.updateValueAndValidity();
      } else {
        formSelector?.workCompletion.reset();
        formSelector?.workCompletion.clearValidators();;
        formSelector?.workCompletion.updateValueAndValidity();

      }
    }

    if (type == 'rWater') {
      let formSelector = this.waterRejenuvation.get("uaData").get(`${uaIndex}`)["controls"]?.reuseWater?.controls[pIndex]?.controls;
      if (val == 'Yes') {
        formSelector?.dprCompletion.setValidators(Validators.required);
        formSelector?.dprCompletion.updateValueAndValidity();
      }else {
        formSelector?.dprCompletion.reset();
        formSelector?.workCompletion.reset();
        formSelector?.dprCompletion.clearValidators();;
        formSelector?.dprCompletion.updateValueAndValidity();
        formSelector?.workCompletion.clearValidators();;
        formSelector?.workCompletion.updateValueAndValidity();
      }
    }
    if (type == 'rWaterCom') {
      let formSelector = this.waterRejenuvation.get("uaData").get(`${uaIndex}`)["controls"]?.reuseWater?.controls[pIndex]?.controls;
      if (val == 'Yes') {
        formSelector?.workCompletion.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);;
        formSelector?.workCompletion.updateValueAndValidity();
      }else {
        formSelector?.workCompletion.reset();
        formSelector?.workCompletion.clearValidators();;
        formSelector?.workCompletion.updateValueAndValidity();
      }
    }
    if (type == 'sWater') {
      let formSelector = this.waterRejenuvation.get("uaData").get(`${uaIndex}`)["controls"]?.serviceLevelIndicators?.controls[pIndex]?.controls;
      if (val == 'Yes') {
        formSelector?.dprCompletion.setValidators(Validators.required);
        formSelector?.dprCompletion.updateValueAndValidity();
      } else {
        formSelector?.dprCompletion.reset();
        formSelector?.workCompletion.reset();
        formSelector?.dprCompletion.clearValidators();;
        formSelector?.dprCompletion.updateValueAndValidity();
        formSelector?.workCompletion.clearValidators();;
        formSelector?.workCompletion.updateValueAndValidity();
      }
    }
    if (type == 'sWaterCom') {
      let formSelector = this.waterRejenuvation.get("uaData").get(`${uaIndex}`)["controls"]?.serviceLevelIndicators?.controls[pIndex]?.controls;
      if (val == 'Yes') {
        formSelector?.workCompletion.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);;
        formSelector?.workCompletion.updateValueAndValidity();
      } else {
        formSelector?.workCompletion.reset();
        formSelector?.workCompletion.clearValidators();;
        formSelector?.workCompletion.updateValueAndValidity();
      }
    }
    console.log('formvalue after selesadasdasctse', this.waterRejenuvation)
   }
  submit() {
    console.log('form status..........', this.waterRejenuvation);
    if (this.waterRejenuvation?.status == "INVALID") {
      swal("Missing Data !", `${this.errorMsg}`, "error");
      return;
    } else {
      swal(
        "Confirmation !",
        `Are you sure you want to submit this form? Once submitted,
         it will become uneditable and will be sent to MoHUA for Review.
          Alternatively, you can save as draft for now and submit it later.`,
        "warning",
        {
          buttons: {
            Submit: {
              text: "Submit",
              value: "submit",
            },
            Draft: {
              text: "Save as Draft",
              value: "draft",
            },
            Cancel: {
              text: "Cancel",
              value: "cancel",
            },
          },
        }
      ).then((value) => {
        switch (value) {
          case "submit":
            this.finalSubmit();
            break;
          case "draft":
           // this.onDraft();
            break;
          case "cancel":
            break;
        }
      });
    }

  }

  finalSubmit() {
    let postBody = { ...this.waterRejenuvation.value, isDraft: false }
    if (this.userData?.role === "STATE") {
      // this.waterRejenuvation.controls.isDraft.patchValue(false);
      console.log(this.waterRejenuvation.controls);
      this.waterRejenuvationService
        .postWaterRejeData(postBody)
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              console.log('latest post data water rej --->', res)
              swal({
                title: "Submitted",
                text: res?.message,
                icon: "success",
              });
              // this.getFormData();
              this.waterRejenuvation.disable();
              this.isDisabled = true;
              this.newCommonService.setStateFormStatus2223.next(true);
              sessionStorage.setItem("changeInWaterRejenuvation2223", "false");
            } else {
              swal("Error", res?.message ? res?.message : "Error", "error");
            }
          },
          (err) => {
            swal("Error", "Error", "error");
          }
        );
    }
  }
 
  foldCard(index) {
    this.Uas[index].controls.foldCard.value =
      !this.Uas[index].controls.foldCard.value;
  }

  checkCard(index) {
    return this.Uas[index].controls.foldCard.value;
  }

  imgPreview(waterIndex, uaIndex) {
    let waterBodies = this.getSubControlsWaterBodies(uaIndex);
    let imgData = waterBodies[waterIndex].controls.photos.value;
    if (imgData.length == 0) {
      return swal("No photos added", "", "warning");
    }
    let dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: imgData,
      height: "400px",
      width: "500px",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  removePhotos(waterIndex, uaIndex) {
    if (this.formDisable) return
    let mess = window.confirm("Do you want delete all photos");
    let control = this.getSubControlsWaterBodies(uaIndex);
    let photoControl = control[waterIndex].controls.photos;
    if (mess) {
      photoControl.clear();
      swal(`All photos deleted`, "successfully", "success");
    }
  }

  openMap(nameIndex, uaIndex, name): void {
    if (this.formDisable) return
    let data;
    if (name == "waterBodies") {
      data = {
        lat: this.getSubControlsWaterBodies(uaIndex)[nameIndex].controls.lat
          .value,
        long: this.getSubControlsWaterBodies(uaIndex)[nameIndex].controls.long
          .value,
      };
    } else {
      data = {
        lat: this.getSubControlsWaterReuse(uaIndex)[nameIndex].controls.lat
          .value,
        long: this.getSubControlsWaterReuse(uaIndex)[nameIndex].controls.long
          .value,
      };
    }
    if (data.lat == null || data.long == null) {
      data = null;
    }
    const dialogRef = this.dialog.open(MapDialogComponent, {
      data: data,
      width: "auto",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe((result) => {
      let temp;
      if (name == "waterBodies") {
        temp = this.getSubControlsWaterBodies(uaIndex);
      } else {
        temp = this.getSubControlsWaterReuse(uaIndex);
      }
      temp[nameIndex].controls.lat.patchValue(result.lat);
      temp[nameIndex].controls.long.patchValue(result.long);
    });
  }
  disablePreviousInput() {

    console.log('water form.....', this.waterRejenuvation);
    console.log('data....', this.data);
    let dataArray = this.data[0];
    for (let i = 0; i < dataArray?.waterBodies?.length; i++) {
      let data = dataArray?.waterBodies[i];
      if (data?.isDisable == false) {
        this.fb.group({
          name: this.fb.control(data.name, [
            Validators.required,
            Validators.maxLength(25),
          ]),
          area: this.fb.control(data.area, [
            Validators.required,
            Validators.min(1),
          ]),
          nameOfBody: this.fb.control(data.nameOfBody, [
            Validators.required,
            Validators.maxLength(25),
          ]),
          lat: this.fb.control(data.lat, [
            Validators.required,
            Validators.pattern(this.latLongRegex)
          ]),
          long: this.fb.control(data.long, [
            Validators.required,
            Validators.pattern(this.latLongRegex)

          ]),
          photos: this.fb.array(this.getPhotos(data.photos ? data.photos : []), [
            Validators.required,
          ]),
          bod: this.fb.control(data.bod, [
            Validators.required,
            Validators.min(1),
          ]),
          cod: this.fb.control(data.cod, [
            Validators.required,
            Validators.min(1),
          ]),
          do: this.fb.control(data.do, [Validators.required, Validators.min(1)]),
          tds: this.fb.control(data.tds, [
            Validators.required,
            Validators.min(1),
          ]),
          turbidity: this.fb.control(data.turbidity, [
            Validators.required,
            Validators.min(1),
          ]),
          bod_expected: this.fb.control(data.bod_expected, [
            Validators.required,
            Validators.min(1),
          ]),
          cod_expected: this.fb.control(data.cod_expected, [
            Validators.required,
            Validators.min(1),
          ]),
          do_expected: this.fb.control(data.do_expected, [Validators.required, Validators.min(1)]),
          tds_expected: this.fb.control(data.tds_expected, [
            Validators.required,
            Validators.min(1),
          ]),
          turbidity_expected: this.fb.control(data?.turbidity_expected, [
            Validators.required,
            Validators.min(1),
          ]),
          details: this.fb.control(data?.details, [
            Validators.required,
            Validators.maxLength(200),
          ]),
          dprCompletion: this.fb.control(data?.dprCompletion, [
            Validators.required,
            // Validators.min(1),
          ]),
          workCompletion: this.fb.control(data?.workCompletion, [
            Validators.required,
            // Validators.min(1),
          ]),
          isDisable: this.fb.control(data?.isDisable, [
            Validators.required,
            // Validators.min(1),
          ]),
        })
      } else {
        this.fb.group({
          name: this.fb.control({ value: data.name, disabled: true }, [
            Validators.required,
            Validators.maxLength(25),
          ]),
          area: this.fb.control(data.area, [
            Validators.required,
            Validators.min(1),
          ]),
          nameOfBody: this.fb.control({ value: data?.nameOfBody, disabled: true }, [
            Validators.required,
            Validators.maxLength(25),
          ]),
          lat: this.fb.control({ value: data?.lat, disabled: true }, [
            Validators.required,
            Validators.pattern(this.latLongRegex)
          ]),
          long: this.fb.control({ value: data?.long, disabled: true }, [
            Validators.required,
            Validators.pattern(this.latLongRegex)

          ]),
          photos: this.fb.array(this.getPhotos(data.photos ? data.photos : []), [
            Validators.required,
          ]),
          bod: this.fb.control({ value: data?.bod, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          cod: this.fb.control({ value: data?.cod, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          do: this.fb.control({ value: data?.do, disabled: true }, [Validators.required, Validators.min(1)]),
          tds: this.fb.control({ value: data?.tds, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          turbidity: this.fb.control({ value: data?.turbidity, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          bod_expected: this.fb.control({ value: data?.bod_expected, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          cod_expected: this.fb.control({ value: data?.cod_expected, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          do_expected: this.fb.control({ value: data?.do_expected, disabled: true }, [Validators.required, Validators.min(1)]),
          tds_expected: this.fb.control({ value: data?.tds_expected, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          turbidity_expected: this.fb.control({ value: data?.turbidity_expected, disabled: true }, [
            Validators.required,
            Validators.min(1),
          ]),
          details: this.fb.control({ value: data?.details, disabled: true }, [
            Validators.required,
            Validators.maxLength(200),
          ]),
          dprCompletion: this.fb.control({ value: data?.dprCompletion, disabled: true }, [
            Validators.required,
            // Validators.min(1),
          ]),
          workCompletion: this.fb.control({ value: data?.workCompletion, disabled: true }, [
            Validators.required,
            // Validators.min(1),
          ]),
          isDisable: this.fb.control(data?.isDisable, [
            Validators.required,
            // Validators.min(1),
          ]),
        })
      }
    }
  }
  async onFileChange(event, waterIndex, uaIndex) {
    console.log('pic uplaod', event);
    if (this.formDisable) return
    this.photosArray = [];
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>? \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    let file = event.target.files[0];
    let fileExtension = file.name.split(".").pop();
    if(fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg'){
      swal('Error', 'Please select "PNG" or "JPG", or "JPEG" type file', 'error')
      return
    }
    const files = event.target.files;
    let msg = "Photo uploaded successfully.";
    let title = "Success";
    let status = "success";

    let control = this.getSubControlsWaterBodies(uaIndex);
    let photoControl = control[waterIndex].controls.photos;
    let leftNum = this.checkPhotos(files.length, photoControl);
    if (typeof leftNum === "boolean") {
      swal(
        `Max ${this.maxPhotos} photos are allowed`,
        "Delete saved Photos to Continue.",
        "error"
      );
      return;
    }

    let size = leftNum;
    for (const key in files) {
      if (key == "length") break;
      if (size == 0) {
        msg = `First ${files.length - leftNum} uploaded successfully`;
        title = `Max ${this.maxPhotos} photos are allowed`;
        status = "warning";
        break;
      }
      await this.uploadFile(files[key], files[key].name, files[key].type);
      size--;
    }

    let photo = this.getPhotos(this.photosArray);
    photo.forEach((element) => {
      photoControl.push(element);
    });
    swal(title, msg, status);
  }

  checkPhotos(size, photoControl) {
    let photoControlSize = photoControl.value.length ?? 0;
    if (photoControlSize == this.maxPhotos) return false;
    return this.maxPhotos - photoControlSize;
  }

  uploadFile(file, name, type) {
    return new Promise<void>((resolve, reject) => {
      let folderName = `${this.userData?.role}/2022-23/projects_wss/${this.userData?.stateCode}`
      this.dataEntryService.newGetURLForFileUpload(name, type, folderName).subscribe(
        async (s3Response) => {
          const res = s3Response.data[0];
          await this.uploadFileToS3(file, res["url"], res["file_url"]);
          this.photosArray.push({ url: res["file_url"], name });
          resolve();
        },
        (err) => {
          console.log(err);
          this.errorPhotosArray.push(file);
        }
      );
    });
  }

  private uploadFileToS3(file: File, s3URL: string, fileAlias: string) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            resolve("aa")
          }
        },
        (err) => {
          this.errorPhotosArray.push(file);
          console.log(err);
        }
      );
    })
  }

  uaIdToName(index) {
    if (this.uasData) {
      let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
      return uaDataAtIndex.name;
    }
  }


  saveButtonClicked() {
    this.submitted = true
    this.submit();
  }

  onPreview() {
    let change = sessionStorage.getItem("changeInWaterRejenuvation2223");
   // if (change == "true")
     // this.waterRejenuvation?.controls?.isDraft?.patchValue(!this.formStatus);
    let data = this.waterRejenuvation?.value;
    console.log(data);
    for (let index = 0; index < data?.uaData?.length; index++) {
      data.uaData[index].name = this.uasData[data?.uaData[index].ua]?.name;
    }
    let dialogRef = this.dialog.open(WaterRejenuvations2223PreviewComponent, {
      data: data,
      height: "80%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  checkErrorState(projectRow, val) {
    // if (this.errorOnload) {
    //   return projectRow.controls[val]?.invalid;
    // }
    // return (
    //   projectRow.controls[val]?.invalid &&
    //   (projectRow.controls[val].dirty || projectRow.controls[val].touched)
    // );
  }


  latLong(value, event, type) {
    let val;
    val = parseInt(value);
    if (isNaN(val)) {
      // event.controls[type].patchValue(0.0);
      return;
    }
    val = value.split(".")
    if (val[1] && val[1].length > 6) {
      val[1] = val[1].slice(0, 6)
    }
    if (val[0].length > 4) {
      val[0] = val[0].slice(0, 4)
    }
    event.controls[type].patchValue(val[0] + (val[1] ? "." + val[1] : ""));
  }
 
  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.url == "water-rejenuvation") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
         // this.formId = element?._id;

        }
      });
    }
  }
warningForAmount(val){
  if(val < 40){
    swal('Alert !', `Project progress does not meet with conditions from operations guidelines para 9.2
     but ULB can still submit.`, 'warning');
  }
  }
}


