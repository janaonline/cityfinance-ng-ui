import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatHorizontalStepper } from '@angular/material';
import { Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IQuestionnaireResponse } from 'src/app/pages/questionnaires/model/questionnaireResponse.interface';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { FinancialDataService } from 'src/app/users/services/financial-data.service';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { UPLOAD_STATUS } from 'src/app/util/enums';
import { JSONUtility } from 'src/app/util/jsonUtil';
import { UserUtility } from 'src/app/util/user/user';

import {
  IFinancialData,
  MillionPlusCitiesDocuments,
  SolidWasteManagementDocuments,
  WaterManagement,
} from '../../models/financial-data.interface';
import { SolidWasteEmitValue } from '../../models/solid-waste-questions.interface';
import { UploadDataUtility } from '../../util/upload-data.util';
import { millionPlusCitiesQuestions } from '../configs/million-plus-cities';
import { solidWasterQuestions } from '../configs/solid-waste-management';

// import { this.waterWasteManagementForm } from '../configs/water-waste-management';

@Component({
  selector: "app-financial-uploads",
  templateUrl: "./financial-uploads.component.html",
  styleUrls: ["./financial-uploads.component.scss"],
})
export class FinancialUploadsComponent
  extends UploadDataUtility
  implements OnInit, OnDestroy {
  constructor(
    private _matDialog: MatDialog,
    private financialDataService: FinancialDataService,
    public accessUtil: AccessChecker,
    private _router: Router,
    private _profileService: ProfileService
  ) {
    super();
  }

  isULBMillionPlus = undefined;

  @Input()
  financialData: IFinancialData;

  @ViewChild("savingPopup") savingPopup: TemplateRef<any>;
  @ViewChild("previewPopup") previewPopup: TemplateRef<any>;

  USER_TYPE = USER_TYPE;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  documentData: IQuestionnaireResponse["data"][0]["documents"];

  millionPlusCitiesQuestions = millionPlusCitiesQuestions;
  solidWasteQuestions = solidWasterQuestions;
  solidWasteProfilledAnswers: SolidWasteManagementDocuments;
  millionPlusCitiesAnswers: MillionPlusCitiesDocuments;

  userHasAlreadyFilledForm = false;

  defaultDailogConfiuration: IDialogConfiguration = {
    message: "",
    buttons: {
      cancel: { text: "OK" },
    },
  };

  saveAsDraftFailMessge: string;

  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  draftSavingInProgess = false;

  canUploadFile = true;

  hasAccessToUploadData = false;
  hasAccessToViewData = false;
  canTakeApproveRejectAction = false;
  canViewActionTaken = false;

  successMessage: string;
  isSubmitButtonClicked = false;

  previewData: Partial<IFinancialData>;

  jsonUtil = new JSONUtility();

  ngOnInit() {}

  private initializeAccessCheck() {
    // if (this.financialData) {
    //   if (!this.financialData.waterManagement.documents.wasteWaterPlan.length) {
    //     this.financialData.waterManagement.documents.wasteWaterPlan = null;
    //   }
    // }
    this.hasAccessToUploadData = this.accessUtil.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.UPLOAD,
    });

    this.hasAccessToViewData = this.accessUtil.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.VIEW,
    });

    if (!this.hasAccessToViewData) return this._router.navigate(["/home"]);

    /**
     * Check if user has acccess to upload data or not.
     */
    if (!this.hasAccessToUploadData) this.setStateToReadMode();

    if (this.financialData) {
      /**
       * Check if user has access to upload, then can he still upload the data.
       */
      if (
        this.financialData.actionTakenByUserRole === USER_TYPE.ULB &&
        this.financialData.isCompleted
      ) {
        this.setStateToReadMode();
      }

      if (
        this.financialData.status === UPLOAD_STATUS.APPROVED &&
        this.financialData.actionTakenByUserRole === USER_TYPE.MoHUA
      ) {
        this.setStateToReadMode();
      }

      if (
        this.financialData.status === UPLOAD_STATUS.REJECTED ||
        JSON.stringify(this.financialData).includes(`${UPLOAD_STATUS.REJECTED}`)
      ) {
        this.canViewActionTaken = true;
        this.setFormToCorrectionMode(this.financialData);

        console.warn("now set form to correct mode");
        return;
      } else {
        if (
          this.financialData.actionTakenByUserRole === USER_TYPE.STATE &&
          this.financialData.status === UPLOAD_STATUS.APPROVED
        ) {
          this.setStateToReadMode();
        }
      }
    }

    const hasAccessToTakeAction = this.accessUtil.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.APPROVE,
    });

    // Check here for taking actions
    if (!hasAccessToTakeAction) {
      this.canViewActionTaken = false;
      return;
    }

    if (this.canTakeAction(this.financialData)) {
      this.setFormToTakeActionMode(this.isULBMillionPlus);
      this.canTakeApproveRejectAction = true;
    } else {
      this.canTakeApproveRejectAction = false;
    }
  }

  private setStateToReadMode() {
    console.warn("setting form to readME mode");
    this.waterWasteManagementForm.disable();
    this.solidWasteManagementForm.disable();
    this.millionPlusCitiesForm.disable();
    this.canUploadFile = false;
  }

  ngOnChanges() {
    this.createDataForms(this.financialData);
    if (this.financialData) this.populateFormDatas(this.financialData);
    this.checkULBMilionPlusStatus();
  }

  checkULBMilionPlusStatus() {
    let ulbId: string;
    if (this.financialData) ulbId = this.financialData.ulb;
    else {
      ulbId = this.loggedInUserDetails.ulb;
    }
    this._profileService.getULBGeneralData({ id: ulbId }).subscribe((res) => {
      try {
        this.isULBMillionPlus = res["data"][0].isMillionPlus;
        this.initializeAccessCheck();
      } catch (error) {
        console.error(error);
        this.isULBMillionPlus = false;
        this.initializeAccessCheck();
      }
    });
  }

  private populateFormDatas(data: IFinancialData) {
    this.solidWasteProfilledAnswers = {
      ...data.solidWasteManagement.documents,
    };
    this.millionPlusCitiesAnswers = data.millionPlusCities
      ? {
          ...data.millionPlusCities.documents,
        }
      : null;
  }

  showPreview() {
    this.solidWasteManagementForm.getRawValue();

    this.previewData = {
      ulb: this.loggedInUserDetails.ulb,
      ulbName: this.financialData ? this.financialData.ulbName : null,
      millionPlusCities: {
        documents:
          this.financialData && this.financialData.millionPlusCities
            ? this.financialData.millionPlusCities.documents
            : this.millionPlusCitiesForm.getRawValue(),
      },
      solidWasteManagement: {
        documents:
          this.financialData && this.financialData.solidWasteManagement
            ? this.financialData.solidWasteManagement.documents
            : this.solidWasteManagementForm.getRawValue(),
      },
      waterManagement:
        this.financialData && this.financialData.waterManagement
          ? this.financialData.waterManagement
          : this.waterWasteManagementForm.getRawValue(),
    };

    this._matDialog.open(this.previewPopup, {
      width: "85vw",
      maxHeight: "95vh",
      height: "fit-content",
      panelClass: "custom-warning-popup",

      disableClose: false,
    });
  }

  onSolidWasteEmit(event: SolidWasteEmitValue) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    if (this.financialData.solidWasteManagement) {
      solidWasterQuestions.forEach((question) => {
        const oldValue = this.financialData.solidWasteManagement.documents[
          question.key
        ];
        if (!oldValue || !oldValue.length) return;

        const isFileRemoved =
          event[question.key] && !event[question.key][0].name;
        if (isFileRemoved) {
          event[question.key][0]["status"] = oldValue[0].status;
          event[question.key][0]["rejectReason"] = oldValue[0].rejectReason;
        } else {
          if (!event[question.key]) {
            return;
          }
          event[question.key][0]["status"] = oldValue.length
            ? oldValue[0].status
            : "";
          event[question.key][0]["rejectReason"] = oldValue.length
            ? oldValue[0].rejectReason
            : "";
        }
      });
    }

    this.financialData.solidWasteManagement = {
      documents: this.jsonUtil.filterEmptyValue(event, true) as Required<
        SolidWasteEmitValue
      >,
    };
    this.solidWasteManagementForm.patchValue(
      this.jsonUtil.filterEmptyValue(event, true) || {}
    );
  }

  onMilionPlusCitiesEmitValue(event: MillionPlusCitiesDocuments) {
    if (!this.financialData) this.financialData = {} as IFinancialData;

    if (this.financialData.millionPlusCities) {
      millionPlusCitiesQuestions.forEach((question) => {
        const oldValue = this.financialData.millionPlusCities.documents[
          question.key
        ];
        if (!oldValue || !oldValue.length) return;

        const isFileRemoved =
          event[question.key] && !event[question.key][0].name;
        if (isFileRemoved) {
          event[question.key][0]["status"] = oldValue[0].status;
          event[question.key][0]["rejectReason"] = oldValue[0].rejectReason;
        } else {
          if (!event[question.key]) {
            return;
          }
          event[question.key][0]["status"] = oldValue.length
            ? oldValue[0].status
            : null;
          event[question.key][0]["rejectReason"] = oldValue.length
            ? oldValue[0].rejectReason
            : "";
        }
      });
    }

    this.millionPlusCitiesForm.patchValue(
      this.jsonUtil.filterEmptyValue(event, true) || {}
    );

    this.financialData.millionPlusCities = {
      documents: this.jsonUtil.filterEmptyValue(event, true) as typeof event,
    };
  }

  onWaterWasteManagementEmitValue(value: WaterManagement) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.waterManagement = { ...value };
  }

  saveAsDraft() {
    this.resetMessages();

    const body = {
      ulb: this.loggedInUserDetails.ulb,
      millionPlusCities: this.financialData
        ? this.financialData.millionPlusCities
        : null,
      solidWasteManagement: this.financialData
        ? this.financialData.solidWasteManagement
        : null,
      waterManagement: this.financialData
        ? this.financialData.waterManagement
        : null,
      isCompleted: false,
    };

    // body = new JSONUtility().filterEmptyValue(body, true) as typeof body;

    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",

      disableClose: true,
    });

    this.financialDataService.uploadFinancialData(body).subscribe(
      (res) => {
        this.draftSavingInProgess = false;
        this.successMessage = "Saved as Draft";
        setTimeout(() => this._matDialog.closeAll(), 3000);
      },
      (err) => {
        this.draftSavingInProgess = false;

        this.saveAsDraftFailMessge =
          err.error.message ||
          err.error.msg ||
          "Fail to save data. Please try after some time.";
        setTimeout(() => this._matDialog.closeAll(), 3000);
      }
    );
  }

  private resetMessages() {
    this.saveAsDraftFailMessge = null;
    this.draftSavingInProgess = true;
    this.successMessage = null;
  }

  uploadCompletedQuestionnaireData() {
    this.saveAsDraftFailMessge = null;
    this.isSubmitButtonClicked = true;
    if (this.userHasAlreadyFilledForm) {
      return;
    }
    try {
      this.validatorQuestionnaireForms();
    } catch (error) {
      console.error(error);
      return;
    }
    this.resetMessages();

    let body = {
      ulb: this.loggedInUserDetails.ulb,
      millionPlusCities: {
        documents: {
          ...this.millionPlusCitiesForm.getRawValue(),
          ...this.millionPlusCitiesForm.value,
        },
      },
      solidWasteManagement: {
        documents: {
          ...this.solidWasteManagementForm.getRawValue(),
          ...this.solidWasteManagementForm.value,
        },
      },
      waterManagement: {
        ...this.waterWasteManagementForm.getRawValue(),
        ...this.waterWasteManagementForm.value,
      },
      isCompleted: true,
    };

    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",
      disableClose: true,
    });
    body = new JSONUtility().filterEmptyValue(body, true) as typeof body;
    body.isCompleted = true;

    this.financialDataService.uploadFinancialData(body).subscribe(
      (res) => {
        this.draftSavingInProgess = false;
        this.successMessage = "Data Upload Complete.";
        window.history.back();
        // this._router.navigate(["user/data-upload/list"]);
        setTimeout(() => this._matDialog.closeAll(), 3000);
      },
      (err) => {
        this.draftSavingInProgess = false;
        this.saveAsDraftFailMessge =
          err.error.message ||
          err.error.msg ||
          "Fail to save data. Please try after some time.";
        setTimeout(() => this._matDialog.closeAll(), 3000);
      }
    );
  }

  /**
   * @description This method must be called only if the LoggedIn User has
   * access to APPORVE/REJECT form.
   */
  onSubmitApprovalActions() {
    this.saveAsDraftFailMessge = null;
    this.isSubmitButtonClicked = true;

    try {
      this.validateUserApprovalAction();
    } catch (error) {
      return console.error(error);
    }

    this.resetMessages();

    const body = {
      ulb: this.financialData.ulb,
      millionPlusCities: this.isULBMillionPlus
        ? { documents: this.millionPlusCitiesForm.getRawValue() }
        : null,
      solidWasteManagement: {
        documents: this.solidWasteManagementForm.getRawValue(),
      },
      waterManagement: this.waterWasteManagementForm.getRawValue(),
      isCompleted: true,
    };
    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",
      disableClose: true,
    });

    this.financialDataService
      .updateActionOnFinancialData(body, this.financialData._id)
      .subscribe(
        (res) => {
          this._matDialog.closeAll();
          window.history.back();
        },

        (err) => {
          this.draftSavingInProgess = false;
          this.saveAsDraftFailMessge =
            err.error.message ||
            err.error.msg ||
            "Fail to save data. Please try after some time.";
          setTimeout(() => this._matDialog.closeAll(), 3000);
        }
      );
  }

  /**
   * @description Validate whether the ULB has filled all the questions or not.
   * If not, then a popup will be show with the message.
   */
  validatorQuestionnaireForms() {
    let message = "";

    const isWasteWaterValid = this.waterWasteManagementForm.disabled
      ? true
      : this.waterWasteManagementForm.valid;
    const isSolidWasteValid = this.solidWasteManagementForm.disabled
      ? true
      : this.solidWasteManagementForm.valid;
    const isMillionPlusValid = this.isULBMillionPlus
      ? this.millionPlusCitiesForm.disabled
        ? true
        : this.millionPlusCitiesForm.valid
      : true;

    if (isWasteWaterValid && isSolidWasteValid && isMillionPlusValid) {
      return true;
    }

    if (!isWasteWaterValid) {
      message = "All questions must be answered in Water Waste Management";
      this.stepper.selectedIndex = 0;
    }

    if (!isSolidWasteValid) {
      message += message
        ? ", Solid Waste Management"
        : "All questions must be answered in Solid Waste Management";
      // this.stepper.selectedIndex = 1;
    }

    if (!isMillionPlusValid) {
      message += message
        ? " and Million Plus Cities sections."
        : "All questions must be answered in Million Plus Cities section.";
    }
    if (!isWasteWaterValid) {
      this.stepper.selectedIndex = 1;
    } else if (!isSolidWasteValid) {
      this.stepper.selectedIndex = 2;
    } else if (!isMillionPlusValid) {
      this.stepper.selectedIndex = 3;
    }

    message += " Kindly submit the form once completed.";
    this._matDialog.open(DialogComponent, {
      data: { ...this.defaultDailogConfiuration, message },
      width: "45vw",
      panelClass: "custom-warning-popup",
    });

    throw message;
  }

  /**
   * @description Validate whether the User (User who has access to APPROVE/REJECt form), has taken
   * action on all requried fields. If not, then a popup will be show with the message.
   */
  validateUserApprovalAction() {
    this.waterWasteManagementForm.updateValueAndValidity({
      onlySelf: false,
      emitEvent: true,
    });

    let message: string;
    if (
      (this.waterWasteManagementForm.disabled
        ? true
        : this.waterWasteManagementForm.valid) &&
      (this.solidWasteManagementForm.disabled
        ? true
        : this.solidWasteManagementForm.valid) &&
      (this.isULBMillionPlus
        ? this.millionPlusCitiesForm.disabled
          ? true
          : this.millionPlusCitiesForm.valid
        : true)
    ) {
      return true;
    }

    if (this.waterWasteManagementForm.invalid) {
      message =
        "You need to take approval action on all the questions in Water Waste Management";
      this.stepper.selectedIndex = 1;
    }
    if (this.solidWasteManagementForm.invalid) {
      if (!message) {
        message =
          "You need to take action on all the questions in Solid Waste Management";
        this.stepper.selectedIndex = 2;
      } else {
        message += " & Solid Waste Management";
      }
    }

    if (this.isULBMillionPlus && this.millionPlusCitiesForm.invalid) {
      if (!message) {
        message =
          "You need to take action on all the questions in Million Plus Cities";
        this.stepper.selectedIndex = 3;
      } else {
        message += " & Million Plus Cities";
      }
    }

    message +=
      ". Also It is mandatory to provide reason for every REJECTED field. Kindly submit the form once completed.";
    this._matDialog.open(DialogComponent, {
      data: { ...this.defaultDailogConfiuration, message },
      width: "45vw",
      panelClass: "custom-warning-popup",
    });
    throw message;
  }

  ngOnDestroy() {
    this._matDialog.closeAll();
    this.waterWasteManagementForm.enable();
    this.waterWasteManagementForm.reset();
    this.solidWasteManagementForm.reset();
    this.solidWasteManagementForm.enable();
    this.millionPlusCitiesForm.reset();
    this.millionPlusCitiesForm.enable();
  }
}
