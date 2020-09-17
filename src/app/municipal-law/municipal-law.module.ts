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
import { NgxPaginationModule } from 'ngx-pagination';

import { AngularMaterialModule } from '../angular-material.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { MunicipalLawRouter } from './municipal-law.route';
import { MunicipalLawsComponent } from './municipal-laws/municipal-laws.component';

@NgModule({
  imports: [
    CommonModule,
    MunicipalLawRouter,
    CommonModule,
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
  declarations: [MunicipalLawsComponent]
})
export class MunicipalLawModule {}
