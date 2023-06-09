import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { WaterRejenuvations2223PreviewComponent } from 'src/app/newPagesFc/xvfc2223-state/water-rejenuvations2223/water-rejenuvations2223-preview/water-rejenuvations2223-preview.component';
import { WaterRejenuvations2223ServiceService } from 'src/app/newPagesFc/xvfc2223-state/water-rejenuvations2223/water-rejenuvations2223-service.service';
import { StateDashboardService } from 'src/app/pages/stateforms/state-dashboard/state-dashboard.service';
import { StateformsService } from 'src/app/pages/stateforms/stateforms.service';
import { ImagePreviewComponent } from 'src/app/pages/ulbform/utilisation-report/image-preview/image-preview.component';
import { MapDialogComponent } from 'src/app/shared/components/map-dialog/map-dialog.component';
import { SweetAlert } from "sweetalert/typings/core";
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import {minMaxValue} from 'src/app/fc-grant-2324-onwards/fc-shared/utilities/minMaxNumber'
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
  isCompleteUploading:boolean = false;
  isDraft = null;
  submitted = false;
  UANames = [];
  uasList
  userData = JSON.parse(localStorage.getItem("userData"));
  Year = JSON.parse(localStorage.getItem("Years"));
  uasData = JSON.parse(sessionStorage.getItem("UasList"));
  latLongRegex = "^-?([0-8]?[0-9]|[0-9]0)\\.{1}\\d{1,6}";
  isPreYear = false;
  preMess = '';
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
  waterIndicators = [
      // {
      //   id: 1,
      //   name:'Coverage of Water Supply connections',
      //   min: 0,
      //   max:100,
      //   unit: '%',
      //   isShow: true
      // },
      // {
      //   id: 2,
      //   name:'Per Capita Supply of Water',
      //   min: 0,
      //   max:999,
      //   unit: 'lpcd',
      //   isShow: true
      // },
      // {
      //   id: 3,
      //   name:'Extent of metering of water connections',
      //   min: 0,
      //   max:100,
      //   unit: '%',
      //   isShow: true
      // },
      // {
      //   id: 4,
      //   name:'Extent of non-revenue water (NRW)',
      //   min: 0,
      //   max:100,
      //   unit: '%',
      //   isShow: true
      // },
      // {
      //   id: 5,
      //   name:'Continuity of Water supply',
      //   min: 0,
      //   max: 24,
      //   unit: 'Hours per day',
      //   isShow: true
      // },
      // {
      //   id: 6,
      //   name: 'Efficiency in redressal of customer complaints',
      //   min: 0,
      //   max:100,
      //   unit: '%',
      //   isShow: true
      // },
      // {
      //   id: 7,
      //   name: 'Quality of water supplied',
      //   min: 0,
      //   max:100,
      //   unit: '%',
      //   isShow: true
      // },
      // {
      //   id: 8,
      //   name:'Cost recovery in water supply service',
      //   min: 0,
      //   max:100,
      //   unit: '%',
      //   isShow: true
      // },
      // {
      //   id: 9,
      //   name:'Efficiency in collection of water supply-related charges',
      //   min: 0,
      //   max:100,
      //   unit: '%',
      //   isShow: true
      // },
  ]

waterRejRes = {
 formId: '',
 status: '',
 formName: 'Projects for Water Supply and Sanitation',
 tables: [
    {
      tableName:'Fill Details of Project for Rejuvenation of Water Bodies',
      position: 1,
      addProjectAvailable : false,
      columns:  [
        {
          key: 'sNo',
          displayName: 'S.No',
           info: '',
              width: ''
        },
        {
          key: 'projectName',
          displayName: 'Project Name',
           info: '',
              width: ''
        },
        {
          key: 'nameOfWaterBody',
          displayName: 'Name Of Water Body',
           info: '',
              width: ''
        },
        {
          key: 'area',
          displayName: 'Area',
           info: '',
              width: ''
        },
        {
          key: 'uploadPhoto',
          displayName: 'Upload Photo',
           info: '',
              width: ''
        },
        {
          key: 'location',
          displayName: 'Location',
           info: '',
              width: ''
        },
        {
          key: '',
          displayName: '',
           info: '',
          width: ''
        },
        {
          key: 'bod',
          displayName: 'BOD in mg/L',
           info: '',
              width: ''
        },
        {
          key: 'cod',
          displayName: 'COD in mg/L',
           info: '',
              width: ''
        },
        {
          key: 'do',
          displayName: 'DO in mg/L',
           info: '',
              width: ''
        },
        {
          key: 'tds',
          displayName: 'TDS in mg/L',
           info: '',
              width: ''
        },
        {
          key: 'turbidity',
          displayName: 'Turbidity in NTU',
           info: '',
              width: ''
        },
        {
          key: 'projectDetails',
          displayName: 'Project Details',
           info: '',
              width: ''
        },
        {
          key: 'preparationofDPR',
          displayName: 'Preparation of DPR',
           info: '',
          width: '10%'
        },
        {
          key: 'tenderingProcess',
          displayName: 'Completion of tendering process',
           info: '',
          width: '10%'
        },
        {
          key: 'workCompletion',
          displayName: '% of work completion',
           info: '',
              width: ''
        },
       
      ]
    },
    {
      tableName:'Fill Details of Projects for Recycling and Reuse of Water',
      position: 2,
      addProjectAvailable : false,
      columns: [
        {
          key: 'sNo',
          displayName: 'S.No',
          info: '',
          width: ''
        }, 
        {
          key: 'projectName',
          displayName: 'Project Name',
          info: '',
          width: ''
        },
        {
          key: 'location',
          displayName: 'Location of Water Treatment Plant',
          info: '',
          width: ''
        },
        {
          key: 'proposedCapacity',
          displayName: 'Proposed capacity of STP(MLD)',
          info: '',
          width: ''
        },
        {
          key: 'proposedQuantity',
          displayName: 'Proposed water quantity to be reused(MLD)',
          info: '',
          width: ''
        },
        {
          key: 'targetReuseOfWater',
          displayName: 'Target customers/ consumer for reuse of water',
          info: '',
          width: ''
        },
        {
          key: 'preparationofDPR',
          displayName: 'Preparation of DPR',
          info: '',
          width: '10%'
        },
        {
          key: 'tenderingProcess',
          displayName: 'Completion of tendering process',
          info: '',
          width: '10%'
        },
        {
          key: 'workCompletion',
          displayName: '% of work completion',
          info: '',
          width: ''
        },   
  ] 
    },
    {
      tableName:'Details of Proposed Project to Improve Service Level Indicators related to Water Supply',
      position: 3,
      addProjectAvailable : false,
      columns: [
        {
          key: 'sNo',
          displayName: 'S.No',
          info: '',
          width: ''
        }, 
        {
          key: 'projectName',
          displayName: 'Project Name',
          info: '',
          width: ''
        },
        {
          key: 'physicalComponents',
          displayName: 'Physical Components',
          info: 'such as no. of tap connections, length of water pipeline to be laid, capacity of water treatment plan to be set up',
          width: ''
        },
        {
          key: 'indicator',
          displayName: 'Indicator',
          info: '',
           width: ''
        },
        {
          key: 'existing',
          displayName: 'Existing (As-is)',
          info: '',
          width: ''
        },
        {
          key: 'after',
          displayName: 'After (To-be)',
          info: '',
          width: ''
        },
        {
          key: 'estimatedCost',
          displayName: 'Estimated Cost (Amount in INR Lakhs)',
          info: '',
          width: ''
        },
        {
          key: 'preparationofDPR',
          displayName: 'Preparation of DPR',
          info: '',
          width: '10%'
        },
        {
          key: 'tenderingProcess',
          displayName: 'Completion of tendering process',
          info: '',
          width: '10%'
        },
        {
          key: 'workCompletion',
          displayName: '% of work completion',
          info: '',
          width: ''
        },
      ],
    }
  ]
}
maxNumVaditaion:number;
errorOnload:boolean = false;
  constructor(
    private fb: FormBuilder,
    private waterRejenuvationService: WaterRejenuvations2223ServiceService,
    private dialog: MatDialog,
    private dataEntryService: DataEntryService,
    public stateDashboardService: StateDashboardService,
    private _snackBar: MatSnackBar,
    private commonServices: CommonServicesService
  ) {
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.getIndicatorLineItem();
  }

  ngOnInit() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.setRouter();
    this.design_year = this.Year["2023-22"];
    this.setUaList();
    this.maxNumVaditaion = minMaxValue;
  }

  indicatorSet(event, index, rowIndex) {
    console.log(event.target.value, rowIndex)
    let indicatorValue = event.target.value;
    let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
    console.log(uaDataAtIndex._id);
    for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
      if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
        el['controls']['serviceLevelIndicators']['controls'][rowIndex]['controls']['indicator'].patchValue(indicatorValue);
        el['controls']['serviceLevelIndicators']['controls'][rowIndex]['controls']['existing']?.patchValue('');
        el['controls']['serviceLevelIndicators']['controls'][rowIndex]['controls']['after']?.patchValue('');
      }
    }
  }


  public initializeReport() {
    this.waterRejenuvation = this.fb.group({
      state: this.fb.control(this.stateId, [Validators.required]),
      design_year: this.fb.control(this.Year["2023-24"], [Validators.required]),
      uaData: this.fb.array(this.getUas()),
      status: this.fb.control('', []),
   //   isDraft: this.fb.control(this.isDraft, []),
      declaration: this.fb.group({
        url: ['', Validators.required],
        name: ['', Validators.required]
      }),
    });

  // this.changesDetection();
  }
  patchSimValue(data) {
    this.waterRejenuvation?.controls?.declaration.patchValue({
      url: data?.declaration?.url,
      name: data.declaration?.name,
    })
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
        status: data?.status ?? 2,
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
     this.waterBodiesFormElem(data)
    );
  }

  getPhotos(dataArray) {
    if(dataArray){
      return dataArray?.map((data) =>
      this.fb.group({
        url: this.fb.control(data?.url, [Validators.required]),
        name: this.fb.control(data?.name, [Validators.required]),
      })
    );
    }else{
      return []
    }
   
  }

  getServiceLevelIndicator(dataArray) {
    console.log(dataArray)
    return dataArray?.map((data) =>
      this.slbFormElem(data)
    );
  }
  getReuseWater(dataArray) {
    return dataArray?.map((data) =>
    this.waterReuseFormElem(data)
    );
  }
 
  loadData() {
    console.log('ggggggg', this.uasData)
    this.isApiInProgress = true;
    this.waterRejenuvationService.getData(this.Year["2023-24"], this.stateId).subscribe(
      (res) => {
        this.isPreYear = true;
        this.isApiInProgress = false;
        this.errorOnload = true;
        this.data = res["data"]["uaData"];
        this.isDraft = res["data"].isDraft;
        this.initializeReport();
        this.patchSimValue(res["data"]);
        this.showLoader = false;
        console.log("water rej data", this.data); 
        this.setSkipLogic(this.data);
        this.isDisabled = this.setDisableForm(res["data"]);
        if(this.isDisabled) this.waterRejenuvation.disable();
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
  waterBodiesFormElem(data) {
    return  this.fb.group({
      name: this.fb.control(data?.name, [Validators.required, Validators.maxLength(50)]),
      area: this.fb.control(data?.area, [Validators.required,Validators.min(0)]),
      nameOfBody: this.fb.control(data?.nameOfBody, [Validators.required, Validators.maxLength(50)]),
      lat: this.fb.control(data?.lat, [Validators.required,Validators.pattern(this.latLongRegex)]),
      long: this.fb.control(data?.long, [Validators.required, Validators.pattern(this.latLongRegex)]),
      photos: this.fb.array(this.getPhotos(data?.photos), [Validators.required]),
      bod: this.fb.control(data?.bod, [Validators.required,Validators.min(0)]),
      cod: this.fb.control(data?.cod, [Validators.required,Validators.min(0)]),
      do: this.fb.control(data?.do, [Validators.required, Validators.min(0)]),
      tds: this.fb.control(data?.tds, [ Validators.required,Validators.min(0)]),
      turbidity: this.fb.control(data?.turbidity, [Validators.required,Validators.min(0)]),
      bod_expected: this.fb.control(data?.bod_expected, [Validators.required,Validators.min(0)]),
      cod_expected: this.fb.control(data.cod_expected, [Validators.required,Validators.min(0)]),
      do_expected: this.fb.control(data?.do_expected, [Validators.required, Validators.min(0)]),
      tds_expected: this.fb.control(data?.tds_expected, [Validators.required,Validators.min(0)]),
      turbidity_expected: this.fb.control(data?.turbidity_expected, [Validators.required,Validators.min(0)]),
      details: this.fb.control(data?.details, [Validators.required,Validators.maxLength(200)]),
      dprPreparation: this.fb.control((data?.dprPreparation ? data?.dprPreparation : ""), [Validators.required]),
      dprCompletion: this.fb.control((data?.dprCompletion ? data?.dprCompletion : ""), []),
      workCompletion: this.fb.control((data?.workCompletion ? data?.workCompletion : ""), []),
      isDisable: this.fb.control(data?.isDisable, []),
    })
  
  }
  slbFormElem(data){
    return this.fb.group({
      name: this.fb.control(data.name, [ Validators.required, Validators.maxLength(50)]),
      component: this.fb.control(data.component, [ Validators.required,Validators.maxLength(200)]),
      indicator: this.fb.control(data.indicator, [ Validators.required]),
      existing: this.fb.control(data.existing, [ Validators.required ]),
      after: this.fb.control(data.after, [ Validators.required, Validators.min(0)]),
      cost: this.fb.control(data.cost, [Validators.required, Validators.min(0)]),
      dprPreparation: this.fb.control((data?.dprPreparation ? data?.dprPreparation : ""), [Validators.required]),
      dprCompletion: this.fb.control((data?.dprCompletion ? data?.dprCompletion : ""), []),
      workCompletion: this.fb.control((data?.workCompletion ? data?.workCompletion : ""), []),
      isDisable: this.fb.control(data?.isDisable, []),
      bypassValidation: this.fb.control(data?.bypassValidation ? data?.bypassValidation : false, []),
    })
  }
  waterReuseFormElem(data){
    return this.fb.group({
      name: this.fb.control(data.name, [Validators.required,Validators.maxLength(50)]),
      treatmentPlant: this.fb.control(data.treatmentPlant, [Validators.required,Validators.maxLength(50)]),
      targetCust: this.fb.control(data.targetCust, [Validators.required,Validators.maxLength(300)]),
      lat: this.fb.control(data.lat, [Validators.required,Validators.pattern(this.latLongRegex)]),
      long: this.fb.control(data.long, [Validators.required,Validators.pattern(this.latLongRegex)]),
      stp: this.fb.control(data.stp, [Validators.required,Validators.min(0)]),
      dprPreparation: this.fb.control((data?.dprPreparation ? data?.dprPreparation : ""), [Validators.required]),
      dprCompletion: this.fb.control((data?.dprCompletion ? data?.dprCompletion : ""), []),
      workCompletion: this.fb.control((data?.workCompletion ? data?.workCompletion : ""), []),
      isDisable: this.fb.control(data?.isDisable, []),
    })
  }
  addRow(index, tableIndex, controlName) {
    let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
    for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
      if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
        if (el['controls'][controlName].length > 9) {
           this.waterRejRes.tables[tableIndex].addProjectAvailable = true;
          return swal('Maximum 10 Rows can be added.')
        }

      }
    }
    for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
      if (el['controls']['ua']['value'] == uaDataAtIndex._id && el['controls'][controlName]) {
        console.log('aaa el el', el['controls'][controlName]);
        let elem;
        if(controlName == 'waterBodies') elem = this.waterBodiesFormElem([]);
        if(controlName == 'reuseWater') elem =  this.waterReuseFormElem([]);
        if(controlName == 'serviceLevelIndicators') elem = this.slbFormElem([]);
       el['controls'][controlName].push(elem)
      }
    }
    console.log('aa data', this.waterRejenuvation);

  }

  deleteRow(uaIndex, rowIndex, tableIndex, controlName) {
    let uaDataAtIndex = this.uasData[this.Uas[uaIndex].value["ua"]];
    for (let el of this.waterRejenuvation['controls']['uaData']['controls']) {
      if (el['controls']['ua']['value'] == uaDataAtIndex._id) {
        el['controls'][controlName].removeAt(rowIndex);
        if (el['controls'][controlName].length < 10) {
          this.waterRejRes.tables[tableIndex].addProjectAvailable = false
       }
      }
    }
  }
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
            this.finalSubmit(false);
            break;
          case "draft":
            this.finalSubmit(true);
            break;
          case "cancel":
            break;
        }
      });
    }

  }

  finalSubmit(draft) {
    let postBody;
    if(draft == false){ postBody = { ...this.waterRejenuvation.value, isDraft: false }}
    if(draft == true) postBody = { ...this.waterRejenuvation.value, isDraft: true }
    postBody["status"] = (draft == false) ? 4 : 2;
    if (this.userData?.role === "STATE") {
      console.log(this.waterRejenuvation.controls);
      this.waterRejenuvationService
        .postWaterRejeData(postBody)
        .subscribe(
          (res: any) => {

            swal("Saved", `Data saved ${draft ? 'as draft' : ''} successfully`, "success");
              // this.getFormData();
              this.commonServices.setFormStatusState.next(true);
           if(draft == false){
            this.waterRejenuvation.disable();
            this.isDisabled = true; 
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
      height: "450px",
      width: "550px",
      panelClass: ["no-padding-dialog", "custom-dialog-container"],
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

  checkPhotos(size, photoControl) {
    let photoControlSize = photoControl.value.length ?? 0;
    if (photoControlSize == this.maxPhotos) return false;
    return this.maxPhotos - photoControlSize;
  }

  uaIdToName(index) {
    if (this.uasData) {
      let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
      return uaDataAtIndex.name;
    }
  }

  saveButtonClicked(draft) {
    this.submitted = draft ? false : true;
    if(draft == false) this.submit();
    if(draft == true ) this.finalSubmit(draft);
  }
  onPreview() {
  //  let change = sessionStorage.getItem("changeInWaterRejenuvation2223");
   // if (change == "true")
     // this.waterRejenuvation?.controls?.isDraft?.patchValue(!this.formStatus);
    let data = this.waterRejenuvation?.value;
    console.log(data);
    for (let index = 0; index < data?.uaData?.length; index++) {
      data.uaData[index].name = this.uasData[data?.uaData[index].ua]?.name;
    }
    data = {...data, previewYear: '2023-24',  waterIndicators : this.waterIndicators}
    let dialogRef = this.dialog.open(WaterRejenuvations2223PreviewComponent, {
      data: data,
      height: "80%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  checkErrorState(projectRow, val) {
    if (this.errorOnload) {
      return projectRow.controls[val]?.invalid;
    }
    return (
      projectRow.controls[val]?.invalid &&
      (projectRow.controls[val].dirty || projectRow.controls[val].touched)
    );
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
  if(val && val < 40){
    swal('Alert !', `As per the Operational Guidelines, the condition for receiving grants for ULBs will be 40% of work completion of mandatory projects by June 2023.`, 'warning');
  }
  }

async uploadFile(event: { target: HTMLInputElement },  fileType: string, waterIndex, uaIndex, uploadType) {
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const imgFileExtensions = ['png', 'jpg', 'jpeg'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    let folderName = `${this.userData?.role}/2023-24/projects_wss/${this.userData?.stateCode}`
    const fileExtension = file.name.split('.').pop();
    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} MB file can be allowed.`, "error");
    if (fileType === 'excel' && !excelFileExtensions.includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
    if (fileType === 'pdf' && fileExtension !== 'pdf') return swal("Error", "Only PDF File can be Uploaded.", "error");
    if (fileType === 'img' && !imgFileExtensions.includes(fileExtension)) return swal('Error', 'Only "PNG" or "JPG", or "JPEG" file can be Uploaded', 'error');
    this._snackBar.open("Uploaing File...",'', {"duration": 10000});
    this.isCompleteUploading = true;
    if(uploadType == 'img'){
    this.photosArray = [];
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
        msg = `First ${leftNum} uploaded successfully`;
        title = `Max ${this.maxPhotos} photos are allowed`;
        status = "warning";
        break;
      }
      await this.uploadOnS3(files[key], files[key].name, files[key].type, folderName, uploadType);
      size--;
    }

    let photo = this.getPhotos(this.photosArray);
    photo.forEach((element) => {
      photoControl.push(element);
    });
    swal(title, msg, status);
    }else{
      this.uploadOnS3(file, file.name, file.type, folderName, uploadType);
    }
  }
uploadOnS3(file, fileName, fileType, folderName, uploadType){
    return new Promise<void>((resolve, reject) => { 
      this.dataEntryService.newGetURLForFileUpload(fileName, fileType, folderName).subscribe(s3Response => {
        const { url, file_url } = s3Response.data[0];
        console.log('url..', url)
        console.log('asdfgg', s3Response)
        this.dataEntryService.newUploadFileToS3(file, url).subscribe((res) => {
          if (res.type !== HttpEventType.Response) return;
          if(uploadType == 'img') this.photosArray.push({ url: file_url, name: fileName });
          if(uploadType == 'pdf')  this.waterRejenuvation.get('declaration').patchValue({ url: file_url, name: file.name})
          this._snackBar.dismiss();
          this.isCompleteUploading = false;
          // console.log('form', this.formControl?.responseFile?.value?.name);
          resolve();
        },
        (err)=>{
          this._snackBar.dismiss();
          this.isCompleteUploading = false;
          resolve();
        }
        );
      }, 
      (err) => {
          console.log(err);
          this._snackBar.open("Unable to save the file..",'', {"duration": 2000});
          this._snackBar.dismiss();
          this.isCompleteUploading = false;
          resolve();
      });
    })
   
  }
  removeUploadedFile(){
    this.waterRejenuvation.get('declaration').patchValue({ url: '', name: ''})
  }

  getIndicatorLineItem(){
    let queryParam = {
      type: 'water supply'
    }
    this.commonServices.formGetMethod('indicatorLineItem', queryParam).subscribe((res:any)=>{
      console.log('indicatorLineItem', res);
      this.waterIndicators = res?.data;
      
    },
    (error)=>{
      swal("Error", "No indicator found for slb table, please refresh the page", "error")
    }
    )
  //  BASE_URL/indicatorLineItem
  }
  setMinMaxValidations(e, input, min, max, value, type?:string){
    console.log('indicator value..', value, type);
    let indicatorDetails = this.waterIndicators.find(({lineItemId})=> value == lineItemId);
    console.log('indicator value.. 54321', indicatorDetails);
    if(!min && !max){
      min = indicatorDetails?.range?.split("-")[0];
      max = indicatorDetails?.range?.split("-")[1];
    }
    console.log('indicator value.. returned', this.commonServices.minMaxValidation(e, input, min, max, type));
    
   return this.commonServices.minMaxValidation(e, input, min, max, type);
    
  }
  setDisableForm(data){
    
    if((this.userData?.role == 'ADMIN') || (this.userData?.role == 'STATE' && (data.statusId == 4 || data.statusId == 6))) return true;
    if(this.userData?.role == 'MoHUA' && data.statusId != 4) return true;
    return false;
  }
}


