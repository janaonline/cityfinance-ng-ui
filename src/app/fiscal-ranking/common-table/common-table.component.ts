import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';


export interface TableResponse {
  success?: boolean;
  message?: string;
  name: string;
  getEndpoint?: string;
  postEndpoint?: string;
  data?: TableDataEntity[] | null;
  total?: number;
  columns?: TableColumnsEntity[] | null;
}

export interface TableDataEntity {
  [key: string]: number | string;
}

export interface TableColumnsEntity {
  label: string;
  key: string;
  sort?: 0 | 1 | -1;
  query?: string;
}

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
  @Input() response: TableResponse;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() order: 1 | -1 = 1;
  @Input() page: number = 0;
  @Input() limit: number = 10;

  @Output() update: EventEmitter<TableResponse> = new EventEmitter<TableResponse>();


  constructor() { }

  ngOnInit(): void {
    // this.loadData();
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
    const defaultSortQuery = '&sortBy=stateName&order=1&sortBy=ulbName&order=1'
    return new URLSearchParams(params).toString() + (sortQuery || defaultSortQuery);
  }

  updateSorting(column) {
    column.sort++;
    if (column.sort > 1) { column.sort = -1; }
    this.update.emit(this.response);
  }

  pageChange({ pageIndex, pageSize }) {
    this.page = pageIndex;
    this.limit = pageSize;
    this.update.emit(this.response);
  }

  // loadData() {
  //   this.loaderService.showLoader();
  //   this.municipalBondsSerivce.getProjects(this.queryParams, this.response?.columns).subscribe(res => {
  //     this.response = res;
  //     console.log({ res });
  //     this.loaderService.stopLoader();
  //   }, error => {
  //     swal("Error", error?.message || "Something went worng", "error");
  //     this.loaderService.stopLoader();
  //   })
  // }
}