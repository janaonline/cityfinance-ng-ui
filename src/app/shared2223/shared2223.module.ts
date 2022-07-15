import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OdfFormComponent } from "./components/odf-form/odf-form.component";
import { GfcFormComponent } from "./components/gfc-form/gfc-form.component";
import { FooterBtnComponent } from "./components/footer-btn/footer-btn.component";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonFileUploadComponent } from "./components/common-file-upload/common-file-upload.component";
import { NumberToWordINRPipe } from "./pipes/number-to-word-inr.pipe";
import { OdfFormPreviewComponent } from "./components/odf-form/odf-form-preview/odf-form-preview.component";
import {
  FourTwoDigitNumberDirective,
  FiftTwoDigitNumberDirective,
} from "./directive/decimal.directive";
import { Xvfc2223UlbRoutingModule } from "../newPagesFc/xvfc2223-ulb/xvfc2223-ulb-routing.module";
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
@NgModule({
  declarations: [
    OdfFormComponent,
    GfcFormComponent,
    FooterBtnComponent,
    CommonFileUploadComponent,
    NumberToWordINRPipe,
    OdfFormPreviewComponent,
    FiftTwoDigitNumberDirective,
    FourTwoDigitNumberDirective,
    ErrorDisplayComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    Xvfc2223UlbRoutingModule,
  ],
  exports: [
    OdfFormComponent,
    CommonFileUploadComponent,
    FiftTwoDigitNumberDirective,
    FourTwoDigitNumberDirective,
  ],
})
export class Shared2223Module {}
