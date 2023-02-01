import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  perPage: '10' | '25' | '50' | '100' | 'all' = '10';

  
  @Input('data') data;
  @Input('columnNames') columnNames;
  @Output('filterUpdate') filterUpdate = new EventEmitter();
  
  filterForm: FormGroup;
  isLoader: boolean = false;
  max = Math.max;
  
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

  constructor(
    private _fb: FormBuilder
  ) { 
    this.filterForm = this._fb.group({
      ulb_name_s: [""],
      state_name_s: [""],
      ulb_code_s: [""],
      ulbType_s: [""],
      population_type_s: [""],
      ua_name_s: [""],
      status_s: [""],
      filled_1: [""],
      filled_2: [""],
    });
  }

  get isInfiniteScroll() {
    return this.perPage == 'all';
  }

  get showableColumns() {
    const hiddenStateNames = ['stateName', 'filled_audited', 'filled_provisional'];
    return this.objectWithoutProperties(this.columnNames, hiddenStateNames);
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
    this.filterUpdate.emit(this.filterForm.getRawValue());
  }

  resetFilter() {
    this.filterForm.reset();
    this.search();
  }
}
