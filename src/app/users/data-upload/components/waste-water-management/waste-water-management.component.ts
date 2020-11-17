import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UPLOAD_STATUS } from 'src/app/util/enums';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { IFinancialData, WaterManagement, WaterManagementDocuments } from '../../models/financial-data.interface';
import { services, targets, wasteWaterDucmentQuestions } from '../configs/water-waste-management';

@Component({
  selector: "app-waste-water-management",
  templateUrl: "./waste-water-management.component.html",
  styleUrls: ["./waste-water-management.component.scss"],
})
export class WasteWaterManagementComponent implements OnInit, OnChanges {
  constructor(
    protected dataEntryService: DataEntryService,
    protected _dialog: MatDialog
  ) {
    // super(dataEntryService, _dialog);
  }

  @Input()
  form: FormGroup;

  @Input()
  isSubmitButtonClick = false;

  @Input()
  isDataPrefilled = false;

  @Input()
  canTakeApproveAction = false;

  @Input()
  canSeeApproveActionTaken = false;

  @Input()
  canUploadFile = false;

  @Output()
  saveAsDraft = new EventEmitter<WaterManagement>();
  @Output()
  outputValues = new EventEmitter<WaterManagement>();

  @Output()
  showNext = new EventEmitter<WaterManagement>();
  @Output()
  previous = new EventEmitter<WaterManagement>();

  USER_TYPE = USER_TYPE;

  approveAction = UPLOAD_STATUS.APPROVED;
  rejectAction = UPLOAD_STATUS.REJECTED;

  actionNames = {
    [this.approveAction]: "Approve",
    [this.rejectAction]: "Reject",
  };

  targets = targets;

  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;

  wasterWaterQuestion = wasteWaterDucmentQuestions;

  prefilledDocuments: WaterManagementDocuments;

  jsonUtil = new JSONUtility();

  ngOnInit() {}

  ngOnChanges(changes) {
    if (this.isDataPrefilled && changes.isDataPrefilled) {
      this.populateFormDatas();
    }
    if (this.form) this.initializeForm();
  }

  onSaveAsDraftClick() {
    this.saveAsDraft.emit(this.form.value);
  }

  onSolidWasteEmit(value: WaterManagementDocuments) {
    let patchValue;
    if (this.prefilledDocuments) {
      patchValue = { ...this.prefilledDocuments };
      if (patchValue.wasteWaterPlan) {
        patchValue.wasteWaterPlan[0] = {
          ...patchValue.wasteWaterPlan[0],
          ...value.wasteWaterPlan[0],
        };
      } else {
        patchValue.wasteWaterPlan = value.wasteWaterPlan;
      }
    } else {
      this.prefilledDocuments = { ...value };
      patchValue = { ...this.prefilledDocuments };
    }
    this.form.controls.documents.reset();
    this.form.controls.documents.patchValue({ ...patchValue });
    console.log(`patchValue`, patchValue);
    console.log(`documetValue`, value);
    this.emitValues(this.form.getRawValue());
  }

  onBlur(control: AbstractControl) {
    if (!control) return;
    const newValue = this.jsonUtil.convert(control.value);
    control.patchValue(newValue);
    this.emitValues(this.form.getRawValue());
  }

  private populateFormDatas() {
    if (!this.isDataPrefilled) return;
    this.prefilledDocuments = {
      wasteWaterPlan: this.jsonUtil.filterOutEmptyArray(
        this.form.getRawValue().documents.wasteWaterPlan
      ),
    };
  }

  private emitValues(values: IFinancialData["waterManagement"]) {
    if (values) {
      if (
        values.documents.wasteWaterPlan &&
        !this.jsonUtil.filterOutEmptyArray(values.documents.wasteWaterPlan)
      ) {
        values.documents.wasteWaterPlan = [];
      }
    }
    console.log("value emitting by waste water", values);
    this.outputValues.emit(values);
  }

  private initializeForm() {
    // this.form.valueChanges
    //   .pipe(debounceTime(100))
    //   .subscribe((values) => this.outputValues.emit(values));
  }
}
