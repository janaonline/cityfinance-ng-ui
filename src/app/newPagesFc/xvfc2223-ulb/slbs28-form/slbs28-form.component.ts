import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { Slbs28FormPreviewComponent } from "./slbs28-form-preview/slbs28-form-preview.component";

@Component({
  selector: "app-slbs28-form",
  templateUrl: "./slbs28-form.component.html",
  styleUrls: ["./slbs28-form.component.scss"],
})
export class Slbs28FormComponent implements OnInit {
  constructor(private newCommonService: NewCommonService,public dialog: MatDialog) {}

  tableData;
  slbData = {
    "Water supply": [
      {
        question: "Coverage of water supply connections",
        indicatorLineItem: "",
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
    this.onLoad();
  }
  onLoad() {
    this.newCommonService.get28SlbsData().subscribe((res: any) => {
      console.log("28 slbs data DATA", res);
      this.slbData = res?.data;
    });
  }

  returnZero() {
    return 0;
  }

  onPreview(){
    const dialogRef = this.dialog.open(Slbs28FormPreviewComponent, {
      data:  this.slbData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
