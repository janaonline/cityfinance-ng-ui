import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Overview } from './overview.service'
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent extends BaseComponent implements OnInit {

  errMessage = ''
  forms = []
  count = 0
  percentage = 0;
  status = 'In Progress'
  isMillionPlus;
  isUA;
  id = null;
  sessionUlbId = null;
  checkPos = true;
  constructor(private Overview: Overview,
    public activatedRoute: ActivatedRoute) {
    super();

    this.activatedRoute.params.subscribe((val) => {
      const { id } = val;
      if (id) {
        this.id = id;
        console.log('stid', id)
        sessionStorage.setItem('row_id', id);
      }
    });

   }
stateName='';
ulbName ='';
formValue = 0;
factor =0;

itemsPerSlide = 7;
singleSlideOffset = true;
noWrap = true;
val = 0;
cardFit= false;
slides = [
  {image: '../../../../assets//ulbform/lpa.svg'},
  {image: '../../../../assets//ulbform/gtc.svg '},
  {image: '../../../../assets/ulbform/dur.svg'},
  {image: '../../../../assets/ulbform/aa.svg'},
  {image: '../../../../assets/ulbform/slb.svg'},
  {image: '../../../../assets/ulbform/mpccf.svg'},
  {image: '../../../../assets/ulbform/plan for water and sanitation.svg'}
];
public innerWidth: number;

// @HostListener('window:resize', ['$event'])
// public onResize(event) {
//   this.innerWidth = event.target.innerWidth;
//   console.log('pk agr', this.innerWidth)
//   if (this.innerWidth < this.mobileBreakpoint) {
//     console.log('800px')
//     this.itemsPerSlide = 3;
//   } else {
//     this.itemsPerSlide = 5;
//   }
//   console.log(this.itemsPerSlide)
// }
public onResize() {
  this.innerWidth = window.innerWidth;
  console.log('pk agr', this.innerWidth)
  if (this.innerWidth < 1200) {
     this.itemsPerSlide = 7;
     this.cardFit = true;
  }
  if (this.innerWidth > 1000) {
   // console.log('800px')
    this.itemsPerSlide = 5;
  }
  else if(this.innerWidth  > 750){
    this.itemsPerSlide = 3;
  }
  else if(this.innerWidth > 600){
    this.itemsPerSlide = 2;
  }
  else if(this.innerWidth < 500){
    this.itemsPerSlide = 2;
  }
  else {
    this.itemsPerSlide = 5;
  }
  console.log(this.itemsPerSlide)
}

  ngOnInit() {
    this.onResize();
    this.Overview.getData('606aaf854dff55e6c075d219' , this.id)
      .subscribe((res) => {
        console.log('overviewRes', res['response']);
        this.sessionUlbId = res['response']['ulb'];
        this.isMillionPlus = res['response']['isMillionPlus'];
        this.isUA = res['response']['isUA'];
        this.stateName = res['response']['stateName'];
        this.ulbName = res['response']['ulbName'];
        this.forms[0] = res['response']?.steps?.annualAccounts?.isSubmit
        this.forms[1] = res['response']?.steps?.pfmsAccount?.isSubmit
        this.forms[2] = res['response']?.steps?.plans?.isSubmit
        this.forms[3] = res['response']?.steps?.slbForWaterSupplyAndSanitation?.isSubmit
        this.forms[4] = res['response']?.steps?.utilReport?.isSubmit
        switch (this.loggedInUserType) {
          case USER_TYPE.STATE:
          case USER_TYPE.PARTNER:
          case USER_TYPE.MoHUA:
          case USER_TYPE.ADMIN:
            this.storeUlbId();
            break;

        }

        this.accessGrant();
        for (let key of this.forms) {
          if (key) {

            this.count = this.count + key;

          }

        }
        if(this.isUA =='Yes' && (this.isMillionPlus == 'Yes' || this.isMillionPlus == 'No' )){
        this.formValue = 5;
        this.factor = 100/this.formValue;
        }
        else if (this.isUA == 'No' && this.isMillionPlus == 'No') {
          this.formValue = 4;
          this.factor = 100/(+this.formValue);
          console.log('no. no', this.factor)
        }
        else if (this.isUA == 'No' && this.isMillionPlus == 'Yes') {
          this.formValue = 3;
          this.factor = 100 / this.formValue;
        } else {
          this.formValue = 5;
          this.factor = 100 / this.formValue;

        }
        this.percentage = this.count * this.factor;
        // this.percentage = this.count * 20;
        if (this.percentage == 100) {
          this.status = 'Completed'
        }
      },
        error => {
          this.errMessage = error.error;
          console.log(this.errMessage);
        });

  }
  headertext = 'The 15th Finance Commission Grants Management System facilitates seamless submission and flow of required information between Urban Local Bodies, State Governments and Ministry of Housuing and Urban Affairs for the purposes of availaing ULB Grants between 2021-2026.'
  cards = [
    'Linking PFMS Account',
    'Grant Transfer Certificate',
    'Detailed Utilization Report',
    'Annual Accounts',
    'Service Level Benchmarks',
    'Million Plus City Challenge Fund',
    'Plans for Water and Sanitation'
  ]
  p = 60;
  position = 0;
  resourceNames = [
    '15th Finance Commission Report',
    'Operational Guidelines',
    'User Manual for ULBs',
    'Detailed Utilization Report Format',
    'National Municipal Accounting Manual'
  ]
  colors = [
    '#73C557, #3A632C',
    '#42C9F6, #21657B',
    '#F16831, #793419',
    '#549D5E, #2A4F2F',
    '#FDCB2E, #7F6617',
    '#E71368, #740A34',
    '#9D198B, #4F0D46',
  ]

  imageUrls = [
    "../../../../assets/ulbform/overview/Picture1.png",
    "../../../../assets/ulbform/overview/Picture2.png",
    "../../../../assets/ulbform/overview/Picture3.png",
    "../../../../assets/ulbform/overview/Picture4.png",
    "../../../../assets/ulbform/overview/Picture5.png",
  ]
  message = "Each ULB's Account for 15th FC Grants must be Linked with PFMS before 1 April 2021";
  hover = false
  i = 8098987

  public accessGrant(){
    if(this.id == null){
      console.log('abc', this.id)
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.isMillionPlus = userData.isMillionPlus;
      this.isUA = userData.isUA;
      console.log('12if' , this.isMillionPlus, this.isUA)
    }else{
      this.isMillionPlus =sessionStorage.getItem('isMillionPlus');
      this.isUA = sessionStorage.getItem('isUA')
      console.log('12elseblock', this.isMillionPlus, this.isUA)
    }


  }
  link =[
    '../pfms_acc',
    '../grant-tra-certi',
    '../utilisation-report',
    '../annual_acc',
    '../service-level',
    '../slbs',
    '../water-sanitation'

]
  storeUlbId(){
    sessionStorage.setItem('ulb_id', this.sessionUlbId);
    // sessionStorage.setItem('isMillionPlus', this.isMillionPlus);
    // sessionStorage.setItem('isUA', this.isUA);
    // sessionStorage.setItem('stateName', this.stateName);
    // sessionStorage.setItem('ulbName', this.ulbName);
    console.log('ulb_id', this.sessionUlbId)
  }
  onUnhover(num) {
    this.hover = false
    this.val = num;
    console.log('val', this.val, num)
  }
  // onHover1() {
  //  // this.p = 80;
  //     this.hover = true;
  //     this.i = 1;
  //     this.message = "Each ULB's Account for 15th FC Grants must be Linked with PFMS before 1 April 2021";
  // }
  onHover(num) {
    console.log('index-num', num);

    if(num == 0){
   //   this.p = (num+1)*80;
      this.val = 0;
      this.hover = true;
      this.i = 1;
      this.message = "Each ULB's Account for 15th FC Grants must be Linked with PFMS before 1 April 2021";
      this.checkPos =true;
    }
    if(num == 1){
    //  this.p = (num+1)*135;
        this.val=1;
        this.hover = true;
        this.i = 2;
        this.message = "State Governments to furnish Grant transfer certificate for last installment of grants in the prescribed format."
        this.checkPos =true;
      }
    if(num == 2){
    //  this.p = (num+2)*120;
       this.val =2;
       this.hover = true;
       this.i = 3;
       this.message = "ULBs are mandated to furnish detailed utilization report as per prescribed format for the previous installments (with a year lag) of 15th FC grants"
       this.checkPos =true;
    }
    if(num == 3){
   //  this.p = (num+3)*112;
       this.val = 3;
       this.hover = true;
       this.i = 4;
       this.message = "ULBs to upload provisional annual accounts for previous year and audited annual accounts for year previous year w.r.t. award year."
       this.checkPos =true;
    }
    if(num == 4){
    //  this.p = (num+3)*125;
       this.val = 4;
       this.hover = true;
       this.i = 5;
       this.message = "ULBs to publish 28 Service Level Benchmarks pertaining to water supply, waste water management, solid waste management and storm water drainage."
       this.checkPos =true;
      }
    if(num == 5){
     // this.p = (num+3)*125;
        this.val =5;
        this.hover = true;
        this.i = 6;
        this.message = "NMPCs to select 1 Project for water and 1 Project for sanitation with clear functional outcomes"
        this.checkPos =true;
    }
    if(num == 6){
    //  this.p = (num+3)*120;
       this.val =6;
       this.hover = true;
       this.i = 7;
       this.message = "Million-plus Urban Agglomerations to meet performance criteria in addition to mandatory conditions. State and UA to sign MoU with MoHUA on the year-wise action plan to meet targeted outcomes."
       this.checkPos =true;
    }


    console.log('val', this.val, num)
  }


//   onHover2() {
//     this.p = 215;
//     this.hover = true;
//     this.i = 2;
//     this.message = "State Governments to furnish Grant transfer certificate for last installment of grants in the prescribed format."
//   }
//   onHover3() {
//     this.p = 355;
//     this.hover = true;
//     this.i = 3;
//     this.message = "ULBs are mandated to furnish detailed utilization report as per prescribed format for the previous installments (with a year lag) of 15th FC grants"
//   }
//   onHover4() {
//     this.p = 495;
//     this.hover = true;
//     this.i = 4;
//     this.message = "ULBs to upload provisional annual accounts for previous year and audited annual accounts for year previous year w.r.t. award year."
//   }
//   onHover5() {
//     this.p = 630;
//     this.hover = true;
//     this.i = 5;
//     this.message = "ULBs to publish 28 Service Level Benchmarks pertaining to water supply, waste water management, solid waste management and storm water drainage."
//   }
//   onHover6() {
//     this.p = 770;
//     this.hover = true;
//     this.i = 6;
//     this.message = "NMPCs to select 1 Project for water and 1 Project for sanitation with clear functional outcomes"
//   }
//   onHover7() {
//     this.p = 910;
//     this.hover = true;
//     this.i = 7;
//     this.message = "Million-plus Urban Agglomerations to meet performance criteria in addition to mandatory conditions. State and UA to sign MoU with MoHUA on the year-wise action plan to meet targeted outcomes."
//   }
 }
