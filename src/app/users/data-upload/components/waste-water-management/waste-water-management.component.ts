import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ACTIONS } from 'src/app/util/access/actions';

import { WaterManagement, WaterManagementDocuments } from '../../models/financial-data.interface';
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

  approveAction = ACTIONS.APPROVE;
  rejectAction = ACTIONS.REJECT;

  targets = targets;

  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;

  APPROVE_ACTION = ACTIONS.APPROVE;
  REJECT_ACTION = ACTIONS.REJECT;

  wasterWaterQuestion = wasteWaterDucmentQuestions;

  prefilledDocuments: WaterManagementDocuments;

  ngOnInit() {}

  ngOnChanges(changes) {
    if (this.isDataPrefilled) this.populateFormDatas();
    if (this.form) this.initializeForm();
  }

  onSaveAsDraftClick() {
    this.saveAsDraft.emit(this.form.value);
  }

  onSolidWasteEmit(value: WaterManagementDocuments) {
    this.form.controls.documents.patchValue({ ...value });
  }

  private populateFormDatas() {
    if (!this.isDataPrefilled) return;
    this.prefilledDocuments = this.form.getRawValue().documents;
  }

  private initializeForm() {
    this.form.valueChanges
      .pipe(debounceTime(100))
      .subscribe((values) => this.outputValues.emit(values));
  }
}
