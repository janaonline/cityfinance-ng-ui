import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UPLOAD_STATUS } from 'src/app/util/enums';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { IFinancialData, WaterManagement } from '../../../users/data-upload/models/financial-data.interface';
import { services, targets } from '../../../users/data-upload/components/configs/water-waste-management';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-fc-slb',
  templateUrl: './fc-slb.component.html',
  styleUrls: ['./fc-slb.component.scss']
})
export class FcSlbComponent implements OnInit, OnChanges {
  publishedFileUrl: string = '';
  publishedFileName: string = '';
  publishedProgress: number;
  constructor(
    protected dataEntryService: DataEntryService,
    protected _dialog: MatDialog
  ) {
    // super(dataEntryService, _dialog);
  }

  focusTargetKey: any = {}

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
  uploadQuestion: string = 'Have you published Water Potability Index';
  uploadDocumentText: string = 'Upload the published document';
  USER_TYPE = USER_TYPE;

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
  showPublishedUpload: boolean = false;
  invalidWhole = false;
  ngOnInit() {
    this.checkAutoValidCustom();
    this.services.forEach(data => {
      this.focusTargetKey[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKey[data.key + item.key] = false
      })
    })
    console.log("tt", this.form, this.focusTargetKey)
  }

  setFocusTarget(focusTarget = '') {
    // this.focusTargetKey[focusTarget] =true
    for (let obj in this.focusTargetKey) {
      this.focusTargetKey[obj] = false;
      if (obj == focusTarget)
        this.focusTargetKey[obj] = true;
    }
  }

  ngOnChanges(changes) {
    console.log("services", this.services, changes)
    if (this.isDataPrefilled && changes.isDataPrefilled) {
      this.populateFormDatas();
    }
    if (changes.form && changes.form.currentValue)
      // this.form = changes.form.currentValue

      if (changes.waterPotability && changes.waterPotability.currentValue) {
        if (changes.waterPotability.currentValue.hasOwnProperty('name')) {
          this.publishedFileName = changes.waterPotability.currentValue.name;
          this.publishedFileUrl = changes.waterPotability.currentValue.url;
          this.showPublishedUpload = true;
          this.publishedProgress
        }
        this.publishedFileUrl = changes.waterPotability.currentValue.hasOwnProperty('url') ? changes.waterPotability.currentValue.url : ''
      }
    if (this.form) this.initializeForm();
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

  onBlur(control: AbstractControl, formValue = '', currentControlKey = '', increase = true) {
    console.log("onblurcalled", control, formValue, currentControlKey, increase)
    this.setFocusTarget()
    if (!control) return;
    const newValue = this.jsonUtil.convert(control.value);
    control.patchValue(newValue);
    if (formValue) {
      console.log(formValue)
      for (let key2 in formValue['controls']) {
        console.log(key2)

        if (formValue['controls'][key2].value)
          this.onKeyUp(control, formValue, key2, increase)
      }


    }


    this.emitValues(this.form.getRawValue());
  }

  private populateFormDatas() {
    if (!this.isDataPrefilled) return;
    // this.prefilledDocuments = {
    //   wasteWaterPlan: this.jsonUtil.filterOutEmptyArray(
    //     this.form.getRawValue().documents.wasteWaterPlan
    //   ),
    // };
  }

  saveNext() {
    this.invalidWhole = false;
    this.checkAutoValidCustom();
    if (!this.invalidWhole) {
      this.submitted = true;
      if (this.showPublishedUpload && !this.publishedFileUrl)

        return true
      this.emitValues(this.form.getRawValue(), true);
      console.log(this.showPublishedUpload)
      console.log(this.form.getRawValue())
    }

  }

  emitOnDocChange() {
    this.emitValues(this.form.getRawValue());

  }

  private emitValues(values: IFinancialData["waterManagement"], next = false) {
    console.log("emitvalues called", values, next)
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
    let outputValues = {
      waterManagement: values,
      waterPotabilityPlan: {
        name: fileName,
        url: fileUrl
      },
      saveData: next,
      water_index: this.showPublishedUpload
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

    console.log(this.filesToUpload);


    this.upload(progessType, fileName);
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
      await this.uploadFile(files[i], i, progessType, fileName);
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

          console.log('file url', fileAlias)
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
            console.log('hi.....', progressType, this.publishedFileUrl)
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

  onKeyUp(textValue, formValue, currentControlKey, increase = true) {
    console.log("estblished", textValue, formValue, currentControlKey, increase)
    let controlValue = formValue.value
    if (this.checkIncreaseValidation(textValue.value, currentControlKey, controlValue, increase)) {
      textValue.errors = true
      textValue.status = "INVALID"
    } else {

      textValue.status = "VALID"
    }
  }

  checkIncreaseValidation(value, controlKey, controlValue, increse = true) {
    console.log("increasevalidation called", value, controlKey, controlValue, increse)
    let before = true;
    let invalid = false;
    for (let obj in controlValue) {

      if (obj == controlKey) {
        before = false
      } else {

        if (before) {
          if (controlValue[obj] != "" && obj != controlKey) {
            invalid = increse ? !(value > 0 && value < 101 && value > controlValue[obj]) : !(value > 0 && value < 101 && value < controlValue[obj])
            console.log("if", value, controlValue[obj])
            console.log(invalid)
          }


        } else {
          if (controlValue[obj] && obj != controlKey) {

            invalid = increse ? !(value > 0 && value < 101 && value < controlValue[obj]) : !(value > 0 && value < 101 && value > controlValue[obj])
            console.log("else", value, controlValue[obj])
            console.log(invalid)
          }


        }


      }

    }
    return invalid;

  }


  checkAutoValidCustom() {
    console.log(this.form['controls'])
    for (let key in this.form['controls']) {
      for (let key2 in this.form['controls'][key]['controls']['target']['controls']) {
        if (this.form['controls'][key]['controls']['target']['controls'][key2]['status'] == 'INVALID')
          this.invalidWhole = true;
      }
    }
  }
}




