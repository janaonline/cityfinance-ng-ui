import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GrantClaimsDialogComponent } from './grant-claims-dialog/grant-claims-dialog.component';
import { GrantClaimsService } from './grant-claims.service'
import { GTCertificateService } from '../gtcertificate/gtcertificate.service'

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
  annualAccountsActual = 0;
  conditions_nmpc_first = []
  conditions_nmpc_second = []
  conditions_mpc = [];
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
    public gTCertificateService: GTCertificateService
  ) {
    // this.financial_year = JSON.parse(localStorage.getItem('Years'));
    this.stateId = sessionStorage.getItem("state_id");
    if (!this.stateId) {
      this.stateId = JSON.parse(localStorage.getItem("userData")).state;
    }
  }


  ngOnInit(): void {

    this.gTCertificateService.getCondition(this.stateId).subscribe((res) => {
      this.display = res['data']
      console.log('display',this.display)
    })
    this.fetchData('606aaf854dff55e6c075d219');


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
        this.annualAccountsActual = data.annualAccountsActual;
        this.conditions_nmpc_first = data?.conditions_nmpc[0].statements;
        this.conditions_nmpc_second = data?.conditions_nmpc[1].statements;
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
  viewHistory(template, type, ins) {
    this.action = 'Sumbitted';
    this.claimSubmitDate = '';
    if(type){
      switch(type){
        case 'mpc': {
         // this.action = 'Sumbitted';
          this.claimSubmitDate = this.claimsInformation?.mpc?.data[0].dates.submittedOn;
          break;
        }
        case 'nmpc_tied': {
          this.claimSubmitDate = this.claimsInformation?.nmpc_tied?.data[0].dates.submittedOn;
          break;
        }
        case 'nmpc_untied': {
          this.claimSubmitDate = this.claimsInformation?.nmpc_untied?.data[0].dates.submittedOn;
          break;
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
