import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gtc-form",
  templateUrl: "./gtc-form.component.html",
  styleUrls: ["./gtc-form.component.scss"],
})
export class GtcFormComponent implements OnInit {
  years;
  constructor() {
    this.years = JSON.parse(localStorage.getItem("Years"));
  }

  gtcFormData;
  ngOnInit(): void {
    this.intializeGtc();
  }
  intializeGtc() {
    this.gtcFormData = [
      {
        label: "1. View/Upload GTCs for Non-Million Plus Cities Tied Grants",
        isDisabled: false,
        error: false,
        icon: "",
        quesArray: [
          {
            installment: 2,
            year: this.years["2021-22"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2021-22)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: false,
            disableMsg: "",
            // question: "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
            // question: "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_tied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
            // question: "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
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
            year: this.years["2021-22"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2021-22)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: false,
            disableMsg: "",
            //question: "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "1st Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `1st Installment (2022-23) GTC has to be uploaded first before uploading 2nd Installment (2021-22) GTC`,
            // question: "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
          },
          {
            installment: 2,
            year: this.years["2022-23"],
            type: "nonmillion_untied",
            instlText: "2nd Installment (2022-23)",
            quesText: "Upload Signed Grant Transfer Certificate",
            isDisableQues: true,
            disableMsg: `2nd Installment (2022-23) GTC has to be uploaded first before uploading 1st Installment (2022-23) GTC`,
            // question: "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
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
            year: this.years["2021-22"],
            type: "million_tied",
            instlText: "Installment ( 2021-22)",
            isDisableQues: false,
            quesText:
              "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
            // question: "(A) Upload Signed Grant Transfer Certificate for Million Plus Cities Grant for Water Supply and SWM ( 2021-22)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
          },
          {
            installment: 1,
            year: this.years["2022-23"],
            type: "million_tied",
            instlText: "Installment ( 2022-23)",
            isDisableQues: true,
            disableMsg: `Installment (2022-23) GTC has to be uploaded first before uploading Installment (2021-22) GTC`,
            quesText:
              "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
            // question: "(B) Upload Signed Grant Transfer Certificate for Million Plus Cities Grant for Water Supply and SWM ( 2022-23)",
            qusType: "",
            file: {
              name: "",
              url: "",
            },
          },
        ],
      },
    ];
  }

  fileChangeEvent(event, type) {
    console.log("event", type);
  }
}
