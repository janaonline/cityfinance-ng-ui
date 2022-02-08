import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { FeatureCollection, Geometry } from "geojson";
import { data } from "jquery";
import * as L from "leaflet";
import { ILeafletStateClickEvent } from "src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent";
import { ReUseableHeatMapComponent } from "src/app/shared/components/re-useable-heat-map/re-useable-heat-map.component";
import { IStateULBCovered } from "src/app/shared/models/stateUlbConvered";
import { ULBWithMapData } from "src/app/shared/models/ulbsForMapResponse";
import { CommonService } from "src/app/shared/services/common.service";
import { GeographicalService } from "src/app/shared/services/geographical/geographical.service";
import { MapUtil } from "src/app/util/map/mapUtil";
import { IMapCreationConfig } from "src/app/util/map/models/mapCreationConfig";

@Component({
  selector: "app-map-with-filter",
  templateUrl: "./map-with-filter.component.html",
  styleUrls: ["./map-with-filter.component.scss"],
})
export class MapWithFilterComponent
  extends ReUseableHeatMapComponent
  implements OnInit
{
  yearSelected = [];
  selectedState = "India";
  selectedStateCode = "";
  selectedDistrictCode = "";
  stateList = [];
  ulbList = [];
  constructor(
    protected _commonService: CommonService,
    protected _snackbar: MatSnackBar,
    protected _geoService: GeographicalService,
    protected _activateRoute: ActivatedRoute
  ) {
    super(_commonService, _snackbar, _geoService, _activateRoute);
    this.ngOnChanges({
      yearSelected: {
        currentValue: ["2016-17"],
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
  }

  @Input()
  mapConfig = {
    code: {
      state: "",
      city: "",
    },
    showStateList: false,
    showDistrictList: false,
    stateMapContainerHeight: "23rem",
    nationalZoomOnMobile: 3.9, // will fit map in container
    nationalZoomOnWeb: 3.9, // will fit map in container
    stateZoomOnMobile: 4, // will fit map in container
    stateZoomOnWeb: 4, // will fit map in container
    stateBlockHeight: "23.5rem", // will fit map in container
  };

  layerMap = {};
  districtMarkerMap = {};
  districtList = {};
  loaderStyle = loaderStyle;
  stateUlbData = JSON.parse(localStorage.getItem("ulbList"));

  @Output()
  changeInStateOrCity = new EventEmitter();

  ngOnInit(): void {}

  createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    // debugger;
    if (this.stateList.length == 0)
      this.stateList = geoData.features.map((value: any) => {
        Object.assign(this.layerMap, { [value.properties.ST_CODE]: null });
        return value.properties;
      });

    this.isProcessingCompleted.emit(false);
    let zoom;
    if (window.innerWidth > 1050) zoom = this.mapConfig.nationalZoomOnWeb;
    else zoom = this.mapConfig.nationalZoomOnMobile;
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

    ({ stateLayers: this.stateLayers, map } =
      MapUtil.createDefaultNationalMap(configuration));

    this.nationalLevelMap = map;

    // this.createLegendsForNationalLevelMap();
    this.createControls(this.nationalLevelMap);

    this.initializeNationalLevelMapLayer(this.stateLayers);

    let stateToAutoSelect: IStateULBCovered;
    let layerToAutoSelect;
    if (this.queryParams.state) {
      const stateFound = this.stateData.find(
        (state) => state._id === this.queryParams.state
      );
      if (stateFound) stateToAutoSelect = stateFound;
    }

    this.stateLayers.eachLayer((layer: any) => {
      if (layer?.feature?.properties?.ST_CODE)
        this.layerMap[layer.feature.properties.ST_CODE] = layer;
      if (stateToAutoSelect) {
        if (MapUtil.getStateName(layer) === stateToAutoSelect.name) {
          layerToAutoSelect = { sourceTarget: layer };
        }
      }
      (layer as any).bringToBack();
      (layer as any).on({
        mouseover: () => this.createTooltip(layer, this.stateLayers),
        click: (args: ILeafletStateClickEvent) =>
          this.onStateLayerClick(args, false),
        mouseout: () => (this.mouseHoverOnState = null),
      });
    });
    if (layerToAutoSelect && !this.isMapOnMiniMapMode) {
      this.onStateLayerClick(layerToAutoSelect);
    }
    // this.hideMapLegends();

    if (this.isMapOnMiniMapMode) {
      // this.hideMapLegends();
      this.showStateLayerOnlyFor(
        this.nationalLevelMap,
        this.currentStateInView
      );
    }
    this.isProcessingCompleted.emit(true);

    //Open Direct District or State
    if (this.mapConfig.code) {
      let type = this.layerMap[this.mapConfig.code.state];
      if (type) {
        this.selectedStateCode = this.mapConfig.code.state;
        type.fireEvent("click");
      }
      setTimeout(() => {
        this.selectedDistrictCode = this.mapConfig.code.city;
        type = this.districtMarkerMap[this.mapConfig.code.city];
        if (type) type.fireEvent("click");
      }, 10);
    }
  }

  showMapLegends() {
    console.warn("show legends hidden");
  }

  clearDistrictMapContainer() {
    const height = this.mapConfig.stateBlockHeight;
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="col-sm-12"
    style="background-color: #f1f8ff; background-image: url('../../../../assets/Layer\ 1.png');
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
      let zoom;
      if (window.innerWidth > 1050) zoom = this.mapConfig.stateZoomOnMobile;
      else zoom = this.mapConfig.stateZoomOnWeb;

      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: false,
        fadeAnimation: true,
        zoom,
        minZoom: zoom,
        maxZoom: zoom + 5,
        zoomControl: true,
        keyboard: true,
        attributionControl: true,
        doubleClickZoom: true,
        dragging: true,
        tap: true,
      }).setView([options.center.lat + 3, options.center.lng + 3], 4);
      districtMap.scrollWheelZoom.disable();
      const districtLayer = L.geoJSON(districtGeoJSON, {
        style: this.newDashboardstateColorStyle,
      }).addTo(districtMap);

      if (districtLayer) {
        districtMap.fitBounds(districtLayer.getBounds());
      }
      this.districtMap = districtMap;

      this.districtList = {};
      options.dataPoints.forEach((dataPoint: any) => {
        this.districtList[dataPoint.code] = dataPoint.name;
        const marker = this.createDistrictMarker({
          ...dataPoint,
          icon: this.blueIcon,
        }).addTo(districtMap);
        marker.on("mouseover", () => (this.mouseHoveredOnULB = dataPoint));
        marker.on("mouseout", () => (this.mouseHoveredOnULB = null));
        marker.on("click", (values: any) => {
          let city;
          if (values["latlng"])
            city = this.stateUlbData.data[this.mapConfig.code.state].ulbs.find(
              (value) =>
                +value.location.lat === values["latlng"].lat &&
                +value.location.lng === values["latlng"].lng
            );
          if (city) this.selectedDistrictCode = city.code;
          this.onDistrictMarkerClick(values, marker);
        });
        this.districtMarkerMap[dataPoint.code] = marker;
      });
    }, 0.5);
  }

  stateOption(event) {
    this.changeInStateOrCity.emit({
      value: JSON.parse(event.target.value),
      fromState: true,
    });
    console.log(event.target.value, "test");
    let layer = this.layerMap[JSON.parse(event.target.value).ST_CODE];
    if (layer) layer.fireEvent("click");
  }

  districtOption(event) {
    let district = JSON.parse(event.value);
    this.changeInStateOrCity.emit({ value: district, fromState: false });
    let marker = this.districtMarkerMap[district.key];
    if (marker) marker.fireEvent("click");
  }
  // selectState(state) {
  //   console.log("state name", state);
  //   this.selectedState = state;
  // }
  // selectCity(city) {
  //   console.log("city name", city);
  // }
}

const loaderStyle = {
  "backgorund-color": "#F1F8FF",
};
