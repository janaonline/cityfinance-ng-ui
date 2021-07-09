import { Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UserUtility } from 'src/app/util/user/user';
import { UPLOAD_STATUS } from 'src/app/util/enums';
import { JSONUtility } from 'src/app/util/jsonUtil';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { IFinancialData, WaterManagement } from '../../../users/data-upload/models/financial-data.interface';
import { services, targets } from '../../../users/data-upload/components/configs/water-waste-management';
import { HttpEventType } from '@angular/common/http';
import { Router, NavigationStart, Event } from "@angular/router";
import { controllers } from 'chart.js';
@Component({
  selector: 'app-fc-slb',
  templateUrl: './fc-slb.component.html',
  styleUrls: ['./fc-slb.component.scss']
})
export class FcSlbComponent implements OnInit, OnChanges {
  @ViewChild("template1") template1;
  modalRef: BsModalRef;
  publishedFileUrl: string = '';
  publishedFileName: string = '';
  publishedProgress: number;
  isDisabled = false;
  finalSubmitStatus;
  ulbFormStaus = 'PENDING'
  ulbFormRejectR = null;
  ulb_id;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role
  constructor(
    private _router: Router,
    private modalService: BsModalService,
    protected dataEntryService: DataEntryService,
    protected _dialog: MatDialog
  ) {
    // super(dataEntryService, _dialog);
    this.ulb_id = sessionStorage.getItem('ulb_id');
    this.finalSubmitStatus = localStorage.getItem('finalSubmitStatus');
  }

  focusTargetKey: any = {}
  focusTargetKeyForErrorMessages: any = {}

  @Input()
  form: FormGroup;

  @Input()
  isSubmitButtonClick = false;

  @Input()
  isDataPrefilled = false;

  @Input()
  canTakeApproveAction = false;

  @Input()
  canSeeApproveActionTaken = false;

  @Input()
  canUploadFile = false;

  @Output()
  saveAsDraft = new EventEmitter<any>();
  @Output()
  outputValues = new EventEmitter<any>();

  @Output()
  showNext = new EventEmitter<any>();
  @Output()
  previous = new EventEmitter<WaterManagement>();
  @Input() waterPotability: any = {}
  @Input() actionStatus;
  uploadQuestion: string = 'Have you published Water Potability Index?';
  uploadDocumentText: string = 'Upload the published document';



  approveAction = UPLOAD_STATUS.APPROVED;
  rejectAction = UPLOAD_STATUS.REJECTED;

  actionNames = {
    [this.approveAction]: "Approve",
    [this.rejectAction]: "Reject",
  };

  targets = targets;


  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;

  // wasterWaterQuestion = wasteWaterDucmentQuestions;

  // prefilledDocuments: WaterManagementDocuments;

  jsonUtil = new JSONUtility();
  filesToUpload: Array<File> = [];
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};
  submitted = false;
  showPublishedUpload: boolean;
  invalidWhole = false;
  benchmarks = []
  changeInData = false;
  ngOnInit() {
    this.changeInData = false;
    // if (this.ulb_id != null) {
    //   this.isDisabled = true;
    // }
   // console.log(this.services)
    this.services.forEach(data => {
      this.focusTargetKey[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKey[data.key + item.key] = false
      })
    })
    this.services.forEach(data => {
      this.focusTargetKeyForErrorMessages[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKeyForErrorMessages[data.key + item.key] = false
      })
    })

    this.benchmarks = this.services.map((el) => (parseInt(el.benchmark)))
 //   console.log(this.benchmarks)
 //   console.log("tt", this.form, this.focusTargetKey)
    // this.checkAutoValidCustom();
  }

  setFocusTarget(focusTarget = '') {
    // this.focusTargetKey[focusTarget] =true
   // console.log('Focus target inside set focus target function', focusTarget)
    for (let obj in this.focusTargetKey) {

      if (obj == focusTarget) {
     //   console.log(obj)
        this.focusTargetKey[obj] = true;
      } else {
        this.focusTargetKey[obj] = false;
      }
    }
    // console.log('focusTargetKey', this.focusTargetKey)
  }

  ngOnChanges(changes) {
    console.log('changes ........', changes, this.form)
    console.log('action.........', this.actionStatus);
    this.ulbFormStaus = this.actionStatus.st;
    if(this.actionStatus.rRes != null){
      this.ulbFormRejectR = this.actionStatus.rRes;
    }

    this.invalidWhole = false;
    this.showPublishedUpload = null;
    // console.log("services", this.services, changes)
    if (this.isDataPrefilled && changes.isDataPrefilled) {
      this.populateFormDatas();
    }
    if (changes.form && changes.form.currentValue)
      // this.form = changes.form.currentValue

      if (changes.waterPotability && changes.waterPotability.currentValue) {
        if (changes.waterPotability.currentValue.hasOwnProperty('name')) {
          this.publishedFileName = changes.waterPotability.currentValue.name;
          this.publishedFileUrl = changes.waterPotability.currentValue.url;
          if (this.publishedFileUrl != "") {
            this.showPublishedUpload = true;
          }

          this.publishedProgress
        }
        this.publishedFileUrl = changes.waterPotability.currentValue.hasOwnProperty('url') ? changes.waterPotability.currentValue.url : ''
      }
    // if (this.form) this.initializeForm();
    console.log('onChanges values', this.form)

    let FORM = this.form;
    console.log('this.form', this.form)
    if (this.form) {
      for (let key in this.form['controls']) {
        console.log(key)
        for (let key2 in this.form['controls'][key]['controls']['target'].controls) {
        //  console.log(key2)
          let textValue = this.form.controls[key]['controls']['target']['controls'][key2]
          let currentControlKey = key2
          let controlValue = this.form.controls[key].value.target
          let increase;
          if (key == 'reduction') {
            increase = false;
          } else {
            increase = true;
          }
          let serviceKey = key
          let actualData = parseFloat(this.form.controls[key]['controls']['baseline']['value']['2021'])
          let control = this.form['controls'][key]['controls']['target'].controls[key2]
          let formValue = this.form['controls'][key]['controls']['target']



         // console.log(textValue, currentControlKey, controlValue, increase, serviceKey, actualData)
          if (this.checkIncreaseValidation(textValue.value, currentControlKey, controlValue, increase, serviceKey, actualData)) {
            this.form.controls[serviceKey]['controls']['target'].controls[currentControlKey].status = "INVALID"
            //true means the entered value is not as per the desired logic
          } else {
            this.form.controls[serviceKey]['controls']['target'].controls[currentControlKey].status = "VALID"
          }

        }

      }
    }
    if (this.ulb_id != null || this.finalSubmitStatus == 'true') {
      this.isDisabled = true;
      this.form?.disable();
    }
    if(this.actionStatus.st == 'REJECTED' && this.loggedInUserType === USER_TYPE.ULB){
      this.isDisabled = false;
      this.form?.enable();
    }
  }


  openModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1, { class: "modal-md" });
  }
  stay() {
    this.modalRef.hide();
  }
  alertClose() {
    this.stay();
  }
  proceed(uploadedFiles) {
    this.modalRef.hide();
    return this._router.navigate(["ulbform/water-sanitation"]);
  }
  onSaveAsDraftClick() {
    this.saveAsDraft.emit(this.form.value);
  }

  // onSolidWasteEmit(value: WaterManagementDocuments) {
  //   let patchValue;
  //   if (this.prefilledDocuments) {
  //     patchValue = { ...this.prefilledDocuments };
  //     if (patchValue.wasteWaterPlan) {
  //       patchValue.wasteWaterPlan[0] = {
  //         ...patchValue.wasteWaterPlan[0],
  //         ...value.wasteWaterPlan[0],
  //       };
  //     } else {
  //       patchValue.wasteWaterPlan = value.wasteWaterPlan;
  //     }
  //   } else {
  //     this.prefilledDocuments = { ...value };
  //     patchValue = { ...this.prefilledDocuments };
  //   }
  //   this.form.controls.documents.reset();
  //   this.form.controls.documents.patchValue({ ...patchValue });
  //   console.log(`patchValue`, patchValue);
  //   console.log(`documetValue`, value);
  //   this.emitValues(this.form.getRawValue());
  // }


  private populateFormDatas() {
    if (!this.isDataPrefilled) return;
    // this.prefilledDocuments = {
    //   wasteWaterPlan: this.jsonUtil.filterOutEmptyArray(
    //     this.form.getRawValue().documents.wasteWaterPlan
    //   ),
    // };
  }

  saveNext(template1) {

    // if (this.showPublishedUpload && !this.publishedFileUrl)
    //   return true



    this.emitValues(this.form.getRawValue(), true);
    // console.log(this.showPublishedUpload)
    // console.log(this.form.getRawValue())
    // } else {
    //   this.openModal(template1);
    // }

  }

  emitOnDocChange() {
    this.emitValues(this.form.getRawValue());
  }

  private emitValues(values: IFinancialData["waterManagement"], next = false) {
   // console.log("emitvalues called", values, next)
    // if (values) {
    //   if (
    //     values.documents.wasteWaterPlan &&
    //     !this.jsonUtil.filterOutEmptyArray(values.documents.wasteWaterPlan)
    //   ) {
    //     values.documents.wasteWaterPlan = [];
    //   }
    // }
    // console.log("value emitting by waste water", values);
    let fileName = this.showPublishedUpload ? this.publishedFileName : '';
    let fileUrl = this.showPublishedUpload ? this.publishedFileUrl : '';
    this.invalidWhole = false
    this.checkAutoValidCustom();
    let outputValues = {
      waterManagement: values,
      waterPotabilityPlan: {
        name: fileName,
        url: fileUrl
      },
      saveData: next,
      water_index: this.showPublishedUpload,
      isFormInvalid: this.invalidWhole

    }

    this.outputValues.emit(outputValues);
  }

  private initializeForm() {
    // this.form.valueChanges
    //   .pipe(debounceTime(100))
    //   .subscribe((values) => this.outputValues.emit(values));
  }

  fileChangeEvent(event, progessType, fileName) {
    this.submitted = false;
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     this.filesToUpload.push(event.target.files[i]);

    // }

    // console.log(this.filesToUpload);


    this.upload(progessType, fileName);
    // this.emitValues(this.form.getRawValue());

  }
  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
    //  this.submitted = false;
    this.fileUploadTracker = {};
  }
  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf" || fileExtension === "xlsx" || fileExtension == "png"
        || fileExtension == "jpg" || fileExtension == "jpeg") {
        validFiles.push(file);
      }
    }
    return validFiles;
  }


  async upload(progessType, fileName) {
    // this.submitted = true;

    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this[fileName] = files[0].name;
    this[progessType] = 10;

    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
      this.uploadFile(files[i], i, progessType, fileName);
    }



  }


  uploadFile(file: File, fileIndex: number, progessType, fileName) {
    // console.log('percentage',this.fileUploadTracker[''][file.name]?.percentage)
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];

          //this.fileName = file.name;
          this[progessType] = Math.floor(Math.random() * 90) + 10;

          const s3URL = s3Response["data"][0].url;

          this.uploadFileToS3(
            file,
            s3URL,
            fileAlias,
            fileIndex,
            progessType

          );
          resolve("success")

          // console.log('file url', fileAlias)
          this.emitOnDocChange();

        },
        (err) => {
          if (!this.fileUploadTracker[fileIndex]) {
            this.fileUploadTracker[fileIndex] = {
              status: "FAILED",
            };
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
          }
        }
      );
    })
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    //  financialYear: string,
    fileIndex: number,
    progressType: string = ''
  ) {
    this.dataEntryService
      .uploadFileToS3(file, s3URL)
      // Currently we are not tracking file upload progress. If it is need, uncomment the below code.
      // .pipe(
      //   map((response: HttpEvent<any>) =>
      //     this.logUploadProgess(response, file, fileAlias, fileIndex)
      //   )
      // )
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;

            if (progressType == 'publishedProgress') {
              this.publishedFileUrl = fileAlias;
            }

            this.emitValues(this.form.getRawValue());
            // console.log('hi.....', progressType, this.publishedFileUrl)
            // this.dataEntryService
            //   .sendUploadFileForProcessing(fileAlias)
            // .subscribe((res) => {
            //   this.startFileProcessTracking(
            //     file,
            //     res["data"]["_id"],
            //     fileIndex
            //   );
            // });
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }

  clearFiles(fileName) {
    if (fileName == 'publishedFileName') {
      this.publishedProgress = 0;
      this.publishedFileName = '';
      this.publishedFileUrl = ''
    }
  }

  previousValue = '';
  afterValue = '';

  setFocusTargetForErrorMessages(focusTarget = '') {
   // console.log('mouseover on', focusTarget)
    for (let obj in this.focusTargetKey) {

      if (obj == focusTarget) {
       // console.log(obj)
        this.focusTargetKeyForErrorMessages[obj] = true;
      } else {
        this.focusTargetKeyForErrorMessages[obj] = false;
      }
    }
   // console.log('focusTargetKey', this.focusTargetKey)
  }


  onBlur(control: AbstractControl, formValue = '', currentControlKey = '', serviceKey = '', increase = true) {
    this.changeInData = true;
    // console.log('individual input field', control)
    // console.log('individual service field', formValue)
    // console.log('total form', this.form)
    // console.log('current Control Key', currentControlKey)
    // console.log('service Key', serviceKey)
    // console.log('increase', increase)
    let actualData = parseFloat(this.form?.controls[serviceKey]['controls']['baseline']?.controls['2021']?.value)
    // this.setFocusTarget()
    // console.log('focusTargetKey', this.focusTargetKey)
    // if (this.form['controls'][serviceKey]['controls']['baseline']['controls']['2021'].touched === true) {
    //   // this.form.controls[serviceKey]['controls']['target'].controls['2021'].status = "INVALID";
    //   this.emitValues(this.form.getRawValue());
    // }



    this.services.forEach(data => {
      this.focusTargetKey[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKey[data.key + item.key] = false
      })
    })
    // console.log('previousvalue', this.previousValue)
    // console.log('aftervalue', this.afterValue)

    if (!control) return;


    const newValue = this.jsonUtil.convert(control.value);
    control.patchValue(newValue);
    let benchmarkValue
    if (serviceKey == 'waterSuppliedPerDay') {
      benchmarkValue = this.benchmarks[0]
    } else if (serviceKey == 'reduction') {
      benchmarkValue = this.benchmarks[1]
    } else if (serviceKey == 'houseHoldCoveredWithSewerage') {
      benchmarkValue = this.benchmarks[2]
    } else if (serviceKey == 'houseHoldCoveredPipedSupply') {
      benchmarkValue = this.benchmarks[3]
    }
    // this.previousValue = this.form.controls[serviceKey]['controls']['target']?.controls[String(parseInt(currentControlKey) - 101)]?.value ? this.form.controls[serviceKey]['controls']['target'].controls[String(parseInt(currentControlKey) - 101)].value : null
    // this.afterValue = this.form.controls[serviceKey]['controls']['target']?.controls[String(parseInt(currentControlKey) + 101)]?.value ? this.form.controls[serviceKey]['controls']['target'].controls[String(parseInt(currentControlKey) + 101)].value : null
    if (formValue || currentControlKey == 'actual') {
     // console.log('inside if FormValue')
      if (formValue) {
        if ((increase && control.value >= benchmarkValue) || (!increase && control.value <= benchmarkValue)) {
          this.checkAutoValidCustom();
          this.emitValues(this.form.getRawValue());
          return
        }
      }

      for (let el in this.form?.controls[serviceKey]['controls']['target']?.controls) {
        if (increase)
         // console.log(serviceKey + el)
        this.setFocusTarget(serviceKey + el)
        //console.log('focus target key after on blur', this.focusTargetKey)
        //console.log(el)
        //console.log(this.form?.controls[serviceKey]['controls']['target']?.controls)
        let currentValue = this.form?.controls[serviceKey]['controls']['target']?.controls[el];
      //  console.log('current Value', currentValue)
        this.onKeyUp(currentValue, formValue, el, serviceKey, increase, actualData)
        //currentValue is the details of that particular input field which is in focus
        //formValue is the details of entire service field
        //el - 2122,2223,2324,2425
      }


    }
    console.log('final Form after validations', this.form)
   // this.checkAutoValidCustom();
    // this.form['isFormInvalid'] = this.invalidWhole
    this.emitValues(this.form.getRawValue());
  }

  messages = [
    'Please Enter a Value',
    'Value must be Greater than Previous Year Target & Actual Figures',
    'Value must be Less than Previous Year Target & Actual Figures'
  ];
  onKeyUp(textValue, formValue, currentControlKey, serviceKey = '', increase = true, actualData) {
    //textValue - info about the particular field
    //formvalue -> info about the particular service field
    //currentCOntrol Key - 2122,2223,2324,2425
   // console.log("estblished", textValue, formValue, currentControlKey, increase, actualData)
    let controlValue = this.form?.value[serviceKey]?.target
    //control value contains value filled in every input of the service yearwise
    //logic should be that whever a user enter a value, then all the input field of that service should be checked again

    if (this.checkIncreaseValidation(textValue.value, currentControlKey, controlValue, increase, serviceKey, actualData)) {
      //true means the entered value is not as per the desired logic
      this.form.controls[serviceKey]['controls']['target'].controls[currentControlKey].status = "INVALID"

    } else {
      this.form.controls[serviceKey]['controls']['target'].controls[currentControlKey].status = "VALID"

    }

  }

  checkIncreaseValidation(value, controlKey, controlValue, increse = true, serviceKey, actualData) {
    //value -> value entered in the input
    //controlKey ->2122,2223,2324,,2425
    //control value contains value filled in every input of the service yearwise
  //  console.log("increasevalidation called", value, controlKey, controlValue, increse)
    let before = true;
    let invalid = false;
    let upperLimit = 101;
    let benchmarkValue
    if (serviceKey == 'waterSuppliedPerDay') {
      benchmarkValue = this.benchmarks[0]
    } else if (serviceKey == 'reduction') {
      benchmarkValue = this.benchmarks[1]
    } else if (serviceKey == 'houseHoldCoveredWithSewerage') {
      benchmarkValue = this.benchmarks[2]
    } else if (serviceKey == 'houseHoldCoveredPipedSupply') {
      benchmarkValue = this.benchmarks[3]
    }
    if (serviceKey === 'waterSuppliedPerDay') {
      upperLimit = 1000000000000000;
    }
    if ((increse && value >= benchmarkValue && serviceKey === "waterSuppliedPerDay") || (!increse && value <= benchmarkValue)) {
      return false;
    }
    for (let obj in controlValue) {
      if ((increse && parseFloat(value) >= actualData && actualData) || (!increse && parseFloat(value) <= actualData && actualData) || !actualData) {
        if (parseInt(obj) == parseInt(controlKey)) {
          before = false
          return false;
        } else {
          if (before) {
            let otherValue = parseFloat(controlValue[obj])
            let mainValue = parseFloat(value)

            if (controlValue[obj] != "") {
             // console.log(mainValue, actualData)
              invalid = increse ? !(mainValue > 0 && mainValue < upperLimit && mainValue >= otherValue) : !(mainValue > 0 && mainValue < upperLimit && mainValue <= otherValue)
              // console.log(value > controlValue[obj])
              // console.log("if", value, controlValue[obj], controlKey, obj)
              // console.log(invalid)
            }
            if (invalid) {
              return true;
            }
          }
        }

      } else {
        return true
      }


    }
    return invalid;

  }


  checkAutoValidCustom() {

    for (let key in this.form?.controls) {
      if (this.form?.controls[key]['controls']['baseline']?.controls['2021']['status'] === 'INVALID') {

        this.invalidWhole = true;
      }
    }

    for (let key in this.form['controls']) {
      for (let key2 in this.form['controls'][key]['controls']['target']['controls']) {
        if (this.form['controls'][key]['controls']['target']['controls'][key2]['status'] === 'INVALID')
          this.invalidWhole = true;
      }
    }
  //  console.log(this.invalidWhole)
  }

}




