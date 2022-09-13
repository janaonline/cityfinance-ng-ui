import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-renderer-button',
  templateUrl: './renderer-button.component.html',
  styleUrls: ['./renderer-button.component.scss']
})
export class RendererButtonComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    console.log(params);
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }


      this.params.onClick(params);
    }
  }

  onRemoveSelected(params) {
    console.log(params);
  }
}