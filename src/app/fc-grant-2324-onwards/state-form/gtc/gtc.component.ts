import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlert } from 'sweetalert/typings/core';
import { GtcPreviewComponent } from './gtc-preview/gtc-preview.component';
import { GtcService } from './gtc.service';

const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-gtc',
  templateUrl: './gtc.component.html',
  styleUrls: ['./gtc.component.scss']
})
export class GtcComponent implements OnInit {

  finalSubmitMsg: string = `Are you sure you want to submit this form? Once submitted,
  it will become uneditable and will be sent to State for Review.
   Alternatively, you can save as draft for now and submit it later.`
  baseForm: any[];
  userData = JSON.parse(localStorage.getItem("userData"));

  constructor(
    private gtcService: GtcService,
    private dialog: MatDialog,
  ) { }

  get design_year() {
    const years = JSON.parse(localStorage.getItem("Years"));
    return years?.['2023-24'];
  }

  get stateId() {
    if (this.userData?.role == 'STATE') return this.userData?.state;
    return localStorage.getItem("state");

  }

  ngOnInit(): void {
    this.getBaseForm();
  }

  getBaseForm() {
    this.gtcService.getBaseForm(this.stateId, this.design_year).subscribe((res: any) => {
      console.log(res);
      this.baseForm = res.data;
    })
  }

  onPreview() {
    console.log(this.baseForm);
    let formdata = this.baseForm;
    const dialogRef = this.dialog.open(GtcPreviewComponent, {
      data: formdata,
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
    return true;
  }

  async onSubmit(data, question) {
    const payload = {
      installment: question.installment,
      year: question.year,
      type: question.type,
      isDraft: true,
      status: 2,
      financialYear: this.design_year,
      designYear: this.design_year,
      state: this.stateId,
      formId: '4',
      data: data.finalData,
    }

    let isDraft = false;
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
    }

    this.gtcService.postForm(payload).subscribe(res => {
      // this.webForm.hasUnsavedChanges = false;
      // this.loaderService.stopLoader();
      // this.commonServices.setFormStatusUlb.next(true);
      // this.isFormFinalSubmit = true;
      // if (!isDraft) {
      //   this.getBaseForm();
      // }
      // swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success');
      console.log('data send');
    }, ({ error }) => {
      // this.loaderService.stopLoader();
      if (Array.isArray(error?.message)) {
        error.message = error.message.join('\n\n');
      }
      swal('Error', error?.message ?? 'Something went wrong', 'error');
      console.log('error occured');
    })

  }


}
