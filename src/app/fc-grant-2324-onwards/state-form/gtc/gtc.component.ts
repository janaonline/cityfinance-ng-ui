import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { WebFormComponent } from 'src/app/mform_webform/web-form/web-form.component';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { GtcPreviewComponent } from './gtc-preview/gtc-preview.component';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { GtcService } from './gtc.service';

const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-gtc',
  templateUrl: './gtc.component.html',
  styleUrls: ['./gtc.component.scss']
})
export class GtcComponent implements OnInit {

  @ViewChildren('webForm') webForms: QueryList<WebFormComponent>;

  successErrorsMessage: string[] = [];

  finalSubmitMsg: string = `Are you sure you want to submit this form? Once submitted,
  it will become uneditable and will be sent to State for Review.
   Alternatively, you can save as draft for now and submit it later.`
  baseForm: any[];
  userData = JSON.parse(localStorage.getItem("userData"));

  constructor(
    private gtcService: GtcService,
    private dialog: MatDialog,
    private loaderService: GlobalLoaderService,
    private dataEntryService: DataEntryService,
    private commonServices: CommonServicesService,
  ) {

    setTimeout(() => {
      console.log('webForms', this.webForms);
    }, 4000)
  }

  get design_year() {
    const years = JSON.parse(localStorage.getItem("Years"));
    return years?.['2023-24'];
  }

  get stateId() {
    if (this.userData?.role == 'STATE') return this.userData?.state;
    return localStorage.getItem("state_id");
  }

  get uploadFolderName() {
    return `${this.userData?.role}/2023-24/gtc/${this.userData?.state}`
  }

  get hasUnsavedChanges() {
    return this.webForms.some(webForm => webForm?.hasUnsavedChanges);
  }

  ngOnInit(): void {
    this.getBaseForm();
  }

  getBaseForm() {
    this.loaderService.showLoader();
    this.gtcService.getBaseForm(this.stateId, this.design_year).subscribe((res: any) => {
      console.log(res);
      this.baseForm = res.data;
      this.loaderService.stopLoader();
      if (res?.success == false && res?.errors.length) {
        this.successErrorsMessage = res?.errors;
      }
    }, ({ error }) => {
      this.loaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }


  uploadFile(event: { target: HTMLInputElement }, fileType: string, question: any, reset: boolean = false, selectorKey: string) {
    console.log({ event, fileType })
    if (reset) {
      question[selectorKey] = {
        name: '',
        url: ''
      };
      return;
    }
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid = this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if (isfileValid == false) {
      swal("Error", "File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
      return;
    }
    const fileExtension = file.name.split('.').pop();

    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    if (fileType === 'excel' && !excelFileExtensions.includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
    if (fileType === 'pdf' && fileExtension !== 'pdf') return swal("Error", "Only PDF File can be Uploaded.", "error");
    this.loaderService.showLoader();
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.uploadFolderName).subscribe(s3Response => {
      const { url, path } = s3Response.data[0];
      this.dataEntryService.newUploadFileToS3(file, url).subscribe(res => {
        if (res.type !== HttpEventType.Response) return;
        question[selectorKey] = {
          name: file.name,
          url: path
        };
        console.log(question);
        this.loaderService.stopLoader();
      });
    }, err => {
      this.loaderService.stopLoader();
      console.log(err)
    });
  }

  onPreview(selectedQuestion?) {
    console.log('selectedQuestion', selectedQuestion);
    if (!selectedQuestion && this?.hasUnsavedChanges) return swal('Unsaved changes!', 'Please save form before preview', 'warning');
    let formdata = this.baseForm;
    const dialogRef = this.dialog.open(GtcPreviewComponent, {
      data: { formdata, selectedQuestion },
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
    const hasZeroError = data.finalData?.find(q => q.shortKey == "transferGrantdetail_tableview_addbutton")?.nestedAnswer
      ?.some(({ answerNestedData }) => {
        const transAmountQuestion = answerNestedData?.find(answer => answer.shortKey == "transAmount");
        const transAmountAnswer = transAmountQuestion?.answer?.[0].value;
        return transAmountAnswer == '0';
      });
    if (hasZeroError) return false;

    return true;
  }

  async onSubmit(data, question) {
    let isDraft = data.isSaveAsDraft;
    const payload = {
      installment: question.installment,
      year: question.year,
      type: question.type,
      isDraft,
      file: question.file,
      status: isDraft ? 2 : 4,
      statusId: isDraft ? 2 : 4, // 2 for save as draft, 4 for final submit
      financialYear: this.design_year,
      design_year: this.design_year,
      state: this.stateId,
      // formId: '4',
      data: data.finalData,
    }

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


    if (isDraft == false) {
      if (!this.isFormValid(data)) return swal('Error', 'Please fill valid values in form', 'error');
      if (!(question?.file?.url && question.file?.name)) return swal('Error', 'Please upload signed copy of file', 'error');
    }

    this.loaderService.showLoader();
    this.gtcService.postForm(payload).subscribe(res => {
      this.webForms.forEach(webForm => webForm.hasUnsavedChanges = false);
      this.loaderService.stopLoader();
      this.commonServices.setFormStatusUlb.next(true);
      this.getBaseForm();
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


  async installmentAction(question) {
    const payload = {
      statusId: question?.statusId,
      design_year: this.design_year,
      state: this.stateId,
      installment: question.installment,
      key: question?.type,
      rejectReason_mohua: question?.rejectReason_mohua,
      responseFile_mohua: question?.responseFile_mohua,
    }

    console.log(payload);

    this.loaderService.showLoader();
    this.gtcService.installmentAction(payload).subscribe(res => {
      this.loaderService.stopLoader();
      this.commonServices.setFormStatusUlb.next(true);
      this.getBaseForm();
      swal('Saved', "Data saved successfully!", 'success');
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
}
