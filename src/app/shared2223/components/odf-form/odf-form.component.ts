import { HttpEventType, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { debug } from 'console';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { NewCommonService } from '../../services/new-common.service';
import { OdfFormPreviewComponent } from './odf-form-preview/odf-form-preview.component';
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-odf-form',
  templateUrl: './odf-form.component.html',
  styleUrls: ['./odf-form.component.scss']
})
export class OdfFormComponent implements OnInit {
  date = new Date();
  now;
  noRating: boolean;
  @Input() isGfcOpen: boolean = false;
  constructor(private dataEntryService: DataEntryService,
    private formBuilder: FormBuilder, private commonService: NewCommonService, public dialog: MatDialog) {
    this.date.setDate(this.date.getDate());
    this.date.setFullYear(this.date.getFullYear() - 1);
    this.now = new Date(this.date).toISOString().slice(0, 10);
  }

  uploadDeclaration: boolean = false
  uploadCertificate: boolean = true
  odfUrl = ''
  change = ''
  odfFileName;
  odfProgress;
  showIcon: boolean = false;
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
  design_year;
  ratings;
  yearValue;
  draft = true;
  ulbId;
  ulb;
  errorMessege: any = '';
  dropdownValues: any;
  profileForm: FormGroup;
  submitted = false;
  body;
  isGfc;
  isDisabled = false;
  previewData: any;
  ratingId:any;
  selectedDropdownValue:any;
  dateValue;
  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      rating: ['', Validators.required],
      cert: this.formBuilder.group({
        url: ['', Validators.required],
        name: ['', Validators.required],
      }),
      certDate: ['', Validators.required],
      ulb: '',
      design_year: '',
      status: 'PENDING',
      isDraft: this.draft,
      isGfc: this.isGfcOpen
    });
    this.isGfc = this.profileForm.value.isGfc
    console.log(this.isGfc)
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.ulbId = JSON.parse(localStorage.getItem("userData"));
    for (var i in this.design_year) {
      if (i == '2022-23') {
        this.yearValue = this.design_year[i];
        this.profileForm.patchValue({
          design_year: this.yearValue
        })
      }
    }
    this.ulb = this.ulbId?.ulb
    this.profileForm.patchValue({
      ulb: this.ulb
    })

    const params = {
      ulb: this.ulb,
      design_year: this.yearValue,
      isGfc: this.isGfc
    }
    this.commonService.getOdfFormData(params).subscribe((res: any) => {
      console.log(res)  
       this.ratingId =  res?.data?.rating;
       this.fetchData();  
       console.log(this.ratingId)
      this.previewData = res
      this.prefilledOdf(res?.data);
      if (res?.data.isDraft == false) {
        console.log(res?.data?.isDraft)
        this.isDisabled = true
        // this.profileForm.disabled
        this.profileForm.controls['cert'].disable();
        this.profileForm.controls['certDate'].disable();
        // this.profileForm.controls['rating'].disable();

      }
    })
  }
  
  prefilledOdf(data){
    console.log(data)
   
    //curDate = curDate.toISOString();
    this.dateValue = new Date(data.certDate);
    this.dateValue = this.dateValue.toISOString().substring(0, 10);

    console.log(data.certDate)
    this.profileForm.patchValue({
      rating: data?.rating,
      certDate: this.dateValue
    })
    this.profileForm?.controls?.cert.patchValue({
        url: data?.cert?.url,
        name: data?.cert?.name,
    })
    this.odfFileName = data?.cert?.name
    this.odfUrl = data?.cert?.url
    if(this.odfFileName && this.odfUrl){
      this.showIcon = true
    }
    console.log('aa', this.profileForm);
  }
  get f() { return this.profileForm.controls; }

  disableSubmitForm: boolean
  fetchData(){
    if (this.isGfc == true) {
      this.commonService.getGfcFormData('gfc').subscribe((res: any) => {
        console.log(res)
        this.previewData = res;
        this.ratings = res.data;
        this.dropdownValues = res.data.map(a => a.name);
        console.log(this.ratings)
      })
    } else {
      this.commonService.getOdfRatings().subscribe((res: any) => {
        console.log(res.data)
        
        this.ratings = res.data;
        this.dropdownValues = res.data.map(a => a.name);
        console.log(this.dropdownValues)
        console.log(this.ratingId)

        // this.selectedDropdownValue = res.data.find(res => res._id == this.ratingId);
        // console.log(this.selectedDropdownValue.name)
        // this.profileForm.patchValue({
        //   rating: this.ratingId,
        // })
      })
    }
    
  }
  onSubmit(type) {
    this.submitted = true;
    this.draft = false;
    this.profileForm.patchValue({
      isDraft: this.draft
    })
    if (this.profileForm.invalid) {
      return;
    }
    console.warn(this.profileForm.value);
    this.body = this.profileForm.value;
    this.commonService.odfSubmitForm(this.body).subscribe((res: any) => {
      console.log('success!!!!!!!!!!!!!', res)
      if (res && res.success) {
        this.isDisabled = true;
        swal('Saved', 'Data saved successfully', 'success')
      } else {
        swal('Error', res?.message ? res?.message : 'Error', 'error')
      }
    }, error => {
      console.error('err', error);
    })
  }
  onDraft() {
    console.log(this.profileForm.value);
    this.body = this.profileForm.value;
    this.commonService.odfSubmitForm(this.body).subscribe((res: any) => {
      console.log('successDraftttt!!!!!!!!!!!!!', res)
      console.log(this.profileForm.value)
     // this.fetchData();
      swal('Saved', res.message, 'success')

    })
  }
  preview() {
    console.log('odfFileName', this.odfFileName)
    let preData = {
      formData: this.profileForm.value,
      fileName: this.odfFileName,
      isGfcOpen: this.isGfcOpen,
      previewData: this.previewData
    }
    console.log('preData', preData)
    const dialogRef = this.dialog.open(OdfFormPreviewComponent, {
      data: preData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  onChange(item) {
    console.log(item)
    if (item == '62b2e4c79a6c781a28150d73' || item == '62b2e4969a6c781a28150d71') {
      this.uploadDeclaration = true;
      this.uploadCertificate = false;
      this.noRating = true;
      this.profileForm.get('certDate').clearValidators();
      this.profileForm.get('certDate').updateValueAndValidity();
    } else {
      this.uploadDeclaration = false
      this.uploadCertificate = true
      this.noRating = false;
      this.profileForm.get('certDate').setValidators([Validators.required]);
    }
  }
  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";
  }
  fileChangeEvent(event, progessType, fileName) {
    if (event.target.files[0].size >= 5000000) {
      this.errorMessege = 'File size should be less than 5Mb.'
      this.profileForm.controls.cert.reset();
      const error = setTimeout(() => {
        this.showIcon = false
        this.errorMessege = ''
      }, 4000);
      return;
    }
    this.odfFileName = event.target.files[0].name;
    if (this.odfFileName) {
      this.showIcon = true
    } else {
      this.showIcon = false
    }
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, this.odfFileName);
  }
  clearFile() {
    this.showIcon = false
    this.odfFileName = ''
    this.profileForm?.controls?.cert.patchValue({
      url: '',
      name: '',
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
  apiData = {}
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
  subscription: any;
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
            if (progressType == 'odfProgress') {
              this.odfUrl = fileAlias;
              this.profileForm.get('cert').patchValue({
                url: fileAlias,
                name: file.name
              })
              // this.profileForm.get('cert').patchValue({name:file.name})

              console.log(file)
              console.log(s3URL)
            }

          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }
}