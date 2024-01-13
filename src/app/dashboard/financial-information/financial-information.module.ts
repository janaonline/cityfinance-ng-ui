import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridComponent } from '../../auth/home/grid/grid.component';
import { SharedModule } from '../../shared/shared.module';
import { FinancialInformationComponent } from './financial-information.component';
import { GobalPartModule } from 'src/app/gobal-part/gobal-part.module';

const routes: Routes = [
  { path: "**", component: FinancialInformationComponent }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule,GobalPartModule],
  declarations: [FinancialInformationComponent, GridComponent]
})
export class FinancialInformationModule {}
