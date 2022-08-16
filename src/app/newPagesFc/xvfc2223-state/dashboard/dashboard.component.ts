import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  viewMode = 'tab1';
  formdata: any;
  navTabFirst: boolean = true;
  navTabSecond: boolean = false;
  navTabThird: boolean = false;
  cardData: any = {
    title: 'card1',
    cardData: [{
      icon: '../../../../assets/dashboard-state/16-location.svg',
      link: '',
      value: '4600',
      lable: 'Total ULBs',
      color: '#12505A;'
    },
    {
      icon: '../../../../assets/dashboard-state/XMLID_1248_.svg',
      link: '',
      value: '500',
      lable: 'Non Million Cities',
      color: '#12505A;'
    },
    {
      icon: '../../../../assets/dashboard-state/sustainable.svg',
      link: '',
      value: '60',
      lable: 'Million Plus UAs',
      color: '#12505A;'
    },
    {
      icon: '../../../../assets/dashboard-state/16-location.svg',
      link: '',
      value: '600',
      lable: 'ULBs in Million-Plus UAs',
      color: '#12505A;'
    }]
  }

  formDataFirstInstallment: any = [
    {
      formHeader: 'ULB Forms',
      approvedColor: '#E67E15',
      submittedColor: '#E67E1566',
      formData: [{
        formName: 'Annual Account Upload',
        approvedColor: '#E67E15',
        submittedColor: '#E67E1566',
        submittedValue: 50,
        approvedValue: 10,
        icon: '',
        link: '',
        status: 'Not Started'
      },
      {
        formName: 'PFMS Linkage',
        approvedColor: '#E67E15',
        submittedColor: '#E67E1566',
        submittedValue: 40,
        approvedValue: 30,
        icon: '',
        link: '',
        status: 'Not Started'
      }]
    },
    {
      formHeader: 'State Forms',
      approvedColor: '#059B05',
      submittedColor: '#E67E1566',
      formData: [{
        formName: 'SFC Notification',
        approvedColor: '#059B05',
        submittedColor: '#ffffff',
        submittedValue: 100,
        approvedValue: null,
        icon: '',
        link: '',
        status: 'Approved'
      },
      {
        formName: 'Property Tax',
        approvedColor: '#059B05',
        submittedColor: '#ffffff',
        submittedValue: 100,
        approvedValue: null,
        icon: '',
        link: '',
        status: 'Approved'
      }]
    }
  ]
  formData2ndInstallment: any = [
    {
      formHeader: 'Sample ULB Forms',
      approvedColor: '#E67E15',
      submittedColor: '#E67E1566',
      formData: [{
        formName: 'Annual Account Upload',
        approvedColor: '#E67E15',
        submittedColor: '#E67E1566',
        submittedValue: 50,
        approvedValue: 30,
        icon: '',
        link: '',
        status: 'Not Started'
      },
      {
        formName: 'Sample PFMS Linkage',
        approvedColor: '#E67E15',
        submittedColor: '#E67E1566',
        submittedValue: 40,
        approvedValue: 20,
        icon: '',
        link: '',
        status: 'Not Started'
      }]
    },
    {
      formHeader: 'Sample State Forms',
      approvedColor: '#059B05',
      submittedColor: '#E67E1566',
      formData: [{
        formName: 'SFC Notification',
        approvedColor: '#059B05',
        submittedColor: '#ffffff',
        submittedValue: 100,
        approvedValue: null,
        icon: '',
        link: '',
        status: 'Approved'
      },
      {
        formName: 'Sample Property Tax',
        approvedColor: '#059B05',
        submittedColor: '#ffffff',
        submittedValue: 100,
        approvedValue: null,
        icon: '',
        link: '',
        status: 'Approved'
      }]
    }
  ]
  constructor() {
    this.formdata = this.formDataFirstInstallment
  }

  ngOnInit(): void {
  }
  installmentClick(type) {
    type == 'first' ? this.formdata = this.formDataFirstInstallment : this.formdata = this.formData2ndInstallment
    console.log(type);
  }
  tabActive(tab) {
    if (tab == 'tab1') {
      this.navTabFirst = true
      this.navTabSecond = false
      this.navTabThird = false
    } else if (tab == 'tab2') {
      this.navTabSecond = true
      this.navTabFirst = false
      this.navTabThird = false
    } else if (tab == 'tab3') {
      this.navTabThird = true
      this.navTabFirst = false
      this.navTabSecond = false
    }
  }
}
