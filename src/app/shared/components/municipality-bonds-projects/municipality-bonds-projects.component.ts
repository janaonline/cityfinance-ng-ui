import { Component, Input, OnInit } from '@angular/core';
const swal: SweetAlert = require("sweetalert");
import { MouProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';
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

  response: any;

  constructor(
    private municipalBondsSerivce: MunicipalBondsService,
    public loaderService: GlobalLoaderService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  get payload() {
    return {
      ...this.response?.columns?.filter(column => column.sort !== 0)
        .reduce((result, item) => ({ ...result, [item.key]: item.sort }), {}),
      ...this.response?.columns?.filter(column => column.hasOwnProperty('query'))
        .reduce((result, item) => ({ ...result, [item.key + ['_query']]: item.query }), {})
    };
  }

  updateSorting(column) {
    column.sort++;
    if (column.sort > 1) { column.sort = -1; }
    this.loadData();
  }

  loadData() {
    console.log(new URLSearchParams(this.payload).toString(), this.payload); 
    this.loaderService.showLoader();
    this.municipalBondsSerivce.getMouProjects2(this.cityId, this.payload, this.response?.filters).subscribe(res => {
      this.response = res;
      this.loaderService.stopLoader();
    }, error => {
      swal("Error", error?.message || "Something went worng", "error");
      this.loaderService.stopLoader();
    })
  }
}