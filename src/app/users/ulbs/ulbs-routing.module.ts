import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UlbsComponent} from './ulbs.component';

const routes: Routes = [{
  path: '',
  component: UlbsComponent

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [UlbsComponent]
})
export class UlbsRoutingModule {
}
