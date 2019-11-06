import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditRatingRouter } from './credit-rating.route';
import { CreditRatingComponent } from './credit-rating.component';
import { ReportComponent } from './report/report.component';
import { ScaleComponent } from './scale/scale.component';
import { MunicipalBondComponent } from './municipal-bond/municipal-bond.component';
import { AgGridModule } from 'ag-grid-angular';
import { AuthModule } from '../auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MunicipalLawsComponent } from './municipal-laws/municipal-laws.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [
    CommonModule,
    CreditRatingRouter,
    HttpClientModule,
    AgGridModule.withComponents([]),
    AuthModule,
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [CreditRatingComponent, ReportComponent, ScaleComponent, MunicipalBondComponent, MunicipalLawsComponent]
})
export class CreditRatingModule { }
