import { Component, Input, OnInit } from '@angular/core';
import { MouProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';
import { MunicipalBondsService } from '../../services/municipal/municipal-bonds.service';

@Component({
  selector: 'app-municipality-bonds',
  templateUrl: './municipality-bonds.component.html',
  styleUrls: ['./municipality-bonds.component.scss']
})
export class MunicipalityBondsComponent implements OnInit {
  @Input() cityId: string;

  sortBy: 'ulbShare' | 'totalProjectCost' = 'ulbShare';
  order: 1 | 0 = 1;
  page: number = 0;
  limit: number = 2;
  hiddenColumns = ['projectName', 'moreInformation', 'sector'];
  activeFilterKey = 'implementationAgencies';
  response: MouProjectsResponse;

  constructor(
    private municipalBondsSerivce: MunicipalBondsService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  get sortOptions() {
    return this.response.columns.filter(column => ['ulbShare', 'totalProjectCost'].includes(column.key))
  }

  get payload() {
    const result = {
      skip: this.page * this.limit,
      limit: this.limit,
      // sortBy: this.sortBy,
      // order: this.order
    };
    if (!this.response) return result;
    Object.entries(this.response.filters).forEach(([key, value]) => {
      result[key] = (value as any).filter(item => item.checked).map(item => item._id)
    })
    return result;
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
    this.municipalBondsSerivce.getMouProjects(this.cityId, this.payload).subscribe(res => {
      this.response = res;
    })
  }

  resetFilters() {
    Object.entries(this.response.filters).forEach(([key, value]) => {
      this.response.filters[key] = (value as any).map(item => ({ ...item, checked: false }))
    });
    this.loadData();
  }
}
