import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClickOutsideDirective } from 'angular2-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { rankingRouter } from 'src/app/dashboard/ranking/ranking.router';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { environment } from 'src/environments/environment';
import { FiscalRankingService } from '../fiscal-ranking.service';


@Component({
  selector: 'app-fiscal-login',
  templateUrl: './fiscal-login.component.html',
  styleUrls: ['./fiscal-login.component.scss']
})
export class FiscalLoginComponent implements OnInit {
  formGroupName: FormGroup;
  // formGroupName: FormGroup;
  stateForm: FormGroup;
  mohuaForm: FormGroup;
  censusForm: FormGroup;
  submitted: boolean = false;
  hide1 = true;
  hide2 = false;


  ButtonStyle = [
    { name: "ULB", id: "pills-home-tab", target: "#pills-home", controls: "pills-home" },
    { name: "State", id: "pills-profile-tab", target: "#pills-profile", controls: "pills-profile" },
    { name: "Mohua", id: "pills-contact-tab", target: "#pills-contact", controls: "pills-contact" }
  ]

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
  public passwordRequestForm: FormGroup;
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



  constructor(
    private formBuilder: FormBuilder,
    private fiscalrankingservice: FiscalRankingService
  ) {

  }

  ngOnInit(): void {

    console.log(this.formGroupName);

    this.formGroupName = this.censusForm
    this.censusForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)])]
    });

    // this.formGroupName = this.stateForm
    this.stateForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)])]
    }),

    //  this.formGroupName = this.mohuaForm
      this.mohuaForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.compose([
          Validators.required, Validators.minLength(8)])]


      });
  }

  get c() { return this.censusForm.controls; }

  get f() { return this.stateForm.controls; }

  get d() { return this.mohuaForm.controls; }

  private resetCaptcha() {
    this.reCaptcha.show = false;
    this.reCaptcha.userGeneratedKey = null;
    this.passwordRequestForm.controls.captcha.reset();
    setTimeout(() => {
      this.reCaptcha.show = true;
    }, 500);
  }

  onClickUlb() {
    this.formGroupName = this.censusForm;
    this.resetAllForm();
    console.log(this.formGroupName, "hii1", this.censusForm);



  }
  resetAllForm() {


    this.censusForm.reset();
    this.stateForm.reset();
    this.mohuaForm.reset();
    this.formGroupName.reset();
    this.submitted = false;
  }

  onClickState() {
    this.formGroupName = this.stateForm;
    this.resetAllForm();
    console.log(this.formGroupName, "hii2", this.stateForm);

  };
  onClickmahua() {
    this.formGroupName = this.mohuaForm;
    this.resetAllForm();
    console.log(this.formGroupName, "hii3", this.mohuaForm);
  }

  resolveCaptcha(keyGenerated: string) {
    this.reCaptcha.userGeneratedKey = keyGenerated;
    this.fiscalrankingservice.verifyCaptcha(keyGenerated).subscribe((res) => {
      if (!res["success"]) {
        this.resetCaptcha();
      }

      this.passwordRequestForm.controls.captcha.setValue(keyGenerated);
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.formGroupName.invalid) {
      return;
    } else {
      console.log(JSON.stringify(this.stateForm.value));
    }
  }

  forget() {
    this.hide1 = false;
  }

  otp() {
    this.hide2 = true;
  }

  signInHere() {
    this.hide1 = true;
    this.hide2 = false;

  }

}