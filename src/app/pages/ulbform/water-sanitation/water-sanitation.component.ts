import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router, NavigationStart, Event } from "@angular/router";
import { WaterSanitationService } from "./water-sanitation.service";
import { WaterSanitationPreviewComponent } from "./water-sanitation-preview/water-sanitation-preview.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
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
  dialogRefForNavigation;
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  errorSet = new Subject<any>();

  isDraft = false;
  MIN_LENGTH = 1;
  MAX_LENGTH = 25;
  MAX_LENGTH_AREA = 200;
  LPCD = 135;
  PERCENTAGE = 100;
  HRS = 24;
  sanitationToolTip;
  waterToolTip;

  constructor(
    private _router: Router,
    private wsService: WaterSanitationService,
    public dialog: MatDialog,
    public _ulbformService: UlbformService
  ) {
    this.errorSet.subscribe((res) => {
      const { keys, value } = res;
      this.compareValues(keys, value);
    });

    this._router.events.subscribe(async (event: Event) => {
      if (!this.saveClicked) {
        if (event instanceof NavigationStart) {
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInPlans", "false");
            return;
          }
          const change = sessionStorage.getItem("changeInPlans");
          if (change === "true" && this.routerNavigate === null) {
            this.routerNavigate = event;
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.openModal(this.template);
          }
        }
      }
    });
  }

  @ViewChild("template") template;
  @ViewChild("template1") template1;
  routerNavigate = null;
  saveClicked = false;

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
      check: null,
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
      check: null,
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
        this.diffCheck();
        this.onLoadDataCheck(this.waterAndSanitation);
      },
      (errMes) => {
        console.log(errMes);
        sessionStorage.setItem(
          "plansData",
          JSON.stringify(this.waterAndSanitation)
        );
        this.diffCheck();
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
          this.checkValidation(type, value?.length, [`${key}`, `${key1}`]);
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
    // this.dialogRefForNavigation = this.modalService.show(template, { class: "modal-md" });
    const dialogConfig = new MatDialogConfig();
    this.dialogRefForNavigation = this.dialog.open(template, dialogConfig);
    this.dialogRefForNavigation.afterClosed().subscribe((result) => {
      if(result === undefined){
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }

  stay() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  proceed() {
    this.dialogRefForNavigation.close(true);
    this.saveForm();
  }

  alertClose() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  saveForm(template = null) {
    this.body.plans = this.waterAndSanitation;
    this.testForDraft();
    if (!this.body.isDraft || template === null) {
      this.postsDataCall(this.body);
    } else {
      this.openModal(template);
    }
  }

  postsDataCall(body) {
    return new Promise ((resolve,reject)=>{
      this.wsService.sendRequest(body).subscribe(
        async (res) => {
          const status = JSON.parse(sessionStorage.getItem("allStatus"));
          status.plans.isSubmit = res["isCompleted"];
          this._ulbformService.allStatus.next(status);
          swal({
            title: "Submitted",
            text: "Record submitted successfully!",
            icon: "success",
          });
          if (this.routerNavigate) {
            this._router.navigate([this.routerNavigate.url]);
          }
          resolve("success")
        },
        (error) => {
          resolve(error)
          console.log(error);
        }
      );
    })
  }

  onKey(e, path) {
    console.log(e);
    const type = e.target?.type;
    const value = e.target?.value ? e.target.value : e.value;
    let keys = path.split(".");

    if (type) this.checkValidation(type, value?.length, keys);
    if (keys.length == 2) {
      this.waterAndSanitation[keys[0]][keys[1]] = value;
    } else {
      if (keys[2] != "indicator") {
        this.waterAndSanitation[keys[0]][keys[1]][keys[2]] = Number(value);
      } else this.waterAndSanitation[keys[0]][keys[1]][keys[2]] = value;
      this.errorSet.next({ value, keys });
    }

    this.diffCheck();
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
      } else {
        this.errors[path[0]].serviceLvlError.before = false;
      }
      if (val2 > type) {
        this.errors[path[0]].serviceLvlError.after = true;
      } else {
        this.errors[path[0]].serviceLvlError.after = false;
      }
    }
    this.sanitationToolTip = `Value at max ${this.errors.sanitation.check}`;
    this.waterToolTip = `Value at max ${this.errors.water.check}`;
  }

  diffCheck() {
    if (
      JSON.stringify(this.waterAndSanitation) !=
      sessionStorage.getItem("plansData")
    ) {
      sessionStorage.setItem("changeInPlans", "true");
    } else {
      sessionStorage.setItem("changeInPlans", "false");
    }
  }

  testForDraft() {
    const data = this.waterAndSanitation;
    for (const key in data) {
      for (const key1 in data[key]) {
        if (key1 === "serviceLevel") {
          for (const key2 in data[key][key1]) {
            if (
              data[key][key1][key2] === undefined ||
              data[key][key1][key2] === null
            ) {
              this.body.isDraft = true;
              return;
            }
          }
        } else {
          if (data[key][key1] === undefined || data[key][key1] === null) {
            this.body.isDraft = true;
            return;
          }
        }
      }
    }

    const error = this.errors;
    for (const key in error) {
      if (error.hasOwnProperty(key)) {
        for (const key1 in error[key]) {
          if (key1 == "check") {
            continue;
          }
          if (error[key].hasOwnProperty(key1)) {
            for (const key2 in error[key][key1]) {
              if (error[key][key1][key2] != false) {
                this.body.isDraft = true;
                return;
              }
            }
          } else if (error[key][key1] != false) {
            this.body.isDraft = true;
            return;
          }
        }
      }
    }
  }
}
