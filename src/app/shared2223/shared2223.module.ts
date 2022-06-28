import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OdfFormComponent } from "./components/odf-form/odf-form.component";
import { GfcFormComponent } from "./components/gfc-form/gfc-form.component";
import { FooterBtnComponent } from "./components/footer-btn/footer-btn.component";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonFileUploadComponent } from "./components/common-file-upload/common-file-upload.component";
import { NumberToWordINRPipe } from "./pipes/number-to-word-inr.pipe";
import { OdfFormPreviewComponent } from './components/odf-form/odf-form-preview/odf-form-preview.component';
@NgModule({
  declarations: [
    OdfFormComponent,
    GfcFormComponent,
    FooterBtnComponent,
    CommonFileUploadComponent,
    NumberToWordINRPipe,
    OdfFormPreviewComponent,
  ],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule],
  exports: [OdfFormComponent, CommonFileUploadComponent],
})
export class Shared2223Module {}
