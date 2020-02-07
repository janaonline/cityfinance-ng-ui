import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IMapData } from 'src/app/auth/home/heat-map/models/mapData';

@Component({
  selector: "app-re-useable-heat-map",
  templateUrl: "./re-useable-heat-map.component.html",
  styleUrls: ["./re-useable-heat-map.component.scss"]
})
export class ReUseableHeatMapComponent implements OnInit {
  mapData: IMapData[] = [
    { id: "12344", name: `First name`, count: 80 },
    { id: "asd", name: `First name`, count: 0 },
    { id: "12asd344", name: `First name`, count: 8 },
    { id: "12asd344", name: `First name`, count: 51 },
    { id: "12asd344", name: `First name`, count: 20 }
  ];
  map: L.Map;
  StatesJSONForMapCreation: any;
  colorArr = [
    "#00A7D2",
    "#2e8c39",
    "#F39C12",
    "#FF7285",
    "#66d9d9",
    "#0e4b89",
    "#d50028"
  ];

  yellowIcon = L.icon({
    iconUrl: "./assets/images/map-marker.svg",
    iconSize: [20, 20], // size of the icon
    iconAnchor: [20, 20] // point of the icon which will correspond to marker's location
  });

  constructor() {
    this.loadMapGeoJson().then(res => {
      // initializeMap
      this.initMap();
    });
    // map the data.
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

    return Promise.all(prmsArr);
  }

  initMap() {
    this.map = L.map("mapid", {
      scrollWheelZoom: false,
      dragging: false,
      minZoom: 4.5,
      maxZoom: 4.5,
      zoomControl: false
    }).setView([20.59, 78.96], 4.499999);

    const stateLayer = L.geoJSON(this.StatesJSONForMapCreation, {
      style: this.stateColorStyle
    }).addTo(this.map);

    if (stateLayer) {
      this.map.fitBounds(stateLayer.getBounds());
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

      // console.log(avgCord, layer.feature.properties.ST_NM);

      let tooltip: any = this.mapData[0];

      if (tooltip) {
        tooltip = tooltip.count;
      } else {
        tooltip = "";
      }

      layer.setStyle({
        fillOpacity: 1,
        fillColor: this.getColorBasedOnPercentage(tooltip),
        weight: -1,
        color: "#cccccc"
      });

      layer.on({
        mouseover: () => this.createTooltip(layer, stateLayer),
        click: () => this.onClickingState("stateId will be here")
      });
      coords = [];
    });
  }

  private createTooltip(layer, stateLayer) {
    let obj: IMapData = null;
    obj = this.mapData[0];
    if (obj != undefined) {
      let text =
        "<p>State : <b>" + layer.feature.properties.ST_NM + "</b></p> <p> <b>";
      const arr = [obj.name];
      const ranks = [obj.count];
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

  private onClickingState(stateId: string) {
    console.log("asdasd");
  }

  getColorBasedOnPercentage(value: number) {
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

  getCentroid(arr) {
    return arr.reduce(
      function(x, y) {
        return [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length];
      },
      [0, 0]
    );
  }

  stateColorStyle(feature) {
    return {
      fillColor: "#ffffff",
      // fillColor: getStateColorByStudents(feature.properties.ST_NM),
      weight: 1,
      opacity: 1,
      color: "#ece5e5",
      fillOpacity: 0.7
    };
  }
}
