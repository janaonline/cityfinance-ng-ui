import { Component, OnInit } from "@angular/core";

import { ChangeDetectorRef } from "@angular/core";

import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../../models/user/userType";
import { UserUtility } from "../../../util/user/user";
import { ProfileService } from "../../../users/profile/service/profile.service";
import { IState } from "../../../models/state/state";
import { MatDialog } from "@angular/material/dialog";
import { UtiReportService } from "./uti-report.service";
import { CommonService } from "src/app/shared/services/common.service";
import { Router } from "@angular/router";
import { state } from "@angular/animations";
import { PreviewUtiFormComponent } from "./preview-uti-form/preview-uti-form.component";
import { textChangeRangeIsUnchanged } from "typescript";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { HttpEventType } from "@angular/common/http";
import { delay, map, retryWhen } from "rxjs/operators";
import { ImagePreviewComponent } from "./image-preview/image-preview.component";
import { url } from "inspector";
import { MapDialogComponent } from "../../../shared/components/map-dialog/map-dialog.component";

@Component({
  selector: "app-utilisation-report",
  templateUrl: "./utilisation-report.component.html",
  styleUrls: ["./utilisation-report.component.scss"],
})
export class UtilisationReportComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    private UtiReportService: UtiReportService,
    private dataEntryService: DataEntryService
  ) {
    this.initializeUserType();

    // this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
  }

  utilizationReport: FormGroup;
  utilizationForm: FormGroup;
  submitted = false;
  // tabularProject:any = [{
  //   id : 0
  // }];
   totalclosingBal:Number = 0;
   projectCost = 0;
   projectExp = 0;
   selectedFile;
   categories;
   editable;
   photoUrl:any =[];
 formDataResponce;
   states: { [staeId: string]: IState };
   userLoggedInDetails: IUserLoggedInDetails;
   loggedInUserType: USER_TYPE;
   userTypes = USER_TYPE;
   errMessage;
   errorDisplay= false;
   setLocation;
   private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      this.initializeReport();
      this.getResponse();
    });
  }
  // errorShow(){
  //     this.errorDisplay = true;
  //     console.log('hello')
  // }

  ngOnInit() {
    this.UtiReportService.getCategory().subscribe((resdata) => {
      this.categories = resdata;
      console.log(resdata);
    });
  }
  public getResponse() {
    this.UtiReportService.fetchPosts().subscribe(
      (res) => {
        //  this.formDataResponce = res;
        this.preFilledData(res);
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private preFilledData(res) {
    this.editable = res.isDraft;
    this.deleteRow(0);
    this.addPreFilledSimple(res);
    res.projects.forEach((project) => {
      this.addPreFilledRow(project);
    });
  }
  addPreFilledSimple(data) {
    this.utilizationReport.patchValue({
      name: data.name,
      designation: data.designation,
      grantPosition: {
        unUtilizedPrevYr: data.grantPosition.unUtilizedPrevYr,
        receivedDuringYr: data.grantPosition.receivedDuringYr,
        expDuringYr: data.grantPosition.expDuringYr,
        closingBal: data.grantPosition.closingBal,
      },
    });
    this.totalclosingBal = data.grantPosition.closingBal;
    if (!this.editable) this.utilizationReport.disable();
  }

  public initializeReport() {
    this.utilizationForm = this.fb.group({
      stateName: new FormControl(
        this.states[this.userLoggedInDetails.state]?.name,
        Validators.required
      ),
      ulb: new FormControl(this.userLoggedInDetails.name, Validators.required),
      grantType: new FormControl("Tied", Validators.required),
    });

    this.utilizationReport = this.fb.group({
      grantPosition: this.fb.group({
        unUtilizedPrevYr: ["", Validators.required],
        receivedDuringYr: ["", Validators.required],
        expDuringYr: ["", Validators.required],
        closingBal: [],
      }),
      projects: this.fb.array([
        this.fb.group({
          category: ["", Validators.required],
          name: ["", Validators.required],
          description: ["", Validators.required],
          // 'imgUpload' : new FormControl(''),
          photos: this.fb.array([
            // this.fb.group({
            //   url: ['']
            // })
          ]),
          capacity: ["", Validators.required],
          location: this.fb.group({
            lat: ["", Validators.required],
            long: ["", Validators.required],
          }),

          cost: ["", Validators.required],
          expenditure: ["", Validators.required],
          // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        }),
      ]),

      name: ["", Validators.required],
      designation: ["", Validators.required],
    });
    // this.utilizationReport.disable();
  }

  get utiReportFormControl() {
    return this.utilizationReport.controls;
  }
  public whiteSpaceRem(controlName){
    if(controlName == 'name'){
      let name = this.utilizationReport.controls.name.value;
      name = name.trim();
      this.utilizationReport.controls.name.patchValue(name);
    }
    if(controlName == 'designation'){
      let designation = this.utilizationReport.controls.designation.value;
     designation = designation.trim();
      this.utilizationReport.controls.designation.patchValue(designation);
    }
   // console.log('hi...2',(this.utilizationReport.controls.designation.value).trim());
  }

  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
  get tabelRows() {
    return this.utilizationReport.get("projects") as FormArray;
  }
  calAmount(setFormControl){

    let controlValue = +this.utilizationReport.value.grantPosition[setFormControl]
    if(!isNaN(controlValue) || controlValue != 0){
      controlValue.toFixed(2);
    }

      this.patchValue(controlValue, setFormControl);

    this.toatalSum();

  }
  toatalSum(){
    this.totalclosingBal = Number(this.utilizationReport.value.grantPosition.unUtilizedPrevYr) +
    Number(this.utilizationReport.value.grantPosition.receivedDuringYr) -
    Number(this.utilizationReport.value.grantPosition.expDuringYr);
  }

  patchValue(controlValue, setFormControl) {
//console.log(controlValue);
if(  !isNaN(controlValue)) {
  if(controlValue == 0){
    this.utilizationReport.controls['grantPosition']['controls'][setFormControl].patchValue('');
  }else{
    this.utilizationReport.controls['grantPosition']['controls'][setFormControl].patchValue(controlValue);
  }

}
else{
  this.utilizationReport.controls['grantPosition']['controls'][setFormControl].patchValue('');
}

  //  this.utilizationReport.controls['grantPosition']['controls']['receivedDuringYr'].setValue(this.recValue);

    //  this.utilizationReport.controls['grantPosition']['controls']['receivedDuringYr'].setValue(this.recValue);
  }


   totalProCost(i){
     this.projectCost =0;
    for(let j=0; j < this.tabelRows.length; j++){
     // console.log(this.projectCost + +this.utilizationReport.controls.projects.value[j].cost)
     if(!isNaN(this.utilizationReport.controls.projects.value[j].cost)){
      this.projectCost = this.projectCost + +this.utilizationReport.controls.projects.value[j].cost;
     }else{
      this.projectCost = this.projectCost + 0;
      console.log(this.utilizationReport)
     }
     if( isNaN(this.utilizationReport.controls.projects.value[j].cost)){

      this.utilizationReport.controls.projects['controls'][j]['controls']['cost'].patchValue('')
    }
    }

 }
  totalExpCost(i) {
    this.projectExp =0;
    for(let j=0; j < this.tabelRows.length; j++){
  //  this.projectExp = this.projectExp + Number(this.utilizationReport.controls.projects.value[j].expenditure);
   // console.log(this.projectExp);
   if(!isNaN(this.utilizationReport.controls.projects.value[j].expenditure)){
    this.projectExp = this.projectExp + Number(this.utilizationReport.controls.projects.value[j].expenditure);
   }else{
    this.projectExp = this.projectExp + 0;

   }
   if( isNaN(this.utilizationReport.controls.projects.value[j].expenditure)){

    this.utilizationReport.controls.projects['controls'][j]['controls']['expenditure'].patchValue('')
  }
    }
  }

  onSubmit() {
    alert("Submit and Next?");
  }

  onPreview() {
    let formdata = {
      state_name: this.utilizationForm.controls.stateName.value,
      ulbName: this.utilizationForm.controls.ulb.value,
      grntType: this.utilizationForm.controls.grantType.value,
      grantPosition: {
        unUtilizedPrevYr: this.utilizationReport.controls["grantPosition"][
          "controls"
        ]["unUtilizedPrevYr"].value,
        receivedDuringYr: this.utilizationReport.controls["grantPosition"][
          "controls"
        ]["receivedDuringYr"].value,
        expDuringYr: this.utilizationReport.controls["grantPosition"][
          "controls"
        ]["expDuringYr"].value,
        closingBal: this.totalclosingBal,
      },
      projects: this.utilizationReport.getRawValue().projects,

     name: this.utilizationReport.controls.name.value,
     designation: this.utilizationReport.controls.designation.value,
     totalProCost: this.projectCost,
     totalExpCost: this.projectExp
 }
// console.log(formdata);
   for(let i=0; i<formdata.projects.length; i++){
    // console.log(formdata.projects[i].category);
     for(let j=0; j< this.categories.length; j++){
      if(this.categories[j]._id == formdata.projects[i].category){
        formdata.projects[i].category = this.categories[j].name;
      //  console.log(formdata.projects[i].category);
       }
     }
   }
    const dialogRef = this.dialog.open(PreviewUtiFormComponent,
       {data: formdata,
      height: '100%', width: '100%',
      panelClass: 'no-padding-dialog' } );
    // this.hidden = false;
     dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
   //   this.hidden = true;

    });
  }

 addRow(){

  this.tabelRows.push(this.fb.group({
    category : ['', Validators.required],
    name: ['',[Validators.required, Validators.maxLength(50)]],
    description: ['',[Validators.required, Validators.maxLength(200)]],
    photos:this.fb.array( [
      // this.fb.group({
      //   url: ['']
      // })
    ]) ,
    capacity: ['', Validators.required],
    location: this.fb.group({
      lat: ['', Validators.required],
      long : ['', Validators.required],
    }),
    cost: ['', Validators.required],
    expenditure: ['', Validators.required],
       }));

  }
  addPreFilledRow(data){
   // console.log("data", data, data.photos)
   // console.log(this.tabelRows);
    this.tabelRows.push(this.fb.group({
      category : [data.category, Validators.required],
      name: [data.name,[Validators.required, Validators.maxLength(50)]],
      description: [data.description,[Validators.required, Validators.maxLength(200)]],

      photos:this.fb.array( [

      ]),
      capacity: [data.capacity, Validators.required],
      location: this.fb.group({
        lat: [data.location.lat, Validators.required],
        long : [data.location.long, Validators.required],
      }),
      cost: [data.cost, Validators.required],
      expenditure: [data.expenditure, Validators.required],
         }));
         this.totalProCost(this.tabelRows.length);
         this.totalExpCost(this.tabelRows.length);
         this.addPhotosUrl(data.photos, this.tabelRows.length-1);
      if(!this.editable)
      this.tabelRows.disable();
  }
  setUrlGroup(url) {
    return this.fb.group({
      url: [url],
    });
  }

  addPhotosUrl(photos, i) {
    const control = <FormArray>this.tabelRows.controls[i]["controls"]["photos"];
    photos.forEach((element) => {
      let url = element.url;
      const urlObject = this.setUrlGroup(url);
      control.push(urlObject);
    });
  }

  deleteRow(i) {
    this.tabelRows.removeAt(i);
    this.totalProCost(i);
    this.totalExpCost(i);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      if (this.userLoggedInDetails) {
        return;
      }
      this.userLoggedInDetails = data;

      if (!this.userLoggedInDetails) {
        return this._router.navigate(["/login"]);
      }
      switch (this.userLoggedInDetails.role) {
        case USER_TYPE.STATE:
        case USER_TYPE.ULB:
          return this.fetchStateList();
      }
    });
  }

  // saveAsDraft(){
  //   console.log(this.utilizationReport);
  // }

  saveAndNext() {
    this.submitted = true;
  //  console.log(this.utilizationReport);
  //  console.log(this.utilizationReport.value);

    let fd = this.utilizationReport.value;
        fd.isDraft = true;
        fd.financialYear = '5ea036c2d6f1c5ee2e702e9e';
        fd.designYear ='5ea036c2d6f1c5ee2e702e9e';
        fd.grantType = 'Tied';
        fd.grantPosition.closingBal = this.totalclosingBal;



    this.UtiReportService.createAndStorePost(fd)
                  .subscribe((res) => {
                   //  console.log(res);
                     alert('Record submitted successfully.')
                  },
                  error =>{
                     alert("An error occured.")
                     this.errMessage = error.message;
                     console.log(this.errMessage);
                  });
  }
 // myFiles:string [] = [];
  filesToUpload: Array<File> = [];

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

  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];
  onFileChange(event, i, projectIndex) {
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     this.filesToUpload.push(event.target.files[i]);

  // }
 // console.log(this.filesToUpload);
 // console.log(projectIndex, i)

    this.upload(projectIndex);
  }
  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
    this.submitted = false;
    this.fileUploadTracker = {};
  }
  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf" || fileExtension === "gif" || fileExtension == "png"
      || fileExtension == "jpg" || fileExtension == "jpeg") {
        validFiles.push(file);
      }
    }
    return validFiles;
  }

  async upload(urlIndex) {
    // this.submitted = true;

    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    // formData.append("year", this.bulkEntryForm.get("year").value);
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
      await this.uploadFile(files[i], i, urlIndex);
    }
    if (files.length) this.addPhotosUrl(this.photoUrl, urlIndex);
  }

  uploadFile(file: File, fileIndex: number, urlIndex) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
          //  this.photoUrl = this.tabelRows['controls'][urlIndex]['controls']['photos'].value;

          this.photoUrl.push({ url: fileAlias });

          //  this.tabelRows['controls'][urlIndex].patchValue({
          //    photos: photoUrl
          //  })
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(file, s3URL, fileAlias, fileIndex);
          resolve("success");
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
    });
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    //  financialYear: string,
    fileIndex: number
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

  imgPreview(index) {
    //  console.log(index, this.tabelRows);
    //  let photographs = this.tabelRows.value[index].photos;
    //  console.log("phoyos", photographs)
    let dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: this.tabelRows.value[index].photos,
      height: "400px",
      width: "500px",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  imgDelete(Index) {
    console.log(
      Index,
      this.tabelRows,
      this.tabelRows["controls"][Index]["controls"].photos
    );

    let mess = window.confirm("Do you want delete all photos");
    if (mess) {
      let removeUrl = this.tabelRows["controls"][Index]["controls"].photos
        .value;
      console.log(removeUrl);
      removeUrl.forEach((element, i) => {
        this.removePhotos(Index, i);
      });
    }
  }
  removePhotos(Index, i: number) {
    const control = <FormArray>(
      this.tabelRows.controls[Index]["controls"]["photos"]
    );
    control.clear();
  }

  openDialog(index): void {    
    // console.log(this.tabelRows.value[index].location);
    if(this.tabelRows.value[index].location.lat !== "" && this.tabelRows.value[index].location.long !== ""){
      this.UtiReportService.setLocation(this.tabelRows.value[index].location)
    }
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: "60%",
      height: "65%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.setLocation = this.UtiReportService.getLocation();
      if(this.setLocation !== null){
        this.tabelRows.controls[index]['controls'].location.controls.lat.patchValue(this.setLocation.lat)
        this.tabelRows.controls[index]['controls'].location.controls.long.patchValue(this.setLocation.lng)
        }
    });
  }
}

function observableThrowError(arg0: string) {
  throw new Error("Function not implemented.");
}
