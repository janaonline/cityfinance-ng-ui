import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboard-user',
  templateUrl: './onboard-user.component.html',
  styleUrls: ['./onboard-user.component.scss']
})
export class OnboardUserComponent implements OnInit {
 
  userOnboardForm: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userOnboardForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', [Validators.required]]
    });
  }

  get f() { 
    return this.userOnboardForm.controls; 
  }

  onboard() {
    this.submitted = true;
    if(!this.userOnboardForm.valid){
      return false;
    }
    this.userService.onboard(this.userOnboardForm.value).subscribe(res => {
      console.log(res);
      if(res['success']){
        alert('User Onboarded');
      }
      
      
    })
  }

}
