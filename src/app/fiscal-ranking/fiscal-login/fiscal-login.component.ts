import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    censusForm: FormGroup;
    emailForm: FormGroup;
    mohuaForm:FormGroup;
    submitted: boolean = false;
    hide1=true;

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

    pattern="^[ a-zA-Z][a-zA-Z ]*$";

  constructor(
    private formBuilder: FormBuilder,
     private fiscalrankingservice : FiscalRankingService
     ) { 

     }

  ngOnInit(): void  
  
  {
    this.censusForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.pattern]],
  });

   
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
  });

  this.mohuaForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    
});
    }

    get c() {return this.censusForm.controls;}

    get f() { return this.emailForm.controls; }
    
    get d() {return this.mohuaForm.controls;}

    private resetCaptcha() {
      this.reCaptcha.show = false;
      this.reCaptcha.userGeneratedKey = null;
      this.passwordRequestForm.controls.captcha.reset();
      setTimeout(() => {
        this.reCaptcha.show = true;
      }, 500);
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
      if(this.emailForm.invalid) { 
        return;
      } else {
        console.log(JSON.stringify(this.emailForm.value));
      }
  }

  forget(){
   this.hide1 = false;

   console.log("from forget")
  }

}