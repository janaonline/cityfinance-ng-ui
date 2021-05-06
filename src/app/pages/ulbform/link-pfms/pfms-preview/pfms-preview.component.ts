import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pfms-preview',
  templateUrl: './pfms-preview.component.html',
  styleUrls: ['./pfms-preview.component.scss']
})
export class PfmsPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  downloadAsPDF(){

  }

}
