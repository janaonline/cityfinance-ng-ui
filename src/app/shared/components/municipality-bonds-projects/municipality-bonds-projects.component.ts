import { Component, Input, OnInit } from '@angular/core';
const swal: SweetAlert = require("sweetalert");
import { MouProjectsByUlbResponse, ProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';
import { SweetAlert } from 'sweetalert/typings/core';
import { GlobalLoaderService } from '../../services/loaders/global-loader.service';
import { MunicipalBondsService } from '../../services/municipal/municipal-bonds.service';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipality-bonds-projects',
  templateUrl: './municipality-bonds-projects.component.html',
  styleUrls: ['./municipality-bonds-projects.component.scss']
})
export class MunicipalityBondsProjectsComponent implements OnInit {

  @Input() cityId: string;

  response: ProjectsResponse;
  pageSizeOptions = [10, 20, 50, 100];
  order: 1 | -1 = 1;
  page: number = 0;
  limit: number = 10;


  constructor(
    private municipalBondsSerivce: MunicipalBondsService,
    public loaderService: GlobalLoaderService,
    private router: Router
  ) {
    // if(environment?.isProduction === true){  
    //   this.router.navigate(["/home"]);
    // }
   }

  ngOnInit(): void {
    this.loadData();
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
    this.loadData();
  }

  pageChange({ pageIndex, pageSize }) {
    this.page = pageIndex;
    this.limit = pageSize;
    this.loadData(false);
  }

  resetFilters() {
    this.response.columns = null;
    this.loadData();
  }

  loadData(resetPage = true) {
    if(resetPage) this.page = 0;
    this.loaderService.showLoader();
    this.municipalBondsSerivce.getProjects(this.queryParams, this.response?.columns).subscribe(res => {
      this.response = res;
      console.log({ res });
      this.loaderService.stopLoader();
    }, error => {
      swal("Error", error?.message || "Something went worng", "error");
      this.loaderService.stopLoader();
    })
  }
}