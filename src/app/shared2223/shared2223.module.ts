import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OdfFormComponent } from "./components/odf-form/odf-form.component";
import { GfcFormComponent } from "./components/gfc-form/gfc-form.component";
import { FooterBtnComponent } from "./components/footer-btn/footer-btn.component";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonFileUploadComponent } from './components/common-file-upload/common-file-upload.component';
@NgModule({
  declarations: [OdfFormComponent, GfcFormComponent, FooterBtnComponent, CommonFileUploadComponent],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  exports: [OdfFormComponent],
})
export class Shared2223Module {}
