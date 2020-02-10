import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as L from 'leaflet';

import { IStateULBCovered, IStateULBCoveredResponse } from '../../models/stateUlbConvered';
import { IULBWithPopulationResponse, ULBWithMapData } from '../../models/ulbsForMapResponse';
import { CommonService } from '../../services/common.service';
import { IDistrictGeoJson } from './models/districtGeoJSON';
import { ILeafletStateClickEvent } from './models/leafletStateClickEvent';

@Component({
  selector: "app-re-useable-heat-map",
  templateUrl: "./re-useable-heat-map.component.html",
  styleUrls: ["./re-useable-heat-map.component.scss"]
})
export class ReUseableHeatMapComponent implements OnInit {
  constructor(
    private _commonService: CommonService,
    private _snackbar: MatSnackBar
  ) {
    this._commonService
      .getStateUlbCovered()
      .subscribe(res => this.onGettingStateULBCoveredSuccess(res));

    this._commonService
      .getULBSWithPopulationAndCoordinates()
      .subscribe(res => this.onGettingULBWithPopulationSuccess(res));

    this.listenToFormControls();
  }
  @Output() ulbsClicked = new EventEmitter<string[]>();

  ulbsSelected = new FormControl([]);
  ulbFilterControl = new FormControl();

  stateData: IStateULBCovered[];
  allULBSList: IULBWithPopulationResponse["data"];

  ulbsOfSelectedState: IULBWithPopulationResponse["data"];
  ulbListForAutoCompletion: IULBWithPopulationResponse["data"];

  nationalLevelMap: L.Map;
  StatesJSONForMapCreation: any;
  DistrictsJSONForMapCreation: IDistrictGeoJson;

  blueIcon = L.icon({
    iconUrl: "./assets/images/maps/simple_blue_dot.png",
    iconSize: [10, 10],
    iconAnchor: [20, 20]
  });

  yellowIcon = L.icon({
    iconUrl: "./assets/images/maps/simple_yellow_dot.png",
    iconSize: [10, 10],
    iconAnchor: [20, 20]
  });

  mouseHoverOnState: IStateULBCovered;
  mouseHoveredOnULB: any;

  currentStateInView: IStateULBCovered;

  ngOnInit() {}

  onSelectingULBFromDropdown(ulbName: string) {
    this.selectULBByName(ulbName);
    const stateOfULB = this.getStateOfULB(ulbName);

    if (!this.DistrictsJSONForMapCreation) {
      this.showDistrictMapNotLaodedWarning();
    }
    if (stateOfULB) {
      this.convertDomToMiniMap("mapid");
      this.createStateLevelMap(stateOfULB.name);
    }
  }

  private showDistrictMapNotLaodedWarning() {
    this._snackbar.open(
      `District map is still being loaded. Please try after some time.`,
      null,
      {
        duration: 5000,
        verticalPosition: "bottom"
      }
    );
  }

  selectULBByName(ulbName: string) {
    const ulbFound = this.ulbsOfSelectedState.find(ulb => ulb.name === ulbName);
    if (!ulbFound) {
      return false;
    }
    const ulbsAlreadySelect = <string[]>this.ulbsSelected.value;
    ulbsAlreadySelect.push(ulbFound._id);
    this.ulbsSelected.setValue(ulbsAlreadySelect);
  }

  loadMapGeoJson() {
    const prmsArr = [];
    const prms1 = new Promise((resolve, reject) => {
      $.getJSON("../assets/jsonFile/state_boundries.json")
        .done(response => {
          this.StatesJSONForMapCreation = response;
          resolve();
        })
        .fail(failed => {
          console.error("State Boundries getJSON request failed!", failed);
        });
    });
    prmsArr.push(prms1);

    // All District JSON Data
    const prms2 = new Promise((resolve, reject) => {
      $.getJSON("../assets/jsonFile/updated_district_9_July.json")
        .done(resp => {
          this.DistrictsJSONForMapCreation = resp;
          resolve();
        })
        .fail(failed => {
          console.error("District Boundries getJSON request failed!", failed);
        });
    });
    prmsArr.push(prms2);

    return Promise.all(prmsArr);
  }

  createNationalLevelMap() {
    this.nationalLevelMap = L.map("mapid", {
      scrollWheelZoom: false,
      dragging: false,
      minZoom: 4,
      maxZoom: 4,
      zoomControl: false,
      doubleClickZoom: false,
      maxBounds: [
        [-5, -5],
        [50, 700]
      ],
      tap: false,
      trackResize: false,
      zoomSnap: 6
    }).setView([20.59, 78.96], 1.499999);
    const stateLayer = L.geoJSON(this.StatesJSONForMapCreation, {
      style: this.stateColorStyle
    }).addTo(this.nationalLevelMap);
    this.createLegendsForNationalLevelMap();
    this.createControls(this.nationalLevelMap);

    if (stateLayer) {
      this.nationalLevelMap.fitBounds(stateLayer.getBounds());
    }

    let coords = [];

    stateLayer.eachLayer((layer: any) => {
      layer._latlngs.forEach(lay => {
        const exec = lay[0];
        let data;
        if (exec.length) {
          data = lay.map(cord => {
            return cord;
          });
          coords.push(...data[0]);
        } else {
          coords.push(exec);
        }
      });

      coords = coords.map(x => {
        return [x.lat, x.lng];
      });

      const cordi = this.getCentroid(coords);

      const avgCord = { lat: cordi[0], lng: cordi[1] };
      let count: number;
      const stateId = (<ILeafletStateClickEvent["sourceTarget"]>layer).feature
        .properties.ST_NM;
      const stateFound = this.stateData.find(state => state.name === stateId);
      count = stateFound ? stateFound.coveredUlbPercentage : 0;

      layer.setStyle({
        fillOpacity: 1,
        fillColor: this.getColorBasedOnPercentage(count),
        weight: -1
      });

      layer.on({
        mouseover: () => this.createTooltip(layer, stateLayer),
        click: (args: ILeafletStateClickEvent) => this.onClickingState(args),
        mouseout: () => (this.mouseHoverOnState = null)
      });
      coords = [];
    });
  }

  private listenToFormControls() {
    this.ulbsSelected.valueChanges.subscribe(newValue => {
      this.ulbsClicked.emit(newValue);
      console.log(`ulbsId to emit`, [...newValue]);
    });

    this.ulbFilterControl.valueChanges.subscribe(newText => {
      let filteredULBS: ULBWithMapData[];
      if (newText && newText.trim()) {
        filteredULBS = this.ulbsOfSelectedState.filter(ulb =>
          ulb.name.includes(newText)
        );
      } else {
        filteredULBS = [...this.ulbsOfSelectedState];
      }
      this.ulbListForAutoCompletion = filteredULBS;
    });
  }

  private getStateOfULB(ulbName: string) {
    const ulbFound = this.ulbsOfSelectedState.find(ulb => ulb.name === ulbName);
    if (!ulbFound) {
      return false;
    }
    const stateFound = this.stateData.find(
      state => state._id === ulbFound.state
    );
    return stateFound;
  }

  private onGettingULBWithPopulationSuccess(res: IULBWithPopulationResponse) {
    this.allULBSList = res.data;
    this.ulbsOfSelectedState = res.data;
    this.ulbListForAutoCompletion = res.data;
  }

  private onGettingStateULBCoveredSuccess(res: IStateULBCoveredResponse) {
    this.stateData = res.data;
    this.loadMapGeoJson().then(res => {
      this.createNationalLevelMap();
    });
  }

  private createTooltip(layer, stateLayer) {
    let obj: IStateULBCovered = null;
    const stateId = (<ILeafletStateClickEvent["sourceTarget"]>layer).feature
      .properties.ST_NM;
    const stateFound = this.stateData.find(state => state.name === stateId);

    obj = stateFound;
    if (obj != undefined) {
      this.mouseHoverOnState = obj;
      const text =
        "<p>State : <b>" + layer.feature.properties.ST_NM + "</b></p> <p> <b>";
    } else {
      stateLayer.bindTooltip("<b>" + layer.feature.properties.ST_NM + "</b>");
    }
  }

  private createLegendsForNationalLevelMap() {
    const arr = [
      { color: "#019CDF", text: "75-100%" },
      { color: "#46B7E7", text: "50-75%" },
      { color: "#8BD2F0", text: "25-50%" },
      { color: "#D0EDF9", text: "0-25%" }
    ];
    const legend = new L.Control({ position: "bottomright" });
    const labels = [];
    legend.onAdd = function(map) {
      const div = L.DomUtil.create("div", "info legend");
      div.style.width = "100%";
      arr.forEach(value => {
        labels.push(
          `<span><i class="circle" style="background: ${value.color}; padding:8%; display: inline-block"> </i> ${value.text}</span>`
        );
      });
      div.innerHTML = labels.join(`<br>`);
      return div;
    };

    legend.addTo(this.nationalLevelMap);
  }

  private createControls(map: L.Map) {
    const info = new L.Control({ position: "topright" });
    info.onAdd = function(map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };
    // console.log(info.getContainer().);

    // info.update = function(props) {
    //   this._div.innerHTML =
    //     "<h4>US Population Density</h4>" +
    //     (props
    //       ? "<b>" +
    //         props.name +
    //         "</b><br />" +
    //         props.density +
    //         " people / mi<sup>2</sup>"
    //       : "Hover over a state");
    //   info.addTo(map);
    // };
  }

  private onClickingState(mapClickEvent: ILeafletStateClickEvent) {
    if (!this.DistrictsJSONForMapCreation) {
      this.showDistrictMapNotLaodedWarning();
    }
    this.convertDomToMiniMap("mapid");
    this.createStateLevelMap(
      mapClickEvent.sourceTarget.feature.properties.ST_NM
    );
  }

  private createStateLevelMap(stateName: string) {
    const stateFound = this.stateData.find(state => state.name === stateName);
    if (!stateFound) {
      return false;
    }
    this.currentStateInView = stateFound;
    this.ulbsOfSelectedState = this.allULBSList.filter(
      ulb => ulb.state === stateFound._id
    );
    this.ulbListForAutoCompletion = this.ulbsOfSelectedState;
    const ulbsWithCoordinates = this.ulbsOfSelectedState.filter(
      ulb =>
        parseFloat(ulb.location.lat) !== NaN &&
        parseFloat(ulb.location.lng) !== NaN
    );
    const centerLatLngOfState = this.getCentroid(
      ulbsWithCoordinates.map(ulb => [+ulb.location.lat, +ulb.location.lng])
    );

    ulbsWithCoordinates[0].location = <any>{
      lat: centerLatLngOfState[0],
      lng: centerLatLngOfState[1]
    };

    const filteredDistricts = this.DistrictsJSONForMapCreation.features.filter(
      districts => districts.properties.ST_NM === stateFound.name
    );
    const newObj: IDistrictGeoJson = {
      type: "FeatureCollection",
      features: filteredDistricts
    };
    const dataPointsForMarker = ulbsWithCoordinates.map(ulb => ({
      ...ulb.location,
      name: ulb.name,
      area: ulb.area,
      population: ulb.population
    }));
    this.resetULBsSelected();
    this.createDistrictMap(newObj, {
      center: { lat: centerLatLngOfState[0], lng: centerLatLngOfState[1] },
      dataPoints: [...dataPointsForMarker]
    });
  }

  private convertDomToMiniMap(domId: string) {
    const element = document.getElementById(domId);
    if (element.classList.contains("miniMap")) {
      return false;
    }
    element.classList.add("miniMap");

    const newElement = document.createElement("div");
    newElement.classList.add("miniMapOverlay");
    element.appendChild(newElement);

    return true;
  }

  private createDistrictMap(
    districtGeoJSON,
    options: {
      center: ILeafletStateClickEvent["latlng"];
      dataPoints: {
        lat: string;
        lng: string;
        name: string;
        area: number;
        population: number;
      }[];
    }
  ) {
    this.clearDistrictMapContainer();

    setTimeout(() => {
      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: true,
        fadeAnimation: true,
        dragging: false,
        minZoom: 4.2,
        maxZoom: 5.5,
        zoomControl: true,
        doubleClickZoom: false
      }).setView([options.center.lat, options.center.lng], 5.5);

      const districtLayer = L.geoJSON(districtGeoJSON, {
        style: this.stateColorStyle
      }).addTo(districtMap);

      if (districtLayer) {
        districtMap.fitBounds(districtLayer.getBounds());
      }

      options.dataPoints.forEach(dataPoint => {
        const marker = this.createDistrictMarker({
          ...dataPoint,
          icon: this.blueIcon
        }).addTo(districtMap);
        marker.on("mouseover", () => (this.mouseHoveredOnULB = dataPoint));
        marker.on("mouseout", () => (this.mouseHoveredOnULB = null));
        marker.on(
          "click",
          values =>
            this.onDistrictMarkerClick(<L.LeafletMouseEvent>values, marker),
          this
        );
      });
    }, 0);
  }

  private resetULBsSelected() {
    this.ulbsSelected.setValue([]);
  }

  private createDistrictMarker(dataPoint: {
    lat: string;
    lng: string;
    name: string;
    area: number;
    population: number;
    icon: L.Icon<L.IconOptions>;
  }) {
    const marker = L.marker([+dataPoint.lat, +dataPoint.lng], {
      icon: dataPoint.icon,
      interactive: true,
      bubblingMouseEvents: true
    });
    return marker;
  }

  private onDistrictMarkerClick = (
    values: L.LeafletMouseEvent,
    marker: L.Marker
  ) => {
    const ulbFound = this.allULBSList.find(
      ulb =>
        +ulb.location.lat === values.latlng.lat &&
        +ulb.location.lng === values.latlng.lng
    );
    if (!ulbFound) {
      return false;
    }
    const ulbAlreadySelect = !!this.ulbsSelected.value.find(
      id => id === ulbFound._id
    );
    let newValues: string[];
    if (ulbAlreadySelect) {
      newValues = this.ulbsSelected.value.filter(id => id !== ulbFound._id);
      marker.setIcon(this.blueIcon);
    } else {
      marker.setIcon(this.yellowIcon);
      newValues = <string[]>this.ulbsSelected.value;
      newValues.push(ulbFound._id);
    }
    this.ulbsSelected.setValue(newValues);
  };

  private getColorBasedOnPercentage(value: number) {
    if (value >= 75) {
      return "#019CDF";
    }
    if (value >= 50) {
      return "#46B7E7";
    }
    if (value >= 25) {
      return "#8BD2F0";
    }
    return `#D0EDF9`;
  }

  /**
   * @param arr 0th index = Latitude, 1st Index = Longitude
   * @returns [latitude, longitude]
   */
  private getCentroid(arr: number[][]) {
    return arr.reduce(
      function(x, y) {
        return [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length];
      },
      [0, 0]
    );
  }

  private stateColorStyle(feature) {
    return {
      fillColor: "#E5E5E5",
      weight: 1,
      opacity: 1,
      color: "#ece5e5",
      fillOpacity: 0.7
    };
  }

  private resetMapToNationalLevel() {
    // Convert miniMap back to original state.

    this.resetULBsSelected();
    this.resetulbsOfSelectedState();
    this.resetULBForAutoCompletion();
  }

  private resetulbsOfSelectedState() {
    this.ulbsOfSelectedState = [...this.allULBSList];
  }

  private resetULBForAutoCompletion() {
    this.ulbListForAutoCompletion = this.ulbsOfSelectedState;
  }

  private clearDistrictMapContainer() {
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="h-60 col-sm-12"
    style="background: white;z-index: 8; display: inline-block; width: 100%;height: 60vh"
  ></div>`;
  }
}
