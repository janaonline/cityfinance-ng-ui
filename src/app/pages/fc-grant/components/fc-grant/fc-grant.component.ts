import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { USER_TYPE } from 'src/app/models/user/userType';
import { services, targets } from 'src/app/users/data-upload/components/configs/water-waste-management';
import { IFinancialData } from 'src/app/users/data-upload/models/financial-data.interface';
import {
  APPROVAL_COMPLETED,
  REJECT_BY_MoHUA,
  REJECT_BY_STATE,
  SAVED_AS_DRAFT,
  UNDER_REVIEW_BY_MoHUA,
  UNDER_REVIEW_BY_STATE,
} from 'src/app/users/data-upload/util/request-status';
import { FinancialDataService } from 'src/app/users/services/financial-data.service';
import { SidebarUtil } from 'src/app/users/utils/sidebar.util';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { UPLOAD_STATUS } from 'src/app/util/enums';

@Component({
  selector: "app-fc-grant",
  templateUrl: "./fc-grant.component.html",
  styleUrls: ["./fc-grant.component.scss"],
})
export class FcGrantComponent extends BaseComponent implements OnInit {
  constructor(
    private _router: Router,
    private _financialService: FinancialDataService,
    private modalService: BsModalService,
    private _snackBar: MatSnackBar
  ) {
    super();
    switch (this.loggedInUserType) {
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
  financialData: IFinancialData & { customStatusMessage: string };
  uploadStatus = UPLOAD_STATUS;

  formCompletedPercentage;

  isPopupOpen = false;
  formHistoricalData;

  ngOnInit() {}

  onClickingLoginButton() {
    sessionStorage.setItem("postLoginNavigation", this._router.url);
    this._router.navigate(["/login"]);
  }

  goToFormView(url: string) {
    if (this.loggedInUserType === USER_TYPE.ULB) {
      SidebarUtil.hideSidebar();
    } else SidebarUtil.showSidebar();
    this._router.navigate([url]);
  }

  fetchFinancialDataUpload() {
    this._financialService.fetchFinancialDataList().subscribe((res) => {
      try {
        this.financialData = res["data"][0] || null;
        if (!this.financialData) {
          return this._router.navigate(["/user/data-upload/upload-form"]);
        }
      } catch (error) {
        console.error(error);
        return;
      }
      this.financialData.customStatusMessage = this.calculateFormStatus(
        this.financialData
      );

      this.formCompletedPercentage = this.calculatePercentageCompleted();
    });
  }

  calculatePercentageCompleted() {
    let completed = 0;

    if (!this.financialData) return completed;
    if (
      this.financialData.millionPlusCities &&
      this.financialData.millionPlusCities.documents
    ) {
      Object.keys(this.financialData.millionPlusCities.documents).forEach(
        (key) => {
          const question = this.financialData.millionPlusCities.documents[key];
          if (
            !question ||
            !question.length ||
            question[0].name === null ||
            question[0].name === undefined ||
            question[0].name.trim() === ""
          ) {
            return;
          }
          completed++;
        }
      );
    }

    if (
      this.financialData.solidWasteManagement &&
      this.financialData.solidWasteManagement.documents
    ) {
      Object.keys(this.financialData.solidWasteManagement.documents).forEach(
        (key) => {
          const question = this.financialData.solidWasteManagement.documents[
            key
          ];
          if (
            !question ||
            !question.length ||
            question[0].name === null ||
            question[0].name === undefined ||
            question[0].name.trim() === ""
          ) {
            return;
          }
          completed++;
        }
      );
    }

    if (
      this.financialData.waterManagement &&
      this.financialData.waterManagement.documents.wasteWaterPlan
    ) {
      const doc = this.financialData.waterManagement.documents
        .wasteWaterPlan[0];
      if (doc && doc.name) {
        completed++;
      }
    }

    services.forEach((question) => {
      const serviceLevel = this.financialData.waterManagement[question.key];
      try {
        if (serviceLevel["baseline"][2021]) {
          completed++;
        }

        targets.forEach((year) => {
          if (serviceLevel["target"][year.key]) {
            completed++;
          }
        });
      } catch (error) {}
    });

    return Number.parseInt((completed / 27) * 100 + "");
  }

  calculateFormStatus(data: IFinancialData) {
    if (!data.isCompleted) return "Incomplete (Saved as Draft)";
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

  openModal(row: any, historyModal: TemplateRef<any>) {
    if (this.isPopupOpen) return;
    this.formHistoricalData = [];
    this.isPopupOpen = true;
    this.modalService.show(historyModal, {});
    this._financialService.fetchFinancialDataHistory(row._id).subscribe(
      (result: HttpResponse<any>) => {
        if (result["success"]) {
          this.formHistoricalData = result["data"].map((data) =>
            this.formatResponse(data, true)
          );
          this.formHistoricalData = this.formHistoricalData
            .filter((row) => typeof row["actionTakenBy"] != "string")
            .reverse();
        }
      },
      (error) => this.handlerError(error)
    );
  }

  closePopUp() {
    this.modalService.hide(1);
    this.isPopupOpen = false;
  }

  private formatResponse(req: IFinancialData, history = false) {
    if (!req.isCompleted) {
      return {
        ...req,
        customStatusText: SAVED_AS_DRAFT.itemName,
      };
    }

    let customStatusText;
    switch (req.actionTakenByUserRole) {
      case USER_TYPE.ULB:
        customStatusText = history
          ? "Submitted by ULB"
          : UNDER_REVIEW_BY_STATE.itemName;
        break;
      case USER_TYPE.STATE:
        if (req.status === UPLOAD_STATUS.REJECTED) {
          customStatusText = REJECT_BY_STATE.itemName;
        } else {
          customStatusText = history
            ? "Approved by STate"
            : UNDER_REVIEW_BY_MoHUA.itemName;
        }

        break;
      case USER_TYPE.MoHUA:
        if (req.status === UPLOAD_STATUS.REJECTED) {
          customStatusText = REJECT_BY_MoHUA.itemName;
        } else {
          customStatusText = APPROVAL_COMPLETED.itemName;
        }
        break;
      default:
        customStatusText = "N/A";
    }

    return {
      ...req,
      customStatusText,
    };
  }

  private handlerError(response: any) {
    let string = "Some Error Occurred";
    const { message, error } = response;
    if (error) {
      const errorMessage = error.message;
      if (errorMessage) {
        string = errorMessage;
      } else {
        string = message;
      }
    }
    this._snackBar.open(string, null, { duration: 6600 });
  }
}
