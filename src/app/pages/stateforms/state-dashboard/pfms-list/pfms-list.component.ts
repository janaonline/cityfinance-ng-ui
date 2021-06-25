import { Component, OnInit } from '@angular/core';
import { PfmsListService } from './pfms-list.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-pfms-list',
  templateUrl: './pfms-list.component.html',
  styleUrls: ['./pfms-list.component.scss']
})
export class PfmsListComponent implements OnInit {
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
  constructor(
    private pfmsListService: PfmsListService
  ) { }

  ngOnInit(): void {
    this.pfmsListService.getData()
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
