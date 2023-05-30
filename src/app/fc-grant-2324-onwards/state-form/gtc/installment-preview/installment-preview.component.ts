import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-installment-preview',
  templateUrl: './installment-preview.component.html',
  styleUrls: ['./installment-preview.component.scss']
})
export class InstallmentPreviewComponent implements OnInit {

  @Input() questionresponse: any;

  formData = {
    totalMpc: '',
    totalNmpc: '',
    totalElectedMpc: '',
    totalElectedNmpc: '',
    year: '',
    installment_type: '',
    accountLinked: '',
    propertyTaxNotif: '',
    projectUndtkn: '',
    recomAvail: '',
    grantDistribute: '',
    receiptDate: '',
    recAmount: '',
    transrantdetail_tableview_addbutton: []
  };

  constructor() { }

  ngOnInit(): void {
    const questions = this.questionresponse.data[0].language[0].question as any[];
    const parentQuestions = questions.filter(question => question.childQuestionData)

    console.log(parentQuestions);
    parentQuestions.forEach(parentQuestion => {
      if (parentQuestion?.shortKey === 'transrantdetail_tableview_addbutton') {
        console.log('special case');
        this.formData.transrantdetail_tableview_addbutton = parentQuestion?.childQuestionData
          ?.map(childQuestion => (childQuestion?.reduce((obj, question) => {
            if (question.input_type == '2' || question.input_type == '14') {
              obj[question.shortKey] = question.modelValue;
            }
            else if (question.input_type == '3' || question.input_type == '5') {
              obj[question.shortKey] = question.selectedValue?.[0].label;
            }
            return obj;
          }, {})));
      }
      parentQuestion.childQuestionData?.forEach(childQuestion => {
        childQuestion.forEach(question => {
          if (this.formData.hasOwnProperty(question.shortKey)) {
            if (question.input_type == '2' || question.input_type == '14') {
              this.formData[question.shortKey] = question.modelValue;
            }
            else if (question.input_type == '3' || question.input_type == '5') {
              this.formData[question.shortKey] = question.selectedValue[0].label;
            }
          }
        });
      })
    })

    console.log(this.formData);
  }

}
