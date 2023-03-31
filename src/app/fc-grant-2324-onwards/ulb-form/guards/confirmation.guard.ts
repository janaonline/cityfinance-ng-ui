import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UlbFormComponent } from '../ulb-form.component';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require("sweetalert");

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<any> {
  canDeactivate(component: any): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('hasUnsavedChanges', component.webForm.hasUnsavedChanges)
    if(component?.webForm?.hasUnsavedChanges) {
      return swal(
        "Unsaved changes!",
        `Are you sure you want to leave this page? You have unsaved changes.`,
        "warning"
        , {
          buttons: {
            Leave: {
              text: "Leave",
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
