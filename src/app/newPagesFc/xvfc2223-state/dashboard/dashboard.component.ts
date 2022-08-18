import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { State2223Service } from '../state-services/state2223.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  viewMode = 'tab1';
  formdata: any;
  userData;
  design_year;
  stateId;
  yearValue;
  navTabActive: boolean = false;
  selectedItem = 'nmpc_untied';
  installmentType: string = '1';
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
  navList = [
    {title: 'NMPC - UnTied', viewMode: 'tab1', formType: 'nmpc_untied', installment : '1'},
    {title: 'NMPC - Tied', viewMode: 'tab2', formType: 'nmpc_tied', installment : '2'},
    {title: 'MPC', viewMode: 'tab3', formType: 'mpc'}
  ]
  constructor(private state_service : State2223Service) {
    this.getStateAndDesignYear();
    this.formdata = this.formDataFirstInstallment
  }
   params:any = {
    stateId: '',
    design_year: '',
    formType: '',
    installment: ''
  };
  
  ngOnInit(): void {
    this.params = {
      stateId: this.stateId,
      design_year: this.yearValue,
      formType: 'nmpc_untied',
      installment: this.installmentType
    };
    this.getFormData();  
  }

  getStateAndDesignYear(){
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateId = this.userData?.state;
    this.yearValue = this.design_year["2022-23"];
  }
  firstInstallment:boolean = true
  secondInstallment:boolean = false
  installmentClick(type) {
    this.installmentType = type;
    type == '1' ? this.formdata = this.formDataFirstInstallment : this.formdata = this.formData2ndInstallment
    console.log(type);
    if(type == '1'){
      this.firstInstallment = true
      this.secondInstallment = false
    }else{
      this.secondInstallment = true
      this.firstInstallment = false
    }
  
    this.params = {
      stateId: this.stateId,
      design_year: this.yearValue,
      formType: this.viewMode == 'tab1' ? 'nmpc_untied' : this.viewMode == 'tab2' ? 'nmpc_tied' : 'mpc',
      installment: this.viewMode == 'tab3' ? 1 : this.installmentType
    };
    this.getFormData();
  }
  
  tabActive(item) {
    console.log(item)
    this.selectedItem = item.formType
    this.viewMode = item.viewMode
    item.title == 'MPC' 
    this.params = {
      stateId: this.stateId,
      design_year: this.yearValue,
      formType: item.formType,
      installment: this.viewMode == 'tab3' ? 1 : this.installmentType
    };
    this.getFormData();
  }

  getFormData(){  
    this.state_service.getDashboardFormData(this.params).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
