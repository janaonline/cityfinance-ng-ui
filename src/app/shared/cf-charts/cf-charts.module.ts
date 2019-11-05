import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfChartsComponent } from './cf-charts.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [CfChartsComponent],
  exports: [CfChartsComponent]
})
export class CfChartsModule { }
