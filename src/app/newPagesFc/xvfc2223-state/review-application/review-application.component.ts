import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NewCommonService} from '../../../shared2223/services/new-common.service'
import { State2223Service } from "../state-services/state2223.service";
@Component({
  selector: "app-review-application",
  templateUrl: "./review-application.component.html",
  styleUrls: ["./review-application.component.scss"],
})
export class ReviewApplicationComponent implements OnInit {
  constructor(
    private commonService: NewCommonService,
    private route: ActivatedRoute,
    private stateServices: State2223Service
  ) { 
     this.design_year = this.years["2022-23"];
    }
    years = JSON.parse(localStorage.getItem("Years"));
    design_year = '';

  //formId = "62aa1b04729673217e5ca3aa";
  formId = "62aa1cc9c9a98b2254632a8e";
  formUrl = "";
  data;
  title = "";
  reviewTableName = 'Review Grant Application';
  params = {
    role: "ULB",
    design_year: "606aafb14dff55e6c075d3ae",
  };
  sideMenuItem;
  backRouter = '';
  nextRouter = '';
  formBaseUrl:string = 'ulbform2223';
  ngOnInit(): void {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.setRouter();
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
    });
  }

  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.url == "review-ulb-form") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
         // this.formId = element?._id;

        }
      });
    }
  }
}
