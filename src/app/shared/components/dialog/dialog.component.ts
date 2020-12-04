import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { IDialogConfiguration } from './models/dialogConfiguration';

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogConfiguration
  ) {}

  ngOnInit() {}

  onButtonClick(buttonClicked: keyof IDialogConfiguration["buttons"] | "ok") {
    if (buttonClicked === "ok") {
      return this.dialogRef.close({ buttonClicked });
    }

    if (this.data.buttons && this.data.buttons[buttonClicked].callback) {
      this.data.buttons[buttonClicked].callback();
    }
    this.dialogRef.close({ buttonClicked });
  }
}
