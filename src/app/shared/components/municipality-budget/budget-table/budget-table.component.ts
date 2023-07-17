import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../common-filter/common-filter.component';


const years = {
  "2020-21": "606aadac4dff55e6c075c507",
  "2021-22": "606aaf854dff55e6c075d219",
  "2022-23": "606aafb14dff55e6c075d3ae",
  "2023-24": "606aafc14dff55e6c075d3ec",
}
@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {

  @Input() documents: Document[] = [];

  @Output() onFilterChanges = new EventEmitter();

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
        { label: 'All years', id: '' },
        ...Object.entries(years).map(([label, id]) => ({ label, id }))
      ]
    },
  ];

  constructor(
  ) { }  
  
  ngOnInit(): void {
      
  }

  onUpdate(e) {
    console.log('onUpdate', e);
    this.onFilterChanges.emit(e);
  }
}
