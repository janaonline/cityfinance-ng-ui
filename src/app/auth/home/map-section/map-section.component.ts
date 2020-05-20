import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: "app-map-section",
  templateUrl: "./map-section.component.html",
  styleUrls: ["./map-section.component.scss"],
})
export class MapSectionComponent implements OnInit {
  constructor(
    private geoService: GeographicalService,
    private fb: FormBuilder,
    private assetService: AssetsService,
    private commonService: CommonService
  ) {
    this.initializeform();
    this.fetchDataForMapColoring();
    this.fetchStateList();
    this.fetchDataForVisualization();

    this.fetchCreditRatingTotalCount();
  }
  statesLayer: L.GeoJSON<any>;
  myForm: FormGroup;
  stateSelected: { name: string; _id: string };
  creditRating: { [stateName: string]: number } = {};
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
    financialStatements: number;
    totalMunicipalBonds: number;
    totalULB: number;
  };

  DropdownSettings = {
    singleSelection: true,
    text: "All States",
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
    color: "white",
    fillOpacity: 1,
  };

  previousStateLayer: ILeafletStateClickEvent["target"] = null;

  ngOnInit() {}

  onSelectingStateFromDropDown(state: any | null) {
    this.stateSelected = state;
    this.fetchDataForVisualization(state ? state._id : null);
    this.selectStateOnMap(state);
  }

  private selectStateOnMap(state: IState) {
    this.statesLayer.eachLayer((layer) => {
      const layerName = MapUtil.getStateName(layer);
      if (layerName !== state.name) {
        return;
      }

      this.higlightClickedState(layer);
      if (this.previousStateLayer) {
        this.resetStateLayer(this.previousStateLayer);
      }
      this.previousStateLayer = layer;
    });
  }

  private fetchStateList() {
    this.commonService
      .fetchStateList()
      .subscribe((res) => (this.stateList = res));
  }

  private fetchDataForVisualization(stateId?: string) {
    this.dataForVisualization = null;
    this.commonService
      .fetchDataForHomepageMap(stateId)
      .subscribe((res) => (this.dataForVisualization = res));
  }

  private fetchDataForMapColoring() {
    this.commonService
      .getStateUlbCovered()
      .subscribe((res) => this.onGettingMapColoringData(res["data"]));
  }

  private onGettingMapColoringData(data: IStateULBCoveredResponse["data"]) {
    this.stateDatasForMapColoring = data;
    this.geoService.loadConvertedIndiaGeoData().subscribe((data) => {
      try {
        this.mapGeoData = data;
        this.createNationalLevelMap(data, "mapid");
      } catch (error) {}
    });
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
    const configuration = {
      containerId,
      geoData,
    };
    let map;

    ({ stateLayers: this.statesLayer, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;

    this.statesLayer.eachLayer((layer) => {
      const stateName = MapUtil.getStateName(layer);
      if (!stateName) {
        return;
      }

      const stateFound = this.stateDatasForMapColoring.find(
        (state) => state.name.toLowerCase() === stateName.toLowerCase()
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
        click: (args: ILeafletStateClickEvent) => this.onClickingState(args),
      });
    });
  }

  private createTooltip(layer: L.Layer) {
    const stateName = MapUtil.getStateName(layer);
    const doesStateHasData = !!this.stateDatasForMapColoring.find(
      (state) => state.name === stateName && state.coveredUlbPercentage > 0
    );
    // if (!doesStateHasData) {
    //   return;
    // }

    const option: L.TooltipOptions = {
      sticky: true,
      offset: new L.Point(15, -8),
      zoomAnimation: true,
    };

    layer.bindTooltip("<b>" + stateName + "</b>", option).openTooltip();
  }

  onClickingState(currentStateLayer: ILeafletStateClickEvent) {
    const stateName = MapUtil.getStateName(currentStateLayer);

    if (this.stateSelected && stateName === this.stateSelected.name) {
      this.resetMapToNationalView(currentStateLayer.target);
      return;
    }

    const stateFound = this.stateList.find(
      (state) => state.name.toLowerCase() === stateName.toLowerCase()
    );
    const doesStateHasData = !!this.stateDatasForMapColoring.find(
      (state) => state._id == stateFound._id && state.coveredUlbPercentage > 0
    );
    if (!stateFound) {
      return;
    }
    if (this.previousStateLayer) {
      this.resetStateLayer(this.previousStateLayer);
      this.previousStateLayer = null;
    }
    this.higlightClickedState(currentStateLayer.target);

    this.updateDropdownStateSelection(stateFound);
    this.fetchDataForVisualization(stateFound._id);
    this.previousStateLayer = currentStateLayer.target;
  }

  private resetMapToNationalView(stateLayer) {
    this.resetStateLayer(stateLayer);
    this.previousStateLayer = null;
    this.stateSelected = null;
    this.updateDropdownStateSelection(null);
  }
  private resetStateLayer(layer) {
    layer.setStyle({
      color: this.defaultStateLayerColorOption.color,
      weight: this.defaultStateLayerColorOption.weight,
    });
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
      return "#019CDF";
    }
    if (value > 50) {
      return "#46B7E7";
    }
    if (value > 25) {
      return "#8BD2F0";
    }
    if (value > 0) {
      return `#D0EDF9`;
    }
    return "#E5E5E5";
  }

  private fetchCreditRatingTotalCount() {
    this.assetService
      .fetchCreditRatingReport()
      .subscribe((res) => this.computeStatesTotalRatings(res));
  }

  private computeStatesTotalRatings(res: ICreditRatingData[]) {
    const computedData = { total: 0 };
    res.forEach((data) => {
      if (computedData[data.state] || computedData[data.state] === 0) {
        computedData[data.state] += 1;
      } else {
        computedData[data.state] = 1;
      }
      computedData.total += 1;
    });

    this.creditRating = computedData;
  }

  private initializeform() {
    this.myForm = this.fb.group({
      stateId: [""],
    });
  }
}
