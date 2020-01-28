import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AuthModule } from '../auth/auth.module';
import { ExcelService } from '../dashboard/report/excel.service';
import { LinkConverterPipe } from '../shared/pipes/linkConverter/link-converter.pipe';
import { CreditRatingComponent } from './credit-rating.component';
import { CreditRatingRouter } from './credit-rating.route';
import { MunicipalBondComponent } from './municipal-bond/municipal-bond.component';
import { MunicipalLawsComponent } from './municipal-laws/municipal-laws.component';
import { ReportComponent } from './report/report.component';
import { ScaleComponent } from './scale/scale.component';

@NgModule({
  imports: [
    CommonModule,
    CreditRatingRouter,
    HttpClientModule,
    AgGridModule.withComponents([]),
    AuthModule,
    FormsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [
    CreditRatingComponent,
    ReportComponent,
    ScaleComponent,
    MunicipalBondComponent,
    MunicipalLawsComponent,
    LinkConverterPipe
  ],
  providers: [ExcelService]
})
export class CreditRatingModule {}
