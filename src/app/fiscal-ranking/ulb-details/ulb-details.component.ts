import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService, UlbData } from '../fiscal-ranking.service';


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
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Top rankings',
      url: '/rankings/top-rankings'
    }
  ];

  data: APIResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fiscalRankingService: FiscalRankingService
  ) { }

  get ulbId() {
    return this.activatedRoute.snapshot.params.ulbId;
  }


  ngOnInit(): void {
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
