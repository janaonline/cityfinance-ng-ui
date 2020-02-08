import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';

import { IStateULBCovered } from '../../models/stateUlbConvered';
import { IULBWithPopulationResponse } from '../../models/ulbsForMapResponse';
import { CommonService } from '../../services/common.service';
import { IDistrictGeoJson } from './models/districtGeoJSON';
import { ILeafletStateClickEvent } from './models/leafletStateClickEvent';

@Component({
  selector: "app-re-useable-heat-map",
  templateUrl: "./re-useable-heat-map.component.html",
  styleUrls: ["./re-useable-heat-map.component.scss"]
})
export class ReUseableHeatMapComponent implements OnInit {
  @Output() ulbsClicked = new EventEmitter<string[]>();

  ulbsSelected = new FormControl([]);
  stateData: IStateULBCovered[];
  ulbList: IULBWithPopulationResponse["data"];
  nationalLevelMap: L.Map;
  StatesJSONForMapCreation: any;
  DistrictsJSONForMapCreation: IDistrictGeoJson;
  colorArr = [
    "#00A7D2",
    "#2e8c39",
    "#F39C12",
    "#FF7285",
    "#66d9d9",
    "#0e4b89",
    "#d50028"
  ];

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

  constructor(private _commonService: CommonService) {
    this._commonService.getStateUlbCovered().subscribe(res => {
      this.stateData = res.data;
      this.loadMapGeoJson().then(res => {
        // initializeMap
        this.createAllStateMap();

        // map the data.
      });
    });

    this._commonService.getULBSWithPopulationAndCoordinates().subscribe(res => {
      this.ulbList = res.data;
    });

    this.ListenToFormControls();
  }

  private ListenToFormControls() {
    this.ulbsSelected.valueChanges.subscribe(newValue => {
      console.log(newValue);
    });
  }

  ngOnInit() {}

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

  createAllStateMap() {
    this.nationalLevelMap = L.map("mapid", {
      scrollWheelZoom: false,
      dragging: false,
      minZoom: 4.5,
      maxZoom: 4.5,
      zoomControl: false,
      doubleClickZoom: false,
      maxBounds: [
        [-5, -5],
        [50, 700]
      ],
      tap: false,
      trackResize: false,
      zoomSnap: 6
    }).setView([20.59, 78.96], 4.499999);
    // this.allStatesMap.dragging.disable();
    // this.allStatesMap.addEventListener("autopanstart", () =>
    //   console.log("paing")
    // );

    // L.DomEvent.disableClickPropagation(document.getElementById("mapid"));
    // L.DomEvent.removeListener(document.getElementById("mapid"), "move", () =>
    //   console.log("removed")
    // );

    // this.allStatesMap.addEventListener("dragstart", () => console.log("drag"));
    // this.allStatesMap.addEventListener("locationfound", () =>
    //   console.log("locationfound")
    // );
    // this.allStatesMap.addEventListener("'move", () => console.log("movestart"));
    // this.allStatesMap.addEventListener("viewreset", () =>
    //   console.log("viewreset")
    // );

    // this.allStatesMap

    const stateLayer = L.geoJSON(this.StatesJSONForMapCreation, {
      style: this.stateColorStyle
    }).addTo(this.nationalLevelMap);

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
        weight: -1,
        color: "#cccccc"
      });

      layer.on({
        mouseover: () => this.createTooltip(layer, stateLayer),
        click: (args: ILeafletStateClickEvent) => this.onClickingState(args)
      });
      coords = [];
    });
  }

  private createTooltip(layer, stateLayer) {
    let obj: IStateULBCovered = null;
    const stateId = (<ILeafletStateClickEvent["sourceTarget"]>layer).feature
      .properties.ST_NM;
    const stateFound = this.stateData.find(state => state.name === stateId);

    obj = stateFound;
    if (obj != undefined) {
      let text =
        "<p>State : <b>" + layer.feature.properties.ST_NM + "</b></p> <p> <b>";

      const arr = [obj.name];
      const ranks = [obj.coveredUlbPercentage];

      for (const item in arr) {
        if (item == (arr.length - 1).toString()) {
          text += arr[item] + " (" + ranks[item] + ")</b></br> </p>";
        } else {
          text += arr[item] + " (" + ranks[item] + ")</b></br> <b>";
        }
      }

      stateLayer.bindTooltip(text, {
        className: "tooltip-custom",
        opacity: 0.8
      });
    } else {
      stateLayer.bindTooltip("<b>" + layer.feature.properties.ST_NM + "</b>");
    }
  }

  private onClickingState(mapClickEvent: ILeafletStateClickEvent) {
    this.nationalLevelMap = this.nationalLevelMap;
    this.convertDomToMiniMap("mapid");
    const stateFound = this.stateData.find(
      state =>
        state.name === mapClickEvent.sourceTarget.feature.properties.ST_NM
    );
    if (!stateFound) {
      return false;
    }

    const filteredULBS = this.ulbList.filter(
      ulb => ulb.state === stateFound._id
    );
    filteredULBS[0].location = <any>{ ...mapClickEvent.latlng };

    const filteredDistricts = this.DistrictsJSONForMapCreation.features.filter(
      districts => districts.properties.ST_NM === stateFound.name
    );

    const newObj: IDistrictGeoJson = {
      type: "FeatureCollection",
      features: filteredDistricts
    };

    this.resetSelectULBS();
    this.createDistrictMap(newObj, {
      center: { ...mapClickEvent.latlng },
      dataPoints: [{ ...filteredULBS[0].location, name: filteredULBS[0].name }]
    });
  }

  private convertDomToMiniMap(domId: string) {
    document.getElementById(domId).classList.add("miniMap");
    console.log("converted to miniMap");
  }

  private createDistrictMap(
    districtGeoJSON,
    options: {
      center: ILeafletStateClickEvent["latlng"];
      dataPoints: { lat: string; lng: string; name: string }[];
    }
  ) {
    this.clearDistrictMapContainer();

    setTimeout(() => {
      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: false,
        dragging: false,
        minZoom: 6,
        maxZoom: 6,
        zoomControl: false,
        doubleClickZoom: false
      }).setView([options.center.lat, options.center.lng], 6);

      const districtLayer = L.geoJSON(districtGeoJSON, {
        style: this.stateColorStyle
      }).addTo(districtMap);

      if (districtLayer) {
        this.nationalLevelMap.fitBounds(districtLayer.getBounds());
      }

      options.dataPoints.forEach(dataPoint => {
        this.createDistrictMarker({ ...dataPoint, icon: this.blueIcon }).addTo(
          districtMap
        );
      });
    }, 0);
  }

  private resetSelectULBS() {
    this.ulbsSelected.setValue([]);
  }

  private createDistrictMarker(dataPoint: {
    lat: string;
    lng: string;
    name: string;
    icon: L.Icon<L.IconOptions>;
  }) {
    const marker = L.marker([+dataPoint.lat, +dataPoint.lng], {
      icon: dataPoint.icon,
      interactive: true,
      bubblingMouseEvents: true
    })
      .bindTooltip(`<p> ${dataPoint.name} </p>`, {
        className: "tooltip-custom-1",
        opacity: 1,
        permanent: false,
        direction: "top",
        offset: [0, -20]
      })
      .on(
        "click",
        values =>
          this.onDistrictMarkerClick(<L.LeafletMouseEvent>values, marker),
        this
      );
    return marker;
  }

  private onDistrictMarkerClick = (
    values: L.LeafletMouseEvent,
    marker: L.Marker
  ) => {
    const ulbFound = this.ulbList.find(
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
      return "8BD2F0";
    }
    return `#D0EDF9`;
  }

  private getCentroid(arr) {
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

  private filterDistritListByLatLong() {
    // return this.DistrictsJSONForMapCreation.;
  }

  private clearDistrictMapContainer() {
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="h-100"
    style="background: white;z-index: 8; display: inline-block; width: 100%;"
  ></div>`;
  }

  // createRandomNumber(max: number, min: number) {
  //   return Math.round(Math.random() * Math.abs(max - min) + min);
  // }
}
