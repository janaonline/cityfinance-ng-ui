import { Component, NgZone, OnInit } from '@angular/core';
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
    private commonService: CommonService,
    private _ngZone: NgZone
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
    color: "white",
    fillOpacity: 1,
  };

  previousStateLayer: ILeafletStateClickEvent["sourceTarget"] | L.Layer = null;

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

      if (this.previousStateLayer) {
        this.resetStateLayer(this.previousStateLayer);
      }
      this.higlightClickedState(layer);

      this.previousStateLayer = layer;
    });
  }

  private fetchStateList() {
    this.commonService.fetchStateList().subscribe((res) => {
      this.stateList = [{ _id: "", name: "India" }].concat(
        res.filter(
          (state) =>
            !(
              state.name === "Andaman & Nicobar Island" ||
              state.name === "Arunanchal Pradesh" ||
              state.name === "Dadara & Nagar Havelli" ||
              state.name === "Lakshadweep"
            )
        )
      );
    });
  }

  private fetchDataForVisualization(stateId?: string) {
    this.dataForVisualization = null;
    this.commonService.fetchDataForHomepageMap(stateId).subscribe((res) => {
      this.dataForVisualization = { ...res };
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.animateValues(1);
        });
      });
    });
  }

  public animateValues = (startiongValue?: number) => {
    const speed = 460;
    const interval = 50;

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
    let zoom = 4.62;

    zoom += 1 - window.devicePixelRatio;

    const configuration: IMapCreationConfig = {
      containerId,
      geoData,
      options: {
        zoom,
        maxZoom: zoom,
        minZoom: zoom,
      },
    };
    let map;

    ({ stateLayers: this.statesLayer, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;
    this.createLegendsForNationalLevelMap();

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
        click: (args: ILeafletStateClickEvent) =>
          this.onClickingState(args, layer),
      });
    });
  }

  private createLegendsForNationalLevelMap() {
    const arr = [
      { color: "#019CDF", text: "76%-100%" },
      { color: "#46B7E7", text: "51%-75%" },
      { color: "#8BD2F0", text: "26%-50%" },
      { color: "#D0EDF9", text: "1%-25%" },
      { color: "#E5E5E5", text: "0%" },
    ];
    const legend = new L.Control({ position: "bottomleft" });
    const labels = [
      `<span style="width: 100%; display: block;" class="text-center">% of Data Availability on Cityfinance.in</span>`,
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

    // layer.bindTooltip("<b>" + stateName + "</b>", option).openTooltip();
    layer.bindTooltip("<b>" + stateName + "</b>", option);
    layer.toggleTooltip();
  }

  onClickingState(currentStateLayer: ILeafletStateClickEvent, layer: L.Layer) {
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
    this.selectStateOnMap(stateFound);
    // const state = this.stateList.find(state => state.name === )

    // if (this.previousStateLayer) {
    //   this.resetStateLayer(this.previousStateLayer);
    //   (this.previousStateLayer as any).closePopup();
    //   // (this.previousStateLayer as any).closeTooltip();
    //   this.previousStateLayer = null;
    // }
    // this.higlightClickedState(layer);

    this.updateDropdownStateSelection(stateFound);
    this.fetchDataForVisualization(stateFound._id);

    // this.previousStateLayer = layer;
  }

  private resetMapToNationalView(stateLayer) {
    this.resetStateLayer(stateLayer);
    this.previousStateLayer = null;
    this.stateSelected = null;
    this.updateDropdownStateSelection(null);
    this.fetchDataForVisualization();
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
    // this.createTooltip(stateLayer);
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

  private initializeform() {
    this.myForm = this.fb.group({
      stateId: [""],
    });
  }
}
