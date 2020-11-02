import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_TYPE } from 'src/app/models/user/userType';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
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
    console.log(`re quest`, request);
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

  setFormToTakeActionMode() {
    this.setWasteWaterToTakeActionMode();
    this.setSolidWasteManagementToTakeActionMode();
    this.setMillionPlusToTakeActionMode();
  }

  private setWasteWaterToTakeActionMode() {
    console.log(this.waterWasteManagementForm);
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
          Validators.pattern(`${ACTIONS.APPROVE}|${ACTIONS.REJECT}`),
        ]);
        rejectReasonControl.setValidators(
          this.addRejectValidator(statusControl)
        );

        statusControl.enable();
        rejectReasonControl.enable();
      }
    );
  }

  private setSolidWasteManagementToTakeActionMode() {
    // console.log("solidWaste", this.solidWasteManagementForm);
  }

  private setMillionPlusToTakeActionMode() {}

  addRejectValidator(statusControl: AbstractControl) {
    return (control: AbstractControl) => {
      console.log(
        "statusControl control",
        statusControl.value,
        `reject cotnrol`,
        control.value
      );
      if (statusControl.value !== ACTIONS.REJECT) return null;
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
    newForm.patchValue({ ...data.solidWasteManagement });

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
