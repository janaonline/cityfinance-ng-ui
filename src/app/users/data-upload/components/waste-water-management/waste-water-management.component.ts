import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { WaterManagement, WaterManagementDocuments } from '../../models/financial-data.interface';
import {
  services,
  targets,
  wasteWaterDucmentQuestions,
  waterWasteManagementForm,
} from '../configs/water-waste-management';

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
    this.initializeForm();
  }
  @Input()
  isSubmitButtonClick = false;

  @Input()
  isDataPrefilled = false;

  @Output()
  saveAsDraft = new EventEmitter<WaterManagement>();
  @Output()
  outputValues = new EventEmitter<WaterManagement>();

  @Output()
  showNext = new EventEmitter<WaterManagement>();
  @Output()
  previous = new EventEmitter<WaterManagement>();

  USER_TYPE = USER_TYPE;

  targets = targets;

  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;

  waterWasteManagementForm = waterWasteManagementForm;

  wasterWaterQuestion = wasteWaterDucmentQuestions;

  prefilledDocuments: WaterManagementDocuments;

  jsonUtil = new JSONUtility();

  ngOnInit() {}

  ngOnChanges(changes) {
    if (this.isDataPrefilled) this.populateFormDatas();
  }

  onSaveAsDraftClick() {
    this.saveAsDraft.emit(waterWasteManagementForm.value);
  }

  onSolidWasteEmit(value: WaterManagementDocuments) {
    waterWasteManagementForm.controls.documents.patchValue({ ...value });
  }

  onBlur(control: AbstractControl) {
    if (!control) return;
    const newValue = this.jsonUtil.convert(control.value);
    control.patchValue(newValue);
  }

  private populateFormDatas() {
    if (!this.isDataPrefilled) return;
    this.prefilledDocuments = waterWasteManagementForm.getRawValue().documents;
  }

  private initializeForm() {
    this.waterWasteManagementForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe((values) => this.outputValues.emit(values));
  }
}
