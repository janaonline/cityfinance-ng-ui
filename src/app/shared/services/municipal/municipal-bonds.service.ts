import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IBondIssuer } from '../../../credit-rating/municipal-bond/models/bondIssuerResponse';
import { IBondIssureItemResponse } from '../../../credit-rating/municipal-bond/models/bondIssureItemResponse';

@Injectable({
  providedIn: "root"
})
export class MunicipalBondsService {
  private temporaryBondIssuerItemResponse: IBondIssureItemResponse = {
    message: "some message here",
    success: true,
    timestamp: 12344,
    data: [
      {
        yearOfBondIssued: "2000",
        typeOfInstruments: "Non- Convertible Reedemable pooled bonds",
        term: "Not Available",
        couponRate: "13%",
        interestPayment: "Annually",
        taxTreatment: "Taxable",
        repayment: "Put and Call Options after 10 years",
        dateOfIssue: "2000",
        maturityDate: "20-Dec-17",
        platform: "BSE",
        type: "Private",
        issueSize: "INR 10 Crore",
        bidsReceived: "INR 1,200 crores (issue oversubcribed 6 times)",
        amountAccepted: "INR 200 crores",
        greenShoeOption: "Not available",
        greenShowOptionAmount: "Not available",
        guaranteedByStateGovernment: "Yes",
        guaranteeMechanism:
          "Escrow Bank Account had cash inflow from grants and property tax",
        crisil: "A",
        care: "AA+ / Stable",
        icra: "AAA",
        brickwork: "A-",
        "auicte/Smera": "Not applicable",
        "indiaRatings&Research": "AA+ / Stable",
        linksToReports: "ICRA",
        objectOfIssue: "Improvement in City Roads",
        whoCanInvest: "Private Institutional Investors",
        detailsOfSubscribers:
          "ICICI Prudential - INR 100 crores\r\nBank of Maharashtra - INR 100 crores",
        transactionAdvisors:
          "Government of Maharashtra, Union Ministry of Finance, Union Ministry of Urban Development, SEBI, SBI Caps and US Department of Treasurys Office of Technical Assistance.",
        trusteeForTheBond: "SBICAP Trustee Company Limited",
        registrarOfTheIssue: "Karvy Computershare Private Limited",
        auditorOfIssue: "Not available",
        legalCounsel: "Not available",
        escrowBanker: "Bank of Maharashtra",
        arranger: "SBI Capital Market",
        draftInformationMemorandum: "Not available",
        noticesFromPlatforms:
          "https://www.bseindia.com/markets/MarketInfo/DispNoticesNCirculars.aspx?Noticeid=%7BA0859F51-3825-48F2-BB7B-7A38AAC0F350%7D&noticeno=20170621-13&dt=06/21/2017&icount=13&totcount=26&flag=0",
        others:
          "http://southasia.berkeley.edu/sites/default/files/shared/events/21st_Century_Indian_City/Vaidya-MARKET-BASED_FINANCING_URBAN_INFRASTRUCTURE_INDIA.DOC",
        modifiedAt: "2020-01-24T12:46:19.233Z",
        createdAt: "2020-01-24T12:46:19.233Z",
        isActive: true,
        _id: "5e2ae7477cfee61846ee502f",
        ulb: "Indore Municipal Corporation",
        __v: 0
      },
      {
        yearOfBondIssued: "2019",
        typeOfInstruments:
          "Unsecure, Listed Taxable, Non Convertible, Reedemable bonds in the nature of debentures",
        term: "10 Years",
        couponRate: "10.23%",
        interestPayment: "Half Yearly",
        taxTreatment: "Taxable",
        repayment: "Bullet Repayment at the end of bond term",
        dateOfIssue: "20-08-2019",
        maturityDate: "21-Aug-19",
        platform: "BSE",
        type: "Private Placement",
        issueSize: "INR 100 Crores",
        bidsReceived: "Not Available",
        amountAccepted: "",
        greenShoeOption: "",
        greenShowOptionAmount: "",
        guaranteedByStateGovernment: "No",
        guaranteeMechanism:
          "The funds lying in the accountin which Property Tax, Fees&User Charges are collected shall be transferred to a seprate non-lien escrow account for debt servicing",
        crisil: "",
        care: "AA",
        icra: "",
        brickwork: "",
        "auicte/Smera": "",
        "indiaRatings&Research": "AA",
        linksToReports: "",
        objectOfIssue:
          "The proceeds of the issue shall be utlized towards capex for implementation of Stratergic Road Development Plan",
        whoCanInvest:
          "Mutual Funds registered with SEBI, Public Financial Institutions, Foreign Portfolio Investors,\r\nShedule commercial banks, Provident funds,State industrial development corporation,Multilateral and Bilteral Development Financial Institutions,Insurance companies, Pension Funds,National Investment Fund, Insurance Funds,Statutory Bodies, Co-operative Bank, Regional Rural Bank, Limited Liability Partnerships, Trusts, Societies and other legal entities.",
        detailsOfSubscribers: "",
        transactionAdvisors: "SPA Securities Limited",
        trusteeForTheBond: "SBICAP Trustee Company Limited",
        registrarOfTheIssue: "Karvy FinTech",
        auditorOfIssue: "State Audit Department",
        legalCounsel: "MVKini Law Firm",
        escrowBanker: "Not Available",
        arranger: "SBI Capital Market",
        draftInformationMemorandum: "",
        noticesFromPlatforms:
          "https://www.bseindia.com/downloads/ipo/201999172821GHMC%20IM%2009092019.pdf",
        others: "",
        modifiedAt: "2020-01-24T12:46:19.233Z",
        createdAt: "2020-01-24T12:46:19.233Z",
        isActive: true,
        _id: "5e2ae7477cfee61846ee5031",
        ulb: "Greater Hyderbad Municipal Corporation",
        __v: 0
      }
    ]
  };

  constructor(private _http: HttpClient) {}

  getBondIssuer() {
    return this._http.get<IBondIssuer>(
      `${environment.api.url}api/admin/v1/BondIssuer`
    );
  }

  getBondIssuerItem() {
    return of(this.temporaryBondIssuerItemResponse);
    // return this._http.get<IBondIssureItemResponse>(
    //   `${environment.api.url}api/admin/v1/BondIssuerItem`
    // );
  }

  getULBS() {
    return this._http.get(`${environment.api.url}api/admin/v1/Bond/Ulbs`);
  }
}
