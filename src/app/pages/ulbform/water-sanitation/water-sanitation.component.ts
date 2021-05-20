import { Component, OnInit, TemplateRef } from "@angular/core";

import { Router } from "@angular/router";
import { HttpEventType, HttpResponse } from "@angular/common/http";
//import { from, Observable } from 'rxjs';
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { delay, map, retryWhen } from "rxjs/operators";
import { WaterSanitationService } from "./water-sanitation.service";
//import { PathLocationStrategy } from '@angular/common';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { WaterSanitationPreviewComponent } from "./water-sanitation-preview/water-sanitation-preview.component";
import { MatDialog } from "@angular/material/dialog";
import { UlbformService } from "../ulbform.service";

@Component({
  selector: "app-water-sanitation",
  templateUrl: "./water-sanitation.component.html",
  styleUrls: ["./water-sanitation.component.scss"],
})
export class WaterSanitationComponent implements OnInit {
  modalRef: BsModalRef;
  waterAndSanitation: FormGroup;

  err = "";
  submitted = false;
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _router: Router,
    private dataEntryService: DataEntryService,
    private wsService: WaterSanitationService,
    public dialog: MatDialog,
    public _ulbformService: UlbformService
  ) {
    this.initializeForms()
  }

  ngOnInit(): void {
    this.wsService.getFiles().subscribe(
      (res) => {},
      (errMes) => {
        // alert(errMes)
        //     this.err = error.message;
        console.log(errMes);
      }
    );
  }

  sanitationIndicators = [
    "Coverage of Toilets",
    "Coverage of Sewerage Network",
    "Collection efficiency of Sewerage Network",
    "Adequacy of Sewage Treatment Capacity",
    "Quality of Sewage Treatment",
    "Extent of Reuse and Recycling of Sewage",
    "Extent of cost recovery in waste water management",
    "Efficiency in redressal of customer complaints",
    "Efficiency in Collection of Sewage Water Charges",
  ];

  waterIndicators = [
    "Coverage of Water Supply connections",
    "Per Capita Supply of Water",
    "Extent of Non-revenue WaterSanitationComponent",
    "Extent of Metering",
    "Continuity of Water supplied",
    "Efficiency in redressal of customer complaints",
    "Quality of Water Supplied",
    "Cost Recovery",
    "Efficiency in Collection of Water Charges",
  ];

  onSubmit() {}
  onPreview() {
    let preData = {
      // 'waterFileName': this.fileNameWater,
      // 'waterFileUrl': this.waterFileUrl,
      // 'sanitationFileName': this.fileNameSanitation,
      // 'sanitationFileUrl' : this.sanitationFileUrl
    };
    console.log("preData", preData);
    const dialogRef = this.dialog.open(WaterSanitationPreviewComponent, {
      data: preData,
      maxHeight: "95vh",
      height: "fit-content",
      width: "85vw",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-md" });
  }

  stay() {
    this.modalRef.hide();
  }

  proceed(uploadedFiles) {
    this.postsDataCall(uploadedFiles);
    this.modalRef.hide();
    // return this._router.navigate(["overview"]);
  }
  alertClose() {
    this.modalRef.hide();
  }
  saveForm(template) {
    this.submitted = true;
    // this.uploadedFiles = {
    //   designYear:"606aaf854dff55e6c075d219",
    //   plans:
    //    {
    //      water:
    //       {
    //           // url: this.waterFileUrl,
    //           //  remarks: this.fileNameWater
    //        },
    //   sanitation:
    //     {
    //       //  url: this.sanitationFileUrl,
    //       //  remarks: this.fileNameSanitation
    //     }
    //   },
    //   'isDraft': false
    // };
    // if(this.waterFileUrl != '' && this.sanitationFileUrl != ''){
    // this.postsDataCall(this.uploadedFiles);
    // }
    // else{
    this.openModal(template);
    // }
  }
  postsDataCall(uploadedFiles) {
    // this.wsService.sendRequest(this.uploadedFiles)
    //     .subscribe((res) => {
    //     const status = JSON.parse(sessionStorage.getItem("allStatus"));
    //     status.plans.isSubmit = res["isCompleted"];
    //     this._ulbformService.allStatus.next(status);
    //       console.log(res);
    //       alert('Files uploaded successfully.')
    //    },
    //    error =>{
    //       alert("An error occured.")
    //       this.err = error.message;
    //       console.log(this.err);
    //    });
  }

  private initializeForms() {
    this.waterAndSanitation = this.fb.group({
     water:{
      name: ["",[Validators.maxLength(25),Validators.maxLength(1)]],
      component: ["",[Validators.maxLength(200),Validators.maxLength(1)]],
      serviceLevel: {
        indicator: [""],
        existing: [""],
        after: [""],
      },
      cost: [""],
     },
     sanitation:{
      name: ["",[Validators.maxLength(25),Validators.maxLength(1)]],
      component: ["",[Validators.maxLength(200),Validators.maxLength(1)]],
      serviceLevel: {
        indicator: [""],
        existing: [""],
        after: [""],
      },
      cost: [""],
     }
    });
  }
}