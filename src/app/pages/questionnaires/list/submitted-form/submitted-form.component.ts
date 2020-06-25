import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { QuestionnaireService } from '../../service/questionnaire.service';
import { formStatusList, IListType } from './models/list-types.interface';

@Component({
  selector: "app-submitted-form",
  templateUrl: "./submitted-form.component.html",
  styleUrls: ["./submitted-form.component.scss"],
})
export class SubmittedFormComponent implements OnInit {
  @ViewChild("stateQuestionnairePopup")
  private stateQuestionnairePopup: TemplateRef<any>;

  @ViewChild("ulbQuestionnairePopup")
  private ulbQuestionnairePopup: TemplateRef<any>;
  filterForm: FormGroup;

  ulbfilterForm: FormGroup;

  currentSort = 1;
  stateList: any[];
  allStates: any[];
  ulbsFilledQuestionnaireList: any[];

  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };

  stateTableConfig = {
    ...this.tableDefaultOptions,
  };

  ulbTableOptions = {
    ...this.tableDefaultOptions,
  };

  stateListlistFetchOption = {
    filter: null,
    sort: { modifiedAt: -1 },
    skip: 0,
    limit: this.stateTableConfig.itemPerPage,
  };

  ulbQuestionnaireListFetchOption = {
    filter: null,
    sort: { modifiedAt: -1 },
    skip: 0,
    limit: this.ulbTableOptions.itemPerPage,
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

  // FORM_STATUS = FormSTATUS;
  formStatusList = formStatusList;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private questionnaireSerive: QuestionnaireService,
    private _profileService: ProfileService,
    private authService: AuthService,
    private commonService: CommonService,
    public matdialog: MatDialog,
    public router: Router
  ) {
    this.initializeFilterForm();
    this.validatePageAccess();
  }

  ngOnInit() {
    this.fetchQuestionnaireList(this.stateListlistFetchOption);
    this.fetchQuestionnaireList(this.ulbQuestionnaireListFetchOption, "ulb");
    this.fetchAllStatesList();
    this.fetchStatesWithoutQuestionnaireList();
  }

  sortListBy(key: string, listType: IListType = "state") {
    this.currentSort = this.currentSort > 0 ? -1 : 1;
    let values = {};
    if (listType === "state") {
      values = {
        filter: this.filterForm.value,
        sort: { [key]: this.currentSort },
        limit: this.tableDefaultOptions.itemPerPage,
        skip:
          (this.tableDefaultOptions.currentPage - 1) *
          this.tableDefaultOptions.itemPerPage,
      };
    } else {
      values = {
        filter: this.ulbfilterForm.value,
        sort: { [key]: this.currentSort },
        limit: this.ulbTableOptions.itemPerPage,
        skip:
          (this.ulbTableOptions.currentPage - 1) *
          this.ulbTableOptions.itemPerPage,
      };
    }

    this.stateListlistFetchOption = <any>values;
    this.searchUsersBy(values["filter"], listType);
  }

  searchUsersBy(filterForm: {}, listType: IListType = "state") {
    this.stateListlistFetchOption.filter = filterForm;
    console.log(filterForm, listType);

    this.fetchQuestionnaireList(
      { ...(<any>this.stateListlistFetchOption) },
      listType
    );
  }

  setPage(pageNoClick: number, listType: IListType = "state") {
    if (listType === "state") {
      this.stateTableConfig.currentPage = pageNoClick;
      this.stateListlistFetchOption.skip =
        (pageNoClick - 1) * this.stateTableConfig.itemPerPage;
      return this.searchUsersBy(this.filterForm.value, listType);
    }

    this.ulbTableOptions.currentPage = pageNoClick;
    this.ulbQuestionnaireListFetchOption.skip =
      (pageNoClick - 1) * this.ulbTableOptions.itemPerPage;
    return this.searchUsersBy(this.ulbfilterForm.value, listType);
  }

  navigateToStateQuestionnaireForm(stateId: string) {
    this._router.navigate(["/questionnaires/state/form"], {
      queryParams: { stateId },
    });
  }

  navigateToULBQuestionnaireForm(ulbId: string) {
    console.log(`ulbId: ${ulbId}`);

    this._router.navigate(["/questionnaires/ulb/form"], {
      queryParams: { ulbId },
    });
  }

  openStateSelectPopup() {
    this.matdialog.open(this.stateQuestionnairePopup, {
      height: "25vh",
      width: "35vw",
      panelClass: "state-without-questionnaire-popup",
    });
  }

  openULBSelectPopup() {
    this.matdialog.open(this.ulbQuestionnairePopup, {
      height: "25vh",
      width: "35vw",
      panelClass: "state-without-questionnaire-popup",
    });
  }

  private fetchQuestionnaireList(
    body: {
      filter: { [key: string]: string };
      sort: { [key: string]: number };
      role?: USER_TYPE;
    } = { filter: {}, sort: {} },
    listType: IListType = "state"
  ) {
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);

    if (listType === "state") {
      return this.questionnaireSerive
        .getStateQuestionnaireFilledList(body)
        .subscribe((res) => {
          if (res.hasOwnProperty("total")) {
            this.stateTableConfig.totalCount = res["total"];
          }
          if (res["success"]) {
            this.stateList = res["data"];
          } else {
            alert("Failed");
          }
        });
    }
    return this.questionnaireSerive
      .getULBQuestionnaireFilledList(body)
      .subscribe((res) => {
        if (res.hasOwnProperty("total")) {
          this.ulbTableOptions.totalCount = res["total"];
        }
        if (res["success"]) {
          this.ulbsFilledQuestionnaireList = res["data"];
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

  private fetchAllStatesList() {
    this.commonService
      .fetchStateList()
      .subscribe((list) => (this.allStates = list));
    // this.questionnaireSerive
    //   .getStateWithoutQuestionnaireFilled()
    //   .subscribe((res) => {
    //     this.statesWithoutQuestionnaire = res;
    //   });
  }

  private initializeFilterForm() {
    this.filterForm = this._fb.group({
      isCompleted: [""],
      stateName: [""],
    });
    this.ulbfilterForm = this._fb.group({
      isCompleted: [""],
      ulbName: [""],
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
    console.log(`hasAccess: ${hasAccess}`);

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
