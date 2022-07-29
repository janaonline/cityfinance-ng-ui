import { HttpEventType } from '@angular/common/http';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { IUserLoggedInDetails } from 'src/app/models/login/userLoggedInDetails';
import { UserUtility } from 'src/app/util/user/user';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
@Component({
  selector: 'app-common-action',
  templateUrl: './common-action.component.html',
  styleUrls: ['./common-action.component.scss']
})
export class CommonActionComponent implements OnInit {
  @Input() item;
  statusForm: FormGroup;
  change = '';
  triggerInput:boolean = false;
  errorMessegeCommonAction: any = '';
  commonActFileName;
  stateActUrl = ''
  showCommonAct:boolean = false;
  filesToUpload: Array<File> = [];
  filesAlreadyInProcess: number[] = [];
  subscription: any;
  approveComment:boolean = false;
  activeButtonApprove:boolean = false
  activeButtonReturn:boolean = false

  apiData = {};
  activeClassApprove:boolean = false
  activeClassReturn:boolean = false

  @Output() newItemEvent = new EventEmitter<string>();
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  userLoggedInDetails: IUserLoggedInDetails;
  constructor(private dataEntryService: DataEntryService,private formBuilder: FormBuilder) {
    this.initializeLoggedInUserDataFetch();
   }
 toggle:any;
  ngOnInit(): void {
   this.initializeFormm();
   this.valueChange();
   console.log(this.statusForm?.value)
   
  }
  get f() { return this.statusForm.controls; }

  valueChange(){
    this.statusForm.valueChanges.subscribe(value => {
      console.log('value has changed:', value)
      if(value.status == 'approve'){
       this.activeClassApprove = true;
       this.activeClassReturn = false;
      }else if(value.status == 'return'){
       this.activeClassReturn = true;
       this.activeClassApprove = false;
      }
      this.toggle =value
      this.newItemEvent.emit(this.toggle)
  });
  }
  initializeFormm(){
    this.statusForm = this.formBuilder.group({
      status: '',
      reason: '',
      document: this.formBuilder.group({
        url: [''],
        name: ['']
      }),
    });
  }

  private initializeLoggedInUserDataFetch() {
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      console.log("hi", data);
    });
  }
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInPto", "true")
    this.change = "true";
  }
  userEvent;
  onChange(event){
    console.log(event)
   if(event == 'approve'){
     this.item = ''
     this.userEvent = event
     this.approveComment = true;
     this.triggerInput = false;
   }else if(event == 'return'){
    this.userEvent = event
     this.triggerInput = true;
     this.approveComment = false;
   }
  }
  
  fileChangeEvent(event, progessType) {
    console.log(progessType)
    
    if(progessType == 'commonActProgress'){
      if (event.target.files[0].size >= 20000000) {
        this.errorMessegeCommonAction = 'File size should be less than 20Mb.'
        this.statusForm.controls.document.reset();
        const error = setTimeout(() => {
          this.showCommonAct = false
          this.errorMessegeCommonAction = ''
        }, 4000);
        return;
      }
    }
   
      const fileName = event.target.files[0].name;
      
      if (progessType == 'commonActProgress') {
        this.commonActFileName = event.target.files[0].name;
        this.showCommonAct = true;
      }
      const filesSelected = <Array<File>>event.target["files"];
      this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
      this.upload(progessType, fileName);
    
  }
  clearFile(type: string = '') {
    if(type == 'stateAct'){
      this.showCommonAct = false;
      this.commonActFileName = ''
      this.statusForm.patchValue({
        document:{
          url:'',
          name: ''
       }
      });
      // this.stateFinance.controls.stateNotification['controls'].name.setValidators(Validators.required);
      // this.stateFinance.controls.stateNotification['controls'].name.updateValueAndValidity();
      // console.log(this.stateFinance.controls)
    }
    sessionStorage.setItem("changeInStateFinance", "true");
      
  }
  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf") {
        validFiles.push(file);
      } else {
        swal("Only PDF File can be Uploaded.")
        return;
      }
    }
    return validFiles;
  }
  async upload(progessType, fileName) {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this[fileName] = files[0].name;
    console.log(files[0].name)
    let fileExtension = files[0].name.split('.').pop();
    console.log(fileExtension)
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
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          let fileAlias = s3Response["data"][0]["file_alias"];
          this[progessType] = Math.floor(Math.random() * 90) + 10;
          // if(progessType == 'rulesByLawsProgress'){
          //   this[progessType] = Math.floor(Math.random() * 90) + 10;
          // }
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(
            file,
            s3URL,
            fileAlias,
            fileIndex,
            progessType
          );
          resolve("success")
        },
        (err) => {
          if (!this.fileUploadTracker[fileIndex]) {
            this.fileUploadTracker[fileIndex] = {
              status: "FAILED",
            };
            console.log(err)
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
            console.log(err)
          }
        }
      );
    })
  }
  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ''
  ) {
    this.subscription = this.dataEntryService
      .uploadFileToS3(file, s3URL)
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;
            
            if (progressType == 'commonActProgress') {
              this.stateActUrl = fileAlias;
              console.log(this.stateActUrl)
              this.statusForm.get('document').patchValue({
                url: fileAlias,
                name: file.name
              })
              sessionStorage.setItem("changeInStateFinance", "true");
              console.log(file)
              console.log(s3URL)
            }
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
          console.log(err);
        }
      );
  }
  
}
