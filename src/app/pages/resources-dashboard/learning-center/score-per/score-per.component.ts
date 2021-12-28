import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
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
  ulbList;
  stateList;
  constructor(
    private _formBuilder: FormBuilder,
    private resource_das_services : ResourcesServicesService,
    protected _commonService: CommonService,
    ) { }
    prescriptionData = [
      {
        name: 'Enumeration',
        value: '40',
        class: 'cls_0'
      },
      {
        name: 'Valuation',
        value: '100',
        class: 'cls_1'
      },
      {
        name: 'Assessment',
        value: '33',
        class: 'cls_2'
      },
      {
        name: 'Billing & Collections',
        value: '24',
        class: 'cls_3'
      },
      {
        name: 'Reporting',
        value: '0',
        class: 'cls_0'
      },
    ]
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
    this.getStateList();

  }
  getStateList(){
    this._commonService.fetchStateList().subscribe((res: any)=> {
   console.log('res ulb list', res)
   this.stateList = res;

    })
  }
  changeState(e){
    console.log('eeeee', e)
    this.getUlbList(e);
  }
  getUlbList(stateCode){
    this._commonService.getUlbByState(stateCode).subscribe((res: any)=> {
      console.log('res ulb list', res?.data);
      this.ulbList = res?.data?.ulbs;
       })
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
  presDetails(presItem) {

  }

}
