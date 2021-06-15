import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { USER_TYPE } from 'src/app/models/user/userType';
import { BaseComponent } from 'src/app/util/baseComponent';
import { UlbadminServiceService } from '../../ulb-admin/ulbadmin-service.service';
import { StateformsService } from '../stateforms.service';
import { EditViewComponent } from './edit-view/edit-view.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-edit-ulb-profile',
  templateUrl: './edit-ulb-profile.component.html',
  styleUrls: ['./edit-ulb-profile.component.scss']
})
export class EditUlbProfileComponent extends BaseComponent implements OnInit {

  constructor(
    public ulbService : UlbadminServiceService,
    public _stateformsService: StateformsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    super();
   }
  userTypes = USER_TYPE;
  listType: USER_TYPE;
  tabelData: any;

  currentSort = 1;

  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };

  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  loading = false;
  filterObject;
  fcFormListSubscription: Subscription;
  nodataFound = false;
  editableForm;
  totalItems;
  indexNo: number;
//  currentPage = 4;

  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  nodal_of_name = new FormControl('');
  nodal_of_email = new FormControl('');
  nodal_of_phn = new FormControl('');

  detailsEdit = true;
  row_no = null;
  errMessage='';
  ngOnInit() {
    this._stateformsService.getulbDetails()
      .subscribe((res) => {
        console.log('getulbDetails', res);
        let resData:any = res;
        this.tabelData = resData.data;
        this.totalItems = this.tabelData.length;
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
          nodal_officer_name : [data.accountantName],
          nodal_officer_email : [data.accountantEmail],
          nodal_officer_phone : [data.
            accountantConatactNumber]

    })
   )

  }
  viewDetails(id){
    let dialogRef = this.dialog.open(EditViewComponent, {
      data:{_id : id, role: 'ULB' },
      height: "100%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editMore(id){
    let dialogRef = this.dialog.open(EditComponent, {
      data:{_id : id, role: 'ULB' },
      height: "100%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editDetails(index){
    this.detailsEdit = false;
    this.row_no = index;
    this.absoluteIndex(index);
    console.log('edit')
    this.editableForm.get('editDetailsArray').at(this.indexNo+1).get('nodal_officer_name').enable();
    this.editableForm.get('editDetailsArray').at(this.indexNo+1).get('nodal_officer_email').enable();
    this.editableForm.get('editDetailsArray').at(this.indexNo+1).get('nodal_officer_phone').enable();

  }
  updateDetails(index){
    this.absoluteIndex(index);
    console.log('ddd', index, this.tabelRows['controls'][index+1].value, this.indexNo);
    this.detailsEdit = true;
   let updateData = {
      "state": this.tabelData[this.indexNo].state,
      "ulb" : this.tabelData[this.indexNo].ulb,
      "accountantName": this.tabelRows['controls'][this.indexNo+1].value.nodal_officer_name,
      "accountantEmail": this.tabelRows['controls'][this.indexNo+1].value.nodal_officer_email,
      "accountantConatactNumber": this.tabelRows['controls'][this.indexNo+1].value.nodal_officer_phone,
      "designation": this.tabelData[this.indexNo].designation,
      "address": this.tabelData[this.indexNo].address,
      "departmentName": this.tabelData[this.indexNo].departmentName,
      "departmentEmail": this.tabelData[this.indexNo].departmentEmail,
      "departmentContactNumber": this.tabelData[this.indexNo].departmentContactNumber
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
    this.editableForm.get('editDetailsArray').at(this.indexNo+1).get('nodal_officer_name').disable();
    this.editableForm.get('editDetailsArray').at(this.indexNo+1).get('nodal_officer_email').disable();
    this.editableForm.get('editDetailsArray').at(this.indexNo+1).get('nodal_officer_phone').disable();
  }

  setLIstFetchOptions() {
    //  const filterKeys = ["financialYear", "auditStatus"];
      this.filterObject = {
            filter: {
             state: this.tabelData.stateName,
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
    setPage(pageNoClick: number) {
      console.log('pageno', pageNoClick)
      this.tableDefaultOptions.currentPage = pageNoClick;
      this.listFetchOption.skip =
        (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
     // this.searchUsersBy(this.filterForm.value);
    }

    absoluteIndex(index) {
      this.indexNo = this.tableDefaultOptions.itemPerPage * (this.tableDefaultOptions.currentPage - 1) + index;
    }

}
