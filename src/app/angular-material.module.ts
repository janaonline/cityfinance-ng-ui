import { NgModule } from '@angular/core';
import {
    MatTabsModule,
    MatSelectModule,
    MatButtonModule
} from '@angular/material';


@NgModule({
    imports: [MatTabsModule, MatSelectModule, MatButtonModule],
    exports: [MatTabsModule, MatSelectModule, MatButtonModule]
})

export class AngularMaterialModule { }