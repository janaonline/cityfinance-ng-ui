import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipality-bonds',
  templateUrl: './municipality-bonds.component.html',
  styleUrls: ['./municipality-bonds.component.scss']
})
export class MunicipalityBondsComponent implements OnInit {

  constructor() { }



  response = { // TODO: remove it
    filters: {
      projects: [
        {
          id: '',
          name: '',
        }
      ],
      implementationAgencies: [
        {
          id: '',
          name: '',
        }
      ],
      sectons: [
        {
          id: '',
          name: '',
        }
      ]
    },
    columns: [
      {
        label: "Project Name",
        key: "projectName",
      },
      {
        label: "Implementation Agency",
        key: "implementationAgency",
      },
      {
        label: "Total Project cost",
        key: "totalProjectCost",
      },
      {
        label: "State Share",
        key: "stateShare",
      },
      {
        label: "ULB Share(Funding Potential)",
        key: "ulbShare",
      },
      {
        label: "Capital Expentiture (State Share)",
        key: "capitalExpenditureState",
      },
      {
        label: "Capital Expentiture (ULB Share)",
        key: "capitalExpenditureUlb",
      },
      {
        label: "O&M Expenses (State Share)",
        key: "omExpensesState",
      },
      {
        label: "O&M Expenses (ULB Share)",
        key: "omExpensesUlb",
      },
      {
        label: "Project Start Date",
        key: "startDate",
      },
      {
        label: "Project Start Date",
        key: "startDate",
      },
      {
        label: "Estimated Project Completion Date",
        key: "estimatedCompletionDate",
      },
      {
        label: "More information",
        key: "csv",
      },
      {
        label: "Detailed Project Report",
        key: "projectReport",
      },
      {
        label: "Credit Rating",
        key: "creditRating",
      },
    ],
    rows: [
      {
        projectName: "name of the project",
        implementationAgency: "Implementation Agency",
        totalProjectCost: "Total Project cost",
        stateShare: "State Share",
        ulbShare: "ULB Share(Funding Potential)",
        capitalExpenditureState: "Capital Expenditure (State Share)",
        capitalExpenditureUlb: "Capital Expenditure (Ulb Share)",
        omExpensesState: "O&M Expenses (State Share)",
        omExpensesUlb: "O&M Expenses (ULB Share)",
        startDate: "Project Start Date",
        estimatedCompletionDate: "Estimated Project Completion Date",
        csv: {
          name: 'filename',
          url: 'fileurl'
        },
        projectReport: {
          name: 'filename',
          url: 'fileurl'
        },
        creditRating: "Credit Rating"
      },
      {
        projectName: "name of the project",
        implementationAgency: "Implementation Agency",
        totalProjectCost: "Total Project cost",
        stateShare: "State Share",
        ulbShare: "ULB Share(Funding Potential)",
        capitalExpenditureState: "Capital Expenditure (State Share)",
        capitalExpenditureUlb: "Capital Expenditure (Ulb Share)",
        omExpensesState: "O&M Expenses (State Share)",
        omExpensesUlb: "O&M Expenses (ULB Share)",
        startDate: "Project Start Date",
        estimatedCompletionDate: "Estimated Project Completion Date",
        csv: {
          name: 'filename',
          url: 'fileurl'
        },
        projectReport: {
          name: 'filename',
          url: 'fileurl'
        },
        creditRating: "Credit Rating"
      },
    ],
    page: 1,
    totalCount: 340,
    message: 'success'
  }

  ngOnInit(): void {
  }

}
