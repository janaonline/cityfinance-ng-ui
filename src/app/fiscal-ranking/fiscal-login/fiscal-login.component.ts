
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
    formGroupName:FormGroup;
    stateForm: FormGroup;
    mohuaForm:FormGroup;
    censusForm:FormGroup;
    submitted:boolean= false;
    hide1=true;
    hide2=false;
    public loginError: string;
    public emailVerificationMessage: string;
    otpVerificationMessage: boolean = false;
    public badCredentials: boolean;

  Buttons = [
    {name:"ULB"},{name:"State"},{name:"Mohua"}]

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
    // public badCredentials: boolean;
    public formError: boolean;
  
    
    // public emailVerificationMessage: string;
    // otpVerificationMessage: boolean = false;
    public reCaptcha = {
      show: true,
      siteKey: environment.reCaptcha.siteKey,
      userGeneratedKey: null,
    };
    public hide = true;
    directLogin = false;
    customValidator: any;

  constructor(
    private formBuilder: FormBuilder,
     private fiscalrankingservice : FiscalRankingService
     ) { 

     }
     

  ngOnInit() {
    this.formGroupName = this.formBuilder.group({
            email1: ["", [Validators.required, Validators.email]],
            password1: ["", [Validators.required, Validators.minLength(8)]],
            email2: ['', [Validators.required, Validators.email]],
            password2: ['', [Validators.required, Validators.minLength(8)]],
            email3: ['', [Validators.required, Validators.email]],
            password3: ['', [Validators.required, Validators.minLength(8)]],
            email4: ['', [Validators.required, Validators.email]],
     });
    }

    get c() { return this.formGroupName.controls;}

    onSubmit() {
      
      this.loginError = null;
      this.submitted = true;
      if(this.formGroupName.invalid) { 
        this.formError = true;
        
      } else {
        console.log(JSON.stringify(this.formGroupName.value));
      }
  }


//   signinUser(data:any){
// this.fiscalrankingservice.signin(data).subscribe((res)=>{
// const user:any =res.find((a:any)=>{
//   this.formGroupName.value.email === a.email && this.formGroupName.value.password === a.password
// })

// })
//   }

    private resetCaptcha() {
      this.reCaptcha.show = false;
      this.reCaptcha.userGeneratedKey = null;
      this.passwordRequestForm.controls.captcha.reset();
      setTimeout(() => {
        this.reCaptcha.show = true;
      }, 500);
    }
  
onClickUlb(){
this.formGroupName=this.censusForm;
this.resetAllForm();
console.log(this.formGroupName,"hii1",this.censusForm);

}

FormResetAll(){

  this.formGroupName.reset();
this.submitted=false;
}

resetAllForm (){
  

//   this.censusForm.reset();
// this.stateForm.reset();
// this.mohuaForm.reset();
this.formGroupName.reset();
this.submitted=false;
}

onClickState(){
  this.formGroupName=this.stateForm;
  this.resetAllForm();
  console.log(this.formGroupName,"hii2",this.stateForm);
  
};
onClickmahua(){
  this.formGroupName=this.mohuaForm;
  this.resetAllForm();
  console.log(this.formGroupName,"hii3",this.mohuaForm);
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

  forgot(){
   this.hide1 = false;
  }

  otp(){
    this.hide2 = true;
   }

}
