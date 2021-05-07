import { Component, OnInit } from '@angular/core';
import { Overview } from './overview.service'
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  errMessage = ''
  forms = []
  count = 0
  percentage = 0;
  status = 'In Progress'
  isMillionPlus;
    isUA;
  constructor(private Overview: Overview) {
    this.accessGrant();
   }

  ngOnInit() {
    this.Overview.getData('606aaf854dff55e6c075d219')
      .subscribe((res) => {
        console.log(res);
        this.forms[0] = res['response']?.steps?.annualAccounts?.isSubmit
        this.forms[1] = res['response']?.steps?.pfmsAccount?.isSubmit
        this.forms[2] = res['response']?.steps?.plans?.isSubmit
        this.forms[3] = res['response']?.steps?.slbForWaterSupplyAndSanitation?.isSubmit
        this.forms[4] = res['response']?.steps?.utilReport?.isSubmit

        for (let key of this.forms) {
          if (key) {
            this.count = this.count + key;

          }

        }
        this.percentage = this.count * 20;
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
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.isMillionPlus =  userData.isMillionPlus;
    this.isUA = userData.isUA;
    console.log('milli', this.isMillionPlus)
    console.log('Ua', this.isUA)
  }
  onUnhover() {
    this.hover = false

  }
  onHover1() {
    this.p = 60;
    this.hover = true;
    this.i = 1;
    this.message = "Each ULB's Account for 15th FC Grants must be Linked with PFMS before 1 April 2021";
  }
  onHover2() {
    this.p = 215;
    this.hover = true;
    this.i = 2;
    this.message = "State Governments to furnish Grant transfer certificate for last installment of grants in the prescribed format."
  }
  onHover3() {
    this.p = 370;
    this.hover = true;
    this.i = 3;
    this.message = "ULBs are mandated to furnish detailed utilization report as per prescribed format for the previous installments (with a year lag) of 15th FC grants"
  }
  onHover4() {
    this.p = 515;
    this.hover = true;
    this.i = 4;
    this.message = "ULBs to upload provisional annual accounts for previous year and audited annual accounts for year previous year w.r.t. award year."
  }
  onHover5() {
    this.p = 665;
    this.hover = true;
    this.i = 5;
    this.message = "ULBs to publish 28 Service Level Benchmarks pertaining to water supply, waste water management, solid waste management and storm water drainage."
  }
  onHover6() {
    this.p = 815;
    this.hover = true;
    this.i = 6;
    this.message = "NMPCs to select 1 Project for water and 1 Project for sanitation with clear functional outcomes"
  }
  onHover7() {
    this.p = 967;
    this.hover = true;
    this.i = 7;
    this.message = "Million-plus Urban Agglomerations to meet performance criteria in addition to mandatory conditions. State and UA to sign MoU with MoHUA on the year-wise action plan to meet targeted outcomes."
  }
}
