import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatHorizontalStepper } from '@angular/material/stepper';
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
  WaterManagement
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
export class FinancialUploadsComponent extends UploadDataUtility
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
  completedMessage: string;

  ngOnInit() {
    this.initializeCompletedMessage();
  }

  Years = JSON.parse(localStorage.getItem("Years"));

  private initializeCompletedMessage() {
    switch (this.loggedInUserDetails.role) {
      case USER_TYPE.ULB:
        this.completedMessage = `This is the last step. After submitting this application, you will not be able to change your response. Do you want to submit?`;
        break;
      case USER_TYPE.ADMIN:
      case USER_TYPE.STATE:
        this.completedMessage = `This is the last step. After submitting this review, you will not be able to change your response. Do you want to submit?`;
    }
  }

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
      console.warn("setting canViewActionTaken to true");
      if (
        this.financialData.status === UPLOAD_STATUS.REJECTED ||
        JSON.stringify(this.financialData).includes(`${UPLOAD_STATUS.REJECTED}`)
      ) {
        console.warn("setting canViewActionTaken to true");
        this.canViewActionTaken = true;
      }
      if (
        (this.financialData.status === UPLOAD_STATUS.REJECTED ||
          JSON.stringify(this.financialData).includes(
            `${UPLOAD_STATUS.REJECTED}`
          )) &&
        this.loggedInUserDetails.role === USER_TYPE.ULB
      ) {
        this.setFormToCorrectionMode(this.financialData);
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
      ...this.financialData,
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
      panelClass: "XVfc-preview",

      disableClose: false,
    });
  }

  onSolidWasteEmit(event: SolidWasteEmitValue) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    if (
      this.financialData.solidWasteManagement &&
      this.financialData.solidWasteManagement.documents
    ) {
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
    if (
      !event.garbageFreeCities ||
      !event.garbageFreeCities.length ||
      !event.garbageFreeCities[0].name
    ) {
      this.solidWasteManagementForm.controls.garbageFreeCities.reset();
    }
    if (
      !event.waterSupplyCoverage ||
      !event.waterSupplyCoverage.length ||
      !event.waterSupplyCoverage[0].name
    ) {
      this.solidWasteManagementForm.controls.waterSupplyCoverage.reset();
    }

    this.solidWasteManagementForm.patchValue(
      this.jsonUtil.filterEmptyValue(event, true) || {}
    );
  }

  onMilionPlusCitiesEmitValue(event: MillionPlusCitiesDocuments) {
    if (!this.financialData) this.financialData = {} as IFinancialData;

    if (
      this.financialData.millionPlusCities &&
      this.financialData.millionPlusCities.documents
    ) {
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

    if (!event.cityPlan || !event.cityPlan.length || !event.cityPlan[0].name) {
      if (this.solidWasteManagementForm.controls.cityPlan) {
        this.solidWasteManagementForm.controls.cityPlan.reset();
      }
    }
    if (
      !event.serviceLevelPlan ||
      !event.serviceLevelPlan.length ||
      !event.serviceLevelPlan[0].name
    ) {
      if (this.solidWasteManagementForm.controls.serviceLevelPlan) {
        this.solidWasteManagementForm.controls.serviceLevelPlan.reset();
      }
    }

    if (
      !event.solidWastePlan ||
      !event.solidWastePlan.length ||
      !event.solidWastePlan[0].name
    ) {
      if (this.solidWasteManagementForm.controls.solidWastePlan) {
        this.solidWasteManagementForm.controls.solidWastePlan.reset();
      }
    }

    if (
      !event.waterBalancePlan ||
      !event.waterBalancePlan.length ||
      !event.waterBalancePlan[0].name
    ) {
      if (this.solidWasteManagementForm.controls.waterBalancePlan) {
        this.solidWasteManagementForm.controls.waterBalancePlan.reset();
      }
    }

    this.financialData.millionPlusCities = {
      documents: this.jsonUtil.filterEmptyValue(event, true) as typeof event,
    };
    this.millionPlusCitiesForm.patchValue(
      this.jsonUtil.filterEmptyValue(event, true) || {}
    );
  }

  onWaterWasteManagementEmitValue(value: WaterManagement) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.waterManagement = { ...value };
  }

  saveAsDraft() {
    this.resetMessages();
    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",

      disableClose: true,
    });
    if (this.canUploadFile) {
      this.initiateDraftByULB();
    } else if (this.canTakeApproveRejectAction) {
      this.initiateDraftByStateAndMoHUA();
    } else {
      return console.error(
        "LoggedIn user has neither acccess to Form Filling nor access to take action on form."
      );
    }
  }

  private initiateDraftByStateAndMoHUA() {
    const body = this.createDataForApprovalInDraftMode();
    return this.financialDataService
      .updateActionOnXVFcFormData(body, this.financialData._id)
      .subscribe(
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

  private initiateDraftByULB() {
    const body: Partial<IFinancialData> = {
      ulb: this.financialData.ulb,
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
      design_year: this.Years["2020-21"]
    };

    return this.financialDataService.uploadXVFcFormData(body).subscribe(
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

  /**
   * @description This method is called when ULB has completed filling / correcting
   * the data, and doing final submit.
   */
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
      ulb: this.financialData.ulb,
      millionPlusCities:
        this.financialData &&
        this.financialData.millionPlusCities &&
        this.financialData._id
          ? { ...this.financialData.millionPlusCities }
          : this.financialData.millionPlusCities && this.financialData._id
          ? { ...this.financialData.millionPlusCities }
          : {
              documents: {
                ...this.millionPlusCitiesForm.getRawValue(),
                ...this.millionPlusCitiesForm.value,
              },
            },
      solidWasteManagement:
        this.financialData &&
        this.financialData.solidWasteManagement &&
        this.financialData._id
          ? { ...this.financialData.solidWasteManagement }
          : {
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

    body = new JSONUtility().filterEmptyValue(body, true) as typeof body;
    body.isCompleted = true;
    this.removeRejectionFromData(body as IFinancialData);
    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",
      disableClose: true,
    });

    this.financialDataService.uploadXVFcFormData(body).subscribe(
      (res) => {
        this.draftSavingInProgess = false;
        this.successMessage = "Data Upload Complete.";
        if (this.loggedInUserDetails.role === USER_TYPE.ULB) {
          this._router.navigate(["/fc_grant"]);
        } else {
          this._router.navigate(["user/xvform/list"]);
        }
        // window.history.back();
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

  removeRejectionFromData(data: IFinancialData) {
    if (!data) return;
    if (!data.solidWasteManagement) return;
    if (!data.solidWasteManagement.documents) return;
    Object.keys(data.solidWasteManagement.documents).forEach((questionKey) => {
      data.solidWasteManagement.documents[questionKey].forEach((document) => {
        if (document.status === UPLOAD_STATUS.REJECTED) {
          document.status = null;
          document.rejectReason = null;
        }
      });
    });
    if (!data.millionPlusCities) return;
    if (!data.millionPlusCities.documents) return;
    Object.keys(data.millionPlusCities.documents).forEach((questionKey) => {
      data.millionPlusCities.documents[questionKey].forEach((document) => {
        if (document.status === UPLOAD_STATUS.REJECTED) {
          document.status = null;
          document.rejectReason = null;
        }
      });
    });
  }

  private createDataForApprovalInDraftMode() {
    return {
      ulb: this.financialData.ulb,
      millionPlusCities: this.isULBMillionPlus
        ? { documents: this.millionPlusCitiesForm.getRawValue() }
        : null,
      solidWasteManagement: {
        documents: this.solidWasteManagementForm.getRawValue(),
      },
      waterManagement: this.waterWasteManagementForm.getRawValue(),
      isCompleted: false,
    };
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

    const body = this.createDataForApprovalInDraftMode();
    body.isCompleted = true;
    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",
      disableClose: true,
    });

    const postActionMessage = this.getPostActionTakenMessage(
      body ? JSON.stringify(body).includes(`${UPLOAD_STATUS.REJECTED}`) : false
    );

    const defaultDailogConfiuration: IDialogConfiguration = {
      message: postActionMessage,
      buttons: {
        confirm: {
          text: "OK",
          callback: () => {
            this._router.navigate(["/user/xvform/list"]);
          },
        },
      },
    };

    this.financialDataService
      .updateActionOnXVFcFormData(body, this.financialData._id)
      .subscribe(
        (res) => {
          this._matDialog.closeAll();
          return this._matDialog.open(DialogComponent, {
            data: defaultDailogConfiuration,
          });
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

  getPostActionTakenMessage(rejectedAnyField: boolean) {
    let message;
    switch (this.loggedInUserDetails.role) {
      case USER_TYPE.STATE:
        message =
          `Intimation over email has been sent to the ULB` +
          (rejectedAnyField ? "." : " & MoHUA.");
        break;
      case USER_TYPE.MoHUA:
        message = `Intimation over email has been sent to the ULB & State`;
        break;
    }

    return `<span style="fon-size: 1.5rem">${message}</span>`;
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
      message = "All questions must be answered in Service Level Indicators";
      this.stepper.selectedIndex = 0;
    }

    if (!isSolidWasteValid) {
      message += message
        ? ", Upload Plans"
        : "All questions must be answered in Upload Plans";
      // this.stepper.selectedIndex = 1;
    }

    if (!isMillionPlusValid) {
      message += message
        ? " and Upload Plans(Million+ City) sections."
        : "All questions must be answered in Upload Plans(Million+ City) section.";
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
