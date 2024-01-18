import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { GuidelinesPopupComponent } from './guidelines-popup/guidelines-popup.component';
import { VideosPopupComponent } from './videos-popup/videos-popup.component';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { staticFileKeys } from 'src/app/util/staticFileConstant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data;


  constructor(
    private fiscalRankingService: FiscalRankingService,
    private matDialog: MatDialog,
    private dataEntryService: DataEntryService,
  ) { }

  staticFileArray = [
    {
      key: 'FR_LANDING_PAGE_GUIDELINES',
      title: 'Final Guidelines',
      url: ''
    },
    {
      key: 'FR_LANDING_PAGE_BROCHURE',
      title: 'Brochure',
      url: ''
    },
    {
      key: 'FR_LANDING_PAGE_LATEST_VIDEO',
      title: 'Videos',
      url: ''
    },
    {
      key: 'FR_LANDING_PAGE_LAUNCH_VIDEO',
      title: 'Videos',
      url: ''
    },
    {
      key: 'FR_LANDING_PAGE_OLD_CONTACT_DETAILS',
      title: 'CONTACT DETAILS',
      url: ''
    },
    {
      key: 'FR_LANDING_PAGE_DRAFT_GUIDELINES',
      title: 'Draft Guidelines',
      url: ''
    },
  ]
  ngOnInit(): void {
    this.getStaticFile();
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
      maxHeight: '90vh',
      data: {
        draftGuidelines : this.staticFileArray[5].url,
        finalGuidelines : this.staticFileArray[0].url
      }
    });
  }

  videosPopup() {
    this.matDialog.open(VideosPopupComponent, {
      width: '800px',
      data: {
        latestVideofileUrl: this.staticFileArray[2].url,
        launchVideofileUrl: this.staticFileArray[3].url
      }
    });
  }
  getStaticFile(){
    let staticLength = this.staticFileArray?.length;
    for(let i=0; i < staticLength; i++){
      let key = staticFileKeys[`${this.staticFileArray[i].key}`]
      this.dataEntryService.getStaticFileUrl(key).subscribe((res: any) => {
        this.staticFileArray[i].url = res?.data?.url;
      })
    }
   
  }
  

}
