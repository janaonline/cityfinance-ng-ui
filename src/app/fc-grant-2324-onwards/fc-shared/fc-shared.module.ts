import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualAccountTemplateComponent } from './components/annual-account-template/annual-account-template.component';
import { DurTemplateComponent } from './components/dur-template/dur-template.component';
import { LeftMenuTemplateComponent } from './components/left-menu-template/left-menu-template.component';
import { MatIconModule } from '@angular/material/icon';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormLoaderComponent } from './components/form-loader/form-loader.component';
import { UlbFormRoutingModule } from '../ulb-form/ulb-form-routing.module';
import { RouterModule } from '@angular/router';
import { FormCommonActionComponent } from './components/form-common-action/form-common-action.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [AnnualAccountTemplateComponent, DurTemplateComponent, LeftMenuTemplateComponent, FormLoaderComponent, FormCommonActionComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    TooltipModule.forRoot(),
    UlbFormRoutingModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule

  ],
  exports: [
    AnnualAccountTemplateComponent,
    DurTemplateComponent,
    LeftMenuTemplateComponent,
    FormLoaderComponent,
    FormCommonActionComponent
  ]
})
export class FcSharedModule { }
