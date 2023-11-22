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
      console.log(data);
      this.data = data;
      this.data['topCategoryUlb'] = {
        "columns": [
          {
            "label": "4M+",
            "key": "4M+"
          },
          {
            "label": "1M-4M",
            "key": "1M-4M"
          },
          {
            "label": "100K-1M",
            "key": "100k-M"
          },
          {
            "label": "<100K",
            "key": "<100K"
          }
        ],
        "data": [
          {
            "4M+": "Navi mumbar",
            "1M-4M": "Ab",
            "100k-M": " test",
            "<100K": "Navi mumbar"
          },
          {
            "4M+": "Navi mumbar",
            "1M-4M": "Navi mumbar",
            "100k-M": "Navi mumbar",
            "<100K": "Navi mumbar"
          }
        ]
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
