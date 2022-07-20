import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-error-display",
  templateUrl: "./error-display.component.html",
  styleUrls: ["./error-display.component.scss"],
})
export class ErrorDisplayComponent implements OnInit {
  constructor() {}

  @Input() formControlSec;
  @Input() fName;
  @Input() errorType;
  @Input() patternError;
  ngOnInit(): void {
    console.log("form control error", this.formControlSec);
  }
}
