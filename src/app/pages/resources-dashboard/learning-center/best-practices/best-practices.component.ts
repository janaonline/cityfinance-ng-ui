import { Component, OnInit } from "@angular/core";
import { ResourcesDashboardService } from "../../resources-dashboard.service";

@Component({
  selector: "app-best-practices",
  templateUrl: "./best-practices.component.html",
  styleUrls: ["./best-practices.component.scss"],
})
export class BestPracticesComponent implements OnInit {
  constructor(private resourcesDashboard: ResourcesDashboardService) {
    this.resourcesDashboard.castCount.subscribe((res: any) => {
      // this.pdfInput.globalName = res?.name
      this.globalName = res?.name
    })
  }
  globalName: string = ""
  filterComponent;
  today: any = new Date();
  currentDate;
  cardData = [
    {
      url: "https://staging.cityfinance.in/objects/6635158f-2572-4227-aad1-1a0c2f12b3db.pdf",
      state: "Karnataka",
      title: "Online self-assessment system for property tax in Bengaluru",
    },
    {
      url: "https://staging.cityfinance.in/objects/56974f83-a8fd-49b7-bd80-9e3c9c0892cb.pdf",
      state: "Odisha",
      title:
        "Easing Property Tax Collections using Handheld MPOS devices in Odisha",
    },
    {
      url: "https://staging.cityfinance.in/objects/33a714ec-2b3e-4a20-beed-1dda17a587fd.pdf",
      state: "Andhra Pradesh",
      title: "Maximizing Channels and Modes of Payment in Andhra Pradesh",
    },
    {
      url: "https://staging.cityfinance.in/objects/e9443910-18e7-44f5-b2e6-c2c4a9e4d7b6.pdf",
      state: "Jharkhand",
      title:
        "Optimization of Tax Collection- The Case of Outsourcing in Ranchi",
    },
    {
      url: "https://staging.cityfinance.in/objects/385ddbdc-41bf-4c7a-be6d-e54440828812.pdf",
      state: "Andhra Pradesh",
      title:
        "Creation of Single Digital Repository of Property Data in Andhra Pradesh",
    },
    {
      url: "https://staging.cityfinance.in/objects/bdd72087-8ae3-424e-a08a-45064931100f.pdf",
      state: "Chhattisgarh",
      title:
        "Improvement of GIS-Based Municipal Tax and Fee Collection System at Raipur",
    },
    {
      url: "https://staging.cityfinance.in/objects/57db3555-8d75-485c-a930-d85c68e3a855.pdf",
      state: "Punjab",
      title:
        "Integration of Property Tax database with Electricity Distribution database in Punjab",
    },
    {
      url: "https://staging.cityfinance.in/objects/fb3b7701-14f5-4fca-ad63-f09556377bfb.pdf",
      state: "Tamil Nadu",
      title: "City-level competition for revenue officials (MPL) in Coimbatore",
    },
    {
      url: "https://staging.cityfinance.in/objects/2068d32f-9922-4944-b1a2-9cb4cd1107a3.pdf",
      state: "Tamil Nadu",
      title: "Inter-zonal competition of revenue officials in Chennai",
    },
    {
      url: "https://staging.cityfinance.in/objects/9970cb91-bf2c-43b2-9059-5bfc6c0d00a2.pdf",
      state: "Odisha",
      title: "State-level competition for revenue officials (MPL) in Odisha",
    },
  ];

  // cardData = [
  //   {
  //     label: 'Mira- Bhayandar Sewerage Management Project',
  //     info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
  //     commodo aliquet. Suspendisse in posuere tellus.`,
  //     link: '',
  //     type: 'pdf',
  //     updateDate: 'October 14, 2021'
  //   },
  //   {
  //     label: 'Mira- Bhayandar Sewerage Management Project',
  //     info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
  //     commodo aliquet. Suspendisse in posuere tellus.`,
  //     link: '',
  //     type: 'pdf',
  //     updateDate: 'October 14, 2021'
  //   },
  //   {
  //     label: 'Mira- Bhayandar Sewerage Management Project',
  //     info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
  //     commodo aliquet. Suspendisse in posuere tellus.`,
  //     link: '',
  //     type: 'excel',
  //     updateDate: 'October 14, 2021'
  //   },
  //   {
  //     label: 'Mira- Bhayandar Sewerage Management Project',
  //     info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
  //     commodo aliquet. Suspendisse in posuere tellus.`,
  //     link: '',
  //     type: 'pdf',
  //     updateDate: '06/01/2022'
  //   },
  //   {
  //     label: 'Mira- Bhayandar Sewerage Management Project',
  //     info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
  //     commodo aliquet. Suspendisse in posuere tellus.`,
  //     link: '',
  //     type: 'excel',
  //     updateDate: '06/01/2022'
  //   },
  //   {
  //     label: 'Mira- Bhayandar Sewerage Management Project',
  //     info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
  //     commodo aliquet. Suspendisse in posuere tellus.`,
  //     link: '',
  //     type: 'pdf',
  //     updateDate: '06/01/2022'
  //   },
  // ]

  pdfInput: any = {
    toolKitVisible: "",
    type: "PDF",
    header: "learning_center",
    subHeader: "best_practices",
    globalName: "",
    state: "",
    ulb: "",
    year: "",
  }

  getData() {
    this.resourcesDashboard.getPdfData(this.pdfInput).subscribe(
      (res: any) => {
      console.log("best practice data", res)
        this.cardData =  res?.data;
    }, (err: any) => {
      this.cardData = []
    })
  
  }
  ngOnInit(): void {
    console.log("globalName==>",this.globalName)
    if(this.globalName) {
      this.pdfInput.globalName = this.globalName
    }
    this.getData()
    this.currentDate =
      this.today.getFullYear() +
      "-" +
      (this.today.getMonth() + 1) +
      "-" +
      this.today.getDate();
    this.filterComponent = {
      comp: "bestPractices",
    };
    console.log("currentDate", this.currentDate);
  }

  filterData(e) {
    console.log("best practices", e);
    this.pdfInput.state = e.value.state;
    this.pdfInput.ulb = e.value.ulb
    this.pdfInput.year = e.value.year
    this.getData()
  }
}
