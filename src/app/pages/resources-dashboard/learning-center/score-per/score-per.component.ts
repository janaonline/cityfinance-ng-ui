import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { CommonService } from "src/app/shared/services/common.service";
import { ResourcesServicesService } from "../../resDashboard-services/resources-services.service";
import { MatStepper } from "@angular/material/stepper";
import { MatDialog } from "@angular/material/dialog";
import { CheckScorePerformanceComponent } from "../../check-score-performance/check-score-performance.component";

@Component({
  selector: "app-score-per",
  templateUrl: "./score-per.component.html",
  styleUrls: ["./score-per.component.scss"],
})
export class ScorePerComponent implements OnInit {
  stepperScoreDiv = false;
  reportScoreDiv = false;
  scoreReportData;
  scorePerformanceData;
  ulbList;
  stateList;
  disStartedBtn = true;
  ulb_id = "";
  btnName = "Get Started";
  stateName = "";
  lGreen = {
    enum: false,
    valu: false,
    asse: false,
    bAndC: false,
    repo: false,
  };
  lSelected = {
    enum: false,
    valu: false,
    asse: false,
    bAndC: false,
    repo: false,
  };

  activeValue: boolean = false;
  topThree: boolean = false;

  constructor(
    private resource_das_services: ResourcesServicesService,
    protected _commonService: CommonService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  scorePostBody;
  scorePerformanceForm;
  prescriptionData;
  prescription;

  ngOnInit(): void {
    this.scorePerformanceForm = this.fb.group({
      // ulb: [this.ulb_id, Validators.required],
      enumeration: this.fb.array([]),
      valuation: this.fb.array([]),
      assessment: this.fb.array([]),
      billing_collection: this.fb.array([]),
      reporting: this.fb.array([]),
    });

    this.getData();
    this.getStateList();
  }
  getStateList() {
    this._commonService.fetchStateList().subscribe((res: any) => {
      console.log("res ulb list", res);
      this.stateList = res;
    });
  }

  trClick(data) {
    this.prescriptionData = data?.partcularAnswerValues;
    this.scoreReportData?.top3.forEach((el) => {
      el.isActiveRow = false;
    });
    data.isActiveRow = true;
    console.log("hiiiiii", data);
  }

  changeState(e) {
    console.log("eeeee", e);
    this.btnName = "Get Started";
    this.disStartedBtn = true;
    this.stepperScoreDiv = false;
    this.reportScoreDiv = false;
    this.getUlbList(e);
  }

  getUlbList(stateCode) {
    this._commonService.getUlbByState(stateCode).subscribe((res: any) => {
      console.log("res ulb list", res?.data);
      this.ulbList = res?.data?.ulbs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  }

  getData() {
    this.resource_das_services.getScorePerValue().subscribe(
      (res: any) => {
        console.log("score performace value", res);
        this.scorePerformanceData = res[0];
        console.log("score performace value ------", this.scorePerformanceData);
        // this.deleteRow(0);
        this.addFormArray();
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  get enumRows() {
    return this.scorePerformanceForm.get("enumeration") as FormArray;
  }

  get valuRows() {
    return this.scorePerformanceForm.get("valuation") as FormArray;
  }

  get assesRows() {
    return this.scorePerformanceForm.get("assessment") as FormArray;
  }

  get billingRows() {
    return this.scorePerformanceForm.get("billing_collection") as FormArray;
  }

  get reportingRows() {
    return this.scorePerformanceForm.get("reporting") as FormArray;
  }

  addFormArray() {
    this.scorePerformanceData?.enumeration.forEach((el) => {
      //  console.log('el', el)
      this.addFormControls(el, "enum");
    });
    this.scorePerformanceData?.valuation.forEach((el) => {
      this.addFormControls(el, "valu");
    });
    this.scorePerformanceData?.assessment.forEach((el) => {
      this.addFormControls(el, "assessment");
    });
    this.scorePerformanceData?.billing_collection.forEach((el) => {
      this.addFormControls(el, "billing_collection");
    });
    this.scorePerformanceData?.reporting.forEach((el) => {
      this.addFormControls(el, "reporting");
    });
  }

  addFormControls(el, type) {
    if (type == "enum") {
      this.enumRows.push(
        this.fb.group({
          question: [el?.question?.number],
          answer: ["", Validators.required],
          questionText: [el?.question?.text],
        })
      );
    }
    if (type == "valu") {
      this.valuRows.push(
        this.fb.group({
          question: [el?.question?.number],
          answer: ["", Validators.required],
          questionText: [el?.question?.text],
        })
      );
    }
    if (type == "assessment") {
      this.assesRows.push(
        this.fb.group({
          question: [el?.question?.number],
          answer: ["", Validators.required],
          questionText: [el?.question?.text],
        })
      );
    }
    if (type == "billing_collection") {
      this.billingRows.push(
        this.fb.group({
          question: [el?.question?.number],
          answer: ["", Validators.required],
          questionText: [el?.question?.text],
        })
      );
    }
    if (type == "reporting") {
      this.reportingRows.push(
        this.fb.group({
          question: [el?.question?.number],
          answer: ["", Validators.required],
          questionText: [el?.question?.text],
        })
      );
    }
  }
  changeUlb(e) {
    this.ulb_id = e;
    this.btnName = "Get Started";
    console.log("ulb..", e);
    if (this.ulb_id) this.disStartedBtn = false;
  }
  // getReportCard(){
  //   if(this.ulb_id != '') {
  //     this.resource_das_services.getReportCard(this.ulb_id).subscribe((res: any)=>{
  //      console.log('responce ulb..', res, typeof(res));
  //      this.scoreReportData = res?.data;
  //     },
  //   (error)=> {
  //    console.log('error', error)
  //    })
  //   }
  // }
  closeScoreCard() {
    this.stepperScoreDiv = false;
  }
  presDetails(presItem, index, type) {
    console.log(presItem, type);
    this.prescription = presItem?.prescription;
    if (type == "uperPres") {
      this.scoreReportData?.currentUlb?.partcularAnswerValues.forEach((el) => {
        el.isActive = false;
      });
      
      this.prescribeText =  presItem.selected ? presItem.prescription : this.clonePrescribeText
      presItem.isActive = true;
      // console.log(presItem);
    }
    // if(type == 'top3Table'){
    //   this.scoreReportData?.currentUlb?.partcularAnswerValues.forEach((el)=>{
    //     el.isActive = false;
    //    });
    //    presItem.isActive = true;
    //    console.log(presItem);
    // }
  }

  prescribeText: string= "";
  clonePrescribeText: string = "";

  getPrescriptionText(value) {
    if(value)
    console.log("currentValue", value)
    let obj = ["assessment", "billing_collection", "enumeration", "reporting", "valuation"]

    let count = 0
    for(let item of obj) {
      value?.currentUlb?.scorePerformance[item].forEach((elem) => {
        if(elem.answer){
          count++
        }
      })
    }
    let currentScore = value?.currentUlb?.total * 10
    if(currentScore == 100) {
      this.prescribeText = "You have adopted all the property tax reforms. Your property tax system is robust, which should increase the share of property tax in own revenues."
      this.clonePrescribeText = this.prescribeText
    } else if(currentScore < 99 && currentScore > 50){
      this.prescribeText= `You have adopted ${count} property tax reforms. Your property tax system has scope for further improvement. You see section-wise score and prescription pertaining to areas of improvement, and refer the property tax toolkit (hyperlink) for information on steps towards property tax reforms. Property tax reforms have potential to increase revenues and collection, and improve financial sustainability.`
      this.clonePrescribeText = this.prescribeText
    } else if(currentScore < 49 ){
      this.prescribeText = `You have adopted only ${count} property tax reforms. You see section-wise score and prescription pertaining to areas of improvement, and refer the property tax toolkit (hyperlink) for information on steps towards property tax reforms. Property tax reforms have potential to increase revenues and collection, and improve financial sustainability.`
      this.clonePrescribeText = this.prescribeText
    }
  }
  getStartedScore() {
    if (this.ulb_id != "") {
      this.resource_das_services.getReportCard(this.ulb_id).subscribe(
        (res: any) => {
          console.log("responce ulb..", res, typeof res);
          this.scoreReportData = res?.data;
          this.getPrescriptionText( this.scoreReportData)
          this.scoreReportData?.currentUlb?.partcularAnswerValues.forEach(
            (el) => {
              el.isActive = false;
            }
          );
          this.scoreReportData?.top3.forEach((el) => {
            el.isActiveRow = false;
          });
          this.prescription =
            res?.data?.currentUlb?.partcularAnswerValues[0]?.prescription;
          this.activeValue =
            res?.data?.currentUlb?.partcularAnswerValues[0]?.isActive;
          // res.data.currentUlb.partcularAnswerValues[0].isActive = true;
          this.activeValue = true;
          this.prescriptionData = res?.data?.top3[0]?.partcularAnswerValues;
          this.topThree = this.scoreReportData?.top3[0]?.isActiveRow;
          // this.scoreReportData.top3[0].isActiveRow = true;
          this.topThree = true;
          if (this.btnName != "Try Again") {
            if (this.scoreReportData) {
              this.stepperScoreDiv = false;
              this.reportScoreDiv = true;
              this.btnName = "Try Again";
            } else {
              this.stepperScoreDiv = true;
              this.reportScoreDiv = false;
            }
          } else {
            // this.changeState('null');
            // $("#stateName").val('');
            this.stepperScoreDiv = true;
            this.reportScoreDiv = false;
            this.btnName = "Get Started";
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }
  goBack(stepper: MatStepper, label) {
    switch (label) {
      case "enumeration": {
        this.lGreen.enum = false;
        this.lSelected.enum = true;
        break;
      }
      case "valuation": {
        this.lGreen.enum = false;
        this.lSelected.enum = true;
        //  console.log('valu', this.scorePerformanceForm)
        break;
      }
      case "assessment": {
        this.lGreen.valu = false;
        this.lSelected.valu = true;
        // console.log('asses', this.scorePerformanceForm)
        break;
      }
      case "billing_collection": {
        this.lGreen.asse = false;
        this.lSelected.asse = true;
        //  console.log('bilii', this.scorePerformanceForm)
        break;
      }
      case "reporting": {
        this.lGreen.bAndC = false;
        this.lSelected.bAndC = true;
        //console.log('repo', this.scorePerformanceForm)
        break;
      }
    }
    stepper.previous();
  }

  stepperContinue(stepper: MatStepper, label) {
    console.log("stepper", stepper, label);
    // let lb: string = label;
    switch (label) {
      case "enumeration": {
        this.lGreen.enum = true;
        this.lSelected.enum = false;
        console.log("enum", this.scorePerformanceForm);
        break;
      }
      case "valuation": {
        this.lGreen.valu = true;
        this.lSelected.valu = false;
        //  console.log('valu', this.scorePerformanceForm)
        break;
      }
      case "assessment": {
        this.lGreen.asse = true;
        this.lSelected.asse = false;
        break;
      }
      case "billing_collection": {
        //  console.log('bilii', this.scorePerformanceForm)
        this.lGreen.bAndC = true;
        this.lSelected.bAndC = false;
        break;
      }
      case "reporting": {
        this.lGreen.repo = true;
        this.lSelected.repo = false;
        //console.log('repo', this.scorePerformanceForm)
        break;
      }
    }
    stepper.next();
  }
  SubmitScoreReport() {
    this.scorePostBody = {
      ulb: this.ulb_id,
      scorePerformance: this.scorePerformanceForm.value,
    };

    console.log(
      "submit",
      this.scorePerformanceForm,
      this.scorePerformanceForm.value
    );
    this.resource_das_services.postScoreReport(this.scorePostBody).subscribe(
      (res: any) => {
        console.log("post", res);
        this.getStartedScore();
      },
      (error) => {
        console.log("post error", error);
      }
    );
  }

  checkPerOtherCity() {
    const dialogRef = this.dialog.open(CheckScorePerformanceComponent, {
      // width: '80%',
      maxWidth: "95vw",
      maxHeight: "95vh",
      panelClass: "no-padding-dialog",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
