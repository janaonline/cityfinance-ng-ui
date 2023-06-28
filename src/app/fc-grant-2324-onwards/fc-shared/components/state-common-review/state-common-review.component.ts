import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-state-common-review',
  templateUrl: './state-common-review.component.html',
  styleUrls: ['./state-common-review.component.scss']
})
export class StateCommonReviewComponent implements OnInit {

  constructor() { }
  
  @Input() canTakeAction:boolean = false;
  @Input() uploadFolderName:string = '';
  @Input() errorInAction = false;
  @Input() isActionSubmitted = false;
  @Input() actBtnDis:boolean = false;
  @Input() formData;
  @Output() formChangeEventEmit = new EventEmitter<string>();
  @Input() question;

  statusIdForApprove:string = '6';
  statusIdForReject:string = '7';
  Years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));

  ngOnInit(): void {
    console.log('formdata', this.formData);
    
  }

  formValueChange(event, type, question){
    console.log('review', event, type, question)
    let obj =  this.formData.uaData.filter((el)=>{
      el?.ua == question?.ua
    })

    console.log('review obj obj', obj)
  }
}
