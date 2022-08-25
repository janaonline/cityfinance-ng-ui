import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  constructor(public newCommonService: NewCommonService) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.cardData = JSON.parse(localStorage.getItem("overViewCard"));

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
  message = `State Governments to furnish Grant Transfer Certificate for the previous installment of grants in the prescribed format.`;
  message2 = `Process of collecting notified floor rates of property tax must be operationalized`;
  hover = false;
  i = 8098987;
  i2 = 8098987;
  itemsPerSlide = 8;
  singleSlideOffset = true;
  noWrap = true;
  val = 0;
  val2 = 0;
  cardFit = false;
  public innerWidth: number;
  status;
  overviewText = `The 15th Finance Commission Grants Management System facilitates seamless
   submission and flow of required information between Urban Local Bodies, State Governments
  and Ministry of Housing and Urban Affairs for the purposes of availing ULB Grants between 2021-26.`;
  count = 0;
  percentage = 0;
  checkPos = true;
  backRouter;
  nextRouter;
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
    console.log("user Data", this.userData);
     if (this.userData?.role == "ULB") {
       let ulbId = this.userData?.ulb;
       let role = this.userData?.role;
       let isUA = this.userData?.isUA;
       this.newCommonService
         .getLeftMenu(ulbId, role, isUA)
         .subscribe((res: any) => {
           console.log("left responces..", res);
           this.cardsOverview = res?.card;
           this.onHover(0, "", "GTC", this.cardsOverview[0]);
           // this.leftMenu = res;
         });
     } else {
       this.cardsOverview = this.cardData;
       console.log("over ", this.cardsOverview);

       this.onHover(0, "", "GTC", this.cardsOverview[0]);
     }

  }
  ngAfterViewInit() {
    this.row_width = this.myIdentifier.nativeElement.offsetWidth;
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
      //  this.message = "NMPCs to select 1 Project for water and 1 Project for sanitation with clear functional outcomes"
      //  this.message = `MoHUA will assess performance of MPC in SWM against ODF rating of ULBs based on details provided.`;
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
      // this.message = "State Governments to furnish Grant transfer certificate for last installment of grants in the prescribed format."
      //  this.message = `State Governments to furnish Grant Transfer Certificate for the previous installment of grants in the prescribed format.`;
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
      // this.message = "Each ULB's Account for 15th FC Grants must be Linked with PFMS before 1 April 2021";
      //  this.message = `Process of collecting notified floor rates of property tax must be operationalized.`;
      this.checkPos = true;
    }

    if (item?.key == "cd") {
      // this.p = (num+3)*125;
      this.val = 7;
      this.hover = true;
      this.i = 8;
      //  this.message = "NMPCs to select 1 Project for water and 1 Project for sanitation with clear functional outcomes"
      // this.message = `MoHUA will assess performance of MPC in SWM against GFC rating of ULBs based on details provided.`;
      this.checkPos = true;
    }
  }

}
