import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-filter-data",
  templateUrl: "./filter-data.component.html",
  styleUrls: ["./filter-data.component.scss"],
})
export class FilterDataComponent implements OnInit {
  constructor() {}

  scatterData = {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Line one",
          data: [
            { x: 0, y: 12 },
            { x: 50, y: 12 },
          ],
          showLine: true,
          fill: false,
          borderColor: "rgba(0, 200, 0, 1)",
        },
        {
          label: "Line Two",
          data: [
            { x: 0, y: 8 },
            { x: 50, y: 8 },
          ],
          showLine: true,
          fill: false,
          borderColor: "red",
        },
        {
          label: "Muncipality",
          data: [
            { x: 12, y: 12 },
            { x: 12, y: 4 },
            { x: 4, y: 6 },
            { x: 6, y: 9 },
            {
              x: 50,
              y: 20,
            },
            {
              x: 10,
              y: 10,
            },
          ],
          showLine: false,
          fill: true,
          borderColor: "#1EBFC6",
          backgroundColor: "#1EBFC6",
        },
        {
          label: "Muncipal Corporation",
          data: [
            { x: 9, y: 12 },
            { x: 8, y: 4 },
            { x: 24, y: 6 },
            { x: 8, y: 9 },
            {
              x: 30,
              y: 20,
            },
            {
              x: 15,
              y: 10,
            },
          ],
          showLine: false,
          fill: true,
          borderColor: "#3E5DB1",
          backgroundColor: "#3E5DB1",
        },
        {
          label: "Town Panchayat",
          data: [
            { x: 21, y: 12 },
            { x: 10, y: 4 },
            { x: 18, y: 6 },
            { x: 16, y: 9 },
            {
              x: 30,
              y: 20,
            },
            {
              x: 15,
              y: 10,
            },
          ],
          showLine: false,
          fill: true,
          borderColor: "#F5B742",
          backgroundColor: "#F5B742",
        },
      ],
    },
  };
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

  actionFromChart(value) {
    console.log(value, "in filter");
    if (value.name === "expand" || value.name === "collapse")
      this.expand = !this.expand;
  }
}
