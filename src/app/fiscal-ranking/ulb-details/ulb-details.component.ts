import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService, UlbData } from '../fiscal-ranking.service';
import { environment } from 'src/environments/environment';


interface APIResponse {
  assessmentParameter: any;
  fsData: {
    [key: string]: {
      value: string | null;
      status: 'APPROVED' | 'REJECTED' | 'PENDING';
    }
  },
  topUlbs: UlbData[];
  ulb: any;
}

@Component({
  selector: 'app-ulb-details',
  templateUrl: './ulb-details.component.html',
  styleUrls: ['./ulb-details.component.scss']
})
export class UlbDetailsComponent implements OnInit {


  breadcrumbLinks: BreadcrumbLink[] = [
    {
      // label: 'City Finance Ranking - Home',
      label: 'Back to input form',
      // url: '/rankings/home',
     url: '/rankings/ulb-form'
    },
    // {
    //   label: 'Top rankings',
    //   url: '/rankings/ulb-form'
    //   // url: '/rankings/top-rankings'
    // }
  ];

  data: APIResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fiscalRankingService: FiscalRankingService,
    private _router: Router,
  ) {
    if(environment?.isProduction) {
       this._router.navigateByUrl('rankings/home')
      }
   }

  get ulbId() {
    return this.activatedRoute.snapshot.params.ulbId;
  }

  userData:any;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if(this.userData?.role != 'ULB') this.breadcrumbLinks[0].url = `/rankings/ulb/${this.ulbId}`
    this.breadcrumbLinks.push({
      label: 'ULB details',
      url: `/rankings/ulb/${this.ulbId}`,
      class: 'disabled'
    });

    this.loadUlbData();
  }

  loadUlbData() {
    this.fiscalRankingService.ulbDetails(this.ulbId).subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
    })
  }

}
