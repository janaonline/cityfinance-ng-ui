import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiscalRankingRoutingModule } from './fiscal-ranking-routing.module';
import { FiscalHomeComponent } from './fiscal-home/fiscal-home.component';
import { FiscalLoginComponent } from './fiscal-login/fiscal-login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { MatCardModule } from "@angular/material/card";
import { UlbFiscalComponent } from './ulb-fiscal/ulb-fiscal.component';
import { SharedModule } from '../shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoaderComponent } from './loader/loader.component';
import {MatRadioModule} from '@angular/material/radio';
import { UlbFisPreviewComponent } from './ulb-fiscal/ulb-fis-preview/ulb-fis-preview.component';

@NgModule({
  declarations: [
    FiscalHomeComponent,
    FiscalLoginComponent,
    UlbFiscalComponent,
    LoaderComponent,
    UlbFisPreviewComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FiscalRankingRoutingModule,
    MatRadioModule
    
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
  // providers: [
  //   {
  //     provide: STEPPER_GLOBAL_OPTIONS,
  //     useValue: { displayDefaultIndicatorType: false }
  //   }
  // ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  // bootstrap: [UlbFiscalComponent],
})
export class FiscalRankingModule { }
