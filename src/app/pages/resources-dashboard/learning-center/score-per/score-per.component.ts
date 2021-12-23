import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ResourcesServicesService } from '../../resDashboard-services/resources-services.service';

@Component({
  selector: 'app-score-per',
  templateUrl: './score-per.component.html',
  styleUrls: ['./score-per.component.scss']
})
export class ScorePerComponent implements OnInit {
  closeScoreDiv = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  scorePerformanceData;
  constructor(
    private _formBuilder: FormBuilder,
    private resource_das_services : ResourcesServicesService
    ) { }

  ngOnInit(): void {
    let activeStepper =document.getElementsByClassName('mat-step-icon-state-edit')
    for(let i =0; i<activeStepper.length; i++){
      activeStepper[i].nextElementSibling.classList.add('new-class')

      }
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.getData();
  }

   getData() {
      this.resource_das_services.getScorePerValue().subscribe((res: any)=>{
      console.log('score performace value', res);
      this.scorePerformanceData = res[0];
      console.log('score performace value ------',  this.scorePerformanceData);
     },
   (error)=> {
    console.log('error', error)
    }
   )
  }
  closeScoreCard() {
    this.closeScoreDiv = true;
  }
}
