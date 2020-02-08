import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DropdownSettings} from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import {DashboardService} from '../../../shared/services/dashboard/dashboard.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';


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
  yearsDropdownSettings = {text: 'Select Years', primaryKey: 'id', badgeShowLimit: 1};


  commonTableHeaders = [
    {title: 'Population Category'},
    {title: 'Number of ULBs'},
    {title: 'Own Revenues', description: '(Rs in crores)'},
    {title: 'Revenue Expenditure', description: '(Rs in crores)'},
    {title: 'Own Revenue'},
    {title: 'Min. Own Revenue'},
    {title: 'Max. Own Revenue'}
  ];
  yearForm: FormGroup;

  ulbTypeSelected: string;

  tabIndexChangeHandler(event): void {
    this.tabIndex = event;
    this.fetchData();


  }

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService) {
    this.yearForm = formBuilder.group({
      years: [[this.yearLookup[0]]]
    });

  }

  ngOnInit() {
    this.fetchData();
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

  private fetchUlBsData(ulbIdsArray: string[]) {
    if (ulbIdsArray.length) {
      for (let ulb of ulbIdsArray) {
        this.dashboardService.fetchULBData(ulb).subscribe(response => {
          this.commonTableHeaders = [{title: 'ULB Name'}, {title: 'Population'}].concat(this.commonTableHeaders.slice(2));
        });
      }
    } else {

    }
  }

  private fetchData() {
    switch (this.tabIndex) {
      case 0:
        if (this.yearForm.controls['years'].value.length) {
          const yearsArray = this.yearForm.controls['years'].value;
          for (let year of yearsArray) {
            this.dashboardService.fetchDependencyOwnRevenueData('3232').subscribe(response => {
              this.commonTableHeaders = [{title: 'Population Category'}, {title: 'Number of ULBs'},].concat(this.commonTableHeaders.slice(2));
            });
          }
        }
        break;
      case 1:
        break;
      case  2:
        break;
    }

  }
}
