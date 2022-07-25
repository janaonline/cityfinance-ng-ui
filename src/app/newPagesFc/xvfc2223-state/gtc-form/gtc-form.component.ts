import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gtc-form",
  templateUrl: "./gtc-form.component.html",
  styleUrls: ["./gtc-form.component.scss"],
})
export class GtcFormComponent implements OnInit {
  constructor() {}

  gtcFormData = [
    {
      label: "1. View/Upload GTCs for Non-Million Plus Cities Tied Grants",
      isDisabled: false,
      error: false,
      icon: "",
      quesArray: [
        {
          question:
            "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
          qusType: "",
          file: {
            name: "",
            url: "",
          },
        },
        {
          question:
            "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
          qusType: "",
          file: {
            name: "",
            url: "",
          },
        },
        {
          question:
            "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
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
          question:
            "(A) Upload Signed Grant Transfer Certificate - 2nd Installment (2021-22)",
          qusType: "",
          file: {
            name: "",
            url: "",
          },
        },
        {
          question:
            "(B) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
          qusType: "",
          file: {
            name: "",
            url: "",
          },
        },
        {
          question:
            "(C) Upload Signed Grant Transfer Certificate - 2nd Installment (2022-23)",
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
          question:
            "(A) Upload Signed Grant Transfer Certificate for Million Plus Cities Grant for Water Supply and SWM ( 2021-22)",
          qusType: "",
          file: {
            name: "",
            url: "",
          },
        },
        {
          question:
            "(B) Upload Signed Grant Transfer Certificate for Million Plus Cities Grant for Water Supply and SWM ( 2022-23)",
          qusType: "",
          file: {
            name: "",
            url: "",
          },
        },
      ],
    },
  ];
  ngOnInit(): void {}
}
