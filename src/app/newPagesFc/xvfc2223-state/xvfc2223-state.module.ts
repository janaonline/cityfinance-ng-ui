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
import { StateformsModule } from "src/app/pages/stateforms/stateforms.module";
import { EditUlbComponent } from './edit-ulb/edit-ulb.component';
import { EditUlbProfileComponent } from "src/app/pages/stateforms/edit-ulb-profile/edit-ulb-profile.component";
import { EditViewComponent } from "src/app/pages/stateforms/edit-ulb-profile/edit-view/edit-view.component";
import { WaterRejenuvations2223Component } from './water-rejenuvations2223/water-rejenuvations2223.component';
import { WaterRejenuvations2223PreviewComponent } from './water-rejenuvations2223/water-rejenuvations2223-preview/water-rejenuvations2223-preview.component';
import { ActionPlanComponent } from './action-plan/action-plan.component';
import { CollapseModule } from "ngx-bootstrap/collapse";
import { AgGridModule } from 'ag-grid-angular';
import { AgGridComponent } from '../../shared/components/ag-grid/ag-grid.component'
import { CustomTooltipComponent } from '../../shared/components/ag-grid/custom-tooltip/custom-tooltip.component';
import { AgGrid2223Component } from './action-plan/ag-grid2223/ag-grid2223.component'
import { ButtonRendererComponent } from "./action-plan/delete-btn";
import { GrantClaimsComponent } from './grant-claims/grant-claims.component';
import { GrantClaimsDialogComponent } from './grant-claims/grant-claims-dialog/grant-claims-dialog.component';

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
    EditUlbComponent,
    WaterRejenuvations2223Component,
    WaterRejenuvations2223PreviewComponent,
    ActionPlanComponent,
    AgGrid2223Component,
    GrantClaimsComponent,
    GrantClaimsDialogComponent,
    // ButtonRendererComponent
  ],
  imports: [
    CommonModule,
    Shared2223Module,
    SharedModule,
    Xvfc2223StateRoutingModule,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot(),
    StateformsModule,
    CollapseModule.forRoot(),
    AgGridModule.withComponents([ActionPlanComponent, AgGrid2223Component, CustomTooltipComponent]),
  ],
})
export class Xvfc2223StateModule {}
