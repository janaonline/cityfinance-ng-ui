import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IFinancialData } from 'src/app/users/data-upload/models/financial-data.interface';
import { FinancialDataService } from 'src/app/users/services/financial-data.service';
import { SidebarUtil } from 'src/app/users/utils/sidebar.util';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';

@Component({
  selector: "app-fc-grant",
  templateUrl: "./fc-grant.component.html",
  styleUrls: ["./fc-grant.component.scss"],
})
export class FcGrantComponent extends BaseComponent implements OnInit {
  financialData: IFinancialData & { customStatusMessage: string };
  constructor(
    private _router: Router,
    private _financialService: FinancialDataService
  ) {
    super();
    switch (this.loggedInUser) {
      case USER_TYPE.ULB:
        this.fetchFinancialDataUpload();
        break;
      case USER_TYPE.STATE:
      case USER_TYPE.PARTNER:
      case USER_TYPE.MoHUA:
      case USER_TYPE.ADMIN:
        this._router.navigate(["/user/data-upload/list"]);
        break;
      case undefined:
      case null:
        return;
      default:
        this._router.navigate(["/home"]);
        break;
    }
  }

  ngOnInit() {}

  onClickingLoginButton() {
    sessionStorage.setItem("postLoginNavigation", this._router.url);
    this._router.navigate(["/login"]);
  }

  goToFormView(url: string) {
    if (this.loggedInUser === USER_TYPE.ULB) {
      SidebarUtil.hideSidebar();
    } else SidebarUtil.showSidebar();
    this._router.navigate([url]);
  }

  fetchFinancialDataUpload() {
    this._financialService.fetchFinancialDataList().subscribe((res) => {
      try {
        this.financialData = res["data"][0] || null;
        if (!this.financialData) return;
      } catch (error) {
        console.error(error);
        return;
      }
      this.financialData.customStatusMessage = this.calculateFormStatus(
        this.financialData
      );
    });
  }

  calculateFormStatus(data: IFinancialData) {
    if (!data.isCompleted) return "Saved as Draft";
    switch (data.status) {
      case "PENDING": {
        const message = "Under Review by ";
        if (data.actionTakenByUserRole === USER_TYPE.ULB) {
          return message + USER_TYPE.STATE;
        }
        return message + USER_TYPE.MoHUA;
      }
      case "REJECTED": {
        return `Reject by ${data.actionTakenByUserRole}`;
      }
      case "APPROVED": {
        return `Approved by ${data.actionTakenByUserRole}`;
      }
      default:
        return null;
    }
  }
}
