import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipal-bond-repository',
  templateUrl: './municipal-bond-repository.component.html',
  styleUrls: ['./municipal-bond-repository.component.scss']
})
export class MunicipalBondRepositoryComponent implements OnInit {

  categoryId = null;
  subCategoryId = null;

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

  subCategories: any[] = [
    {
      name: 'sub 1',
      _id: 'abc'
    },
    {
      name: 'sub 2',
      _id: 'def'
    }
  ];

  
  cardData: any[] = [
    {
      name: 'Online Self-Assessment System of Property Tax for Bruhat Bengaluru Mahanagara Palike (BBMP)',
      downloadUrl: 'https://staging.cityfinance.in/objects/385ddbdc-41bf-4c7a-be6d-e54440828812.pdf'
    },
    {
      name: 'second',
      downloadUrl: 'https://staging.cityfinance.in/objects/385ddbdc-41bf-4c7a-be6d-e54440828812.pdf'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  clearFilters() {
    this.categoryId = null;
    this.subCategoryId = null;
    this.loadData();
  }

  loadCategories() {

  }

  loadSubCategories() {

  }

  loadData() {
    const payload = {
      catetory_id: this.categoryId,
      sub_category_id: this.subCategoryId
    }
    console.log(payload);
  }
}
