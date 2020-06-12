import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
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
  @ViewChild("defaultTabButtons")
  private defaultTabButtonsTpl: TemplateRef<any>;
  filterForm: FormGroup;
  currentSort = 1;
  stateList: any[];
  ulbsFilledQuestionnaireList: any[];

  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };

  listFetchOption = {
    filter: null,
    sort: { modifiedAt: -1 },
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };

  statesWithoutQuestionnaire: { _id: string; name: string }[] = [];
  stateDropdownConfiguration = {
    primaryKey: "_id",
    singleSelection: true,
    text: "Select a state",
    enableSearchFilter: true,
    badgeShowLimit: 1,
    labelKey: "name",
    showCheckbox: false,
    noDataLabel: "No Data available",
  };

  accessValidator = new AccessChecker();
  stateSelectToFillQuestionnaire: { _id: string; name: string }[];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private questionnaireSerive: QuestionnaireService,
    private _profileService: ProfileService,
    private authService: AuthService,
    public matdialog: MatDialog,
    public router: Router
  ) {
    this.initializeFilterForm();
    this.validatePageAccess();
  }

  ngOnInit() {
    this.fetchStatesWithQuestionnaireList(this.listFetchOption);
    this.fetchStatesWithoutQuestionnaireList();
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
    this.listFetchOption = <any>values;
    this.searchUsersBy(values.filter);
  }

  searchUsersBy(filterForm: {}) {
    this.listFetchOption.filter = filterForm;
    this.fetchStatesWithQuestionnaireList({ ...(<any>this.listFetchOption) });
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    this.searchUsersBy(this.filterForm.value);
  }

  navigateToQuestionnaireForm(stateId: string) {
    this._router.navigate(["/questionnaires/state/form"], {
      queryParams: { stateId },
    });
  }

  openStateSelectPopup() {
    this.matdialog.open(this.defaultTabButtonsTpl, {
      height: "25vh",
      width: "35vw",
      panelClass: "state-without-questionnaire-popup",
    });
  }

  private fetchStatesWithQuestionnaireList(
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
        if (res.hasOwnProperty("total")) {
          this.tableDefaultOptions.totalCount = res["total"];
        }
        if (res["success"]) {
          this.stateList = res["data"];
        } else {
          alert("Failed");
        }
      });
  }
  private fetchStatesWithoutQuestionnaireList() {
    this.questionnaireSerive
      .getStateWithoutQuestionnaireFilled()
      .subscribe((res) => {
        this.statesWithoutQuestionnaire = res;
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
      sessionStorage.setItem(`postLoginNavigation`, "/questionnaires/list");
      return this._router.navigate(["/login"]);
    }

    if (!hasAccess) {
      const QuestionnaireFormAccess = this.accessValidator.hasAccess({
        moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE,
        action: ACTIONS.VIEW,
      });
      if (QuestionnaireFormAccess) {
        const userType = this._profileService.getLoggedInUserType();
        switch (userType) {
          case USER_TYPE.STATE:
            return this._router.navigate(["/questionnaires/state/form"]);
          case USER_TYPE.ULB:
            return this._router.navigate(["/questionnaires/ulb/form"]);
        }
      }

      return this._router.navigate(["/home"]);
    }
  }
}
