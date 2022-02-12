import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-mpc-table",
  templateUrl: "./mpc-table.component.html",
  styleUrls: ["./mpc-table.component.scss"],
})
export class MpcTableComponent implements OnInit {
  mpcTableData = [
    {
      state: "Andhra Pradesh",
      gtc: "No",
      audited: "0%",
      provisional: "0%",
      submitted: "0%",
      detail_utilization: "0%",
      slb: "",
      water_sanitaion: "",
      action_plan: "",
      mou: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Arunachal Pradesh",
      gtc: "No",
      audited: "0%",
      provisional: "0%",
      submitted: "0%",
      detail_utilization: "0%",
      slb: "",
      water_sanitaion: "",
      action_plan: "",
      mou: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Assam",
      gtc: "No",
      audited: "0%",
      provisional: "0%",
      submitted: "0%",
      detail_utilization: "0%",
      slb: "",
      water_sanitaion: "",
      action_plan: "",
      mou: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Bihar",
      gtc: "No",
      audited: "0%",
      provisional: "0%",
      submitted: "0%",
      detail_utilization: "0%",
      slb: "",
      water_sanitaion: "",
      action_plan: "",
      mou: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Chattisgarh",
      gtc: "Yes",
      audited: "0%",
      provisional: "0%",
      submitted: "0%",
      detail_utilization: "0%",
      slb: "",
      water_sanitaion: "",
      action_plan: "",
      mou: "",
      mpcEligibility: "yes",
      claimed_data: "",
      status: "Under review by MoF",
    },
    {
      state: "Goa",
      gtc: "Yes",
      audited: "0%",
      provisional: "0%",
      submitted: "0%",
      detail_utilization: "0%",
      slb: "",
      water_sanitaion: "",
      action_plan: "",
      mou: "",
      mpcEligibility: "Yes",
      claimed_data: "",
      status: "Grant released",
    },
    {
      state: "Gujarat",
      gtc: "Yes",
      audited: "0%",
      provisional: "0%",
      submitted: "0%",
      detail_utilization: "0%",
      slb: "",
      water_sanitaion: "",
      action_plan: "",
      mou: "",
      mpcEligibility: "Yes",
      claimed_data: "",
      status: "Grant released",
    },
  ];

  @Output()
  closeDialog = new EventEmitter();

  constructor() {}

  closeModal() {
    this.closeDialog.emit(true);
  }
  ngOnInit(): void {}
}
