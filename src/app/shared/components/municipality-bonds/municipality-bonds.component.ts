import { Component, Input, OnInit } from '@angular/core';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require("sweetalert");
import { Filter, FilterOption, MouProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';
import { GlobalLoaderService } from '../../services/loaders/global-loader.service';
import { MunicipalBondsService } from '../../services/municipal/municipal-bonds.service';

@Component({
  selector: 'app-municipality-bonds',
  templateUrl: './municipality-bonds.component.html',
  styleUrls: ['./municipality-bonds.component.scss']
})
export class MunicipalityBondsComponent implements OnInit {
  @Input() cityId: string;

  sortBy: 'ulbShare' | 'totalProjectCost' = 'totalProjectCost';
  order: 1 | -1 = 1;
  page: number = 0;
  limit: number = 5;
  hiddenColumns = ['projectName', 'moreInformation', 'sector'];
  activeFilterKey: 'sectors' | 'projects' | 'implementationAgencies' = 'sectors';
  response: MouProjectsResponse;

  constructor(
    private municipalBondsSerivce: MunicipalBondsService,
    public loaderService: GlobalLoaderService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  get sortOptions() {
    return this.response.columns.filter(column => ['ulbShare', 'totalProjectCost'].includes(column.key))
  }

  get activeFilter() {
    return this.response.filters.find(filter => filter.key === this.activeFilterKey);
  }
  

  get payload() {
    const result = {
      skip: this.page * this.limit,
      limit: this.limit,
      sortBy: this.sortBy,
      order: this.order,
      ...this.response?.filters?.reduce((result, item) => {
        result[item.key] = item.options
          .filter(option => option.checked)
          .map(item => item._id);
        return result;
      }, {})
    };
    if (!this.response) return result;
    return result;
  }


  canShowOption(option: FilterOption): boolean {
    return !this.activeFilter?.query || option.name.toLowerCase().includes(this.activeFilter?.query.toLowerCase());
  }

  updateSorting(sortBy, order) {
    this.sortBy = sortBy;
    this.order = order;
  }

  pageChange({ pageIndex }) {
    this.page = pageIndex;
    this.loadData();
  }

  loadData() {
    this.loaderService.showLoader();
    this.municipalBondsSerivce.getMouProjects(this.cityId, this.payload).subscribe(res => {
      this.response = res;
      this.loaderService.stopLoader();
    }, error => {
      swal("Error", error?.message || "Something went worng", "error");
      this.loaderService.stopLoader();
    })
  }

  resetFilters() {
    this.response.filters = this.response?.filters
      ?.map(filter => ({
        ...filter,
        options: filter.options.map(item => ({
          ...item,
          checked: false
        }))
      }));
    this.loadData();
  }
}
