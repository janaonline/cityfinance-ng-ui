import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UlbadminServiceService } from '../../ulb-admin/ulbadmin-service.service';
import { StateformsService } from '../stateforms.service';

@Component({
  selector: 'app-edit-ulb-profile',
  templateUrl: './edit-ulb-profile.component.html',
  styleUrls: ['./edit-ulb-profile.component.scss']
})
export class EditUlbProfileComponent implements OnInit {

  tabelData: any;
  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
  };
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  loading = false;
  filterObject;
  fcFormListSubscription: Subscription;
  nodataFound = false;
  editableForm;
  constructor(
    public ulbService : UlbadminServiceService,
    public _stateformsService: StateformsService
  ) { }

  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  nodal_of_name = new FormControl('');
  nodal_of_email = new FormControl('');
  nodal_of_phn = new FormControl('');

  detailsEdit = true;


  ngOnInit() {
    this._stateformsService.getulbProfile()
      .subscribe((res) => {
        console.log('profile', res);
        let resData:any = res;
        this.tabelData = res;
       console.log('tabelData',this.tabelData)
       this.filledValue()
      })
    this.editableForm = new FormGroup({
      nodal_officer_name : new FormControl(''),
      nodal_officer_email : new FormControl(''),
      nodal_officer_phone : new FormControl('')
    })
    if(this.detailsEdit)
    this.editableForm.disable();
  }
  filledValue(){
    this.tabelData.forEach(res => {
      this.editableForm.patchValue({
        nodal_officer_name: res.name,
        nodal_officer_email: res.email,
        nodal_officer_phone: res.mobile
      });
    });

  }
  viewDetails(){

  }
  editDetails(){
    this.detailsEdit = false;
    console.log('edit')
    this.editableForm.enable();

  }
  updateDetails(){
    console.log(this.editableForm);
    this.editableForm.patchValue({
      nodal_officer_name: this.editableForm.value.nodal_officer_name,
      nodal_officer_email: this.editableForm.value.nodal_officer_email,
      nodal_officer_phone: this.editableForm.value.nodal_officer_phone
    });
  }

  setLIstFetchOptions() {
    //  const filterKeys = ["financialYear", "auditStatus"];
      this.filterObject = {
            filter: {
            //  state: 'Maharashtra',
             ulbName : this.ulb_name_s.value
             ? this.ulb_name_s.value.trim()
             : "",
             censusCode : this.ulb_code_s.value
             ? this.ulb_code_s.value.trim()
             : "",
              nodalOfName : this.nodal_of_name.value
              ? this.nodal_of_name.value.trim()
              : "",
              nodalOfEmail : this.nodal_of_email.value
              ? this.nodal_of_email.value.trim()
              : "",
              nodalOfPhone : this.nodal_of_phn.value
              ? this.nodal_of_phn.value.trim()
              : "",


            }

          }

      return {
        ...this.listFetchOption,
        ...this.filterObject,
      //  ...config,
      };

    }


    stateData(){
      this.loading = true;
      this.listFetchOption.skip = 0;
      this.tableDefaultOptions.currentPage = 1;
      this.listFetchOption = this.setLIstFetchOptions();
      const { skip } = this.listFetchOption;
      if (this.fcFormListSubscription) {
        this.fcFormListSubscription.unsubscribe();
      }

      this.fcFormListSubscription = this.ulbService
        .fetchXVFormDataList({ skip, limit: 10 }, this.listFetchOption)
        .subscribe(
          (result) => {
            let res:any = result;
            this.tabelData = res.data;
            if(res.data.length == 0){
              this.nodataFound = true;
            }else{
              this.nodataFound = false;
            }
            console.log(result);

          },
          (response: HttpErrorResponse) => {
            this.loading = false;
            alert('Some Error Occurred')

          }
        );


    }

}
