import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { waterWasteManagementForm } from '../../../users/data-upload/components/configs/water-waste-management';
import { IFinancialData } from '../../../users/data-upload/models/financial-data.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { JSONUtility } from 'src/app/util/jsonUtil';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/common.service';
import { UlbformService } from '../ulbform.service';
import { Router, NavigationStart, Event } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-slbs',
  templateUrl: './slbs.component.html',
  styleUrls: ['./slbs.component.scss']
})
export class SlbsComponent implements OnInit {
  dialogRef;
  waterWasteManagementForm: FormGroup;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  previewData: any;

  jsonUtil = new JSONUtility();
  slbTitleText: string = "SLB's for Water Supply and Sanitation"
  preFilledWaterManagement: any = {}
  slbId: string = '';
  constructor(
    private _matDialog: MatDialog,
    private commonService: CommonService,
    private _router: Router,
    private modalService: BsModalService,
    public _ulbformService: UlbformService) {

    this._router.events.subscribe(async (event: Event) => {
      if (!this.value?.saveData) {
        if (event instanceof NavigationStart) {
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInSLB", "false");
            return;
          }
          const change = sessionStorage.getItem("changeInSLB")
          if (change === "true" && this.routerNavigate === null) {
            this.routerNavigate = event

            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, { skipLocationChange: true });
            console.log("inside router")
            this.openModal(this.template);
          }
        }
      }
    });
  }
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  routerNavigate = null
  protected readonly formBuilder = new FormBuilder();
  @ViewChild("previewPopup") previewPopup: TemplateRef<any>;
  waterPotability: any = { name: '', url: '' }
  async ngOnInit() {
    this.clickedSave = false
    sessionStorage.setItem("changeInSLB", "false");
    await this.getSlbData()


    this.createDataForms(this.preFilledWaterManagement)
    // if (this.preFilledWaterManagement) this.waterWasteManagementForm =this.createWasteWaterUploadForm(this.preFilledWaterManagement);
  }
  Years = JSON.parse(localStorage.getItem("Years"));
  createDataForms(data?: IFinancialData) {
    this.waterWasteManagementForm = this.createWasteWaterUploadForm(data);

  }
  createWasteWaterUploadForm(data?: IFinancialData) {
    const newForm = this.formBuilder.group({
      ...waterWasteManagementForm.controls,
    });
    if (!data) return newForm;
    newForm.patchValue({ ...data.waterManagement });

    let ulbId = sessionStorage.getItem('ulb_id');
    if (ulbId != null) {
      newForm.disable();
    }
    return newForm;
  }

  getSlbData() {
    let ulbId = sessionStorage.getItem('ulb_id');

    return new Promise((resolve, reject) => {
      let designYear = '606aaf854dff55e6c075d219';
      let params = 'design_year=' + designYear;
      this.commonService.fetchSlbData(params, ulbId).subscribe(res => {

        this.preFilledWaterManagement = res['data'] && res['data'][0] ? res['data'][0] : {};
        this.preFilledWaterManagement.history = null;

        let waterPotability = res['data'] && res['data'][0] && res['data'][0]['waterPotability']['documents']['waterPotabilityPlan'] ? res['data'][0]['waterPotability']['documents']['waterPotabilityPlan'][0] : {}

        this.waterPotability = waterPotability && waterPotability.hasOwnProperty('url') ? waterPotability : { name: '', url: '' }


        this.slbId = res['data'] && res['data'][0] ? res['data'][0]._id : ''

        sessionStorage.setItem("slbData", JSON.stringify(res))
        resolve(res)
      })

    })

  }

  value
  postSlbData(value) {
    this.value = value
    let data = {
      design_year: this.Years["2021-22"],
      isCompleted: value.isCompleted,
      waterManagement:
        { ...value.waterManagement },
      water_index: value.water_index,
      waterPotability: {
        documents: {
          waterPotabilityPlan: [
            value.waterPotabilityPlan
          ]
        }
      },
      // completeness: 'APPROVED', correctness: 'APPROVED',
    }
    if (this.slbId) {

      this.commonService.postSlbData(data).subscribe(res => {

        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.slbForWaterSupplyAndSanitation.isSubmit = res["isCompleted"];
        this._ulbformService.allStatus.next(status);

        swal("Record submitted successfully!");

      })
      return true;
    }
    this.commonService.postSlbData(data).subscribe(res => {

      const status = JSON.parse(sessionStorage.getItem("allStatus"));
      status.slbForWaterSupplyAndSanitation.isSubmit = res["isCompleted"];
      this._ulbformService.allStatus.next(status);

      swal("(NO SLB ID)Record submitted successfully!");
    })

  }
  data = '';
  res
  clickedSave = false;
  onWaterWasteManagementEmitValue(value) {
    console.log("value which came from fc-slb component", value)

    let changeHappen = sessionStorage.getItem("changeInSLB")
    if (changeHappen == 'false' && value.saveData) {
      return this._router.navigate(["ulbform/water-sanitation"]);
    }
    sessionStorage.setItem("changeInSLB", "true");
    let completed = this.checkIfCompletedOrNot(value)
    let isCompleted

    if (value.isFormInvalid || !completed) {
      isCompleted = false
    } else {
      isCompleted = true
    }

    console.log('isCompleted', isCompleted)
    value['isCompleted'] = isCompleted
    this.data = value
    if (this.routerNavigate && value.saveData) {
      this.postSlbData(value)
      sessionStorage.setItem("changeInSLB", "false")
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    if (!isCompleted && value.saveData) {
      this.clickedSave = true;
      this.openModal(this.template1)
      return;
    }
    if (value.saveData) {
      this.postSlbData(value)
      sessionStorage.setItem("changeInSLB", "false")
      return this._router.navigate(["ulbform/water-sanitation"]);
    }
  }

  checkIfCompletedOrNot(value) {
    //checking targets values
    for (let key in value['waterManagement']) {
      let counter = 0;
      for (let key2 in value['waterManagement'][key]['target']) {
        if (value['waterManagement'][key]['target'][key2])
          counter++;

      }
      console.log(counter)
      if (counter != 4) {
        return false;
      }
    }

    //checking baseline values
    for (let key in value['waterManagement']) {
      if (value['waterManagement'][key]['baseline']['2021'] == undefined)
        return false;
    }

    //checking water potability plan values
    if (value['water_index'] == true && (value['waterPotabilityPlan']['url'] == "" || null))
      return false;

    return true;
  }
  onSendEmitValue(value) {

    if (value.next)
      this.postSlbData(value)
  }


  showPreview() {
    let waterValue = {
      plan: this.data['waterPotabilityPlan'],
      index: this.data['water_index']
    }


    this.previewData = {
      ...this.preFilledWaterManagement,
      ulb: this.loggedInUserDetails.ulb,
      ulbName: this.preFilledWaterManagement ? this.preFilledWaterManagement.ulbName : null,
      waterManagement:
        this.waterWasteManagementForm.getRawValue(),
      waterPotability: this.waterPotability,
      preWater: waterValue,
      isCompleted: this.data['isCompleted']
    };
    console.log(this.previewData)
    this._matDialog.open(this.previewPopup, {
      width: "85vw",
      maxHeight: "95vh",
      height: "fit-content",
      panelClass: "XVfc-preview",

      disableClose: false,
    });
  }

  openModal(template: TemplateRef<any>, formPreview = false) {
    if (formPreview == true) {
      this.showPreview();
      return
    }
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }


  async proceed() {
    await this._matDialog.closeAll();
    // await this.dialogRef.close(true);
    let changeHappen = sessionStorage.getItem("changeInSLB")
    if (this.clickedSave) {
      this.postSlbData(this.data)
      sessionStorage.setItem("changeInSLB", "false")
      return this._router.navigate(["ulbform/water-sanitation"]);
    } else if (this.routerNavigate && changeHappen === 'true') {
      console.log('this data is going in POST API', this.data)
      this.data['saveData'] = true;
      this.onWaterWasteManagementEmitValue(this.data);
      this._router.navigate([this.routerNavigate.url]);
      return
    } else if (this.routerNavigate == null && changeHappen === 'false') {
      return this._router.navigate(["ulbform/water-sanitation"]);
    }
    // this.onWaterWasteManagementEmitValue(this.data);
  }
  alertClose() {
    this.stay();
  }



  async stay() {
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null
    }
  }


}
