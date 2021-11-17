import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GrantClaimsDialogComponent } from './grant-claims-dialog/grant-claims-dialog.component';
import { GrantClaimsService } from './grant-claims.service'
import { GTCertificateService } from '../gtcertificate/gtcertificate.service'
@Component({
  selector: 'app-grant-claims',
  templateUrl: './grant-claims.component.html',
  styleUrls: ['./grant-claims.component.scss']
})
export class GrantClaimsComponent implements OnInit {

  financial_year;
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
  display;
  constructor(
    private dialog: MatDialog,
    public grantClaimsService: GrantClaimsService,
    public gTCertificateService: GTCertificateService
  ) {
    this.financial_year = JSON.parse(localStorage.getItem('Years'));
    this.stateId = sessionStorage.getItem("state_id");
    if (!this.stateId) {
      this.stateId = JSON.parse(localStorage.getItem("userData")).state;
    }
  }


  ngOnInit(): void {
    this.financial_year = Object.entries(this.financial_year);
    this.gTCertificateService.getCondition(this.stateId).subscribe((res) => {
      this.display = res['data']
      console.log(this.display)
    })
    this.fetchData('606aaf854dff55e6c075d219');


  }
  fetchData(financialYear) {
    this.grantClaimsService.getData(financialYear, this.stateId).subscribe(
      (res) => {
        console.log(res)
        let data = res['data'];
        this.annualAccountsActual = data.annualAccountsActual;
        this.conditions_nmpc_first = data?.conditions_nmpc[0].statements
        this.conditions_nmpc_second = data?.conditions_nmpc[1].statements
        this.conditions_mpc = data?.conditions_mpc.statements
        this.claimsData = data?.claimsData
      },
      (err) => {
        console.log(err.message)
      }
    )
  }
  checkFinancialYear(val) {
    //call api
    this.fetchData(val)
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
  CliamGrantBox() {
    const dialogRef = this.dialog.open(GrantClaimsDialogComponent, {
      maxHeight: "95%",
      width: "80%",
      panelClass: "no-padding-dialog",
    });
    console.log("dialog ref");
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  viewHistory(template) {
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
