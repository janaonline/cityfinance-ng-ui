import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const swal: SweetAlert = require("sweetalert");

import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { TwentyEightSlbPreviewComponent } from './twenty-eight-slb-preview/twenty-eight-slb-preview.component';

// import { DurPreviewComponent } from './dur-preview/dur-preview.component';
import { TwentyEightSlbService } from './twenty-eight-slb.service';
import { ActivatedRoute, Router } from '@angular/router';



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
  selectedYearId:string = "";
  selectedYear:string="";
  fileFolderName:string="";
  actualYear:string ="";
  actualYearValue: string ="";
  constructor(
    private dialog: MatDialog,
    private twentyEightSlbService: TwentyEightSlbService,
    private loaderService: GlobalLoaderService,
    private commonServices: CommonServicesService,
    private router: Router,
    private route: ActivatedRoute
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
    this.getQueryParams();
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

  // get design_year() {
  //   //return this.years?.['2023-24'];
  //   const yearId = this.route.parent.snapshot.paramMap.get('yearId');
  //   return yearId ? yearId : sessionStorage.getItem("selectedYearId")
     
  // }

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
    this.twentyEightSlbService.getForm(this.ulbId, this.selectedYearId, this.formId).subscribe((res: any) => {
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

 // preview method: prepare the data for preview and download, and also set popup property;
  onPreview() {
    const data = this.webForm.questionData;
    console.log("data", data);
    let withoutChildQuestionObj= {};
    const filteredArrayWithNoChild = data.filter((elem) => elem.childQuestionData);
    data.forEach((elem)=>{
      switch(elem?.shortKey){
        case "declaration" :
          withoutChildQuestionObj["declaration"] = elem?.selectedValue[0]?.textValue;
          break;
        case "officerName" :
          withoutChildQuestionObj["officerName"] = elem?.value;
          break;
        case "designation" :
          withoutChildQuestionObj["designation"] = elem?.value;   
          break;
        case "cert_declaration" :
          withoutChildQuestionObj["cert_declaration"] = {};
          withoutChildQuestionObj["cert_declaration"]["name"] = elem?.selectedValue[0]?.label; 
          withoutChildQuestionObj["cert_declaration"]["url"] = elem?.selectedValue[0]?.value; 
          break;
         default:  
          break;
      }
    });
    let slbPreData = {
      perData: {
        data: filteredArrayWithNoChild.reduce((obj, item) => ({
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
      status: this.status,
      selectedYear: this.selectedYear,
      actualYear: this.actualYearValue,
     ...withoutChildQuestionObj
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
      for (let childQuestionsData of question?.childQuestionData ?? [])  {
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
      if(this.selectedYear != "2023-24"){
      const selfDeclarationChecked = data?.finalData.find(item => item?.shortKey === "declaration" && item.answer?.[0].value == '1')?.answer?.[0].value;
      if (selfDeclarationChecked != '1') return swal('Error', 'Please check self declaration', 'error');
      }
      
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
      financialYear: this.actualYear,
      design_year: this.selectedYearId,
      status: isDraft ? 2 : 3,
      actualYear: this.actualYear,
      targetYear: this.selectedYearId,
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
    this.router.navigate([`/ulb-form/${this.selectedYearId}/${url.split('/')[1]}`]);
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
  
  // get financial year id from route and get target and actual year based on select design year
  getQueryParams() {
    const yearId = this.route.parent.snapshot.paramMap.get('yearId'); // get the 'id' query parameter
    this.selectedYearId = yearId ? yearId : sessionStorage.getItem("selectedYearId");
    this.selectedYear = this.commonServices.getYearName(this.selectedYearId);
    const [startYear, endYear] = this.selectedYear.split("-").map(Number);
    this.actualYear = this.years[`${startYear - 1}-${endYear - 1}`];
    this.actualYearValue = `${startYear - 1}-${endYear - 1}`
    this.fileFolderName = `${this.userData?.role}/${this.selectedYear}/28slb/${this.userData?.ulbCode}`;
 }
 
  
}
