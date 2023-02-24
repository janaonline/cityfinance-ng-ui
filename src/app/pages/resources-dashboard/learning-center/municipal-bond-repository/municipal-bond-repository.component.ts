import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipal-bond-repository',
  templateUrl: './municipal-bond-repository.component.html',
  styleUrls: ['./municipal-bond-repository.component.scss']
})
export class MunicipalBondRepositoryComponent implements OnInit {

  categories: any[] = [
    {
      name: 'category 1',
      _id: 'abc'
    },
    {
      name: 'category 2',
      _id: 'def'
    }
  ];

  cardData: any[] = [
    {
      name: 'name',
      downloadUrl: 'https://staging.cityfinance.in/objects/385ddbdc-41bf-4c7a-be6d-e54440828812.pdf'
    },
    {
      name: 'second',
      downloadUrl: 'https://staging.cityfinance.in/objects/385ddbdc-41bf-4c7a-be6d-e54440828812.pdf'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  clearAll() {
    
  }

  filterData() {

  }
}
