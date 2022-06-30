import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-detailed-utilization-report",
  templateUrl: "./detailed-utilization-report.component.html",
  styleUrls: ["./detailed-utilization-report.component.scss"],
})
export class DetailedUtilizationReportComponent implements OnInit {
  constructor() {}
  durForm;
  ulbName = "Nimbahera Municipality";
  grantType = "Tied";
  ngOnInit(): void {}
}
