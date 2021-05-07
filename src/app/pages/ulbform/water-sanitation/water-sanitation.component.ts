import { Component, OnInit, TemplateRef } from '@angular/core';

import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
//import { from, Observable } from 'rxjs';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { delay, map, retryWhen } from 'rxjs/operators';
import { WaterSanitationService } from './water-sanitation.service'
//import { PathLocationStrategy } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WaterSanitationPreviewComponent } from './water-sanitation-preview/water-sanitation-preview.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-water-sanitation',
  templateUrl: './water-sanitation.component.html',
  styleUrls: ['./water-sanitation.component.scss']
})
export class WaterSanitationComponent implements OnInit {
  modalRef: BsModalRef;
  filesToUpload: Array<File> = [];
  waterAndSanitation: FormGroup;
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
  fileName = '';
  fileNameSanitation= '';
  fileNameWater = '';
  sanitationProgress;
  waterProgress;
  err ='';
  submitted = false;
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];

  constructor(private fb: FormBuilder,private modalService: BsModalService, private _router : Router,
    private dataEntryService: DataEntryService, private wsService : WaterSanitationService,public dialog: MatDialog,) { }
    uploadedFiles;
    waterFileUrl ='';
    sanitationFileUrl ='';
  ngOnInit(): void {
    this.wsService.getFiles()
    .subscribe((res) => {
      console.log()
       if(res['plans']['sanitation'].url != '' && res['plans']['sanitation'].remarks != '' ){
        this.fileNameSanitation = res['plans']['sanitation'].remarks;
        // this.sanitationProgress= 100;
        this.sanitationFileUrl = res['plans']['sanitation'].url;
       }
       if(res['plans']['water'].url != '' && res['plans']['water'].remarks != '' ){
       this.fileNameWater = res['plans']['water'].remarks;

       this.waterFileUrl = res['plans']['water'].url;
      //  this.waterProgress = 100;
       }
   },
   error =>{
      alert("An error occured.")
      this.err = error.message;
      console.log(this.err);
   });

  }

  // public initializePlanWS(){

  //   this.waterAndSanitation = this.fb.group({
  //     plan_water :['', Validators.required],
  //     plan_sanitation: ['', Validators.required]
  //   })
  // }
  onSubmit(){

  }
  onPreview(){
    let preData = {
      'waterFileName': this.fileNameWater,
      'waterFileUrl': this.waterFileUrl,
      'sanitationFileName': this.fileNameSanitation,
      'sanitationFileUrl' : this.sanitationFileUrl
    }
    console.log('preData', preData)
    const dialogRef = this.dialog.open(WaterSanitationPreviewComponent,
      {
        data: preData,
        maxHeight: "95vh",
        height: "fit-content",
        width: '85vw',
        panelClass: 'no-padding-dialog'
      } );
   // this.hidden = false;
    dialogRef.afterClosed().subscribe(result => {
    // console.log(`Dialog result: ${result}`);
  //   this.hidden = true;

   });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});

  }

  stay(){
    this.modalRef.hide();

  }

  proceed(uploadedFiles) {

    this.postsDataCall(uploadedFiles);
    this.modalRef.hide();
   // return this._router.navigate(["overview"]);
  }
  alertClose(){
    this.modalRef.hide();
  }
  saveForm(template){
    this.submitted = true;
    this.uploadedFiles = {
      designYear:"5ea036c2d6f1c5ee2e702e9e",
      plans:
       {
         water:
          {
              url: this.waterFileUrl,
               remarks: this.fileNameWater
           },
      sanitation:
        {
           url: this.sanitationFileUrl,
           remarks: this.fileNameSanitation
        }
      },
      'isDraft': true
    };
    if(this.waterFileUrl != '' && this.sanitationFileUrl != ''){
      this.postsDataCall(this.uploadedFiles);

    }
    else{
      this.openModal(template);
    }
}
postsDataCall(uploadedFiles){

    this.wsService.sendRequest(this.uploadedFiles)
        .subscribe((res) => {
          console.log(res);
          alert('Files uploaded successfully.')
       },
       error =>{
          alert("An error occured.")
          this.err = error.message;
          console.log(this.err);
       });
}
  clearFiles(fileName){
    if(fileName == 'fileNameWater' )
       {
         this.waterProgress= '';
         this.fileNameWater = '';
         this.waterFileUrl= ''
       }
       if(fileName == 'fileNameSanitation'){
          this.sanitationProgress = '';
          this.fileNameSanitation='';
          this.sanitationFileUrl ='';
       }
  }



  fileChangeEvent(event, progessType, fileName){
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
       this[progessType] =Math.floor(Math.random() * 90) + 10;

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
    progressType: string=''
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
            this[progressType] =100;

            if(progressType == 'waterProgress'){
              this.waterFileUrl = fileAlias;
            }
            else{
              this.sanitationFileUrl = fileAlias;
            }
            console.log('hi.....',progressType, this.waterFileUrl, this.sanitationFileUrl)
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
  private startFileProcessTracking(
    file: File,
    fileId: string,
    _fileIndex: number
  ) {
    this.fileProcessingTracker[_fileIndex] = {
      status: "in-process",
      message: "Processing",
    };

    this.dataEntryService
      .getFileProcessingStatus(fileId)
      .pipe(
        map((response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          if (!response.completed && response.status !== "FAILED") {
            /**
             * We are throwing error because we need to call the api again
             * after some time (2s right now) to check if processing of
             * file is completed or not. Once it is completed or FAILED, then we stop
             * calling the api for that file.
             */
            observableThrowError("throw any error here");
          }
          return response;
        }),
        retryWhen((err) => err.pipe(delay(2000)))
      )
      .subscribe(
        (response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          this.fileProcessingTracker[_fileIndex].status =
            response.status === "FAILED" ? "FAILED" : "completed";
        },
        (err) => {
          if (!this.fileProcessingTracker[_fileIndex]) {
            this.fileProcessingTracker[fileId].status = "FAILED";
            this.fileProcessingTracker[fileId].message =
              "Server failed to process data.";
          }
        }
      );
  }












}
function observableThrowError(arg0: string) {
  throw new Error('Function not implemented.');
}

