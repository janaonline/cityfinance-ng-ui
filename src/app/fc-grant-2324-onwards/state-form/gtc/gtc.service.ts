import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const baseForm = [
  {
    label: "1. View/Upload GTCs for Non-Million Plus Cities Tied Grants",
    isDisabled: false,
    error: false,
    icon: "",
    quesArray: [
      {
        installment: 2,
        year: 'this.years["2021-22"]',
        type: "nonmillion_tied",
        instlText: "2nd Installment (2021-22)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: false,
        disableMsg: "",
        key: "nonmillion_tied_2021-22_2",
        question:
          "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        rejectReason_mohua: null,
        canTakeAction: false
      },
      {
        installment: 1,
        year: 'this.years["2022-23"]',
        type: "nonmillion_tied",
        instlText: "1st Installment (2022-23)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: true,
        disableMsg: `2nd Installment (2021-22) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
        question:
          "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
        key: "nonmillion_tied_2022-23_1",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false

      },
      {
        installment: 2,
        year: 'this.years["2022-23"]',
        type: "nonmillion_tied",
        instlText: "2nd Installment (2022-23)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: true,
        disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2022-23) GTC`,
        question:
          "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
        key: "nonmillion_tied_2022-23_2",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false
      },
    ],
  },
  {
    label: "2. View/Upload GTCs for Non-Million Plus Cities Untied Grants",
    isDisabled: false,
    error: false,
    icon: "",
    quesArray: [
      {
        installment: 2,
        year: 'this.years["2021-22"]',
        type: "nonmillion_untied",
        instlText: "2nd Installment (2021-22)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: false,
        disableMsg: "",
        question:
          "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
        key: "nonmillion_untied_2021-22_2",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false
      },
      {
        installment: 1,
        year: 'this.years["2022-23"]',
        type: "nonmillion_untied",
        instlText: "1st Installment (2022-23)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: true,
        disableMsg: `2nd Installment (2021-22) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
        question:
          "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
        key: "nonmillion_untied_2022-23_1",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false
      },
      {
        installment: 2,
        year: 'this.years["2022-23"]',
        type: "nonmillion_untied",
        instlText: "2nd Installment (2022-23)",
        quesText: "Upload Signed Grant Transfer Certificate",
        isDisableQues: true,
        disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2022-23) GTC`,
        question:
          "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
        key: "nonmillion_untied_2022-23_2",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false
      },
    ],
  },
  {
    label: "3. View/Upload GTCs for Million Plus Cities Tied Grants",
    isDisabled: false,
    error: false,
    icon: "",
    quesArray: [
      {
        installment: 1,
        year: 'this.years["2021-22"]',
        type: "million_tied",
        instlText: "FY (2021-22)",
        isDisableQues: false,
        quesText:
          "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
        question:
          "(A) Upload Signed Grant Transfer Certificate for Water Supply and SWM - FY ( 2021-22)",
        key: "million_tied_2021-22_1",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false
      },
      {
        installment: 1,
        year: 'this.years["2022-23"]',
        type: "million_tied",
        instlText: "FY (2022-23)",
        isDisableQues: true,
        disableMsg: `2021-22 GTC has to be uploaded first before uploading 2022-23 GTC`,
        quesText:
          "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
        question:
          "(B) Upload Signed Grant Transfer Certificate for  Water Supply and SWM - FY ( 2022-23)",
        key: "million_tied_2022-23_1",
        qusType: "",
        file: {
          name: "",
          url: "",
          progress: null,
          error: null,
        },
        isDraft: null,
        status: null,
        rejectReason_mohua: null,
        responseFile_mohua: {
          name: '',
          url: '',
          progress: null
        },
        canTakeAction: false
      },
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
