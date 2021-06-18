import { Component, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { ActionplanserviceService } from "./actionplanservice.service";
import { StateformsService } from "../stateforms.service";
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
  yearCode = "2021-22";
  ulbNames = {};
  saveBtnText = "NEXT";
  uaCodes = {};
  constructor(
    public stateformsService: StateformsService,
    public actionplanserviceService: ActionplanserviceService
  ) {}

  ngOnInit(): void {
    this.stateformsService.getulbDetails().subscribe(
      (res) => {
        console.log(res["data"]);
        res["data"].forEach((element) => {
          this.ulbNames[element._id] = element.ulbName;
          this.ulbNames[element.ulbName] = element._id;
        });
        console.log(this.ulbNames);
        this.load();
      },
      (err) => {}
    );
    for (const key in this.uasData) {
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      this.uaCodes[key] = code;
    }
  }

  load() {
    this.actionplanserviceService.getFormData().subscribe(
      (res) => {
        console.log(res["data"], "sss");
        this.data = {
          state: res["data"].state,
          design_year: res["data"]["design_year"],
          uaData: res["data"]["uaData"],
          status: res["data"]["status"],
          isDraft: res["data"]["isDraft"],
        };
        this.addKeys(this.data);
      },
      (err) => {
        this.onFail();
      }
    );
  }

  addKeys(data) {
    data.uaData.forEach((element) => {
      for (let i = 0; i < element.projectExecute.length; i++) {
        element.projectExecute[i].index = i + 1;
        element.sourceFund[i].index = i + 1;
        element.yearOutlay[i].index = i + 1;
      }
      element.name = this.uasData[element.ua]["name"];
      element.ulbList = this.uasData[element.ua]["ulb"];
      let newList = [];
      element.ulbList.forEach((e) => {
        newList.push(this.ulbNames[e]);
      });
      element.ulbList = newList;
      element.code = this.uaCodes[element.ua];
    });

    data.uaData.forEach((element) => {
      let temp = [];
      element.projectExecute.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.projectExecute[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.projectExecute = temp;
      temp = [];
      element.sourceFund.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.sourceFund[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.sourceFund = temp;
      temp = [];
      element.yearOutlay.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.yearOutlay[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.yearOutlay = temp;
    });
    console.log(this.data);
  }

  onFail() {
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
      for (let index = 1; index <= temp.projectExecute.length; index++) {
        temp.projectExecute[index - 1].code.value = code + "/" + index;
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

  submit() {
    let newUaData = [];
    this.data.uaData.forEach((element) => {
      let Uas = JSON.parse(JSON.stringify(output));
      Uas.ua = element.ua;
      let temp = [];
      element.projectExecute.forEach((e) => {
        let pro = Uas.projectExecute[0];
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.projectExecute = temp;
      temp = [];
      element.sourceFund.forEach((e) => {
        let pro = Uas.sourceFund[0];
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.sourceFund = temp;
      temp = [];
      element.yearOutlay.forEach((e) => {
        let pro = Uas.yearOutlay[0];
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.yearOutlay = temp;
      newUaData.push(Uas);
    });
    console.log(newUaData);
    this.data.uaData = newUaData;
    this.actionplanserviceService.postFormData(this.data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onPreview() {}

  getDataFromGrid(data, index) {
    // console.log(this.data, "sssssssssssssssssssss");
    // this.data.uasData[index] = data;
  }
}

const input = {
  ua: { value: "", isValidating: false, lastValidation: true },
  name: { value: "", isValidating: false, lastValidation: true },
  projectExecute: [
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

const output = {
  ua: "",
  projectExecute: [
    {
      code: "",
      name: "",
      details: "",
      cost: "",
      exAgency: "",
      paraAgency: "",
      sector: "",
      type: "",
      esOutcome: "",
    },
  ],
  sourceFund: [
    {
      code: "",
      name: "",
      cost: "",
      fc: "",
      jjm: "",
      sbm: "",
      centalScheme: "",
      stateScheme: "",
      stateGrant: "",
      ulb: "",
      other: "",
      total: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
  yearOutlay: [
    {
      code: "",
      name: "",
      cost: "",
      funding: "",
      amount: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
};
