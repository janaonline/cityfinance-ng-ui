import { Component, OnInit } from '@angular/core';
import * as fileSaver from "file-saver";
import { SweetAlert } from "sweetalert/typings/core";
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-grant-allocation-ulbs',
  templateUrl: './grant-allocation-ulbs.component.html',
  styleUrls: ['./grant-allocation-ulbs.component.scss']
})
export class GrantAllocationUlbsComponent implements OnInit {

  constructor(
    private commonServices: CommonServicesService,
  ) { 
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));

    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
  }
  stateId:string = '';
  userData: object | any;
  years : [] | any;
  nextRouter: string = '';
  backRouter: string = '';
  sideMenuItem : any;
  gtcFormData : object[];
  isApiInProgress: boolean = false;
  ngOnInit(): void {
    this.setRouter();
    this.intializeGtc();
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
  intializeGtc() {
    this.gtcFormData = [
      {
        label:
          "1. View/Upload Grant Allocation for Non-Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 1,
            year: this.years["2023-24"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2023-24)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: false,
            disableMsg: "",
            key: "nonmillion_tied_2023-24_1",
            question:
              "(A) Upload Grant Allocation to ULBs - 1st Installment (2023-24)",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
          {
            installment: 2,
            year: this.years["2023-24"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2023-24)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: true,
            disableMsg: `1st Installment (2023-24) Grant allocation has to be uploaded first before uploading 2nd Installment (2023-24) Grant allocation to ULBs`,
            question:
              "(B) Upload Grant Allocation to ULBs - 2nd Installment (2023-24)",
            key: "nonmillion_tied_2023-24_2",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
        ],
      },
      {
        label:
          "2. View/Upload Grant Allocation for Non-Million Plus Cities Untied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 1,
            year: this.years["2023-24"],
            type: "nonmillion_untied",
            instlText: "1st Installment (2023-24)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: false,
            disableMsg: "",
            question:
              "(A) Upload Grant Allocation to ULBs - 1st Installment (2023-24)",
            key: "nonmillion_untied_2023-24_1",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
          {
            installment: 2,
            year: this.years["2023-24"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2023-24)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: true,
            disableMsg: `1st Installment (2023-24) Grant allocation has to be uploaded first before uploading 2nd Installment (2023-24) Grant allocation to ULBs`,
            question:
              "(B) Upload Grant Allocation to ULBs - 2nd Installment (2023-24)",
            key: "nonmillion_untied_2023-24_2",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
        ],
      },
      {
        label:
          "3. View/Upload Grant Allocation for Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 1,
            year: this.years["2023-24"],
            type: "million_tied",
            instlText: "FY (2023-24)",
            isDisableQues: false,
            quesText: "Upload Grant Allocation for Water Supply and SWM",
            question:
              "(A) Upload Grant Allocation for  Water Supply and SWM - FY ( 2023-24)",
            key: "million_tied_2023-24_1",
            qusType: "",
            fileName: "",
            url: "",
            file: {
              // name: "",
              // url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
        ],
      },
    ];
  }

  downloadSample(data) {
   let queryParams = {
    type: data?.type,
    year: data?.year,
    installment :data?.installment
   }
    this.commonServices.formGetMethodAsBlob('grantDistribution/template', queryParams).subscribe(
      (response: any) => {
        let blob: any = new Blob([response], {
          type: "text/json; charset=utf-8",
        });
        fileSaver.saveAs(blob, "grant-allocation-template.xlsx");
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

}
