import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StateListComponent} from './state-list.component';

const routes: Routes = [
  {path: '', component: StateListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [StateListComponent]
})
export class StateListRoutingModule {
}
