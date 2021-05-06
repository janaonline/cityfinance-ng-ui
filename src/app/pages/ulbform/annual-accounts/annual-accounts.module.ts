import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualPreviewComponent } from './annual-preview/annual-preview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  entryComponents:[AnnualPreviewComponent],
  declarations: [AnnualPreviewComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AnnualAccountsModule { }
