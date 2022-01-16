import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GrantClaimsDialogComponent } from './grant-claims-dialog/grant-claims-dialog.component';
import { GrantClaimsService } from './grant-claims.service'
import { GTCertificateService } from '../gtcertificate/gtcertificate.service'
import {StateDashboardService} from '../state-dashboard/state-dashboard.service'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-grant-claims',
  templateUrl: './grant-claims.component.html',
  styleUrls: ['./grant-claims.component.scss']
})
export class GrantClaimsComponent implements OnInit {

  financial_year = '606aaf854dff55e6c075d219';
  curr_finance_year = true;
  other_finance_year = false;
  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  stateId;
  currentStatusText=[
    'Claim yet to be Submitted. ',
    'Claim for grant Submitted. ',
    'Claim Recommended to Ministry of Finance. ',
    'Claim Returned by MoHUA. ',
    'Claim released to State by Ministry of Finance. '
  ]

  btnLabelText=[
    'Claim Grant - '
  ]

  tooltips =[
    'Condition(s) Not Met',
  ]

  annualAccountsActual = 0;

  claimsData;
  claimsInformation;
  display;
  eligibility;
  mpcPdfUrl = '';
  mpcFileName = '';
  nmpcTiedPdfUrl_2 = '';
  nmpcTiedPdfUrl_1 = '';
  nmpcTiedFileName = '';
  nmpcUntiedPdfUrl_2 = '';
  nmpcUntiedPdfUrl_1 = ''
  nmpcUntiedFileName = '';
  status_nmpc_tied = 'Claim yet to be submitted.';
  status_nmpc_untied = 'Claim yet to be submitted.';
  noDataFoundUrl ='https://democityfinanceapi.dhwaniris.in/objects/92f725fb-8b27-421a-8f16-ac71921efccb.pdf';
  constructor(

    private dialog: MatDialog,
    public grantClaimsService: GrantClaimsService,
    public gTCertificateService: GTCertificateService,
    public stateDashboardService:StateDashboardService,
    private datePipe : DatePipe,
    private router: Router
  ) {
    // this.financial_year = JSON.parse(localStorage.getItem('Years'));
    this.stateId = sessionStorage.getItem("state_id");
    if (!this.stateId) {
      this.stateId = JSON.parse(localStorage.getItem("userData")).state;
    }
  }
  //to store objects from eligibiltiy api
  nmpc_untied_1st_Data ={}
  nmpc_untied_2nd_Data = {}
  nmpc_tied_1st_Data = {}
  nmpc_tied_2nd_Data = {}
  mpc_Data = {}

//to store objects from grant claims get api
  nmpc_untied_1st_claimsData ={}
  nmpc_untied_2nd_claimsData = {}
  nmpc_tied_1st_claimsData = {}
  nmpc_tied_2nd_claimsData = {}
  mpc_claimsData = {}

// to store the amounts claimed by states
  nmpc_untied_1st_grantAmount = ""
  nmpc_untied_2nd_grantAmount =  ""
  nmpc_tied_1st_grantAmount =  ""
  nmpc_tied_2nd_grantAmount =  ""
  mpc_grantAmount =  ""

  //to store who is eligible and who is not
  nmpc_untied_1st_eligible = false
nmpc_untied_2nd_eligible = false
nmpc_tied_1st_eligible = false
nmpc_tied_2nd_eligible = false
mpc_eligible = false

//to store whether the claimed amount have been approved by MoHUA or not
nmpc_untied_1st_claimGranted = false
nmpc_untied_2nd_claimGranted = false
nmpc_tied_1st_claimGranted = false
nmpc_tied_2nd_claimGranted = false
mpc_claimGranted = false

//to store the status of conditions acheived
annualAccounts = ""
utilReport_nmpc = ""
utilReport_mpc = ""
slb_mpc = ""
actionPlan = false;
waterRej = false;
gtc_nmpc_untied_1st = false
gtc_nmpc_untied_2nd = false
gtc_nmpc_tied_1st = false
gtc_nmpc_tied_2nd = false
gtc_mpc = false

//to store conditions
conditions_nmpc_untied_1st = []
conditions_nmpc_untied_2nd = []
conditions_nmpc_tied_1st = []
conditions_nmpc_tied_2nd = []
conditions_mpc = [];

//final conditions
finalConditions_nmpc_untied_1st = []
finalConditions_nmpc_untied_2nd = []
finalConditions_nmpc_tied_1st = []
finalConditions_nmpc_tied_2nd = []
finalConditions_mpc = [];

//currentStatus
currStatus_nmpc_untied_1st = ""
currStatus_nmpc_untied_2nd = ""
currStatus_nmpc_tied_1st = ""
currStatus_nmpc_tied_2nd = ""
currStatus_mpc = "";

//button lables
btnLabel_nmpc_untied_1st = ""
btnLabel_nmpc_untied_2nd = ""
btnLabel_nmpc_tied_1st = ""
btnLabel_nmpc_tied_2nd = ""
btnLabel_mpc = "";

//disable
disable_nmpc_untied_1st = true
disable_nmpc_untied_2nd = true
disable_nmpc_tied_1st = true
disable_nmpc_tied_2nd = true
disable_mpc = true;

///tooltip
tooltip_nmpc_untied_1st = ""
tooltip_nmpc_untied_2nd = ""
tooltip_nmpc_tied_1st = ""
tooltip_nmpc_tied_2nd = ""
tooltip_mpc = "";

//boolean for showing conditions
viewCond_nmpc_untied_1st = false
viewCond_nmpc_untied_2nd = false
viewCond_nmpc_tied_1st = false
viewCond_nmpc_tied_2nd = false
viewCond_mpc = false;
//boolean for showing button
viewBtn_nmpc_untied_1st = false
viewBtn_nmpc_untied_2nd = false
viewBtn_nmpc_tied_1st = false
viewBtn_nmpc_tied_2nd = false
viewBtn_mpc = false;

//gtcUrl
gtcUrl_nmpc_untied_1st = null
gtcUrl_nmpc_untied_2nd = null
gtcUrl_nmpc_tied_1st = null
gtcUrl_nmpc_tied_2nd = null
gtcUrl_mpc = null;

  async ngOnInit() {
    
    await  this.findDisplay();
  this.fetchData('606aaf854dff55e6c075d219');
    this.stateDashboardService.getEligibilityNMPC(this.stateId).subscribe((res)=>{
   //eligibiltiy objects
      this.nmpc_untied_1st_Data = res['nmpc_untied']['firstInstallment']
      this.nmpc_untied_2nd_Data = res['nmpc_untied']['secondInstallment']
      this.nmpc_tied_1st_Data = res['nmpc_tied']['firstInstallment']
      this.nmpc_tied_2nd_Data = res['nmpc_tied']['secondInstallment']
      this.mpc_Data = res['mpc']
      //eligibility variables
      this.nmpc_untied_1st_eligible = this.nmpc_untied_1st_Data['eligible']
      this.nmpc_untied_2nd_eligible = this.nmpc_untied_2nd_Data['eligible']
      this.nmpc_tied_1st_eligible = this.nmpc_tied_1st_Data['eligible']
      this.nmpc_tied_2nd_eligible = this.nmpc_tied_2nd_Data['eligible']
      this.mpc_eligible = this.mpc_Data['eligible']



      this.grantClaimsService.getData('606aaf854dff55e6c075d219', this.stateId).subscribe((response)=>{

//claimsData
        this.nmpc_untied_1st_claimsData = response['nmpc_untied']['firstInstallment']
  this.nmpc_untied_2nd_claimsData = response['nmpc_untied']['secondInstallment']
  this.nmpc_tied_1st_claimsData = response['nmpc_tied']['firstInstallment']
  this.nmpc_tied_2nd_claimsData = response['nmpc_tied']['secondInstallment']
  this.mpc_claimsData = response['mpc']

  //nmpc untied
this.annualAccounts = this.nmpc_untied_2nd_Data['percentage_annual'];
this.gtc_nmpc_untied_2nd = this.nmpc_untied_2nd_Data['gtcSubmitted']
this.gtc_nmpc_untied_1st = this.nmpc_untied_1st_Data['gtcSubmitted']

//nmpc tied
this.utilReport_nmpc = this.nmpc_tied_2nd_Data['percentage_util'];
this.gtc_nmpc_tied_2nd = this.nmpc_tied_2nd_Data['gtcSubmitted']
this.gtc_nmpc_tied_1st = this.nmpc_tied_1st_Data['gtcSubmitted']

//mpc
this.utilReport_mpc = this.mpc_Data['percentage_util'];
this.slb_mpc = this.mpc_Data['percentage_slb'];
this.gtc_mpc = this.mpc_Data['gtcSubmitted'];
this.waterRej = this.mpc_Data['waterRej'];
this.actionPlan = this.mpc_Data['actionPlan']
//claimAmount
this.nmpc_untied_1st_grantAmount = this.nmpc_untied_1st_claimsData['claimAmount']
this.nmpc_untied_2nd_grantAmount =  this.nmpc_untied_2nd_claimsData['claimAmount']
this.nmpc_tied_1st_grantAmount =  this.nmpc_tied_1st_claimsData['claimAmount']
this.nmpc_tied_2nd_grantAmount =  this.nmpc_tied_2nd_claimsData['claimAmount']
this.mpc_grantAmount =  this.mpc_claimsData['claimAmount']

//conditions
this.conditions_nmpc_untied_1st = this.nmpc_untied_1st_claimsData['conditions']
this.conditions_nmpc_untied_2nd = this.nmpc_untied_2nd_claimsData['conditions']
this.conditions_nmpc_tied_1st = this.nmpc_tied_1st_claimsData['conditions']
this.conditions_nmpc_tied_2nd = this.nmpc_tied_2nd_claimsData['conditions']
this.conditions_mpc = this.mpc_claimsData['conditions']


this.attachStatusToConditions();
this.computeCurrentStatus();
this.computeButtonLabels();
this.computeDisableandToolTips();
this.computeViewConditions()

      })
    })


  }

  

  findDisplay(){
return new Promise<void>((resolve, reject) => {
  this.gTCertificateService.getCondition(this.stateId).subscribe((res) => {
    this.display = res['data']
    console.log('display',this.display)
  })
  resolve(this.display)
})
  }

 
  computeViewConditions(){
    // viewCond_nmpc_untied_1st = ""
    // viewCond_nmpc_untied_2nd = ""
    // viewCond_nmpc_tied_1st = ""
    // viewCond_nmpc_tied_2nd = ""
    // viewCond_mpc = "";

if(this.nmpc_untied_1st_claimsData['claimData'] && Object.keys(this.nmpc_untied_1st_claimsData['claimData']).length != 0){
 this.viewCond_nmpc_untied_1st = this.nmpc_untied_1st_claimsData['claimData']['applicationStatus'] == 'REJECTED';
 this.viewBtn_nmpc_untied_1st = this.nmpc_untied_1st_claimsData['claimData']['applicationStatus'] == 'REJECTED';
}else {
  this.viewCond_nmpc_untied_1st = true;
  this.viewBtn_nmpc_untied_1st = true;
}
if(this.nmpc_untied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_untied_2nd_claimsData['claimData']).length != 0){
  this.viewCond_nmpc_untied_2nd = this.nmpc_untied_2nd_claimsData['claimData']['applicationStatus'] == 'REJECTED'
  this.viewBtn_nmpc_untied_2nd = this.nmpc_untied_2nd_claimsData['claimData']['applicationStatus'] == 'REJECTED'
 }else{
   this.viewCond_nmpc_untied_2nd = true
   this.viewBtn_nmpc_untied_2nd = true
 }
 if(this.nmpc_tied_1st_claimsData['claimData'] && Object.keys(this.nmpc_tied_1st_claimsData['claimData']).length != 0){
  this.viewCond_nmpc_tied_1st = this.nmpc_tied_1st_claimsData['claimData']['applicationStatus'] == 'REJECTED'
  this.viewBtn_nmpc_tied_1st = this.nmpc_tied_1st_claimsData['claimData']['applicationStatus'] == 'REJECTED'
 }else{
   this.viewCond_nmpc_tied_1st = true;
   this.viewBtn_nmpc_tied_1st = true;

 }
 if(this.nmpc_tied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_tied_2nd_claimsData['claimData']).length != 0){
  this.viewCond_nmpc_tied_2nd = this.nmpc_tied_2nd_claimsData['claimData']['applicationStatus'] == 'REJECTED'
  this.viewBtn_nmpc_tied_2nd = this.nmpc_tied_2nd_claimsData['claimData']['applicationStatus'] == 'REJECTED'
 }else{
   this.viewCond_nmpc_tied_2nd = true
   this.viewBtn_nmpc_tied_2nd = true
 }
 if(this.mpc_claimsData['claimData'] && Object.keys(this.mpc_claimsData['claimData']).length != 0){
  this.viewCond_mpc = this.mpc_claimsData['claimData']['applicationStatus'] == 'REJECTED'
  this.viewBtn_mpc = this.mpc_claimsData['claimData']['applicationStatus'] == 'REJECTED'
 }else{
   this.viewCond_mpc = true
   this.viewBtn_mpc = true
 }
  }

  computeDisableandToolTips(){
    //nmpc untied 1st
    if(!this.nmpc_untied_1st_eligible){
      this.disable_nmpc_untied_1st = true;
      this.tooltip_nmpc_untied_1st = this.tooltips[0]
    }
    if(!this.nmpc_untied_2nd_eligible){
      this.disable_nmpc_untied_2nd = true;
      this.tooltip_nmpc_untied_2nd = this.tooltips[0]
    }
    if(!this.nmpc_tied_1st_eligible){
      this.disable_nmpc_tied_1st = true;
      this.tooltip_nmpc_tied_1st = this.tooltips[0]
    }
    if(!this.nmpc_tied_2nd_eligible){
      this.disable_nmpc_tied_2nd = true;
      this.tooltip_nmpc_tied_2nd = this.tooltips[0]
    }
    if(!this.mpc_eligible){
      this.disable_mpc = true;
      this.tooltip_mpc= this.tooltips[0]
    }
  }

  computeButtonLabels(){
    //npc 1st installment
    this.btnLabel_nmpc_untied_1st = this.btnLabelText[0] + `Rs. ${this.nmpc_untied_1st_grantAmount} Cr.`
    this.btnLabel_nmpc_untied_2nd = this.btnLabelText[0] + `Rs. ${this.nmpc_untied_2nd_grantAmount} Cr.`
    this.btnLabel_nmpc_tied_1st = this.btnLabelText[0] + `Rs. ${this.nmpc_tied_1st_grantAmount} Cr.`
    this.btnLabel_nmpc_tied_2nd = this.btnLabelText[0] + `Rs. ${this.nmpc_tied_2nd_grantAmount} Cr.`
    this.btnLabel_mpc = this.btnLabelText[0] + `Rs. ${this.mpc_grantAmount} Cr.`

  }
  dateNot = ' - Date Not Available'
  computeCurrentStatus(){
    //nmpc-untied 1st installment
   

    if(this.nmpc_untied_1st_claimsData['claimData'] && Object.keys(this.nmpc_untied_1st_claimsData['claimData']).length != 0){
      let dates_nmpc_untied_1st = this.nmpc_untied_1st_claimsData['claimData']['dates']
      if(this.nmpc_untied_1st_claimsData['claimData']['releaseStatus']){
        this.currStatus_nmpc_untied_1st = this.currentStatusText[4].concat(dates_nmpc_untied_1st.hasOwnProperty('releasedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_untied_1st_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}` : "")
      }else{
        if(this.nmpc_untied_1st_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_untied_1st_claimsData['claimData']['actionTakenBy'] == "STATE" && 
this.nmpc_untied_1st_claimsData['claimData']['applicationStatus'] == "PENDING"  ){
  this.currStatus_nmpc_untied_1st = this.currentStatusText[1].concat(` Date - ${this.datePipe.transform(this.nmpc_untied_1st_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}`);


}else if(this.nmpc_untied_1st_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_untied_1st_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.nmpc_untied_1st_claimsData['claimData']['applicationStatus'] == "APPROVED"  ){
  this.currStatus_nmpc_untied_1st = this.currentStatusText[2].concat(dates_nmpc_untied_1st.hasOwnProperty('approvedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_untied_1st_claimsData['claimData']['dates']['approvedOn'],'MMM d, y')}` : "");


}else if(this.nmpc_untied_1st_claimsData['claimData']['submitStatus'] == true &&
 this.nmpc_untied_1st_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
 this.nmpc_untied_1st_claimsData['claimData']['applicationStatus'] == "REJECTED"  ){
  this.currStatus_nmpc_untied_1st = this.currentStatusText[3].concat(dates_nmpc_untied_1st.hasOwnProperty('returnedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_untied_1st_claimsData['claimData']['dates']['returnedOn'],'MMM d, y')}`: "");

}

      }

    }else{      
        this.currStatus_nmpc_untied_1st = this.currentStatusText[0];
    }
//nmpc untied 2nd installment
if(this.nmpc_untied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_untied_2nd_claimsData['claimData']).length != 0){
  let dates_nmpc_untied_2nd = this.nmpc_untied_2nd_claimsData['claimData']['dates']
  if(this.nmpc_untied_2nd_claimsData['claimData']['releaseStatus']){
    this.currStatus_nmpc_untied_2nd = this.currentStatusText[4].concat(dates_nmpc_untied_2nd.hasOwnProperty('releasedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_untied_2nd_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}` : "")
  }else{
    if(this.nmpc_untied_2nd_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_untied_2nd_claimsData['claimData']['actionTakenBy'] == "STATE" && 
this.nmpc_untied_2nd_claimsData['claimData']['applicationStatus'] == "PENDING"  ){
this.currStatus_nmpc_untied_2nd = this.currentStatusText[1].concat(` Date - ${this.datePipe.transform(this.nmpc_untied_2nd_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}`);


}else if(this.nmpc_untied_2nd_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_untied_2nd_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.nmpc_untied_2nd_claimsData['claimData']['applicationStatus'] == "APPROVED"  ){
this.currStatus_nmpc_untied_2nd = this.currentStatusText[2].concat(dates_nmpc_untied_2nd.hasOwnProperty('approvedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_untied_2nd_claimsData['claimData']['dates']['approvedOn'],'MMM d, y')}` : "");


}else if(this.nmpc_untied_2nd_claimsData['claimData']['submitStatus'] == true &&
this.nmpc_untied_2nd_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.nmpc_untied_2nd_claimsData['claimData']['applicationStatus'] == "REJECTED"  ){
this.currStatus_nmpc_untied_2nd = this.currentStatusText[3].concat(dates_nmpc_untied_2nd.hasOwnProperty('returnedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_untied_2nd_claimsData['claimData']['dates']['returnedOn'],'MMM d, y')}`: "");

}

  }

}else{      
    this.currStatus_nmpc_untied_2nd = this.currentStatusText[0];
}


//nmpc-tied 1st installment
if(this.nmpc_tied_1st_claimsData && Object.keys(this.nmpc_tied_1st_claimsData['claimData']).length != 0){
  let dates_nmpc_tied_1st = this.nmpc_tied_1st_claimsData['claimData']['dates']
  if(this.nmpc_tied_1st_claimsData['claimData']['releaseStatus']){
    this.currStatus_nmpc_tied_1st = this.currentStatusText[4].concat(dates_nmpc_tied_1st.hasOwnProperty('releasedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_tied_1st_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}` : "")  
  }else{
    if(this.nmpc_tied_1st_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_tied_1st_claimsData['claimData']['actionTakenBy'] == "STATE" && 
this.nmpc_tied_1st_claimsData['claimData']['applicationStatus'] == "PENDING"  ){
this.currStatus_nmpc_tied_1st = this.currentStatusText[1].concat(` Date - ${this.datePipe.transform(this.nmpc_tied_1st_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}`);


}else if(this.nmpc_tied_1st_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_tied_1st_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.nmpc_tied_1st_claimsData['claimData']['applicationStatus'] == "APPROVED"  ){
this.currStatus_nmpc_tied_1st = this.currentStatusText[2].concat(dates_nmpc_tied_1st.hasOwnProperty('approvedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_tied_1st_claimsData['claimData']['dates']['approvedOn'],'MMM d, y')}` : "");


}else if(this.nmpc_tied_1st_claimsData['claimData']['submitStatus'] == true &&
this.nmpc_tied_1st_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.nmpc_tied_1st_claimsData['claimData']['applicationStatus'] == "REJECTED"  ){
this.currStatus_nmpc_tied_1st = this.currentStatusText[3].concat(dates_nmpc_tied_1st.hasOwnProperty('returnedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_tied_1st_claimsData['claimData']['dates']['returnedOn'],'MMM d, y')}`: "");

}

  }

}else{      
    this.currStatus_nmpc_tied_1st = this.currentStatusText[0]
  }
//2nd installment
if(this.nmpc_tied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_tied_2nd_claimsData['claimData']).length != 0){
  let dates_nmpc_tied_2nd = this.nmpc_tied_2nd_claimsData['claimData']['dates']
  if(this.nmpc_tied_2nd_claimsData['claimData']['releaseStatus']){
    this.currStatus_nmpc_tied_2nd = this.currentStatusText[4].concat(dates_nmpc_tied_2nd.hasOwnProperty('releasedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_tied_2nd_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}` : "")
  }else{
    if(this.nmpc_tied_2nd_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_tied_2nd_claimsData['claimData']['actionTakenBy'] == "STATE" && 
this.nmpc_tied_2nd_claimsData['claimData']['applicationStatus'] == "PENDING"  ){
this.currStatus_nmpc_tied_2nd = this.currentStatusText[1].concat(` Date - ${this.datePipe.transform(this.nmpc_tied_2nd_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}`);


}else if(this.nmpc_tied_2nd_claimsData['claimData']['submitStatus'] == true && 
this.nmpc_tied_2nd_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.nmpc_tied_2nd_claimsData['claimData']['applicationStatus'] == "APPROVED"  ){
this.currStatus_nmpc_tied_2nd = this.currentStatusText[2].concat(dates_nmpc_tied_2nd.hasOwnProperty('approvedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_tied_2nd_claimsData['claimData']['dates']['approvedOn'],'MMM d, y')}` : "");


}else if(this.nmpc_tied_2nd_claimsData['claimData']['submitStatus'] == true &&
this.nmpc_tied_2nd_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.nmpc_tied_2nd_claimsData['claimData']['applicationStatus'] == "REJECTED"  ){
this.currStatus_nmpc_tied_2nd = this.currentStatusText[3].concat(dates_nmpc_tied_2nd.hasOwnProperty('returnedOn') ? ` Date - ${this.datePipe.transform(this.nmpc_tied_2nd_claimsData['claimData']['dates']['returnedOn'],'MMM d, y')}`: "");

}

  }

}else{      
    this.currStatus_nmpc_tied_2nd = this.currentStatusText[0]
  }
//mpc

if(this.mpc_claimsData['claimData'] && Object.keys(this.mpc_claimsData['claimData']).length != 0){
  let dates_mpc = this.mpc_claimsData['claimData']['dates']
  if(this.mpc_claimsData['claimData']['releaseStatus']){
    this.currStatus_mpc = this.currentStatusText[4].concat(dates_mpc.hasOwnProperty('releasedOn') ? ` Date - ${this.datePipe.transform(this.mpc_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}` : "")
  }else{
    if(this.mpc_claimsData['claimData']['submitStatus'] == true && 
this.mpc_claimsData['claimData']['actionTakenBy'] == "STATE" && 
this.mpc_claimsData['claimData']['applicationStatus'] == "PENDING"  ){
this.currStatus_mpc = this.currentStatusText[1].concat(` Date - ${this.datePipe.transform(this.mpc_claimsData['claimData']['dates']['submittedOn'], 'MMM d, y')}`);


}else if(this.mpc_claimsData['claimData']['submitStatus'] == true && 
this.mpc_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.mpc_claimsData['claimData']['applicationStatus'] == "APPROVED"  ){
this.currStatus_mpc = this.currentStatusText[2].concat(dates_mpc.hasOwnProperty('approvedOn') ? ` Date - ${this.datePipe.transform(this.mpc_claimsData['claimData']['dates']['approvedOn'],'MMM d, y')}` : "");


}else if(this.mpc_claimsData['claimData']['submitStatus'] == true &&
this.mpc_claimsData['claimData']['actionTakenBy'] == "MoHUA" && 
this.mpc_claimsData['claimData']['applicationStatus'] == "REJECTED"  ){
this.currStatus_mpc = this.currentStatusText[3].concat(dates_mpc.hasOwnProperty('returnedOn') ? ` Date - ${this.datePipe.transform(this.mpc_claimsData['claimData']['dates']['returnedOn'],'MMM d, y')}`: "");

}

  }

}else{      
    this.currStatus_mpc = this.currentStatusText[0]
  }

  }

  attachStatusToConditions(){
    //NMPC tied 1st installment
    this.conditions_nmpc_untied_1st.forEach(el=>{
      if(Object.keys(el)[0]=="1"){
          if(this.gtc_nmpc_untied_1st){
           this.finalConditions_nmpc_untied_1st.push(Object.values(el)[0] + ' (Submitted)')
          }else{
            this.finalConditions_nmpc_untied_1st.push(Object.values(el)[0] + ' (Not Submitted)')
          }
      }
    })
//NMPC untied 2nd installment
    this.conditions_nmpc_untied_2nd.forEach(el=>{
      if(Object.keys(el)[0]=="1"){
        this.finalConditions_nmpc_untied_2nd.push(Object.values(el)[0]+ ` (${this.annualAccounts}% Done)`)
      }else if(Object.keys(el)[0]=="2"){
if(this.gtc_nmpc_untied_2nd){
  this.finalConditions_nmpc_untied_2nd.push(Object.values(el)[0] + ' (Submitted)')
}else{
  this.finalConditions_nmpc_untied_2nd.push(Object.values(el)[0] + ' (Not Submitted)')
}
      }
    })
       //NMPC Tied 1st installment
       this.conditions_nmpc_tied_1st.forEach(el=>{
        if(Object.keys(el)[0]=="1"){
            if(this.gtc_nmpc_tied_1st){
              this.finalConditions_nmpc_tied_1st.push(Object.values(el)[0] + ' (Submitted)')
            }else{
              this.finalConditions_nmpc_tied_1st.push(Object.values(el)[0] + ' (Not Submitted)')
            }
        }
      })
  //NMPC Tied 2nd installment
      this.conditions_nmpc_tied_2nd.forEach(el=>{
        if(Object.keys(el)[0]=="1"){
          this.finalConditions_nmpc_tied_2nd.push(Object.values(el)[0]+ ` (${this.annualAccounts}% Done)`)
        }else if(Object.keys(el)[0]=="2"){
          this.finalConditions_nmpc_tied_2nd.push(Object.values(el)[0]+ ` (${this.utilReport_nmpc}% Done)`)
        }else if(Object.keys(el)[0]=="3"){
  if(this.gtc_nmpc_tied_2nd){
    this.finalConditions_nmpc_tied_2nd.push(Object.values(el)[0] + ' (Submitted)')
  }else{
    this.finalConditions_nmpc_tied_2nd.push(Object.values(el)[0] + ' (Not Submitted)')
  }
        }
      })
      //MPC
      this.conditions_mpc.forEach(el=>{
        if(Object.keys(el)[0]=="1"){
          this.finalConditions_mpc.push(Object.values(el)[0]+ ` (${this.annualAccounts}% Done)`)
        }else if(Object.keys(el)[0]=="2"){
          this.finalConditions_mpc.push(Object.values(el)[0]+ ` (${this.utilReport_mpc}% Done)`)
        }else if(Object.keys(el)[0]=="3"){
          this.finalConditions_mpc.push(Object.values(el)[0]+ ` (${this.slb_mpc}% Done)`)
        }else if(Object.keys(el)[0]=="4"){
  if(this.gtc_mpc){
    this.finalConditions_mpc.push(Object.values(el)[0] + ' (Submitted)')
  }else{
    this.finalConditions_mpc.push(Object.values(el)[0] + ' (Not Submitted)')
  }
        }else if(Object.keys(el)[0]=="6"){
if(this.actionPlan){
  this.finalConditions_mpc.push(Object.values(el)[0]+ ` (Submitted)`)
}else{
  this.finalConditions_mpc.push(Object.values(el)[0]+ ` (Not Submitted)`)
}
        
        }else if(Object.keys(el)[0]=="5"){
          if(this.waterRej){
            this.finalConditions_mpc.push(Object.values(el)[0]+ ` (Submitted)`)
          }else{
            this.finalConditions_mpc.push(Object.values(el)[0]+ ` (Not Submitted)`)
          }
        }
      })
console.log(this.finalConditions_nmpc_untied_1st,this.finalConditions_nmpc_untied_2nd, this.finalConditions_nmpc_tied_1st, this.finalConditions_nmpc_tied_2nd, this.finalConditions_mpc )

    
  }
  isNumber(val): boolean {
   // console.log('type', typeof(val))
     return typeof val === 'number';
   }
   isBoolean(val){
    return typeof val === 'boolean';
   }
  fetchData(financialYear) {
    this.grantClaimsService.getData(financialYear, this.stateId).subscribe(
      (res) => {
        console.log(res)
        let data = res['data'];
        // this.annualAccountsActual = data.annualAccountsActual;
        // this.conditions_nmpc_first = data?.conditions_nmpc[0].statements;
        // this.conditions_nmpc_second = data?.conditions_nmpc[1].statements;
        this.conditions_mpc = data?.conditions_mpc.statements;
        this.claimsData = data?.claimsData;
        this.eligibility = data?.eligibility;
        this.claimsInformation = data?.claimsInformation
        console.log('claimsInformation', this.claimsInformation);
        this.setFileUrl(this.claimsInformation);
      },
      (err) => {
        console.log(err.message)
      }
    )
  }
  setFileUrl(claimInfo){
    if(claimInfo?.mpc?.data[0]?.fileUrl) this.mpcPdfUrl = claimInfo?.mpc?.data[0]?.fileUrl;
    if(claimInfo?.nmpc_untied?.data){
      for(let item of claimInfo?.nmpc_untied?.data){
        if(item.installment == '2'){
          console.log('2 untied', item.installment)
         this.nmpcUntiedPdfUrl_2 = item.fileUrl
        }else {
         this.status_nmpc_untied = "Claim yet to be submitted";
         console.log('untied else 2')
        }
        if(item.installment == '1'){
         this.nmpcUntiedPdfUrl_1 = item.fileUrl
        }else {
          // conditional message
          this.status_nmpc_untied = "Claim yet to be submitted";
          console.log('untied else 1')
         }
     }
    }
    if(claimInfo?.nmpc_tied?.data){
      for(let item of claimInfo?.nmpc_tied?.data){
        if(item.installment == '2'){
          console.log('2 tied', item.installment)
         this.nmpcTiedPdfUrl_2 = item.fileUrl
        }else {
          // conditional message
          this.status_nmpc_tied = "Claim yet to be submitted";
          console.log('tied else 2')
         }
       if(item.installment == '1'){
         this.nmpcTiedPdfUrl_1 = item.fileUrl
        }else {
          // conditional message
          this.status_nmpc_tied = "Claim yet to be submitted";
          console.log('tied else 1')
         }
     }
    }

    // if(claimInfo?.nmpc_untied?.data[0]?.fileUrl) this.nmpcUntiedPdfUrl_2 = claimInfo?.nmpc_untied?.data[0]?.fileUrl;
    // if(claimInfo?.nmpc_tied?.data[0]?.fileUrl) this.nmpcTiedPdfUrl = claimInfo?.nmpc_tied?.data[0]?.fileUrl;
    console.log('setttttt', this.nmpcTiedPdfUrl_2)
  }
  checkFinancialYear(val) {
    //call api
    this.financial_year = val;
    this.fetchData(val);
    console.log("drp", val);
    if (val != '606aaf854dff55e6c075d219') {
      console.log(' other finance year')
      this.curr_finance_year = false;
      this.other_finance_year = true;
    } else {
      console.log('current finance year')
      this.curr_finance_year = true;
      this.other_finance_year = false;
    }

  }
  CliamGrantBox(type, installment, amount) {
    let reqBody = {
      grantType : type,
      ins : installment,
      amt : amount,
      fy : this.financial_year,
    }
    const dialogRef = this.dialog.open(GrantClaimsDialogComponent, {
      data: reqBody,
      maxHeight: "95%",
      width: "80%",
      panelClass: "no-padding-dialog",
    });
    console.log("dialog ref");
    dialogRef.afterClosed().subscribe((result) => {
      if(result.data){
        switch(type){
          case 'mpc': {
            this.mpcPdfUrl = result.data.url;
            this.mpcFileName = result.data.name;
            console.log('mpc', this.mpcPdfUrl, this.mpcFileName);
            break;
          }
          case 'nmpc_tied': {
            this.nmpcTiedPdfUrl_2 = result.data.url;
            this.nmpcTiedFileName = result.data.name;
            console.log('mpc', this.nmpcTiedFileName, this.nmpcTiedPdfUrl_2);
            break;
          }
          case 'nmpc_untied': {
            this.nmpcUntiedPdfUrl_2 = result.data.url;
            this.nmpcUntiedFileName = result.data.name;
            console.log('mpc', this.nmpcUntiedFileName, this.nmpcUntiedPdfUrl_2);
            break;
          }
        }
      }
      console.log('result', result, reqBody);

    });
  }
  action ='';
  claimSubmitDate =''

  finalConfirm(template, type, ins, grantAmount){
this.body['financialYear'] ='606aaf854dff55e6c075d219'
this.body['amountClaimed'] = grantAmount;
this.body['installment'] = ins;
this.body['type'] = type
this.body['state'] = this.stateId
    this.openDialog(template)

  }
body={
  "financialYear":"",
  "state":"",
  "installment":"",
  "amountClaimed":"",
  "type":"",
};
  proceed(){
    this.alertClose();
    this.grantClaimsService.claimGrantCreate(this.body).subscribe(
      (res)=>{
        swal('Success', `Claim Request successfully generated. A confirmation email has been sent to the registered email address and a copy of submission has been emailed to MoHUA`, 'success');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      (err)=>{
        swal('Error', `Claim Request could not be created successfully. Please try again later.`, 'error');
      })
     
   
  }
  historyData=[];
  viewHistory(template, type, ins) {
    this.historyData=[]
    let obj ={
      status:"",
      time:null,
      pos:0
    }
    if(type=='mpc'){
if(this.mpc_claimsData['claimData'] && Object.keys(this.mpc_claimsData['claimData']).length != 0){
  for (let key in this.mpc_claimsData['claimData']['dates']){
    switch(key){
      case 'submittedOn':{
obj.status = 'Submitted By State';
obj.time = this.mpc_claimsData['claimData']['dates'][key];
obj.pos = 4
this.historyData.push(obj)
      break;
      }
      case 'approvedOn':{
        obj.status = 'Recommended to Ministry of Finance by MoHUA';
obj.time = this.mpc_claimsData['claimData']['dates'][key];
obj.pos = 2;
this.historyData.push(obj)
        break;
        }
        case 'returnedOn':{
          obj.status = 'Returned by MoHUA';
          obj.time = this.mpc_claimsData['claimData']['dates'][key]
          obj.pos = 3;
          this.historyData.push(obj)
          break;
          }
          case 'releasedOn':{
            obj.status = 'Claim Released by MoF';
            obj.time = this.mpc_claimsData['claimData']['dates'][key];
            obj.pos = 1;
            this.historyData.push(obj)
            break;
            }

    }
  }

}
    }else if(type== 'nmpc_tied'){
if(ins =="1"){
  if(this.nmpc_tied_1st_claimsData['claimData'] && Object.keys(this.nmpc_tied_1st_claimsData['claimData']).length != 0){
    for (let key in this.nmpc_tied_1st_claimsData['claimData']['dates']){
      switch(key){
        case 'submittedOn':{
  obj.status = 'Submitted By State';
  obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key];
  obj.pos = 4
  this.historyData.push(obj)
        break;
        }
        case 'approvedOn':{
          obj.status = 'Recommended to Ministry of Finance by MoHUA';
  obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key];
  obj.pos = 2;
  this.historyData.push(obj)
          break;
          }
          case 'returnedOn':{
            obj.status = 'Returned by MoHUA';
            obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key]
            obj.pos = 3;
            this.historyData.push(obj)
            break;
            }
            case 'releasedOn':{
              obj.status = 'Claim Released by MoF';
              obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key];
              obj.pos = 1;
              this.historyData.push(obj)
              break;
              }
  
      }
    }
  
  }

}else if(ins=="2"){
  if(this.nmpc_tied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_tied_2nd_claimsData['claimData']).length != 0){
    for (let key in this.nmpc_tied_2nd_claimsData['claimData']['dates']){
      switch(key){
        case 'submittedOn':{
  obj.status = 'Submitted By State';
  obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key];
  obj.pos = 4
  this.historyData.push(obj)
        break;
        }
        case 'approvedOn':{
          obj.status = 'Recommended to Ministry of Finance by MoHUA';
  obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key];
  obj.pos = 2;
  this.historyData.push(obj)
          break;
          }
          case 'returnedOn':{
            obj.status = 'Returned by MoHUA';
            obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key]
            obj.pos = 3;
            this.historyData.push(obj)
            break;
            }
            case 'releasedOn':{
              obj.status = 'Claim Released by MoF';
              obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key];
              obj.pos = 1;
              this.historyData.push(obj)
              break;
              }
  
      }
    }
  
  }

}
    }else if(type=='nmpc_untied'){
if(ins =="1"){
  if(this.nmpc_untied_1st_claimsData['claimData'] && Object.keys(this.nmpc_untied_1st_claimsData['claimData']).length != 0){
    for (let key in this.nmpc_untied_1st_claimsData['claimData']['dates']){
      switch(key){
        case 'submittedOn':{
  obj.status = 'Submitted By State';
  obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key];
  obj.pos = 4
  this.historyData.push(obj)
        break;
        }
        case 'approvedOn':{
          obj.status = 'Recommended to Ministry of Finance by MoHUA';
  obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key];
  obj.pos = 2;
  this.historyData.push(obj)
          break;
          }
          case 'returnedOn':{
            obj.status = 'Returned by MoHUA';
            obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key]
            obj.pos = 3;
            this.historyData.push(obj)
            break;
            }
            case 'releasedOn':{
              obj.status = 'Claim Released by MoF';
              obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key];
              obj.pos = 1;
              this.historyData.push(obj)
              break;
              }
  
      }
    }
  
  }
}else if(ins=="2"){
  if(this.nmpc_untied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_untied_2nd_claimsData['claimData']).length != 0){
    for (let key in this.nmpc_untied_2nd_claimsData['claimData']['dates']){
      switch(key){
        case 'submittedOn':{
  obj.status = 'Submitted By State';
  obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key];
  obj.pos = 4
  this.historyData.push(obj)
        break;
        }
        case 'approvedOn':{
          obj.status = 'Recommended to Ministry of Finance by MoHUA';
  obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key];
  obj.pos = 2;
  this.historyData.push(obj)
          break;
          }
          case 'returnedOn':{
            obj.status = 'Returned by MoHUA';
            obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key]
            obj.pos = 3;
            this.historyData.push(obj)
            break;
            }
            case 'releasedOn':{
              obj.status = 'Claim Released by MoF';
              obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key];
              obj.pos = 1;
              this.historyData.push(obj)
              break;
              }
  
      }
    }
  
  }
}
    }


    this.openDialog(template)

  }
  openDialog(template) {

    let dialogRef = this.dialog.open(template, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  alertClose() {
    this.dialog.closeAll();
  }
}
