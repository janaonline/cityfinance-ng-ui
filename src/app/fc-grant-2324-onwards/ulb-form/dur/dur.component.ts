import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

const swal: SweetAlert = require("sweetalert");

import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';

import { DurPreviewComponent } from './dur-preview/dur-preview.component';
import { DurService } from './dur.service';

@Component({
  selector: 'app-dur',
  templateUrl: './dur.component.html',
  styleUrls: ['./dur.component.scss']
})
export class DurComponent implements OnInit, OnDestroy {
  @ViewChild('webForm') webForm;

  successErrorMessage: string;
  isLastDeleted = false;

  isLoaded: boolean = false;
  isProjectLoaded: boolean = false;
  finalSubmitMsg: string = `Are you sure you want to submit this form? Once submitted,
  it will become uneditable and will be sent to State for Review.
   Alternatively, you can save as draft for now and submit it later.`

  userData = JSON.parse(localStorage.getItem("userData"));
  
  questionresponse;
  isButtonAvail : boolean = false;
  // nextRouter:string = '';
  // backRouter:string = '';
  formId:number = null;
  nextPreUrl = {
    nextBtnRouter: '',
    backBtnRouter: ''
  }
  sideMenuItem: object | any;
  isFormFinalSubmit : boolean = false;
  canTakeAction:boolean = false;
  leftMenuSubs:any;
  constructor(
    private dialog: MatDialog,
    private durService: DurService,
    private loaderService: GlobalLoaderService,
    private commonServices: CommonServicesService,
    private router: Router
  ) { 
    this.getNextPreUrl();
  }


  ngOnInit(): void {
    // this.isLoaded = true;
    this.leftMenuSubs = this.commonServices.ulbLeftMenuComplete.subscribe((res) => {
      if (res == true) {
        this.getNextPreUrl();
      }
    });
    this.loadData();
  }

  get design_year() {
    const years = JSON.parse(localStorage.getItem("Years"));
    return years?.['2023-24'];
  }

  get ulbId() {
    if(this.userData?.role == 'ULB') return this.userData?.ulb;
    return localStorage.getItem("ulb_id");

  }

  loadData(loadProjects = false) {
    this.loaderService.showLoader();
    this.durService.getForm(this.ulbId, this.design_year).subscribe((res: any) => {
      console.log('loadData::', res);
      this.loaderService.stopLoader();
      console.log(res);
      this.isLoaded = false;
      setInterval(() => this.isLoaded = true);
      this.questionresponse = res;
      this.canTakeAction =  res?.data[0]?.canTakeAction;
      // this.getActionRes();
      this.formDisable(res?.data[0]);
      if(loadProjects) {
        this.getProjects();
      }
    }, ({ error }) => {
      console.log(error.success)
      this.loaderService.stopLoader();
      if (error?.success == true && error?.message) {
        this.successErrorMessage = error?.message;
      } else {
        swal('Error', error?.message ?? 'Something went wrong', 'error');
      }
    })
  }

  loadInParent(type: string) {
    if (type === 'projects') this.getProjects();
  }

  getProjects(shouldOpenPreview = false) {
    this.loaderService.showLoader();
    this.durService.getProjects(
      this.ulbId,
      this.design_year,
      this.questionresponse?.data[0]?.language[0].isDraft
    ).subscribe((res: any) => {

      this.loaderService.stopLoader();
      if (!res?.data) return;
      this.isProjectLoaded = true;
      const projectDetails = this.webForm.questionData.find(question => question.shortKey == "projectDetails_tableView_addButton");
      if (projectDetails) {
        const questionLength = '' + res.data.length;
        projectDetails.value = questionLength;
        projectDetails.modelValue = questionLength;
        projectDetails.selectedValue = [{ value: questionLength, label: questionLength, textValue: '' }];
        projectDetails.childQuestionData = res.data;
      }
      console.log(res);
      if (shouldOpenPreview) {
        this.onPreview();
      }
    }, ({ error }) => {
      this.loaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }

  onPreview() {
    if (!this.isProjectLoaded) return this.getProjects(true);
    const data = this.webForm.questionData;

    const grantPositionWrapper = data?.find(question => question.shortKey == "grantPosition");
    const general = data?.find(question => question.shortKey == "general");
    const waterManagement = data?.find(question => question.shortKey == "waterManagement_tableView");
    const solidWasteManagement = data?.find(question => question.shortKey == "solidWasteManagement_tableView");
    const projectDetails = data?.find(question => question.shortKey == "projectDetails_tableView_addButton");
    const selfDeclaration = data?.find(question => question.shortKey == "selfDec");

    console.log({ tiedGrant: grantPositionWrapper, waterManagement, solidWasteManagement, projectDetails });

    const grantPosition = (grantPositionWrapper.childQuestionData[0] as any[]).reduce((result, child) => {
      result[child.shortKey] = child.value;
      return result;
    }, {});


    const categoryWiseData_wm = (waterManagement.childQuestionData as any[]).map(child => {
      return {
        category_name: child?.[0]?.value,
        grantUtilised: child?.[1]?.value,
        numberOfProjects: child?.[2]?.value,
        totalProjectCost: child?.[3]?.value,
      }
    });

    const categoryWiseData_swm = (solidWasteManagement.childQuestionData as any[]).map(child => {
      return {
        category_name: child?.[0]?.value,
        grantUtilised: child?.[1]?.value,
        numberOfProjects: child?.[2]?.value,
        totalProjectCost: child?.[3]?.value,
      }
    });

    const projects = (projectDetails.childQuestionData as any[]).map(child => {
      const lat = child[4]?.modelValue?.split(',')?.[0];
      const long = child[4]?.modelValue?.split(',')?.[1];
      return {
        name: child?.[0]?.value,
        categoryName: child?.[1]?.selectedValue?.[0]?.label,
        location: {
          lat: parseInt(lat).toFixed(2),
          long: parseInt(long).toFixed(2)
        },
        cost: child[5]?.value,
        expenditure: child[6]?.value
      }
    });

    // console.log({ tiedGrant, child: tiedGrant.childQuestionData, grantPosition, waterManagement, categoryWiseData_wm });

    let previewData = {
      status: "",
      isDraft: true,
      financialYear: "606aaf854dff55e6c075d219",
      designYear: "606aafb14dff55e6c075d3ae",
      grantType: "Tied",
      isProjectLoaded: this.isProjectLoaded,
      grantPosition,
      name: selfDeclaration?.childQuestionData?.[0]?.[0].modelValue,
      designation: selfDeclaration?.childQuestionData?.[0]?.[1]?.modelValue,
      categoryWiseData_wm,
      categoryWiseData_swm,
      projects
    };
    const dialogRef = this.dialog.open(DurPreviewComponent, {
      data: previewData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }

  isFormValid(data) {
    const projectDetails = data?.finalData.find(item => item.shortKey == "projectDetails_tableView_addButton")?.nestedAnswer || [];
    const waterManagement = data?.finalData.find(item => item.shortKey == "waterManagement_tableView")?.nestedAnswer || [];
    const solidWasteManagement = data?.finalData.find(item => item.shortKey == "solidWasteManagement_tableView")?.nestedAnswer || [];
    for (let project of projectDetails) {
      const location = project?.answerNestedData.find(item => item.shortKey == "location");
      const cost = project?.answerNestedData.find(item => item.shortKey == "cost");
      const expenditure = project?.answerNestedData.find(item => item.shortKey == "expenditure");
      if (location.answer[0].value == '0,0') {
        return false
      }
      if (expenditure.answer[0].value && cost.answer[0].value && (+expenditure.answer[0].value > +cost.answer[0].value)) {
        return false;
      }
    }

    for (let item of waterManagement) {
      const grantUtilised = item?.answerNestedData.find(item => item.shortKey == "wm_grantUtilised");
      const totalProjectCost = item?.answerNestedData.find(item => item.shortKey == "wm_totalProjectCost");
      if (grantUtilised.answer[0].value && totalProjectCost.answer[0].value && 
        (+grantUtilised.answer[0].value > +totalProjectCost.answer[0].value)
      ) {
        console.log('invalid', item);
        return false;
      }
    }

    for (let item of solidWasteManagement) {
      const grantUtilised = item?.answerNestedData.find(item => item.shortKey == "sw_grantUtilised");
      const totalProjectCost = item?.answerNestedData.find(item => item.shortKey == "sw_totalProjectCost");
      if (grantUtilised.answer[0].value && totalProjectCost.answer[0].value && 
        (+grantUtilised.answer[0].value > +totalProjectCost.answer[0].value)
      ) {
        return false;
      }
    }
    return true;
  }

  async onSubmit(data) {
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


    const selfDeclarationChecked = data?.finalData
      .find(item => item?.shortKey === "declaration" && item.answer?.[0].value == '1')?.answer?.[0].value;
    console.log('selfDeclaration', data?.finalData.find(item => item.shortKey === "declaration"), selfDeclarationChecked)
    if (isDraft == false) {
      if (selfDeclarationChecked != '1') return swal('Error', 'Please check self declaration', 'error');
      if (!this.isFormValid(data)) return swal('Error', 'Please fill valid values in form', 'error');
    }


    this.loaderService.showLoader();
    this.durService.postForm({
      isDraft: isDraft,
      status: isDraft ? 2 : 3,
      isProjectLoaded: this.isLastDeleted || this.isProjectLoaded,
      financialYear: this.design_year,
      designYear: this.design_year,
      ulb: this.ulbId,
      formId: 4,
      data: data.finalData,
    }).subscribe(res => {
      this.webForm.hasUnsavedChanges = false;
      this.loaderService.stopLoader();
      this.commonServices.setFormStatusUlb.next(true);
      this.isFormFinalSubmit = true;
      if(!isDraft) {
        this.loadData(true);
        
      }
      swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success');
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
  updateInParent(item) {
    Object.entries(item).forEach(([key, value]) => {
      this[key] = value;
      this.isLastDeleted = true;
      console.log(this.isLastDeleted);
    });
  }
  actionFormChangeDetect(res){
    if(res == true){
      this.commonServices.setFormStatusUlb.next(true);
      this.loadData(true);
    }
  }

  getNextPreUrl(){
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((ele) => {
        if (ele?.folderName == "dur") {
          this.nextPreUrl = {nextBtnRouter : ele?.nextUrl, backBtnRouter : ele?.prevUrl}
          this.formId = ele?.formId;
        }
      });
    }
  }
  formDisable(res){
    if(!res) return;
    if(this.userData?.role != 'ULB'){
     // this.isFormDisable = true;
      this.isButtonAvail = false;
      return;
    }else if(this.userData?.role == 'ULB' && res?.language[0]?.isDraft == false && res?.statusId != 5 && res?.statusId != 7){
     // this.isFormDisable = true;
      this.isButtonAvail = false;
      return;
    }else if(this.userData?.role == 'ULB' && (res?.statusId == 5 || res?.statusId == 7)){
    //  this.isFormDisable = false;
      this.isButtonAvail = true;
      return;
    }else if(this.userData?.role == 'ULB' && res?.statusId == 3 && res?.language[0]?.isDraft == false){
     // this.isFormDisable = true;
      this.isButtonAvail = false;
      return;
    }
    else {
     // this.isFormDisable = false;
      this.isButtonAvail = true;
    }
 }
 ngOnDestroy(): void {
  this.leftMenuSubs.unsubscribe();
}
  
}
