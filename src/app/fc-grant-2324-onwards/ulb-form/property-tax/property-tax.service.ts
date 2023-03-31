import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const response = {
  "_id": null,
  "ulb": "5fa24660072dab780a6f141e",
  "design_year": "606aafb14dff55e6c075d3ae",
  "isDraft": null,
  "tabs": [
    {
      "_id": "63e4cdf74d1e781623cac3f8",
      "key": "financialInformation",
      "icon": "",
      "text": "",
      "label": "Financial Information",
      "id": "s3",
      "displayPriority": 3,
      "__v": 0,
      "data": {
        "CaptlExpSanitation": {
          "key": "CaptlExpSanitation",
          "label": "Capital Expenditure for Sanitation/Sewerage",
          "displayPriority": "16.2",
          "yearData": [
            {
              "label": "FY 2018-19",
              "key": "FY2018-19",
              "postion": "1",
              "value": "",
              "file": "",
              "min": "",
              "max": 999999999999999,
              "required": true,
              "type": "CaptlExpSanitation",
              "year": "63735a5bd44534713673c1ca",
              "code": [],
              "readonly": false,
              "formFieldType": "number",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2018-19 ",
              "placeHolder": ""
            },
            {
              "label": "FY 2019-20",
              "key": "FY2019-20",
              "postion": "2",
              "value": "",
              "file": "",
              "min": "",
              "max": 999999999999999,
              "required": true,
              "type": "CaptlExpSanitation",
              "code": [],
              "readonly": false,
              "formFieldType": "number",
              "year": "607697074dff55e6c0be33ba",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2019-20 ",
              "placeHolder": ""
            },
            {
              "label": "FY 2020-21",
              "key": "FY2020-21",
              "postion": "3",
              "value": "",
              "file": "",
              "min": "",
              "max": 999999999999999,
              "required": true,
              "type": "CaptlExpSanitation",
              "code": [],
              "readonly": false,
              "formFieldType": "number",
              "year": "606aadac4dff55e6c075c507",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2020-21 ",
              "placeHolder": ""
            },
            {
              "label": "FY 2021-22",
              "key": "FY2021-22",
              "postion": "4",
              "value": "",
              "file": "",
              "min": "",
              "max": 999999999999999,
              "required": true,
              "type": "CaptlExpSanitation",
              "code": [],
              "readonly": false,
              "formFieldType": "number",
              "year": "606aaf854dff55e6c075d219",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2021-22 ",
              "placeHolder": ""
            }
          ],
          "info": "Capital Expenditure = (closing balance Gross Block + closing balance Capital Work-In-Progress) – (opening balance Gross Block + opening balance Capital Work-In-Progress)"
        },
        "auditAnnualReport": {
          "key": "auditAnnualReport",
          "label": "Date of Audit Report for audited annual accounts",
          "displayPriority": "24",
          "yearData": [
            {},
            {
              "label": "FY 2019-20",
              "key": "FY2019-20",
              "postion": "2",
              "value": "",
              "date": null,
              "file": "",
              "min": 0,
              "max": 999999999999999,
              "required": true,
              "formFieldType": "date",
              "type": "auditAnnualReport",
              "code": [],
              "readonly": false,
              "year": "607697074dff55e6c0be33ba",
              "bottomText": "",
              "placeHolder": ""
            },
            {
              "label": "FY 2020-21",
              "key": "FY2020-21",
              "postion": "3",
              "value": "",
              "file": "",
              "date": null,
              "min": 0,
              "max": 999999999999999,
              "required": true,
              "type": "auditAnnualReport",
              "formFieldType": "date",
              "code": [],
              "readonly": false,
              "year": "606aadac4dff55e6c075c507",
              "bottomText": "",
              "placeHolder": ""
            },
            {
              "label": "FY 2021-22",
              "key": "FY2021-22",
              "postion": "4",
              "value": "",
              "file": "",
              "date": null,
              "min": 0,
              "max": 999999999999999,
              "required": true,
              "type": "auditAnnualReport",
              "formFieldType": "date",
              "code": [],
              "readonly": false,
              "year": "606aaf854dff55e6c075d219",
              "bottomText": "",
              "placeHolder": ""
            }
          ]
        },
        "totalOwnRevenueArea": {
          "key": "totalOwnRevenueArea",
          "label": "Total Own Revenue Arrears as on 31st March 2022",
          "displayPriority": "25",
          "yearData": [
            {},
            {},
            {},
            {},
            {},
            {
              "label": "FY 2021-22",
              "key": "FY2021-22",
              "postion": "4",
              "value": "",
              "file": "",
              "min": 0,
              "max": 999999999999999,
              "required": true,
              "type": "totalOwnRevenueArea",
              "code": [],
              "readonly": false,
              "formFieldType": "number",
              "year": "606aaf854dff55e6c075d219",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2021-22 ",
              "placeHolder": ""
            }
          ]
        },
        "registerGis": {
          "key": "registerGis",
          "label": "Is the property tax register GIS-based?",
          "displayPriority": "27",
          "yearData": [
            {
              "label": "FY 2021-22",
              "key": "FY2021-22",
              "postion": "1",
              "value": "",
              "file": "",
              "min": 0,
              "max": "",
              "required": true,
              "type": "registerGis",
              "year": "606aaf854dff55e6c075d219",
              "code": [],
              "readonly": false,
              "formFieldType": "radio-toggle",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2018-19 ",
              "placeHolder": ""
            }
          ]
        },
        "registerGisProof": {
          "key": "registerGisProof",
          "label": "Please upload proof?",
          "displayPriority": "27.1",
          "yearData": [
            {},
            {},
            {},
            {
              "label": "FY 2021-22",
              "key": "FY2021-22",
              "postion": "1",
              "value": "",
              "file": {
                "name": "",
                "url": ""
              },
              "min": 0,
              "max": "",
              "required": true,
              "type": "registerGisProof",
              "year": "606aaf854dff55e6c075d219",
              "code": [],
              "readonly": false,
              "formFieldType": "file",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2018-19 ",
              "placeHolder": ""
            }
          ]
        },
        "paid_property_tax": {
          "label": "Number of Properties for which Property Tax has been paid",
          "key": "paid_property_tax",
          "postion": "3",
          "displayPriority": "33",
          "value": "",
          "min": "",
          "max": "",
          "required": true,
          "readonly": false,
          "formFieldType": "number",
          "year": "606aaf854dff55e6c075d219",
          "type": "",
          "bottomText": "",
          "placeHolder": "",
          "input": "number",
          "yearData": [
            {},
            {},
            {},
            {
              "label": "FY 2021-22",
              "key": "FY2021-22",
              "postion": "1",
              "value": "",
              "file": "",
              "min": 0,
              "max": 999999999999999,
              "required": true,
              "type": "paid_property_tax",
              "year": "606aaf854dff55e6c075d219",
              "code": [],
              "readonly": false,
              "formFieldType": "number",
              "bottomText": "to be taken from  from I&E statement of Audited Annual Accounts for FY 2018-19 ",
              "placeHolder": ""
            }
          ]
        }
      },
      "feedback": {
        "status": null,
        "comment": ""
      }
    }
  ],
  "financialYearTableHeader": {
    "1": [
      "",
      "SECTION A:  Details from Approved Annual Budget",
      "2021-22",
      "2020-21",
      "2019-20",
      "2018-19"
    ],
    "8": [
      "",
      "SECTION A:  Details from Approved Annual Budget",
      "2021-22",
      "2020-21",
      "2019-20",
      "2018-19"
    ],
    "16": [
      "",
      "SECTION B: Details from Audited Annual Accounts (Balance Sheet) ",
      "2021-22",
      "2020-21",
      "2019-20",
      "2018-19"
    ],
    "19": [
      "",
      "SECTION C:  Details from Audited Annual Accounts (Receipts & Payments Statement) ",
      "2021-22",
      "2020-21",
      "2019-20",
      "2018-19"
    ],
    "20": [
      "",
      "SECTION D:  Other details from Approved Annual Budgets ",
      "2021-22",
      "2020-21",
      "2019-20",
      "2018-19"
    ],
    "24": [
      "",
      "SECTION E: Self-reported Details for Fiscal Governance Parameters",
      "2021-22",
      "2020-21",
      "2019-20",
      "2018-19"
    ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class PropertyTaxService {

  constructor(
    private http: HttpClient,
  ) { }

  getForm(ulb: string, design_year: string, formId: string) {
    return this.http.get(`${environment.api.url}/28-slbs?ulb=${ulb}&design_year=${design_year}&formId=${formId}`)
      .pipe(
        map((res: any) => {
          return {
            data: response
          };
        })
      );
  }
}
