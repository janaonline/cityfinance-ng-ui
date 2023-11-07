import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';

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

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  get ulbId() {
    return this.activatedRoute.snapshot.params.ulbId;
  }

  ngOnInit(): void {
    this.breadcrumbLinks.push({
      label: 'Ulb details',
      url: `/rankings/ulb/${this.ulbId}`
    });
  }

}
