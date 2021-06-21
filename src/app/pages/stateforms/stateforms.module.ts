import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { StateformsRoutingModule } from './stateforms-routing.module';
import { StateformsComponent } from './stateforms.component';
import { GTCertificateComponent } from './gtcertificate/gtcertificate.component';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component';
import { EditUlbProfileComponent } from './edit-ulb-profile/edit-ulb-profile.component';
import { ReviewUlbFormComponent } from './review-ulb-form/review-ulb-form.component';
import { WaterSupplyComponent } from './water-supply/water-supply.component';
import { WaterRecyclingComponent } from './water-recycling/water-recycling.component';
import { ActionPlanUAComponent } from './action-plan-ua/action-plan-ua.component';
import { GrantAllocationComponent } from './grant-allocation/grant-allocation.component';
import { GtcertificatePreviewComponent } from './gtcertificate/gtcertificate-preview/gtcertificate-preview.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { WaterRejenuvationComponent } from './water-rejenuvation/water-rejenuvation.component';
import { WaterRejenuvationPreviewComponent } from './water-rejenuvation/water-rejenuvation-preview/water-rejenuvation-preview.component';
import { WaterSupplyPreviewComponent } from './water-supply/water-supply-preview/water-supply-preview.component';
import { GrantAllPreviewComponent } from './grant-allocation/grant-all-preview/grant-all-preview.component';
// import { DoughnutChartArea } from './state-dashboard/donut/donut'
import { AgGridModule } from 'ag-grid-angular';
import {AgGridComponent} from '../../shared/components/ag-grid/ag-grid.component'
import {CustomTooltipComponent} from '../../shared/components/ag-grid/custom-tooltip/custom-tooltip.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionplanspreviewComponent } from './action-plan-ua/actionplanspreview/actionplanspreview.component';

@NgModule({
  declarations: [StateformsComponent,
    GTCertificateComponent,
    StateDashboardComponent,
    EditUlbProfileComponent,
    ReviewUlbFormComponent,
    WaterSupplyComponent,
    WaterRecyclingComponent,
    ActionPlanUAComponent,
    GrantAllocationComponent,
    GtcertificatePreviewComponent,
    WaterRejenuvationComponent,
    WaterRejenuvationPreviewComponent,
    WaterSupplyPreviewComponent,
    GrantAllPreviewComponent,
    // DoughnutChartArea
    AgGridComponent,
    ActionplanspreviewComponent
  ],
  imports: [
    CommonModule,
    StateformsRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    SharedModule,
    TooltipModule.forRoot(),
    FormsModule,
    CollapseModule.forRoot(),
    AgGridModule.withComponents([ActionPlanUAComponent,AgGridComponent,CustomTooltipComponent]),
    PaginationModule.forRoot(),
    NgxPaginationModule,
    MatProgressSpinnerModule
  ]
})
export class StateformsModule { }
