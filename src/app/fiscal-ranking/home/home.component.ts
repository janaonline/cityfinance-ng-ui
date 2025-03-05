import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { GuidelinesPopupComponent } from './guidelines-popup/guidelines-popup.component';
import { VideosPopupComponent } from './videos-popup/videos-popup.component';
import { environment } from 'src/environments/environment';

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
  ) {
    //redirect to fc module
    window.location.href = environment.fcURL + 'cfr/home';
  }

  ngOnInit(): void {
    this.loadData();
    if (sessionStorage.getItem('homeVideoAutoOpen') != 'true') {
      this.videosPopup();
      sessionStorage.setItem('homeVideoAutoOpen', 'true');
    }
  }

  loadData() {
    this.fiscalRankingService.dashboard().subscribe(({ data }: any) => {
      this.data = data;
      const topCategoryUlbLength = Math.max(...Object.values(this.data.bucketWiseUlb).map((item: any[]) => item.length))
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
    });
  }

  guidelinesPopup() {
    this.matDialog.open(GuidelinesPopupComponent, {
      width: '450px',
      maxHeight: '90vh'
    });
  }

  videosPopup() {
    this.matDialog.open(VideosPopupComponent, {
      width: '800px'
    });
  }
}
