import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OdfFormComponent } from "./components/odf-form/odf-form.component";
import { GfcFormComponent } from "./components/gfc-form/gfc-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [OdfFormComponent, GfcFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [OdfFormComponent],
})
export class Shared2223Module {}
