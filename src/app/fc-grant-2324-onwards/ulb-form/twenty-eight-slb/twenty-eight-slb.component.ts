import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const swal: SweetAlert = require("sweetalert");

import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { TwentyEightSlbPreviewComponent } from './twenty-eight-slb-preview/twenty-eight-slb-preview.component';

// import { DurPreviewComponent } from './dur-preview/dur-preview.component';
import { TwentyEightSlbService } from './twenty-eight-slb.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-twenty-eight-slb',
  templateUrl: './twenty-eight-slb.component.html',
  styleUrls: ['./twenty-eight-slb.component.scss']
})
export class TwentyEightSlbComponent implements OnInit, OnDestroy {
  @ViewChild('webForm') webForm;

  finalSubmitMsg: string = `Are you sure you want to submit this form? Once submitted,
  it will become uneditable and will be sent to State for Review.
   Alternatively, you can save as draft for now and submit it later.`;
  isLoaded: boolean = false;
  isProjectLoaded: boolean = false;
  successErrorMessage: string;
  formId = '6';
  status: string;

  userData = JSON.parse(localStorage.getItem("userData"));

  questionresponse;
  slbFormURL:string = ''
  constructor(
    private dialog: MatDialog,
    private twentyEightSlbService: TwentyEightSlbService,
    private loaderService: GlobalLoaderService,
    private commonServices: CommonServicesService,
    private router: Router
  ) { }
  isButtonAvail: boolean = false;
  nextPreUrl = {
    nextBtnRouter: '',
    backBtnRouter: ''
  }
  sideMenuItem: object | any;
  isFormFinalSubmit: boolean = false;
  canTakeAction: boolean = false;
  leftMenuSubs: any;
  ngOnInit(): void {
    // this.isLoaded = true;
    this.leftMenuSubs = this.commonServices.ulbLeftMenuComplete.subscribe((res) => {
      if (res == true) {
        this.getNextPreUrl();
      }
    });
    this.loadData();
    this.slbFormURL = `/ulbform/overview/${this.ulbId}`;
    sessionStorage.setItem("ulb_id", this.ulbId);
  }

  get years() {
    return JSON.parse(localStorage.getItem("Years"));
  }

  get design_year() {
    return this.years?.['2023-24'];
  }

  get ulbId() {
    if (this.userData?.role == 'ULB') return this.userData?.ulb;
    return localStorage.getItem("ulb_id");
  }

  get hasUnsavedChanges() {
    return this.webForm?.hasUnsavedChanges;
  }



  onSubmitQuestion(data) {
    console.log(data)
  }

  loadData() {
    this.loaderService.showLoader();
    this.twentyEightSlbService.getForm(this.ulbId, this.design_year, this.formId).subscribe((res: any) => {
      console.log('loadData::', res);
      this.loaderService.stopLoader();
      if (res?.success == false && res?.message) {
        this.successErrorMessage = res?.message;
        return;
      }

      this.isLoaded = false;
      setInterval(() => this.isLoaded = true);
      console.log(res);
      this.questionresponse = res;
      this.canTakeAction = res?.data[0]?.canTakeAction;
      this.formDisable(res?.data[0]);
      this.status = res?.data[0].status;
    }, ({ error }) => {
      this.loaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }



  onPreview() {
    const data = this.webForm.questionData;
    console.log(data);
    let slbPreData = {
      perData: {
        data: data.reduce((obj, item) => ({
          ...obj,
          [item?.title]: item?.childQuestionData?.map(questionsData => ({
            question: questionsData.find(question => question.shortKey?.endsWith("_question"))?.modelValue,
            actual: {
              value: questionsData.find(question => question.shortKey?.endsWith("_actualIndicator"))?.modelValue
            },
            target_1: {
              value: questionsData.find(question => question.shortKey?.endsWith("_targetIndicator"))?.modelValue
            },
            unit: questionsData.find(question => question.shortKey?.endsWith("_unit"))?.modelValue
          }))
        }), {}),
      },
      ulbId: this.ulbId,
      status: this.status
      // saveDataJson: this.slbData
    };
    const dialogRef = this.dialog.open(TwentyEightSlbPreviewComponent, {
      data: slbPreData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  addDisableKeys = data => data?.finalData?.map((question, questionIndex) => ({
    ...question,
    nestedAnswer: question?.nestedAnswer?.map((innerNestedAnswer, innerNestedAnswerIndex) => ({
      ...innerNestedAnswer,
      answerNestedData: [
        ...innerNestedAnswer?.answerNestedData,
        ...['actual', 'target'].map((key) => ({
          input_type: "1",
          shortKey: `${key}Disable`,
          "answer": [
            {
              "label": "",
              "textValue": data?.question?.[questionIndex]?.childQuestionData[innerNestedAnswerIndex].find(item => item.shortKey.endsWith(`_${key}Indicator`))?.isQuestionDisabled,
              "value": ""
            }
          ],
        }),
        ),
        {
          input_type: "1",
          shortKey: `range`,
          "answer": [
            {
              "label": "",
              "textValue": data?.question?.[questionIndex]?.childQuestionData[innerNestedAnswerIndex]
                .find(item => item.shortKey.endsWith(`_actualIndicator`))?.hint,
              "value": ""
            }
          ],
        }
      ]
    }))
  }));

  isFormValid(quetions) {
    console.log('finalData', quetions);
    for (let question of quetions) {
      for (let childQuestionsData of question?.childQuestionData) {
        const actual = childQuestionsData.find(col => col.shortKey.endsWith('_actualIndicator'));
        const target = childQuestionsData.find(col => col.shortKey.endsWith('_targetIndicator'));
        const lineItem = childQuestionsData.find(col => col.shortKey.endsWith('_indicatorLineItem'));

        const actualValue = +actual.modelValue;
        const targetValue = +target.modelValue;
        const lineItemValue = lineItem.modelValue;

        if (actualValue < +actual?.minRange) {
          return false;
        }
        if (targetValue < +target?.minRange) {
          return false;
        }
      }
    }
    return true;
  }

  async onSubmit(data) {
    console.log('submit', data);

    let isDraft = data.isSaveAsDraft;
    if (isDraft == false) {
      const userAction = await swal(
        "Confirmation !",
        `${this.finalSubmitMsg}`,
        "warning",
        {
          buttons: {
            Submit: {
              text: "Submit",
              value: "submit",
            },
            Draft: {
              text: "Save as Draft",
              value: "draft",
            },
            Cancel: {
              text: "Cancel",
              value: "cancel",
            },
          },
        }
      );
      if (userAction == 'draft') {
        isDraft = true;
      }
      if (userAction == 'cancel') return;
    }
    const finalData = this.addDisableKeys(data);

    if (!isDraft && !this.isFormValid(data?.question)) {
      return swal('Error', 'Please fill valid values in form', 'error');
    }

    this.loaderService.showLoader();
    this.twentyEightSlbService.postForm({
      isDraft: isDraft,
      financialYear: this.design_year,
      design_year: this.design_year,
      status: isDraft ? 2 : 3,
      actualYear: this.years["2022-23"],
      targetYear: this.years["2023-24"],
      ulb: this.ulbId,
      formId: this.formId,
      data: finalData,
    }).subscribe(res => {
      this.webForm.hasUnsavedChanges = false;
      this.loaderService.stopLoader();
      this.commonServices.setFormStatusUlb.next(true);
      this.loadData();
      this.isFormFinalSubmit = true;
      swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success')
      // .then(() => {
      //   if (!isDraft) location.reload();
      // });
      console.log('data send');
    }, ({ error }) => {
      this.loaderService.stopLoader();
      if (Array.isArray(error?.message)) {
        error.message = error.message.join('\n\n');
      }
      swal('Error', error?.message ?? 'Something went wrong', 'error');
      console.log('error occured');
    })
  }

  nextPreBtn(e) {
    let url = e?.type == 'pre' ? this.nextPreUrl?.backBtnRouter : this.nextPreUrl?.nextBtnRouter
    this.router.navigate([`/ulb-form/${url.split('/')[1]}`]);
  }
  actionFormChangeDetect(res) {
    if (res == true) {
      this.commonServices.setFormStatusUlb.next(true);
      this.loadData();
    }
  }

  getNextPreUrl() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((ele) => {
        if (ele?.folderName == '28slb') {
          this.nextPreUrl = { nextBtnRouter: ele?.nextUrl, backBtnRouter: ele?.prevUrl }
          this.formId = ele?.formId;
        }
      });
    }
  }
  formDisable(res) {
    if(!res) return;
    this.isButtonAvail = this.commonServices.formDisable(res, this.userData);
    //console.log(this.isButtonAvail, 'this.isButtonAvail');
   
  }
  ngOnDestroy() {
    this.leftMenuSubs.unsubscribe();
  }
}