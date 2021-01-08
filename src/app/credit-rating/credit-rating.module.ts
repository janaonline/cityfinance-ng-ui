import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';

import { AngularMaterialModule } from '../angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { ExcelService } from '../dashboard/report/excel.service';
import { LinkConverterPipe } from '../shared/pipes/linkConverter/link-converter.pipe';
import { SharedModule } from '../shared/shared.module';
import { CreditRatingComponent } from './credit-rating.component';
import { CreditRatingRouter } from './credit-rating.route';
import { MunicipalBondComponent } from './municipal-bond/municipal-bond.component';
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
    ReactiveFormsModule,
    AngularMultiSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    MatFormFieldModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    SharedModule,
    AngularMaterialModule
  ],
  declarations: [
    CreditRatingComponent,
    ReportComponent,
    ScaleComponent,
    MunicipalBondComponent,
    LinkConverterPipe
  ],
  providers: [ExcelService]
})
export class CreditRatingModule {}
