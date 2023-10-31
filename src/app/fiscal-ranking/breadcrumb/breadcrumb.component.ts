import { Component, Input, OnInit } from '@angular/core';

export interface BreadcrumbLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() links: BreadcrumbLink[];

  constructor() { }

  ngOnInit(): void {
  }

}
