import {environment} from './../../../environments/environment';
import {AuthService} from 'src/app/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public badCredentials: boolean;
  public submitted: boolean = false;
  public formError: boolean;
  public creditRatingReportUrl = environment.api.url + 'assets/credit_rating.xlsx';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.badCredentials.subscribe(res => {
      this.badCredentials = res;
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(res => {
        if (res && res['token']) {
          localStorage.setItem('id_token', JSON.stringify(res['token']));
          this.router.navigate(['users']);
        } else {
          localStorage.removeItem('id_token');
        }

      }, (error) => {
        console.log(error);
      });
    } else {
      this.formError = true;
    }
  }

}
