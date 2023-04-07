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

  constructor(
    private commonService: NewCommonService,
    private route: ActivatedRoute,
    private stateServices: State2223Service,
    private _commonService: CommonService,) {
    this.fetchStateList();
    this.userData = JSON.parse(localStorage.getItem("userData"));
     this.design_year = this.years["2023-24"];
    }
      years = JSON.parse(localStorage.getItem("Years"));
      design_year = '';

  //formId = "62aa1b04729673217e5ca3aa";
  formId = "62aa1cc9c9a98b2254632a8e";
  formUrl = "";
  data;
  title = "";
  params = {
    role: "ULB",
    design_year: "606aafb14dff55e6c075d3ae",
  };
  stateId = '';
  stateList = [];
  userData;
  reviewTableName = 'Review Grant Application';
  formBaseUrl:string = 'ulb-form';
  ngOnInit(): void {
    this.onLoad();
    this.getFormId();
    if (this.data?.length > 0)
    this.formId = this.data[0]["_id"];
  }

  onLoad() {
    if (this.params["role"] == "ULB") {
      this.title = "Review Grant Application";
    } else if (this.params["role"] == "STATE") {
      this.title = "Review State Forms";
    }
    this.commonService.getFormList(this.params).subscribe(
      (res) => {
        console.log("res data review 2223", res);
        this.data = res["data"];
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  setFormId(event) {
    console.log("drop down changes", event);
    this.formId = event;
    this.stateServices.dpReviewChanges.next(true);
  }
  getFormId() {
    this.route.queryParams.subscribe((params) => {
      console.log("params", params);
      if (params && params.formId) {
        let formId = params["formId"];
        this.formId = formId;
        console.log("sasasasasasaaaaaaaaaaa", formId);
      }
      if (params && params.state) {
       // let formId = params["state"];
        this.stateId = params["state"];
        console.log("sasasasasasaaaaaaaaaaa", );
      }
    });
  }
  filterAdded(event) {
    console.log("drop down changes state", event);
    this.stateId = event;
    this.stateServices.dpReviewChanges.next(true);

  }
  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }

}
