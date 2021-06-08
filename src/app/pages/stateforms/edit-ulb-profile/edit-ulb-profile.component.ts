import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    public _stateformsService: StateformsService,
    private fb: FormBuilder
  ) { }

  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  nodal_of_name = new FormControl('');
  nodal_of_email = new FormControl('');
  nodal_of_phn = new FormControl('');

  detailsEdit = true;
  row_no = null;
  errMessage='';
  ngOnInit() {
    this._stateformsService.getulbProfile()
      .subscribe((res) => {
        console.log('profile', res);
        let resData:any = res;
        this.tabelData = resData.data;
       console.log('tabelData',this.tabelData)
       this.tabelData.forEach(data => {
       this.filledValue(data)
               })
    if(this.detailsEdit)
    this.editableForm.disable();
      },
      error => {
        this.errMessage = error.message;
        console.log(error, this.errMessage);
      });

    this.editableForm = this.fb.group({
      editDetailsArray : this.fb.array([
        this.fb.group({

        })
      ])

    })

  }
  get tabelRows() {
    return this.editableForm.get("editDetailsArray") as FormArray;
  }
  filledValue(data){
     this.tabelRows.push(
        this.fb.group({
          nodal_officer_name : [data.name],
          nodal_officer_email : [data.email],
          nodal_officer_phone : [data.mobile]

    })
   )

  }
  viewDetails(){

  }
  editDetails(index){
    this.detailsEdit = false;
    this.row_no = index;
    console.log('edit')
    this.editableForm.get('editDetailsArray').at(index+1).get('nodal_officer_name').enable();
    this.editableForm.get('editDetailsArray').at(index+1).get('nodal_officer_email').enable();
    this.editableForm.get('editDetailsArray').at(index+1).get('nodal_officer_phone').enable();

  }
  updateDetails(index){
    console.log('ddd', index, this.tabelRows['controls'][index+1].value);
    this.detailsEdit = true;
   let updateData = {
      "state": this.tabelData[index].state,
      "ulb" : this.tabelData[index].ulb,
      "accountantName": this.tabelRows['controls'][index+1].value.nodal_officer_name,
      "accountantEmail": this.tabelRows['controls'][index+1].value.nodal_officer_email,
      "accountantConatactNumber": this.tabelRows['controls'][index+1].value.nodal_officer_phone,
      "designation": this.tabelData[index].designation,
      "address": this.tabelData[index].address,
      "departmentName": this.tabelData[index].departmentName,
      "departmentEmail": this.tabelData[index].departmentEmail,
      "departmentContactNumber": this.tabelData[index].departmentContactNumber
    }

    this._stateformsService.updateRequest(updateData)
    .subscribe((res) => {
      console.log('profile', res);
    },
    error => {
      this.errMessage = error.message;
      console.log(error, this.errMessage);
    });
    console.log('updateData', updateData)
    this.editableForm.get('editDetailsArray').at(index+1).get('nodal_officer_name').disable();
    this.editableForm.get('editDetailsArray').at(index+1).get('nodal_officer_email').disable();
    this.editableForm.get('editDetailsArray').at(index+1).get('nodal_officer_phone').disable();
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
