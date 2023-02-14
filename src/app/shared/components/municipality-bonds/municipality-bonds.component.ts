import { Component, OnInit } from '@angular/core';
import { MouProjectsResponse } from 'src/app/credit-rating/municipal-bond/models/ulbsResponse';
import { MunicipalBondsService } from '../../services/municipal/municipal-bonds.service';

@Component({
  selector: 'app-municipality-bonds',
  templateUrl: './municipality-bonds.component.html',
  styleUrls: ['./municipality-bonds.component.scss']
})
export class MunicipalityBondsComponent implements OnInit {

  hiddenColumns = ['projectName', 'moreInformation', 'sector'];
  response: MouProjectsResponse;

  constructor(
    private municipalBondsSerivce: MunicipalBondsService
  ) { }

  ngOnInit(): void {
    this.municipalBondsSerivce.getMouProjects().subscribe(res => {
      this.response = res;
    })
  }
}
