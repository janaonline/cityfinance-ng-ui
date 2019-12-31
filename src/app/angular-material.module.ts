import { NgModule } from '@angular/core';
import {
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    imports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule, MatProgressSpinnerModule],
    exports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule, MatProgressSpinnerModule]
})

export class AngularMaterialModule {}