import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GtcPreviewComponent } from './gtc-preview/gtc-preview.component';
import { GtcService } from './gtc.service';

@Component({
  selector: 'app-gtc',
  templateUrl: './gtc.component.html',
  styleUrls: ['./gtc.component.scss']
})
export class GtcComponent implements OnInit {

  baseForm: any[];

  constructor(
    private gtcService: GtcService,
    private dialog: MatDialog,
  ) { }

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
      status:  2,
      financialYear: 'this.design_year',
      designYear: 'this.design_year',
      state: 'this.ulbId',
      formId: '4',
      data: data.finalData,
    }

    console.log(payload);



  }

}
