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
  rejectReason = '';
  ngOnInit(): void {
  }
  checkStatusAp(){
    this.rejectReason ='';
    console.log('stateAction', this.stateAction)
    this.actionValues.emit(this.stateAction);
  }
  checkStatusRe(){
    console.log('stateAction', this.stateAction)
    let actionValues = {
      status: this.stateAction,
      rejectReason: this.rejectReason
    }
    this.actionValues.emit(actionValues);
     console.log('stateActionemit', actionValues)
  }
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
