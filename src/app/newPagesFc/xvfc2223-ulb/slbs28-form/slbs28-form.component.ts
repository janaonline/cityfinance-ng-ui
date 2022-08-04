import { Component, OnInit } from "@angular/core";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";

@Component({
  selector: "app-slbs28-form",
  templateUrl: "./slbs28-form.component.html",
  styleUrls: ["./slbs28-form.component.scss"],
})
export class Slbs28FormComponent implements OnInit {
  constructor(private newCommonService: NewCommonService) {}

  tableData;
  slbData = {
    "Water supply": [
      {
        lineItemName: "Coverage of water supply connections",
        unit: "%",
        type: "",
        actual: {
          year: "",
          value: "",
        },
        target_1: {
          year: "",
          value: "",
        },
      },
      {
        lineItemName: "Per capita supply of water(lpcd)",
        unit: "LPCD",
        type: "",
        actual: {
          year: "",
          value: "",
        },
        target_1: {
          year: "",
          value: "",
        },
      },
      {
        lineItemName: "Extent of metering of water connections",
        unit: "%",
        type: "",
        actual: {
          year: "",
          value: "",
        },
        target: {
          year: "",
          value: "",
        },
      },
    ],
    Sanitation: [
      {
        lineItemName: "Coverage of toilets",
        unit: "%",
        type: "",
        actual: {
          year: "",
          value: "",
        },
        target_1: {
          year: "",
          value: "",
        },
      },
      {
        lineItemName: "Coverage of waste water network services",
        unit: "LPCD",
        type: "",
        actual: {
          year: "",
          value: "",
        },
        target_1: {
          year: "",
          value: "",
        },
      },
      {
        lineItemName: "Collection efficiency of waste water network",
        unit: "%",
        type: "",
        actual: {
          year: "",
          value: "",
        },
        target: {
          year: "",
          value: "",
        },
      },
    ],
  };

  ngOnInit(): void {
    this.newCommonService.getTable().subscribe((res) => {
      console.log("table DATA", res);
      this.tableData = res;
    });
  }
}
