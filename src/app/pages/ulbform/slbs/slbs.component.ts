import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { waterWasteManagementForm } from '../../../users/data-upload/components/configs/water-waste-management';
import { IFinancialData } from '../../../users/data-upload/models/financial-data.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { JSONUtility } from 'src/app/util/jsonUtil';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-slbs',
  templateUrl: './slbs.component.html',
  styleUrls: ['./slbs.component.scss']
})
export class SlbsComponent implements OnInit {
  waterWasteManagementForm: FormGroup;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  previewData: any;

  jsonUtil = new JSONUtility();
  slbTitleText: string = "SLB's for Water Supply and Sanitation"
  preFilledWaterManagement:any = {}
  slbId: string = '';
  constructor(private _matDialog: MatDialog, private commonService: CommonService) { }
  protected readonly formBuilder = new FormBuilder();
  @ViewChild("previewPopup") previewPopup: TemplateRef<any>;
  waterPotability: any ={name: '', url: ''}
  async ngOnInit() {
    await this.getSlbData()
    this.createDataForms(this.preFilledWaterManagement)
    // if (this.preFilledWaterManagement) this.waterWasteManagementForm =this.createWasteWaterUploadForm(this.preFilledWaterManagement);
  }

  createDataForms(data?: IFinancialData) {
    this.waterWasteManagementForm = this.createWasteWaterUploadForm(data);
    console.log("patchValues", data, this.waterWasteManagementForm )
  }
  createWasteWaterUploadForm(data?: IFinancialData) {
    const newForm = this.formBuilder.group({
      ...waterWasteManagementForm.controls,
    });
    if (!data) return newForm;
    newForm.patchValue({ ...data.waterManagement });
    console.log("patch", { ...data.waterManagement }, newForm)

    return newForm;
  }

  getSlbData(){
    return new Promise((resolve, reject) => {
      this.commonService.fetchSlbData().subscribe(res => {

        this.preFilledWaterManagement = res['data'] && res['data'][0] ? res['data'][0] : {};
        let waterPotability = res['data'] && res['data'][0] && res['data'][0]['waterPotability']['documents']['waterPotabilityPlan']? res['data'][0]['waterPotability']['documents']['waterPotabilityPlan'][0] : {}

        this.waterPotability = waterPotability && waterPotability.hasOwnProperty('url') ? waterPotability : {name: '', url:''}
        console.log("derty", res, this.waterPotability, waterPotability)

        this.slbId = res['data'] && res['data'][0] ? res['data'][0]._id : ''
        resolve(res)
      })
    })
  }

  postSlbData(value){
    let data = {
      design_year: "606aaf854dff55e6c075d219",
      waterManagement:
        { ...value.waterManagement },
        water_index : value.water_index,
      waterPotability: {
        documents: {
          waterPotabilityPlan:[
              value.waterPotabilityPlan
            ]
          }
      },
      completeness: 'APPROVED', correctness: 'APPROVED',
      "isCompleted": true
    }
    if(this.slbId){
      this.commonService.postSlbData(data).subscribe(res => {
        console.log("response")
      })
      return true;
    }
     this.commonService.postSlbData(data).subscribe(res => {
       console.log("response")
     })
  }
  onWaterWasteManagementEmitValue(value){
    console.log("value", value)
    if(value.saveData)
    this.postSlbData(value)
  }

  onSendEmitValue(value){
    console.log("value", value)
    if(value.next)
    this.postSlbData(value)
  }


  showPreview() {
  console.log(this.waterPotability);
    this.previewData = {
      ...this.preFilledWaterManagement,
      ulb: this.loggedInUserDetails.ulb,
      ulbName: this.preFilledWaterManagement ? this.preFilledWaterManagement.ulbName : null,
      waterManagement:
         this.waterWasteManagementForm.getRawValue(),
         waterPotability: this.waterPotability
    };

    this._matDialog.open(this.previewPopup, {
      width: "85vw",
      maxHeight: "95vh",
      height: "fit-content",
      panelClass: "XVfc-preview",

      disableClose: false,
    });
  }
}
