import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State2223Service } from 'src/app/newPagesFc/xvfc2223-state/state-services/state2223.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';

@Component({
  selector: 'app-review-ulb-table',
  templateUrl: './review-ulb-table.component.html',
  styleUrls: ['./review-ulb-table.component.scss']
})
export class ReviewUlbTableComponent implements OnInit {
  formId = "63d8eabeee320e56e357b34e";
  data;
  columnNames
  stateId = '5dcf9d7216a06aed41c748e2';
  stateList = [];
  userData;
  reviewTableName = 'Review Grant Application';

  constructor(
    private commonService: NewCommonService,
    private route: ActivatedRoute,
    private stateServices: State2223Service,
    private _commonService: CommonService) {
  }
  ngOnInit(): void {
    this.fetchStateList();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.loadData();
  }

  get year() {
    const yearItems = JSON.parse(localStorage.getItem('Years'))
    return yearItems['2022-23'];
  }

  loadData() {
    this.commonService.getFrUlbs({
      formId: this.formId,
      stateId: this.stateId,
      year: this.year
    }).subscribe(res => {
      this.data = res["data"];
      this.columnNames = res["columnNames"];
      console.log(this.data)
    }, err => {
      console.log(err.message);
    }
    );
  }


  filterAdded(event) {
    console.log("drop down changes state", event);
    this.stateId = event;
    this.loadData();
    // this.stateServices.dpReviewChanges.next(true);
  }

  
  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }
}

