import { Component, OnInit, SimpleChange } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ResourcesDashboardService } from "./resources-dashboard.service";

@Component({
  selector: "app-resources-dashboard",
  templateUrl: "./resources-dashboard.component.html",
  styleUrls: ["./resources-dashboard.component.scss"],
})
export class ResourcesDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    protected resourcedashboard: ResourcesDashboardService
  ) {}
  resourcesFilter = new FormControl();
  autoCompleteData: string[] = [
    "Champs-Élysées 1",
    "Lombard Street",
    "Abbey Road",
    "Fifth Avenue",
  ];
  filteredResources: Observable<string[]>;

  cardStyle = cardStyle;
  cardData = [learningCenter, dataSets, reportsPublications];

  // ngOnChanges(changes: SimpleChange): void {
  //   console.log("chanhessss==>", changes);
  // }

  ngOnInit(): void {
    // this.subscribeValue();
    console.log("======>>>>>", this.cardData);
    this.activeCard(0, this.cardData);
    this.filteredResources = this.resourcesFilter.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    if (value != "") {
      const filterValue = this._normalizeValue(value);
      return this.autoCompleteData.filter((data) =>
        this._normalizeValue(data).includes(filterValue)
      );
    }
  }

  ngDoCheck() {
    let url = this.router.url;
    this.cardData.map((elem) => {
      let link = elem.link.split("/")[0];
      if (url.includes(link)) {
        elem[`activeCard`] = true;
      } else {
        elem[`activeCard`] = false;
      }
    });
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }

  activeCard(cardIndex: number, cardData: any) {
    cardData.map((elem, index) => {
      if (index == cardIndex) {
        elem[`activeCard`] = true;
      } else {
        elem[`activeCard`] = false;
      }
    });
  }
  searchFilter(searchFilter:any){
    //queryparam used for url
    this.router.navigate( ['/resources-dashboard/learning-center/toolkits'],
    { queryParams: { search: searchFilter } })
  
    this.resourcedashboard.getSearchedData(searchFilter).subscribe(data => {
      console.log(data)
    })  
  }
}
const learningCenter = {
  type: 4,
  title: "Learning Center",
  subTitle: `Access our research outputs such as digital toolkits, e-learning modules, best practices on municipal finance here.`,
  svg: `../../../assets/resources-das/learning.svg`,
  link: "learning-center/toolkits",
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
  subTitle: `Access raw as well standardized ULB financial statements datasets here.`,
  svg: `../../../assets/resources-das/dataSets.svg`,
  link: "data-sets/income_statement",
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
  subTitle: `Access Municipal Finance related publications here.`,
  svg: `../../../assets/resources-das/reports.svg`,
  link: "report-publications",
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
  link: "latest-news",
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
