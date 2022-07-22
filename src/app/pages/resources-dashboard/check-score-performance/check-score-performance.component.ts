import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/shared/services/common.service";
import { ResourcesServicesService } from "../resDashboard-services/resources-services.service";

@Component({
  selector: "app-check-score-performance",
  templateUrl: "./check-score-performance.component.html",
  styleUrls: ["./check-score-performance.component.scss"],
})
export class CheckScorePerformanceComponent implements OnInit {
  constructor(
    private _commonService: CommonService,
    private resource_das_services: ResourcesServicesService,
    public dialog: MatDialog,
    public router: Router
  ) {}
  globalFormControl = new FormControl();
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  scoreReportData;
  prescription;
  ulb_id = "";
  reportScoreDiv = false;
  ngOnInit(): void {
    this.globalFormControl.valueChanges.subscribe((value) => {
      if (value.length >= 1) {
        this._commonService
          .postGlobalSearchData(value, "", "")
          .subscribe((res: any) => {
            console.log(res?.data);
            let emptyArr: any = [];
            this.filteredOptions = emptyArr;
            if (res?.data.length > 0) {
              this.filteredOptions = res?.data;
              //  this.noDataFound = false;
            } else {
              let emptyArr: any = [];
              this.filteredOptions = emptyArr;
              //  this.noDataFound = true;
              console.log("no data found");
            }
          });
      } else {
        return null;
      }
    });
  }

  noPopupData: boolean = false;
  globalSearchClick() {
    let searchArray: any = this.filteredOptions;
    let searchValue = searchArray.find(
      (e) =>
        e?.name.toLowerCase() == this.globalFormControl?.value.toLowerCase()
    );
    this.ulb_id = searchValue?._id;
    console.log("eeeee", this.globalFormControl, searchValue, searchArray);
    if (this.ulb_id != "") {
      this.resource_das_services.getReportCard(this.ulb_id).subscribe(
        (res: any) => {
          console.log("responce ulb..", res, typeof res);
          if (res.data) {
            this.noPopupData = false;
            this.reportScoreDiv = true;
            this.scoreReportData = res?.data;
            this.scoreReportData?.currentUlb?.partcularAnswerValues.forEach(
              (el) => {
                el.isActive = false;
              }
            );
            //  this.prescription = res?.data?.currentUlb?.partcularAnswerValues[0]?.prescription;
            // this.prescription =   `You have adopted 11 property tax reforms. Your property tax system has scope for
            //  further improvement. You see section-wise score and prescription pertaining to areas
            //  of improvement, and refer the property tax toolkit (hyperlink) for information on steps
            //   towards property tax reforms. Property
            // tax reforms have potential to increase revenues and collection, and improve financial sustainability.`
           // this.getPrescriptionText(this.scoreReportData);
             res.data.currentUlb.partcularAnswerValues[0].isActive = true;
            this.prescription = res?.data?.currentUlb?.partcularAnswerValues[0]?.prescription;
            if (this.scoreReportData) {
              //   this.stepperScoreDiv = false;
              //  this.reportScoreDiv = true;
              //  this.btnName = 'Try Again'
            } else {
              //  this.stepperScoreDiv = true;
              //  this.reportScoreDiv = false;
            }
          } else {
            this.noPopupData = true;
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  presDetails(presItem) {
    // console.log(presItem);
    this.prescription = presItem?.prescription;
    this.scoreReportData?.currentUlb?.partcularAnswerValues.forEach((el) => {
      el.isActive = false;
    });
    presItem.isActive = true;
    console.log(presItem);
  }
  getPrescriptionText(value) {
    if (value) console.log("currentValue", value);
    let obj = [
      "assessment",
      "billing_collection",
      "enumeration",
      "reporting",
      "valuation",
    ];

    let count = 0;
    for (let item of obj) {
      value?.currentUlb?.scorePerformance[item].forEach((elem) => {
        if (elem.answer) {
          count++;
        }
      });
    }

    let currentScore = value?.currentUlb?.total * 10;
    console.log("value", currentScore);
    if (currentScore == 100) {
      this.prescription = `You have adopted all the property tax reforms. Your property tax system is robust,
       which should increase the share of property tax in own revenues.`;
      //  this.clonePrescribeText = this.prescribeText;
    } else if (currentScore < 100 && currentScore > 50) {
      this.prescription = `You have adopted ${count} property tax reforms.
       Your property tax system has scope for further improvement.
       You may refer the  <a href="#" class="aTag-s">property tax toolkit</a> for
       information on steps towards property tax reforms.
       Property tax reforms have potential to increase
       revenues and collection, and improve financial sustainability.`;
      //  this.clonePrescribeText = this.prescribeText;
    } else if (currentScore < 50) {
      this.prescription = `You have adopted only ${count} property tax reforms. You may refer
       the <a href="#" class="aTag-s">property tax toolkit</a>
       for information on steps towards property tax reforms. Property tax reforms have potential
       to increase revenues and collection, and improve financial sustainability.`;
      //  this.clonePrescribeText = this.prescribeText;
    }
  }
  processLinks(e) {
    console.log("router click", e);
    this.dialog.closeAll();
    const element: HTMLElement = e.target;
    if (element.nodeName === "A") {
      e.preventDefault();
      const link = element.getAttribute("href");
      this.router.navigateByUrl(
        "resources-dashboard/learning-center/toolkits/enumeration"
      );
      // this.router.navigate(["../enumeration"]);
    }
  }
}
