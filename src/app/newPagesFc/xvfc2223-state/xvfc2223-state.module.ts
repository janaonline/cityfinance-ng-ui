import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Xvfc2223StateRoutingModule } from './xvfc2223-state-routing.module';
import { Xvfc2223StateComponent } from "./xvfc2223-state.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PropertyTaxFloorRateComponent } from './property-tax-floor-rate/property-tax-floor-rate.component';
import { PropertyTaxFloorRatePreviewComponent } from './propertyTaxFloorRate/property-tax-floor-rate-preview/property-tax-floor-rate-preview.component';

@NgModule({
  declarations: [Xvfc2223StateComponent, PropertyTaxFloorRateComponent, PropertyTaxFloorRatePreviewComponent],
  imports: [CommonModule,
            Xvfc2223StateRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            MatTooltipModule],
})
export class Xvfc2223StateModule {}
