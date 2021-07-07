import { Component, EventEmitter, Input, OnInit, Output, AfterViewChecked, OnChanges } from '@angular/core';

@Component({
  selector: 'app-state-action-ulb',
  templateUrl: './state-action-ulb.component.html',
  styleUrls: ['./state-action-ulb.component.scss']
})
export class StateActionUlbComponent implements OnInit, AfterViewChecked, OnChanges {

  constructor() { }
  @Output()
   actionValues = new EventEmitter<any>();
   @Input() statusResponse;
  // @Input() statusResponseSlb;
  // @Input() statusResponseW;
  stateAction= '';
  rejectReason = null;
  actionData;
  btnStyleA = false;
  btnStyleR = false;
  compDis = 'false'
  actionDisable = false;

  ngOnInit() {
    this.compDis = localStorage.getItem('stateActionComDis')
    console.log('stateActionRec', this.statusResponse, this.compDis)
    if(this.compDis == 'true'){
      this.actionDisable = true;
      console.log('final action completed.....', this.compDis);
}
  }
  ngOnChanges(){

    this.stateAction = this.statusResponse?.st;
    this.rejectReason = this.statusResponse?.rRes;
    if(this.stateAction == 'APPROVED'){
      this.btnStyleA = true
    }else if(this.stateAction == 'REJECTED'){
      this.btnStyleR = true
    }

  }
  ngAfterViewChecked() {

  }
  checkStatusAp(){
    this.rejectReason = null;
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason
    }
    console.log('stateAction', this.stateAction, this.statusResponse)
    this.actionValues.emit(this.actionData);
  }
  checkStatus(){
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason
    }
    console.log('stateAction', this.stateAction, this.statusResponse)
    this.actionValues.emit(this.actionData);
  }

  // checkStatusRe(){
  //   console.log('stateAction', this.stateAction)
  //    this.actionData = {
  //     status: this.stateAction,
  //     rejectReason: this.rejectReason
  //   }
  //   this.actionValues.emit(this.actionData);
  //    console.log('stateActionemit', this.actionData)
  // }
  // isChecked = false;
  // stateFormStatus = ''
  // stateForm(){
  //   this.approveRejForm = this.fb.group({
  //       approve: '',
  //       reject: ['', Validators.requiredTrue]
  //   });
  // }
  // onFormSubmit() {
  //   alert(JSON.stringify(this.approveRejForm.value, null, 2));
  // }
  // checkStatus(){
  //   if(this.approveRejForm.value.reject){
  //     this.isChecked = true;
  //     //this.approveRejForm.value.approve = false;
  //     this.approveRejForm.patchValue({
  //       approve: false
  //     })

  //   }else{
  //     this.isChecked = false;
  //   }
  //   console.log('Rejected', this.approveRejForm.value)
  // }
  // checkStatusAp(){
  //   this.isChecked = false;
  //   this.approveRejForm.patchValue({
  //     reject: false
  //   })
  //   console.log('Approved', this.approveRejForm.value)
  // }



}
