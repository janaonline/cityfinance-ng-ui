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
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["code"].value != null ? params.data["code"].value : "",
      headerName: "Project Code",
      pinned: true,
      width: 180,
      editable: false,
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
      pinned: true,
      width: 120,
      editable: true,
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
      pinned: true,
      editable: true,
      tooltipField: "cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.fundErrorMsg,
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
      width: 117,
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
      width: 122,
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
      width: 149,
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
      width: 140,
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
        errorMsg: "should be number & Greater than 0",
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
        errorMsg: this.fundErrorMsg,
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
      width: 130,
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
        errorMsg: this.yearErrorMsg,
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
      // valueParser: "Number(newValue)",
      headerName: "% Funding",
      width: 85,
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
      width: 78,
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
      width: 93,
      editable: true,
      tooltipField: "2021-22",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
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
      width: 93,
      editable: true,
      tooltipField: "2022-23",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
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
      width: 93,
      editable: true,
      tooltipField: "2023-24",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
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
      width: 93,
      editable: true,
      tooltipField: "2024-25",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
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
      width: 93,
      editable: true,
      tooltipField: "2025-26",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.yearErrorMsg,
      },
      field: "2025-26",
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
      if (element.exAgency.value == "Parastatal Agency") {
        this.project[6].hide = false;
      } else {
        element.paraAgency.value = "N/A";
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
    if (e.colDef.field == "exAgency") {
      this.agGrid1.api.forEachNode((param, index) => {
        if (
          param.data.exAgency.value != "Parastatal Agency" &&
          param.data.exAgency.value != ""
        ) {
          param.data.paraAgency.value = "N/A";
        }
        if (e.node.id == index && e.value != "Parastatal Agency") {
          param.data.paraAgency.value = "N/A";
        } else if (e.node.id == index) {
          param.data.paraAgency.value = "";
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
            element.exAgency.value == "Parastatal Agency" &&
            e.node.id != index
          ) {
            return;
          }
        }
      }
      if (e.value == "Parastatal Agency") {
        this.agGrid1.columnApi.setColumnVisible("paraAgency", true);
      } else {
        this.agGrid1.columnApi.setColumnVisible("paraAgency", false);
      }
    }
    if (e.colDef.field == "cost" || e.colDef.field == "name") {
      this.autoSetNames(e);
    }
    this.gridData.emit(this.rowData);
  }

  fundValueChanges(e) {
    if (years.includes(e.colDef.field))
      this.checkValidYearSum(e, this.agGrid2.api, "cost");

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
      if (e.data.cost.value == "") e.data.cost.value = 0;
      if (e.data.cost.value != val) e.data.total.lastValidation = val;
      else e.data.total.lastValidation = true;
      e.data.total.value = val;
      e.api.refreshCells({ columns: ["total"] });
    }
    this.gridData.emit(this.rowData);
  }

  yearValueChanges(param) {
    if (years.includes(param.colDef.field))
      this.checkValidYearSum(param, this.agGrid3.api, "amount");
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
      this.rowData.yearOutlay[e.rowIndex]["amount"].value = e.value;
      if (this.rowData.yearOutlay[e.rowIndex]["cost"].value == "") {
        this.rowData.yearOutlay[e.rowIndex]["funding"].value = 0;
      } else {
        this.rowData.yearOutlay[e.rowIndex]["funding"].value =
          (e.value / this.rowData.yearOutlay[e.rowIndex]["cost"].value) * 100;
        if (this.rowData.yearOutlay[e.rowIndex]["funding"].value % 1 != 0) {
          this.rowData.yearOutlay[e.rowIndex]["funding"].value = (
            (e.value / this.rowData.yearOutlay[e.rowIndex]["cost"].value) *
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
  ua: { value: "", isEmpty: true, lastValidation: true },
  name: { value: "", isEmpty: true, lastValidation: true },
  projectExecute: [
    {
      index: { value: 1, isEmpty: true, lastValidation: true },
      code: { value: "", isEmpty: true, lastValidation: true },
      name: { value: "", isEmpty: true, lastValidation: true },
      details: { value: "", isEmpty: true, lastValidation: true },
      cost: { value: "", isEmpty: true, lastValidation: true },
      exAgency: { value: "", isEmpty: true, lastValidation: true },
      paraAgency: { value: "", isEmpty: true, lastValidation: true },
      sector: { value: "", isEmpty: true, lastValidation: true },
      type: { value: "", isEmpty: true, lastValidation: true },
      esOutcome: { value: "", isEmpty: true, lastValidation: true },
    },
  ],
  sourceFund: [
    {
      index: { value: 1, isEmpty: true, lastValidation: true },
      code: { value: "", isEmpty: true, lastValidation: true },
      name: { value: "", isEmpty: true, lastValidation: true },
      cost: { value: "", isEmpty: true, lastValidation: true },
      fc: { value: 0, isEmpty: true, lastValidation: true },
      jjm: { value: 0, isEmpty: true, lastValidation: true },
      sbm: { value: 0, isEmpty: true, lastValidation: true },
      centalScheme: { value: 0, isEmpty: true, lastValidation: true },
      stateScheme: { value: 0, isEmpty: true, lastValidation: true },
      stateGrant: { value: 0, isEmpty: true, lastValidation: true },
      ulb: { value: 0, isEmpty: true, lastValidation: true },
      other: { value: 0, isEmpty: true, lastValidation: true },
      total: { value: "", isEmpty: true, lastValidation: true },
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
      code: { value: "", isEmpty: true, lastValidation: true },
      name: { value: "", isEmpty: true, lastValidation: true },
      cost: { value: 0, isEmpty: true, lastValidation: true },
      funding: { value: 0, isEmpty: true, lastValidation: true },
      amount: { value: 0, isEmpty: true, lastValidation: true },
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
  if (param.data.cost.value == "") {
    param.data.cost.value = 0;
  }
  return param.data.cost.value == parseInt(x);
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
  x = parseInt(x);
  if (!isNaN(x) && x >= 0 && x < 999999999) {
    if (params.colDef.field == "cost") return true;
    return x / 100 < params.data.cost.value;
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
  let cost = param.data.cost?.value;
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
  let cost = param.data.amount.value;
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
