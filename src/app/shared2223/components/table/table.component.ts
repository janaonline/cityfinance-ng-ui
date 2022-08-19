import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { NewCommonService } from "../../services/new-common.service";
import { CommonService } from "src/app/shared/services/common.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { USER_TYPE } from "src/app/models/user/userType";
import { JSONUtility } from "src/app/util/jsonUtil";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TableApproveReturnDialogComponent } from "./table-approve-return-dialog/table-approve-return-dialog.component";
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnChanges {
  // @ViewChild(MatPaginator ) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    private commonService: NewCommonService,
    private _commonService: CommonService,
    private _fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.initializeFilterForm();
    this.initializeListFetchParams();
    this.getDesignYear();
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }
  userData;
  public keepOriginalOrder = (a, b) => a.key;
  // dataSource: MatTableDataSource<UserData>;
  title = "";
  total = 0;
  data;
  listType: USER_TYPE;
  filterForm: FormGroup;
  // ulb_name_s = new FormControl("");
  // state_name_s = new FormControl("");
  // ulb_code_s = new FormControl("");
  // ulb_type_s = new FormControl("");
  // filled_1 = new FormControl("");
  // population_type_s = new FormControl("");
  // ua_name_s = new FormControl("");
  // status_s = new FormControl("");
  // ulbType_s = new FormControl("");
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  listFetchOption = {
    filter: null,
    sort: null,
    csv: false,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  //  data: UserData[] = [];
  @Input() formId;
  @Input() dropdownData;
  formUrl = "";
  selectedId: any = [];
  checkedStatus;
  ulbType;
  disableEnableCheckbox: boolean;
  statusList;
  newArr: any = [];
  populationType;
  columnNames = [];
  params = {
    design_year: "606aafb14dff55e6c075d3ae",
    formId: "",
  };
  formRouterLink;
  ngOnInit(): void {
    this.updatedTableData();
    this.fetchStateList();
    this.callAPI();
    this.valueChanges();
 //   this.multiActionM();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("formId from Table Component", this.formId);
    this.params["formId"] = this.formId;
    // this.listFetchOption.skip = 0
    // this.initializeFilterForm();
    this.initializeListFetchParams();
    this.params["skip"] = 0;
    // this.params['currentPage'] = 1
    // this.listFetchOption.skip = 0;
    this.tableDefaultOptions.currentPage = 1;
    this.callAPI();

    let formData = this.dropdownData.find(({ _id }) => {
      return _id === this.formId;
    });
    this.formUrl = formData?.url;
    this.formRouterLink =
      "../../ulbform2223/" + this.formUrl + `/${formData?._id}`;
    console.log("form data url", formData);
  }
  filterFormValue;
  valueChanges() {
    this.filterForm.valueChanges.subscribe((value) => {
      console.log("value changes", value);
      this.filterFormValue = value;
      this.params["ulbName"] = value?.ulb_name_s;
      this.params["ulbCode"] = value?.ulb_code_s;
      this.params["censusCode"] = value?.ulb_code_s;
      this.params["ulbType"] = value?.ulbType_s;
      this.params["UA"] = value?.ua_name_s;
      this.params["status"] = value?.status_s;
      this.params["filled1"] = value?.filled_1;
      // if(this.formId == '62aa1b04729673217e5ca3aa'){
      //   this.params["filled2"] = value?.filled_2;
      // }
      this.params["filled2"] = value?.filled_2 ? value?.filled_2 : null;
      // this.params["stateId"] = value?.state_name_s;
    });
  }
  updatedTableData() {
    this.commonService.reviewStatus.subscribe((result) => {
      console.log("review Status ===>", result);
      if (result) {
        this.callAPI();
        return;
      }
    });
  }
  callAPI() {
    this.params.formId = this.formId;
    this.commonService.getReviewForms(this.params).subscribe(
      (res) => {
        this.title = res["title"];
        this.data = res["data"];
        this.total = res["total"];
        this.columnNames = res["columnNames"];
        this.data = this.data.map((element) => ({
          ...element,
          isChecked: this.isChecked(element),
        }));
        this.tableDefaultOptions.totalCount = this.total;
        (this.ulbType =
          Object.keys(res["ulbType"]).length > 0
            ? Object.values(res["ulbType"])
            : null),
          (this.statusList =
            Object.keys(res["statusList"]).length > 0
              ? Object.values(res["statusList"])
              : null);
        this.populationType =
          Object.keys(res["populationType"]).length > 0
            ? Object.values(res["populationType"])
            : null;
        console.log("jjjjjjjj", this.data);
        // this.dataSource = new MatTableDataSource(this.data);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  search(){
    this.callAPI();
  }
  isChecked(element: any) {
    // console.log('isChecked =====>', element);
    let isUlbIdExist = this.selectedId.some((item) => item == element.ulbId);
    return isUlbIdExist;
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    this.searchUsersBy(this.filterForm.value);
  }
  searchUsersBy(filterForm: {}, skip?: number) {
    this.listFetchOption.filter = filterForm;
    this.listFetchOption.skip =
      skip || skip === 0 ? skip : this.listFetchOption.skip;

    this.fetchList({ ...(<any>this.listFetchOption) });
  }

  isApiInProgress;

  private fetchList(
    body: {
      filter: { [key: string]: string };
      sort: { [key: string]: number };
      role?: USER_TYPE;
    } = { filter: {}, sort: {} }
  ) {
    this.isApiInProgress = true;
    const util = new JSONUtility();
    body.filter = util.filterEmptyValue(body.filter);

    Object.assign(this.params, body);
    this.callAPI();
  }
  reviewEntity = "ULB";
  private initializeFilterForm() {
    switch (this.reviewEntity) {
      case USER_TYPE.ULB:
        this.initializeULBFilterForm();
        return;
      case USER_TYPE.STATE:
        this.initializeStateFilterForm();
        return;
    }
  }
  private initializeULBFilterForm() {
    this.filterForm = this._fb.group({
      ulb_name_s: [],
      state_name_s: [],
      ulb_code_s: [],
      ulbType_s: [],
      population_type_s: [],
      ua_name_s: [],
      status_s: [],
      filled_1: [],
    });
  }

  private initializeStateFilterForm() {}

  private initializeListFetchParams() {
    this.listFetchOption = {
      csv: false,
      filter: this.filterForm ? this.filterForm.value : {},
      sort: null,
      skip: 0,
      limit: this.tableDefaultOptions.itemPerPage,
    };
  }
  stateList;
  statesByID;
  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
      res.data.forEach((state) => {
        this.statesByID[state._id] = state;
      });
    });
  }
  selected_checkbox(id, status: HTMLInputElement) {
    this.checkedStatus = status.checked;
    let selectedIndex = this.selectedId.findIndex((item) => item == id);
    if (selectedIndex > -1) {
      this.selectedId.splice(selectedIndex, 1);
      this.selectedId.splice();
    } else {
      this.selectedId.push(id);
    }
    console.log(this.selectedId);
  }
  openDialog(type) {
    const dialogdata = {
      selectedId: this.selectedId,
      type: type,
    };
    console.log(dialogdata);
    const dialogRef = this.dialog.open(TableApproveReturnDialogComponent, {
      data: dialogdata,
      width: "50vw",
      height: "auto",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);

    });
  }

  download() {
    const params = {
      design_year: this.getDesignYear(),
      formId: this.formId,
      token: this.getToken(),
    };
    const endPoint = "review";
    console.log(params);
    this._commonService.openWindowToDownloadCsv(params, endPoint);
  }
  getDesignYear() {
    let design_year = JSON.parse(localStorage.getItem("Years"));
    return design_year["2022-23"];
  }
  getToken() {
    return JSON.parse(localStorage.getItem("id_token"));
  }

  viewUlbForm(data) {
    console.log("data", data);
    localStorage.setItem("ulb_id", data?.ulbId);
    this.getULBSideBar(data?.ulbId, "ULB", data?.isUA);
    sessionStorage.setItem("stateName", data.state);
    sessionStorage.setItem("ulbName", data.ulbName);
    // this.router.navigateByUrl(`${this.formRouterLink}`)
  }
  getULBSideBar(ulbId, role, isUA) {
    if (isUA == "Yes") {
      isUA = true;
    } else {
      isUA = false;
    }
    this.commonService.getLeftMenu(ulbId, role, isUA).subscribe((res: any) => {
      console.log("left responces..", res);
      localStorage.setItem("leftMenuRes", JSON.stringify(res?.data));
      localStorage.setItem("overViewCard", JSON.stringify(res?.card));
      //  this.leftMenu = res;
    });
  }
  resetFilter(){
    this.filterForm.reset();
    this.callAPI();
  }
}

// export interface UserData {
//   ulbName: string;
//   censusCode: string;
//   ulbType: string;
//   stateName: string;
// }
