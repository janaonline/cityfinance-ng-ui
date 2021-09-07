import { Component, EventEmitter, Input, OnInit, Output, AfterViewChecked, OnChanges } from '@angular/core';
import { UlbformService } from 'src/app/pages/ulbform/ulbform.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UserUtility } from 'src/app/util/user/user';
@Component({
  selector: 'app-state-action-ulb',
  templateUrl: './state-action-ulb.component.html',
  styleUrls: ['./state-action-ulb.component.scss']
})
export class StateActionUlbComponent implements OnInit, AfterViewChecked, OnChanges {

  constructor(
    public _ulbformService: UlbformService
  ) { }
  @Output()
  actionValues = new EventEmitter<any>();
  @Input() statusResponse;
  // @Input() statusResponseSlb;
  // @Input() statusResponseW;
  stateAction = '';
  rejectReason = null;
  actionData;
  btnStyleA = false;
  btnStyleR = false;
  compDis = 'false'
  actionDisable = false;
  USER_TYPES = USER_TYPE;
  actionText = ''
  userDetails = new UserUtility().getLoggedInUserDetails();
  ngOnInit() {
    this.compDis = localStorage.getItem('stateActionComDis')
    console.log('stateActionRec', this.statusResponse, this.compDis)
    if (this.compDis == 'true') {
      this.actionDisable = true;
      console.log('final action completed.....', this.compDis);
      if (this.userDetails.role == USER_TYPE.STATE) {
        this.actionText = 'State Review Status';
      } else if (this.userDetails.role == USER_TYPE.MoHUA) {
        this.actionText = 'MoHUA Review Status';
      }
    }

    this._ulbformService.disableAllFormsAfterStateReview.subscribe(
      (disable) => {
        console.log("utilization speaking", disable);
        this.compDis = 'true';
        if (disable) {
          localStorage.setItem("stateActionComDis", 'true');
          this.actionDisable = true;
        }
      }
    );
    this._ulbformService.disableAllFormsAfterMohuaReview.subscribe(
      (disable) => {
        console.log("utilization speaking", disable);
        this.compDis = 'true';

        if (disable) {
          localStorage.setItem("mohuaActionComDis", 'true');
          this.actionDisable = true;
        }
      }
    );
  }
  ngOnChanges() {

    this.stateAction = this.statusResponse?.st;
    this.rejectReason = this.statusResponse?.rRes;
    if (this.stateAction == 'APPROVED') {
      this.btnStyleA = true
    } else if (this.stateAction == 'REJECTED') {
      this.btnStyleR = true
    }

  }
  ngAfterViewChecked() {

  }
  checkStatusAp() {
    this.btnStyleA = true;
    this.btnStyleR = false;
    this.rejectReason = null;
    this.actionData = {
      status: this.stateAction,
      rejectReason: this.rejectReason
    }
    console.log('stateAction', this.stateAction, this.statusResponse)
    this.actionValues.emit(this.actionData);
  }
  checkStatus() {
    this.btnStyleA = false;
    this.btnStyleR = true;
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
