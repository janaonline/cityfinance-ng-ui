import { HttpEventType, HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { NewCommonService } from "../../services/new-common.service";
import { OdfFormPreviewComponent } from "./odf-form-preview/odf-form-preview.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";

@Component({
  selector: "app-odf-form",
  templateUrl: "./odf-form.component.html",
  styleUrls: ["./odf-form.component.scss"],
})
export class OdfFormComponent implements OnInit {
  noRating: boolean;
  minDate;
  maxDate;
  positionDraft: boolean = false;
  commonActionCondition: boolean = false;
  @Input() isGfcOpen: boolean = false;
  constructor(
    private dataEntryService: DataEntryService,
    private formBuilder: FormBuilder,
    private commonService: NewCommonService,
    public dialog: MatDialog,
    public _router: Router
  ) {
    this._router.events.subscribe((event) => {
      let urlArray;
      if (event instanceof NavigationEnd) {
        urlArray = event.url.split("/");
        if (urlArray.includes("gfc")) {
          this.isGfc = true;
        } else if (urlArray.includes("odf")) {
          this.isGfc = false;
        }
      }
    });
    var dt = new Date();
    let year = dt.getFullYear();
    let year1 = dt.getFullYear() - 1;
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day = dt.getDate().toString().padStart(2, "0");
    this.maxDate = year + "-" + month + "-" + day;
    this.minDate = year1 + "-" + month + "-" + day;

    console.log(year + "/" + month + "/" + day);
    console.log("date validation", this.maxDate, this.minDate);
    this.navigationCheck();

    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.ulbId = this.userData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }

  }

  uploadDeclaration: boolean = false;
  uploadCertificate: boolean = true;
  odfUrl = "";
  change = "";
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
  draft;
  userData;
  ulbId;
  hideSaveDraft: boolean = true;
  errorMessege: any = "";
  dropdownValues: any;
  profileForm: FormGroup;
  submitted = false;
  body: any = {};
  isGfc;
  isDisabled = false;
  previewData: any;
  ratingId: any;
  selectedDropdownValue: any;
  dateValue;
  activeClass: boolean = false;
  ratingMark = "N/A";
  backRouter;
  nextRouter;
  clickedSave;
  routerNavigate = null;
  response;
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  modalRef;
  formDataPre;
  firstClick = false;
  disableSubmitForm: boolean;

  sideMenuItem: any;
  @ViewChild("templateSave") template;
  @ViewChild("ipt") ipt: any;
  getFormData: any;
  actFormData;
  formId = "";
  canTakeAction = false;
  ngOnInit(): void {
    this.setRouter();
    this.fetchData();

    this.clickedSave = false;
    this.profileForm = this.formBuilder.group({
      rating: ["", Validators.required],
      cert: this.formBuilder.group({
        url: ["", Validators.required],
        name: ["", Validators.required],
      }),
      certDate: ["", Validators.required],
      status: "PENDING",
      isGfc: this.isGfcOpen,
    });
    // this.isGfc = this.profileForm.value.isGfc;
    console.log("this.isGfc", this.isGfc);

    for (var i in this.design_year) {
      if (i == "2022-23") {
        this.yearValue = this.design_year[i];
      }
    }
    const params = {
      ulb: this.ulbId,
      design_year: this.yearValue,
      isGfc: this.isGfc,
    };

    this.commonService.getOdfFormData(params).subscribe(
      (res: any) => {
        console.log('odfresponsedata', res);
        this.getFormData = res;
        this.actFormData = res?.data;
        res?.data?.isDraft == false
          ? (this.commonActionCondition = true)
          : (this.commonActionCondition = false);
        if (
          res?.data?.rating == "62b2e4c79a6c781a28150d73" ||
          res?.data?.rating == "62b2e4969a6c781a28150d71"
        ) {
          this.uploadCertificate = false;
          this.profileForm.get("certDate").clearValidators();
          this.profileForm.get("certDate").updateValueAndValidity();
          // this.profileForm.patchValue({
          //   certDate: ['',Validators.required]
          // })
        }
        this.ratingId = res?.data?.rating;
        this.getMarks(this.ratingId);

        console.log(this.ratingId);
        this.prefilledOdf(res?.data);
        if (res?.data?.isDraft == false) {
          console.log(res?.data?.isDraft);
          this.isDisabled = true;
          this.profileForm.controls["cert"]?.disable();
          this.profileForm.controls["certDate"]?.disable();
        }
        if (res?.data?.status === "REJECTED" && this.userData?.role == "ULB") {
          this.isDisabled = false;
          this.profileForm.controls["cert"]?.enable();
          this.profileForm.controls["certDate"]?.enable();
        }
        if (this.userData?.role !== "ULB") {
          this.isDisabled = true;
          let action = 'false';
          if (res?.data?.canTakeAction) {
            action = 'true';
            this.canTakeAction = true;
          } else {
            action = 'false';
          }
          sessionStorage.setItem("canTakeAction", action);
        }
        if (res?.data?.status == null || res?.data?.status == undefined) {
          this.actionBtnDis = true;
        } else if (this.userData?.role !== "ULB" && this.canTakeAction) {
          this.actionBtnDis = false;
        } else {
          this.actionBtnDis = true;
        }
      },
      (error) => {
        console.log("odf error", error);
        if (this.userData?.role !== "ULB") {
          this.isDisabled = true;
        }
      }
    );

    console.log("gggggggggg", this.isGfc);

    if (this.isGfc) {
      sessionStorage.setItem("changeInGfc", "false");
    } else {
      sessionStorage.setItem("changeInODf", "false");
    }
    console.log(
      "sess",
      sessionStorage.getItem("changeInODf"),
      sessionStorage.getItem("changeInGfc")
    );
  }

  setRouter() {
    for (const key in this.sideMenuItem) {
      console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach((element) => {
        if (
          element?.name == "Open Defecation Free (ODF)" &&
          this.isGfc == false
        ) {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
          this.formId = element?._id;
        }
        if (element?.name == "Garbage Free City (GFC)" && this.isGfc) {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
          this.formId = element?._id;
        }
      });
    }
  }
  prefilledOdf(data) {
    console.log(data);
    console.log("this.dateValue", this.dateValue);
    console.log("this.dateValue 2", this.dateValue);
    this.draft = data?.isDraft;
    this.profileForm.patchValue({
      rating: data?.rating ? data?.rating : "",
      certDate: data?.certDate ? data?.certDate : "",
      // design_year: this.yearValue,
      // ulbId: this.ulbId,
    });
    this.profileForm?.controls?.cert.patchValue({
      url: data?.cert?.url,
      name: data?.cert?.name,
    });
    this.odfFileName = data?.cert?.name;
    this.odfUrl = data?.cert?.url;
    if (this.odfFileName && this.odfUrl) {
      this.showIcon = true;
    }
    // if (this.firstClick) {
    //   this.formValueChanges();
    // }
    console.log("rating", data?.rating);
    if (
      data?.rating == "62b2e4c79a6c781a28150d73" ||
      data?.rating == "62b2e4969a6c781a28150d71"
    ) {
      this.uploadDeclaration = true;
      this.uploadCertificate = false;
      this.noRating = true;
    } else {
      this.uploadDeclaration = false;
      this.uploadCertificate = true;
      this.noRating = false;
    }
    this.formDataPre = this.profileForm.value;
    console.log("aaa", this.profileForm.value);
  }
  get f() {
    return this.profileForm.controls;
  }
  fetchData() {
    if (this.isGfc == true) {
      this.commonService.getGfcFormData("gfc").subscribe((res: any) => {
        console.log(res);
        this.ratings = res.data;
        this.dropdownValues = res.data.map((a) => a.name);
        console.log(this.ratings);
        //  this.getMarks(this.ratingId);
      });
    } else {
      this.commonService.getOdfRatings().subscribe((res: any) => {
        console.log(res.data);

        this.ratings = res?.data;
        this.dropdownValues = res.data.map((a) => a.name);
        console.log("this.dropdownValues", this.dropdownValues, this.ratings);
        console.log("this.ratingId", this.ratingId);
        // this.getMarks(this.ratingId);
        // this.selectedDropdownValue = res.data.find(res => res._id == this.ratingId);
        // console.log(this.selectedDropdownValue.name)
        // this.profileForm.patchValue({
        //   rating: this.ratingId,
        // })
      });
    }
  }
  stateApprove: boolean = false;
  stateReturn: boolean = false;
  alertFormFinalSubmit() {
    this.submitted = true;
    this.activeClass = true;
    console.log(this.getFormData);
    if (this.profileForm.invalid) {
      swal(
        "Missing Data !",
        "One or more required fields are empty or contains invalid data. Please check your input.",
        "error"
      );
      return;
    } else {
      swal(
        "Confirmation !",
        `Are you sure you want to submit this form? Once submitted,
         it will become uneditable and will be sent to State for Review.
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
            this.onSubmit("submit");
            break;
          case "draft":
            this.onDraft();
            break;
          case "cancel":
            break;
        }
      });
      // this.onSubmit('submit');
    }
    //  }
  }

  errorSend;
  onSubmit(type) {
    // this.submitted = true;
    // this.activeClass = true;
    // this.draft = false;
    console.log("profileForm", this.profileForm);
    this.isDisabled = true;
    // if (this.profileForm.invalid) {
    //   return;
    // }

    this.body = {
      ...this.profileForm.value,
      isDraft: false,
      design_year: this.yearValue,
      ulb: this.ulbId,
    };
    this.commonService.odfSubmitForm(this.body).subscribe(
      (res: any) => {
        this.clickedSave = false;
        if (res && res.success) {
          this.commonActionCondition = true;
          this.isDisabled = true;
          this.clickedSave = false;
          this.draft = false;
          this.commonService.setFormStatus2223.next(true);
          this.canTakeAction = false;
          console.log('responseODf', res)
         //
          if (this.isGfc) {
            sessionStorage.setItem("changeInGfc", "false");
          } else {
            sessionStorage.setItem("changeInODf", "false");
          }
          swal("Saved", "Data saved successfully", "success");
          console.log('form data', this.actFormData);

          this.actFormData['status'] = "PENDING";
          this.actFormData['isDraft'] = false;
        } else {
          swal("Error", res?.message ? res?.message : "Error", "error");
        }
      },
      (error) => {
        console.error("err", error);
        if (this.isGfc) {
          sessionStorage.setItem("changeInGfc", "false");
        } else {
          sessionStorage.setItem("changeInODf", "false");
        }
      }
    );
  }
  onDraft() {
    console.log(this.profileForm.value);
    // this.body.isDraft = true;
    // this.body = { ...this.profileForm.value, isDraft: true };
    this.body = {
      ...this.profileForm.value,
      isDraft: true,
      design_year: this.yearValue,
      ulb: this.ulbId,
    };
    console.log("this.body", this.body);

    this.commonService.odfSubmitForm(this.body).subscribe(
      (res: any) => {
        console.log("successDraftttt!!!!!!!!!!!!!", res);
        this.clickedSave = false;
        this.draft = true;
        this.commonService.setFormStatus2223.next(true);

        this.canTakeAction = false;
        if (this.isGfc) {
          sessionStorage.setItem("changeInGfc", "false");
        } else {
          sessionStorage.setItem("changeInODf", "false");
        }
        console.log(this.profileForm.value);
        // this.fetchData();
        swal("Saved", "Data saved as draft successfully", "success");
        console.log('form data', this.actFormData);
        this.actFormData['status'] = "PENDING";
        this.actFormData['isDraft'] = true;
      },
      (error) => {
        this.clickedSave = false;
        if (this.isGfc) {
          sessionStorage.setItem("changeInGfc", "false");
        } else {
          sessionStorage.setItem("changeInODf", "false");
        }
      }
    );
  }
  preview() {
    console.log(
      "odfFileName 111",
      this.profileForm,
      "this.profileForm.value",
      this.profileForm.value
    );
    let preData = {
      formData: this.formDataPre,
      fileName: this.odfFileName,
      isGfcOpen: this.isGfcOpen,
      previewData: this.previewData,
      ratings: this.ratings,
      score: this.ratingMark,
      uploadText: this.uploadDeclaration,
      isDraft: this.draft,
    };
    console.log("preData", preData);
    const dialogRef = this.dialog.open(OdfFormPreviewComponent, {
      data: preData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  onChange(item) {
    this.firstClick = true;
    console.log(item);
    if (
      item == "62b2e4c79a6c781a28150d73" ||
      item == "62b2e4969a6c781a28150d71"
    ) {
      this.uploadDeclaration = true;
      this.uploadCertificate = false;
      this.noRating = true;
      this.clearFile();
      this.profileForm?.get("certDate")?.clearValidators();
      this.profileForm?.get("certDate")?.updateValueAndValidity();
    } else {
      this.uploadDeclaration = false;
      this.uploadCertificate = true;
      this.noRating = false;
      this.profileForm?.get("certDate")?.setValidators([Validators.required]);
    }
    this.getMarks(item);
    this.formDataPre = this.profileForm.value;
    if (this.isGfc) {
      sessionStorage.setItem("changeInGfc", "true");
    } else {
      sessionStorage.setItem("changeInODf", "true");
    }
  }
  getMarks(id) {
    console.log("id ", id);
    console.log("r", this.ratings);
    if (id) {
      this.ratings?.forEach((el) => {
        if (el?._id == id) {
          this.ratingMark = el?.marks;
          return;
        }
      });
    } else {
      this.ratingMark = "N/A";
    }

    //  this.ratingMark = data?.value;
  }
  uploadButtonClicked(formName) {
    //  sessionStorage.setItem("changeInGTC", "true");
    this.change = "true";
  }
  fileChangeEvent(event, progessType, fileName) {
    this.firstClick = true;
    if (event.target.files[0].size >= 5000000) {
      this.ipt.nativeElement.value = "";
      this.errorMessege = "File size should be less than 5Mb.";
      this.profileForm.controls.cert.reset();
      const error = setTimeout(() => {
        this.showIcon = false;
        this.errorMessege = "";
      }, 4000);
      return;
    }

    this.odfFileName = event.target.files[0].name;
    if (this.odfFileName) {
      this.showIcon = true;
    } else {
      this.showIcon = false;
    }
    console.log(event);
    if (event.target.files[0].type == "application/pdf") {
      const filesSelected = <Array<File>>event.target["files"];
      this.filesToUpload.push(
        ...this.filterInvalidFilesForUpload(filesSelected)
      );
      this.upload(progessType, this.odfFileName);
    } else {
      this.showIcon = false;
      swal("Error", "Only PDF File can be Uploaded.", "error");
      return;
    }
  }
  clearFile() {
    this.ipt.nativeElement.value = "";
    this.showIcon = false;
    this.odfFileName = "";
    this.profileForm?.controls?.cert.patchValue({
      url: "",
      name: "",
    });
    this.formDataPre = this.profileForm.value;
    if (this.isGfc) {
      sessionStorage.setItem("changeInGfc", "true");
    } else {
      sessionStorage.setItem("changeInODf", "true");
    }
  }

  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf") {
        validFiles.push(file);
      } else {
        swal("Only PDF File can be Uploaded.");
        return;
      }
    }
    return validFiles;
  }
  apiData = {};
  async upload(progessType, fileName) {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this[fileName] = files[0].name;
    console.log(files[0].name);
    let fileExtension = files[0].name.split(".").pop();
    console.log(fileExtension);
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
          this.uploadFileToS3(file, s3URL, fileAlias, fileIndex, progessType);
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
  subscription: any;
  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ""
  ) {
    this.subscription = this.dataEntryService
      .uploadFileToS3(file, s3URL)
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;
            if (progressType == "odfProgress") {
              this.odfUrl = fileAlias;
              this.profileForm.get("cert").patchValue({
                url: fileAlias,
                name: file.name,
              });
              this.formDataPre = this.profileForm.value;
              if (this.isGfc) {
                sessionStorage.setItem("changeInGfc", "true");
              } else {
                sessionStorage.setItem("changeInODf", "true");
              }
              // this.profileForm.get('cert').patchValue({name:file.name})

              console.log(file);
              console.log(s3URL);
            }
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
    // this.formDataPre = this.profileForm.value;
  }
  dateChange() {
    this.formDataPre = this.profileForm.value;
    console.log("this.isGfc", this.isGfc);
    if (this.isGfc) {
      sessionStorage.setItem("changeInGfc", "true");
    } else {
      sessionStorage.setItem("changeInODf", "true");
    }
    console.log("date change", this.profileForm.value);
  }
  formValueChanges() {
    this.profileForm.valueChanges.subscribe((el) => {
      //   this.firstClick = true;
      console.log("changes", el);
    });
  }

  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          let changeInForm;
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";
          if (this.isGfc) {
            changeInForm = sessionStorage.getItem("changeInGfc");
          } else {
            changeInForm = sessionStorage.getItem("changeInODf");
          }
          // const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {
            if (this.isGfc) {
              sessionStorage.setItem("changeInGfc", "false");
            } else {
              sessionStorage.setItem("changeInODf", "false");
            }
            return;
          }
          if (changeInForm === "true" && this.routerNavigate === null) {
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.routerNavigate = event;
            this.dialog.closeAll();
            this.openDialog(this.template);
          }
        }
      });
    }
  }
  openDialog(template) {
    if (template == undefined) return;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
      if (result === undefined) {
        if (this.routerNavigate) {
          // this.routerNavigate = null;
        }
      }
    });
  }
  async stay() {
    await this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      await this.onDraft();
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    await this.onDraft();
    return this._router.navigate(["ulbform2223/slbs"]);
  }
  async discard() {
    if (this.isGfc) {
      sessionStorage.setItem("changeInGfc", "false");
    } else {
      sessionStorage.setItem("changeInODf", "false");
    }
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  disableEnterDate() {
    return false;
  }
  // outputData(event){
  //   console.log(event)
  //   this.actionData = event
  //   console.log(this.actionData)
  //   if(this.actionData.status == 'approve'){
  //     this.stateApprove = true
  //     this.stateReturn = false
  //     this.isDisabled = this.stateApprove
  //   }else if(this.actionData.status == 'return'){
  //     this.stateApprove = false
  //     this.stateReturn = true
  //     this.isDisabled = this.stateApprove
  //   }
  //   console.log(this.actionData)
  //   this.actionData.reason ? this.errorSend = '' : ''
  //     this.hideSaveDraft = false;
  //     this.positionDraft = true;
  //   //  event.status == 'approve' ? this.isDisabled = true : this.isDisabled = false
  //  }
  //  actionStatus(){
  //   this.body = this.actionData
  //   this.commonService.odfSubmitForm(this.body).subscribe(
  //     (res: any) => {

  //       if (res && res.success) {

  //         swal("Saved", "Data saved successfully", "success");
  //       } else {
  //         swal("Error", res?.message ? res?.message : "Error", "error");
  //       }
  //     },
  //     (error) => {
  //       console.error("err", error);

  //     }
  //   );
  // }
  actionRes;
  actionBtnDis = false;

  actionData(e) {
    console.log("action data..", e);
    this.actionRes = e;
  }
  saveAction() {
    let actionBody = {
      formId: this.formId,
      design_year: "606aafb14dff55e6c075d3ae",
      status: this.actionRes?.status,
      ulb: [this.ulbId],
      rejectReason: this.actionRes?.reason,
      responseFile: {
        url: this.actionRes?.document?.url,
        name: this.actionRes?.document?.name,
      },
    };
    if(actionBody?.rejectReason == "" &&  actionBody?.status == "REJECTED"){
       swal("Alert!", "Return reason is mandatory in case of Returned a file", "error");
       return;
    }
    swal(
      "Confirmation !",
      `Are you sure you want to submit this action? Once submitted,
      it will become uneditable and will be sent to MoHUA for Review.`,
      "warning",
      {
        buttons: {
          Submit: {
            text: "Submit",
            value: "submit",
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
          this.finalActionSave(actionBody);
          break;
        case "cancel":
          break;
      }
    });

  }
  finalActionSave(actionBody){
    this.commonService.postCommonAction(actionBody).subscribe(
      (res) => {
        console.log("action respon", res);
        this.actionBtnDis = true;
        swal("Saved", "Action saved successfully.", "success");
      },
      (error) => {
        swal("Error", error?.message ? error?.message : "Error", "error");
      }
    );
  }
}
