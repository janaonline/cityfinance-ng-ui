import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Xvfc2223StateRoutingModule } from "./xvfc2223-state-routing.module";
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";
import { PtoComponent } from "./pto/pto.component";
import { Shared2223Module } from "src/app/shared2223/shared2223.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [Xvfc2223StateComponent, PtoComponent],
  imports: [
    CommonModule,
    Xvfc2223StateRoutingModule,
    Shared2223Module,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    // SharedModule,
  ],
})
export class Xvfc2223StateModule {}
