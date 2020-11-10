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

  private setWasteWaterToTakeActionMode() {
    // this.waterWasteManagementForm.valueChanges.subscribe((value) => {
    //   console.log(this.waterWasteManagementForm);
    // });
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

        statusControl.enable();
        rejectReasonControl.enable();
      }
    );

    const formArray = (this.waterWasteManagementForm.controls
      .documents as FormGroup).controls.wasteWaterPlan as FormArray;
    formArray.controls.forEach((question: FormGroup) => {
      const statusControl = question.controls["status"];
      const rejectReasonControl = question.controls["rejectReason"];
      statusControl.setValidators([
        Validators.required,
        Validators.pattern(
          `${UPLOAD_STATUS.APPROVED}|${UPLOAD_STATUS.REJECTED}`
        ),
      ]);
      rejectReasonControl.setValidators([
        this.addRejectValidator(statusControl, rejectReasonControl),
      ]);

      statusControl.enable();
      rejectReasonControl.enable();
    });
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
    newForm.patchValue({ ...data.millionPlusCities });

    return newForm;
  }
}
