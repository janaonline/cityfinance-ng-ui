import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
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
import { StateFinanceComponent } from './state-finance/state-finance.component';
import { StateFinancePreviewComponent } from './state-finance/state-finance-preview/state-finance-preview.component';
import { GtcFormComponent } from "./gtc-form/gtc-form.component";
import { PropertyTaxFloorRatePreviewComponent } from "./property-tax-floor-rate/property-tax-floor-rate-preview/property-tax-floor-rate-preview.component";
import { GtcPreviewComponent } from './gtc-form/gtc-preview/gtc-preview.component';
import { GrantAllocationComponent } from './grant-allocation/grant-allocation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GaPreviewComponent } from './grant-allocation/ga-preview/ga-preview.component';
import { WaterSupplyComponent } from './water-supply/water-supply.component';
import { WaterSupplyPreviewComponent } from './water-supply/water-supply-preview/water-supply-preview.component';
import { ActionPlanComponent } from './action-plan/action-plan.component';
import { StateformsModule } from "src/app/pages/stateforms/stateforms.module";
import { AgGridStateComponent } from './ag-grid-state/ag-grid-state.component';
import { AgGridModule } from "ag-grid-angular";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridComponent } from "src/app/shared/components/ag-grid/ag-grid.component";

@NgModule({
  declarations: [
    Xvfc2223StateComponent,
    ReviewApplicationComponent,
    PropertyTaxFloorRateComponent,
    PropertyTaxFloorRatePreviewComponent,
    StateFinanceComponent,
    StateFinancePreviewComponent,
    GtcFormComponent,
    GtcPreviewComponent,
    GrantAllocationComponent,
    DashboardComponent,
    GaPreviewComponent,
    WaterSupplyComponent,
    WaterSupplyPreviewComponent,
    ActionPlanComponent,
    AgGridStateComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
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
    SharedModule,
    StateformsModule,
    AgGridModule.withComponents([ActionPlanComponent, AgGridComponent])
    
  ],
})
export class Xvfc2223StateModule {}
