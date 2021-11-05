import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Overview } from "./overview.service";
import { USER_TYPE } from "src/app/models/user/userType";
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { UlbformService } from "../ulbform.service";
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent extends BaseComponent implements OnInit {
  errMessage = "";
  forms = [];
  count = 0;
  percentage = 0;
  status = "";
  isMillionPlus;
  USER_TYPE = USER_TYPE;
  isUA;
  id = null;
  //  sessionUlbId = null;
  checkPos = true;
  annualStatus;
  userData = JSON.parse(localStorage.getItem("userData"));

  constructor(
    private Overview: Overview,
    public activatedRoute: ActivatedRoute,
    public ulbformService: UlbformService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    super();

    this.activatedRoute.params.subscribe((val) => {
      const { id } = val;
      if (id) {
        this.id = id;
        console.log('stid', id)
        sessionStorage.setItem('row_id', this.id);
      } else {
        this.id = sessionStorage.getItem('row_id')
      }
    });
  }
  stateName = "";
  ulbName = "";
  formValue = 0;
  factor = 0;

  itemsPerSlide = 7;
  singleSlideOffset = true;
  noWrap = true;
  val = 0;
  cardFit = false;
  grantTransferTitle = 'View Grant Transfer Certificate'
  utilReportTitle = 'Upload Detailed Utilisation Report'
  annualAccountsTitle = 'Upload Annual Accounts'
  mpcfTitle = 'Fill details for Million Plus Challenge Fund'
  performanceConditionTitle = 'Fill details for Performance Condition'
  cardsOverview = [
    // {
    //   label: "PFMS",
    //   link: "../pfms_acc",
    //   title: "Linking of PFMS Account",
    //   tooltip: "tooltip",
    //   image: "../../../../assets//ulbform/lpa.svg",
    //   permittedAccounts: [""],
    //   display: [""],
    // },
    {
      label: "Grant Transfer Certificate",
      link: "../grant-tra-certi",
      title: this.grantTransferTitle,
      tooltip: "tooltip",
      image: "../../../../assets//ulbform/gtc.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Utilisation Report",
      link: "../utilisation-report",
      title: this.utilReportTitle,
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/dur.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Annual Acconts",
      link: "../annual_acc",
      title: this.annualAccountsTitle,
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/aa.svg",
      permittedAccounts: [""],
      display: [""],
    },
    // {
    //   label: "service-level",
    //   link: "../service-level",
    //   title: "Service Level Benchmarks",
    //   tooltip: "tooltip",
    //   image: "../../../../assets/ulbform/slb.svg",
    //   permittedAccounts: [""],
    //   display: [""],
    // },
    {
      label: "slbs",
      link: "../slbs",
      // title: "Million Plus City Challenge Fund",
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/mpccf.svg",
      permittedAccounts: [""],
      display: [""],
    },
    // {
    //   label: "Plan water sanitation",
    //   link: "../water-sanitation",
    //   title: "Plans for Water and Sanitation",
    //   tooltip: "tooltip",
    //   image: "../../../../assets/ulbform/plan for water and sanitation.svg",
    //   permittedAccounts: ["No"],
    //   display: ["None"],
    // },
  ];
  width;
  row_width;
  messWidth;
  @ViewChild("myIdentifier")
  myIdentifier: ElementRef;
  ngAfterViewInit() {
    this.row_width = this.myIdentifier.nativeElement.offsetWidth;
    var height = this.myIdentifier.nativeElement.offsetHeight;
    this.messWidth = this.row_width - 42;
    console.log("Width:" + this.row_width);
    console.log("Height: " + height);
  }

  public innerWidth: number;
  public onResize() {
    this.innerWidth = window.innerWidth;
    console.log("pk agr", this.innerWidth);
    if (this.innerWidth < 1200) {
      this.itemsPerSlide = 7;
      this.cardFit = true;
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

  async ngOnInit() {




    this.onResize();
    await this.getData();
    this.accessGrant();
  }
  getData() {
    console.log('.......id', this.id)
    return new Promise((resolve, reject) => {
      this.Overview.getData("606aaf854dff55e6c075d219", this.id).subscribe(
        (res) => {
          console.log("overviewRes", res["response"]);
          sessionStorage.setItem("masterForm", JSON.stringify(res["response"]));
          this.stateName = res["response"]["stateName"];
          this.percentage = Number(res['percentage'])
          if (this.userData.role != USER_TYPE.ULB)
            this.ulbName = sessionStorage.getItem("ulbName");
          else
            this.ulbName = res["response"]["ulbName"];

          this.annualStatus = res["response"]["steps"]['annualAccounts']['status'];
          this.forms[0] = res["response"]?.steps?.annualAccounts?.isSubmit;
          //   this.forms[1] = res["response"]?.steps?.pfmsAccount?.isSubmit;
          //   this.forms[2] = res["response"]?.steps?.plans?.isSubmit;
          this.forms[3] =
            res["response"]?.steps?.slbForWaterSupplyAndSanitation?.isSubmit;
          this.forms[4] = res["response"]?.steps?.utilReport?.isSubmit;
          // switch (this.loggedInUserType) {
          //   case USER_TYPE.STATE:
          //   case USER_TYPE.PARTNER:
          //   case USER_TYPE.MoHUA:
          //   case USER_TYPE.ADMIN:
          //     this.storeUlbId();
          //     break;

          // }
          for (let key of this.forms) {
            if (key) {
              this.count = this.count + key;
            }
          }
          resolve("Success");
        },
        (error) => {
          this.errMessage = error.error;
          console.log(this.errMessage);
          resolve("Success");
        }
      );
    });
  }
  headertext = `The 15th Finance Commission Grants Management System
  facilitates seamless submission and flow of required information
   between Urban Local Bodies, State Governments and Ministry
  of Housing and Urban Affairs for the purposes of availing ULB Grants between 2021-26.`;
  numcard = 0;
  p = 60;
  position = 0;
  resourceNames = [
    "ULB Nodal Officers Manual for Claiming XV FC ULB Grants for 2021-22",
    "State Nodal Officers Manual for Claiming XV FC ULB Grants for 2021-22",
    "XV-FC VOL I Main Report 2021-26",
    "XV-FC -VOL II Annexes 2021-26",
    "XV-FC recommended Urban Local Body Final Operational Guidelines for 2021-26",
  ];
  colors = [
    "#73C557, #3A632C",
    "#42C9F6, #21657B",
    "#F16831, #793419",
    "#549D5E, #2A4F2F",
    "#FDCB2E, #7F6617",
    "#E71368, #740A34",
    "#9D198B, #4F0D46",
  ];

  imageUrls = [
    "../../../../assets/ulbform/overview/Picture1.png",
    "../../../../assets/ulbform/overview/Picture2.png",
    "../../../../assets/ulbform/overview/Picture3.png",
    "../../../../assets/ulbform/overview/Picture4.png",
    "../../../../assets/ulbform/overview/Picture5.png",
  ];
  message =
    "Each ULB's Account for 15th FC Grants must be Linked with PFMS before 1 April 2021";
  hover = false;
  i = 8098987;

  public accessGrant() {
    if (this.id == null) {
      console.log("abc", this.id);
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.isMillionPlus = userData.isMillionPlus;
      this.isUA = userData.isUA;
      console.log("12if", this.isMillionPlus, this.isUA);
    } else {
      this.isMillionPlus = sessionStorage.getItem("isMillionPlus");
      this.isUA = sessionStorage.getItem("isUA");
      console.log("12elseblock", this.isMillionPlus, this.isUA);
    }
    console.log("overview", this.isUA, this.isMillionPlus);
    if (this.isUA == "Yes") {
      this.cardsOverview[3].title = this.mpcfTitle
      this.cardsOverview = this.cardsOverview;
      this.formValue = 3;
      this.factor = 100 / this.formValue;
      this.numcard = 4;
    } else if (this.isUA == "No") {
      this.formValue = 3;
      this.cardsOverview[3].title = this.performanceConditionTitle
      let userType = "Yes";
      this.cardsOverview = this.cardsOverview.filter(
        (item) => !item.permittedAccounts.includes(userType)
      );
      this.factor = 100 / +this.formValue;
      this.numcard = 4;
      console.log("no. no", this.factor);
    }

    this.width = this.row_width / this.numcard - 8;
    // this.percentage = this.count * this.factor;
    // console.log('ppercent', typeof (this.percentage), this.count);

    // this.percentage = this.count * 20;
    if (this.percentage == 100) {
      this.status = 'Completed'
      console.log('ppercent', this.percentage);
    }
    if (this.percentage > 0 && this.percentage < 100) {
      this.status = 'In Progress'
      console.log('ppercent', this.percentage);
    }
    if (this.percentage == 0) {
      this.status = 'Not Started'
      console.log('ppercent', this.percentage);
    }
    let eligibleForms = [];
    let eligibleActionForms = [];
    this.cardsOverview.forEach((element) => {
      if (element.label != "Grant Transfer Certificate") {
        if (element.label != 'Plan water sanitation') {
          if (element.label != "service-level") {
            if (element.label != "PFMS") {
              eligibleForms.push(element.label);
              console.log(element.label);
              if ((element.label != "PFMS") && !(element.label == "Annual Acconts" && this.annualStatus == 'N/A')
              ) {
                eligibleActionForms.push(element.label);
              }
            }
          }
        }
      };

      sessionStorage.setItem("eligibleForms", JSON.stringify(eligibleForms));
      sessionStorage.setItem("eligibleActionForms", JSON.stringify(eligibleActionForms)
      );
      this.ulbformService.setForms.next(true);
    })

  }
  onUnhover(num) {
    this.hover = false;
    this.val = num;
    console.log("val", this.val, num);
  }

  onHover(num, title) {
    console.log('index-num', num, title);
    // if (title == 'Linking of PFMS Account') {
    //   //   this.p = (num+1)*80;
    //   this.val = 0;
    //   this.hover = true;
    //   this.i = 1;
    //   // this.message = "Each ULB's Account for 15th FC Grants must be Linked with PFMS before 1 April 2021";
    //   this.message = `Each ULB's account for 15th FC Grants must be linked with Public Financial Management System
    //    before 1 April 2021`;
    //   this.checkPos = true;
    // }
    if (title == this.grantTransferTitle) {
      //  this.p = (num+1)*135;
      this.val = 0;
      this.hover = true;
      this.i = 1;
      // this.message = "State Governments to furnish Grant transfer certificate for last installment of grants in the prescribed format."
      this.message = `State Governments to furnish Grant Transfer Certificate
     for the previous installment of grants in the prescribed format.`;
      this.checkPos = true;
    }
    if (title == this.utilReportTitle) {
      //  this.p = (num+2)*120;
      this.val = 1;
      this.hover = true;
      this.i = 2;
      // this.message = "ULBs are mandated to furnish detailed utilization report as per prescribed format for the previous installments (with a year lag) of 15th FC grants"
      this.message = `ULBs are mandated to furnish Detailed Utilisation Report as per
      prescribed format for the previous installments of 15th FC grants`;
      this.checkPos = true;
    }

    if (title == this.annualAccountsTitle) {
      //  this.p = (num+3)*112;
      this.val = 2;
      this.hover = true;
      this.i = 3;
      //  this.message = "ULBs to upload provisional annual accounts for
      //    previous year and audited annual accounts for year previous year w.r.t. award year."
      this.message = `ULBs to upload Provisional Annual Accounts for previous year
    and Audited Annual Accounts for year before previous year with respect to the award year.`;
      this.checkPos = true;
    }
    // if (title == 'Service Level Benchmarks') {
    //   //  this.p = (num+3)*125;
    //   this.val = 4;
    //   this.hover = true;
    //   this.i = 5;
    //   //  this.message = "ULBs to publish 28 Service Level Benchmarks pertaining to water supply, waste water management, solid waste management and storm water drainage."
    //   this.message = `ULBs to publish 28 Service Level Benchmarks pertaining to
    //   Water Supply, Waste Water Management, Solid Waste Management and Storm Water Drainage.`;
    //   this.checkPos = true;
    // }
    if (title == this.mpcfTitle) {
      // this.p = (num+3)*125;
      this.val = 3;
      this.hover = true;
      this.i = 4;
      //  this.message = "NMPCs to select 1 Project for water and 1 Project for sanitation with clear functional outcomes"
      this.message = `Million-plus Urban Agglomerations (UA) to meet performance criteria in addition to entry level conditions. State and UA to sign Memorandum of Understanding with Ministry of
      Housing and Urban Affairs (MoHUA) on the year-wise action plan to meet targeted outcomes.`;
      this.checkPos = true;
    }
    if (title == this.performanceConditionTitle) {
      // this.p = (num+3)*125;
      this.val = 3;
      this.hover = true;
      this.i = 4;
      //  this.message = "NMPCs to select 1 Project for water and 1 Project for sanitation with clear functional outcomes"
      this.message = `Performance condition grants will be recommended by MoHUA based on the publication of
      Baseline data, annual targets, and achievement thereof. If the targets are achieved, NMPCs will be eligible for
       receiving the undistributed portion of grants meant for MPCs.`;
      this.checkPos = true;
    }

    //   if (title == 'Plans for Water and Sanitation') {
    //     //  this.p = (num+3)*120;

    //     this.hover = true;
    //     if (num == 5) {
    //       this.i = 6;
    //       this.val = 5;
    //     }
    //     else {
    //       this.i = 7;
    //       this.val = 6;
    //     }
    //     //  this.message = "Million-plus Urban Agglomerations to meet performance criteria in addition to mandatory conditions. State and UA to sign MoU with MoHUA on the year-wise action plan to meet targeted outcomes."
    //     this.message = `Non-Million Plus Cities to select 1 Project for Water
    //  and 1 Project for Sanitation with clear functional outcomes`;
    //     this.checkPos = true;
    //   }
  }
}
