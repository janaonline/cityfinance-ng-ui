import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
  selector: "app-submitted-form",
  templateUrl: "./submitted-form.component.html",
  styleUrls: ["./submitted-form.component.scss"],
})
export class SubmittedFormComponent implements OnInit {
  filterForm: FormGroup;
  currentSort = 1;
  userList: any[];

  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };

  listFetchOption = {
    filter: null,
    sort: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };

  accessValidator = new AccessChecker();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private questionnaireSerive: QuestionnaireService,
    private authService: AuthService
  ) {
    this.initializeFilterForm();
    this.validatePageAccess();
  }

  ngOnInit() {
    this.fetchList(this.listFetchOption);
  }

  sortListBy(key: string) {
    this.currentSort = this.currentSort > 0 ? -1 : 1;

    const values = {
      filter: this.filterForm.value,
      sort: { [key]: this.currentSort },
      limit: this.tableDefaultOptions.itemPerPage,
      skip:
        (this.tableDefaultOptions.currentPage - 1) *
        this.tableDefaultOptions.itemPerPage,
    };
    this.listFetchOption = values;
    this.searchUsersBy(values.filter);
  }

  searchUsersBy(filterForm: {}) {
    this.listFetchOption.filter = filterForm;
    this.fetchList({ ...(<any>this.listFetchOption) });
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    this.searchUsersBy(this.filterForm.value);
  }

  navigateToQuestionnaireForm(stateId: string) {
    this._router.navigate(["/questionnaires", "form"], {
      queryParams: { stateId },
    });
  }

  private fetchList(
    body: {
      filter: { [key: string]: string };
      sort: { [key: string]: number };
      role?: USER_TYPE;
    } = { filter: {}, sort: {} }
  ) {
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);

    this.questionnaireSerive
      .getQuestionnaireFilledList(body)
      .subscribe((res) => {
        console.log(res);

        if (res.hasOwnProperty("total")) {
          this.tableDefaultOptions.totalCount = res["total"];
        }
        if (res["success"]) {
          this.userList = res["data"];
        } else {
          alert("Failed");
        }
      });
  }

  private initializeFilterForm() {
    this.filterForm = this._fb.group({
      stateName: [null],
    });
  }

  private validatePageAccess() {
    const hasAccess = this.accessValidator.hasAccess({
      moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE_LIST,
      action: ACTIONS.VIEW,
    });

    if (!this.authService.loggedIn()) {
      sessionStorage.setItem(`postLoginNavigation`, "/questionnaires/states");
      return this._router.navigate(["/login"]);
    }

    console.log(`hasAccess: ${hasAccess}, `);

    if (!hasAccess) {
      const QuestionnaireFormAccess = this.accessValidator.hasAccess({
        moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE,
        action: ACTIONS.VIEW,
      });
      console.log(`QuestionnaireFormAccess: ${QuestionnaireFormAccess}, `);
      if (QuestionnaireFormAccess) {
        return this._router.navigate(["/questionnaires/form"]);
      }
      return this._router.navigate(["/home"]);
    }
  }
}
