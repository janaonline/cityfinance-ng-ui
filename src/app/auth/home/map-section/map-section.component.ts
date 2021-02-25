import { AfterViewInit, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { ICreditRatingData } from 'src/app/models/creditRating/creditRatingResponse';
import { IState } from 'src/app/models/state/state';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { IStateULBCoveredResponse } from 'src/app/shared/models/stateUlbConvered';
import { AssetsService } from 'src/app/shared/services/assets/assets.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { IMapCreationConfig } from 'src/app/util/map/models/mapCreationConfig';
import { UserUtility } from 'src/app/util/user/user';

@Component({
  selector: "app-map-section",
  templateUrl: "./map-section.component.html",
  styleUrls: ["./map-section.component.scss"],
})
export class MapSectionComponent implements OnInit, AfterViewInit {
  constructor(
    private geoService: GeographicalService,
    private fb: FormBuilder,
    private assetService: AssetsService,
    public commonService: CommonService,
    private _ngZone: NgZone,
    private elem: ElementRef
  ) {
    this.initializeform();
    this.fetchDataForMapColoring();
    this.fetchStateList();
    this.fetchDataForVisualization();
    this.fetchCreditRatingTotalCount();
    this.fetchBondIssueAmout();
    this.fetchMinMaxFinancialYears();
  }
  statesLayer: L.GeoJSON<any>;
  myForm: FormGroup;
  stateSelected: IState;
  creditRating: { [stateName: string]: number; total?: number } = {};
  nationalLevelMap: L.Map;
  stateList: IState[];

  mapGeoData: FeatureCollection<
    Geometry,
    {
      [name: string]: any;
    }
  >;
  StyleForSelectedState = {
    weight: 2,
    color: "black",
    fillOpacity: 1,
  };

  stateDatasForMapColoring: IStateULBCoveredResponse["data"];
  dataForVisualization: {
    financialStatements?: number;
    totalMunicipalBonds?: number;
    totalULB?: number;
    coveredUlbCount?: number;
    loading: boolean;
  } = { loading: true };

  DropdownSettings = {
    singleSelection: true,
    text: "India",
    enableSearchFilter: false,
    labelKey: "name",
    primaryKey: "_id",
    showCheckbox: false,
    classes: "homepage-stateList custom-class",
  };

  defaultStateLayerColorOption = {
    fillColor: "#efefef",
    weight: 1,
    opacity: 1,
    color: "#403f3f",
    fillOpacity: 1,
  };

  dataPointsForVisualization: {
    name: string;
    key: string;
    object?: {};
    background: string;
  }[] = [
    {
      name: "Total Urban Local Bodies (ULBs) in Country",
      key: "totalULB",
      background: "rgb(241, 104, 49)",
    },
    {
      name: "ULBs for which data is available on Portal",
      key: "coveredUlbCount",
      background: "rgb(34, 188, 238)",
    },
    {
      name: "Number of Financial Statements of ULBs ",
      key: "financialStatements",
      background: "rgb(231, 19, 104)",
    },
    {
      name: "Details on Municipal Bond Issuances",
      key: "totalMunicipalBonds",
      background: "rgb(252, 196, 21)",
    },
    // {
    //   name: "Number of ULBs with Credit Rating Reports",
    //   key: "total",
    //   object: this.creditRating,
    //   background: "#2494d3 ",
    // },
  ];

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

  ngOnInit() {}

  ngAfterViewInit() {
    this.setdataPointsCardUI();
  }

  private fetchMinMaxFinancialYears() {
    this.commonService.getFinancialYearBasedOnData().subscribe((res) => {
      this.financialYearTexts = {
        min: res.data[0],
        max: res.data[res.data.length - 1].slice(2),
      };

      console.log(this.financialYearTexts);
    });
  }

  private setdataPointsCardUI() {
    const options: IntersectionObserverInit = {
      root: null,
      threshold: [1],
    };
    const elements = this.elem.nativeElement.querySelectorAll(".card");
    elements.forEach((element: HTMLElement) => {
      const width = element.getBoundingClientRect().width;
      element.style.height = `${width * 1.13}px`;

      element.style.opacity = "0";
      element.style.transform = "scale(0)";
      element.style.transitionDuration = "1s";

      const observer = new IntersectionObserver((event) => {
        if (event[0].isIntersecting) {
          element.style.opacity = "1";
          element.style.transform = "scale(1)";

          observer.disconnect();
        }
      }, options);
      observer.observe(element);
    });
  }

  onSelectingStateFromDropDown(state: any | null) {
    this.stateSelected = state;
    this.fetchDataForVisualization(state ? state._id : null);
    this.fetchBondIssueAmout(
      this.stateSelected ? this.stateSelected._id : null
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

    this.statesLayer.eachLayer((layer) => {
      const layerName = MapUtil.getStateName(layer);
      if (layerName !== state.name) {
        return;
      }
      this.higlightClickedState(layer);
      this.previousStateLayer = layer;
    });
  }

  private fetchStateList() {
    this.commonService.fetchStateList().subscribe((res) => {
      this.stateList = [{ _id: null, name: "India" }].concat(res);
    });
  }

  private fetchDataForVisualization(stateId?: string) {
    this.dataForVisualization.loading = true;
    this.commonService.fetchDataForHomepageMap(stateId).subscribe((res) => {
      this.setDefaultAbsCreditInfo();

      this.showCreditInfoByState(
        this.stateSelected ? this.stateSelected.name : ""
      );
      this.dataForVisualization = { ...res, loading: false };
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.animateValues(1);
        });
      });
    });
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

  private fetchDataForMapColoring() {
    this.commonService
      .getStateUlbCovered()
      .subscribe((res) => this.onGettingMapColoringData(res["data"]));
  }

  private onGettingMapColoringData(data: IStateULBCoveredResponse["data"]) {
    this.stateDatasForMapColoring = data;
    this.geoService.loadConvertedIndiaGeoData().subscribe((geoData) => {
      try {
        this.mapGeoData = geoData;
        this.createNationalLevelMap(geoData, "mapid");
      } catch (error) {}
    });
  }

  calculateVH(vh: number) {
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (vh * h) / 100;
  }

  calculateMapZoomLevel() {
    let zoom: number;
    const userUtil = new UserUtility();
    if (userUtil.isUserOnMobile()) {
      zoom = 3.8 + (window.devicePixelRatio - 2) / 10;
      if (window.innerHeight < 600) zoom = 3.6;
      const valueOf1vh = this.calculateVH(1);
      if (valueOf1vh < 5) zoom = 3;
      else if (valueOf1vh < 7) zoom = zoom - 0.2;
      return zoom;
    }

    const defaultZoomLevel = 4.6 - (window.devicePixelRatio - 1);
    try {
      zoom = localStorage.getItem("mapZoomLevel")
        ? +localStorage.getItem("mapZoomLevel")
        : defaultZoomLevel;
    } catch (error) {
      zoom = defaultZoomLevel;
    }

    return zoom;
  }

  private createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    const zoom = this.calculateMapZoomLevel();

    const configuration: IMapCreationConfig = {
      containerId,
      geoData,
      options: {
        zoom,
        minZoom: zoom,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
        tap: false,
      },
    };
    let map;

    ({ stateLayers: this.statesLayer, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;
    this.createLegendsForNationalLevelMap();

    this.statesLayer.eachLayer((layer) => {
      const stateCode = MapUtil.getStateCode(layer);

      if (!stateCode) {
        return;
      }

      const stateFound = this.stateDatasForMapColoring.find(
        (state) => state.code === stateCode
      );

      // if (!stateFound) {
      //   return;
      // }

      const color = this.getColorBasedOnPercentage(
        stateFound ? stateFound.coveredUlbPercentage : 0
      );
      MapUtil.colorStateLayer(layer, color);
      (layer as any).bringToBack();
      (layer as any).on({
        mouseover: () => {
          this.createTooltip(layer);
        },
        click: (args: ILeafletStateClickEvent) =>
          this.onClickingState(args, layer),
      });
    });
  }

  private createLegendsForNationalLevelMap() {
    const arr = [
      { color: "#216278", text: "76%-100%" },
      { color: "#059b9a", text: "51%-75%" },
      { color: "#8BD2F0", text: "26%-50%" },
      { color: "#D0EDF9", text: "1%-25%" },
      { color: "#E5E5E5", text: "0%" },
    ];
    const legend = new L.Control({ position: "bottomleft" });
    const labels = [
      `<span style="width: 100%; display: block;" class="text-center">% of Data Availability <br> on Cityfinance.in</span>`,
    ];
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend ml-0");
      div.id = "legendContainer";
      div.style.width = "100%";
      arr.forEach((value) => {
        labels.push(
          `<span style="display: flex; align-items: center; width: 45%;margin: 1% auto; "><i class="circle" style="background: ${value.color}; padding:10%; display: inline-block; margin-right: 12%;"> </i> ${value.text}</span>`
        );
      });
      div.innerHTML = labels.join(``);
      return div;
    };

    legend.addTo(this.nationalLevelMap);
  }

  private createTooltip(layer: L.Layer) {
    const stateCode = MapUtil.getStateCode(layer);
    const stateFound = this.stateList.find((state) => state.code === stateCode);
    if (!stateFound) {
      return;
    }

    const option: L.TooltipOptions = {
      sticky: true,
      offset: new L.Point(15, -8),
      zoomAnimation: true,
    };

    layer.bindTooltip("<b>" + stateFound.name + "</b>", option);
    layer.toggleTooltip();
  }

  onClickingState(currentStateLayer: ILeafletStateClickEvent, layer: L.Layer) {
    const stateCode = MapUtil.getStateCode(currentStateLayer);

    if (this.stateSelected && stateCode === this.stateSelected.code) {
      this.resetMapToNationalView(currentStateLayer.target);
      return;
    }

    const stateFound = this.stateList.find((state) => state.code === stateCode);

    // const doesStateHasData = !!this.stateDatasForMapColoring.find(
    //   (state) => state._id == stateFound._id && state.coveredUlbPercentage > 0
    // );
    if (!stateFound) {
      return;
    }
    this.selectStateOnMap(stateFound);

    this.updateDropdownStateSelection(stateFound);
    this.fetchDataForVisualization(stateFound._id);
    this.fetchBondIssueAmout(stateFound._id);
  }

  private resetMapToNationalView(stateLayer) {
    this.resetStateLayer(stateLayer);
    this.previousStateLayer = null;
    this.stateSelected = null;
    this.updateDropdownStateSelection(null);
    this.fetchDataForVisualization();
    this.fetchBondIssueAmout();
  }
  private resetStateLayer(layer) {
    layer.setStyle({
      color: this.defaultStateLayerColorOption.color,
      weight: this.defaultStateLayerColorOption.weight,
    });
    layer.closeTooltip();
  }

  private updateDropdownStateSelection(state: IState) {
    this.stateSelected = state;
    this.myForm.controls.stateId.setValue(state ? [{ ...state }] : []);
  }

  private higlightClickedState(stateLayer) {
    stateLayer.setStyle(this.StyleForSelectedState);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      stateLayer.bringToFront();
    }
  }

  private getColorBasedOnPercentage(value: number) {
    if (value > 75) {
      return "#216278";
    }
    if (value > 50) {
      return "#059b9a";
    }
    if (value > 25) {
      return "#8BD2F0";
    }
    if (value > 0) {
      return `#D0EDF9`;
    }
    return "#E5E5E5";
  }

  private fetchBondIssueAmout(stateId?: string) {
    this.isBondIssueAmountInProgress = true;
    this.commonService.getBondIssuerItemAmount(stateId).subscribe((res) => {
      try {
        this.bondIssueAmount = Math.round(res["data"][0]["totalAmount"]);
      } catch (error) {
        this.bondIssueAmount = 0;
      }
      this.isBondIssueAmountInProgress = false;
    });
  }

  private fetchCreditRatingTotalCount() {
    this.assetService
      .fetchCreditRatingReport()
      .subscribe((res) => this.computeStatesTotalRatings(res));
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

  showCreditInfoByState(stateName = "") {
    const ulbList = [];
    if (stateName) {
      for (let i = 0; i < this.creditRatingList.length; i++) {
        const ulb = this.creditRatingList[i];

        if (ulb.state.toLowerCase() == stateName.toLowerCase()) {
          ulbList.push(ulb["ulb"]);
          const rating = ulb.creditrating.trim();
          this.calculateRatings(this.absCreditInfo, rating);
        }
      }
    } else {
      for (let i = 0; i < this.creditRatingList.length; i++) {
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

  private isMapAtNationalLevel() {
    return this.stateSelected ? false : true;
  }

  private initializeform() {
    this.myForm = this.fb.group({
      stateId: [""],
    });
  }
}
