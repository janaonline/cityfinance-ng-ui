import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require("sweetalert");
import { Filter, FilterOption, MouProjectsByUlbResponse, Row } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';
import { GlobalLoaderService } from '../../services/loaders/global-loader.service';
import { MunicipalBondsService } from '../../services/municipal/municipal-bonds.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-municipality-bonds',
  templateUrl: './municipality-bonds.component.html',
  styleUrls: ['./municipality-bonds.component.scss']
})
export class MunicipalityBondsComponent implements OnInit {
  @Output() changeTab = new EventEmitter();
  @Input() cityId: string;

  pageSizeOptions = [5, 10, 25, 100];
  sortBy: 'ulbShare' | 'totalProjectCost' = 'totalProjectCost';
  order: 1 | -1 = 1;
  page: number = 0;
  limit: number = 5;
  filterYear: string = '';
  hiddenColumns = ['projectName', 'moreInformation', 'sector'];
  activeFilterKey: 'sectors' | 'projects' | 'implementationAgencies' = 'sectors';
  response: MouProjectsByUlbResponse;
  @Input() isUA: String = 'No';
  @Input() mouTabDescription = '';
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

  get csvDownloadLink() {
    return `${environment.api.url}UA/get-mou-project/${this.cityId}?csv=true`
  }

  get baseUrl() {
    return environment.api.url;
  }

  get activeFilter() {
    return this.response.filters.find(filter => filter.key === this.activeFilterKey);
  }

  get appliedSectorFilters() {
    const optionNames = this.response.filters
      .find(filter => filter.key == 'sectors').options
      .filter(option => option.checked)
      .map(option => option.name);
    return optionNames;
  }


  get payload() {
    const result = {
      skip: this.page * this.limit,
      limit: this.limit,
      sortBy: this.sortBy,
      order: this.order,
      filterYear: this.filterYear,
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
    if (!option.name || !option._id) return false;
    const sectorsFilter = this.response.filters.find(filter => filter.key == 'sectors');
    if ((this.activeFilter.key == 'projects' && sectorsFilter?.options.some(sectionOption => sectionOption.checked)) &&  // if some of `sectors` are checked then only show those `projects` which belonds to those perticular `sectors`
      !sectorsFilter?.options.some(sectionOption => sectionOption.checked && sectionOption._id == option.sectorId)
    ) {
      return false;
    }
    return !this.activeFilter?.query || option.name.toLowerCase().includes(this.activeFilter?.query.toLowerCase());
  }

  updateSorting(sortBy, order) {
    this.sortBy = sortBy;
    this.order = order;
  }

  pageChange({ pageIndex, pageSize }) {
    this.page = pageIndex;
    this.limit = pageSize;
    this.loadData();
  }

  loadData() {
    this.loaderService.showLoader();
    this.municipalBondsSerivce.getMouProjectsByUlb(this.cityId, this.payload, this.response?.filters).subscribe(res => {
      this.response = res;
      this.filterYear = res.filterYear;
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

  onCreditRationClick(row: Row) {
    console.log({ row });
    this.changeTab.emit({
      tabName: 'Borrowing & Credit Rating',
      subTabName: 'Credit Rating'
    })
  }
}
