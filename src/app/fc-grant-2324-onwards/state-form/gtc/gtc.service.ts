import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const baseForm = [
  {
    label: "1. GTCs for Non-Million Plus Cities Tied Grants",
    isDisabled: false,
    error: false,
    icon: "",
    questions: [
      {
        installment: 1,
        year: 'this.years["2021-22"]',
        type: "nonmillion_tied",
        instlText: "1st Installment (2023-24)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: false,
        disableMsg: "",
        key: "nonmillion_tied_2021-22_2",
        question: "(A) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
        qusType: "",
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        canTakeAction: false
      },
      {
        installment: 2,
        year: 'this.years["2022-23"]',
        type: "nonmillion_tied",
        instlText: "2nd Installment (2023-24)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: true,
        disableMsg: `1st Installment (2023-24) GTC has to be uploaded first before uploading 2nd Installment (2023-24) GTC`,
        question: "(B) Upload Signed Grant Transfer Certificate - 2nd Installment (2023-24)",
        key: "nonmillion_tied_2022-23_1",
        qusType: "",
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        canTakeAction: false
      }
    ],
  },
  {
    label: "2. GTCs for Non-Million Plus Cities Untied Grants",
    isDisabled: false,
    error: false,
    icon: "",
    questions: [
      {
        installment: 1,
        year: 'this.years["2023-24"]',
        type: "nonmillion_untied",
        instlText: "1st Installment (2023-24)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: false,
        disableMsg: "",
        question: "(A) Upload Signed Grant Transfer Certificate - 1st Installment (2023-24)",
        key: "nonmillion_untied_2021-22_2",
        qusType: "",
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        canTakeAction: false
      },
      {
        installment: 2,
        year: 'this.years["2022-23"]',
        type: "nonmillion_untied",
        instlText: "2nd Installment (2023-24)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: true,
        disableMsg: `1st Installment (2023-24) GTC has to be uploaded first before uploading 2nd Installment (2023-24) GTC`,
        question: "(B) Upload Signed Grant Transfer Certificate - 2nd Installment (2023-24)",
        key: "nonmillion_untied_2022-23_1",
        qusType: "",
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false
      }
    ],
  },
  {
    label: "3. GTC for Million Plus Cities Tied Grants for Water Supply and SWM",
    isDisabled: false,
    error: false,
    icon: "",
    questions: [
      {
        installment: 1,
        year: 'this.years["2021-22"]',
        type: "million_tied",
        instlText: "FY 2023-24",
        isDisableQues: false,
        quesText:
          "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
        question:
          "(A) Upload Signed Grant Transfer Certificate for Water Supply and SWM - FY ( 2021-22)",
        key: "million_tied_2021-22_1",
        qusType: "",
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        canTakeAction: false
      }
    ],
  },
];

@Injectable({
  providedIn: 'root'
})
export class GtcService {

  constructor(
    private http: HttpClient
  ) { }

  getBaseForm() {
    return this.http.get(`${environment.api.url}/grant-transfer-certificate?state=5dcf9d7316a06aed41c748e8&design_year=606aafb14dff55e6c075d3ae`)
    .pipe(
      map((response: any) => {
        return baseForm;
      })
    );
  }
}
