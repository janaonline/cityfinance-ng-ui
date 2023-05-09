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
    if(this.userData?.role == 'STATE') return this.userData?.state;
    return localStorage.getItem("state");

  }

  ngOnInit(): void {
    this.getBaseForm();
  }

  getBaseForm() {
    this.gtcService.getBaseForm().subscribe((res: any) => {
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

  onSubmit(data, question) {
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

    console.log(payload);

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
