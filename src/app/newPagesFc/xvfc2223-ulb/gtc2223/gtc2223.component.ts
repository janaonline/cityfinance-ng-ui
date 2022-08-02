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
  }
  userData;
  stateId;
  cardData;
  nonmillionUntied = [];
  nonmillionTied = [];
  millionTied = [];
  ngOnInit(): void {
    this.getGtcData();
  }
  getGtcData() {
    this.stateService.getGtcData(this.stateId).subscribe(
      (res: any) => {
        console.log("res", res);
        this.cardData = res?.data;
        res?.data.forEach((el) => {
          if (el?.type == "nonmillion_untied") {
            this.nonmillionUntied.push(el);
          }
          if (el?.type == "nonmillion_tied") {
            this.nonmillionTied.push(el);
          }
          if (el?.type == "million_tied") {
            this.millionTied.push(el);
          }
        });
        console.log(
          "array",
          this.nonmillionUntied,

          this.millionTied,
          this.nonmillionTied
        );
      },
      (error) => {
        console.log("err", error);
      }
    );
  }
}
