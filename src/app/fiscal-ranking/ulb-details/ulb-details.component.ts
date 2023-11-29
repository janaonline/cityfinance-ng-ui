import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService } from '../fiscal-ranking.service';

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
  data;


  constructor(
    private activatedRoute: ActivatedRoute,
    private fiscalRankingService: FiscalRankingService
  ) { }

  get ulbId() {
    return this.activatedRoute.snapshot.params.ulbId;
  }


  ngOnInit(): void {
    this.breadcrumbLinks.push({
      label: 'Ulb details',
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
