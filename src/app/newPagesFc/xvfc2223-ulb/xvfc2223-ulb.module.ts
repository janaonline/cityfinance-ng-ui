import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { Xvfc2223UlbRoutingModule } from "./xvfc2223-ulb-routing.module";
import { Xvfc2223UlbComponent } from "./xvfc2223-ulb.component";
import { OdfComponent } from "./odf/odf.component";
import { Shared2223Module } from "src/app/shared2223/shared2223.module";
import { AnnualAccountsComponent } from "./annual-accounts/annual-accounts.component";
import { GfcComponent } from "./gfc/gfc.component";
import { AnnualPreviewComponent } from './annual-accounts/annual-preview/annual-preview.component';

@NgModule({
  declarations: [
    Xvfc2223UlbComponent,
    OdfComponent,
    AnnualAccountsComponent,
    GfcComponent,
    AnnualPreviewComponent,
  ],
  imports: [
    CommonModule,
    Xvfc2223UlbRoutingModule,
    Shared2223Module,
    MatIconModule,
    FormsModule,
  ],
})
export class Xvfc2223UlbModule {}
