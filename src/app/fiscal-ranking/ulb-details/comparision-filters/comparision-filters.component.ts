import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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

  states = [];

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
  }

  search() {
    this.fiscalRankingService.searchUlb(this.query).subscribe((res: any) => {
      this.searchResults = res.ulbs;
      this.menuTrigger.openMenu();
    })
  }

  debouncedSearch = this.utilityService.debounce(this.search, 500);

  addState(state) {
    this.query = '';
    this.searchResults = [];
    this.menuTrigger.closeMenu();
    this.states.push(state);
  }
  
  close() {
    this.matDialog.closeAll();
  }
}
