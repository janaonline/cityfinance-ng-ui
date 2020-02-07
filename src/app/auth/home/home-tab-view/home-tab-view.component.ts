import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DropdownSettings} from 'angular2-multiselect-dropdown/lib/multiselect.interface';


@Component({
  selector: 'app-home-tab-view',
  templateUrl: './home-tab-view.component.html',
  styleUrls: ['./home-tab-view.component.scss']
})
export class HomeTabViewComponent implements OnInit {
  tabIndex: any = 0;
  yearLookup = [
    {id: '2015-16', itemName: '2015-16'},
    {id: '2016-17', itemName: '2016-17'},
    {id: '2017-18', itemName: '2017-18'}
  ];
  yearsDropdownSettings = {text: 'Select Years', badgeShowLimit: 1,};

  commonTableHeaders = [
    {title: 'Population Category'},
    {title: 'Number of ULBs'},
    {title: 'Own Revenues', description: '(Rs in crores)'},
    {title: 'Revenue Expenditure', description: '(Rs in crores)'},
    {title: 'Own Revenue'},
    {title: 'Min. Own Revenue'},
    {title: 'Max. Own Revenue'}

  ];
  yearForm: any;

  ulbTypeSelected: string;

  tabIndexChangeHandler(event): void {
    this.tabIndex = event;


  }

  constructor(private formBuilder: FormBuilder) {
    this.yearForm = formBuilder.group({
      years: [[]]
    });

  }

  ngOnInit() {
  }

  onDropdownSelect(event: any) {
    console.log(event);

  }

  resetPopupValues() {
    return 'other';
  }

  onDropdownDeSelect(event: any) {
    console.log(event);
  }

  onDropdownClose(event: any) {
    console.log(event);
  }
}
