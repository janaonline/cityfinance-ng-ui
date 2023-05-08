import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GrantClaimsDialogComponent } from './grant-claims-dialog/grant-claims-dialog.component';
import { GrantClaimsService } from '../../../pages/stateforms/grant-claims/grant-claims.service'
import { GTCertificateService } from '../../../pages/stateforms/gtcertificate/gtcertificate.service'
import { StateDashboardService } from '../../../pages/stateforms/state-dashboard/state-dashboard.service'
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
  years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  financial_year = this.years['2022-23'];
  curr_finance_year = true;
  other_finance_year = false;
  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  stateId;
  currentStatusText = [
    'Claim yet to be Submitted. ',
    'Claim for grant Submitted. ',
    'Claim Recommended to Ministry of Finance. ',
    'Claim Returned by MoHUA. ',
    'Claim released to State by Ministry of Finance. '
  ]

  btnLabelText = [
    'Claim Grant - '
  ]

  tooltips = 'Condition(s) Not Met';


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
  noDataFoundUrl = 'https://democityfinanceapi.dhwaniris.in/objects/92f725fb-8b27-421a-8f16-ac71921efccb.pdf';

  //to store objects from grant claims get api
  nmpc_untied_1st_claimsData = {}
  nmpc_untied_2nd_claimsData = {}
  nmpc_tied_1st_claimsData = {}
  nmpc_tied_2nd_claimsData = {}
  mpc_claimsData = {}

  // to store the amounts claimed by states
  nmpc_untied_1st_grantAmount = ""
  nmpc_untied_2nd_grantAmount = ""
  nmpc_tied_1st_grantAmount = ""
  nmpc_tied_2nd_grantAmount = ""
  mpc_grantAmount = ""


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


  //boolean for showing conditions --new
  viewCond_mpc = false;
  viewCond_nmpc_untied_1st = false
  viewCond_nmpc_untied_2nd = false
  viewCond_nmpc_tied_1st = false
  viewCond_nmpc_tied_2nd = false
  dateNot = ' - Date Not Available'

  // to store data
  mpcData;
  nmpcTied_1_Data;
  nmpcTied_2_Data;
  nmpcUntied_1_Data;
  nmpcUntied_2_Data;
  action = '';
  claimSubmitDate = ''
  isApiInProgress = true;
  sideMenuItem;
  backRouter = '';
  nextRouter = '';
  constructor(
    private dialog: MatDialog,
    public grantClaimsService: GrantClaimsService,
    public gTCertificateService: GTCertificateService,
    public stateDashboardService: StateDashboardService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.stateId = this.userData?.state ? this.userData?.state : sessionStorage.getItem("state_id");
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");  
    }

  }


  async ngOnInit() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.setRouter();
    await this.findDisplay();
    this.fetchData(this.years['2022-23']);

  }

  findDisplay() {
    return new Promise<void>((resolve, reject) => {
      this.gTCertificateService.getCondition(this.stateId).subscribe((res) => {
        this.display = res['data']
        console.log('display', this.display);
        resolve(this.display);
      }, (error) => {
        resolve(this.display);
      }
      )
    })
  }


  computeButtonLabels() {
    //npc 1st installment
    if (this.nmpc_untied_1st_grantAmount) {
      this.btnLabel_nmpc_untied_1st = this.btnLabelText[0] + `Rs. ${this.nmpc_untied_1st_grantAmount} Cr.`
    } else {
      this.btnLabel_nmpc_untied_1st = this.btnLabelText[0] + `Not Available`
    }

    //
    if (this.nmpc_untied_2nd_grantAmount) {
      this.btnLabel_nmpc_untied_2nd = this.btnLabelText[0] + `Rs. ${this.nmpc_untied_2nd_grantAmount} Cr.`
    } else {
      this.btnLabel_nmpc_untied_2nd = this.btnLabelText[0] + `Not Available`
    }
    if (this.nmpc_tied_1st_grantAmount) {
      this.btnLabel_nmpc_tied_1st = this.btnLabelText[0] + `Rs. ${this.nmpc_tied_1st_grantAmount} Cr.`
    } else {
      this.btnLabel_nmpc_tied_1st = this.btnLabelText[0] + `Not Available`
    }
    if (this.nmpc_tied_2nd_grantAmount) {
      this.btnLabel_nmpc_tied_2nd = this.btnLabelText[0] + `Rs. ${this.nmpc_tied_2nd_grantAmount} Cr.`
    } else {
      this.btnLabel_nmpc_tied_2nd = this.btnLabelText[0] + `Not Available`
    }
    if (this.mpc_grantAmount) {
      this.btnLabel_mpc = this.btnLabelText[0] + `Rs. ${this.mpc_grantAmount} Cr.`
    } else {
      this.btnLabel_mpc = this.btnLabelText[0] + `Not Available`
    }
  }


  isNumber(val): boolean {
    // console.log('type', typeof(val))
    return typeof val === 'number';
  }
  isBoolean(val) {
    return typeof val === 'boolean';
  }

  fetchData(financialYear) {
    this.isApiInProgress = true;
    this.grantClaimsService.getData2223(this.years['2022-23'], this.stateId).subscribe(
      (res) => {
        console.log(res);
        this.isApiInProgress = false;
        let data = res['data'];
        this.mpcData = data['mpc_tied_1']
        this.currStatus_mpc = this.mpcData?.mpc_tied_1_GrantData?.status;
        this.mpc_grantAmount = this.mpcData?.mpc_tied_1_GrantData?.amountAssigned;
        if (data['mpc_tied_1']?.conditions?.length > 0) {
          this.viewCond_mpc = true;
          this.setCondition('mpc', this.mpcData);
        } else {
          this.viewCond_mpc = false;
        }
        this.nmpcTied_1_Data = data['nmpc_tied_1']
        this.currStatus_nmpc_tied_1st = this.nmpcTied_1_Data?.nmpc_tied_1_GrantData?.status;
        this.nmpc_tied_1st_grantAmount = this.nmpcTied_1_Data?.nmpc_tied_1_GrantData?.amountAssigned;
        if (data['nmpc_tied_1']?.conditions?.length > 0) {
          this.viewCond_nmpc_tied_1st = true;
          this.setCondition('nmpcT1', this.nmpcTied_1_Data);
        } else {
          this.viewCond_nmpc_tied_1st = false
        }
        this.nmpcTied_2_Data = data['nmpc_tied_2']
        this.currStatus_nmpc_tied_2nd = this.nmpcTied_2_Data?.nmpc_tied_2_GrantData?.status;
        this.nmpc_tied_2nd_grantAmount = this.nmpcTied_2_Data?.nmpc_tied_2_GrantData?.amountAssigned;
        if (data['nmpc_tied_2']?.conditions?.length > 0) {
          this.viewCond_nmpc_tied_2nd = true;
          this.setCondition('nmpcT2', this.nmpcTied_2_Data);
        } else {
          this.viewCond_nmpc_tied_2nd = false;
        }

        this.nmpcUntied_1_Data = data['nmpc_untied_1']
        this.currStatus_nmpc_untied_1st = this.nmpcUntied_1_Data?.nmpc_untied_1_GrantData?.status;
        this.nmpc_untied_1st_grantAmount = this.nmpcUntied_1_Data?.nmpc_untied_1_GrantData?.amountAssigned;
        if (data['nmpc_untied_1']?.conditions?.length > 0) {
          this.viewCond_nmpc_untied_1st = true;
          this.setCondition('nmpcUT1', this.nmpcUntied_1_Data);
        } else {
          this.viewCond_nmpc_untied_1st = false;
        }

        this.nmpcUntied_2_Data = data['nmpc_untied_2']
        this.currStatus_nmpc_untied_2nd = this.nmpcUntied_2_Data?.nmpc_untied_2_GrantData?.status;
        this.nmpc_untied_2nd_grantAmount = this.nmpcUntied_2_Data?.nmpc_untied_2_GrantData?.amountAssigned;
        if (data['nmpc_untied_2']?.conditions?.length > 0) {
          this.viewCond_nmpc_untied_2nd = true;
          this.setCondition('nmpcUT2', this.nmpcUntied_2_Data);
        } else {
          this.viewCond_nmpc_untied_2nd = false;
        }
        // this.conditions_mpc = data?.conditions_mpc?.statements;
        this.claimsData = data?.claimsData;
        this.eligibility = data?.eligibility;
        this.claimsInformation = data?.claimsInformation
        console.log('claimsInformation', this.claimsInformation);
        this.setFileUrl(this.claimsInformation);
        this.computeButtonLabels()
      },
      (err) => {
        console.log(err.message);
        this.isApiInProgress = false;
      }
    )
  }
  setFileUrl(claimInfo) {
    if (claimInfo?.mpc?.data[0]?.fileUrl) this.mpcPdfUrl = claimInfo?.mpc?.data[0]?.fileUrl;
    if (claimInfo?.nmpc_untied?.data) {
      for (let item of claimInfo?.nmpc_untied?.data) {
        if (item.installment == '2') {
          console.log('2 untied', item.installment)
          this.nmpcUntiedPdfUrl_2 = item.fileUrl
        } else {
          this.status_nmpc_untied = "Claim yet to be submitted";
          console.log('untied else 2')
        }
        if (item.installment == '1') {
          this.nmpcUntiedPdfUrl_1 = item.fileUrl
        } else {
          // conditional message
          this.status_nmpc_untied = "Claim yet to be submitted";
          console.log('untied else 1')
        }
      }
    }
    if (claimInfo?.nmpc_tied?.data) {
      for (let item of claimInfo?.nmpc_tied?.data) {
        if (item.installment == '2') {
          console.log('2 tied', item.installment)
          this.nmpcTiedPdfUrl_2 = item.fileUrl
        } else {
          // conditional message
          this.status_nmpc_tied = "Claim yet to be submitted";
          console.log('tied else 2')
        }
        if (item.installment == '1') {
          this.nmpcTiedPdfUrl_1 = item.fileUrl
        } else {
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
    if (val != this.years['2022-23']) {
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
      grantType: type,
      ins: installment,
      amt: amount,
      fy: this.financial_year,
    }
    const dialogRef = this.dialog.open(GrantClaimsDialogComponent, {
      data: reqBody,
      maxHeight: "95%",
      width: "80%",
      panelClass: "no-padding-dialog",
    });
    console.log("dialog ref");
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        switch (type) {
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

  finalConfirm(type, ins, grantAmount) {
    this.body['financialYear'] = this.years['2022-23']
    this.body['amountClaimed'] = grantAmount;
    this.body['installment'] = ins;
    this.body['type'] = type
    this.body['state'] = this.stateId;
    swal(
      "Confirmation !",
      `Are you sure you want to claim this grant?`,
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
          this.onSubmit();
          break;
        case "cancel":
          break;
      }
    });
    //  this.openDialog(template)

  }
  body = {
    "financialYear": "",
    "state": "",
    "installment": "",
    "amountClaimed": "",
    "type": "",
  };
  onSubmit() {
    // this.alertClose();
    this.grantClaimsService.claimGrantCreate(this.body).subscribe(
      (res) => {
        swal('Success', `Claim Request successfully generated. A confirmation email has been sent to the registered email address and a copy of submission has been emailed to MoHUA`, 'success');
        this.fetchData('');
        setTimeout(() => {
          this.router.navigate(['stateform/dashboard']);
        }, 500);
      },
      (err) => {
        swal('Error', `Claim Request could not be created successfully. Please try again later.`, 'error');
      })


  }
  historyData = [];
  // viewHistory(template, type, ins) {
  //   this.historyData = []
  //   let obj = {
  //     status: "",
  //     time: null,
  //     pos: 0
  //   }
  //   if (type == 'mpc') {
  //     if (this.mpc_claimsData['claimData'] && Object.keys(this.mpc_claimsData['claimData']).length != 0) {
  //       for (let key in this.mpc_claimsData['claimData']['dates']) {
  //         switch (key) {
  //           case 'submittedOn': {
  //             obj.status = 'Submitted By State';
  //             obj.time = this.mpc_claimsData['claimData']['dates'][key];
  //             obj.pos = 4
  //             this.historyData.push(obj)
  //             break;
  //           }
  //           case 'approvedOn': {
  //             obj.status = 'Recommended to Ministry of Finance by MoHUA';
  //             obj.time = this.mpc_claimsData['claimData']['dates'][key];
  //             obj.pos = 2;
  //             this.historyData.push(obj)
  //             break;
  //           }
  //           case 'returnedOn': {
  //             obj.status = 'Returned by MoHUA';
  //             obj.time = this.mpc_claimsData['claimData']['dates'][key]
  //             obj.pos = 3;
  //             this.historyData.push(obj)
  //             break;
  //           }
  //           case 'releasedOn': {
  //             obj.status = 'Claim Released by MoF';
  //             obj.time = this.mpc_claimsData['claimData']['dates'][key];
  //             obj.pos = 1;
  //             this.historyData.push(obj)
  //             break;
  //           }

  //         }
  //       }

  //     }
  //   } else if (type == 'nmpc_tied') {
  //     if (ins == "1") {
  //       if (this.nmpc_tied_1st_claimsData['claimData'] && Object.keys(this.nmpc_tied_1st_claimsData['claimData']).length != 0) {
  //         for (let key in this.nmpc_tied_1st_claimsData['claimData']['dates']) {
  //           switch (key) {
  //             case 'submittedOn': {
  //               obj.status = 'Submitted By State';
  //               obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key];
  //               obj.pos = 4
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'approvedOn': {
  //               obj.status = 'Recommended to Ministry of Finance by MoHUA';
  //               obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key];
  //               obj.pos = 2;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'returnedOn': {
  //               obj.status = 'Returned by MoHUA';
  //               obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key]
  //               obj.pos = 3;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'releasedOn': {
  //               obj.status = 'Claim Released by MoF';
  //               obj.time = this.nmpc_tied_1st_claimsData['claimData']['dates'][key];
  //               obj.pos = 1;
  //               this.historyData.push(obj)
  //               break;
  //             }

  //           }
  //         }

  //       }

  //     } else if (ins == "2") {
  //       if (this.nmpc_tied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_tied_2nd_claimsData['claimData']).length != 0) {
  //         for (let key in this.nmpc_tied_2nd_claimsData['claimData']['dates']) {
  //           switch (key) {
  //             case 'submittedOn': {
  //               obj.status = 'Submitted By State';
  //               obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key];
  //               obj.pos = 4
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'approvedOn': {
  //               obj.status = 'Recommended to Ministry of Finance by MoHUA';
  //               obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key];
  //               obj.pos = 2;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'returnedOn': {
  //               obj.status = 'Returned by MoHUA';
  //               obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key]
  //               obj.pos = 3;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'releasedOn': {
  //               obj.status = 'Claim Released by MoF';
  //               obj.time = this.nmpc_tied_2nd_claimsData['claimData']['dates'][key];
  //               obj.pos = 1;
  //               this.historyData.push(obj)
  //               break;
  //             }

  //           }
  //         }

  //       }

  //     }
  //   } else if (type == 'nmpc_untied') {
  //     if (ins == "1") {
  //       if (this.nmpc_untied_1st_claimsData['claimData'] && Object.keys(this.nmpc_untied_1st_claimsData['claimData']).length != 0) {
  //         for (let key in this.nmpc_untied_1st_claimsData['claimData']['dates']) {
  //           switch (key) {
  //             case 'submittedOn': {
  //               obj.status = 'Submitted By State';
  //               obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key];
  //               obj.pos = 4
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'approvedOn': {
  //               obj.status = 'Recommended to Ministry of Finance by MoHUA';
  //               obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key];
  //               obj.pos = 2;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'returnedOn': {
  //               obj.status = 'Returned by MoHUA';
  //               obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key]
  //               obj.pos = 3;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'releasedOn': {
  //               obj.status = 'Claim Released by MoF';
  //               obj.time = this.nmpc_untied_1st_claimsData['claimData']['dates'][key];
  //               obj.pos = 1;
  //               this.historyData.push(obj)
  //               break;
  //             }

  //           }
  //         }

  //       }
  //     } else if (ins == "2") {
  //       if (this.nmpc_untied_2nd_claimsData['claimData'] && Object.keys(this.nmpc_untied_2nd_claimsData['claimData']).length != 0) {
  //         for (let key in this.nmpc_untied_2nd_claimsData['claimData']['dates']) {
  //           switch (key) {
  //             case 'submittedOn': {
  //               obj.status = 'Submitted By State';
  //               obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key];
  //               obj.pos = 4
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'approvedOn': {
  //               obj.status = 'Recommended to Ministry of Finance by MoHUA';
  //               obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key];
  //               obj.pos = 2;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'returnedOn': {
  //               obj.status = 'Returned by MoHUA';
  //               obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key]
  //               obj.pos = 3;
  //               this.historyData.push(obj)
  //               break;
  //             }
  //             case 'releasedOn': {
  //               obj.status = 'Claim Released by MoF';
  //               obj.time = this.nmpc_untied_2nd_claimsData['claimData']['dates'][key];
  //               obj.pos = 1;
  //               this.historyData.push(obj)
  //               break;
  //             }

  //           }
  //         }

  //       }
  //     }
  //   }


  //   this.openDialog(template)

  // }
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

  // new changes-----------
  mpcCondArr = [];
  nmpcT1CondArr = [];
  nmpcT2CondArr = [];
  nmpcUT1CondArr = [];
  nmpcUT2CondArr = [];

  setCondition(type, res) {
    let mpcData = res;
    let stateUlbArr = []
    res?.dashboardData?.forEach((el) => {
      stateUlbArr = stateUlbArr.concat(el?.formData)
    });
    stateUlbArr?.forEach((el) => {
      let keyM = el?.key;
      let val = el?.approvedValue;
      console.log('aaaaaaaaa', mpcData?.conditions);
      for (let i = 0; i < mpcData?.conditions?.length; i++) {
        let elm = mpcData?.conditions[i];
        if (keyM == elm?.key) {
          // let str = elm?.text + ' (' + val + '%' + ' done )';
          let strObj = {
            str: elm?.text,
            value: val
          }
          if (type == 'mpc') {
            this.mpcCondArr[i] = strObj;
          } else if (type == 'nmpcT1') {
            this.nmpcT1CondArr[i] = strObj;
          }
          else if (type == 'nmpcT2') {
            this.nmpcT2CondArr[i] = strObj;
          }
          else if (type == 'nmpcUT1') {
            this.nmpcUT1CondArr[i] = strObj;
          }
          else if (type == 'nmpcUT2') {
            this.nmpcUT2CondArr[i] = strObj;
          }
          break;
        }
      }
    })
    console.log('mpc array', this.mpcCondArr)

  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.url == "grant-claims") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
          // this.formId = element?._id;

        }
      });
    }
  }

}
