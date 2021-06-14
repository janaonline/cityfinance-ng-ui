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
  template = { projectExcute, sourceFund, yearOutlay };
  columnDefs = { project, fund, year };
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
      let code = localStorage.getItem("state_code");
      code += this.uasData[key]?.code ?? "UA";
      code += this.yearCode;
      temp.code = code;
      for (let index = 1; index <= temp.projectExcute.length; index++) {
        temp.projectExcute[index - 1].code = code + index;
      }
      for (let index = 1; index <= temp.sourceFund.length; index++) {
        temp.sourceFund[index - 1].code = code + index;
      }
      for (let index = 1; index <= temp.yearOutlay.length; index++) {
        temp.yearOutlay[index - 1].code = code + index;
      }
      this.data.uaData.push(temp);
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
      index: 1,
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
      index: 1,
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
      index: 1,
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
  code: "",
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

const project = [
  {
    cellRenderer: "customizedCell",
    headerName: "S No",
    width: 70,
    pinned: true,
    field: "index",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Project Code",
    width: 150,
    editable: false,
    pinned: true,
    field: "code",
  },
  {
    cellRenderer: "customizedCell",
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
    cellRenderer: "customizedCell",
    headerName: "Project Cost",
    width: 150,
    editable: true,
    pinned: true,
    field: "cost",
    valueParser: "Number(newValue)",
  },
  {
    cellRenderer: "customizedCell",
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
  {
    cellRenderer: "customizedCell",
    headerName: "Executing Agency",
    width: 150,
    editable: true,
    field: "exAgency",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Sector",
    width: 150,
    editable: true,
    field: "sector",
  },
  {
    cellRenderer: "customizedCell",
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
    cellRenderer: "customizedCell",
    headerName: "Estimated Outcome",
    width: 160,
    editable: true,
    field: "esOutcome",
  },
];
const fund = [
  {
    cellRenderer: "customizedCell",
    headerName: "S No",
    width: 70,
    pinned: true,
    field: "index",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Project Code",
    pinned: true,
    width: 150,
    field: "code",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Project Name",
    width: 120,
    pinned: true,
    field: "name",
    cellEditor: "agTextCellEditor",
    cellEditorParams: {
      maxLength: "50",
    },
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Project Cost",
    width: 150,
    pinned: true,
    field: "cost",
  },

  {
    cellRenderer: "customizedCell",
    headerName: "15th FC",
    width: 100,
    editable: true,
    field: "fc",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "JJM",
    width: 100,
    editable: true,
    field: "jjm",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "SBM 2.0",
    width: 100,
    editable: true,
    field: "sbm",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Other Central Schemes",
    width: 180,
    editable: true,
    field: "centalScheme",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "State Schemes",
    width: 150,
    editable: true,
    field: "stateScheme",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "State Gov Grants",
    width: 150,
    editable: true,
    field: "stateGrant",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "ULB",
    width: 100,
    editable: true,
    field: "ulb",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Other",
    width: 100,
    editable: true,
    field: "other",
    aggFunc: "sum",
    valueParser: "Number(newValue)",
    filter: "agNumberColumnFilter",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Total",
    width: 100,
    editable: false,
    field: "total",
    valueGetter:
      "data.fc + data.jjm + data.sbm + data.centalScheme + data.stateScheme + data.stateGrant + data.ulb + data.other",
    aggFunc: "sum",
  },
];
const year = [
  {
    cellRenderer: "customizedCell",
    headerName: "S No",
    width: 70,
    pinned: true,
    field: "index",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Project Code",
    pinned: true,
    width: 150,
    field: "code",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Project Name",
    width: 120,
    pinned: true,
    field: "name",
    cellEditor: "agTextCellEditor",
    cellEditorParams: {
      maxLength: "50",
    },
  },
  {
    cellRenderer: "customizedCell",
    headerName: "Project Cost",
    width: 150,
    pinned: true,
    field: "cost",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "% Funding",
    width: 150,
    editable: true,
    field: "funding",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "FY 2021-22",
    width: 150,
    editable: true,
    field: "2021-22",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "FY 2022-23",
    width: 150,
    editable: true,
    field: "2022-23",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "FY 2023-24",
    width: 150,
    editable: true,
    field: "2023-24",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "FY 2024-25",
    width: 150,
    editable: true,
    field: "2024-25",
  },
  {
    cellRenderer: "customizedCell",
    headerName: "FY 2025-26",
    width: 150,
    editable: true,
    field: "2025-26",
  },
];
