import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-score-per',
  templateUrl: './score-per.component.html',
  styleUrls: ['./score-per.component.scss']
})
export class ScorePerComponent implements OnInit {
  closeScoreDiv = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  closeScoreCard() {
    this.closeScoreDiv = true;
  }
}
