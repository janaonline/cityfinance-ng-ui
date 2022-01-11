import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-resources-dashboard',
  templateUrl: './resources-dashboard.component.html',
  styleUrls: ['./resources-dashboard.component.scss']
})
export class ResourcesDashboardComponent implements OnInit {

  constructor() { }
  resourcesFilter = new FormControl();
  autoCompleteData: string[] = [
    "Champs-Élysées 1",
    "Lombard Street",
    "Abbey Road",
    "Fifth Avenue",
  ];
  filteredResources: Observable<string[]>;

  cardStyle = cardStyle;
  cardData = [learningCenter, dataSets, reportsPublications, latestNewsUpdates];

  ngOnInit(): void {
    this.filteredResources = this.resourcesFilter.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

  }
  private _filter(value: string): string[] {
    // console.log('value', value)
    if (value != "") {
      const filterValue = this._normalizeValue(value);
      return this.autoCompleteData.filter((data) =>
        this._normalizeValue(data).includes(filterValue)
      );
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }
}
const learningCenter = {
  type: 4,
  title: "Learning Center",
  subTitle: `Lorem ipsum dolor sit amet, consectetur
  adipiscing elit. Morbi porta vitae nisl commodo aliquet. Suspendisse in posuere tellus.`,
  svg: `../../../assets/resources-das/learning.svg`,
  link : 'learning-center/toolkits',
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const dataSets = {
  type: 4,
  title: "Datasets",
  subTitle: `Lorem ipsum dolor sit amet, consectetur
  adipiscing elit. Morbi porta vitae nisl commodo aliquet. Suspendisse in posuere tellus.`,
  svg: `../../../assets/resources-das/dataSets.svg`,
  link : 'data-sets/income_statement',
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const reportsPublications = {
  type: 4,
  title: "Reports & Publications",
  subTitle: `Lorem ipsum dolor sit amet, consectetur
  adipiscing elit. Morbi porta vitae nisl commodo aliquet. Suspendisse in posuere tellus.`,
  svg: `../../../assets/resources-das/reports.svg`,
  link : 'report-publications',
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};
const latestNewsUpdates = {
  type: 4,
  title: "Latest News & Updates",
  subTitle: `Lorem ipsum dolor sit amet, consectetur
  adipiscing elit. Morbi porta vitae nisl commodo aliquet. Suspendisse in posuere tellus.`,
  svg: `../../../assets/resources-das/learning.svg`,
  link : 'latest-news',
  img: "",
  para: "",
  actionButtons: [
    {
      name: "btn1",
      function: "",
    },
    {
      name: "btn2",
      function: "",
    },
  ],
  number: 230,
  amount: "567 Cr",
  projectId: 123,
  text: "",
  id: 1,
};

const cardStyle = {
  width: "15rem",
  borderRadius: "0.7500em",
  height: "13rem",
  // "max-height": "8rem",

};
