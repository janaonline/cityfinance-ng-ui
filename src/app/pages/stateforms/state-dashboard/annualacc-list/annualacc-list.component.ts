import { Component, OnInit } from '@angular/core';
import { AnnualaccListService } from './annualacc-list.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-annualacc-list',
  templateUrl: './annualacc-list.component.html',
  styleUrls: ['./annualacc-list.component.scss']
})
export class AnnualaccListComponent implements OnInit {
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
  errMessage = '';
  resData
  constructor(
    private annualaccListService: AnnualaccListService
  ) { }

  ngOnInit(): void {
    this.annualaccListService.getData()
      .subscribe((res) => {

        let resData: any = res
        this.tabelData = resData.data;
        console.log('tabelData', this.tabelData)

      },
        error => {
          this.errMessage = error.message;
          console.log(error, this.errMessage);
        }
      )
  }
  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }
}
