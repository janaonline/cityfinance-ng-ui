import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State2223Service } from 'src/app/newPagesFc/xvfc2223-state/state-services/state2223.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';

@Component({
  selector: 'app-review-state-form',
  templateUrl: './review-state-form.component.html',
  styleUrls: ['./review-state-form.component.scss']
})
export class ReviewStateFormComponent implements OnInit {

  constructor(
    private commonService: NewCommonService,
    private stateServices: State2223Service,
    private route: ActivatedRoute) { 
      this.design_year = this.years["2023-24"];
    }

  formId = "12";
  formUrl = "";
  data;
  title = "";
  params = {
    role: "STATE",
    design_year: '',
  };
  reviewTableName = 'Review State Forms';
  stateId = '';
  years = JSON.parse(localStorage.getItem("Years"));
  design_year = '';
  formBaseUrl:string = 'state-form';
  sfcFormId: string = '15';
  sfcFormIdPreYear: string = '62c553822954384b44b3c38e';
  lastYearReviewRoutes: string = '../../mohua2223/review-state-form';
  pTaxFormId:string = '17';
  pTaxFormIdPreYear:string = '62c5534e2954384b44b3c38a';
  ngOnInit(): void {
    this.onLoad();
    this.getFormId();
    if (this.data?.length > 0)
    this.formId = this.data[0]["formId"];
    sessionStorage.removeItem("path2");
    sessionStorage.removeItem("Stateform_id");
  }

  onLoad() {
    this.params.design_year = this.design_year;
    this.title = "Review State Forms";
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

  get isUa() {
    return this.data.find(item => item.formId == this.formId)?.isUa;
  }

  setFormId(event) {
    this.formId = event;
    this.stateServices.dpReviewChanges.next(true);    
  }

  getFormId() {
    this.route.queryParams.subscribe((params) => {
      console.log("params", params);
      if (params && params.formId) {
        let formId = params["formId"];
        this.formId = formId;
       // console.log("sasasasasasaaaaaaaaaaa", formId);
      }
    });
  }


}
