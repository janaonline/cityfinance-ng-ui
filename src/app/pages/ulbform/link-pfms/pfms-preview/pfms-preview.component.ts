import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pfms-preview',
  templateUrl: './pfms-preview.component.html',
  styleUrls: ['./pfms-preview.component.scss']
})
export class PfmsPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  @Input() parentData

  ngOnInit(): void {
    
    if(this.parentData){
      this.data = this.parentData
    }
  }

  downloadAsPDF(){

  }

}
