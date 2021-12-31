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
  closeScoreDiv = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  scorePerformanceData;
  ulbList;
  stateList;
  disStartedBtn = true;
  ulb_id = '';
  btnName = 'Get Started';
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
    private _formBuilder: FormBuilder,
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

scorePostBody = {
      propertyTax: {
        ulb: {
          id: this.ulb_id
        },
        Enumeration: [
          {
          Question: "1",
          answer: "No"
          },
      ],
        Valuation: [
          {
          Question: "1",
          answer: "yes"
          }
      ],
        Assesment: [
          {
           Question: "1",
           answer: "yes"
          }
      ],
        Billing_collection: [{
          Question: "1",
          answer: "No"
        }],
        Reporting: [
          {
          Question: "1",
          answer: "yes"
          }
      ]
      }
    }
 scorePerformanceForm;
  ngOnInit(): void {
    this.scorePerformanceForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: [''],
      // address: this.fb.group({
      //   street: [''],
      //   city: [''],
      //   state: [''],
      //   zip: ['']
      // }),
      enumForm: this.fb.array([

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
  get enumForm() {
    return this.scorePerformanceForm.get('enumForm') as FormArray;
  }

 changeState(e){
    console.log('eeeee', e);
    this.disStartedBtn = true;
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
      this.scorePerformanceData?.enumeration.forEach(el => {
        console.log('el', el)
        this.addEnum(el)
      });
     },
   (error)=> {
    console.log('error', error)
    }
   )
  }
  addEnum(el) {
    console.log(el?.question?.number)
    if(el.question.number != null || el.question.number != undefined || el.question.number != ''){
      this.enumForm.push(this.fb.group({
        Question : [el?.question?.number],
      }));
    }

  }
  changeUlb(e){
    this.ulb_id = e;
    console.log('ulb..', e);
    if(this.ulb_id != '') {
      this.disStartedBtn = false;
      this.resource_das_services.getReportCard(this.ulb_id).subscribe((res: any)=>{
       console.log('responce ulb..', res, typeof(res));
       if(res != null){
        this.closeScoreDiv = true;
       }else {
         this.btnName = 'Try Again'
       }
      },
    (error)=> {
     console.log('error', error)
     })
    }

  }
  closeScoreCard() {
    this.closeScoreDiv = true;
  }
  presDetails(presItem) {

  }
  getStartedScore() {

  }
  goBack(stepper: MatStepper, label){
    stepper.previous();
}

stepperContinue(stepper: MatStepper, label){
    console.log('stepper', stepper, label);
   // let lb: string = label;
     switch(label) {
      case 'enumeration': {
         this.lGreen.enum = true;
         this.lSelected.enum = false;
         console.log('enum', label, this.lGreen)
         break;
      }
      case 'valuation': {
        this.lGreen.valu = true;
        this.lSelected.valu = false;
         break;
      }
      case 'assessment': {
        //statements;
        break;
     }
     case 'billing_collection': {
      //statements;
      break;
     }
   case 'reporting': {
    //statements;
    break;
    }


   }

    stepper.next();

}
SubmitScoreReport(){

  this.scorePostBody.propertyTax.ulb.id = this.ulb_id;
   this.resource_das_services.postScoreReport(this.scorePostBody).subscribe((res: any)=>{
      console.log('post', res)
   },
   (error)=>{
     console.log('post error', error)
   }
   )
}

}
