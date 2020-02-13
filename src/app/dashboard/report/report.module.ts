import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../shared/shared.module';
import { BasicComponent } from './basic/basic.component';
import { ComparativeUlbComponent } from './comparative-ulb/comparative-ulb.component';
import { ExcelService } from './excel.service';
import { InrCurrencyPipe } from './inr-currency.pipe';
import { ReportFooterComponent } from './report-footer/report-footer.component';
import { ReportRouter } from './report.router';
import { ReportService } from './report.service';
import { ReportComponent } from './report/report.component';

// import { IncomeExpenditureComponent } from './income-expenditure/income-expenditure.component';
// import { IncomeExpenditureSummaryComponent } from './income-expenditure-summary/income-expenditure-summary.component';
// import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
// import { CommonSizeComponent } from './common-size/common-size.component';
// import { ComparativeComponent } from './comparative/comparative.component';
// import { CommonSizeUlbComponent } from './common-size-ulb/common-size-ulb.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
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
        ModalModule.forRoot()
    ],
    declarations: [
        InrCurrencyPipe,

        ReportComponent,

        ReportFooterComponent,
        BasicComponent,

        ComparativeUlbComponent
    ],
    exports: [
        InrCurrencyPipe
    ],
    providers: [ReportService, ExcelService]
})
export class ReportModule {}
