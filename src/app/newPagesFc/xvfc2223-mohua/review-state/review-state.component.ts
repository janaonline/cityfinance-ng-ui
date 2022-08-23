import { Component, OnInit } from '@angular/core';
import { NewCommonService } from "src/app/shared2223/services/new-common.service";

@Component({
  selector: "app-review-state",
  templateUrl: "./review-state.component.html",
  styleUrls: ["./review-state.component.scss"],
})
export class ReviewStateComponent implements OnInit {
  constructor(private commonService: NewCommonService) {}

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
    this.formId = event.target.value;
  }
}
