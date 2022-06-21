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

  constructor(private dataEntryService: DataEntryService,
    private fb: FormBuilder) { }

  ratings=[
  {
   value:'odf',
   name:'ODF'
  },
  {
    value:'odf+',
    name:'ODF+'
   },
   {
    value:'odf++',
    name:'ODF++'
   },
   {
    value:'water+',
    name:'Water+'
   },
   {
    value:'nonOdf',
    name:'Non ODF'
   },
   {
    value:'nonOdf+',
    name:'Non ODF+'
   },
   {
    value:'nonOdf++',
    name:'Non ODF++'
   }]
   flag = 0;
   stateActionA = '';
   stateActionB = '';
   stateActionC = '';
   rejectReasonA = null;
   rejectReasonB = null;
   millionTiedFileUrl = '';
   nonMillionTiedFileUrl = '';
   change=''
   submitted = false;
   millionTiedProgress_2021;
   millionTiedFileUrl_2021 = '';
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
  clickedCrossB = false
  clickedCrossA = false
  fileName_millionTied = '';
  millionTiedProgress;
  fileName_millionTied_2021 = '';

  profileForm = this.fb.group({
    rating: ['odf', Validators.required],
    cert: ['', Validators.required],
    certDate: ['', Validators.required]
  });

  onSubmit() {
    console.warn(this.profileForm.value);
  }
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";
  }
  fileChangeEvent(event, progessType, fileName) {
    console.log(event)
    console.log(progessType)
    console.log(fileName)

    this.submitted = false;
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
  }
  
  clearFiles(fileName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true"
    if (fileName == 'fileName_millionTied') {
      this.clickedCrossB = true
      this.millionTiedProgress = '';
      this.fileName_millionTied = '';
      this.millionTiedFileUrl = ''
    }else if(fileName == 'fileName_millionTied_2021'){
      this.clickedCrossA = true
      this.millionTiedProgress_2021 = '';
      this.fileName_millionTied_2021 = '';
      this.millionTiedFileUrl_2021 = ''
    }
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

  stateActionA_2021 = '';
  rejectReasonA_2021 = null;
  uploadFile(file: File, fileIndex: number, progessType, fileName) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
          console.log(fileAlias)
          this[progessType] = Math.floor(Math.random() * 90) + 10;
          const s3URL = s3Response["data"][0].url;
          console.log(s3URL)
          this.uploadFileToS3(
            file,
            s3URL,
            fileAlias,
            fileIndex,
            progessType
          );
          resolve("success")
          console.log('file url', fileAlias)
          console.log(file.name)
          console.log(file.type)
          if (fileName === 'fileName_millionTied') {
            this.stateActionA = 'PENDING';
            this.rejectReasonA = null
          } else if (fileName === 'fileName_millionTied_2021') {
            this.stateActionA_2021 = 'PENDING';
            this.rejectReasonA_2021 = null
          }
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
    console.log(file)
    console.log(s3URL)
    this.dataEntryService
      .uploadFileToS3(file, s3URL)
      .subscribe(
        (res) => {
          console.log(res)
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;
            console.log(fileAlias)
            if (progressType == 'millionTiedProgress') {
              this.millionTiedFileUrl = fileAlias;
            } else if (progressType == 'nonMillionTiedProgress') {
              this.nonMillionTiedFileUrl = fileAlias;
            }  else if (progressType == 'millionTiedProgress_2021') {     
              this.millionTiedFileUrl_2021 = fileAlias;
            }
            
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }
  ngOnInit(): void {
  }
 
  
}