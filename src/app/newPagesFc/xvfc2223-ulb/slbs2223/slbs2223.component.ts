import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from "@angular/core";
import { waterWasteManagementForm } from "src/app/users/data-upload/components/configs/water-waste-management";
import { IFinancialData } from "../../../users/data-upload/models/financial-data.interface";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";
import { JSONUtility } from "src/app/util/jsonUtil";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CommonService } from "src/app/shared/services/common.service";
import { UlbformService } from "../../../pages/ulbform/ulbform.service";
import { Router, NavigationStart, Event } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SweetAlert } from "sweetalert/typings/core";
@Component({
  selector: 'app-slbs2223',
  templateUrl: './slbs2223.component.html',
  styleUrls: ['./slbs2223.component.scss']
})
export class Slbs2223Component implements OnInit {
  nextRouter;
  backRouter;
  sideMenuItem:any;
  waterWasteManagementForm: FormGroup;
  constructor(
    private _matDialog: MatDialog,
    private commonService: CommonService,
    private _router: Router,
    private modalService: BsModalService,
    public _ulbformService: UlbformService
  ) { 
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
  }
  protected readonly formBuilder = new FormBuilder();
  ngOnInit(): void {
    this.isMillionPlusOrNot()
    this.setPreviousAndNextUrl();
     this.getSlbData();
     this.createDataForms(this.preFilledWaterManagement)
  }

  setPreviousAndNextUrl(){
    for (const key in this.sideMenuItem) {
      console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach(element => {
        console.log('name name', element);
        if(element?.name == 'SLBs for Water Supply and Sanitation'){
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
  }
  }
  preFilledWaterManagement
  clickAnswer
  slbId
  statePostData
  finalSubmitStatus
  ulbFormStaus
  ulbFormRejectR
  actionResSlb
  getSlbData() {
    let ulbId = sessionStorage.getItem("ulb_id");

    return new Promise((resolve, reject) => {
      let designYear = "606aafb14dff55e6c075d3ae";
      let params = "design_year=" + designYear;
      this.commonService.fetchSlbData(params, ulbId).subscribe((res) => {

        this.preFilledWaterManagement =
          res["data"] && res["data"][0] ? res["data"][0] : {};
        this.preFilledWaterManagement.history = null;
        if (res['data'].length > 0) {
          if (res['data'][0]['blank']) {
            this.clickAnswer = false
          } else {
            this.clickAnswer = true
          }
        }
        

       

        this.slbId = res["data"] && res["data"][0] ? res["data"][0]._id : "";
        console.log("slbsResppppppppp", res);
        console.log("slbResponse", res["data"]);
        this.statePostData = res;
        let actRes = {
          st:
            this.statePostData.data[0]?.waterManagement["status"] != ""
              ? this.statePostData.data[0]?.waterManagement["status"]
              : "PENDING",
          rRes: this.statePostData.data[0]?.waterManagement["rejectReason"],
          actionTakenByRole: res["data"][0]?.actionTakenByRole,
          finalSubmitStatus: this.finalSubmitStatus,
        };
        if (this.statePostData.data[0]?.waterManagement["status"] != "NA") {
          this.ulbFormStaus =
            this.statePostData.data[0]?.waterManagement["status"] != ""
              ? this.statePostData.data[0]?.waterManagement["status"]
              : "PENDING";
          console.log("slb Status", this.ulbFormStaus);
        }

        this.ulbFormRejectR =
          this.statePostData.data[0]?.waterManagement["rejectReason"];
        this.actionResSlb = actRes;
        console.log("asdfghj", actRes, this.actionResSlb);
        sessionStorage.setItem("slbData", JSON.stringify(res));
        console.log("slbsResppppppppp", res);

        resolve(res);
      });
    });

  }
  createDataForms(data?: IFinancialData) {
    // this.waterWasteManagementForm = this.createWasteWaterUploadForm(data);
  }
  createWasteWaterUploadForm(data?: IFinancialData) {
    const newForm = this.formBuilder.group({
      ...waterWasteManagementForm.controls,
    });
  }
  ulbId
  isMillionPlus
  isUA
  isMillionPlusOrNot() {
    this.ulbId = sessionStorage.getItem("ulb_id");
    console.log("pk12", this.ulbId);
    if (this.ulbId == null) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.isMillionPlus = userData.isMillionPlus;
      this.isUA = userData.isUA;
      console.log("ifbl", this.isMillionPlus, this.isUA);
    } else {
      this.isMillionPlus = sessionStorage.getItem("isMillionPlus");
      this.isUA = sessionStorage.getItem("isUA");
      console.log("pk_elseblock", this.isMillionPlus, this.isUA);
    }
  }
}
