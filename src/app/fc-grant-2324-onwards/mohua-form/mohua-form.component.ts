import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mohua-form',
  templateUrl: './mohua-form.component.html',
  styleUrls: ['./mohua-form.component.scss']
})
export class MohuaFormComponent implements OnInit {

  constructor() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.leftMenu = JSON.parse(localStorage.getItem("MohuaLeftMenu"));
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
