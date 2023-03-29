import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent implements OnInit {

  constructor() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.leftMenu = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.stateName = sessionStorage.getItem("stateName");
    this.stateId = this.userData?.state;
    // if (!this.stateId) {
    //   this.stateId = localStorage.getItem("state_id");
    // }
  }

  leftMenu:any;
  userData:any;
  stateName:string;
  stateId:string;
  ngOnInit(): void {
   // this.leftMenu = JSON.parse(localStorage.getItem("leftMenuULB"));
  }

}
