import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridComponent } from '../../auth/home/grid/grid.component';
import { PreLoaderComponent } from '../../shared/components/pre-loader/pre-loader.component';
import { FinancialInformationComponent } from './financial-information.component';

const routes: Routes = [
  { path: "**", component: FinancialInformationComponent }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    FinancialInformationComponent,
    GridComponent,
    PreLoaderComponent
  ]
})
export class FinancialInformationModule {}
