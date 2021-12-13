import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewDashbordsRoutingModule } from "./new-dashbords-routing.module";
import { CityComponent } from "./city/city.component";
import { SharedModule } from "src/app/shared/shared.module";
import { StateComponent } from './state/state.component';
import { NationalComponent } from './national/national.component';

@NgModule({
  declarations: [CityComponent, StateComponent, NationalComponent],
  imports: [CommonModule, NewDashbordsRoutingModule, SharedModule],
})
export class NewDashbordsModule {}
