import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { UtilityService } from 'src/app/shared/services/utility.service';

import { FiscalRankingService } from '../../fiscal-ranking.service';

@Component({
  selector: 'app-comparision-filters',
  templateUrl: './comparision-filters.component.html',
  styleUrls: ['./comparision-filters.component.scss']
})
export class ComparisionFiltersComponent implements OnInit {

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  query: string = '';
  searchResults = [];

  ulbs = [];

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService,
    private utilityService: UtilityService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.ulbs = this.data?.ulbs;
  }

  search() {
    this.fiscalRankingService.searchUlb(this.query).subscribe((res: any) => {
      this.searchResults = res.ulbs;
      this.menuTrigger.openMenu();
    })
  }

  debouncedSearch = this.utilityService.debounce(this.search, 500);

  addUlb(ulb) {
    this.query = '';
    this.searchResults = [];
    this.ulbs.push(ulb);
    this.menuTrigger.closeMenu();
  }

  apply() {
    this.dialogRef.close({
      ulbs: this.ulbs
    })
  }
  
  close() {
    this.dialogRef.close();
  }
}
