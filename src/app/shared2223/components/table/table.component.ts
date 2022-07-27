import { Component, OnInit,  Input, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import {NewCommonService} from '../../services/new-common.service'
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import  {MatTableDataSource} from '@angular/material/table'
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
  ) { 
    
  }
  public keepOriginalOrder = (a, b) => a.key
  // dataSource: MatTableDataSource<UserData>;
title = '';
total = 0;
data;
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
  // role: null,
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
    this.callAPI();
  }
     callAPI(){
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
      // this.searchUsersBy(this.filterForm.value);
    }
    //  ngAfterViewInit() {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }

}

// export interface UserData {
//   ulbName: string;
//   censusCode: string;
//   ulbType: string;
//   stateName: string;
// }