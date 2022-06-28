import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-odf-form-preview',
  templateUrl: './odf-form-preview.component.html',
  styleUrls: ['./odf-form-preview.component.scss']
})
export class OdfFormPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
