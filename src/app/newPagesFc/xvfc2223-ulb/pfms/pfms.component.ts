import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType, HttpParams } from '@angular/common/http';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
import { PfmsPreviewComponent } from '../pfms-preview/pfms-preview.component';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from '@angular/router';
const swal2 = require("sweetalert2");
@Component({
  selector: "app-pfms",
  templateUrl: "./pfms.component.html",
  styleUrls: ["./pfms.component.scss"],
})
export class PfmsComponent implements OnInit, OnDestroy {
  ulbData: any;
  ulbName: any;
  design_year: any;
  yearValue: any;
  body;
  registerForm: FormGroup;
  submitted = false;
  ulbId: any;
  designYearId: any;
  clickedSave;
  routerNavigate = null;
  response;
  customDisable: boolean = false;
  @ViewChild("ipt") ipt: any;
  @ViewChild("ipt2") ipt2: any;
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  modalRef;
  formDataPre;
  firstClick = false;
  sideMenuItem: any;
  nextRouter;
  backRouter;
  @ViewChild("templateSave") template;
  constructor(
    private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService,
    private commonService: NewCommonService,
    public dialog: MatDialog,
    public _router: Router
  ) {
    this.ulbData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.ulbData);
    this.ulbId = this.ulbData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
    this.ulbName = this.ulbData?.name;
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    for (var i in this.design_year) {
      if (i == "2022-23") {
        this.yearValue = i;
        this.designYearId = this.design_year[i];
        console.log(this.designYearId);
      }
    }
    // this.getSubmittedFormData()
    this.navigationCheck();
   // this.actNavAlert();
    this.setFormIdRouter()
  }
  change = "";
  errorMessege: any = "";
  errorMessegeOther: any = "";
  showIcon: boolean = false;
  pfmsFileName;
  pfmsLinkProgress;
  odfUrl = "";
  odfUrl2 = "";
  alertMessege: boolean = false;
  showOtherQuestions: boolean = false;
  showOtherQuestions1: boolean = false;
  linkedToggle: boolean = false;
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

  activeClass: boolean = false;
  activeClassBottom: boolean = false;
  showIconOtherDoc: boolean = false;
  otherProgress;
  activeClassNo: boolean = false;
  activeClassNoBottom: boolean = false;
  otherFileName: any;
  subscription: any;
  previewData: any;
  next_router = "#";
  isDisabled: boolean = false;
  dataValue: any;
  uploadedFile: any;
  disableInputs: boolean = false;
  greyInputs: boolean = false;
  back_router = "#";

  ngOnInit(): void {
    sessionStorage.setItem("changeInPFMS", "false");
    this.clickedSave = false;
    this.setRouter();
    this.initializePmfsForm();
    this.getSubmittedFormData();
  }
  formId = "";
  pfmsData;
  setRouter() {
    for (const key in this.sideMenuItem) {
      //  console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach((element) => {
        //   console.log('name name', element);
        if (element?.name == "Linking of PFMS Account") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
          this.formId = element?._id;
        }
      });
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  checkValidation(){
    console.log('this.registerForm.value', this.dataValue)
    if(this.dataValue?.data?.linkPFMS == 'No'){
      this.removeULBLinkedFormControlValidation();
      this.removeValidatorsOneByOne("isUlbLinkedWithPFMS");
    }
  }
  initializePmfsForm() {
    this.registerForm = this.formBuilder.group({
      linkPFMS: ["", Validators.required],
      isUlbLinkedWithPFMS: ["", Validators.required],
      PFMSAccountNumber: ["", Validators.required],
      ulb: this.ulbId,
      design_year: this.designYearId,
      cert: this.formBuilder.group({
        url: ["", Validators.required],
        name: ["", Validators.required],
      }),
      otherDocs: this.formBuilder.group({
        url: [""],
        name: [""],
      }),
      isDraft: "",
      status: "PENDING",
    });
    console.log("initializePmfsForm", this.registerForm);
  }
  canTakeAction = false;
  getSubmittedFormData() {
    const params = { ulb: this.ulbId, design_year: this.designYearId };
    this.commonService.submittedFormData(params).subscribe(
      (res: any) => {
        console.log(res);

        // this.uploadedFile = res?.data?.cert?.name ? res?.data?.cert?.name : ''
        this.dataValue = res;
        this.patchValues();
        this.odfUrl = res?.data?.cert?.url;
        this.odfUrl2 = res?.data?.otherDocs?.url;
        this.pfmsData = res?.data;
        if (this.dataValue?.data?.isDraft == true) {
          this.isDisabled = true;
        } else if (this.dataValue?.data?.isDraft == false) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
        if (res?.data?.status === "REJECTED" && this.ulbData?.role == "ULB") {
          this.isDisabled = true;
        }
        if (this.ulbData?.role !== "ULB") {
          this.isDisabled = false;
          let action = 'false';
          if (this.dataValue?.data?.canTakeAction) {
            action = 'true';
            this.canTakeAction = true;
          } else {
            action = 'false';
          }
          sessionStorage.setItem("canTakeAction", action);
        }
        if (res?.data?.status == null || res?.data?.status == undefined) {
          this.actionBtnDis = true;
        } else if (this.ulbData?.role !== "ULB" && this.canTakeAction) {
          this.actionBtnDis = false;
        } else {
          this.actionBtnDis = true;
        }

        console.log(this.dataValue);

        if (
          this.dataValue?.data?.linkPFMS == "Yes" &&
          this.dataValue?.data?.isUlbLinkedWithPFMS == "No"
        ) {
          this.removeULBLinkedFormControlValidation();

        }

        if(this.dataValue?.data?.linkPFMS == "No"){
            this.checkValidation();
        }

        if (this.dataValue.data.cert.name) {
          this.pfmsFileName = this.dataValue.data.cert.name;
          this.showIcon = true;
        } else {
          this.showIcon = false;
        }

        if (this.dataValue.data.otherDocs.name) {
          this.otherFileName = this.dataValue.data.otherDocs.name;
          this.showIconOtherDoc = true;
        } else {
          this.showIconOtherDoc = false;
        }
      },
      (error) => {
        this.isDisabled = true;
        if (this.ulbData?.role !== "ULB") {
          this.isDisabled = false;
        }
      }
    );
  }

  removeULBLinkedFormControlValidation() {
    this.registerForm.get("PFMSAccountNumber").clearValidators();
    this.registerForm.get("PFMSAccountNumber").updateValueAndValidity();
    this.removeValidatorInBulk(this.registerForm.get("cert"));
  }

  setValidators(formFieldName: string) {
    this.registerForm.controls[formFieldName].setValidators([
      Validators.required,
    ]);
    this.registerForm.controls[formFieldName].updateValueAndValidity();
  }

  removeValidatorsOneByOne(formFieldName: string) {
    this.registerForm.controls[formFieldName].setValidators(null);
    this.registerForm.controls[formFieldName].updateValueAndValidity();
  }

  removeValidatorInBulk(form: any) {
    console.log("form contro", form);
    for (const field in form.controls) {
      // 'field' is a string
      let con = form.get(field); // 'control' is a FormControl
      con.clearValidators();
      con.updateValueAndValidity();
    }
  }

  patchValues() {
    console.log("this.dataValue", this.dataValue);
    this.registerForm.patchValue({
      linkPFMS: this.dataValue?.data?.linkPFMS,
      isUlbLinkedWithPFMS: this.dataValue?.data?.isUlbLinkedWithPFMS,
      PFMSAccountNumber: this.dataValue?.data?.PFMSAccountNumber,
      ulb: this.ulbId,
      design_year: this.designYearId,
      isDraft: this.dataValue?.data?.isDraft,
      cert: {
        url: this.dataValue?.data?.cert?.url,
        name: this.dataValue?.data?.cert?.name,
      },
      otherDocs: {
        url: this.dataValue?.data?.otherDocs?.url,
        name: this.dataValue?.data?.otherDocs?.name,
      },
    });
    console.log("patchValues", this.registerForm.value);
  }

  patchFormValue(formControlName: string, value: any) {
    this.registerForm.patchValue({
      [formControlName]: value,
    });
  }
  onChnageSave() {
    // sessionStorage.setItem("changeInGTC", "true");
    sessionStorage.setItem("changeInPFMS", "true");
  }
  alertFormFinalSubmit() {
    this.submitted = true;
    this.alertMessege = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
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
            this.saveDraft();
            break;
          case "cancel":
            break;
        }
      });
      // this.onSubmit('submit');
    }
  }
  onSubmit(type) {
    console.log(this.registerForm);
    console.log("this.dataValue", this.dataValue);
    if (
      this.registerForm.value.linkPFMS == "No" ||
      (this.registerForm.value.linkPFMS == "Yes" &&
        this.registerForm.value.isUlbLinkedWithPFMS == "No")
    ) {
      this.registerForm.get("isUlbLinkedWithPFMS").clearValidators();
      this.registerForm.get("isUlbLinkedWithPFMS").updateValueAndValidity();
      this.removeULBLinkedFormControlValidation();
    }
    this.submitted = true;
    // stop here if form is invalid

    // this.registerForm.get('isUlbLinkedWithPFMS').valueChanges.subscribe(val => {
    //   if (this.registerForm.value.isUlbLinkedWithPFMS == 'Yes') {
    //     this.registerForm.controls['PFMSAccountNumber'].setValidators([Validators.required]);
    //     this.registerForm.controls['cert']['controls']['name'].setValidators([Validators.required]);
    //     this.registerForm.controls['cert']['controls']['url'].setValidators([Validators.required]);
    //   } else {
    //     this.registerForm.controls['PFMSAccountNumber'].clearValidators();
    //     this.registerForm.controls['cert']['controls']['name'].clearValidators();
    //     this.registerForm.controls['cert']['controls']['url'].clearValidators();
    //   }
    //   this.registerForm.controls['PFMSAccountNumber'].updateValueAndValidity();
    //   this.registerForm.controls['cert']['controls']['name'].updateValueAndValidity();
    //   this.registerForm.controls['cert']['controls']['url'].updateValueAndValidity();

    // });

    this.patchFormValue("isDraft", false);
    this.body = this.registerForm.value;
    this.commonService.pfmsSubmitForm(this.body).subscribe(
      (res: any) => {
        this.clickedSave = false;
        console.log("success!!!!!!!!!!!!!", res);
        if (res && res.status) {
          this.clickedSave = false;
          sessionStorage.setItem("changeInPFMS", "false");
          console.log("success!!!!!!!!!!!!!", res);
          this.commonService.setFormStatus2223.next(true);
          this.getSubmittedFormData();
          swal("Saved", "Data saved successfully", "success");
        } else {
          sessionStorage.setItem("changeInPFMS", "false");
          swal("Error", res?.message ? res?.message : "Error", "error");
        }
      },
      (error) => {
        console.error("err", error);
      }
    );
    // display form values on success
    console.log(this.registerForm.value);
  }

  saveDraft() {
    this.patchFormValue("isDraft", true);
    console.log(this.registerForm.value);
    this.body = this.registerForm.value;
    this.commonService.pfmsSubmitForm(this.body).subscribe(
      (res: any) => {
        console.log("success!!!!!!!!!!!!!", res);
        if (res && res.status) {
          this.clickedSave = false;
          this.getSubmittedFormData();
          sessionStorage.setItem("changeInPFMS", "false");
          this.commonService.setFormStatus2223.next(true);
          swal("Saved", "Data saved as draft successfully.", "success");
        } else {
          sessionStorage.setItem("changeInPFMS", "false");
          swal("Error", res?.message ? res?.message : "Error", "error");
        }
      },
      (error) => {
        this.clickedSave = false;
        console.error("err", error);
      }
    );
  }

  preview() {
    console.log(this.registerForm.value);
    const formData = JSON.parse(JSON.stringify(this.registerForm.value));
    if (formData && formData.isDraft.toString() == "") {
      delete formData.isDraft;
    }
    let previewData = {
      dataPreview: formData,
      preData: this.dataValue,
    };
    console.log(this.dataValue);
    const dialogRef = this.dialog.open(PfmsPreviewComponent, {
      data: previewData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  clickYes() {
    this.showOtherQuestions = true;
    this.showOtherQuestions1 = true;
    this.activeClass = true;
    this.linkedToggle = false;
    this.activeClassBottom = false;
    this.activeClassNo = false;
    this.activeClassNoBottom = false;
    // sessionStorage.setItem("changeInGTC", "true");
    sessionStorage.setItem("changeInPFMS", "true");
    this.setValidators("isUlbLinkedWithPFMS");
  }

  clickNo() {
    this.showOtherQuestions = false;
    this.showOtherQuestions1 = false;
    this.activeClass = false;
    this.activeClassNo = true;
    this.showIcon = false;
    this.showIconOtherDoc = false;
    // this.registerForm.controls['isUlbLinkedWithPFMS'].reset();
    this.registerForm.patchValue({
      isUlbLinkedWithPFMS: "",
      PFMSAccountNumber: "",
      cert: {
        url: "",
        name: "",
      },
      otherDocs: {
        url: "",
        name: "",
      },
    });
    this.removeValidatorsOneByOne("isUlbLinkedWithPFMS");
    this.removeValidatorsOneByOne("PFMSAccountNumber");
    this.removeValidatorInBulk(this.registerForm.get("cert"));
    // this.registerForm.get('isUlbLinkedWithPFMS').clearValidators();
    // this.registerForm.get('isUlbLinkedWithPFMS').updateValueAndValidity();
    // sessionStorage.setItem("changeInGTC", "true");
    sessionStorage.setItem("changeInPFMS", "true");
    console.log("registerForm", this.registerForm);
  }

  linkedYes(event) {
    // this.registerForm.controls.PFMSAccountNumber.reset();
    // this.registerForm.get('PFMSAccountNumber')
    this.registerForm.patchValue({
      PFMSAccountNumber: "",
      cert: {
        url: "",
        name: "",
      },
      otherDocs: {
        url: "",
        name: "",
      },
    });
    this.linkedToggle = true;
    this.activeClass = true;
    this.activeClassBottom = true;
    this.activeClassNoBottom = false;
    console.log(event);
    // sessionStorage.setItem("changeInGTC", "true");
    sessionStorage.setItem("changeInPFMS", "true");
    if (event == "Yes") {
      // this.registerForm.get('PFMSAccountNumber').setValidators(Validators.required);
      // this.registerForm.get('PFMSAccountNumber').updateValueAndValidity();
      this.setValidators("PFMSAccountNumber");
      this.registerForm.controls.cert["controls"].name.setValidators(
        Validators.required
      );
      this.registerForm.controls.cert["controls"].name.updateValueAndValidity();
      // this.isDisabled = true;
    }
    //  else {
    //   this.registerForm.get('PFMSAccountNumber').setValidators(null);
    //   this.registerForm.get('PFMSAccountNumber').updateValueAndValidity();
    //   this.registerForm.controls.cert['controls'].name.setValidators(null)
    //   this.registerForm.controls.cert['controls'].name.updateValueAndValidity()
    //   this.isDisabled = false;
    // }
    console.log(
      "registerForm",
      this.registerForm,
      "isDisabled",
      this.isDisabled
    );
  }

  linkedNo(event) {
    this.linkedToggle = false;
    this.activeClassBottom = false;
    this.activeClassNoBottom = true;
    this.showIcon = false;
    this.showIconOtherDoc = false;
    this.registerForm.patchValue({
      PFMSAccountNumber: "",
      cert: {
        url: "",
        name: "",
      },
      otherDocs: {
        url: "",
        name: "",
      },
    });

    // this.registerForm.get('PFMSAccountNumber').clearValidators();
    // this.registerForm.get('PFMSAccountNumber').updateValueAndValidity();
    this.removeValidatorsOneByOne("PFMSAccountNumber");
    this.removeValidatorInBulk(this.registerForm.get("cert"));

    // sessionStorage.setItem("changeInGTC", "true");
    sessionStorage.setItem("changeInPFMS", "true");
  }

  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInPFMS", "true");
    this.change = "true";
  }

  fileChangeEvent(event, progessType) {
    console.log(progessType);
    if (progessType == "pfmsLinkProgress") {
      if (event.target.files[0].size >= 5000000) {
        this.ipt.nativeElement.value = "";
        this.errorMessege = "File size should be less than 5Mb.";
        // this.errorMessegeOther = 'File size should be less than 5Mb.'

        this.registerForm.controls.cert.reset();
        const error = setTimeout(() => {
          this.showIcon = false;
          // this.showIconOtherDoc = false
          this.errorMessege = "";
          // this.errorMessegeOther = ''
        }, 4000);
        return;
      }
    }
    if (progessType == "otherProgress") {
      if (event.target.files[0].size >= 5000000) {
        this.ipt2.nativeElement.value = "";
        // this.errorMessege = 'File size should be less than 5Mb.'
        this.errorMessegeOther = "File size should be less than 5Mb.";

        this.registerForm.controls.cert.reset();
        const error = setTimeout(() => {
          // this.showIcon = false
          this.showIconOtherDoc = false;
          // this.errorMessege = ''
          this.errorMessegeOther = "";
        }, 4000);
        return;
      }
    }
    const fileName = event.target.files[0].name;
    if (progessType == "otherProgress") {
      this.otherFileName = event.target.files[0].name;
      this.showIconOtherDoc = true;
    }

    if (progessType == "pfmsLinkProgress") {
      this.pfmsFileName = event.target.files[0].name;
      this.showIcon = true;
    }
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
  }
  clearFile(type: string = "") {
    if (type == "cert") {
      this.ipt.nativeElement.value = "";
      this.registerForm.patchValue({
        cert: {
          url: "",
          name: "",
        },
      });
      this.showIcon = false;
      this.pfmsFileName = "";
    } else {
      this.ipt2.nativeElement.value = "";
      this.showIconOtherDoc = false;
      this.otherFileName = "";
      this.registerForm.patchValue({
        otherDocs: {
          url: "",
          name: "",
        },
      });
    }
    sessionStorage.setItem("changeInPFMS", "true");
    this.registerForm.patchValue({
      // cert: '',
      [type]: "",
    });
  }

  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf") {
        validFiles.push(file);
      } else {
        this.showIcon = false;
        this.showIconOtherDoc = false;
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
          if (progessType == "otherProgress") {
            this[progessType] = Math.floor(Math.random() * 90) + 10;
          }
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
            if (progressType == "pfmsLinkProgress") {
              this.odfUrl = fileAlias;
              this.registerForm.get("cert").patchValue({
                url: fileAlias,
                name: file.name,
              });
              sessionStorage.setItem("changeInPFMS", "true");
              // this.profileForm.get('cert').patchValue({name:file.name})

              console.log(file);
              console.log(s3URL);
            }
            if (progressType == "otherProgress") {
              this.odfUrl2 = fileAlias;
              this.registerForm.get("otherDocs").patchValue({
                url: fileAlias,
                name: file.name,
              });
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
  }

  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          let changeInForm;
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";

          changeInForm = sessionStorage.getItem("changeInPFMS");

          // const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInPFMS", "false");

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
      await this.saveDraft();
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    await this.saveDraft();
    return this._router.navigate(["ulbform2223/slbs"]);
  }
  async discard() {
    sessionStorage.setItem("changeInPFMS", "false");

    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  numberLimitV(e, input) {
    // console.log("sss", e, input);
    const functionalKeys = ["Backspace", "ArrowRight", "ArrowLeft", "Tab"];

    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input?.selectionStart !== input?.selectionEnd &&
      input?.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input?.value + keyValue?.toString();
    }

    if (+newValue > 100000000000000000000 || newValue.length > 20) {
      e.preventDefault();
    }
  }
  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }

  actionRes;
  actionBtnDis = false;
  actionError = false;
  actionData(e) {
    console.log("action data..", e);
    this.actionRes = e;
    if (e?.status == "APPROVED" || e?.status == "REJECTED") {
      this.actionError = false;
    }
  //  sessionStorage.setItem("isActChangePfms", "true");
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
      this.actionError = true;
      return;
    } else if (actionBody?.status == "" || actionBody?.status == null || actionBody?.status == undefined) {
      swal("Alert!", "Action is mandatory", "error");
      this.actionError = true;
      return;
    }
    this.actionError = false;
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
        this.commonService.setFormStatus2223.next(true);
      },
      (error) => {
        swal("Error", error?.message ? error?.message : "Error", "error");
      }
    );
  }
  // actNavAlert() {
  //   let canActChange = sessionStorage.getItem("isActChangePfms");
  //   if (this.canTakeAction == true) {
  //     this._router.events.subscribe((event) => {
  //       debugger
  //       if (event instanceof NavigationStart) {
  //         if (event.url === "/" || event.url === "/login") {
  //           sessionStorage.setItem("isActChangePfms", "false");
  //           return;
  //         }
  //         if (canActChange === "true" && this.routerNavigate === null) {
  //           const currentRoute = this._router.routerState;
  //           this._router.navigateByUrl(currentRoute.snapshot.url, {
  //             skipLocationChange: true,
  //           });
  //           this.routerNavigate = event;
  //           // this.dialog.closeAll();
  //           this.actionAlert();
  //         }
  //       }
  //     });
  //   }
  // }
  // actErrMsg = "You have some unsaved changes on this page. Do you wish to save your data?";
  // isActChange = false;
  // actionAlert() {
  //   swal2.fire({
  //     title: `${this.actErrMsg}`,
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     showConfirmButton: false,
  //     cancelButtonText: 'Stay',
  //     denyButtonText: `Discard`,
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result?.isCancel) {
  //       swal2.fire('Saved!', '', 'success')
  //     } else if (result.isDenied) {

  //       if (this.routerNavigate) {
  //         sessionStorage.setItem("isActChangePfms", "false");
  //         this._router.navigate([this.routerNavigate.url]);
  //         return;
  //       }
  //     }
  //   })
  // }
  formSubs = null;
  setFormIdRouter() {
    this.formSubs = this.commonService.setULBRouter.subscribe((res) => {
      if (res == true) {
        this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
        this.setRouter();
      }
    });
  }
  ngOnDestroy() {
    this.formSubs?.unsubscribe();
  }
}

