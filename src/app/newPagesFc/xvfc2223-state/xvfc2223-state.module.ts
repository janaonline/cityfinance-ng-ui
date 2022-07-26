import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Xvfc2223StateRoutingModule } from "./xvfc2223-state-routing.module";
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";
import { Shared2223Module } from "src/app/shared2223/shared2223.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { SharedModule } from "src/app/shared/shared.module";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ReviewApplicationComponent } from "./review-application/review-application.component";
import { PropertyTaxFloorRateComponent } from "./property-tax-floor-rate/property-tax-floor-rate.component";
import { PropertyTaxFloorRatePreviewComponent } from "./propertyTaxFloorRate/property-tax-floor-rate-preview/property-tax-floor-rate-preview.component";
import { StateFinanceComponent } from './state-finance/state-finance.component';
import { StateFinancePreviewComponent } from './state-finance/state-finance-preview/state-finance-preview.component';
import { GtcFormComponent } from "./gtc-form/gtc-form.component";

@NgModule({
  declarations: [
    Xvfc2223StateComponent,
    ReviewApplicationComponent,
    PropertyTaxFloorRateComponent,
    PropertyTaxFloorRatePreviewComponent,
    StateFinanceComponent,
    StateFinancePreviewComponent,
    GtcFormComponent
  ],
  imports: [
    CommonModule,
    Shared2223Module,
    Xvfc2223StateRoutingModule,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot(),
    // SharedModule,
  ],
})
export class Xvfc2223StateModule {}
