import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Xvfc2223UlbRoutingModule } from "./xvfc2223-ulb-routing.module";
import { Xvfc2223UlbComponent } from "./xvfc2223-ulb.component";
import { OdfComponent } from "./odf/odf.component";
import { Shared2223Module } from "src/app/shared2223/shared2223.module";

@NgModule({
  declarations: [Xvfc2223UlbComponent, OdfComponent],
  imports: [CommonModule, Xvfc2223UlbRoutingModule, Shared2223Module],
})
export class Xvfc2223UlbModule {}
