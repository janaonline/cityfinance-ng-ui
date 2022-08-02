import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { State2223Service } from "../state-services/state2223.service";

@Component({
  selector: "app-grant-allocation",
  templateUrl: "./grant-allocation.component.html",
  styleUrls: ["./grant-allocation.component.scss"],
})
export class GrantAllocationComponent implements OnInit {
  years;
  stateId;
  userData;
  clickedSave;
  routerNavigate = null;
  response;
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  modalRef;
  @ViewChild("templateSave") template;
  constructor(
    private dataEntryService: DataEntryService,
    private stateService: State2223Service,
    private dialog: MatDialog,
    private _router: Router
  ) {
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateId = this.userData?.state;
    //  this.navigationCheck();
  }

  gtcFormData;

  ngOnInit(): void {
    this.intializeGtc();
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
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: false,
            disableMsg: "",
            key: "nonmillion_tied_2021-22_2",
            question:
              "(A) Upload Grant Allocation to ULBs - 1st Installment (2022-23)",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) Grant allocation has to be uploaded first before uploading 2nd Installment (2022-23) Grant allocation to ULBs`,
            question:
              "(B) Upload Grant Allocation to ULBs - 2nd Installment (2022-23)",
            key: "nonmillion_tied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
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
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: false,
            disableMsg: "",
            question:
              "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
            key: "nonmillion_untied_2021-22_2",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Grant Allocation to ULBs",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) Grant allocation has to be uploaded first before uploading 2nd Installment (2022-23) Grant allocation to ULBs`,
            question:
              "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
            key: "nonmillion_untied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
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
            year: this.years["2022-23"],
            type: "million_tied",
            instlText: "FY (2022-23)",
            isDisableQues: false,
            quesText: "Upload Grant Allocation for Water Supply and SWM",
            question:
              "3. Upload Grant Allocation for Million Plus Cities Grant for Water Supply and SWM ( 2022-23)",
            key: "million_tied_2021-22_1",
            qusType: "",
            file: {
              name: "",
              url: "",
              progress: null,
              error: null,
            },
            isDraft: null,
            status: null,
            rejectReason: null,
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "million_tied",
            instlText: "FY (2022-23)",
            isDisableQues: true,
            disableMsg: `Installment (2022-23) GTC has to be uploaded first before uploading Installment (2021-22) GTC`,
            quesText:
              "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
            question:
              "(B) Upload Signed Grant Transfer Certificate for  Water Supply and SWM ( 2022-23)",
            key: "million_tied_2022-23_1",
            qusType: "",
            file: {
              name: "",
              url: "",
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
  onPreview() {}
  saveFile(i, j) {}
}
