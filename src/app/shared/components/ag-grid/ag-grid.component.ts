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
  constructor() { }
  @ViewChild("agGrid1") agGrid1: AgGridAngular;
  @ViewChild("agGrid2") agGrid2: AgGridAngular;
  @ViewChild("agGrid3") agGrid3: AgGridAngular;
  @Input()
  rowData;
  @Input()
  ulbList;
  @Input()
  catList;
  @Input()
  isDisabled;

  @Output()
  gridData = new EventEmitter();

  frameworkComponents;
  yearErrorMsg =
    "All years value sum should be a positive integer equal to amount";
  fundErrorMsg =
    "All years value sum should be a positive integer equal to project cost";

  project = [
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["index"].value != null ? params.data["index"].value : "",
      headerName: "S No",
      pinned: true,
      width: 50,
      field: "index",
      rowDrag: false
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Project_Code"].value != null ? params.data["Project_Code"].value : "",
      headerName: "Project Code",
      pinned: true,
      width: 180,
      editable: false,
      tooltipField: "Project_Code",
      tooltipComponent: "customTooltip",
      field: "Project_Code",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Project_Name"].value != null ? params.data["Project_Name"].value : "",
      valueSetter: syncValueSetter(name),
      headerName: "Project Name",
      pinned: true,
      width: 120,
      editable: true,
      tooltipField: "Project_Name",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "Project_Name",
      cellEditor: "agTextCellEditor",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Cost"].value != null ? params.data["Cost"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "Project Cost",
      width: 100,
      pinned: true,
      editable: true,
      tooltipField: "Cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.fundErrorMsg,
      },
      field: "Cost",
      valueParser: "Number(newValue)",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Details"].value != null
          ? params.data["Details"].value
          : "",
      valueSetter: syncValueSetter(Area),
      headerName: "Project Details",
      width: 117,
      editable: true,
      tooltipField: "Details",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Value less than 200 char" },
      field: "Details",
      cellEditor: "agLargeTextCellEditor",
      cellEditorParams: {
        maxLength: "300",
        cols: "50",
        rows: "6",
      },
      suppressMovable: true,

    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Executing_Agency"].value != null
          ? params.data["Executing_Agency"].value
          : "",
      valueSetter: syncValueSetter(name),
      headerName: "Executing Agency",
      width: 150,
      editable: true,
      tooltipField: "Executing_Agency",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "Executing_Agency",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["English", "Spanish", "French", "Portuguese", "(other)"],
      },
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      headerName: "Name of Parastatal Agency",
      width: 190,
      editable: true,
      field: "Parastatal_Agency",
      cellEditor: "agTextCellEditor",
      hide: true,
      tooltipField: "Parastatal_Agency",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      valueGetter: (params) =>
        params.data["Parastatal_Agency"].value != null
          ? params.data["Parastatal_Agency"].value
          : "",
      valueSetter: syncValueSetter(name),
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Sector"].value != null ? params.data["Sector"].value : "",
      valueSetter: syncValueSetter(dropDown),
      headerName: "Sector",
      width: 122,
      editable: true,
      tooltipField: "Sector",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Select one" },
      field: "Sector",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Augmentation of existing infrastructure",
          "Any ongoing projects under existing schemes",
          "New project",
          "Replacing of existing infrastructure",
          "Operation and Maintenance Projects"
        ],
      },
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Type"].value != null ? params.data["Type"].value : "",
      valueSetter: syncValueSetter(Area),
      headerName: "Project Type",
      width: 149,
      editable: true,
      field: "Type",

      cellEditor: "agSelectCellEditor",
      tooltipField: "Type",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Select one" },
      cellEditorParams: {
        values: [
          "Augmentation of existing infrastructure",
          "Any ongoing projects under existing schemes",
          "New project",
          "Replacing of existing infrastructure",
          "Operation and Maintenance Projects"
        ],
      },
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Estimated_Outcome"].value != null
          ? params.data["Estimated_Outcome"].value
          : "",
      valueSetter: syncValueSetter(Area),
      headerName: "Estimated Outcome",
      width: 140,
      editable: true,
      tooltipField: "Estimated_Outcome",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "Estimated_Outcome",
      cellEditor: "agLargeTextCellEditor",
      cellEditorParams: {
        maxLength: "300",
        cols: "50",
        rows: "6",
      },
      suppressMovable: true,
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
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",

      valueGetter: (params) =>
        params.data["Project_Code"].value != null ? params.data["Project_Code"].value : "",
      headerName: "Project Code",
      pinned: true,
      width: 180,
      tooltipField: "Project_Code",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "Project_Code",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",

      valueGetter: (params) =>
        params.data["Project_Name"].value != null ? params.data["Project_Name"].value : "",
      valueSetter: syncValueSetter(name),
      headerName: "Project Name",
      width: 120,
      pinned: true,
      tooltipField: "Project_Name",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      tooltipComponent: "customTooltip",
      field: "Project_Name",
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: "50",
      },
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Cost"].value != null ? params.data["Cost"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "Project Cost",
      width: 120,
      pinned: true,
      tooltipField: "Cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "should be number & Greater than 0",
      },
      field: "Cost",
      valueParser: "Number(newValue)",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["XV_FC"].value != null ? params.data["XV_FC"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "15th FC",
      width: 100,
      editable: true,
      tooltipField: "XV_FC",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.fundErrorMsg,
      },
      field: "XV_FC",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Other"].value != null ? params.data["Other"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "Other",
      width: 100,
      editable: true,
      tooltipField: "Other",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.fundErrorMsg,
      },
      field: "Other",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Total"].value != null ? params.data["Total"].value : "",
      valueSetter: syncValueSetter(Total),
      headerName: "Total",
      width: 100,
      editable: false,
      tooltipField: "Total",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: "Value should be equal to project cost",
      },
      field: "Total",
      suppressMovable: true,
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
        errorMsg: this.fundErrorMsg,
      },
      field: "2021-22",
      suppressMovable: true,
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
        errorMsg: this.fundErrorMsg,
      },
      field: "2022-23",
      suppressMovable: true,
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
        errorMsg: this.fundErrorMsg,
      },
      field: "2023-24",
      suppressMovable: true,
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
        errorMsg: this.fundErrorMsg,
      },
      field: "2024-25",
      suppressMovable: true,
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
        errorMsg: this.fundErrorMsg,
      },
      field: "2025-26",
      suppressMovable: true,
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
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Project_Code"].value != null ? params.data["Project_Code"].value : "",
      headerName: "Project Code",
      pinned: true,
      width: 180,
      tooltipField: "Project_Code",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "Project_Code",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Project_Name"].value != null ? params.data["Project_Name"].value : "",
      valueSetter: syncValueSetter(name),
      headerName: "Project Name",
      width: 130,
      pinned: true,
      tooltipField: "Project_Name",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Name less than 50 char" },
      field: "Project_Name",
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: "50",
      },
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Cost"].value != null ? params.data["Cost"].value : "",
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "Project Cost",
      width: 120,
      pinned: true,
      tooltipField: "Cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
      },
      field: "Cost",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Funding"].value != null
          ? params.data["Funding"].value
          : "",
      valueSetter: syncValueSetter(number),
      // valueParser: "Number(newValue)",
      headerName: "% Funding",
      width: 85,
      editable: false,
      tooltipField: "Funding",
      tooltipComponent: "customTooltip",
      field: "Funding",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Amount"].value != null ? params.data["Amount"].value : "",
      valueSetter: syncValueSetter(number),
      valueParser: "Number(newValue)",
      headerName: "Amount",
      width: 78,
      editable: false,
      tooltipField: "Amount",
      tooltipComponent: "customTooltip",
      field: "Amount",
      suppressMovable: true,
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
      width: 93,
      editable: true,
      tooltipField: "2021-22",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
      },
      field: "2021-22",
      suppressMovable: true,
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
      width: 93,
      editable: true,
      tooltipField: "2022-23",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
      },
      field: "2022-23",
      suppressMovable: true,
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
      width: 93,
      editable: true,
      tooltipField: "2023-24",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
      },
      field: "2023-24",
      suppressMovable: true,
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
      width: 93,
      editable: true,
      tooltipField: "2024-25",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
      },
      field: "2024-25",
      suppressMovable: true,
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
      width: 93,
      editable: true,
      tooltipField: "2025-26",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
      },
      field: "2025-26",
      suppressMovable: true,
    },
  ];

  ngOnInit(): void {
    if (this.isDisabled) {
      this.project.forEach((element) => {
        element.editable = false;
      });
      this.fund.forEach((element) => {
        element.editable = false;
      });
      this.year.forEach((element) => {
        element.editable = false;
      });
    }

    this.rowData.projectExecute.forEach((element) => {
      if (element.Executing_Agency.value == "Parastatal Agency") {
        this.project[6].hide = false;
      } else {
        element.Parastatal_Agency.value = "N/A";
      }
    });

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
    if (e.colDef.field == "Executing_Agency") {
      this.agGrid1.api.forEachNode((param, index) => {
        if (
          param.data.Executing_Agency.value != "Parastatal Agency" &&
          param.data.Executing_Agency.value != ""
        ) {
          param.data.Parastatal_Agency.value = "N/A";
        }
        if (e.node.id == index && e.value != "Parastatal Agency") {
          param.data.Parastatal_Agency.value = "N/A";
        } else if (e.node.id == index) {
          param.data.Parastatal_Agency.value = "";
        }
        this.agGrid1.api.applyTransaction({ update: [param.data] });
      });

      if (e.value != "Parastatal Agency") {
        for (
          let index = 0;
          index < this.rowData.projectExecute.length;
          index++
        ) {
          const element = this.rowData.projectExecute[index];
          if (
            element.Executing_Agency.value == "Parastatal Agency" &&
            e.node.id != index
          ) {
            return;
          }
        }
      }
      if (e.value == "Parastatal Agency") {
        this.agGrid1.columnApi.setColumnVisible("Parastatal_Agency", true);
      } else {
        this.agGrid1.columnApi.setColumnVisible("Parastatal_Agency", false);
      }
    }
    if (e.colDef.field == "Cost" || e.colDef.field == "Project_Name") {
      this.autoSetNames(e);
    }
    this.gridData.emit(this.rowData);
  }

  fundValueChanges(e) {
    if (years.includes(e.colDef.field))
      this.checkValidYearSum(e, this.agGrid2.api, "Cost");

    if (e.colDef.field == "XV_FC") {
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
      if (e.data.Cost.value == "") e.data.Cost.value = 0;
      if (e.data.Cost.value != val) e.data.Total.lastValidation = val;
      else e.data.Total.lastValidation = true;
      e.data.Total.value = val;
      e.api.refreshCells({ columns: ["Total"] });
    }
    this.gridData.emit(this.rowData);
  }

  yearValueChanges(param) {
    if (years.includes(param.colDef.field))
      this.checkValidYearSum(param, this.agGrid3.api, "Amount");
    this.gridData.emit(this.rowData);
  }

  checkValidYearSum(param, api, rowName) {
    let data = param.data;
    let val = 0;
    for (const key in data) {
      if (years.includes(key)) {
        if (!isNaN(data[key].value) && typeof data[key].value == "number") {
          val += data[key].value;
        }
      }
    }
    let cost = param.data[rowName]?.value;
    if (cost == val) {
      for (const key in data) {
        if (years.includes(key)) {
          if (!isNaN(data[key].value) && typeof data[key].value == "number") {
            data[key].lastValidation = true;
          }
        }
      }
      setTimeout(() => {
        api.applyTransaction({ update: [param.data] });
        if (!isNaN(param.value)) api.redrawRows(param);
      }, 0);
      api.stopEditing();
    }
  }

  autoSetNames(e, fromFund = null) {
    if (fromFund) {
      this.rowData.yearOutlay[e.rowIndex]["Amount"].value = e.value;
      if (this.rowData.yearOutlay[e.rowIndex]["Cost"].value == "") {
        this.rowData.yearOutlay[e.rowIndex]["Funding"].value = 0;
      } else {
        this.rowData.yearOutlay[e.rowIndex]["Funding"].value =
          (e.value / this.rowData.yearOutlay[e.rowIndex]["Cost"].value) * 100;
        if (this.rowData.yearOutlay[e.rowIndex]["Funding"].value % 1 != 0) {
          this.rowData.yearOutlay[e.rowIndex]["Funding"].value = (
            (e.value / this.rowData.yearOutlay[e.rowIndex]["Cost"].value) *
            100
          ).toPrecision(2);
        }
      }
      this.agGrid3.api.applyTransaction({ update: this.rowData.yearOutlay });
    } else {
      this.rowData.sourceFund[e.rowIndex][e.colDef.field].value = e.value;
      this.agGrid2.api.applyTransaction({ update: this.rowData.sourceFund });
      this.rowData.yearOutlay[e.rowIndex][e.colDef.field].value = e.value;
      this.agGrid3.api.applyTransaction({ update: this.rowData.yearOutlay });
    }
  }

  ngOnChanges() { }

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

    this.gridData.emit(this.rowData);
  }

  removeRow() {
    let lastElement = this.rowData.projectExecute.pop();
    this.agGrid1.api.applyTransaction({ remove: [lastElement] });
    lastElement = this.rowData.sourceFund.pop();
    this.agGrid2.api.applyTransaction({ remove: [lastElement] });
    lastElement = this.rowData.yearOutlay.pop();
    this.agGrid3.api.applyTransaction({ remove: [lastElement] });
    this.gridData.emit(this.rowData);
  }
}

const fundAutoFill = [
  "XV_FC",
  "Other"
];

const years = ["2021-22", "2022-23", "2023-24", "2024-25", "2025-26"];

const input = {
  ua: { value: "", isEmpty: true, lastValidation: true },
  name: { value: "", isEmpty: true, lastValidation: true },
  projectExecute: [
    {


      index: { value: 1, isEmpty: true, lastValidation: true },
      Project_Code: { value: "", isEmpty: true, lastValidation: true },
      Project_Name: { value: "", isEmpty: true, lastValidation: true },
      Details: { value: "", isEmpty: true, lastValidation: true },
      Cost: { value: "", isEmpty: true, lastValidation: true },
      Executing_Agency: { value: "", isEmpty: true, lastValidation: true },
      Parastatal_Agency: { value: "", isEmpty: true, lastValidation: true },
      Sector: { value: "", isEmpty: true, lastValidation: true },
      Type: { value: "", isEmpty: true, lastValidation: true },
      Estimated_Outcome: { value: "", isEmpty: true, lastValidation: true },
    },
  ],
  sourceFund: [
    {
      index: { value: 1, isEmpty: true, lastValidation: true },
      Project_Code: { value: "", isEmpty: true, lastValidation: true },
      Project_Name: { value: "", isEmpty: true, lastValidation: true },
      Cost: { value: "", isEmpty: true, lastValidation: true },
      XV_FC: { value: 0, isEmpty: true, lastValidation: true },
      Other: { value: 0, isEmpty: true, lastValidation: true },
      Total: { value: "", isEmpty: true, lastValidation: true },
      "2021-22": { value: 0, isEmpty: true, lastValidation: true },
      "2022-23": { value: 0, isEmpty: true, lastValidation: true },
      "2023-24": { value: 0, isEmpty: true, lastValidation: true },
      "2024-25": { value: 0, isEmpty: true, lastValidation: true },
      "2025-26": { value: 0, isEmpty: true, lastValidation: true },
    },
  ],
  yearOutlay: [
    {
      index: { value: 1, isEmpty: true, lastValidation: true },
      Project_Code: { value: "", isEmpty: true, lastValidation: true },
      Project_Name: { value: "", isEmpty: true, lastValidation: true },
      Cost: { value: 0, isEmpty: true, lastValidation: true },
      Funding: { value: 0, isEmpty: true, lastValidation: true },
      Amount: { value: 0, isEmpty: true, lastValidation: true },
      "2021-22": { value: 0, isEmpty: true, lastValidation: true },
      "2022-23": { value: 0, isEmpty: true, lastValidation: true },
      "2023-24": { value: 0, isEmpty: true, lastValidation: true },
      "2024-25": { value: 0, isEmpty: true, lastValidation: true },
      "2025-26": { value: 0, isEmpty: true, lastValidation: true },
    },
  ],
  fold: false,
  code: { value: "", isEmpty: true, lastValidation: true },
};

const Area = (x) => {
  if (typeof x == "string") {
    return x.length < 201;
  }
  return false;
};
const Total = (x, param) => {
  if (param.data.Cost.value == "") {
    param.data.Cost.value = 0;
  }
  return param.data.Cost.value == parseInt(x);
};
const dropDown = (x) => {
  if (x.length < 1) return false;
  else return true;
};
const name = (x) => {
  if (typeof x == "string") {
    return x.length > 0 && x.length < 50;
  }
  return false;
};

const number = (x, params) => {
  x = parseInt(x);
  if (!isNaN(x) && x >= 0 && x < 999999999) {
    if (params.colDef.field == "Cost") return true;
    return x / 100 < params.data.Cost.value;
  }
  return false;
};

const checkYear = (x, param) => {
  if (x <= 0) {
    return false;
  }
  let data = param.data;
  let val = 0;
  let count = 0;
  for (const key in data) {
    if (years.includes(key)) {
      if (
        !isNaN(data[key].value) &&
        typeof data[key].value == "number" &&
        param.colDef.field != key
      ) {
        count++;
        val += data[key].value;
      }
    }
  }
  val += x;
  let cost = param.data.Cost?.value;
  if (count == 4) {
    return cost == val;
  }
  return val <= (cost ? cost : 0);
};

const checkYear2 = (x, param) => {
  if (x <= 0) {
    return false;
  }
  let data = param.data;
  let val = 0;
  let count = 0;
  for (const key in data) {
    if (years.includes(key)) {
      if (
        !isNaN(data[key].value) &&
        typeof data[key].value == "number" &&
        param.colDef.field != key
      ) {
        count++;
        val += data[key].value;
      }
    }
  }
  val += x;
  let cost = param.data.Amount.value;
  if (count == 4) {
    return cost == val;
  }
  return val == (cost ? cost : 0);
};

const _onSuccess = (params) => () => {
  let data = params.data;
  let field = params.colDef.field;
  data[field] = {
    ...data[field],
    isEmpty: false,
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
    isEmpty: false,
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
