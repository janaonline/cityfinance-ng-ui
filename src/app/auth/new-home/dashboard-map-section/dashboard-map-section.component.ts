import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { IState } from 'src/app/models/state/state';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { ReUseableHeatMapComponent } from 'src/app/shared/components/re-useable-heat-map/re-useable-heat-map.component';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { ULBWithMapData } from 'src/app/shared/models/ulbsForMapResponse';
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { IMapCreationConfig } from 'src/app/util/map/models/mapCreationConfig';
import { ICreditRatingData } from 'src/app/models/creditRating/creditRatingResponse';
@Component({
  selector: 'app-dashboard-map-section',
  templateUrl: './dashboard-map-section.component.html',
  styleUrls: ['./dashboard-map-section.component.scss']
})
export class DashboardMapSectionComponent extends ReUseableHeatMapComponent
implements OnInit {

myForm: FormGroup;
yearSelected = [];
selected_state ="India";
stateselected: IState;
creditRating: { [stateName: string]: number; total?: number } = {};
stateList: IState[];
statesLayer: L.GeoJSON<any>;
DropdownSettings = {
  singleSelection: true,
  text: "India",
  enableSearchFilter: false,
  labelKey: "name",
  primaryKey: "_id",
  showCheckbox: false,
  classes: "homepage-stateList custom-class",
};
constructor(
  protected _commonService: CommonService,
  protected _snackbar: MatSnackBar,
  protected _geoService: GeographicalService,
  protected _activateRoute: ActivatedRoute,
  private fb: FormBuilder,
  private _ngZone: NgZone,
  private assetService: AssetsService,
) {
  super(_commonService, _snackbar, _geoService, _activateRoute);
  setTimeout(() => {
    this.ngOnChanges({
      yearSelected: {
        currentValue: ["2016-17"],
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
  }, 1000);
    this.initializeform();
    this.fetchStateList();
   this.fetchDataForVisualization();
   this.fetchDataForVisualization();
   this.fetchCreditRatingTotalCount();
    this.fetchBondIssueAmout();

}
dataForVisualization: {
  financialStatements?: number;
  totalMunicipalBonds?: number;
  totalULB?: number;
  coveredUlbCount?: number;
  loading: boolean;
} = { loading: true };
previousStateLayer: ILeafletStateClickEvent["sourceTarget"] | L.Layer = null;
totalUsersVisit: number;

  absCreditInfo = {};

  creditRatingList: any[];

  // Including A
  creditRatingAboveA;

  // Including BBB-
  creditRatingAboveBBB_Minus;

  bondIssueAmount: number;
  isBondIssueAmountInProgress = false;

  financialYearTexts: {
    min: string;
    max: string;
  };
  StyleForSelectedState = {
    weight: 2,
    color: "black",
    fillOpacity: 1,
  };
  defaultStateLayerColorOption = {
    fillColor: "#efefef",
    weight: 1,
    opacity: 1,
    color: "#403f3f",
    fillOpacity: 1,
  };

  ngOnInit(): void {
  }
  private initializeform() {
    this.myForm = this.fb.group({
      stateId: [""],
    });
  }
  createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    this.isProcessingCompleted.emit(false);
    let vw = Math.max(document.documentElement.clientWidth);
    vw = (vw - 1366) / 1366;
    let zoom = 4 + vw;
    if (this.userUtil.isUserOnMobile()) {
      zoom = 3.8 + (window.devicePixelRatio - 2) / 10;
      if (window.innerHeight < 600) zoom = 3.6;
      const valueOf1vh = this.calculateVH(1);
      if (valueOf1vh < 5) zoom = 3;
      else if (valueOf1vh < 7) zoom = zoom - 0.2;
      // return zoom;
    }
    zoom = 4.2;
    const configuration: IMapCreationConfig = {
      containerId,
      geoData,
      options: {
        zoom,
        maxZoom: zoom,
        minZoom: zoom,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
        tap: false,
      },
    };
    let map: L.Map;

    ({ stateLayers: this.stateLayers, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;

    this.createLegendsForNationalLevelMap();
    this.createControls(this.nationalLevelMap);

    this.initializeNationalLevelMapLayer(this.stateLayers);

    // Prepare to auto select state from query Params.
    let stateToAutoSelect: IStateULBCovered;
    let layerToAutoSelect;
    if (this.queryParams.state) {
      const stateFound = this.stateData.find(
        (state) => state._id === this.queryParams.state
      );
      if (stateFound) stateToAutoSelect = stateFound;
    }

    this.stateLayers.eachLayer((layer) => {
      if (stateToAutoSelect) {
        if (MapUtil.getStateName(layer) === stateToAutoSelect.name) {
          layerToAutoSelect = { sourceTarget: layer };
        }
      }
      (layer as any).bringToBack();
      (layer as any).on({
        mouseover: () => this.createTooltip(layer, this.stateLayers),
        click: (args: ILeafletStateClickEvent) => this.onStateLayerClick(args),
        mouseout: () => (this.mouseHoverOnState = null),
      });

    });

    /**
     * @description If the map is already on mini mode, then it means the state is already selected, and its state map
     * is in the view.
     */
    if (layerToAutoSelect && !this.isMapOnMiniMapMode) {
      this.onStateLayerClick(layerToAutoSelect);
    }
    this.hideMapLegends();

    if (this.isMapOnMiniMapMode) {
      this.hideMapLegends();
      this.showStateLayerOnlyFor(
        this.nationalLevelMap,
        this.currentStateInView
      );
    }


    this.isProcessingCompleted.emit(true);
  }

  showMapLegends() {
    console.warn("show legends hidden");
  }

  clearDistrictMapContainer() {
    const height = this.userUtil.isUserOnMobile() ? `100%` : "90vh";
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="col-sm-12"
    style="background-color: #F8F9FF; background-image: url('../../../../assets/Layer\ 1.png');
    display: inline-block; width: 100%;height: ${height};"
  >
  </div>`;
  }

  createDistrictMap(
    districtGeoJSON,
    options: {
      center: ILeafletStateClickEvent["latlng"];
      dataPoints: {
        lat: string;
        lng: string;
        name: string;
        area: number;
        population: number;
        auditStatus: ULBWithMapData["auditStatus"];
      }[];
    }
  ) {
    if (this.districtMap) {
      return;
    }
    this.clearDistrictMapContainer();

    setTimeout(() => {
      let vw = Math.max(document.documentElement.clientWidth);
      vw = (vw - 1366) / 1366;
      let zoom = 5.5 + vw;
      if (this.userUtil.isUserOnMobile()) {
        zoom = 5.5;
      }

      zoom = 5.5;

      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: false,
        fadeAnimation: true,
        minZoom: zoom,
        maxZoom: zoom + 5,
        zoomControl: true,
        keyboard: true,
        attributionControl: true,
        doubleClickZoom: true,
        dragging: true,
        tap: true,
      }).setView([options.center.lat, options.center.lng], 4);
      // districtMap.touchZoom.disable();
      // districtMap.doubleClickZoom.disable();
      districtMap.scrollWheelZoom.disable();
      // districtMap.boxZoom.disable();
      // districtMap.keyboard.disable();
      // districtMap.dragging.disable();

      const districtLayer = L.geoJSON(districtGeoJSON, {
        style: this.newDashboardstateColorStyle,
      }).addTo(districtMap);

      if (districtLayer) {
        districtMap.fitBounds(districtLayer.getBounds());
      }
      this.districtMap = districtMap;

      options.dataPoints.forEach((dataPoint) => {
        const marker = this.createDistrictMarker({
          ...dataPoint,
          icon: this.blueIcon,
        }).addTo(districtMap);
        marker.on("mouseover", () => (this.mouseHoveredOnULB = dataPoint));
        marker.on("mouseout", () => (this.mouseHoveredOnULB = null));
        marker.on("click", (values) =>
          this.onDistrictMarkerClick(<L.LeafletMouseEvent>values, marker)
        );
      });
    }, 0.5);
  }
  selectState(state) {
    console.log('state name', state)
    this.selected_state = state;
  }
  selectCity(city) {
    console.log('city name', city)
  }
  private fetchBondIssueAmout(stateId?: string) {
    this.isBondIssueAmountInProgress = true;
    this._commonService.getBondIssuerItemAmount(stateId).subscribe((res) => {
      try {
        this.bondIssueAmount = Math.round(res["data"][0]["totalAmount"]);
      } catch (error) {
        this.bondIssueAmount = 0;
      }
      this.isBondIssueAmountInProgress = false;
    });
  }
  onSelectingStateFromDropDown(state: any | null) {
    this.stateselected = state;
    this.fetchDataForVisualization(state ? state._id : null);
    this.fetchBondIssueAmout(
      this.stateselected ? this.stateselected._id : null
    );
    this.selectStateOnMap(state);
  }

  private selectStateOnMap(state?: IState) {
    if (this.previousStateLayer) {
     this.resetStateLayer(this.previousStateLayer);
      this.previousStateLayer = null;
    }
    if (!state) {
      return;
    }

    this.statesLayer?.eachLayer((layer) => {
      const layerName = MapUtil.getStateName(layer);
      if (layerName !== state.name) {
        return;
      }
      this.higlightClickedState(layer);
      this.previousStateLayer = layer;
    });
  }



  private higlightClickedState(stateLayer) {
    stateLayer.setStyle(this.StyleForSelectedState);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      stateLayer.bringToFront();
    }
  }
  private resetStateLayer(layer) {
    layer.setStyle({
      color: this.defaultStateLayerColorOption.color,
      weight: this.defaultStateLayerColorOption.weight,
    });
    layer.closeTooltip();
  }


  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.stateList = [{ _id: null, name: "India" }].concat(res);
    });
  }

  private fetchDataForVisualization(stateId?: string) {
    this.dataForVisualization.loading = true;
    this._commonService.fetchDataForHomepageMap(stateId).subscribe((res) => {
      this.setDefaultAbsCreditInfo();

      this.showCreditInfoByState(
        this.stateselected ? this.stateselected.name : ""
      );
      this.dataForVisualization = { ...res, loading: false };
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.animateValues(1);
        });
      });
    });
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
  public animateValues = (startiongValue?: number) => {
    const speed = 1000;
    const interval = this.isMapAtNationalLevel() ? 5 : 1;

    const animateValues = (document.querySelectorAll(
      "[data-animate-value]"
    ) as any) as Array<HTMLElement>;

    animateValues.forEach((element: HTMLElement) => {
      const target = +element.getAttribute("data-animate-value");

      const currentValue = +element.innerText;
      if (startiongValue !== null && startiongValue !== undefined) {
        element.innerText = `0`;
        this._ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            setTimeout(this.animateValues, interval);
          });
        });
        return;
      }
      if (currentValue >= target) {
        return;
      }

      let incrementor = +Number(target / speed);
      incrementor = incrementor === 0 ? target : incrementor;

      // NOTE Need to re do it.
      incrementor = 2;
      if (currentValue < target) {
        const newValue = +Number(currentValue + incrementor).toFixed(1);
        element.innerText = `${newValue > target ? target : newValue}`;
        this._ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            setTimeout(this.animateValues, interval);
          });
        });
      } else {
        element.innerText = `${target}`;
      }
    });
  };
  showCreditInfoByState(stateName = "") {
    const ulbList = [];
    if (stateName) {
      for (let i = 0; i < this.creditRatingList?.length; i++) {
        const ulb = this.creditRatingList[i];

        if (ulb.state.toLowerCase() == stateName.toLowerCase()) {
          ulbList.push(ulb["ulb"]);
          const rating = ulb.creditrating.trim();
          this.calculateRatings(this.absCreditInfo, rating);
        }
      }
    } else {
      for (let i = 0; i < this.creditRatingList?.length; i++) {
        const ulb = this.creditRatingList[i];
        ulbList.push(ulb["ulb"]);
        const rating = ulb.creditrating.trim();
        this.calculateRatings(this.absCreditInfo, rating);
      }
    }
    this.creditRatingAboveA =
      this.absCreditInfo["ratings"]["A"] +
      this.absCreditInfo["ratings"]["A+"] +
      this.absCreditInfo["ratings"]["AA"] +
      this.absCreditInfo["ratings"]["AA+"] +
      this.absCreditInfo["ratings"]["AA-"] +
      this.absCreditInfo["ratings"]["AAA"] +
      this.absCreditInfo["ratings"]["AAA+"] +
      this.absCreditInfo["ratings"]["AAA-"];

    this.creditRatingAboveBBB_Minus =
      this.creditRatingAboveA +
      this.absCreditInfo["ratings"]["A-"] +
      this.absCreditInfo["ratings"]["BBB"] +
      this.absCreditInfo["ratings"]["BBB+"] +
      this.absCreditInfo["ratings"]["BBB-"];

    this.absCreditInfo["title"] = stateName || "India";
    this.absCreditInfo["ulbs"] = ulbList;
  }
  calculateRatings(dataObject, ratingValue) {
    if (!dataObject["ratings"][ratingValue]) {
      dataObject["ratings"][ratingValue] = 0;
    }
    dataObject["ratings"][ratingValue] = dataObject["ratings"][ratingValue] + 1;
    dataObject["creditRatingUlbs"] = dataObject["creditRatingUlbs"] + 1;
  }
  private isMapAtNationalLevel() {
    return this.stateSelected ? false : true;
  }
  private updateDropdownStateSelection(state: IState) {
    this.stateselected = state;
    this.myForm.controls.stateId.setValue(state ? [{ ...state }] : []);
  }
  private fetchCreditRatingTotalCount() {
    this.assetService
      .fetchCreditRatingReport()
      .subscribe((res) => this.computeStatesTotalRatings(res));
  }
  private computeStatesTotalRatings(res: ICreditRatingData[]) {
    this.creditRatingList = res;

    const computedData = { total: 0, India: 0 };
    res.forEach((data) => {
      if (computedData[data.state] || computedData[data.state] === 0) {
        computedData[data.state] += 1;
      } else {
        computedData[data.state] = 1;
      }
      computedData.total += 1;
      computedData["India"] += 1;
    });

    this.creditRating = computedData;
  }
}
