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
  ]

  constructor() { }

  ngOnInit(): void {
  }

  clearAll() {
    
  }

  filterData() {

  }
}
