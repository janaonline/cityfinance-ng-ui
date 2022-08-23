import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-collect-fdata",
  templateUrl: "./collect-fdata.component.html",
  styleUrls: ["./collect-fdata.component.scss"],
})
export class CollectFdataComponent implements OnInit {
  constructor() {}

  stDbCardData = {
    title: "",
    data: [],
  };

  ngOnInit(): void {}
}
