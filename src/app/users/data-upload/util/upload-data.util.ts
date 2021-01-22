import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { control } from 'leaflet';
import { USER_TYPE } from 'src/app/models/user/userType';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { UPLOAD_STATUS } from 'src/app/util/enums';
import { UserUtility } from 'src/app/util/user/user';

import { milliomPlusCitiesForm } from '../components/configs/million-plus-cities';
import { solidWasteForm } from '../components/configs/solid-waste-management';
import { waterWasteManagementForm } from '../components/configs/water-waste-management';
import { IFinancialData } from '../models/financial-data.interface';

export class UploadDataUtility {
  protected readonly accessUtil = new AccessChecker();
  protected readonly userUtil = new UserUtility();

  protected readonly formBuilder = new FormBuilder();

  protected waterWasteManagementForm: FormGroup;
  protected solidWasteManagementForm: FormGroup;
  protected millionPlusCitiesForm: FormGroup;

  constructor() {}

  createDataForms(data?: IFinancialData) {
    this.waterWasteManagementForm = this.createWasteWaterUploadForm(data);
    this.solidWasteManagementForm = this.createSolidWasteUploadForm(data);
    this.millionPlusCitiesForm = this.createMillionPlusUploadForm(data);
  }

  canTakeAction(request?: IFinancialData) {
    const canTake = this.accessUtil.hasAccess({
      action: ACTIONS.APPROVE,
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
    });

    if (!canTake) return false;
    if (!request) return canTake;
    const loggedInUserType = this.userUtil.getUserType();
    switch (loggedInUserType) {
      case USER_TYPE.STATE: {
        if (request.actionTakenByUserRole !== USER_TYPE.ULB) return false;
        if (!request.isCompleted) return false;
        return true;
      }
      case USER_TYPE.MoHUA: {
        if (request.actionTakenByUserRole !== USER_TYPE.STATE) return false;
        if (!request.isCompleted) return false;
        if (request.status === UPLOAD_STATUS.REJECTED) return false;
        return true;
      }
      default:
        return false;
    }
  }

  setFormToTakeActionMode(isULBMillionPlus: boolean) {
    this.setWasteWaterToTakeActionMode();
    this.setSolidWasteManagementToTakeActionMode();
    this.setMillionPlusToTakeActionMode(isULBMillionPlus);
  }

  public setFormToCorrectionMode(data: IFinancialData) {
    if (!data) return;
    if (
      data.status !== UPLOAD_STATUS.REJECTED &&
      !JSON.stringify(data).includes(`${UPLOAD_STATUS.REJECTED}`)
    ) {
      return console.error(
        "Form data must be rejected to set in correction mode"
      );
    }
    console.warn("settig to correct mode");
    this.setWasteWaterToCorrectionMode(data);
    this.setSolidWasteToCorrectionMode(data);
    this.setMillionToCorrectionMode(data);
  }

  private setWasteWaterToCorrectionMode(data: IFinancialData) {
    if (!data || !data.waterManagement) return;

    Object.keys(data.waterManagement).forEach((key) => {
      if (!data.waterManagement[key].status) return;
      if (data.waterManagement[key].status === UPLOAD_STATUS.APPROVED) {
        this.waterWasteManagementForm.controls[key].disable();
        return;
      }
      if (!this.waterWasteManagementForm.controls[key]) return;

      (this.waterWasteManagementForm.controls[
        key
      ] as FormGroup).controls.status.disable();
      (this.waterWasteManagementForm.controls[
        key
      ] as FormGroup).controls.rejectReason.disable();
    });
  }

  private setSolidWasteToCorrectionMode(data: IFinancialData) {
    if (!data || !data.solidWasteManagement) return;
    Object.keys(this.solidWasteManagementForm.controls).forEach((key) => {
      const question = this.solidWasteManagementForm.controls[key] as FormArray;
      question.controls.forEach((fileControl: FormGroup) => {
        if (fileControl.controls.status.value === UPLOAD_STATUS.REJECTED) {
          fileControl.controls.status.disable();
          fileControl.controls.rejectReason.disable();
          return;
        }
        fileControl.disable();
      });
    });
  }

  private setMillionToCorrectionMode(data: IFinancialData) {
    if (!data || !data.millionPlusCities) return;
    Object.keys(this.millionPlusCitiesForm.controls).forEach((key) => {
      const question = this.millionPlusCitiesForm.controls[key] as FormArray;
      question.controls.forEach((fileControl: FormGroup) => {
        if (fileControl.controls.status.value === UPLOAD_STATUS.REJECTED) {
          fileControl.controls.status.disable();
          fileControl.controls.rejectReason.disable();
          return;
        }
        fileControl.disable();
      });
    });
  }

  private setWasteWaterToTakeActionMode() {
    Object.keys(this.waterWasteManagementForm.controls).forEach(
      (controlKey) => {
        const service = this.waterWasteManagementForm.controls[
          controlKey
        ] as FormGroup;

        const statusControl = service.controls["status"];
        const rejectReasonControl = service.controls["rejectReason"];
        if (!statusControl) return;

        statusControl.setValidators([
          Validators.required,
          Validators.pattern(
            `${UPLOAD_STATUS.APPROVED}|${UPLOAD_STATUS.REJECTED}`
          ),
        ]);
        rejectReasonControl.setValidators([
          this.addRejectValidator(statusControl, rejectReasonControl),
        ]);

        if (statusControl.value === UPLOAD_STATUS.APPROVED) {
          /**
           * State / MoHUA can change the status of already approved fields.
           * If we have to restrict it, then uncomment the following code.
           */
          // statusControl.disable();
          // rejectReasonControl.disable();
          // return;
        }
        statusControl.enable();
        rejectReasonControl.enable();
      }
    );
  }

  private setSolidWasteManagementToTakeActionMode() {
    Object.keys(this.solidWasteManagementForm.controls).forEach(
      (controlKey) => {
        const formArray = this.solidWasteManagementForm.controls[
          controlKey
        ] as FormArray;
        formArray.controls.forEach((fileGroup: FormGroup) => {
          const statusControl = fileGroup.controls.status;
          const rejectReasonControl = fileGroup.controls["rejectReason"];
          statusControl.setValidators([
            Validators.required,
            Validators.pattern(
              `${UPLOAD_STATUS.APPROVED}|${UPLOAD_STATUS.REJECTED}`
            ),
          ]);
          rejectReasonControl.setValidators([
            this.addRejectValidator(statusControl, rejectReasonControl),
          ]);

          /**
           * State / MoHUA can change the status of already approved fields.
           * If we have to restrict it, then uncomment the following code.
           */
          // if (statusControl.value === UPLOAD_STATUS.APPROVED) {
          //   statusControl.disable();
          //   rejectReasonControl.disable();
          //   return;
          // }

          statusControl.enable();
          rejectReasonControl.enable();
        });
      }
    );
  }

  private setMillionPlusToTakeActionMode(isULBMillionPlus: boolean) {
    if (!isULBMillionPlus) {
      this.millionPlusCitiesForm.clearValidators();
      this.millionPlusCitiesForm.clearAsyncValidators();
    }

    Object.keys(this.millionPlusCitiesForm.controls).forEach((controlKey) => {
      const formArray = this.millionPlusCitiesForm.controls[
        controlKey
      ] as FormArray;
      formArray.controls.forEach((fileGroup: FormGroup) => {
        const statusControl = fileGroup.controls.status;
        const rejectReasonControl = fileGroup.controls["rejectReason"];
        statusControl.setValidators([
          Validators.required,
          Validators.pattern(
            `${UPLOAD_STATUS.APPROVED}|${UPLOAD_STATUS.REJECTED}`
          ),
        ]);
        rejectReasonControl.setValidators([
          this.addRejectValidator(statusControl, rejectReasonControl),
        ]);

        /**
         * State / MoHUA can change the status of already approved fields.
         * If we have to restrict it, then uncomment the following code.
         */
        // if (statusControl.value === UPLOAD_STATUS.APPROVED) {
        //   statusControl.disable();
        //   rejectReasonControl.disable();
        //   return;
        // }

        statusControl.enable();
        rejectReasonControl.enable();
      });
    });
  }

  addRejectValidator(statusControl: AbstractControl, rejectControl?: any) {
    /**
     * IMPORTANT Due to somereason, when the status value is set to
     * APPROVE, then the rejectReason validator is not running. To overcome
     * it, we need to manually update the value of rejectRreason for it.
     */
    statusControl.valueChanges.subscribe((newValue) => {
      if (rejectControl) {
        rejectControl.updateValueAndValidity({
          onlySelf: true,
        });
      }
    });
    return (control: AbstractControl) => {
      if (statusControl.value !== UPLOAD_STATUS.REJECTED) return null;
      if (control.value && control.value.trim()) return null;
      return { required: true };
    };
  }

  createWasteWaterUploadForm(data?: IFinancialData) {
    const newForm = this.formBuilder.group({
      ...waterWasteManagementForm.controls,
    });
    if (!data) return newForm;
    newForm.patchValue({ ...data.waterManagement });

    return newForm;
  }

  createSolidWasteUploadForm(data?: IFinancialData) {
    const newForm = this.formBuilder.group({
      ...solidWasteForm.controls,
    });
    if (!data) return newForm;
    newForm.patchValue({ ...data.solidWasteManagement.documents });

    return newForm;
  }

  createMillionPlusUploadForm(data?: IFinancialData) {
    const newForm = this.formBuilder.group({
      ...milliomPlusCitiesForm.controls,
    });
    if (!data) return newForm;
    if (data.millionPlusCities && data.millionPlusCities.documents) {
      newForm.patchValue({ ...data.millionPlusCities.documents });
    }

    return newForm;
  }
}
