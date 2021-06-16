import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { EventEmitter } from "@angular/core";
import { CustomizedCellComponent } from "./customized-cell/customized-cell.component";
import { CustomTooltipComponent } from "./custom-tooltip/custom-tooltip.component";
import { CustomizedHeaderComponent } from "./customized-header/customized-header.component";
@Component({
  selector: "app-ag-grid",
  templateUrl: "./ag-grid.component.html",
  styleUrls: ["./ag-grid.component.scss"],
})
export class AgGridComponent implements OnInit, OnChanges {
  constructor() {}
  @ViewChild("agGrid1") agGrid1: AgGridAngular;
  @ViewChild("agGrid2") agGrid2: AgGridAngular;
  @ViewChild("agGrid3") agGrid3: AgGridAngular;
  @Input()
  rowData;
  @Input()
  ulbList;

  frameworkComponents;

  project = [
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["index"].value,
      headerName: "S No",
      width: 70,
      pinned: true,
      field: "index",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["code"].value,
      headerName: "Project Code",
      width: 180,
      editable: false,
      pinned: true,
      tooltipField: "code",
      tooltipComponent: "customTooltip",
      field: "code",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["name"].value,
      valueSetter: syncValueSetter(name),
      headerName: "Project Name",
      width: 120,
      editable: true,
      pinned: true,
      tooltipField: "name",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "name",
      cellEditor: "agTextCellEditor",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["cost"].value,
      valueSetter: syncValueSetter(number),
      headerName: "Project Cost",
      width: 120,
      editable: true,
      pinned: true,
      tooltipField: "cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "cost",
      valueParser: "Number(newValue)",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["details"].value,
      valueSetter: syncValueSetter(Area),
      headerName: "Project Details",
      width: 150,
      editable: true,
      tooltipField: "details",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Value less than 200 char" },
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
      valueGetter: (params) => params.data["exAgency"].value,
      valueSetter: syncValueSetter(name),
      headerName: "Executing Agency",
      width: 150,
      editable: true,
      tooltipField: "exAgency",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "exAgency",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["English", "Spanish", "French", "Portuguese", "(other)"],
      },
    },
    {
      cellRenderer: "customizedCell",
      headerName: "Name of Parastatal Agency",
      width: 190,
      editable: true,
      field: "paraAgency",
      cellEditor: "agTextCellEditor",
      hide: true,
      tooltipField: "paraAgency",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      valueGetter: (params) => params.data["paraAgency"].value,
      valueSetter: syncValueSetter(name),
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["sector"].value,
      valueSetter: syncValueSetter(dropDown),
      headerName: "Sector",
      width: 290,
      editable: true,
      tooltipField: "sector",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Select one" },
      field: "sector",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Augmentation of existing infrastructure",
          "Any ongoing projects under existing schemes",
          "New project",
          "Replacing of existing infrastructure",
        ],
      },
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["type"].value,
      valueSetter: syncValueSetter(Area),
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
      valueGetter: (params) => params.data["esOutcome"].value,
      valueSetter: syncValueSetter(Area),
      headerName: "Estimated Outcome",
      width: 160,
      editable: true,
      tooltipField: "esOutcome",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "esOutcome",
      cellEditor: "agLargeTextCellEditor",
      cellEditorParams: {
        maxLength: "300",
        cols: "50",
        rows: "6",
      },
    },
  ];
  fund = [
    {
      cellRenderer: "customizedCell",

      valueGetter: (params) => params.data["index"].value,
      headerName: "S No",
      width: 70,
      pinned: true,
      field: "index",
    },
    {
      cellRenderer: "customizedCell",

      valueGetter: (params) => params.data["code"].value,
      headerName: "Project Code",
      pinned: true,
      width: 180,
      tooltipField: "code",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "code",
    },
    {
      cellRenderer: "customizedCell",

      valueGetter: (params) => params.data["name"].value,
      valueSetter: syncValueSetter(name),
      headerName: "Project Name",
      width: 120,
      pinned: true,
      tooltipField: "name",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      tooltipComponent: "customTooltip",
      field: "name",
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: "50",
      },
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["cost"].value,
      valueSetter: syncValueSetter(number),
      headerName: "Project Cost",
      width: 120,
      pinned: true,
      tooltipField: "cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Name less than 50 charValue should be number & Greater than 0",
      },
      field: "cost",
      valueParser: "Number(newValue)",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["fc"].value,
      valueSetter: syncValueSetter(number),
      headerName: "15th FC",
      width: 100,
      editable: true,
      tooltipField: "fc",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "fc",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["jjm"].value,
      valueSetter: syncValueSetter(number),
      headerName: "JJM",
      width: 100,
      editable: true,
      tooltipField: "jjm",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "jjm",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["sbm"].value,
      valueSetter: syncValueSetter(number),
      headerName: "SBM 2.0",
      width: 100,
      editable: true,
      tooltipField: "sbm",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "sbm",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["centalScheme"].value,
      valueSetter: syncValueSetter(number),
      headerName: "Other Central Schemes",
      width: 180,
      editable: true,
      tooltipField: "centalScheme",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "centalScheme",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["stateScheme"].value,
      valueSetter: syncValueSetter(number),
      headerName: "State Schemes",
      width: 150,
      editable: true,
      tooltipField: "stateScheme",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "stateScheme",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["stateGrant"].value,
      valueSetter: syncValueSetter(number),
      headerName: "State Gov Grants",
      width: 150,
      editable: true,
      tooltipField: "stateGrant",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "stateGrant",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["ulb"].value,
      valueSetter: syncValueSetter(number),
      headerName: "ULB",
      width: 100,
      editable: true,
      tooltipField: "ulb",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "ulb",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["other"].value,
      valueSetter: syncValueSetter(number),
      headerName: "Other",
      width: 100,
      editable: true,
      tooltipField: "other",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "other",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => {
        let data = params.data;
        let val = 0;
        for (const key in data) {
          if (fundAutoFill.includes(key)) {
            if (!isNaN(data[key].value)) {
              val += data[key].value;
            }
          }
        }
        syncValidator(val, Total, _onSuccess(params), _onFail(params), params);
        return val;
      },
      valueSetter: syncValueSetter(Total),
      headerName: "Total",
      width: 100,
      editable: false,
      tooltipField: "total",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be equal to project cost",
      },
      field: "total",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2021-22"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2021-22",
      width: 150,
      editable: true,
      tooltipField: "2021-22",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2021-22",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2022-23"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2022-23",
      width: 150,
      editable: true,
      tooltipField: "2022-23",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2022-23",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2023-24"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2023-24",
      width: 150,
      editable: true,
      tooltipField: "2023-24",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2023-24",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2024-25"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2024-25",
      width: 150,
      editable: true,
      tooltipField: "2024-25",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2024-25",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2025-26"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2025-26",
      width: 150,
      editable: true,
      tooltipField: "2025-26",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2025-26",
    },
  ];
  year = [
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["index"].value,
      headerName: "S No",
      width: 70,
      pinned: true,
      field: "index",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["code"].value,
      headerName: "Project Code",
      pinned: true,
      width: 180,
      tooltipField: "code",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "code",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["name"].value,
      valueSetter: syncValueSetter(name),
      headerName: "Project Name",
      width: 120,
      pinned: true,
      tooltipField: "name",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "name",
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: "50",
      },
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["cost"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "Project Cost",
      width: 120,
      pinned: true,
      tooltipField: "cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "cost",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["funding"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "% Funding",
      width: 150,
      editable: true,
      tooltipField: "funding",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "funding",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2021-22"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2021-22",
      width: 150,
      editable: true,
      tooltipField: "2021-22",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2021-22",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2022-23"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2022-23",
      width: 150,
      editable: true,
      tooltipField: "2022-23",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2022-23",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2023-24"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2023-24",
      width: 150,
      editable: true,
      tooltipField: "2023-24",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2023-24",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2024-25"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2024-25",
      width: 150,
      editable: true,
      tooltipField: "2024-25",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2024-25",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) => params.data["2025-26"].value,
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "FY 2025-26",
      width: 150,
      editable: true,
      tooltipField: "2025-26",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be a number & Greater than 0",
      },
      field: "2025-26",
    },
  ];

  ngOnInit(): void {
    if (!this.ulbList.includes("Parastatal Agency"))
      this.ulbList.push("Parastatal Agency");
    this.project[5].cellEditorParams.values = this.ulbList;

    this.frameworkComponents = {
      customizedCell: CustomizedCellComponent,
      agColumnHeader: CustomizedHeaderComponent,
      customTooltip: CustomTooltipComponent,
    };
  }

  cellValueChanged(e) {
    if (e.colDef.field == "exAgency") {
      if (e.value == "Parastatal Agency")
        this.agGrid1.columnApi.setColumnVisible("paraAgency", true);
      else this.agGrid1.columnApi.setColumnVisible("paraAgency", false);
    }
    if (e.colDef.field == "cost" || e.colDef.field == "name") {
      this.autoSetNames(e);
    }
  }

  fundValueChanges(e) {}

  autoSetNames(e) {
    this.rowData.sourceFund[e.rowIndex][e.colDef.field].value = e.value;
    this.agGrid2.api.applyTransaction({ update: this.rowData.sourceFund });
    this.rowData.yearOutlay[e.rowIndex][e.colDef.field].value = e.value;
    this.agGrid3.api.applyTransaction({ update: this.rowData.yearOutlay });
  }

  ngOnChanges() {}

  addRow() {
    let s = this.agGrid1.api.getDisplayedRowCount();
    let obj = JSON.parse(JSON.stringify(input.projectExcute));
    obj[0].index.value = s + 1;
    obj[0].code.value = this.rowData.code + "/" + obj[0].index.value;
    this.agGrid1.api.applyTransaction({ add: [obj[0]] });
    this.rowData.projectExcute.push(obj[0]);

    s = this.agGrid2.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(input.sourceFund));
    obj[0].index.value = s + 1;
    obj[0].code.value = this.rowData.code + "/" + obj[0].index.value;

    this.agGrid2.api.applyTransaction({ add: [obj[0]] });
    this.rowData.sourceFund.push(obj[0]);

    s = this.agGrid3.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(input.yearOutlay));
    obj[0].index.value = s + 1;
    obj[0].code.value = this.rowData.code + "/" + obj[0].index.value;

    this.agGrid3.api.applyTransaction({ add: [obj[0]] });
    this.rowData.yearOutlay.push(obj[0]);
  }
}

const fundAutoFill = [
  "fc",
  "jjm",
  "sbm",
  "centalScheme",
  "stateScheme",
  "stateGrant",
  "ulb",
  "other",
];

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

const Area = (x) => x.length < 201;
const Total = (x, param) => {
  console.log(
    param.data.cost.value,
    parseInt(x),
    param.data.cost >= parseInt(x)
  );

  return param.data.cost.value >= parseInt(x);
};
const dropDown = (x) => {
  if (x.length < 1) return false;
  else return true;
};
const name = (x) => {
  if (typeof x == "string") {
    return x.length > 0 && x.length < 26;
  }
  return false;
};
const number = (x) => {
  if (typeof x == "number" && x > 0 && x < 999999999) {
    return true;
  }
  return false;
};
const _onSuccess = (params) => () => {
  let data = params.data;
  let field = params.colDef.field;
  data[field] = {
    ...data[field],
    isValidating: false,
    lastValidation: true,
    value: params.newValue,
  };
  params.api.applyTransaction({ update: [data] });
};

const _onFail = (params) => () => {
  let data = params.data;
  let field = params.colDef.field;
  data[field] = {
    ...data[field],
    isValidating: false,
    lastValidation: params.newValue,
    value: params.newValue,
  };
  params.api.applyTransaction({ update: [data] });
};

const syncValidator = (newValue, validateFn, onSuccess, _onFail, params) => {
  debugger;
  if (validateFn(newValue, params)) {
    onSuccess();
  } else {
    _onFail();
  }
};

const syncValueSetter = (validateFn) => (params) => {
  syncValidator(
    params.newValue,
    validateFn,
    _onSuccess(params),
    _onFail(params),
    params
  );
  return false;
};
