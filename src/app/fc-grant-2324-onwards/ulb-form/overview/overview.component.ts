import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(
    private router: Router,
    private commonServices : CommonServicesService
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.designYearArray = JSON.parse(localStorage.getItem("Years"));
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
    this.cardsOverview = JSON.parse(localStorage.getItem("overViewCard2324"));

    this.getSideBar();
  }
  cardData
  userData;
  width;
  row_width;
  messWidth;
  grantTransferTitle = "View Grant Transfer Certificate";
  utilReportTitle = "Upload Detailed Utilisation Report";
  annualAccountsTitle = "Upload Annual Accounts";
  mpcfTitle = "Fill details for Million Plus Challenge Fund";
  performanceConditionTitle = "Fill details for Performance Condition";
  sideMenuItem:any;
  cardsOverview = [
    {
      label: "Grant Transfer Certificate",
      key: "GTC",
      link: "../grant-tra-certi",
      title: this.grantTransferTitle,
      tooltip: "tooltip",
      image: "../../../../assets//ulbform/gtc.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Utilisation Report",
      key: "DUR",
      link: "../utilisation-report",
      title: this.utilReportTitle,
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/dur.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Annual Acconts",
      key: "AA",
      link: "../annual_acc",
      title: this.annualAccountsTitle,
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/aa.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "PFMS",
      key: "PFMS",
      link: "../pfms_acc",
      title: "Provide details on PFMS Account Linkage",
      tooltip: "tooltip",
      image: "../../../../assets//ulbform/lpa.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Property Tax Operationalisation",
      key: "PTO",
      link: "../pto",
      title: `Furnish details on property tax collection procedures`,
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/aa.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Service Level Benchmarks",
      key: "SLB",
      link: "../slb",
      title: "Fill details for Performance Condition",
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/slb.svg",
      permittedAccounts: [""],
      display: [""],
    },
    // {
    //   label: "slbs",
    //   link: "../slbs",
    //   // title: "Million Plus City Challenge Fund",
    //   tooltip: "tooltip",
    //   image: "../../../../assets/ulbform/mpccf.svg",
    //   permittedAccounts: [""],
    //   display: [""],
    // },
    {
      label: "Open Defecation Free (ODF)",
      key: "ODF",
      link: "../odf",
      title: "Provide ODF rating certificate and other details",
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/plan for water and sanitation.svg",
      permittedAccounts: ["No"],
      display: ["None"],
    },
    {
      label: "Garbage Free City (GFC)",
      key: "GFC",
      link: "../gfc",
      title: "Provide GFC rating certificate and other details",
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/plan for water and sanitation.svg",
      permittedAccounts: ["No"],
      display: ["None"],
    },
  ];

  @ViewChild("myIdentifier")
  myIdentifier: ElementRef;
  message:string = `State Governments to furnish Grant Transfer Certificate for the previous installment of grants in the prescribed format.`;
  message2:string = `Process of collecting notified floor rates of property tax must be operationalized`;
  hover:boolean = false;
  i = 8098987;
  i2 = 8098987;
  itemsPerSlide = 8;
  singleSlideOffset:boolean = true;
  noWrap:boolean = true;
  val:number = 0;
  val2:number = 0;
  cardFit: boolean = false;
  public innerWidth: number;
  status;
  overviewText = `The 15th Finance Commission Grants Management System facilitates seamless
   submission and flow of required information between Urban Local Bodies, State Governments
  and Ministry of Housing and Urban Affairs for the purposes of availing ULB Grants between 2021-26.`;
  count:number = 0;
  percentage:number = 0;
  checkPos:boolean = true;
  backRouter: string;
  nextRouter:string;
  designYearArray: any;
  isApiComplete:boolean = false;
  ngOnInit(): void {
    this.setRouter();
    this.onResize();
  }

  setRouter(){
    for (const key in this.sideMenuItem) {
      //  console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach((element) => {
        if (element?.name == "Overview") {
          console.log('overview name', element);
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
   }
  public onResize() {
      this.innerWidth = window.innerWidth;
      console.log("pk agr", this.innerWidth);
      if (this.innerWidth < 1200) {
        this.itemsPerSlide = 8;
        //  this.cardFit = true;
      }
      if (this.innerWidth > 1000) {
        // console.log('800px')
        this.itemsPerSlide = 5;
      } else if (this.innerWidth > 750) {
        this.itemsPerSlide = 3;
      } else if (this.innerWidth > 600) {
        this.itemsPerSlide = 2;
      } else if (this.innerWidth < 500) {
        this.itemsPerSlide = 2;
      } else {
        this.itemsPerSlide = 5;
      }
      console.log(this.itemsPerSlide);
    }
  getSideBar() {
      let queryParam = {
        role: '',
        year: this.designYearArray["2023-24"],
        _id: ''
      }

      if (this.userData?.role === "ULB") {
        queryParam._id = this.userData?.ulb;
        queryParam.role = this.userData?.role;
      }
      else {
        queryParam._id = localStorage.getItem("ulb_id");;
        queryParam.role = 'ULB';
      }
      this.commonServices.formGetMethod("menu", queryParam).subscribe((res: any) => {
        console.log("left responces..", res);
        localStorage.setItem("leftMenuULB", JSON.stringify(res?.data)); 
        this.cardsOverview = res?.card;
        localStorage.setItem(res?.card, "overViewCard2324");
        this.isApiComplete = true;
      },
      (error)=>{
        console.log('left menu responces', error)
        this.isApiComplete = true;
      }
      );
    }
    ngAfterViewInit() {
      this.row_width = this.myIdentifier?.nativeElement.offsetWidth;
      var height = this.myIdentifier.nativeElement.offsetHeight;
      this.messWidth = this.row_width - 42;
      console.log("Width:" + this.row_width);
      console.log("Height: " + height);
    }
    onUnhover(num) {
      this.hover = false;
      this.val = num;
      console.log("val", this.val, num);
    }

    onHover(num, title, key, item) {
      console.log("index-num", num, title, item);
      this.message = item?.message;
      if (item?.link == "grant-tra-certi") {
        // this.p = (num+3)*125;
        this.val = 0;
        this.hover = true;
        this.i = 1;
        this.checkPos = true;
      }
      if (item?.key == "DUR") {
        //  this.p = (num+2)*120;
        this.val = 1;
        this.hover = true;
        this.i = 2;
        this.checkPos = true;
      }
      if (item?.key == "AnnualAccounts") {
        //  this.p = (num+1)*135;
        this.val = 2;
        this.hover = true;
        this.i = 3;
        this.checkPos = true;
      }

      if (item?.key == "PFMS") {
        //  this.p = (num+3)*125;
        this.val = 3;
        this.hover = true;
        this.i = 4;
        this.checkPos = true;
      }
      if (item?.link == "28SLBsForm") {
        //  this.p = (num+3)*112;
        this.val = 4;
        this.hover = true;
        this.i = 5;
        this.checkPos = true;
      }
      if (item?.key == "ODF") {
        //   this.p = (num+1)*80;
        this.val = 5;
        this.hover = true;
        this.i = 6;
        this.checkPos = true;
      }
      if (item?.key == "GFC") {
        //   this.p = (num+1)*80;
        this.val = 6;
        this.hover = true;
        this.i = 7;
        this.checkPos = true;
      }

      if (item?.key == "cd") {
        // this.p = (num+3)*125;
        this.val = 7;
        this.hover = true;
        this.i = 8;
        this.checkPos = true;
      }
    }

}
