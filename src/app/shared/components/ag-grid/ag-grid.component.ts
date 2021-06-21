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
  @Input()
  catList;

  @Output()
  gridData = new EventEmitter();

  frameworkComponents;

  project = [
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["index"].value != null ? params.data["index"].value : "",
      headerName: "S No",
      width: 50,
      pinned: true,
      field: "index",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["code"].value != null ? params.data["code"].value : "",
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
      valueGetter: (params) =>
        params.data["name"].value != null ? params.data["name"].value : "",
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
      valueGetter: (params) =>
        params.data["cost"].value != null ? params.data["cost"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "Project Cost",
      width: 100,
      editable: true,
      pinned: true,
      tooltipField: "cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "cost",
      valueParser: "Number(newValue)",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["details"].value != null
          ? params.data["details"].value
          : "",
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
      valueGetter: (params) =>
        params.data["exAgency"].value != null
          ? params.data["exAgency"].value
          : "",
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
      valueGetter: (params) =>
        params.data["paraAgency"].value != null
          ? params.data["paraAgency"].value
          : "",
      valueSetter: syncValueSetter(name),
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["sector"].value != null ? params.data["sector"].value : "",
      valueSetter: syncValueSetter(dropDown),
      headerName: "Sector",
      width: 200,
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
      valueGetter: (params) =>
        params.data["type"].value != null ? params.data["type"].value : "",
      valueSetter: syncValueSetter(Area),
      headerName: "Project Type",
      width: 150,
      editable: true,
      field: "type",
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
      valueGetter: (params) =>
        params.data["esOutcome"].value != null
          ? params.data["esOutcome"].value
          : "",
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

      valueGetter: (params) =>
        params.data["index"].value != null ? params.data["index"].value : "",
      headerName: "S No",
      width: 70,
      pinned: true,
      field: "index",
    },
    {
      cellRenderer: "customizedCell",

      valueGetter: (params) =>
        params.data["code"].value != null ? params.data["code"].value : "",
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

      valueGetter: (params) =>
        params.data["name"].value != null ? params.data["name"].value : "",
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
      valueGetter: (params) =>
        params.data["cost"].value != null ? params.data["cost"].value : "",
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
      valueGetter: (params) =>
        params.data["fc"].value != null ? params.data["fc"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "15th FC",
      width: 100,
      editable: true,
      tooltipField: "fc",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "fc",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["jjm"].value != null ? params.data["jjm"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "JJM",
      width: 100,
      editable: true,
      tooltipField: "jjm",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "jjm",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["sbm"].value != null ? params.data["sbm"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "SBM 2.0",
      width: 100,
      editable: true,
      tooltipField: "sbm",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "sbm",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["centalScheme"].value != null
          ? params.data["centalScheme"].value
          : "",
      valueSetter: syncValueSetter(number),
      headerName: "Other Central Schemes",
      width: 180,
      editable: true,
      tooltipField: "centalScheme",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "centalScheme",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["stateScheme"].value != null
          ? params.data["stateScheme"].value
          : "",
      valueSetter: syncValueSetter(number),
      headerName: "State Schemes",
      width: 150,
      editable: true,
      tooltipField: "stateScheme",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "stateScheme",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["stateGrant"].value != null
          ? params.data["stateGrant"].value
          : "",
      valueSetter: syncValueSetter(number),
      headerName: "State Gov Grants",
      width: 150,
      editable: true,
      tooltipField: "stateGrant",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "stateGrant",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["ulb"].value != null ? params.data["ulb"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "ULB",
      width: 100,
      editable: true,
      tooltipField: "ulb",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "ulb",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["other"].value != null ? params.data["other"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "Other",
      width: 100,
      editable: true,
      tooltipField: "other",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "other",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["total"].value != null ? params.data["total"].value : "",
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
      valueGetter: (params) =>
        params.data["2021-22"].value != null
          ? params.data["2021-22"].value
          : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "Number(newValue)",
      headerName: "FY 2021-22",
      width: 150,
      editable: true,
      tooltipField: "2021-22",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2021-22",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2022-23"].value != null
          ? params.data["2022-23"].value
          : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "Number(newValue)",
      headerName: "FY 2022-23",
      width: 150,
      editable: true,
      tooltipField: "2022-23",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2022-23",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2023-24"].value != null
          ? params.data["2023-24"].value
          : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "Number(newValue)",
      headerName: "FY 2023-24",
      width: 150,
      editable: true,
      tooltipField: "2023-24",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2023-24",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2024-25"].value != null
          ? params.data["2024-25"].value
          : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "Number(newValue)",
      headerName: "FY 2024-25",
      width: 150,
      editable: true,
      tooltipField: "2024-25",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2024-25",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2025-26"].value != null
          ? params.data["2025-26"].value
          : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "Number(newValue)",
      headerName: "FY 2025-26",
      width: 150,
      editable: true,
      tooltipField: "2025-26",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2025-26",
    },
  ];
  year = [
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["index"].value != null ? params.data["index"].value : "",
      headerName: "S No",
      width: 70,
      pinned: true,
      field: "index",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["code"].value != null ? params.data["code"].value : "",
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
      valueGetter: (params) =>
        params.data["name"].value != null ? params.data["name"].value : "",
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
      valueGetter: (params) =>
        params.data["cost"].value != null ? params.data["cost"].value : "",
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "Project Cost",
      width: 120,
      pinned: true,
      tooltipField: "cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "cost",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["funding"].value != null
          ? params.data["funding"].value
          : "",
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "% Funding",
      width: 150,
      editable: false,
      tooltipField: "funding",
      tooltipComponent: "customTooltip",
      field: "funding",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["amount"].value != null ? params.data["amount"].value : "",
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "Amount",
      width: 150,
      editable: false,
      tooltipField: "amount",
      tooltipComponent: "customTooltip",
      field: "amount",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2021-22"].value != null
          ? params.data["2021-22"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "Number(newValue)",
      headerName: "FY 2021-22",
      width: 150,
      editable: true,
      tooltipField: "2021-22",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2021-22",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2022-23"].value != null
          ? params.data["2022-23"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "Number(newValue)",
      headerName: "FY 2022-23",
      width: 150,
      editable: true,
      tooltipField: "2022-23",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2022-23",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2023-24"].value != null
          ? params.data["2023-24"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "Number(newValue)",
      headerName: "FY 2023-24",
      width: 150,
      editable: true,
      tooltipField: "2023-24",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2023-24",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2024-25"].value != null
          ? params.data["2024-25"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "Number(newValue)",
      headerName: "FY 2024-25",
      width: 150,
      editable: true,
      tooltipField: "2024-25",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2024-25",
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["2025-26"].value != null
          ? params.data["2025-26"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "Number(newValue)",
      headerName: "FY 2025-26",
      width: 150,
      editable: true,
      tooltipField: "2025-26",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg:
          "Value should be a number / Greater than 0 / less than project cost",
      },
      field: "2025-26",
    },
  ];

  ngOnInit(): void {
    if (!this.ulbList.includes("Parastatal Agency"))
      this.ulbList.push("Parastatal Agency");
    this.project[5].cellEditorParams.values = this.ulbList;
    
    this.project[7].cellEditorParams.values = this.catList;

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
    this.gridData.emit(this.rowData);
  }

  fundValueChanges(e) {
    if (e.colDef.field == "fc") {
      this.autoSetNames(e, true);
    }
    if (fundAutoFill.includes(e.colDef.field)) {
      let data = e.data;
      let val = 0;
      for (const key in data) {
        if (fundAutoFill.includes(key)) {
          if (!isNaN(data[key].value) && data[key].value != "") {
            val += data[key].value;
          }
        }
      }
      if (e.data.cost.value == "") e.data.cost = 0;
      if (e.data.cost.value < val) e.data.total.lastValidation = val;
      else e.data.total.lastValidation = true;
      e.data.total.value = val;
      e.api.refreshCells({ columns: ["total"] });
    }
    this.gridData.emit(this.rowData);
  }

  yearValueChanges(e) {
    this.gridData.emit(this.rowData);
  }

  autoSetNames(e, fromFund = null) {
    if (fromFund) {
      this.rowData.yearOutlay[e.rowIndex]["amount"].value = e.value;
      this.rowData.yearOutlay[e.rowIndex]["funding"].value = parseInt(
        (
          (e.value / this.rowData.yearOutlay[e.rowIndex]["cost"].value) *
          100
        ).toFixed(2)
      );
      this.agGrid3.api.applyTransaction({ update: this.rowData.yearOutlay });
    } else {
      this.rowData.sourceFund[e.rowIndex][e.colDef.field].value = e.value;
      this.agGrid2.api.applyTransaction({ update: this.rowData.sourceFund });
      this.rowData.yearOutlay[e.rowIndex][e.colDef.field].value = e.value;
      this.agGrid3.api.applyTransaction({ update: this.rowData.yearOutlay });
    }
  }

  ngOnChanges() {}

  addRow() {
    let s = this.agGrid1.api.getDisplayedRowCount();
    let obj = JSON.parse(JSON.stringify(input.projectExecute));
    obj[0].index.value = s + 1;
    obj[0].code.value = this.rowData.code + "/" + obj[0].index.value;
    this.agGrid1.api.applyTransaction({ add: [obj[0]] });
    this.rowData.projectExecute.push(obj[0]);

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

const years = ["2021-22", "2022-23", "2023-24", "2024-25", "2025-26"];

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

const Area = (x) => x.length < 201;
const Total = (x, param) => {
  if (param.data.cost.value == "") {
    param.data.cost.value = 0;
  }
  return param.data.cost.value >= parseInt(x);
};
const dropDown = (x) => {
  if (x.length < 1) return false;
  else return true;
};
const name = async (x) => {
  if (typeof x == "string") {
    return x.length > 0 && x.length < 26;
  }
  return false;
};

const number = (x, params) => {
  if (typeof x == "number" && x > 0 && x < 999999999) {
    if (params.colDef.field == "cost") return true;
    return x < params.data.cost.value;
  }
  return false;
};

const checkYear = (x, param) => {
  debugger;
  let data = param.data;
  let val = 0;
  let count = 0;
  for (const key in data) {
    if (years.includes(key)) {
      if (
        !isNaN(data[key].value) &&
        data[key].value != "" &&
        param.colDef.field != key
      ) {
        count++;
        val += data[key].value;
      }
    }
  }
  val += x;
  let cost = param.data.cost?.value;
  if (count == 4) {
    return cost == val;
  }
  return val <= (cost ? cost : 0);
};

const checkYear2 = (x, param) => {
  let data = param.data;
  let val = 0;
  let count = 0;
  for (const key in data) {
    if (years.includes(key)) {
      if (
        !isNaN(data[key].value) &&
        data[key].value != "" &&
        param.colDef.field != key
      ) {
        count++;
        val += data[key].value;
      }
    }
  }
  val += x;
  let cost = param.data.amount.value;
  if (count == 4) {
    return cost == val;
  }
  return val <= (cost ? cost : 0);
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
