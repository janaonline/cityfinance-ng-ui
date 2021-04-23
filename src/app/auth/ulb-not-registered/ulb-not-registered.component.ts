import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';


@Component({
  selector: 'app-ulb-not-registered',
  templateUrl: './ulb-not-registered.component.html',
  styleUrls: ['./ulb-not-registered.component.scss']
})
export class UlbNotRegisteredComponent implements OnInit {
  states: any = [{}];
  nodalOfficer = {
    email:null,
    number:null,
    name:null    
  }
  stateName = null
  constructor(private commonService: CommonService,) { }

  ngOnInit() {
    this.commonService.states.subscribe(res => {
      this.states = res;  
    })
    this.commonService.loadStates(false);
  }

  setNodalOfficer(state){
    this.stateName = state.value.name
    this.commonService.getNodalOfficer(state.value._id).subscribe(res =>{
      this.nodalOfficer.email = res['email'];
      this.nodalOfficer.number = res['mobile'];
    })
  }
}
