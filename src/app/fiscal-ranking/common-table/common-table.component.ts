import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';


export interface TableResponse {
  success?: boolean;
  message?: string;
  name: string;
  getEndpoint?: string;
  postEndpoint?: string;
  data?: TableDataEntity[] | null;
  lastRow: string[];
  total?: number;
  columns?: TableColumnsEntity[] | null;
  multipleSort?: boolean;
}

export interface TableDataEntity {
  [key: string]: number | string;
}

export interface TableColumnsEntity {
  label: string;
  key: string;
  sort?: 0 | 1 | -1;
  sortable?: boolean;
  query?: string;
}

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
  @Input() response: TableResponse;
  @Input() isDialog: boolean;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() order: 1 | -1 = 1;
  @Input() page: number = 0;
  @Input() limit: number = 10;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.loadData();
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  get queryParams() {
    const params = {
      skip: '' + this.page * this.limit,
      limit: '' + this.limit,
      ...this.response?.columns?.filter(column => column.hasOwnProperty('query') && column.query !== '')
        .reduce((result, item) => ({ ...result, [item.key]: item.query }), {})
    };

    const sortQuery = this.response?.columns?.filter(column => column.sort !== 0)
      .reduce((result, item) => result + `&sortBy=${item.key}&order=${item.sort}`, '');
    return new URLSearchParams(params).toString() + (sortQuery);
  }

  updateSorting(column: TableColumnsEntity) {
    if(!column?.sortable) return;
    if(!this.response.multipleSort) {
      this.response.columns.forEach(col => {
        if(col.sortable && column.key != col.key) {
          col.sort = 0;
        }
      });
    }
    column.sort++;
    if (column.sort > 1) { column.sort = -1; }
    this.loadData();
  }

  pageChange({ pageIndex, pageSize }) {
    this.page = pageIndex;
    this.limit = pageSize;
    this.loadData();
  }

  loadData() {
    this.update.emit({queryParams: this.queryParams, response: this.response});
  }
}