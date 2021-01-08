import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CfChartsComponent } from './cf-charts.component';

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: [CfChartsComponent],
  exports: [CfChartsComponent],
})
export class CfChartsModule {}
