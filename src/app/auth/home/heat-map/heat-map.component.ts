import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';

import { RankingService } from '../../../shared/services/ranking.service';

// import 'leaflet-extra-markers';
declare const $: any;

@Component({
  selector: "app-heat-map",
  templateUrl: "./heat-map.component.html",
  styleUrls: ["./heat-map.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HeatMapComponent implements OnInit {
  overallFilter = "Over 10 Lakh";
  overallList = [
    { id: 2, label: "Less than 50 Thousand", min: 0, max: 49999 },
    {
      id: 3,
      label: "Over 50 Thousand but less than 1 Lakh",
      min: 50000,
      max: 99999,
    },
    {
      id: 4,
      label: "Over 1 Lakh but less than 3 Lakh",
      min: 100000,
      max: 299999,
    },
    {
      id: 5,
      label: "Over 3 Lakh but less than 5 Lakh",
      min: 300000,
      max: 499999,
    },
    {
      id: 6,
      label: "Over 5 Lakh but less than 10 Lakh",
      min: 500000,
      max: 999999,
    },
    { id: 7, label: "Over 10 Lakh", min: 1000000, max: 1000000000000 },
  ];

  ulbsData: any = null;

  mainData: any = null;

  // map
  StatesJSON: any = null;
  DistrictsJSON: any = null;
  map: any = null;
  mapData: any = null;
  colorArr: any = [
    "#00A7D2",
    "#2e8c39",
    "#F39C12",
    "#FF7285",
    "#66d9d9",
    "#0e4b89",
    "#d50028",
  ];

  yellowIcon = L.icon({
    iconUrl: "../../../../assets/images/map-marker.svg",
    iconSize: [20, 20], // size of the icon
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
  });

  showLoader = true;

  constructor(
    private rankingService: RankingService,
    private _geoService: GeographicalService
  ) {
    this.loadMapGeoJson();
  }

  async ngOnInit() {
    // mainData
    await this.getDataViaPopulationId();
  }

  async getDataViaPopulationId() {
    this.showLoader = true;
    this.mainData = null;
    const pop = this.overallList.find((x) => x.label == this.overallFilter);
    const obj = {
      populationId: pop.id,
    };

    await this.rankingService.heatMapFilter(obj).subscribe(async (res: any) => {
      this.mainData = await res.data;
      this.showLoader = false;
      if (this.mainData) {
        await this.loadAllData();
      }
    });
  }

  async openedChange(opened: boolean) {
    if (!opened) {
      await this.getDataViaPopulationId();
    }
  }

  loadAllData() {
    document.getElementById("ulbMap").innerHTML =
      '<div id="mapid" class="h-100" style="background: white;z-index: 8;"></div>';

    const pop = this.overallList.find((x) => x.label == this.overallFilter);

    let filteredData = [];

    // filter Ulb data by population
    if (this.mainData) {
      filteredData = this.filterByOverall([pop], this.mainData.slice());
    }

    // UlbData
    this.ulbsData = filteredData
      .slice()
      .sort((a, b) => a.nationalOverallRanking - b.nationalOverallRanking)
      .map((x) => {
        return {
          id: x._id,
          name: x.name,
          stateId: x.state._id,
          stateName: x.state.name,
          rank: x.nationalOverallRanking,
        };
      })
      .slice(0, 10);

    // mapData
    this.mapData = this.ulbsData.slice().map((x) => {
      return {
        id: x.stateId,
        name: x.stateName,
        ulbName: x.name,
        rank: x.rank,
      };
    });

    // console.log(this.mapData);

    const val = this.mapData.slice();
    const newArr = [];

    val.forEach((val, index) => {
      if (!newArr.some((x) => x.name == val.name)) {
        newArr.push(val);
      } else {
        const ind = newArr.findIndex((x) => x.name == val.name);
        newArr[ind].rank += "," + val.rank;
        newArr[ind].ulbName += "," + val.ulbName;
      }
    });

    // console.log(newArr);

    this.mapData = newArr;

    console.log(this.mapData);

    this.initMap();
  }

  loadMapGeoJson() {
    const prmsArr = [];
    // const prms1 = new Promise((resolve, reject) => {
    //   $.getJSON("../assets/jsonFile/state_boundries.json")
    //     .done((response) => {
    //       // All State JSON Data
    //       this.StatesJSON = response;
    //       resolve();
    //     })
    //     .fail((failed) => {
    //       console.log("State Boundries getJSON request failed!", failed);
    //     });
    // });
    // prmsArr.push(prms1);

    const prms1 = this._geoService.loadConvertedIndiaGeoData().toPromise();
    prmsArr.push(prms1);
    prms1.then((data) => (this.StatesJSON = data));

    const prms2 = new Promise((resolve, reject) => {
      $.getJSON("../assets/jsonFile/updated_district_9_July.json")
        .done((resp) => {
          // All District JSON Data
          this.DistrictsJSON = resp;
          resolve();
        })
        .fail((failed) => {
          console.log("District Boundries getJSON request failed!", failed);
        });
    });
    prmsArr.push(prms2);

    Promise.all(prmsArr).then(async () => {
      // loadMap
      await this.loadAllData();
    });
  }

  initMap() {
    this.map = L.map("mapid", {
      scrollWheelZoom: false,
      dragging: false,
      minZoom: 4.5,
      maxZoom: 4.5,
      zoomControl: false,
    }).setView([20.59, 78.96], 4.499999);

    const stateLayer = L.geoJSON(this.StatesJSON, {
      style: this.stateColorStyle,
    }).addTo(this.map);

    if (stateLayer) {
      this.map.fitBounds(stateLayer.getBounds());
    }

    let coords = [];

    stateLayer.eachLayer((layer: any) => {
      // const center: {
      //   lat: number;
      //   lng: number;
      // } = layer.getBounds().getCenter();
      // const bounds = layer.getBounds();
      // const arr = [
      //   [bounds._northEast.lat, bounds._northEast.lng],
      //   [bounds._southWest.lat, bounds._southWest.lng],
      // ];
      // layer._latlngs.forEach((lay) => {
      //   const exec = lay[0];
      //   let data;
      //   if (exec.length) {
      //     data = lay.map((cord) => {
      //       return cord;
      //     });
      //     coords.push(...data[0]);
      //   } else {
      //     coords.push(exec);
      //   }
      // });

      const centroids = MapUtil.getStateCentroid(layer);

      // coords = coords.map((x) => {
      //   return [x.lat, x.lng];
      // });

      // const cordi = this.getCentroid(
      //   layer._latlngs.flat(Infinity).map((cod) => [cod.lat, cod.lng])
      // );

      const avgCord = { lat: centroids.lat, lng: centroids.lng };

      let tooltip: any = this.mapData.find(
        (data) => data.name == layer.feature.properties.ST_NM.toString()
      );

      if (tooltip) {
        tooltip = tooltip.rank;
      } else {
        tooltip = "";
      }

      layer.setStyle({
        fillOpacity: 1,
        fillColor: this.randomColor(
          layer.feature.properties.ST_NM.toString(),
          avgCord,
          tooltip
        ),
        weight: -1,
        color: "#cccccc",
      });

      layer.on({
        mouseover: () => {
          let obj = null;

          obj = this.mapData.filter(
            (el) => el.name == layer.feature.properties.ST_NM
          )[0];

          // console.log(obj);

          if (obj != undefined) {
            let text =
              "<p>State : <b>" +
              layer.feature.properties.ST_NM +
              "</b></p> <p> <b>";
            let arr = [obj.ulbName];
            let ranks = [obj.rank];
            if (
              obj.ulbName.toString().search(",") != -1 &&
              obj.rank.toString().search(",") != -1
            ) {
              arr = obj.ulbName.split(",");
              ranks = obj.rank.split(",");
            }

            for (const item in arr) {
              if (item == (arr.length - 1).toString()) {
                text += arr[item] + " (" + ranks[item] + ")</b></br> </p>";
              } else {
                text += arr[item] + " (" + ranks[item] + ")</b></br> <b>";
              }
            }

            stateLayer.bindTooltip(text, {
              className: "tooltip-custom",
              opacity: 1,
            });
          } else {
            stateLayer.bindTooltip(
              "<b>" + layer.feature.properties.ST_NM + "</b>"
            );
          }
        },
      });
      coords = [];
    });
  }

  stateColorStyle(feature) {
    return {
      fillColor: "#ffffff",
      // fillColor: getStateColorByStudents(feature.properties.ST_NM),
      weight: 1,
      opacity: 1,
      color: "#ece5e5",
      fillOpacity: 0.7,
    };
  }

  randomColor(stateName, cord, tooltipText) {
    const states = this.mapData.map((x) => x.name);
    const rand = this.colorArr[
      Math.floor(Math.random() * this.colorArr.length)
    ];
    // ||
    //   stateName === "Bihar" ||
    //   stateName === "Goa" ||
    //   stateName === "Haryana" ||
    //   stateName === "Delhi" ||
    //   stateName === "Jammu & Kashmir" ||
    //   stateName === "Himachal Pradesh" ||
    //   stateName === "Gujarat"

    if (states.includes(stateName)) {
      this.colorArr = this.colorArr.filter((color) => color != rand);

      const point = L.point([-10, -10]);

      const marker = L.marker([cord.lat, cord.lng], { icon: this.yellowIcon })
        .bindTooltip("<p>Rank: <b>" + tooltipText + "<b></p>", {
          className: "tooltip-custom-1",
          opacity: 1,
          offset: point,
          permanent: true,
          direction: "top",
        })
        .addTo(this.map);

      return "#059b9a";
    } else {
      return "#e8e8e8";
    }
  }

  getCentroid(arr: number[][]) {
    // arr = arr[0];

    // let minX, maxX, minY, maxY;
    // for (let i = 0; i < arr.length; i++) {
    //   minX = arr[i][0] < minX || minX == null ? arr[i][0] : minX;
    //   maxX = arr[i][0] > maxX || maxX == null ? arr[i][0] : maxX;
    //   minY = arr[i][1] < minY || minY == null ? arr[i][1] : minY;
    //   maxY = arr[i][1] > maxY || maxY == null ? arr[i][1] : maxY;
    // }
    // return [(minX + maxX) / 2, (minY + maxY) / 2];

    return arr.reduce(
      function (x, y) {
        return [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length];
      },
      [0, 0]
    );

    let twoTimesSignedArea = 0;
    let cxTimes6SignedArea = 0;
    let cyTimes6SignedArea = 0;

    const length = arr.length;

    const x = function (i) {
      return arr[i % length][0];
    };
    const y = function (i) {
      return arr[i % length][1];
    };

    for (let i = 0; i < arr.length; i++) {
      const twoSA = x(i) * y(i + 1) - x(i + 1) * y(i);

      twoTimesSignedArea += twoSA;
      cxTimes6SignedArea += (x(i) + x(i + 1)) * twoSA;
      cyTimes6SignedArea += (y(i) + y(i + 1)) * twoSA;
    }
    const sixSignedArea = 3 * twoTimesSignedArea;

    const latitude = cxTimes6SignedArea / sixSignedArea,
      longitude = cyTimes6SignedArea / sixSignedArea;

    return [latitude, longitude];
  }

  // common functions
  // check range between
  between(x, min, max) {
    return x >= min && x <= max;
  }
  filterByOverall(keys: any = [], dataInput: any = []) {
    const filteredData = [];

    for (let i = 0; i < keys.length; i++) {
      const values = dataInput
        .map((row) => {
          if (this.between(row.population, keys[i].min, keys[i].max)) {
            return row;
          }
          return;
        })
        .filter((item) => item);
      filteredData.push(...values);
    }
    return filteredData;
  }
}
