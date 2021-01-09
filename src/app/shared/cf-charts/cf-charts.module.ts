import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CfChartsComponent } from './cf-charts.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CfChartsComponent],
  exports: [CfChartsComponent],
})
export class CfChartsModule {}
