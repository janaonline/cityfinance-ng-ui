import { Component, OnInit } from '@angular/core';
import { ResourcesDashboardService } from '../../resources-dashboard.service';

@Component({
  selector: 'app-municipal-bond-repository',
  templateUrl: './municipal-bond-repository.component.html',
  styleUrls: ['./municipal-bond-repository.component.scss']
})
export class MunicipalBondRepositoryComponent implements OnInit {
  categoryId = null;
  subCategoryId = null;

  categories: any[] = [];
  subCategories: any[] = [];
  cardData: any[] = [];

  constructor(private resourcesDashboard: ResourcesDashboardService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadData();
  }

  clearFilters() {
    this.categoryId = null;
    this.subCategoryId = null;
    this.loadData();
  }

  loadCategories() {
    this.resourcesDashboard.getMunicipalityBondsRepositoryCategories().subscribe(({ data }: any) => {
      this.categories = data;
    })
  }

  loadSubCategories() {
    this.subCategoryId = null;
    if (!this.categoryId) return;
    this.resourcesDashboard.getMunicipalityBondsRepositorySubCategories(this.categoryId).subscribe(({ data }: any) => {
      this.subCategories = data;
    })
  }

  loadData() {
    this.resourcesDashboard.getMunicipalityBondsRepositoryList({
      ...(this.categoryId && {categoryId: this.categoryId}),
      ...(this.subCategoryId && {subCategoryId: this.subCategoryId}),
    }).subscribe(({ data }: any) => {
      this.cardData = data;
    })
  }
}
