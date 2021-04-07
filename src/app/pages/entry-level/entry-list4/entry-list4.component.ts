import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-entry-list4',
  templateUrl: './entry-list4.component.html',
  styleUrls: ['./entry-list4.component.scss']
})
export class EntryList4Component implements OnInit {

  constructor(private fb: FormBuilder) { }

  productForm: FormGroup;

  ngOnInit() {
       /* Initiate the form structure */
    this.productForm = this.fb.group({
      title: [],
      selling_points: this.fb.array([this.fb.group({point:''})])
    })

  }
  get sellingPoints() {
    return this.productForm.get('selling_points') as FormArray;
  }

  /////// This is new /////////////////

  addSellingPoint() {
    this.sellingPoints.push(this.fb.group({point:''}));
  }

  deleteSellingPoint(index) {
    this.sellingPoints.removeAt(index);
  }

}
