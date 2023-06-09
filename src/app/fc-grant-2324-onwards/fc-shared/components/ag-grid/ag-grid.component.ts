
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
import { CustomizedCellComponent } from "src/app/shared/components/ag-grid/customized-cell/customized-cell.component";
//import { CustomizedCellComponent } from "./customized-cell/customized-cell.component";
//import { CustomTooltipComponent } from "src/app/shared/components/ag-grid/customized-cell/customized-cell.component";
import { CustomTooltipComponent } from "src/app/shared/components/ag-grid/custom-tooltip/custom-tooltip.component";
import { CustomizedHeaderComponent } from "src/app/shared/components/ag-grid//customized-header/customized-header.component";
//import { CustomizedHeaderComponent } from "./customized-header/customized-header.component";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { State2223Service } from "src/app/newPagesFc/xvfc2223-state/state-services/state2223.service";
import { ButtonRendererComponent } from "src/app/newPagesFc/xvfc2223-state/action-plan/delete-btn";


@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})

export class AgGridComponent implements OnInit {


  frameworkComponents: any;
  constructor(
    public stateService: State2223Service,
  ) {
    // this.frameworkComponents = {
    // }

  }
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
  rowDisableClass;
  // rowDisableClass = {
  //   'row-disable': "data.Project_Code && data.Project_Code.value && data.Project_Code.value.toString().includes('2021-22')",
  //   'row-disable2': `${this.isDisabled}`,
  // }

  yearErrorMsg = "All years value sum should be a positive integer equal to amount";
  fundErrorMsg = "All years value sum should be a positive integer equal to project cost";
  minMaxValidationError = "Value 0 upto 9 digits are allowed"
  project = [
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["index"].value != null ? params.data["index"].value : "",
      headerName: "S No",
      pinned: true,
      width: 70,
      field: "index",
      rowDrag: false,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        params.data["Project_Code"].value != null
          ? params.data["Project_Code"].value
          : "",
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
        params.data["Project_Name"].value != null
          ? params.data["Project_Name"].value
          : "",
      valueSetter: syncValueSetter(name),
      headerName: "Project Name",
      pinned: true,
      width: 130,
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
        params.data["Cost"] && !isNaN(params.data["Cost"].value) ? params.data["Cost"].value : "",
      valueSetter: syncValueSetter(number),
      headerName: "Project Cost",
      width: 115,
      pinned: true,
      editable: true,
      tooltipField: "Cost",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: {
        errorMsg: this.minMaxValidationError,
      },
      field: "Cost",
      valueParser: "parseFloat(newValue)",
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
          "Operation and Maintenance Projects",
          "Others",
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
          "Operation and Maintenance Projects",
          "Others",
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
      width: 170,
      editable: true,
      tooltipField: "Estimated_Outcome",
      tooltipComponent: "customTooltip",
      tooltipComponentParams: { errorMsg: "Estimated Outcome less than 200 char" },
      field: "Estimated_Outcome",
      cellEditor: "agLargeTextCellEditor",
      cellEditorParams: {
        maxLength: "300",
        cols: "50",
        rows: "6",
      },
      suppressMovable: true,
    },
    {
      field: "Action",
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        onClick: this.rowDelete.bind(this),
        label: ''
      },
      width: 80,
      editable: false,

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
        params.data["Project_Code"].value != null
          ? params.data["Project_Code"].value
          : "",
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
        params.data["Project_Name"].value != null
          ? params.data["Project_Name"].value
          : "",
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
        (params.data && params.data["Cost"] && !isNaN(params.data["Cost"].value)) ? params?.data["Cost"]?.value : "",
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
      valueParser: "parseFloat(newValue)",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        (params.data && params.data["XV_FC"] && !isNaN(params.data["XV_FC"].value)) ? params?.data["XV_FC"]?.value : "",
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
      valueParser: "parseFloat(newValue)",
      filter: "agNumberColumnFilter",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        (params.data && params.data["Other"] && !isNaN(params.data["Other"].value)) ? params.data["Other"].value : "",
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
      valueParser: "parseFloat(newValue)",
      filter: "agNumberColumnFilter",
      suppressMovable: true,
    },
    {
      cellRenderer: "customizedCell",
      valueGetter: (params) =>
        (params.data && params.data["Total"] && !isNaN(params.data["Total"].value)) ? params.data["Total"].value : "",
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
        (params.data && (params.data["2021-22"]) && (Number(params.data["2021-22"].value) === 0 || params.data["2021-22"].value))
          ? params.data["2021-22"].value
          : "",
        // params.data["2021-22"].value != null
        //   ? params.data["2021-22"].value
        //   : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "parseFloat(newValue)",
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
        (params.data && (params.data["2022-23"]) && (Number(params.data["2022-23"].value) === 0 || params.data["2022-23"].value))
          ? params.data["2022-23"].value
          : "",
        // (params.data && params.data["2022-23"] && params.data["2022-23"].value)
        //   ? params.data["2022-23"].value
        //   : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "parseFloat(newValue)",
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
        (params.data && (params.data["2023-24"]) && (Number(params.data["2023-24"].value) === 0 || params.data["2023-24"].value))
          ? params.data["2023-24"].value
          : "",
        // (params.data && params.data["2023-24"] && params.data["2023-24"].value)
        //   ? params.data["2023-24"].value
        //   : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "parseFloat(newValue)",
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
        (params.data && (params.data["2024-25"]) && (Number(params.data["2024-25"].value) === 0 || params.data["2024-25"].value))
          ? params.data["2024-25"].value
          : "",
        // (params.data && params.data["2024-25"] && params.data["2024-25"].value)
        //   ? params.data["2024-25"].value
        //   : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "parseFloat(newValue)",
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
        (params.data && (params.data["2025-26"]) && (Number(params.data["2025-26"].value) === 0 || params.data["2025-26"].value))
          ? params.data["2025-26"].value
          : "",
        // (params.data && params.data["2025-26"] && params.data["2025-26"].value)
        //   ? params.data["2025-26"].value
        //   : "",
      valueSetter: syncValueSetter(checkYear),
      valueParser: "parseFloat(newValue)",
      headerName: "FY 2025-26",
      width: 160,
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
        params.data["Project_Code"].value != null
          ? params.data["Project_Code"].value
          : "",
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
        params.data["Project_Name"].value != null
          ? params.data["Project_Name"].value
          : "",
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
        (params.data["Cost"] && !isNaN(params.data["Cost"].value)) ? params.data["Cost"].value : "",
      valueSetter: syncValueSetter(number),
      valueParser: "parseFloat(newValue)",
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
        (params.data["Funding"] && !isNaN(params.data["Funding"].value))
          ? params.data["Funding"].value
          : "",
      valueSetter: syncValueSetter(number),
      valueParser: "parseInt(newValue)",
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
        (params.data["Amount"] && !isNaN(params.data["Amount"].value)) ? params.data["Amount"].value : "",
      valueSetter: syncValueSetter(number),
      valueParser: "parseFloat(newValue)",
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
        (params.data["2021-22"] && !isNaN(params.data["2021-22"].value))
          ? params.data["2021-22"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "parseFloat(newValue)",
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
      valueParser: "parseFloat(newValue)",
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
        (params.data["2023-24"] && !isNaN(params.data["2023-24"].value))
          ? params.data["2023-24"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "parseFloat(newValue)",
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
      (params.data["2024-25"] && !isNaN(params.data["2024-25"].value))
          ? params.data["2024-25"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "parseFloat(newValue)",
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
      (params.data["2025-26"] && !isNaN(params.data["2025-26"].value))
          ? params.data["2025-26"].value
          : "",
      valueSetter: syncValueSetter(checkYear2),
      valueParser: "parseFloat(newValue)",
      headerName: "FY 2025-26",
      width: 103,
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

      // if (element.Project_Code.value.includes('2021-22')) {
      //   this.project.forEach((el) => {
      //     el.editable = false
      //   })
      // } else {
      //   this.project.forEach((el) => {
      //     el.editable = true
      //   })
      // }

    });

    if (!this.ulbList.includes("Parastatal Agency"))
      this.ulbList.push("Parastatal Agency");
    this.project[5].cellEditorParams.values = this.ulbList;

    this.project[7].cellEditorParams.values = this.catList;

    this.frameworkComponents = {
      customizedCell: CustomizedCellComponent,
      agColumnHeader: CustomizedHeaderComponent,
      customTooltip: CustomTooltipComponent,
      btnCellRenderer: ButtonRendererComponent
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

  onGridReady(params) {
    // params.api.sizeColumnsToFit();
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
    console.log('eee', e);
    console.log('eee fff', fromFund);
    if (fromFund) {
      this.rowData.yearOutlay[e.rowIndex]["Amount"].value = e.value;
      if (this.rowData.yearOutlay[e.rowIndex]["Cost"].value == "") {
        this.rowData.yearOutlay[e.rowIndex]["Funding"].value = 0;
      } else {
        this.rowData.yearOutlay[e.rowIndex]["Funding"].value = (
          (e.value / this.rowData.yearOutlay[e.rowIndex]["Cost"].value) *
          100
        ).toPrecision(2);
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
      if(e?.newValue != e?.oldValue)  this.rowData.sourceFund[e.rowIndex]["Total"].lastValidation = this.rowData.sourceFund[e.rowIndex]["Total"].value;
      this.agGrid2.api.refreshCells({ columns: ["Total"] });
      this.gridData.emit(this.rowData);
      this.agGrid2.api.applyTransaction({ update: this.rowData.sourceFund });
      this.rowData.yearOutlay[e.rowIndex][e.colDef.field].value = e.value;
     // if(e?.newValue != e?.oldValue) this.rowData.sourceFund[e.rowIndex].Total.lastValidation = false;
      this.agGrid3.api.applyTransaction({ update: this.rowData.yearOutlay });
    }
  }

  ngOnChanges() {
    this.rowDisableClass = {
      'row-disable': "data.Project_Code && data.Project_Code.value && (data.Project_Code.value.toString().includes('2021-22') || data.Project_Code.value.toString().includes('2022-23'))",
      'row-disable2': `${this.isDisabled}`,
    }
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
  }

  addRow() {
    console.log('this.rowData new', this.rowData)
    let s = this.agGrid1.api.getDisplayedRowCount();
    let obj = JSON.parse(JSON.stringify(input.projectExecute));
    obj[0].index.value = s + 1;
    obj[0].Project_Code.value = this.rowData.code + "/" + obj[0].index.value;
    this.agGrid1.api.applyTransaction({ add: [obj[0]] });
    this.rowData.projectExecute.push(obj[0]);

    s = this.agGrid2.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(input.sourceFund));
    obj[0].index.value = s + 1;
    obj[0].Project_Code.value = this.rowData.code + "/" + obj[0].index.value;

    this.agGrid2.api.applyTransaction({ add: [obj[0]] });
    this.rowData.sourceFund.push(obj[0]);

    s = this.agGrid3.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(input.yearOutlay));
    obj[0].index.value = s + 1;
    obj[0].Project_Code.value = this.rowData.code + "/" + obj[0].index.value;

    this.agGrid3.api.applyTransaction({ add: [obj[0]] });
    this.rowData.yearOutlay.push(obj[0]);

    this.gridData.emit(this.rowData);
  }

  removeRow(i) {
    let lastElement = this.rowData.projectExecute.pop();
    this.agGrid1.api.applyTransaction({ remove: [lastElement] });
    lastElement = this.rowData.sourceFund.pop();
    this.agGrid2.api.applyTransaction({ remove: [lastElement] });
    lastElement = this.rowData.yearOutlay.pop();
    this.agGrid3.api.applyTransaction({ remove: [lastElement] });
    this.gridData.emit(this.rowData);
  }
  rowDelete(e) {

    console.log('eeeeee', e);
    let selectedNode = e.params.node;
    let selectedData = selectedNode.data;
    let projectCode = selectedData?.Project_Code?.value;
    console.log('selectedData', selectedData,);
    console.log('eeeeee row data', this.rowData);
    let ag1Elm;
    if (projectCode) {
      ag1Elm = this.rowData?.projectExecute.find((obj) => {
        return obj.Project_Code.value === projectCode;
      });
      this.rowData.projectExecute = this.rowData.projectExecute.filter((obj) => {
        return obj.Project_Code.value !== projectCode;
      });
      this.agGrid1.api.applyTransaction({ remove: [ag1Elm] });
      ag1Elm = this.rowData?.sourceFund.find((obj) => {
        return obj.Project_Code.value === projectCode;
      });
      this.rowData.sourceFund = this.rowData.sourceFund.filter((obj) => {
        return obj.Project_Code.value !== projectCode;
      });
      this.agGrid2.api.applyTransaction({ remove: [ag1Elm] });
      ag1Elm = this.rowData?.yearOutlay.find((obj) => {
        return obj.Project_Code.value === projectCode;
      });
      this.rowData.yearOutlay = this.rowData.yearOutlay.filter((obj) => {
        return obj.Project_Code.value !== projectCode;
      });
      this.agGrid3.api.applyTransaction({ remove: [ag1Elm] });
    }
    let len = this.rowData?.projectExecute?.length;
    let proCode = projectCode.slice(0, projectCode.lastIndexOf('/'));
    let proCodeNumbe = projectCode.slice(projectCode.lastIndexOf('/') + 1);
    for (let i = 0; i < len; i++) {
      let dataObj = this.rowData?.projectExecute[i];
      let code = dataObj.Project_Code.value;
      if (proCode == code.slice(0, code.lastIndexOf('/')) && (proCodeNumbe < code.slice(code.lastIndexOf('/') + 1))) {
        dataObj.index.value = i + 1;
        dataObj.Project_Code.value = this.rowData.code + "/" + dataObj.index.value;
        this.agGrid1.api.applyTransaction({ remove: [dataObj] });
        this.agGrid1.api.applyTransaction({ add: [dataObj] });
        this.rowData.projectExecute[i] = dataObj;
      }
      this.agGrid1.api.applyTransaction({ update: [dataObj] });
    }
    for (let i = 0; i < len; i++) {
      let dataObj = this.rowData?.sourceFund[i];
      let code = dataObj.Project_Code.value;
      if (proCode == code.slice(0, code.lastIndexOf('/')) && (proCodeNumbe < code.slice(code.lastIndexOf('/') + 1))) {
        dataObj.index.value = i + 1;
        dataObj.Project_Code.value = this.rowData.code + "/" + dataObj.index.value;
        this.agGrid2.api.applyTransaction({ remove: [dataObj] });
        this.agGrid2.api.applyTransaction({ add: [dataObj] });
        this.rowData.sourceFund[i] = dataObj;
      }
      this.agGrid2.api.applyTransaction({ update: [dataObj] });
    }
    for (let i = 0; i < len; i++) {
      let dataObj = this.rowData?.yearOutlay[i];
      let code = dataObj.Project_Code.value;
      if (proCode == code.slice(0, code.lastIndexOf('/')) && (proCodeNumbe < code.slice(code.lastIndexOf('/') + 1))) {
        dataObj.index.value = i + 1;
        dataObj.Project_Code.value = this.rowData.code + "/" + dataObj.index.value;
        this.agGrid3.api.applyTransaction({ remove: [dataObj] });
        this.agGrid3.api.applyTransaction({ add: [dataObj] });
        this.rowData.yearOutlay[i] = dataObj;
      }
      this.agGrid3.api.applyTransaction({ update: [dataObj] });
    }
    console.log('last', this.rowData);
    this.gridData.emit(this.rowData);
  }
}

const fundAutoFill = ["XV_FC", "Other"];

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
      // Delete: { value: "", isEmpty: true, lastValidation: true },
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
  x = Number(parseFloat(x).toFixed(3));
  if (param.data.Cost.value == "") {
    param.data.Cost.value = 0;
  }
  return param.data.Cost.value == parseFloat(x);
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
  x = Number(parseFloat(x).toFixed(3));
  if (!isNaN(x) && x >= 0 && x < 1000000000) {
    if (params.colDef.field == "Cost") return true;
    return x / 100 <= params.data.Cost.value;
  }
  return false;
};

const checkYear = (x, param) => {
  x = Number(parseFloat(x).toFixed(3));
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
        val = Number(val.toFixed(3));
      }
    }
  }
  val += x;
  val = Number(val.toFixed(3));
  let cost = param.data.Cost?.value;
  if (count == 4) {
    return cost == val;
  }
  return val <= (cost ? cost : 0);
};

const checkYear2 = (x, param) => {
  x = Number(parseFloat(x).toFixed(3));
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
        val = Number(val.toFixed(3));
      }
    }
  }

  val += x;
  val = Number(val.toFixed(3));
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


