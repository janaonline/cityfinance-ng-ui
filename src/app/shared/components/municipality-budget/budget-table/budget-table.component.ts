import { Component, OnInit } from '@angular/core';
import { FormField } from '../../common-filter/common-filter.component';
import { MunicipalityBudgetService } from '../municipality-budget.service';

interface Document {
  name: string;
  url: string;
  type: 'pdf';
  modifiedAt: string;
}

const years = {
  "2017-18": "63735a4bd44534713673bfbf",
  "2018-19": "63735a5bd44534713673c1ca",
  "2019-20": "607697074dff55e6c0be33ba",
  "2020-21": "606aadac4dff55e6c075c507",
  "2021-22": "606aaf854dff55e6c075d219",
  "2022-23": "606aafb14dff55e6c075d3ae",
  "2023-24": "606aafc14dff55e6c075d3ec",
  "2024-25": "606aafcf4dff55e6c075d424",
  "2025-26": "606aafda4dff55e6c075d48f",
}
@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {

  documents: Document[] = [];

  filterInputs: FormField[] = [
    {
      id: 'ulbName',
      label: "Ulb Name",
      type: 'text',
      value: '',
      placeholder: 'Ulb Name'
    },
    {
      id: 'type',
      label: 'Type',
      type: 'select',
      value: 'raw',
      placeholder: '',
      options: [
        { label: 'Raw Data PDF', id: 'raw' }
      ],
    },
    {
      id: 'year',
      label: 'Year',
      type: 'select',
      value: '',
      placeholder: '',
      options: [
        {label: 'All years', id: ''},
        ...Object.entries(years).map(([label, id]) => ({ label, id}))
      ]
    },
  ];

  constructor(
    private municipalityBudgetsService: MunicipalityBudgetService
  ) { }


  get years() {
    return JSON.parse(localStorage.getItem("Years"));
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(payload = {}) {
    this.municipalityBudgetsService.getDocuments(payload).subscribe(({ data }: any) => {
      this.documents = data;
    })
  }


  onFilterChanges(event) {
    console.log('onFilterChanges', event);
    this.getDocuments(event);
  }

}
