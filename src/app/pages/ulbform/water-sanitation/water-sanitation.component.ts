import { Component, OnInit, TemplateRef } from "@angular/core";

import { Router } from "@angular/router";
import { HttpEventType, HttpResponse } from "@angular/common/http";
//import { from, Observable } from 'rxjs';
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
} from "@angular/forms";
import { delay, map, max, retryWhen } from "rxjs/operators";
import { WaterSanitationService } from "./water-sanitation.service";
//import { PathLocationStrategy } from '@angular/common';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { WaterSanitationPreviewComponent } from "./water-sanitation-preview/water-sanitation-preview.component";
import { MatDialog } from "@angular/material/dialog";
import { UlbformService } from "../ulbform.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
import { Subject } from "rxjs";

@Component({
  selector: "app-water-sanitation",
  templateUrl: "./water-sanitation.component.html",
  styleUrls: ["./water-sanitation.component.scss"],
})
export class WaterSanitationComponent implements OnInit {
  modalRef: BsModalRef;
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  errorSet = new Subject<any>();

  isDraft = true;
  MIN_LENGTH = 1;
  MAX_LENGTH = 25;
  MAX_LENGTH_AREA = 200;
  LPCD = 135;
  PERCENTAGE = 100;
  HRS = 24;
  sanitationToolTip;
  waterToolTip;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _router: Router,
    private dataEntryService: DataEntryService,
    private wsService: WaterSanitationService,
    public dialog: MatDialog,
    public _ulbformService: UlbformService
  ) {
    this.errorSet.subscribe((res) => {
      const { keys, value } = res;
      this.compareValues(keys, value);
    });
  }

  waterAndSanitation = {
    water: {
      name: null,
      component: null,
      serviceLevel: {
        indicator: null,
        existing: null,
        after: null,
      },
      cost: null,
    },
    sanitation: {
      name: null,
      component: null,
      serviceLevel: {
        indicator: null,
        existing: null,
        after: null,
      },
      cost: null,
    },
  };

  errors = {
    water: {
      lengthError: {
        text: false,
        textarea: false,
      },
      apiError: false,
      serviceLvlError: {
        before: false,
        after: false,
      },
      check: this.PERCENTAGE,
    },
    sanitation: {
      lengthError: {
        text: false,
        textarea: false,
      },
      apiError: false,
      serviceLvlError: {
        before: false,
        after: false,
      },
      check: this.PERCENTAGE,
    },
  };

  body = {
    isDraft: this.isDraft,
    plans: null,
    designYear: JSON.parse(localStorage.getItem("Years"))["2021-22"],
  };

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

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.wsService.getFiles().subscribe(
      (res) => {
        console.log(res["plans"]);
        this.waterAndSanitation = res["plans"];
        sessionStorage.setItem(
          "plansData",
          JSON.stringify(this.waterAndSanitation)
        );
        this.onLoadDataCheck(this.waterAndSanitation);
        // if (plan) {
        //   this.waterAndSanitation = {
        //     water: {
        //       name: plan.water.name,
        //       component: plan.water.component,
        //       serviceLevel: {
        //         indicator: plan.water.serviceLevel.after,
        //         existing: plan.water.serviceLevel.existing,
        //         after: plan.water.serviceLevel.after,
        //       },
        //       cost: plan.water.cost,
        //     },
        //     sanitation: {
        //       name: plan.sanitation.name,
        //       component: plan.sanitation.component,
        //       serviceLevel: {
        //         indicator: plan.sanitation.serviceLevel.after,
        //         existing: plan.sanitation.serviceLevel.existing,
        //         after: plan.sanitation.serviceLevel.after,
        //       },
        //       cost: plan.sanitation.cost,
        //     },
        //   };
        // }
      },
      (errMes) => {
        console.log(errMes);
      }
    );
  }

  onLoadDataCheck(data) {
    for (const key in data) {
      for (const key1 in data[key]) {
        console.log(key1, data[key][key1]);
        if (key1 === "serviceLevel") {
          for (const key2 in data[key][key1]) {
            console.log(key2, data[key][key1][key2]);
            let value = data[key][key1][key2];
            let keys = [`${key}`, `${key1}`, `${key2}`];
            this.errorSet.next({ value, keys });
          }
        } else {
          let value = data[key][key1];
          if (key1 == "cost") {
            continue;
          }
          let type = key1 == "name" ? "text" : "textarea";
          this.checkValidation(type, value.length, [`${key}`, `${key1}`]);
        }
      }
    }
  }

  onPreview() {
    
    const dialogRef = this.dialog.open(WaterSanitationPreviewComponent, {
      data: this.waterAndSanitation,
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

  proceed() {
    this.modalRef.hide();

    console.log(this.body);

    this.postsDataCall(this.body);
  }

  alertClose() {
    this.modalRef.hide();
  }

  saveForm(template) {
    console.log(this.waterAndSanitation);
    this.body.plans = this.waterAndSanitation;
    if (!this.isDraft) {
      this.postsDataCall(this.body);
    } else {
      this.openModal(template);
    }
  }

  postsDataCall(body) {
    this.wsService.sendRequest(body).subscribe(
      (res) => {
        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.plans.isSubmit = res["isCompleted"];
        this._ulbformService.allStatus.next(status);
        swal({
          title: "Submitted",
          text: "Record submitted successfully!",
          icon: "success",
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onKey(e, path) {
    console.log(e);
    const type = e.target?.type;
    const value = e.target?.value ? e.target.value : e.value;
    let keys = path.split(".");

    if (type) this.checkValidation(type, value.length, keys);
    if (keys.length == 2) {
      this.waterAndSanitation[keys[0]][keys[1]] = value;
    } else {
      if (keys[2] != "indicator") {
        this.waterAndSanitation[keys[0]][keys[1]][keys[2]] = Number(value);
      } else this.waterAndSanitation[keys[0]][keys[1]][keys[2]] = value;
      this.errorSet.next({ value, keys });
    }
  }

  checkValidation(type, length, path) {
    console.log(type, length, path);
    if (type === "text") {
      if (length > this.MAX_LENGTH)
        this.errors[path[0]].lengthError.text = true;
      else this.errors[path[0]].lengthError.text = false;
    }
    if (type === "textarea") {
      if (length > this.MAX_LENGTH_AREA)
        this.errors[path[0]].lengthError.textarea = true;
      else this.errors[path[0]].lengthError.textarea = false;
    }
  }

  compareValues(path, value) {
    if (path[2] == "indicator") {
      switch (value) {
        case "Per Capita Supply of Water":
          this.errors[path[0]].check = this.LPCD;
          break;
        case "Continuity of Water supplied":
          this.errors[path[0]].check = this.HRS;
          break;
        default:
          this.errors[path[0]].check = this.PERCENTAGE;
          break;
      }
    }
    if (this.waterAndSanitation[path[0]].serviceLevel.indicator) {
      let val1 = this.waterAndSanitation[path[0]].serviceLevel.existing;
      let val2 = this.waterAndSanitation[path[0]].serviceLevel.after;
      let type = this.errors[path[0]].check;

      if (val1 > type) {
        this.errors[path[0]].serviceLvlError.before = true;
      }
      if (val2 > type) {
        this.errors[path[0]].serviceLvlError.after = true;
      }
      // else if (val1 && val2) {
      //   if (val1 + val2 > type) {
      //     this.errors[path[0]].serviceLvlError = true;
      //   } else {
      //     this.errors[path[0]].serviceLvlError = false;
      //   }
      // }
    }
    this.sanitationToolTip = `Value at max ${this.errors.sanitation.check}`;
    this.waterToolTip = `Value at max ${this.errors.water.check}`;
  }
}
