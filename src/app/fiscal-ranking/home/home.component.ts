import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { GuidelinesPopupComponent } from './guidelines-popup/guidelines-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data;


  constructor(
    private fiscalRankingService: FiscalRankingService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.fiscalRankingService.dashboard().subscribe(({ data }: any) => {
      this.data = data;
      const topCategoryUlbLength = Object.entries(this.data.bucketWiseUlb)
        .reduce((max, item) => Math.max(max, item.length), 0)
      const columns = [
        {
          "label": "4M+",
          "key": "populationBucket1"
        },
        {
          "label": "1M-4M",
          "key": "populationBucket2"
        },
        {
          "label": "100K-1M",
          "key": "populationBucket3"
        },
        {
          "label": "<100K",
          "key": "populationBucket4"
        }
      ];
      this.data['topCategoryUlb'] = {
        "columns": columns,
        "data": Array.from({ length: topCategoryUlbLength }).map((_, index) => (
          columns.reduce((obj, column) => ({
            ...obj,
            [column.key]: this.data?.bucketWiseUlb?.[column.key]?.[index]?.name
          }), {})
        ))
      };
    })
  }

  guidelinesPopup() {
    this.matDialog.open(GuidelinesPopupComponent, {
      width: '450px',
      maxHeight: '90vh'
    });
  }
}
