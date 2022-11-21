import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fiscal-login',
  templateUrl: './fiscal-login.component.html',
  styleUrls: ['./fiscal-login.component.scss']
})
export class FiscalLoginComponent implements OnInit {
    registerForm: FormGroup;
    submitted: boolean = false;
    

    loginDetails = [
      {
        role: "ULB",
        loginName: "Census Code/ULB Code",
        loginPlaceHolder: "Census Code/ULB Code",
        loginValidation: "censusValidation",
      },
      {
        role: "USER",
        loginName: "Email",
        loginPlaceHolder: "Email",
        loginValidation: "emailValidation",
      },
    ];
  
    countDown: Subscription;
    counter = 60;
    tick = 1000;
    counterTimer = false;
    help = false;
    noCodeError = false;
    otpCreads: any = {};
    loginSet: any = {};
    ulbCode = "";
    perFillUser;
    public isOtpLogin = false;
    selectedUserType = "";
    public loginForm: FormGroup;
    public badCredentials: boolean;
    public formError: boolean;
  
    public loginError: string;
    public emailVerificationMessage: string;
    otpVerificationMessage: boolean = false;
    public reCaptcha = {
      show: false,
      siteKey: environment.reCaptcha.siteKey,
      userGeneratedKey: null,
    };
    public hide = true;
    directLogin = false;
    customValidator: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void  {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
        otp: [""],
      },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      });
    }

    get registerFormControl() {
      return this.registerForm.controls;
    }

    onSubmit() {
      this.submitted = true;
      if (this.registerForm.valid) {
        alert('Form Submitted succesfully!!!\n Check the values in browser console.');
        console.table(this.registerForm.value);
      }
    }

}