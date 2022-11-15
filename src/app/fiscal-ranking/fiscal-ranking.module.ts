import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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



@NgModule({
  declarations: [FiscalHomeComponent, FiscalLoginComponent, UlbFiscalComponent],
  imports: [
    CommonModule,
    FiscalRankingRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ]
})
export class FiscalRankingModule { }
