
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, map, retryWhen } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { GTCertificateService } from './gtcertificate.service'
import { StateformsService } from '../stateforms.service'
@Component({
  selector: 'app-gtcertificate',
  templateUrl: './gtcertificate.component.html',
  styleUrls: ['./gtcertificate.component.scss']
})
export class GTCertificateComponent implements OnInit {

  modalRef: BsModalRef;
  filesToUpload: Array<File> = [];
  gtCertificate: FormGroup;
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
  fileName_millionTied = '';
  fileName_nonMillionTied = '';
  fileName_nonMillionUntied = '';
  millionTiedProgress;
  nonMillionTiedProgress;
  nonMillionUntiedProgress;
  err = '';
  submitted = false;
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _router: Router,
    private dataEntryService: DataEntryService,
    private gtcService: GTCertificateService,
    public dialog: MatDialog,
    public _stateformsService: StateformsService
  ) { }

  uploadedFiles;
  millionTiedFileUrl = '';
  nonMillionTiedFileUrl = '';
  nonMillionUntiedFileUrl = '';

  ngOnInit(): void {
    this.gtcService.getFiles()
      .subscribe((res) => {

        if (res['million_tied'].pdfUrl != '' && res['million_tied'].pdfName != '') {
          this.fileName_millionTied = res['million_tied'].pdfName;
          this.millionTiedFileUrl = res['million_tied'].pdfUrl;
        }
        if (res['nonmillion_tied'].pdfUrl != '' && res['nonmillion_tied'].pdfName != '') {
          this.fileName_nonMillionTied = res['nonmillion_tied'].pdfName;
          this.nonMillionTiedFileUrl = res['nonmillion_tied'].pdfUrl;
        }
        if (res['nonmillion_untied'].pdfUrl != '' && res['nonmillion_untied'].pdfName != '') {
          this.fileName_nonMillionUntied = res['nonmillion_untied'].pdfName;
          this.nonMillionUntiedFileUrl = res['nonmillion_untied'].pdfUrl;
        }
      },
        errMes => {
          alert(errMes)
          console.log(errMes);
        }
      );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  stay() {
    this.modalRef.hide();
  }


  proceed(uploadedFiles) {
    this.postsDataCall(uploadedFiles);
    this.modalRef.hide();
  }

  postsDataCall(uploadedFiles) {


this.gtcService.sendRequest(this.uploadedFiles)
      .subscribe((res) => {        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.isCompleted = res["isCompleted"];
        this._stateformsService.allStatus.next(status);
        alert('Files uploaded successfully.')
      },
        error => {
          alert("An error occured.")
          this.err = error.message;
          console.log(this.err);
        });
  }

  alertClose() {
    this.modalRef.hide();
  }

  saveForm(template) {
    this.submitted = true;
    this.uploadedFiles = {
      designYear: "606aaf854dff55e6c075d219",
      million_tied:
      {
        pdfUrl: this.millionTiedFileUrl,
        pdfName: this.fileName_millionTied
      },
      nonmillion_tied:
      {
        pdfUrl: this.nonMillionTiedFileUrl,
        pdfName: this.fileName_nonMillionTied
      },
      nonmillion_untied:
      {
        pdfUrl: this.nonMillionUntiedFileUrl,
        pdfName: this.fileName_nonMillionUntied
      },
      isCompleted: false
    };
    if (
      this.millionTiedFileUrl != '' &&
      this.nonMillionTiedFileUrl != '' &&
      this.nonMillionUntiedFileUrl != ''
    ) {
      this.postsDataCall(this.uploadedFiles);
    }
    else {
      this.openModal(template);
    }
  }

  clearFiles(fileName) {
    if (fileName == 'fileName_millionTied') {
      this.millionTiedProgress = '';
      this.fileName_millionTied = '';
      this.millionTiedFileUrl = ''
    }
    if (fileName == 'fileName_nonMillionTied') {
      this.nonMillionTiedProgress = '';
      this.fileName_nonMillionTied = '';
      this.nonMillionTiedFileUrl = ''
    }
    if (fileName == 'fileName_nonMillionUntied') {
      this.nonMillionUntiedProgress = '';
      this.fileName_nonMillionUntied = '';
      this.nonMillionUntiedFileUrl = ''
    }
  }

  fileChangeEvent(event, progessType, fileName) {
    this.submitted = false;
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
  }

  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
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
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
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
            if (progressType == 'millionTiedProgress') {
              this.millionTiedFileUrl = fileAlias;
            } else if (progressType == 'nonMillionTiedProgress') {
              this.nonMillionTiedFileUrl = fileAlias;
            } else if (progressType == 'nonMillionUntiedProgress') {
              this.nonMillionUntiedFileUrl = fileAlias;
            }
            console.log('Progress -', progressType, this.millionTiedFileUrl, this.nonMillionTiedFileUrl, this.nonMillionUntiedFileUrl)
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

