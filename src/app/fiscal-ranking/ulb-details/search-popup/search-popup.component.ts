import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiscalRankingService } from '../../fiscal-ranking.service';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent implements OnInit {

  ulbs = [];
  query: string = '';

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
  }

  search() {
    this.fiscalRankingService.searchUlb(this.query).subscribe((res: any) => {
      this.ulbs = res?.ulbs;
    })
  }
  close() {
    this.matDialog.closeAll();
  }

}
