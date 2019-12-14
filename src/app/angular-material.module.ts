import { NgModule } from '@angular/core';
import {
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
} from '@angular/material';


@NgModule({
    imports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule],
    exports: [MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule]
})

export class AngularMaterialModule { }