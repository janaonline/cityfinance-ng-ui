import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../shared/shared.module';
import { BasicComponent } from './basic/basic.component';
import { ComparativeUlbComponent } from './comparative-ulb/comparative-ulb.component';
import { ExcelService } from './excel.service';
import { FinancialStatementComponent } from './financial-statement/financial-statement.component';
import { ReportFooterComponent } from './report-footer/report-footer.component';
import { ReportRouter } from './report.router';
import { ReportService } from './report.service';
import { ReportComponent } from './report/report.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReportRouter,
    MatDialogModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatFormFieldModule,
    SharedModule,
    MatSlideToggleModule,
    ModalModule.forRoot(),
    ScrollingModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ReportComponent,
    FinancialStatementComponent,
    ReportFooterComponent,
    BasicComponent,
    ComparativeUlbComponent,
  ],
  //   exports: [InrCurrencyPipe],
  providers: [ReportService, ExcelService],
})
export class ReportModule {}
