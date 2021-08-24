import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../shared/services/common.service";

@Component({
  selector: "app-ulb-not-registered",
  templateUrl: "./ulb-not-registered.component.html",
  styleUrls: ["./ulb-not-registered.component.scss"],
})
export class UlbNotRegisteredComponent implements OnInit {
  states: any = [{}];
  nodalOfficer = {
    email: null,
    number: null,
    name: null,
  };
  stateName = null;
  constructor(private commonService: CommonService) {}

  changeNumber:any ={}
  ngOnInit() {
    this.commonService.states.subscribe((res) => {
      this.states = res;
      if(this.changeNumber.state){
        res.forEach(element => {
          if(element.name ===  this.changeNumber.state){
            this.setNodalOfficer(element);
            return false
          }
          return true
        });
      }
    });
    this.commonService.loadStates(false);
    this.changeNumber =  this.commonService.setGetStateRegister(false)
    
  }

  setNodalOfficer(state) {
    this.stateName = state?.value?.name ? state?.value?.name : state?.name;
    this.commonService.getNodalOfficer(state?.value?._id ? state?.value?._id : state?._id).subscribe(
      (res) => {
        this.nodalOfficer.email = res["email"] ;
        this.nodalOfficer.number = res["mobile"];
      },
      (error) => {
        this.nodalOfficer.email = undefined;
        this.nodalOfficer.number = undefined;
      }
    );
  }
}
