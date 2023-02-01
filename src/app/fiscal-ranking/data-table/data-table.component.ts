import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  perPage: '10' | '25' | '50' | '100' | 'all' = '10';

  @Input('data') data;

  columnNames = [];

  filterForm;
  isLoader: boolean = false;
  max = Math.max;

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

  constructor() { }

  get isInfiniteScroll() {
    return this.perPage == 'all';
  }

  ngOnInit(): void {

  }

  public keepOriginalOrder = (a, b) => a.key;

  onPerPageChange() {
    
  }

  download() {

  }

  handleScroll(event) {

  }

  search() {

  }
}
