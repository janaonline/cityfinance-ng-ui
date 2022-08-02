import { Component, OnInit,  Input, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import {NewCommonService} from '../../services/new-common.service'
import { CommonService } from 'src/app/shared/services/common.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import  {MatTableDataSource} from '@angular/material/table'
import { USER_TYPE } from 'src/app/models/user/userType';
import { JSONUtility } from 'src/app/util/jsonUtil';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TableApproveReturnDialogComponent } from './table-approve-return-dialog/table-approve-return-dialog.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  // @ViewChild(MatPaginator ) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    private commonService: NewCommonService,
    private _commonService: CommonService,
    private _fb: FormBuilder,
    public dialog: MatDialog
  ) { 
    this.initializeFilterForm();
    this.initializeListFetchParams()
  }
  public keepOriginalOrder = (a, b) => a.key
  // dataSource: MatTableDataSource<UserData>;
title = '';
total = 0;
data;
listType: USER_TYPE;
filterForm: FormGroup;
ulb_name_s = new FormControl('');
state_name_s = new FormControl('');
ulb_code_s = new FormControl('');
ulb_type_s = new FormControl('');
filled_1 = new FormControl('');
population_type_s = new FormControl('');
ua_name_s = new FormControl('');
status_s = new FormControl('');
ulbType_s = new FormControl('');
tableDefaultOptions = {
  itemPerPage: 10,
  currentPage: 1,
  totalCount: null,
};
listFetchOption = {
  filter: null,
  sort: null,
  csv: false,
  skip: 0,
  limit: this.tableDefaultOptions.itemPerPage,
};
//  data: UserData[] = [];
@Input()
formId
selectedId:any=[];
checkedStatus;
ulbType
disableEnableCheckbox:boolean
statusList
newArr:any=[]
populationType
columnNames = []
params = {
  'design_year': "606aafb14dff55e6c075d3ae",
  'formId': ""
};

  ngOnInit(): void {
    this.fetchStateList()
this.callAPI();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("formId from Table Component", this.formId);
    this.params['formId'] = this.formId
    // this.listFetchOption.skip = 0
    this.initializeFilterForm()
    this.initializeListFetchParams()
    this.params['skip'] = 0
    // this.params['currentPage'] = 1  
    // this.listFetchOption.skip = 0;
    this.tableDefaultOptions.currentPage = 1
    this.callAPI();
  }
     callAPI(){
      this.params.formId = this.formId
      this.commonService.getReviewForms(this.params).subscribe(
        (res)=> {
          this.title = res['title'];
          this.data = res['data'];
          this.total = res['total'];
          this.columnNames = res['columnNames']
          this.data = this.data.map(element => ({...element, isChecked: this.isChecked(element)}));
          this.tableDefaultOptions.totalCount = this.total
          this.ulbType =  Object.keys(res['ulbType']).length > 0 ? Object.values(res['ulbType'])  : null,
          this.statusList =  Object.keys(res['statusList']).length > 0 ? Object.values(res['statusList'])  : null
          this.populationType =  Object.keys(res['populationType']).length > 0 ? Object.values(res['populationType'])  : null
          console.log(this.data)
          // this.dataSource = new MatTableDataSource(this.data);
        }, (err)=> {
          alert(err.message)
        })
     }

     isChecked(element: any) {
       console.log('isChecked =====>', element);
       let isUlbIdExist = this.selectedId.some(item=>item == element.ulbId)
       return isUlbIdExist
     }

     setPage(pageNoClick: number) {
      this.tableDefaultOptions.currentPage = pageNoClick;
      this.listFetchOption.skip =
        (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
      this.searchUsersBy(this.filterForm.value);
    }
    searchUsersBy(filterForm: {}, skip?: number) {
      this.listFetchOption.filter = filterForm;
      this.listFetchOption.skip =
        skip || skip === 0 ? skip : this.listFetchOption.skip;
  
      this.fetchList({ ...(<any>this.listFetchOption) });
    }

    isApiInProgress
   
    private fetchList(
      body: {
        filter: { [key: string]: string };
        sort: { [key: string]: number };
        role?: USER_TYPE;
      } = { filter: {}, sort: {} }
    ) {
      this.isApiInProgress = true;
      const util = new JSONUtility();
      body.filter = util.filterEmptyValue(body.filter);
     
     Object.assign( this.params, body)
  this.callAPI();

    }
    reviewEntity = 'ULB'
  private initializeFilterForm() {
    switch (this.reviewEntity) {
      case USER_TYPE.ULB:
        this.initializeULBFilterForm();
        return;
      case USER_TYPE.STATE:
        this.initializeStateFilterForm();
        return;
    }
  }
    private initializeULBFilterForm() {
      this.filterForm = this._fb.group({
        ulbName: [null],
        ulbCode: [null],
        censusCode: [null],
        populationType: [null],
        UA: [null],
        ulbType: [null],
        stateName : [null],
        formStatus : [null],
        filled1: [null],
        filled2: [null]
      });
    }

    private initializeStateFilterForm(){

    }

    private initializeListFetchParams() {
      this.listFetchOption = {
        csv: false,
        filter: this.filterForm ? this.filterForm.value : {},
        sort: null,
        skip: 0,
        limit: this.tableDefaultOptions.itemPerPage,
      };
    }
    stateList
    statesByID
    private fetchStateList() {
      this._commonService.getStateUlbCovered().subscribe((res) => {
        this.stateList = res.data;
        res.data.forEach((state) => {
          this.statesByID[state._id] = state;
        });
      });
    }
    selected_checkbox(id,status: HTMLInputElement){
      this.checkedStatus = status.checked
      let selectedIndex = this.selectedId.findIndex(item=> item == id)
      if(selectedIndex > -1){
        this.selectedId.splice(selectedIndex,1)
        this.selectedId.splice()
      } else{
        this.selectedId.push(id)
      }
      console.log(this.selectedId);
    }
    openDialog(): void {
      const dialogRef = this.dialog.open(TableApproveReturnDialogComponent, {
        data: '',
        width: "85vw",
        height: "100%",
        maxHeight: "90vh",
        panelClass: "no-padding-dialog",
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
}

// export interface UserData {
//   ulbName: string;
//   censusCode: string;
//   ulbType: string;
//   stateName: string;
// }