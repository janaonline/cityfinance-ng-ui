import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  myForm: FormGroup;
  radioOptions = [
    { value: 1, color: '#ff9999' }, // Light Red
    { value: 2, color: '#99ccff' }, // Light Blue
    { value: 3, color: '#99ff99' }, // Light Green
    { value: 4, color: '#ffcc99' }, // Light Orange
    { value: 5, color: '#ccccff' }  // Light Purple
  ]; 

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      selectedOption: [''], 
      textarea1: [''], 
      textarea2: ['']  
    });
  }

  submitForm() {
    console.log(this.myForm.value);
  }


  ngOnInit(): void {
  }

}
