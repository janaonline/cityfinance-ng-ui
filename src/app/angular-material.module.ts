import { NgModule } from '@angular/core';
import {
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    imports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule],
    exports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, NgxMatSelectSearchModule]
})

export class AngularMaterialModule {}