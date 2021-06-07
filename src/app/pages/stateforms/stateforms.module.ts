import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { WaterRejenuvationComponent } from './water-rejenuvation/water-rejenuvation.component';
import { WaterRejenuvationPreviewComponent } from './water-rejenuvation/water-rejenuvation-preview/water-rejenuvation-preview.component';
// import { DoughnutChartArea } from './state-dashboard/donut/donut'

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
    // DoughnutChartArea
  ],
  imports: [
    CommonModule,
    StateformsRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StateformsModule { }
