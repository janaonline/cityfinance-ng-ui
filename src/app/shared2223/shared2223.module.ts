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
import { MatTooltipModule } from "@angular/material/tooltip";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxPaginationModule } from "ngx-pagination";
import { TableComponent } from './components/table/table.component';
import { CommonActionComponent } from './components/common-action/common-action.component';
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
    TableComponent,
    CommonActionComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    Xvfc2223UlbRoutingModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule
    
  ],
  exports: [
    OdfFormComponent,
    CommonFileUploadComponent,
    FiftTwoDigitNumberDirective,
    FourTwoDigitNumberDirective,
    ErrorDisplayComponent,
    TableComponent,
    CommonActionComponent
  ],
})
export class Shared2223Module {}
