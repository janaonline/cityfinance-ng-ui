import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-annual-accounts",
  templateUrl: "./annual-accounts.component.html",
  styleUrls: ["./annual-accounts.component.scss"],
})
export class AnnualAccountsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  quesOneAnswer: boolean = false;
  quesTwoAnswer: boolean = false;

  answer(question,val) {
    switch (question) {
      case "q1":
        this.quesOneAnswer = val
        break;
      default:
        this.quesTwoAnswer = val
        break;
    }
  }
}
