import { Component, EventEmitter, Input, OnInit, Output, AfterViewChecked, OnChanges } from '@angular/core';

@Component({
  selector: 'app-action-component',
  templateUrl: './action-component.component.html',
  styleUrls: ['./action-component.component.scss']
})
export class ActionComponentComponent implements OnInit, AfterViewChecked, OnChanges  {

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

  ngOnInit() {

  }
  ngOnChanges(){
    console.log('stateActionRec', this.statusResponse)
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



}
