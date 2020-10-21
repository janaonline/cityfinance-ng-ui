import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';

import { WaterManagement } from '../../models/financial-data.interface';
import { services, targets, waterWasteManagementForm } from '../configs/water-waste-management';
import { DocumentsUploadComponent } from '../documents-upload/documents-upload.component';

@Component({
  selector: "app-waste-water-management",
  templateUrl: "./waste-water-management.component.html",
  styleUrls: ["./waste-water-management.component.scss"],
})
export class WasteWaterManagementComponent
  extends DocumentsUploadComponent<any>
  implements OnInit {
  targets = targets;

  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;

  waterWasteManagementForm = waterWasteManagementForm;

  constructor(
    protected dataEntryService: DataEntryService,
    protected _dialog: MatDialog
  ) {
    super(dataEntryService, _dialog);
  }

  ngOnInit() {
    console.log(this.waterWasteManagementForm);
  }

  private initializeForm() {}
}
