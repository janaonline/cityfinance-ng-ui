import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { NewDashbordsRoutingModule } from "./new-dashbords-routing.module";
import { CityComponent } from "./city/city.component";
import { SharedModule } from "src/app/shared/shared.module";
import { StateComponent } from './state/state.component';
import { SlbDashboardComponent } from './slb-dashboard/slb-dashboard.component';
import { SlbDashboardRoutingModule } from "./slb-dashboard/slb-dashboard-routing.module";
import { SlbDashboardModule } from "./slb-dashboard/slb-dashboard.module";

//import { NationalComponent } from './national/national.component';


@NgModule({
  declarations: [CityComponent, StateComponent],
  imports: [CommonModule, NewDashbordsRoutingModule,
 SharedModule, SlbDashboardRoutingModule, SlbDashboardModule ],
})
export class NewDashbordsModule {}
