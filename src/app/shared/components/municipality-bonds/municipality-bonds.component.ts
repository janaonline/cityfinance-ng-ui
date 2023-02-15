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

  hiddenColumns = ['projectName', 'moreInformation', 'sector'];
  activeFilterKey = 'implementationAgencies';
  response: MouProjectsResponse;

  constructor(
    private municipalBondsSerivce: MunicipalBondsService
  ) { }

  get payload() {
    const result = {};
    if(!this.response) return result;
    Object.entries(this.response.filters).forEach(([key, value]) => {
      result[key] = (value as any).filter(item => item.checked).map(item => item._id)
    })
    return result;
  }

  ngOnInit(): void {
    this.municipalBondsSerivce.getMouProjects(this.cityId).subscribe(res => {
      this.response = res;
    })
  }
}
