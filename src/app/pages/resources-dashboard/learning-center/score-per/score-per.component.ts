import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { ResourcesServicesService } from '../../resDashboard-services/resources-services.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-score-per',
  templateUrl: './score-per.component.html',
  styleUrls: ['./score-per.component.scss']
})
export class ScorePerComponent implements OnInit {
  stepperScoreDiv = false;
  reportScoreDiv = false;
  scoreReportData;
  scorePerformanceData;
  ulbList;
  stateList;
  disStartedBtn = true;
  ulb_id = '';
  btnName = 'Get Started';
  stateName = ''
  lGreen = {
      enum: false,
      valu: false,
      asse: false,
      bAndC: false,
      repo: false
  };
  lSelected = {
    enum: false,
    valu: false,
    asse: false,
    bAndC: false,
    repo: false
};

  constructor(
    private resource_das_services : ResourcesServicesService,
    protected _commonService: CommonService,
    private fb: FormBuilder
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
    ];

scorePostBody;
 scorePerformanceForm;
  ngOnInit(): void {
    this.scorePerformanceForm = this.fb.group({
      // ulb: [this.ulb_id, Validators.required],
      enumeration: this.fb.array([
      ]),
      valuation: this.fb.array([
      ]),
      assessment: this.fb.array([
      ]),
      billing_collection: this.fb.array([
      ]),
      reporting: this.fb.array([
      ])
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
    console.log('eeeee', e);
    this.disStartedBtn = true;
    this.stepperScoreDiv = false;
      this.reportScoreDiv = false;
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
     // this.deleteRow(0);
       this.addFormArray();
     },
   (error)=> {
    console.log('error', error)
    }
   )
  }

  get enumRows() {
    return this.scorePerformanceForm.get('enumeration') as FormArray;
  }

  get valuRows() {
    return this.scorePerformanceForm.get('valuation') as FormArray;
  }

  get assesRows() {
    return this.scorePerformanceForm.get('assessment') as FormArray;
  }

  get billingRows() {
    return this.scorePerformanceForm.get('billing_collection') as FormArray;
  }

  get reportingRows() {
    return this.scorePerformanceForm.get('reporting') as FormArray;
  }


 addFormArray(){
  this.scorePerformanceData?.enumeration.forEach(el => {
  //  console.log('el', el)
    this.addFormControls(el, 'enum')
  });
  this.scorePerformanceData?.valuation.forEach(el => {
    this.addFormControls(el, 'valu')
  });
  this.scorePerformanceData?.assessment.forEach(el => {
    this.addFormControls(el, 'assessment')
  });
  this.scorePerformanceData?.billing_collection.forEach(el => {
    this.addFormControls(el, 'billing_collection')
  });
  this.scorePerformanceData?.reporting.forEach(el => {
    this.addFormControls(el, 'reporting')
  });
 }


  addFormControls(el, type) {
     if(type == 'enum'){
      this.enumRows.push(this.fb.group({
        question : [el?.question?.number],
        answer: ['', Validators.required],
        questionText : [el?.question?.text]
      }));
     }
     if(type == 'valu'){
      this.valuRows.push(this.fb.group({
        question : [el?.question?.number],
        answer: ['', Validators.required],
        questionText : [el?.question?.text]
      }));
     }
     if(type == 'assessment'){
      this.assesRows.push(this.fb.group({
        question : [el?.question?.number],
        answer: ['', Validators.required],
        questionText : [el?.question?.text]
      }));
     }
     if(type == 'billing_collection'){
      this.billingRows.push(this.fb.group({
        question : [el?.question?.number],
        answer: ['', Validators.required],
        questionText : [el?.question?.text]
      }));
     }
     if(type == 'reporting'){
      this.reportingRows.push(this.fb.group({
        question : [el?.question?.number],
        answer: ['', Validators.required],
        questionText : [el?.question?.text]
      }));
     }



  }
  changeUlb(e){
    this.ulb_id = e;
    console.log('ulb..', e);
    if(this.ulb_id) this.disStartedBtn = false;

  }
  // getReportCard(){
  //   if(this.ulb_id != '') {
  //     this.resource_das_services.getReportCard(this.ulb_id).subscribe((res: any)=>{
  //      console.log('responce ulb..', res, typeof(res));
  //      this.scoreReportData = res?.data;
  //     },
  //   (error)=> {
  //    console.log('error', error)
  //    })
  //   }
  // }
  closeScoreCard() {
    this.stepperScoreDiv = false;
  }
  presDetails(presItem) {

  }
  getStartedScore() {
    if(this.ulb_id != '') {
      this.resource_das_services.getReportCard(this.ulb_id).subscribe((res: any)=>{
       console.log('responce ulb..', res, typeof(res));
       this.scoreReportData = res?.data;
       if(this.btnName != 'Try Again'){
        if(this.scoreReportData){
          this.stepperScoreDiv = false;
         this.reportScoreDiv = true;
         this.btnName = 'Try Again'
        }else {
         this.stepperScoreDiv = true;
         this.reportScoreDiv = false;
        }
      }
      else {
        // this.changeState('null');
        // $("#stateName").val('');
        this.stepperScoreDiv = true;
         this.reportScoreDiv = false;
        this.btnName = 'Get Started'
      }
      },
    (error)=> {
     console.log('error', error)
     })
    }


  }
  goBack(stepper: MatStepper, label){
    switch(label) {
      case 'enumeration': {
         this.lGreen.enum = false;
         this.lSelected.enum = true;
         break;
      }
      case 'valuation': {
        this.lGreen.enum = false;
        this.lSelected.enum = true;
      //  console.log('valu', this.scorePerformanceForm)
         break;
      }
      case 'assessment': {
        this.lGreen.valu = false;
         this.lSelected.valu = true;
       // console.log('asses', this.scorePerformanceForm)
        break;
     }
     case 'billing_collection': {
      this.lGreen.asse = false;
      this.lSelected.asse = true;
    //  console.log('bilii', this.scorePerformanceForm)
      break;
     }
     case 'reporting': {
      this.lGreen.bAndC = false;
      this.lSelected.bAndC = true;
    //console.log('repo', this.scorePerformanceForm)
      break;
    }
   }
   stepper.previous();
  }

stepperContinue(stepper: MatStepper, label){
    console.log('stepper', stepper, label);
   // let lb: string = label;
     switch(label) {
      case 'enumeration': {
         this.lGreen.enum = true;
         this.lSelected.enum = false;
        console.log('enum', this.scorePerformanceForm)
         break;
      }
      case 'valuation': {
        this.lGreen.valu = true;
        this.lSelected.valu = false;
      //  console.log('valu', this.scorePerformanceForm)
         break;
      }
      case 'assessment': {
        this.lGreen.asse = true;
        this.lSelected.asse = false;
        break;
     }
     case 'billing_collection': {
    //  console.log('bilii', this.scorePerformanceForm)
       this.lGreen.bAndC = true;
      this.lSelected.bAndC = false;
      break;
     }
   case 'reporting': {
    this.lGreen.repo = true;
    this.lSelected.repo = false;
    //console.log('repo', this.scorePerformanceForm)
    break;
    }
   }
    stepper.next();

}
SubmitScoreReport() {
this.scorePostBody = {
  ulb: this.ulb_id,
  scorePerformance : this.scorePerformanceForm.value
}

 console.log('submit', this.scorePerformanceForm, this.scorePerformanceForm.value)
   this.resource_das_services.postScoreReport(this.scorePostBody).subscribe((res: any)=>{
      console.log('post', res);
      this.getStartedScore();
   },
   (error)=>{
     console.log('post error', error)
   }
   )
}

}
