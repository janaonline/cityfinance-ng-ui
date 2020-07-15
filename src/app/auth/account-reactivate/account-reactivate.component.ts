import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountReactivateService } from './service/account-reactivate.service';

@Component({
  selector: "app-account-reactivate",
  templateUrl: "./account-reactivate.component.html",
  styleUrls: ["./account-reactivate.component.scss"],
})
export class AccountReactivateComponent implements OnInit {
  form: FormGroup;
  errorMessage;
  successMessage;

  constructor(
    private _reactrivateService: AccountReactivateService,
    private _fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {}

  onFormSubmit() {
    const body = this.form.value;
    this._reactrivateService.sendReactivationEmail(body).subscribe(
      (res) => {},
      (err) => {}
    );
  }

  private createForm() {
    this.form = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }
}
