import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { ReUseableHeatMapComponent } from 'src/app/shared/components/re-useable-heat-map/re-useable-heat-map.component';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { ULBWithMapData } from 'src/app/shared/models/ulbsForMapResponse';
import { CommonService } from 'src/app/shared/services/common.service';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { IMapCreationConfig } from 'src/app/util/map/models/mapCreationConfig';

@Component({
  selector: 'app-dashboard-map-section',
  templateUrl: './dashboard-map-section.component.html',
  styleUrls: ['./dashboard-map-section.component.scss']
})
export class DashboardMapSectionComponent extends ReUseableHeatMapComponent
implements OnInit {
yearSelected = [];
selectedState ="India"
constructor(
  protected _commonService: CommonService,
  protected _snackbar: MatSnackBar,
  protected _geoService: GeographicalService,
  protected _activateRoute: ActivatedRoute
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
}

  ngOnInit(): void {
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
    this.selectedState = state;
  }
  selectCity(city) {
    console.log('city name', city)
  }

}
