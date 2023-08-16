import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { SweetAlert } from "sweetalert/typings/core";
import { Router } from '@angular/router';
const swal: SweetAlert = require("sweetalert");

export interface queryParams  {
  formType: string;
  design_year: string;
  installment: number;
}
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})


export class DashbordComponent implements OnInit {

  constructor(
    private commonServices: CommonServicesService,
    private _router : Router
  ) {
    this.years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));

    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
   }
  stateInfo :object | any;
  cityTypeInState : object | any;
  formData : object | any;
  years: object | any;
  userData : object | any;
  stateId:string = '';
  getQueryParams: queryParams;
  isApiComplete:boolean = false;
  formDataCompleted:boolean = false;
  ngOnInit(): void {
    this.onload();
  }

  onload(){
    this.callApiForUlbInfo();
    this.getQueryParams = {
      formType:'',
      design_year: this.years["2023-24"],
      installment: null
    }
    // this.callApiForAllFormData(this.getQueryParams);
  }
// first section related data eg. population, no of ulb etc
  callApiForUlbInfo(){
    this.commonServices.formGetMethod('dashboard/populationData', '').subscribe((res:any)=>{
      console.log('ressss', res);
      this.stateInfo = res?.data?.populationData;
      this.cityTypeInState = res?.data?.cityTypeInState;
      this.isApiComplete = true;
    },
    (error)=>{
      console.log('error', error);
      this.isApiComplete = false;
      swal("Error", "Something went wrong. please try again later.", "error")
      
    })
  }
// main dashboard data eg. form status for ulb and state
  callApiForAllFormData(queryParams){
    this.formDataCompleted = false;
    this.commonServices.formGetMethod('dashboard',queryParams).subscribe((res:any)=>{
      console.log('ressss', res);
      this.formData = res?.data;
      this.formDataCompleted = true;
    },
    (error)=>{
      console.log('error', error);
      swal("Error", "Something went wrong. please try again later.", "error")
      
    })
  }


  cityTabChange(e) {
    console.log('eeee', e);
    if(e?.type == 'cityTabChange' || e?.type == 'installmentsChange'){
      this.getQueryParams["formType"] = e?.formType;
      this.getQueryParams["installment"] = e?.type == 'installmentsChange' ? Number(e?.data?.installment) : 1
      this.callApiForAllFormData(this.getQueryParams);
    } else if(e?.type == 'pageNavigation'){
      const navURl = `state-form${e?.data?.link}`
      this._router.navigateByUrl(`${navURl}`);
    }else{
      const navURl = `state-form/grant-claims`
      this._router.navigateByUrl(`${navURl}`);
    }
    
  }

}
