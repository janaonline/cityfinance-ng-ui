import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UlbFormComponent } from '../ulb-form.component';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require("sweetalert");

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<any> {
  canDeactivate(
    component: any,
    route: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('hasUnsavedChanges', component.webForm.hasUnsavedChanges)
    console.log(nextState.url);
    if (nextState.url != '/rankings/home' && component?.webForm?.hasUnsavedChanges) {
      return swal(
        "Unsaved Changes!",
        `You have some unsaved changes on this page. Do you wish to save your data as draft?`,
        "warning"
        , {
          buttons: {
            Leave: {
              text: "Discard",
              className: 'btn-danger',
              value: true,
            },
            Stay: {
              text: "Stay",
              className: 'btn-success',
              value: false,
            },
          },
        }
      );
    }
    return true;
  }
}
