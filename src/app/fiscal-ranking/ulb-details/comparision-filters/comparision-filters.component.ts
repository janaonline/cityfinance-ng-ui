import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comparision-filters',
  templateUrl: './comparision-filters.component.html',
  styleUrls: ['./comparision-filters.component.scss']
})
export class ComparisionFiltersComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialog.closeAll();
  }
}
