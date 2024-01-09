import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebFormComponent } from './web-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { WebFormViewComponent } from './web-form-view/web-form-view.component';
import { GetFileIcon } from './pipes/file-icon.pipe';
import { AlphabetOnlyDirective } from './directive-and-pipes/alphabet-only/alphabet-only.directive';
import { AlphanumericDirective } from './directive-and-pipes/alphanumeric/alphanumeric.directive';
import { NumberLengthDirective } from './directive-and-pipes/number-length.directive';
import { RestrictFirstDigitAsZeroDirective } from './directive-and-pipes/restrict-first-digit-as-zero/restrict-first-digit-as-zero.directive';
import { WordLimitClassDirective } from './directive-and-pipes/wordLimit/wordLimit.directive';
import { ShortKeyValidationDirective } from './directive-and-pipes/shortKeyValidation/short-key-validation.directive';
import { NumericCommaSeparatorDirective } from './directive-and-pipes/numericCommaSeparator/numeric-comma-separator.directive';
import { DigitOnlyDirective } from './directive-and-pipes/digitOnly/digit-only.directive';
import { RestrictFirstCharAsSpaceDirective } from './directive-and-pipes/restrict-first-char-as-space/restrict-first-char-as-space.directive';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MyFilterPipe } from './pipes/myFilterPipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableViewPipe } from './pipes/table-view.pipe';
import { AddButtonPipe } from './pipes/add-button.pipe';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { MapDialogComponent } from './location-picker/map-dialog/map-dialog.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CommonPreviewTemplateComponent } from './common-preview-template/common-preview-template.component';
import { CfAnnualAccountComponent } from './cf-annual-account/cf-annual-account.component';
import { TabWiseFilterPipe } from './pipes/tabWiseFilter.pipe';
import { ToWordPipe } from './pipes/numToWords.pipe';
import { TableRowCalculatorPipe } from './pipes/table-row-calculator.pipe';
import { DurCustomErrorsPipe } from './pipes/dur-custom-errors.pipe';
import { DurCustomWarningsPipe } from './pipes/dur-custom-warnings.pipe';
import { Slb28UnitPipe } from './pipes/slb28-unit.pipe';
import { MaxRangeDirective } from './directive-and-pipes/maxRange/max-range.directive';
import { AllowTwoDecimal } from './directive-and-pipes/twoDecimalOnly/allowToDecimal.directive';
import { Slb28CustomErrorsPipe } from './pipes/slb28-custom-errors.pipe';
import { DecimalLimitDirective } from './directive-and-pipes/decimalLimit/decimal-limit.directive';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TableSequencePipe } from './pipes/table-sequence.pipe';
import { GtcCustomErrorsPipe } from './pipes/gtc-custom-errors.pipe';
import { DisableNagetiveDirective } from './directive-and-pipes/disable-nagetive.directive';
import { SelectDeletableComponent } from './select-deletable/select-deletable.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollTableDirective } from './directive-and-pipes/scroll-table.directive';
import { ScrollTablePipe } from './directive-and-pipes/scroll-table.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    WebFormComponent,
    SnackBarComponent,
    WebFormViewComponent,
    FileUploadComponent,
    MyFilterPipe,
    GetFileIcon,
    AlphabetOnlyDirective,
    AlphanumericDirective,
    NumberLengthDirective,
    RestrictFirstDigitAsZeroDirective,
    WordLimitClassDirective,
    ShortKeyValidationDirective,
    NumericCommaSeparatorDirective,
    DigitOnlyDirective,
    RestrictFirstCharAsSpaceDirective,
    TableViewPipe,
    AddButtonPipe,
    LocationPickerComponent,
    MapDialogComponent,
    CommonPreviewTemplateComponent,
    CfAnnualAccountComponent,
    TabWiseFilterPipe,
    ToWordPipe,
    TableRowCalculatorPipe,
    DurCustomErrorsPipe,
    DurCustomWarningsPipe,
    Slb28UnitPipe,
    MaxRangeDirective,
    AllowTwoDecimal,
    Slb28CustomErrorsPipe,
    DecimalLimitDirective,
    ReviewFormComponent,
    TableSequencePipe,
    GtcCustomErrorsPipe,
    DisableNagetiveDirective,
    SelectDeletableComponent,
    ScrollTableDirective,
    ScrollTablePipe,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    //  BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //  BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBum81Liii93xQ3JerXGozwDmNSutlZHro&libraries",
      libraries: ["places"],
    }),
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    MatPaginatorModule,
    SharedModule
  ],
  exports: [
    MyFilterPipe,
    GetFileIcon,
    AlphabetOnlyDirective,
    AlphanumericDirective,
    NumberLengthDirective,
    RestrictFirstDigitAsZeroDirective,
    WordLimitClassDirective,
    ShortKeyValidationDirective,
    NumericCommaSeparatorDirective,
    DigitOnlyDirective,
    RestrictFirstCharAsSpaceDirective,
    WebFormComponent,
    SelectDeletableComponent,
    CfAnnualAccountComponent,
    MaxRangeDirective,
    AllowTwoDecimal,
    DisableNagetiveDirective,
    DecimalLimitDirective,
    ReviewFormComponent
  ],
})
export class WebFormModule { }
