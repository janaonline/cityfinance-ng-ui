import { Component, Input, OnInit } from '@angular/core';
const swal: SweetAlert = require("sweetalert");
import { MouProjectsByUlbResponse, ProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';
import { SweetAlert } from 'sweetalert/typings/core';
import { GlobalLoaderService } from '../../services/loaders/global-loader.service';
import { MunicipalBondsService } from '../../services/municipal/municipal-bonds.service';

@Component({
  selector: 'app-municipality-bonds-projects',
  templateUrl: './municipality-bonds-projects.component.html',
  styleUrls: ['./municipality-bonds-projects.component.scss']
})
export class MunicipalityBondsProjectsComponent implements OnInit {

  @Input() cityId: string;

  response: ProjectsResponse;

  order: 1 | -1 = 1;
  page: number = 0;
  limit: number = 10;

  constructor(
    private municipalBondsSerivce: MunicipalBondsService,
    public loaderService: GlobalLoaderService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  get payload() {
    return {
      skip: this.page * this.limit,
      limit: this.limit,
      ...this.response?.columns?.filter(column => column.sort !== 0)
        .reduce((result, item) => ({ sortBy: item.key, order: item.sort }), {}),
      ...this.response?.columns?.filter(column => column.hasOwnProperty('query') && column.query !== '')
        .reduce((result, item) => ({ ...result, [item.key]: item.query }), {})
    };
  }

  updateSorting(column) {
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
    console.log({ payload: this.payload });
    this.loaderService.showLoader();
    this.municipalBondsSerivce.getProjects(this.payload, this.response?.columns).subscribe(res => {
      this.response = res;
      console.log({ res });
      this.loaderService.stopLoader();
    }, error => {
      swal("Error", error?.message || "Something went worng", "error");
      this.loaderService.stopLoader();
    })
  }
}