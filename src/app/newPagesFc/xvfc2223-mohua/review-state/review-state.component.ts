import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { State2223Service } from '../../xvfc2223-state/state-services/state2223.service';

@Component({
  selector: "app-review-state",
  templateUrl: "./review-state.component.html",
  styleUrls: ["./review-state.component.scss"],
})
export class ReviewStateComponent implements OnInit {
  constructor(
    private commonService: NewCommonService,
    private stateServices: State2223Service,
    private route: ActivatedRoute) { }

  formId = "62c553822954384b44b3c38e";
  formUrl = "";
  data;
  title = "";
  params = {
    role: "STATE",
    design_year: "606aafb14dff55e6c075d3ae",
  };
  ngOnInit(): void {
    this.onLoad();
    this.getFormId();
    if (this.data?.length > 0)
    this.formId = this.data[0]["_id"];
    sessionStorage.removeItem("path2");
    sessionStorage.removeItem("Stateform_id");
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

  // setFormId(event) {
  //   console.log("drop down changes", event);
  //   this.formId = event.target.value;
  // }
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
}
