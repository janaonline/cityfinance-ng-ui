import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { State2223Service } from "../../xvfc2223-state/state-services/state2223.service";

@Component({
  selector: "app-gtc2223",
  templateUrl: "./gtc2223.component.html",
  styleUrls: ["./gtc2223.component.scss"],
})
export class Gtc2223Component implements OnInit {
  constructor(private stateService: State2223Service, private _router: Router) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateId = this.userData?.state;
    if(!this.stateId){
      this.stateId = sessionStorage.getItem("state_id");
    }
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
  }
  userData;
  stateId;
  cardData;
  nonmillionUntied: any = [];
  nonmillionTied: any =[];
  millionTied: any = [];
  sideMenuItem: any;
  backRouter;
  nextRouter;
  isApiInProgress = true;
  ngOnInit(): void {
    this.getGtcData();
    this.setRouter();
  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      //  console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach((element) => {
        //   console.log('name name', element);
        if (element?.name == "Grant Transfer Certificate") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }
  noDataFound : boolean = false;
  getGtcData() {
    this.isApiInProgress = true;
    this.stateService.getGtcData(this.stateId).subscribe(
      (res: any) => {
        console.log("res", res?.data?.length);
        if(res?.data?.length == 0){
          this.noDataFound = true;
        }
        this.cardData = res?.data;
        res?.data.forEach((el) => {
          if (el?.type == "nonmillion_untied") {
            if (el?.key == "nonmillion_untied_2021-22_2") {
              this.nonmillionUntied[0] = el;
            }
            if (el?.key == "nonmillion_untied_2022-23_1") {
              this.nonmillionUntied[1] = el;
            }
            if (el?.key == "nonmillion_untied_2022-23_2") {
              this.nonmillionUntied[2] = el;
            }
          }
          if (el?.type == "nonmillion_tied") {
            // this.nonmillionTied.push(el);
            if (el?.key == "nonmillion_tied_2021-22_2") {
              this.nonmillionTied[0] = el;
            }
            if (el?.key == "nonmillion_tied_2022-23_1") {
              this.nonmillionTied[1] = el;
            }
            if (el?.key == "nonmillion_tied_2022-23_2") {
              this.nonmillionTied[2] = el;
            }
          }
          if (el?.type == "million_tied") {
            // this.millionTied.push(el);
            if (el?.key == "million_tied_2021-22_1") {
              this.millionTied[1] = el;
            }
            if (el?.key == "million_tied_2022-23_1") {
              this.millionTied[0] = el;
            }
          }
        });
        console.log("array this.nonmillionTied", this.nonmillionTied);
        console.log("array  this.nonmillionUntied,", this.nonmillionUntied);
        console.log("array this.millionTied,", this.millionTied);
        this.isApiInProgress = false;
      },
      (error) => {
        console.log("err", error);
        this.noDataFound = true;
        this.isApiInProgress = false;
      }
    );
  }
}
