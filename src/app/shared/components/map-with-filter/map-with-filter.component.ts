import { Component, OnInit, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { FeatureCollection, Geometry } from "geojson";
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
    nationalZoomOnMobile: 3.9, // will fit map in container
    nationalZoomOnWeb: 4.2, // will fit map in container
    stateZoomOnMobile: 5, // will fit map in container
    stateZoomOnWeb: 5.2, // will fit map in container
    stateBlockHeight: "28rem", // will fit map in container
  };

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
    if (this.stateList.length == 0)
      this.stateList = geoData.features.map((value) => {
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

    this.createLegendsForNationalLevelMap();
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
      else zoom = this.mapConfig.stateZoomOnMobile;

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
    console.log("state name", state);
    this.selectedState = state;
  }
  selectCity(city) {
    console.log("city name", city);
  }
}
