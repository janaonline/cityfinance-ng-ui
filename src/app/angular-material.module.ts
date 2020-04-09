import {NgModule} from '@angular/core';
import {
  MatTabsModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule, MatTooltipModule, MatDialogModule
} from '@angular/material';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

@NgModule({
  imports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule, MatProgressSpinnerModule, MatTooltipModule,MatDialogModule],
  exports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule, MatProgressSpinnerModule, MatTooltipModule,MatDialogModule]
})

export class AngularMaterialModule {
}
