import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { StateformsRoutingModule } from "./stateforms-routing.module";
import { StateformsComponent } from "./stateforms.component";
import { GTCertificateComponent } from "./gtcertificate/gtcertificate.component";
import { StateDashboardComponent } from "./state-dashboard/state-dashboard.component";
import { EditUlbProfileComponent } from "./edit-ulb-profile/edit-ulb-profile.component";
import { ReviewUlbFormComponent } from "./review-ulb-form/review-ulb-form.component";
import { WaterSupplyComponent } from "./water-supply/water-supply.component";
import { ActionPlanUAComponent } from "./action-plan-ua/action-plan-ua.component";
import { GrantAllocationComponent } from "./grant-allocation/grant-allocation.component";
import { GtcertificatePreviewComponent } from "./gtcertificate/gtcertificate-preview/gtcertificate-preview.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { MatDialogModule } from '@angular/material/dialog'
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxPaginationModule } from "ngx-pagination";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { WaterRejenuvationComponent } from "./water-rejenuvation/water-rejenuvation.component";
import { WaterRejenuvationPreviewComponent } from "./water-rejenuvation/water-rejenuvation-preview/water-rejenuvation-preview.component";
import { WaterSupplyPreviewComponent } from "./water-supply/water-supply-preview/water-supply-preview.component";
import { GrantAllPreviewComponent } from "./grant-allocation/grant-all-preview/grant-all-preview.component";
import { EditViewComponent } from "./edit-ulb-profile/edit-view/edit-view.component";
import { EditComponent } from "./edit-ulb-profile/edit/edit.component";
import { LinkPFMSComponent } from "./link-pfms/link-pfms.component";
import { PfmsPreviewComponent } from "./link-pfms/pfms-preview/pfms-preview.component";

// import { DoughnutChartArea } from './state-dashboard/donut/donut'
import { AgGridModule } from 'ag-grid-angular';
import { AgGridComponent } from '../../shared/components/ag-grid/ag-grid.component'
import { CustomTooltipComponent } from '../../shared/components/ag-grid/custom-tooltip/custom-tooltip.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionplanspreviewComponent } from './action-plan-ua/actionplanspreview/actionplanspreview.component';
import { OverallListComponent } from './state-dashboard/overall-list/overall-list.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { AnnualaccListComponent } from './state-dashboard/annualacc-list/annualacc-list.component';
import { UtilreportListComponent } from './state-dashboard/utilreport-list/utilreport-list.component';
import { PlansListComponent } from './state-dashboard/plans-list/plans-list.component';
import { PfmsListComponent } from './state-dashboard/pfms-list/pfms-list.component';
import { SlbListComponent } from './state-dashboard/slb-list/slb-list.component';

import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
@NgModule({
  entryComponents: [OverallListComponent],
  declarations: [StateformsComponent,
    GTCertificateComponent,
    StateDashboardComponent,
    EditUlbProfileComponent,
    ReviewUlbFormComponent,
    WaterSupplyComponent,
    ActionPlanUAComponent,
    GrantAllocationComponent,
    GtcertificatePreviewComponent,
    WaterRejenuvationComponent,
    WaterRejenuvationPreviewComponent,
    WaterSupplyPreviewComponent,
    GrantAllPreviewComponent,
    EditViewComponent,
    EditComponent,
    // DoughnutChartArea
    AgGridComponent,
    ActionplanspreviewComponent,
    OverallListComponent,
    AnnualaccListComponent,
    UtilreportListComponent,
    PlansListComponent,
    PfmsListComponent,
    SlbListComponent,
    // OverallListComponent,
    // AnnualAccountsListComponent,
    // PfmsListComponent,
    // SlbListComponent,
    // PlansListComponent,
    // UtilReportListComponent
    LinkPFMSComponent,
    PfmsPreviewComponent,


  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    StateformsRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    SharedModule,
    TooltipModule.forRoot(),
    FormsModule,
    CollapseModule.forRoot(),
    AgGridModule.withComponents([ActionPlanUAComponent, AgGridComponent, CustomTooltipComponent]),
    PaginationModule.forRoot(),
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ChartsModule,
    ButtonsModule.forRoot()

  ]
})
export class StateformsModule { }
