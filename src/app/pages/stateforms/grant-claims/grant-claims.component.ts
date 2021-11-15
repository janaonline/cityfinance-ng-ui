import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GrantClaimsDialogComponent } from './grant-claims-dialog/grant-claims-dialog.component';

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
  constructor(
    private dialog: MatDialog,
  ) {
    this.financial_year =JSON.parse(localStorage.getItem('Years'))
  }


  ngOnInit(): void {
    console.log('years1', this.financial_year)
    this.financial_year = Object.entries(this.financial_year);
    console.log('years2', this.financial_year)
  }
  checkFinancialYear(val) {
    console.log("drp", val);
    if(val != '606aaf854dff55e6c075d219'){
      console.log(' other finance year')
      this.curr_finance_year = false;
      this.other_finance_year = true;
    }else {
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
}
