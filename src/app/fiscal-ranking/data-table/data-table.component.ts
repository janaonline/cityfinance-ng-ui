import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  perPage: '10' | '25' | '50' | '100' | 'all' = '10';

  
  @Input('data') data;
  @Input('columnNames') columnNames;
  
  filterForm;
  isLoader: boolean = false;
  max = Math.max;
  hiddenColumnNames = ['stateName'];
  
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };

  objectWithoutProperties(obj, keys) {
    const target = {};
    for (let i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }

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

  get showableColumns() {
    return this.objectWithoutProperties(this.columnNames, ['stateName', 'filled_audited', 'filled_provisional']);
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

  resetFilter() {

  }
}
