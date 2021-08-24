import {NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

@NgModule({
  imports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule, MatProgressSpinnerModule, MatTooltipModule,MatDialogModule],
  exports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule, MatProgressSpinnerModule, MatTooltipModule,MatDialogModule]
})

export class AngularMaterialModule {
}
