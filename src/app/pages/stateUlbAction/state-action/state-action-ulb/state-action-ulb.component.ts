import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-state-action-ulb',
  templateUrl: './state-action-ulb.component.html',
  styleUrls: ['./state-action-ulb.component.scss']
})
export class StateActionUlbComponent implements OnInit {

  constructor() { }
  @Output()
   actionValues = new EventEmitter<any>();
  stateAction = '';
  rejectReason = null;
  actionData;
  ngOnInit(): void {
  }
  checkStatus(){
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason
    }
    console.log('stateAction', this.stateAction)
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
