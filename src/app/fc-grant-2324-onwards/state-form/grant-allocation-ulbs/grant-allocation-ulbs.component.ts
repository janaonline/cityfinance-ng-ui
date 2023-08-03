import { Component, OnInit } from '@angular/core';
import * as fileSaver from "file-saver";
import { SweetAlert } from "sweetalert/typings/core";
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { GaPreviewComponent } from 'src/app/newPagesFc/xvfc2223-state/grant-allocation/ga-preview/ga-preview.component';
import { MatDialog } from '@angular/material/dialog';
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-grant-allocation-ulbs',
  templateUrl: './grant-allocation-ulbs.component.html',
  styleUrls: ['./grant-allocation-ulbs.component.scss']
})
export class GrantAllocationUlbsComponent implements OnInit {

  constructor(
    private commonServices: CommonServicesService,
    private dataEntryService: DataEntryService,
    private dialog: MatDialog,
  ) {
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));

    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
  }
  stateId: string = '';
  userData: object | any;
  years: [] | any;
  nextRouter: string = '';
  backRouter: string = '';
  sideMenuItem: any;
  gtcFormData;
  isApiInProgress: boolean = true;
  postBody: object | any;
  response = {
    formName: 'Grant Allocation to ULBs',
    formId: '',
    status: '',
    statusId: '',
    info: '',
    previousYrMsg: '',

  }
  isActionSubmitted: boolean = false;
  actionPostPayload: object = {};
  actionPayload = {
    "responses": [
      {
        "shortKey": "",
        "status": '',
        "rejectReason": "",
        "responseFile": {
          "url": "",
          "name": ""
        }
      }
    ]
  }

  ngOnInit(): void {
    this.setRouter();
    // this.intializeGtc();
    this.getGtcData();
  }

  getGtcData() {
    this.isApiInProgress = true;
    let queryParams = {
      state: this.stateId,
      design_year: this.years["2023-24"]
    }
    // {{local}}grantDistribution/getGrantDistributionForm?design_year=606aafc14dff55e6c075d3ec&state=5dcf9d7516a06aed41c748fe
    this.commonServices.formGetMethod(`grantDistribution/getGrantDistributionForm`, queryParams).subscribe(
      (res: any) => {
        console.log("res", res);
        this.response = res;
        this.gtcFormData = res?.gtcFormData;
        this.isApiInProgress = false;
      },
      (error) => {
        console.log("err", error);
        this.isApiInProgress = false;
        swal('Error', error?.message ?? 'Something went wrong', 'error');
      }
    );
  }

  setRouter() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.folderName == "grant_allocation") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }
  // intializeGtc() {
  //   this.gtcFormData = [
  //     {
  //       label:
  //         "1. View/Upload Grant Allocation for Non-Million Plus Cities Tied Grants",
  //       isDisabled: false,
  //       error: false,
  //       icon: "",
  //       yearCode: '2023-24',
  //       quesArray: [
  //         {
  //           installment: 1,
  //           year: this.years["2023-24"],
  //           type: "nonmillion_tied",
  //           instlText: "1st Installment (2023-24)",
  //           quesText: "Upload Grant Allocation to ULBs",
  //           isDisableQues: false,
  //           disableMsg: "",
  //           key: "nonmillion_tied_2023-24_1",
  //           question:
  //             "(A) Upload Grant Allocation to ULBs - 1st Installment (2023-24)",
  //           qusType: "",
  //           fileName: "",
  //           url: "",
  //           file: {
  //             // name: "",
  //             // url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           // isDraft: null,
  //           // status: null,
  //           // rejectReason: null,
  //         },
  //         {
  //           installment: 2,
  //           year: this.years["2023-24"],
  //           type: "nonmillion_tied",
  //           instlText: "2nd Installment (2023-24)",
  //           quesText: "Upload Grant Allocation to ULBs",
  //           isDisableQues: true,
  //           disableMsg: `1st Installment (2023-24) Grant allocation has to be uploaded first before uploading 2nd Installment (2023-24) Grant allocation to ULBs`,
  //           question:
  //             "(B) Upload Grant Allocation to ULBs - 2nd Installment (2023-24)",
  //           key: "nonmillion_tied_2023-24_2",
  //           qusType: "",
  //           fileName: "",
  //           url: "",
  //           file: {
  //             // name: "",
  //             // url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason: null,
  //         },
  //       ],
  //     },
  //     {
  //       label:
  //         "2. View/Upload Grant Allocation for Non-Million Plus Cities Untied Grants",
  //       isDisabled: false,
  //       error: false,
  //       icon: "",
  //       quesArray: [
  //         {
  //           installment: 1,
  //           year: this.years["2023-24"],
  //           type: "nonmillion_untied",
  //           instlText: "1st Installment (2023-24)",
  //           quesText: "Upload Grant Allocation to ULBs",
  //           isDisableQues: false,
  //           disableMsg: "",
  //           question:
  //             "(A) Upload Grant Allocation to ULBs - 1st Installment (2023-24)",
  //           key: "nonmillion_untied_2023-24_1",
  //           qusType: "",
  //           fileName: "",
  //           url: "",
  //           file: {
  //             // name: "",
  //             // url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason: null,
  //         },
  //         {
  //           installment: 2,
  //           year: this.years["2023-24"],
  //           type: "nonmillion_untied",
  //           instlText: "2nd Installment (2023-24)",
  //           quesText: "Upload Grant Allocation to ULBs",
  //           isDisableQues: true,
  //           disableMsg: `1st Installment (2023-24) Grant allocation has to be uploaded first before uploading 2nd Installment (2023-24) Grant allocation to ULBs`,
  //           question:
  //             "(B) Upload Grant Allocation to ULBs - 2nd Installment (2023-24)",
  //           key: "nonmillion_untied_2023-24_2",
  //           qusType: "",
  //           fileName: "",
  //           url: "",
  //           file: {
  //             // name: "",
  //             // url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason: null,
  //         },
  //       ],
  //     },
  //     {
  //       label:
  //         "3. View/Upload Grant Allocation for Million Plus Cities Tied Grants",
  //       isDisabled: false,
  //       error: false,
  //       icon: "",
  //       quesArray: [
  //         {
  //           installment: 1,
  //           year: this.years["2023-24"],
  //           type: "million_tied",
  //           instlText: "FY (2023-24)",
  //           isDisableQues: false,
  //           quesText: "Upload Grant Allocation for Water Supply and SWM",
  //           question:
  //             "(A) Upload Grant Allocation for  Water Supply and SWM - FY ( 2023-24)",
  //           key: "million_tied_2023-24_1",
  //           qusType: "",
  //           fileName: "",
  //           url: "",
  //           file: {
  //             // name: "",
  //             // url: "",
  //             progress: null,
  //             error: null,
  //           },
  //           isDraft: null,
  //           status: null,
  //           rejectReason: null,
  //         },
  //       ],
  //     },
  //   ];
  // }

  downloadSample(data) {
    let queryParams = {
      type: data?.type,
      year: data?.year,
      installment: data?.installment
    }
    console.log('templates....', data);

    this.commonServices.formGetMethodAsBlob('grantDistribution/template', queryParams).subscribe(
      (response: any) => {
        let blob: any = new Blob([response], {
          type: "text/json; charset=utf-8",
        });
        fileSaver.saveAs(blob, `${data?.key}stInstallment_template.xlsx`);
        this.handleDownloadSuccess();
      },
      (error) => {
        console.error("Error downloading the file", error);
        this.handleDownloadError();
      }
    );
  }

  handleDownloadSuccess() {
    swal('', "File downloaded successfully", '');
  }

  handleDownloadError() {
    swal('', "Error downloading the file", '');
  }


  async fileChangeEvent(event, fileType, cIndex, qIndex) {
    const isFileValid = this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if (!isFileValid) {
      swal("Error", "File name has special characters that are not allowed. Please edit the file name and then upload.", 'error');
      return;
    }

    const file = event.target.files[0];
    const fileSize = file?.size / (1024 * 1024); // Size in MB

    if (fileSize >= 20) {
      swal("File Limit Error", "Maximum 20 MB file is allowed.", "error");
      return;
    }

    const fileExtension = file.name.split(".").pop();

    if ((fileType === "excel" && fileExtension !== "xls" && fileExtension !== "xlsx") ||
      (fileType === "pdf" && fileExtension !== "pdf")) {
      swal("Error", `Only ${fileType.toUpperCase()} files can be uploaded.`, "error");
      return;
    }

    try {
      await this.uploadFile(file, file.name, file.type, fileType, cIndex, qIndex);
    } catch (error) {
      console.log(error);
      swal("Error", "An error occurred during file upload.", "error");
    }
  }

  async uploadFile(file, name, type, fileType, i, j) {
    this.updateFileProgress(i, j, 10);
    const folderName = `${this.userData?.role}/2023-24/grant_allocation/${this.userData?.stateCode}`;
    try {
      const s3Response = await this.dataEntryService.newGetURLForFileUpload(name, type, folderName).toPromise();
      this.updateFileProgress(i, j, 50);
      const res = s3Response.data[0];
      this.gtcFormData[i].quesArray[j]["file"].name = name;
      await this.uploadFileToS3(file, res["url"], res["file_url"], name, fileType, i, j);
    } catch (err) {
      console.log(err);
      this.gtcFormData[i].quesArray[j]["file"] = file;
      this.gtcFormData[i].quesArray[j]["file"]["error"] = true;
    }
  }

  private async uploadFileToS3(file: File, s3URL: string, fileAlias: string, name, fileType, i, j) {
    this.updateFileProgress(i, j, 60);

    try {
      const res = await this.dataEntryService.uploadFileToS3(file, s3URL).toPromise();
      this.updateFileProgress(i, j, 70);
      if (res.type === HttpEventType.Response) {
        try {
          const params = {
            url: fileAlias,
            design_year: this.gtcFormData[i].quesArray[j]?.year,
            type: this.gtcFormData[i].quesArray[j]?.type,
            installment: this.gtcFormData[i].quesArray[j]?.installment
          }
          const response = await this.commonServices.formGetMethodAsBlob('grantDistribution/upload', params).toPromise();
          console.log(response);
          this.updateFileProgress(i, j, 100);
          this.gtcFormData[i].quesArray[j]["file"]["url"] = fileAlias;

        } catch (error) {
          console.log(error);
          const blob: any = new Blob([error.error], {
            type: "text/json; charset=utf-8",
          });
          this.updateFileProgress(i, j, null);
          this.gtcFormData[i].quesArray[j]["file"]["url"] = "";
          this.gtcFormData[i].quesArray[j]["file"]["name"] = "";
          fileSaver.saveAs(blob, "error-sheet.xlsx");
          swal("Error", "Your file is not correct. Please refer to the error sheet.", "error");
        }
      }
    } catch (err) {
      this.gtcFormData[i].quesArray[j]["file"] = file;
      this.gtcFormData[i].quesArray[j]["file"]["error"] = true;
    }
  }

  private updateFileProgress(i, j, progress) {
    this.gtcFormData[i].quesArray[j]["file"]["progress"] = progress;
  }

  saveFile(i, j) {
    const fileName = this.gtcFormData[i]?.quesArray[j]?.file?.name;
    const url = this.gtcFormData[i]?.quesArray[j]?.file?.url;

    if (fileName === "" && url === "") {
      swal("Error", "Please upload a file.", "error");
      return;
    }

    this.postBody = {
      design_year: this.years["2023-24"],
      year: this.gtcFormData[i]?.quesArray[j]?.year,
      url,
      fileName,
      answer: true,
      isDraft: false,
      type: this.gtcFormData[i]?.quesArray[j]?.type,
      installment: this.gtcFormData[i]?.quesArray[j]?.installment,
      currentFormStatus: 4
    };

    this.commonServices.formPostMethod(this.postBody, 'grantDistribution/save').subscribe(
      (res: any) => {
        swal("Saved", "File saved successfully.", "success");
        console.log("GTA file response", res);
        this.gtcFormData[i].quesArray[j].isDisableQues = true;
        if (this.gtcFormData[i]?.quesArray[j + 1]?.isDisableQues) {
          this.gtcFormData[i].quesArray[j + 1].isDisableQues = false;
        }
        this.commonServices.setFormStatusState.next(true);
        this.getGtcData();
      },
      (error) => {
        swal("Error", `${error?.message}`, "error");
      }
    );
  }

  onPreview() {
    let formdata = this.gtcFormData;
    const dialogRef = this.dialog.open(GaPreviewComponent, {
      data: formdata,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }

  // for clear file
  clearFile(type, i, j) {
    const quesArray = this.gtcFormData[i]?.quesArray[j];

    quesArray["file"]["url"] = "";
    quesArray["file"]["name"] = "";
    quesArray["file"]["progress"] = null;
  }
  saveAction(i, j) {
    this.isActionSubmitted = true;
    const quesArray = this.gtcFormData[i]?.quesArray[j];
    if (!quesArray || ![6, 7].includes(quesArray?.status)) {
      swal('Error', 'Status is mandatory', 'error');
      return;
    }
    if (quesArray?.status == 7 && !quesArray?.rejectReason) {
      swal('Error', 'Reject reason is mandatory in case of rejection', 'error');
      return;
    }

    swal("Confirmation !", `Are you sure you want to submit this action?`, "warning", {
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
    }).then((value) => {
      switch (value) {
        case "submit":
          this.handleActionSubmission(i, j);
          break;
        case "cancel":
          break;
      }
    });
    //   console.log('everthing is corrects.............');

  }
  handleActionSubmission(i, j) {
      const quesArray = this.gtcFormData[i]?.quesArray[j];
      if (!quesArray) {
        swal('Error', 'Invalid data', 'error');
        return;
      }
      const {
        status,
        type,
        installment,
        rejectReason,
        responseFile,
      } = quesArray ?? {};

      const actionPostPayload = {
        statusId: status,
        design_year: this.years["2023-24"],
        state: this.stateId,
        key: type,
        installment,
        rejectReason,
        responseFile,
      };
      this.commonServices.formPostMethod(actionPostPayload, 'grantDistribution/installmentAction')
        .subscribe(
          (res) => {
            this.commonServices?.setFormStatusState.next(true);
            this.getGtcData();
            this.isActionSubmitted = false;
            swal('Saved', "Action submitted successfully", "success");
          },
          (error) => {
            this.isActionSubmitted = false;
            swal('Error', error?.message ?? 'Something went wrong', 'error');
          }
        );
  }

  // In development -- function for get data from child componets
  actionFormChanges(event, i, j) {
    console.log('e event event', this.gtcFormData);
  }

}
