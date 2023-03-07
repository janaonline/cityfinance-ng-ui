import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualAccountTemplateComponent } from './components/annual-account-template/annual-account-template.component';
import { DurTemplateComponent } from './components/dur-template/dur-template.component';
import { LeftMenuTemplateComponent } from './components/left-menu-template/left-menu-template.component';
import { MatIconModule } from '@angular/material/icon';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormLoaderComponent } from './components/form-loader/form-loader.component';


@NgModule({
  declarations: [AnnualAccountTemplateComponent, DurTemplateComponent, LeftMenuTemplateComponent, FormLoaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
  ],
  exports: [
    AnnualAccountTemplateComponent,
    DurTemplateComponent,
    LeftMenuTemplateComponent
  ]
})
export class FcSharedModule { }
