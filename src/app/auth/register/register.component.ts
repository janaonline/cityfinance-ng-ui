import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationForm: FormGroup;
  public badCredentials: boolean;
  public formError: boolean;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', []],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.badCredentials.subscribe(res => {
      this.badCredentials = res;
    })
  }

  signup() {
    this.authService.signup(this.registrationForm.value).subscribe(res => {
      alert('Registered Successfully');
      this.router.navigate(['/']);
      console.log(res);
    })
    
  }

}
