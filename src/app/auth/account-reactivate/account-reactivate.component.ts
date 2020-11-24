import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';

import { AccountReactivateService } from './service/account-reactivate.service';

@Component({
  selector: "app-account-reactivate",
  templateUrl: "./account-reactivate.component.html",
  styleUrls: ["./account-reactivate.component.scss"],
  encapsulation: ViewEncapsulation.None,

})
export class AccountReactivateComponent implements OnInit {
  form: FormGroup;
  errorMessage;
  successMessage;
  urlMessage: string;

  userTypeSelected: USER_TYPE;
  USER_TYPE = USER_TYPE;

  constructor(
    private _reactrivateService: AccountReactivateService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {}

  onSelectingUserType(value: USER_TYPE) {
    this.userTypeSelected = value;
    switch (value) {
      case USER_TYPE.ULB: {
        return this.form.controls.email.setValidators([
          Validators.required,
          Validators.pattern("(?!.*@).*"),
        ]);
      }
      default: {
        return this.form.controls.email.setValidators([
          Validators.required,
          Validators.email,
        ]);
      }
    }
  }

  onFormSubmit() {
    this.resetMessages();
    const body = this.form.value;
    this._reactrivateService.sendReactivationEmail(body).subscribe(
      (res) => {
        this.successMessage = res["message"] || ";Email send";
      },
      (err) => {
        this.errorMessage = err["error"]["message"] || "Server Error";
      }
    );
  }

  private createForm() {
    this.form = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params["email"]) {
        this.form.setValue({ email: params["email"] });
      }
      if (params["message"]) {
        this.urlMessage = params["message"];
      }
    });
  }

  private resetMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }
}
