import { Component, OnInit,  Input, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import {NewCommonService} from '../../services/new-common.service'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import  {MatTableDataSource} from '@angular/material/table'
import { USER_TYPE } from 'src/app/models/user/userType';
import { JSONUtility } from 'src/app/util/jsonUtil';
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
    private _fb: FormBuilder,
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
ulb_code_s = new FormControl('');
ulb_type_s = new FormControl('');
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

ulbType

statusList
populationType
columnNames = []
params = {
  'design_year': "606aafb14dff55e6c075d3ae",
  'formId': ""
};

  ngOnInit(): void {
    
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
  
}

// export interface UserData {
//   ulbName: string;
//   censusCode: string;
//   ulbType: string;
//   stateName: string;
// }