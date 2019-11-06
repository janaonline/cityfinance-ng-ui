import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRouter } from './report.router';
// import { IncomeExpenditureComponent } from './income-expenditure/income-expenditure.component';
// import { IncomeExpenditureSummaryComponent } from './income-expenditure-summary/income-expenditure-summary.component';
// import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { ReportComponent } from './report/report.component';
import { ReportService } from './report.service';
import { InrCurrencyPipe } from './inr-currency.pipe';
import { ExcelService } from './excel.service';
// import { CommonSizeComponent } from './common-size/common-size.component';
import { ReportFooterComponent } from './report-footer/report-footer.component';
import { BasicComponent } from './basic/basic.component';
// import { ComparativeComponent } from './comparative/comparative.component';
// import { CommonSizeUlbComponent } from './common-size-ulb/common-size-ulb.component';
import { ComparativeUlbComponent } from './comparative-ulb/comparative-ulb.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReportRouter,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    InrCurrencyPipe, 
    // IncomeExpenditureComponent, 
    // IncomeExpenditureSummaryComponent,
    // BalanceSheetComponent, 
    ReportComponent, 
    // CommonSizeComponent,
    ReportFooterComponent, 
    BasicComponent, 
    // ComparativeComponent, 
    // CommonSizeUlbComponent, 
    ComparativeUlbComponent
  ],
  providers: [ReportService, ExcelService]
})
export class ReportModule { }
