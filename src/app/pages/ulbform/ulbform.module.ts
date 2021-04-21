import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from  '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UlbformRoutingModule } from './ulbform-routing.module';
import { UtilisationReportComponent } from './utilisation-report/utilisation-report.component';
import { UlbformComponent } from './ulbform.component';
import { PreviewUtiFormComponent } from './utilisation-report/preview-uti-form/preview-uti-form.component';

import {MatDialogModule} from '@angular/material/dialog';
import { WaterSanitationComponent } from './water-sanitation/water-sanitation.component';
import { SixDigitDecimaNumberDirective, TwoDigitDecimaNumberDirective } from './utilisation-report/decimal.directive';
import { GrantTraCertiComponent } from './grant-tra-certi/grant-tra-certi.component';
import { ImagePreviewComponent } from './utilisation-report/image-preview/image-preview.component';
@NgModule({
  entryComponents: [PreviewUtiFormComponent, ImagePreviewComponent],
  declarations: [
     UtilisationReportComponent,
     UlbformComponent,
     PreviewUtiFormComponent,
     WaterSanitationComponent,
     TwoDigitDecimaNumberDirective,
     SixDigitDecimaNumberDirective,
     GrantTraCertiComponent,
     ImagePreviewComponent
    ],
  imports: [
    CommonModule,
    UlbformRoutingModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,


  ]
})
export class UlbformModule { }
