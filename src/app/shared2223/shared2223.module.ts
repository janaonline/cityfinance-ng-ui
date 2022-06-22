import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OdfFormComponent } from "./components/odf-form/odf-form.component";
import { GfcFormComponent } from "./components/gfc-form/gfc-form.component";
import { FooterBtnComponent } from "./components/footer-btn/footer-btn.component";
import { MatIconModule } from "@angular/material/icon";
@NgModule({
  declarations: [OdfFormComponent, GfcFormComponent, FooterBtnComponent],
  imports: [CommonModule, MatIconModule],
  exports: [OdfFormComponent],
})
export class Shared2223Module {}
