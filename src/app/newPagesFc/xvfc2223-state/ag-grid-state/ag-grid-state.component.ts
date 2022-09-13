import { Component, OnInit } from '@angular/core';
import { RendererButtonComponent } from './renderer-button/renderer-button.component';

@Component({
  selector: 'app-ag-grid-state',
  templateUrl: './ag-grid-state.component.html',
  styleUrls: ['./ag-grid-state.component.scss']
})
export class AgGridStateComponent {
  name = 'Angular 6';
  frameworkComponents: any;
  api: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};

  constructor() {
    this.frameworkComponents = {
      buttonRenderer: RendererButtonComponent
    };
  }

  columnDefs = [
    {
      headerName: 'Button Col 1',
      field: 'index',
      width: 170,
      editable: true,
    },
    {
      headerName: 'Button Col 2',
      field: 'index',
      width: 170,
      editable: true,
    },
    {
      headerName: 'Delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDelete.bind(this),
        label: 'Delete'
      },
      width: 170,
      editable: true,
    },
    { headerName: 'Model', 
    field: 'model',
    width: 170,
    editable: true,   
  },
    { headerName: 'Price', 
    field: 'price',
    width: 170,
      editable: true, }
  ];

  rowData = [
    { index: 0, make: 'Toyota', model: 'Celica', price: 35000 },
    { index: 1, make: 'Ford', model: 'Mondeo', price: 32000 },
    { index: 2, make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

 

  onDelete(params) {
    
    this.rowData.splice(params.rowData.index, 1);
    console.log(this.rowData);
    this.api.updateRowData({ remove: [params.rowData] });
    this.api.forEachNode(node => {
      console.log(node.data);
    });
    return this.rowData;
  }

  onGridReady(params) {
    this.api = params.api;
  }
}
