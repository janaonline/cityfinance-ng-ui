import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-annual-preview',
  templateUrl: './annual-preview.component.html',
  styleUrls: ['./annual-preview.component.scss']
})
export class AnnualPreviewComponent implements OnInit {

  constructor(public _matDialog: MatDialog) { }

  ngOnInit(): void {
  }
  downloadAsPDF(){

  }

}
