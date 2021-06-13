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

  uas = [];
  data = null;
  test = false;
  project = projectExcute;
  fund = sourceFund;
  year = yearOutlay;

  constructor() {
    this.fillUas();
  }

  columnDefs = col1;
  columnDefs1 = col2;
  columnDefs2 = col3;

  addRow() {
    this.test = true;
    setTimeout(() => {
      this.test = false;
    });
  }

  ngOnInit(): void {
    this.load();
  }

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
      this.data.uaData.push(temp);
    }
  }

  fillUas() {
    for (const key in this.uasData) {
      this.uas.push(this.uasData[key]);
    }
  }

  foldCard(i) {
    this.data.uaData[i].fold = !this.data.uaData[i].fold;
  }
}

const input = {
  ua: "",
  name: "",
  projectExcute: [
    {
      code: "",
      name: "",
      details: "",
      cost: "",
      exAgency: "",
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
    },
  ],
  yearOutlay: [
    {
      code: "",
      name: "",
      cost: "",
      funding: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
  fold: false,
};

const projectExcute = {
  code: "",
  name: "",
  details: "",
  cost: "",
  exAgency: "",
  sector: "",
  type: "",
  esOutcome: "",
};

const sourceFund = {
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
};

const yearOutlay = {
  code: "",
  name: "",
  cost: "",
  funding: "",
  "2021-22": "",
  "2022-23": "",
  "2023-24": "",
  "2024-25": "",
  "2025-26": "",
};

const col1 = [
  {
    headerName: "S No",
    width: 70,
    pinned: true,
    field: "index",
  },
  { headerName: "Project Code", width: 150, editable: true, field: "code" },
  {
    headerName: "Project Name",
    width: 120,
    editable: true,
    pinned: true,
    field: "name",
    cellEditor: "agTextCellEditor",
    cellEditorParams: {
      maxLength: "50",
    },
  },
  {
    headerName: "Project Details",
    width: 150,
    editable: true,
    field: "details",
    cellEditor: "agLargeTextCellEditor",
    cellEditorParams: {
      maxLength: "300",
      cols: "50",
      rows: "6",
    },
  },
  { headerName: "Project Cost", width: 150, editable: true, field: "cost" },
  {
    headerName: "Executing Agency",
    width: 150,
    editable: true,
    field: "exAgency",
  },
  { headerName: "Sector", width: 150, editable: true, field: "sector" },
  {
    headerName: "Project Type",
    width: 150,
    editable: true,
    field: "type",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["English", "Spanish", "French", "Portuguese", "(other)"],
    },
  },
  {
    headerName: "Estimated Outcome",
    width: 160,
    editable: true,
    field: "esOutcome",
  },
];
const col2 = [
  {
    headerName: "S No",
    width: 70,
    pinned: true,
    field: "index",
  },
  { headerName: "Project Code", width: 150, field: "code" },
  {
    headerName: "Project Name",
    width: 120,
    pinned: true,
    field: "name",
    cellEditor: "agTextCellEditor",
    cellEditorParams: {
      maxLength: "50",
    },
  },
  { headerName: "Project Cost", width: 150, field: "cost" },

  { headerName: "15th FC", width: 100, editable: true, field: "fc" },
  { headerName: "JJM", width: 100, editable: true, field: "jjm" },
  { headerName: "SBM 2.0", width: 100, editable: true, field: "sbm" },
  {
    headerName: "Other Central Schemes",
    width: 180,
    editable: true,
    field: "centalScheme",
  },
  {
    headerName: "State Schemes",
    width: 150,
    editable: true,
    field: "stateScheme",
  },
  {
    headerName: "State Gov Grants",
    width: 150,
    editable: true,
    field: "stateGrant",
  },
  { headerName: "ULB", width: 100, editable: true, field: "ulb" },
  { headerName: "Other", width: 100, editable: true, field: "other" },
  { headerName: "Total", width: 100, editable: true, field: "total" },
];
const col3 = [
  {
    headerName: "S No",
    width: 70,
    pinned: true,
    field: "index",
  },
  { headerName: "Project Code", width: 150, field: "code" },
  {
    headerName: "Project Name",
    width: 120,
    pinned: true,
    field: "name",
    cellEditor: "agTextCellEditor",
    cellEditorParams: {
      maxLength: "50",
    },
  },
  { headerName: "Project Cost", width: 150, field: "cost" },

  { headerName: "% Funding", width: 150, editable: true, field: "funding" },
  { headerName: "FY 2021-22", width: 150, editable: true, field: "2021-22" },
  { headerName: "FY 2022-23", width: 150, editable: true, field: "2022-23" },
  {
    headerName: "FY 2023-24",
    width: 150,
    editable: true,
    field: "2023-24",
  },
  {
    headerName: "FY 2024-25",
    width: 150,
    editable: true,
    field: "2024-25",
  },
  {
    headerName: "FY 2025-26",
    width: 150,
    editable: true,
    field: "2025-26",
  },
];
