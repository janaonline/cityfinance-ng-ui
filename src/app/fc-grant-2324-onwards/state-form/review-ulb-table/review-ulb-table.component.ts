import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State2223Service } from 'src/app/newPagesFc/xvfc2223-state/state-services/state2223.service';
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
    private stateServices: State2223Service
  ) { 
    this.design_year = this.years["2023-24"];
    this.params = {design_year : this.design_year, role: 'ULB'}
    }
    years = JSON.parse(localStorage.getItem("Years"));
    design_year = '';

  //formId = "62aa1b04729673217e5ca3aa";
  formId = "63ff31d63ae39326f4b2f466";
  formUrl = "";
  data;
  title = "";
  reviewTableName = 'Review Grant Application';
  params = {
    role: "ULB",
    design_year: "",
  };
  sideMenuItem;
  backRouter = '';
  nextRouter = '';
  formBaseUrl:string = 'ulb-form';
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
