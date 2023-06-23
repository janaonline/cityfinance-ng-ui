import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateFormRoutingModule } from './state-form-routing.module';
import { StateFormComponent } from './state-form.component';
import { ReviewUlbTableComponent } from './review-ulb-table/review-ulb-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { Shared2223Module } from 'src/app/shared2223/shared2223.module';
import { FcSharedModule } from '../fc-shared/fc-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GtcComponent } from './gtc/gtc.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { WebFormModule } from 'src/app/mform_webform/web-form/web-form.module';
import { GtcPreviewComponent } from './gtc/gtc-preview/gtc-preview.component';
import { InstallmentPreviewComponent } from './gtc/installment-preview/installment-preview.component';

import { ProjectsWssComponent } from './projects-wss/projects-wss.component';
import { ProjectsWaterRejComponent } from './projects-water-rej/projects-water-rej.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ActionPlanSliComponent } from './action-plan-sli/action-plan-sli.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionPlanComponent } from 'src/app/newPagesFc/xvfc2223-state/action-plan/action-plan.component';
import { AgGrid2223Component } from 'src/app/newPagesFc/xvfc2223-state/action-plan/ag-grid2223/ag-grid2223.component';
import { CustomTooltipComponent } from 'src/app/shared/components/ag-grid/custom-tooltip/custom-tooltip.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { StateFinanceCnComponent } from './state-finance-cn/state-finance-cn.component';
import { SubmitClaimsGrantsComponent } from './submit-claims-grants/submit-claims-grants.component';
import { EditUlbComponent } from './edit-ulb-table/edit-ulb.component';
import { IndicatorsWssComponent } from './indicators-wss/indicators-wss.component';
import { IndicatorWssPreviewComponent } from './indicators-wss/indicator-wss-preview/indicator-wss-preview.component';
import { GrantAllocationUlbsComponent } from './grant-allocation-ulbs/grant-allocation-ulbs.component';


@NgModule({
  declarations: [
    StateFormComponent,
    ReviewUlbTableComponent,
    DashbordComponent,
    ProjectsWssComponent,
    ProjectsWaterRejComponent,
    GtcComponent, GtcPreviewComponent, InstallmentPreviewComponent,
    ActionPlanSliComponent,
    StateFinanceCnComponent,
    SubmitClaimsGrantsComponent,
    EditUlbComponent,
    IndicatorsWssComponent,
    IndicatorWssPreviewComponent,
    GrantAllocationUlbsComponent
  ],
  imports: [
    CommonModule,
    StateFormRoutingModule,
    SharedModule,
    Shared2223Module,
    FcSharedModule,
    ReactiveFormsModule,
    FormsModule,
    WebFormModule,
    AccordionModule.forRoot(),
    MatTooltipModule,
    MatIconModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    AgGridModule.withComponents([ActionPlanComponent, AgGrid2223Component, CustomTooltipComponent]),
  ]
})
export class StateFormModule { }
