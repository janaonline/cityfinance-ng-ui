import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { IMapCreationConfig } from 'src/app/util/map/models/mapCreationConfig';

import { AuthService } from '../../../app/auth/auth.service';
import { DialogComponent } from '../../../app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from '../../../app/shared/components/dialog/models/dialogConfiguration';
import { creditRatingModalHeaders } from '../../shared/components/home-header/tableHeaders';
import { CommonService } from '../../shared/services/common.service';
import { CreditScale, ratingGrades } from '../../util/creditReportUtil';

// import { CreditRatingJson } from './credit-rating.json';

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    public commonService: CommonService,
    private _dialog: MatDialog,
    protected _authService: AuthService,
    protected router: Router,
    private geoService: GeographicalService,
    private assetService: AssetsService
  ) {
    this.geoService.loadConvertedIndiaGeoData().subscribe((data) => {
      this.createNationalLevelMap(data, "mapidd");
    });
  }

  nationalLevelMap: L.Map;

  page = 1;
  originalList = [];
  list = [];
  dropdownFiltersData: {
    states?: any[];
    agencies?: any[];
    creditRatings?: any[];
    statusRatings?: any[];
  } = { states: [], agencies: [], creditRatings: [], statusRatings: [] };
  ulbSearchFormControl = new FormControl("");
  stateSearchFormControl = new FormControl([]);
  agencySearchFormControl = new FormControl([]);
  creditSearchFormControl = new FormControl([]);
  statusSearchFormControl = new FormControl([]);
  searchStack = [];
  detailedList = [];

  selectedStates: Array<string> = [];
  absCreditInfo: { [key: string]: any } = {};
  ratingGrades = ratingGrades;

  search: string;
  sortHeader: string;
  sortType: boolean; // true = asc, false = desc

  ulbInfoSortHeader: string;
  ulbInfoSortType: boolean;

  modalRef: BsModalRef;
  dialogHeaders = creditRatingModalHeaders[0];
  dialogData = [];
  ulbInfo: any;

  creditScale = CreditScale;

  defaultDailogConfiuration: IDialogConfiguration = {
    message: "You need to be Login to download the data.",
    buttons: {
      confirm: {
        text: "Proceed to Login",
        callback: () => {
          this.router.navigate(["/", "login"]);
        },
      },
      cancel: { text: "Cancel" },
    },
  };

  stateLayerSelectonMap: ILeafletStateClickEvent;

  stateColors = {
    unselected: "#efefef",
    selected: "#059b9a",
  };

  createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    let zoom = 4.32;

    zoom += 1 - window.devicePixelRatio;

    const configuration: IMapCreationConfig = {
      containerId,
      geoData,
      options: {
        zoom,
        maxZoom: zoom,
        minZoom: zoom,
      },
      layerOptions: {
        fillColor: this.stateColors.selected,
      },
    };
    const { stateLayers, map } = MapUtil.createDefaultNationalMap(
      configuration
    );
    this.nationalLevelMap = map;

    stateLayers.eachLayer((layer) => {
      (layer as any).bringToBack();
      (layer as any).on({
        click: (args: ILeafletStateClickEvent) => this.onClickingState(args),
      });
    });
  }

  onClickingState(layer: ILeafletStateClickEvent) {
    const stateName = MapUtil.getStateName(layer);
    if (
      this.stateLayerSelectonMap &&
      stateName === MapUtil.getStateName(this.stateLayerSelectonMap)
    ) {
      return this.resetMapToNationalView();
    }

    this.showCreditInfoByState(stateName);
    MapUtil.colorIndiaMap(this.nationalLevelMap, this.stateColors.unselected);
    MapUtil.colorStateLayer(layer.sourceTarget, this.stateColors.selected);

    if (this.stateLayerSelectonMap) {
      MapUtil.colorStateLayer(
        this.stateLayerSelectonMap.sourceTarget,
        this.stateColors.unselected
      );
    }
    this.stateLayerSelectonMap = layer;
  }

  ngOnInit() {
    this.assetService.fetchCreditRatingReport().subscribe((data: any[]) => {
      this.list = data;
      this.originalList = data;
      this.generateDropDownData();
      this.showCreditInfoByState();
    });

    this.assetService
      .fetchCreditRatingDetailedReport()
      .subscribe((data: any[]) => {
        this.detailedList = data;
      });

    this.ulbSearchFormControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((res) =>
        this.searchDropdownItemSelected(this.ulbSearchFormControl, "ulb")
      );
  }

  download() {
    const isUserLoggedIn = this._authService.loggedIn();
    if (!isUserLoggedIn) {
      this._dialog.open(DialogComponent, {
        data: this.defaultDailogConfiuration,
      });
      return;
    }
    window.open("/assets/files/CreditRating.xlsx");
  }

  setDefaultAbsCreditInfo() {
    this.absCreditInfo = {
      title: "",
      ulbs: 0,
      creditRatingUlbs: 0,
      ratings: {
        "AAA+": 0,
        AAA: 0,
        "AAA-": 0,
        "AA+": 0,
        AA: 0,
        "AA-": 0,
        "A+": 0,
        A: 0,
        "A-": 0,
        "BBB+": 0,
        BBB: 0,
        "BBB-": 0,
        BB: 0,
        "BB+": 0,
        "BB-": 0,
        "B+": 0,
        B: 0,
        "B-": 0,
        "C+": 0,
        C: 0,
        "C-": 0,
        "D+": 0,
        D: 0,
        "D-": 0,
      },
    };
  }

  calculateRatings(dataObject, ratingValue) {
    if (!dataObject["ratings"][ratingValue]) {
      dataObject["ratings"][ratingValue] = 0;
    }
    dataObject["ratings"][ratingValue] = dataObject["ratings"][ratingValue] + 1;
    dataObject["creditRatingUlbs"] = dataObject["creditRatingUlbs"] + 1;
  }

  resetMapToNationalView() {
    this.showCreditInfoByState("");
    MapUtil.colorIndiaMap(this.nationalLevelMap, this.stateColors.selected);

    this.stateLayerSelectonMap = null;
  }

  showCreditInfoByState(stateName = "") {
    this.selectedStates[0] = stateName;
    this.setDefaultAbsCreditInfo();
    const ulbList = [];
    if (stateName) {
      for (let i = 0; i < this.list.length; i++) {
        const ulb = this.list[i];

        if (ulb.state.toLowerCase() == stateName.toLowerCase()) {
          ulbList.push(ulb["ulb"]);
          const rating = ulb.creditrating.trim();
          this.calculateRatings(this.absCreditInfo, rating);
        }
      }
    } else {
      for (let i = 0; i < this.list.length; i++) {
        const ulb = this.list[i];
        ulbList.push(ulb["ulb"]);
        const rating = ulb.creditrating.trim();
        this.calculateRatings(this.absCreditInfo, rating);
      }
    }
    this.absCreditInfo["title"] = stateName || "India";
    this.absCreditInfo["ulbs"] = ulbList;
  }

  openUlbInfo(info, template: TemplateRef<any>) {
    this.ulbInfo = [];

    this.ulbInfo = this.detailedList.filter((item) => {
      return item.ulb == info.ulb;
    });
    this.ulbInfo.forEach((ulb) => {
      ulb = this.addRatingDesc(ulb);
    });
    this.modalRef = this.modalService.show(template, {
      class: "modal-lg modal-center",
    });
  }

  getUlbInfo(info) {
    this.ulbInfo = [];
    this.ulbInfo = this.detailedList.filter((item) => {
      return item.ulb == info.ulb;
    });
    this.ulbInfo.forEach((ulb) => {
      ulb = this.addRatingDesc(ulb);
    });
  }

  sortBy(header) {
    if (!this.sortType) {
      this.list = this.sortAsc(this.list, header);
      this.sortType = true;
    } else {
      this.list = this.sortDesc(this.list, header);
      this.sortType = false;
    }
    this.sortHeader = header;
  }

  sortByUlbInfo(header) {
    const arr = JSON.parse(JSON.stringify(this.ulbInfo));
    this.ulbInfo = [];
    setTimeout(() => {
      if (!this.ulbInfoSortType) {
        this.ulbInfo = this.sortAsc(arr, header);
        this.ulbInfoSortType = true;
      } else {
        this.ulbInfo = this.sortDesc(arr, header);
        this.ulbInfoSortType = false;
      }
    }, 0);

    this.ulbInfoSortHeader = header;
  }

  filterRecords() {
    if (!this.search) {
      this.list = this.originalList;
    } else {
      this.list = this.originalList.filter((item) => {
        return item.ulb.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
  }

  sortAsc(list, header) {
    return list.sort(function (a, b) {
      // if(header == 'date'){
      //   var d1 = new Date(a[header]);
      //   var d2 = new Date(b[header]);
      //   const c = d1 - d2;
      //   return c;
      // }
      if (header == "amount") {
        return parseInt(a[header]) - parseInt(b[header]);
      }
      if (a[header].toLowerCase() < b[header].toLowerCase()) {
        // sort string ascending
        return -1;
      }
      if (a[header].toLowerCase() > b[header].toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  sortDesc(list, header) {
    return list.sort(function (a, b) {
      if (header == "amount") {
        return parseInt(b[header]) - parseInt(a[header]);
      }
      if (a[header].toLowerCase() < b[header].toLowerCase()) {
        // sort string ascending
        return 1;
      }
      if (a[header].toLowerCase() > b[header].toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  addRatingDesc(ulbInfo) {
    const ratingKey =
      ulbInfo.agency +
      "_" +
      ulbInfo.creditRating.replace("+", "").replace("-", "");
    if (!this.creditScale[ratingKey]) {
      ulbInfo["ratingDesc"] =
        "We are gathering credit rating scale data from the agency. Information will be available shortly.";
    } else {
      ulbInfo["ratingDesc"] = this.creditScale[ratingKey].description;
    }

    return ulbInfo;
  }

  ngOnDestroy() {}

  openModal(ModalRef: TemplateRef<any>, grade) {
    this.dialogData = this.list.filter(
      (ulb) =>
        (this.selectedStates[0].length
          ? this.selectedStates[0]
              .toLowerCase()
              .includes(ulb.state.toLowerCase())
          : true) && ulb.creditrating === grade
    );

    this.modalService.show(ModalRef, { class: "modal-mdl modal-center" });
  }

  private generateDropDownData() {
    this.dropdownFiltersData.states = this.commonService
      .getUniqueArrayByKey(this.list, "state")
      .map((state) => {
        return {
          id: state,
          name: state,
        };
      });
    this.dropdownFiltersData.agencies = this.commonService
      .getUniqueArrayByKey(this.list, "agency")
      .map((agency) => {
        return {
          id: agency,
          name: agency,
        };
      });
    this.dropdownFiltersData.creditRatings = this.commonService
      .getUniqueArrayByKey(this.list, "creditrating")
      .map((creditrating) => {
        return {
          id: creditrating,
          name: creditrating,
        };
      });
    this.dropdownFiltersData.statusRatings = this.commonService
      .getUniqueArrayByKey(this.list, "status")
      .map((status) => {
        return {
          id: status,
          name: status,
        };
      });
  }

  searchDropdownItemSelected(searchFormControl: FormControl, searchKey) {
    this.list = this.originalList;
    this.searchStack.unshift(searchKey);
    this.searchStack = Array.from(new Set(this.searchStack));
    // let remainingFilters = this.searchStack.filter((item => item != searchKey));
    for (const filter of this.searchStack.reverse().slice(0, 5)) {
      let formControl: FormControl;
      switch (filter) {
        case "state":
          formControl = this.stateSearchFormControl;
          break;
        case "agency":
          formControl = this.agencySearchFormControl;
          break;
        case "ulb":
          formControl = this.ulbSearchFormControl;
          break;
        case "creditrating":
          formControl = this.creditSearchFormControl;
          break;
        case "status":
          formControl = this.statusSearchFormControl;
      }
      if (formControl.value.length) {
        let ids;
        if (filter === "ulb") {
          ids = formControl.value.toLowerCase();
        } else {
          ids = formControl.value.map((el) => el.id);
        }
        if (filter === "ulb") {
          this.list = this.list.filter((ulb) =>
            ulb[filter].toLowerCase().includes(ids)
          );
        } else {
          this.list = this.list.filter((ulb) => ids.includes(ulb[filter]));
        }
      }
    }
  }

  clearFilters() {
    [
      this.ulbSearchFormControl,
      this.stateSearchFormControl,
      this.agencySearchFormControl,
      this.creditSearchFormControl,
      this.statusSearchFormControl,
    ].forEach((formControl) => formControl.reset());
    this.list = this.originalList;
  }

  modalRowClicked({ ulb, agency, creditrating, status }: any) {
    this.ulbSearchFormControl.setValue(ulb);
    this.searchDropdownItemSelected(this.ulbSearchFormControl, "ulb");
    this.page = 2;
    this.modalService.hide(1);
  }

  setPage(number: number) {
    this.page = number;
    this.list = this.originalList;
  }

  ulbDropdownSelected(option: any) {
    this.searchDropdownItemSelected(this.ulbSearchFormControl, "ulb");
  }
}
