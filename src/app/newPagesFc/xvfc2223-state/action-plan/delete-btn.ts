


// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
//import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button class='btn btn-del' type="button" (click)="onClick($event)">
        <img src="../../../../assets/form-icon/Icon material-delete.svg">
    </button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  //  label: string;

  agInit(params): void {
    this.params = params;
    //   this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        params: this.params
        // ...something
      }
      this.params.onClick(params);

    }
  }
}
