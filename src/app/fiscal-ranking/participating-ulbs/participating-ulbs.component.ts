import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-participating-ulbs',
  templateUrl: './participating-ulbs.component.html',
  styleUrls: ['./participating-ulbs.component.scss']
})
export class ParticipatingUlbsComponent implements OnInit {

  constructor() { }
  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home',
      class: ''
    },
    {
      label: 'Participated States & UT ',
      url: '/rankings/participated-states-ut',
      class: ''
    },
    {
      label: 'Participated ULBs',
      url: '/rankings/participated-ulbs',
      class: 'disabled'
    },

  ];
  ngOnInit(): void {
  }

}
