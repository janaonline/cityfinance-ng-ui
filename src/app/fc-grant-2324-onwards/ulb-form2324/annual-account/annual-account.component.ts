import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annual-account',
  templateUrl: './annual-account.component.html',
  styleUrls: ['./annual-account.component.scss']
})
export class AnnualAccountComponent implements OnInit {

  constructor() { }
  formJson = {
    formName: 'Annaul Accounts', // string
    formId: '',					// string
    designYear: '',				// string
    financialYear: '',			// string
    info: '',					// string
    status: '',					// string
    isDraft: null,				// boolean (null or true or false)
    previousYearValidation: {
      formStatus: '',			// string
      message: '',				// string
      show: true					// boolean (true or false)
    },
    formFields: [
      {
        tabName: 'Provisional Accounts for 2021-22', // string
        key: '',		// string
        position: '1',	// Number
        show: true,		// // boolean (true or false)
        status: '',
        comments: '', // string
        commentDocuments: {
          name: '',
          url: '',
        },
        question: [
          {
            name: 'A',
            answer: {
              value: '',
              id: ''
            },
            option: [],
            type: 'radio',
            show: '', // boolean (true or false)
            key: '',
            subQuestion: [
              {
                name: "Balance Sheet",
                error: false,
                data: null,
                type: "file",
                key: "bal_sheet",
                action: false,
                state_status: null,
                mohua_status: null,
                actError: false,
                qusDis: true,
                tooltip: '',
                rejectReason_state: null,
                rejectReason_mohua: null,
                responseFile_state: {
                  url: '',
                  name: '',
                },
                responseFile_mohua: {
                  url: '',
                  name: '',
                }
              },
              {
                name: "Please enter total amount of Assets",
                error: false,
                data: null,
                type: "input",
                key: "assets",
                action: false,
                actError: false,
                qusDis: true,
                tooltip: '',
                amount: {
                  key: "assets",
                  value: "",
                  error: false,
                },
                status: null,
                mohua_status: null,
                rejectReason_state: null,
                rejectReason_mohua: null,
                responseFile_state: {
                  url: '',
                  name: '',
                },
                responseFile_mohua: {
                  url: '',
                  name: '',
                }
              },
            ]

          },
          {
            name: 'B',
            answer: '',
            type: '',
            show: '',
            key: 'standardized_data',
            subQuestion: [

            ]

          }
        ]
      },
      {
        tabName: 'Audited Accounts for 2020-21', // string
        key: '',		// string
        position: '2',	// Number
        show: true,		// // boolean (true or false)
        status: '',
        comments: '',
        commentDocuments: {
          name: '',
          url: '',
        },
        question: [
          {
            name: 'A', // string
            answer: '', // boolean (true or false or null)
            type: 'radio',
            show: '', 	// boolean (true or false)
            key: '',
            subQuestion: [
            ]

          },
          {
            name: 'B',
            answer: '',
            type: '',
            show: '',
            key: '',
            subQuestion: [

            ]

          }
        ]
      }
    ]
  }
  ngOnInit(): void {
  }

}
