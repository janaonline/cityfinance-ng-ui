import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-filter-data",
  templateUrl: "./filter-data.component.html",
  styleUrls: ["./filter-data.component.scss"],
})
export class FilterDataComponent implements OnInit {
  constructor() {}
  btnSelected = false;
  ngOnInit(): void {}

  expand = false;
  @Input()
  data = {
    btn: ["btn1", "btn2"],
    headLine: `Money received or earned by a ULB during the financial year ULBs get its
    revenue from sources such as PT, UC, Rental, assigned revenues, grants.
    Of these PT, UC, Rental form own revenue for an ULB.`,
  };
  lastSelectedId;
  changeActiveBtn(i) {
    let id = `btn-${i}`;
    if (this.lastSelectedId) {
      document.getElementById(this.lastSelectedId).classList.remove("selected");
      document.getElementById(this.lastSelectedId).classList.add("deSelected");
    }
    document.getElementById(id).classList.remove("deSelected");
    document.getElementById(id).classList.add("selected");
    this.lastSelectedId = id;
  }
}
