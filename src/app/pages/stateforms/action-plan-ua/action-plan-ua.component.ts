import { Component, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
@Component({
  selector: "app-action-plan-ua",
  templateUrl: "./action-plan-ua.component.html",
  styleUrls: ["./action-plan-ua.component.scss"],
})
export class ActionPlanUAComponent implements OnInit {
  uasData = JSON.parse(sessionStorage.getItem("UasList"));
  Year = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));

  data = null;

  constructor() {}

  ngOnInit(): void {
    this.load();
  }

  yearCode = "2021-22";

  load() {
    this.data = {
      state: this.userData.state,
      design_year: this.Year["2021-22"],
      uaData: [],
      status: null,
      isDraft: null,
    };
    for (const key in this.uasData) {
      let temp = JSON.parse(JSON.stringify(input));
      temp.ua = key;
      temp.name = this.uasData[key].name;
      temp.ulbList = this.uasData[key].ulb;
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      temp.code = code;
      for (let index = 1; index <= temp.projectExcute.length; index++) {
        temp.projectExcute[index - 1].code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.sourceFund.length; index++) {
        temp.sourceFund[index - 1].code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.yearOutlay.length; index++) {
        temp.yearOutlay[index - 1].code.value = code + "/" + index;
      }
      this.data.uaData.push(temp);
    }
  }

  foldCard(i) {
    this.data.uaData[i].fold = !this.data.uaData[i].fold;
  }
}

const input = {
  ua: { value: "", isValidating: false, lastValidation: true },
  name: { value: "", isValidating: false, lastValidation: true },
  projectExcute: [
    {
      index: { value: 1, isValidating: false, lastValidation: true },
      code: { value: "", isValidating: false, lastValidation: true },
      name: { value: "", isValidating: false, lastValidation: true },
      details: { value: "", isValidating: false, lastValidation: true },
      cost: { value: "", isValidating: false, lastValidation: true },
      exAgency: { value: "", isValidating: false, lastValidation: true },
      paraAgency: { value: "", isValidating: false, lastValidation: true },
      sector: { value: "", isValidating: false, lastValidation: true },
      type: { value: "", isValidating: false, lastValidation: true },
      esOutcome: { value: "", isValidating: false, lastValidation: true },
    },
  ],
  sourceFund: [
    {
      index: { value: 1, isValidating: false, lastValidation: true },
      code: { value: "", isValidating: false, lastValidation: true },
      name: { value: "", isValidating: false, lastValidation: true },
      cost: { value: "", isValidating: false, lastValidation: true },
      fc: { value: "", isValidating: false, lastValidation: true },
      jjm: { value: "", isValidating: false, lastValidation: true },
      sbm: { value: "", isValidating: false, lastValidation: true },
      centalScheme: { value: "", isValidating: false, lastValidation: true },
      stateScheme: { value: "", isValidating: false, lastValidation: true },
      stateGrant: { value: "", isValidating: false, lastValidation: true },
      ulb: { value: "", isValidating: false, lastValidation: true },
      other: { value: "", isValidating: false, lastValidation: true },
      total: { value: "", isValidating: false, lastValidation: true },
      "2021-22": { value: "", isValidating: false, lastValidation: true },
      "2022-23": { value: "", isValidating: false, lastValidation: true },
      "2023-24": { value: "", isValidating: false, lastValidation: true },
      "2024-25": { value: "", isValidating: false, lastValidation: true },
      "2025-26": { value: "", isValidating: false, lastValidation: true },
    },
  ],
  yearOutlay: [
    {
      index: { value: 1, isValidating: false, lastValidation: true },
      code: { value: "", isValidating: false, lastValidation: true },
      name: { value: "", isValidating: false, lastValidation: true },
      cost: { value: "", isValidating: false, lastValidation: true },
      funding: { value: "", isValidating: false, lastValidation: true },
      amount: { value: "", isValidating: false, lastValidation: true },
      "2021-22": { value: "", isValidating: false, lastValidation: true },
      "2022-23": { value: "", isValidating: false, lastValidation: true },
      "2023-24": { value: "", isValidating: false, lastValidation: true },
      "2024-25": { value: "", isValidating: false, lastValidation: true },
      "2025-26": { value: "", isValidating: false, lastValidation: true },
    },
  ],
  fold: false,
  code: { value: "", isValidating: false, lastValidation: true },
};
