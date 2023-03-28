import { Injector, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { WebFormViewComponent } from './web-form-view/web-form-view.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MyFilterPipe } from './myFilterPipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import  { createCustomElement } from '@angular/elements';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { environment } from 'src/environments/environment.prod';

import { GetFileIcon } from './file-icon.pipe';
import { AlphabetOnlyDirective } from './directive-and-pipes/alphabet-only/alphabet-only.directive';
import { AlphanumericDirective } from './directive-and-pipes/alphanumeric/alphanumeric.directive';
import { NumberLengthDirective } from './directive-and-pipes/number-length.directive';
import { RestrictFirstDigitAsZeroDirective } from './directive-and-pipes/restrict-first-digit-as-zero/restrict-first-digit-as-zero.directive';
import { WordLimitClassDirective } from './directive-and-pipes/wordLimit/wordLimit.directive';
import { ShortKeyValidationDirective } from './directive-and-pipes/shortKeyValidation/short-key-validation.directive';
import { NumericCommaSeparatorDirective } from './directive-and-pipes/numericCommaSeparator/numeric-comma-separator.directive';
import { DigitOnlyDirective } from './directive-and-pipes/digitOnly/digit-only.directive';
import { RestrictFirstCharAsSpaceDirective } from './directive-and-pipes/restrict-first-char-as-space/restrict-first-char-as-space.directive';

@NgModule({
  declarations: [
    ...(environment.production ? [] : [AppComponent]),
    MyFilterPipe,
    AppComponent,
    SnackBarComponent,
    WebFormViewComponent,
    FileUploadComponent,
    GetFileIcon,
    AlphabetOnlyDirective,
    AlphanumericDirective,
    NumberLengthDirective,
    RestrictFirstDigitAsZeroDirective,
    WordLimitClassDirective,
    ShortKeyValidationDirective,
    NumericCommaSeparatorDirective,
    DigitOnlyDirective,
    RestrictFirstCharAsSpaceDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [],
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
    RestrictFirstCharAsSpaceDirective
  ],
  // entryComponents:[AppComponent],
  entryComponents:[AppComponent],
  // bootstrap: [AppComponent]
  bootstrap: environment.production ? [] : [AppComponent]
})
export class AppModule{
  constructor (private injector: Injector){
    // const el = createCustomElement(AppComponent,{injector});
    // customElements.define('web-form',el);
  }

  ngDoBootstrap(){
    const el = createCustomElement(AppComponent,{injector: this.injector});
    customElements.define('web-form',el);
  }
 }
