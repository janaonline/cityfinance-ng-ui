import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl ,FormGroup, Validators,} from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
@Component({
  selector: 'app-odf-form',
  templateUrl: './odf-form.component.html',
  styleUrls: ['./odf-form.component.scss']
})
export class OdfFormComponent implements OnInit {
  date = new Date();
  now;
  constructor(private dataEntryService: DataEntryService,
    private fb: FormBuilder) { 
      this.date.setDate( this.date.getDate() );
      this.date.setFullYear( this.date.getFullYear() - 1 );
      this.now = new Date(this.date).toISOString().slice(0, 10);
    }

  ratings=[
  {
   value:'odf',
   name:'ODF',
   id:'dasdasdsada23423432'
  },
  {
    value:'odf+',
    name:'ODF+',
    id:'dasdasdsada23423432'
   },
   {
    value:'odf++',
    name:'ODF++',
    id:'dasdasdsada23423432'
   },
   {
    value:'water+',
    name:'Water+',
    id:'dasdasdsada23423432'
   },
   {
    value:'nonOdf',
    name:'Non ODF',
    id:'dasdasdsada23423432'
   },
   {
    value:'nonOdf+',
    name:'Non ODF+',
    id:'dasdasdsada23423432'
   },
   {
    value:'nonOdf++',
    name:'Non ODF++',
    id:'dasdasdsada23423432'
   }]
   odfUrl=''   
   change=''
   odfFileName=''
   odfProgress;
   showIcon:boolean=false;
   filesToUpload: Array<File> = [];
   filesAlreadyInProcess: number[] = [];
   fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};
  year;
  yearValue;
  profileForm = this.fb.group({
    rating: ['', Validators.required],
    cert: ['', Validators.required],
    certDate: ['', Validators.required],
    ulb:'dasdas',
    year: '',
    status:'PENDING',
    isDraft:false,
    isGfc:false
  });
  ulbId;
  ulb;
  ngOnInit(): void {
    this.year = JSON.parse(localStorage.getItem("Years"));
    this.ulbId = JSON.parse(localStorage.getItem("userData"));
    for(var i in this.year){
     if(i == '2022-23'){
     this.yearValue = this.year[i];
     this.profileForm.patchValue({
       year: this.yearValue
     })
     }
    }
   this.ulb = this.ulbId?.ulb
   this.profileForm.patchValue({
    ulb: this.ulb
  })
  }
  errorMessege:any=''
  onSubmit() {
    console.warn(this.profileForm.value);
  }
 
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";
  }
  fileChangeEvent(event, progessType, fileName) {
    if(event.target.files[0].size >= 5000000){
     this.errorMessege='File size should be less than 5mb.'
     this.profileForm.controls.cert.reset();
     const error =  setTimeout(()=>{
      this.showIcon =false 
      this.errorMessege=''
     },4000);
     return ;
    }
    this.odfFileName = fileName;
    if(this.odfFileName){
      this.showIcon =true      
    }else{
      this.showIcon =false      
    }
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
  }
  clearFile(){
    this.showIcon =false 
    this.odfFileName=''
    this.profileForm.patchValue({
      cert:''
    })
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
apiData={}
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
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
          }
        }
      );
    })
  }
  subscription:any;
  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ''
  ) {
    this.subscription =  this.dataEntryService
      .uploadFileToS3(file, s3URL)
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;
            if (progressType == 'odfProgress') {
              this.odfUrl = fileAlias;
              this.profileForm.patchValue({cert:fileAlias});
            } 
            
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }
}