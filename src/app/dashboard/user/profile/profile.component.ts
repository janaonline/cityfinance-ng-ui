import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {

    this.profileForm = this.formBuilder.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
    });

    this.userService.getProfile().subscribe(res => {
      this.profileForm.reset(res['user']);
    })
  }

  get pf() { 
    return this.profileForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    this.userService.update(this.profileForm.value).subscribe(res => {
      if(res['success']){
        alert('Updated Successfully');
      }else{
        alert('Error!');
      }
    });      
  }

}
