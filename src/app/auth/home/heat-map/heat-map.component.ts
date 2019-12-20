import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as L from "leaflet";
import "leaflet-extra-markers";
import { RankingService } from "../../../shared/services/ranking.service";
import { GlobalLoaderService } from "../../../shared/services/loaders/global-loader.service";

declare const $: any;

@Component({
  selector: "app-heat-map",
  templateUrl: "./heat-map.component.html",
  styleUrls: ["./heat-map.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HeatMapComponent implements OnInit {
  overallFilter = 'Over 10 Lakh';
  overallList = [
    { id: 2, label: "Less than 50 Thousand", min: 0, max: 49999 },
    { id: 3, label: "Over 50 Thousand but less than 1 Lakh", min: 50000, max: 99999 },
    { id: 4, label: "Over 1 Lakh but less than 3 Lakh", min: 100000, max: 299999 },
    { id: 5, label: "Over 3 Lakh but less than 5 Lakh", min: 300000, max: 499999 },
    { id: 6,label: "Over 5 Lakh but less than 10 Lakh", min: 500000, max: 999999 },
    { id: 7, label: "Over 10 Lakh", min: 1000000, max: 1000000000000 }
  ];

  ulbsData: any = null;

  mainData: any = null;

  //map
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
    "#d50028"
  ];

  yellowIcon = L.icon({
    iconUrl: "../../../../assets/images/map-marker.svg",
    iconSize: [20, 20], // size of the icon
    iconAnchor: [20, 20] // point of the icon which will correspond to marker's location
  });

  showLoader:boolean = true;

  constructor(private rankingService: RankingService, private loaderService:GlobalLoaderService) {
    this.loadMapGeoJson();
  }

  async ngOnInit() {
    //mainData
    await this.getDataViaPopulationId();
  }

  async getDataViaPopulationId() {
    this.showLoader = true;
    this.mainData = null;
    let pop = this.overallList.find(x => x.label == this.overallFilter);
    let obj = {
      populationId: pop.id
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

    let pop = this.overallList.find(x => x.label == this.overallFilter);

    let filteredData = [];

    //filter Ulb data by population
    if(this.mainData){
      filteredData = this.filterByOverall([pop], this.mainData.slice());
    }

    //UlbData
    this.ulbsData = filteredData
      .slice()
      .sort((a, b) => a.nationalOverallRanking - b.nationalOverallRanking)
      .map(x => {
        return {
          id: x._id,
          name: x.name,
          stateId: x.state._id,
          stateName: x.state.name,
          rank: x.nationalOverallRanking
        };
      })
      .slice(0, 10);

    //mapData
    this.mapData = this.ulbsData.slice().map(x => {
      return {
        id: x.stateId,
        name: x.stateName,
        ulbName: x.name,
        rank: x.rank
      };
    });

    // console.log(this.mapData);

    let val = this.mapData.slice();
    let newArr = [];

    val.forEach((val, index) => { 
      if (!newArr.some(x => x.name == val.name)) { 
        newArr.push(val);
      } 
      else { 
        let ind = newArr.findIndex(x => x.name == val.name);
        newArr[ind].rank += ',' + val.rank;
        newArr[ind].ulbName += ',' + val.ulbName;
      } 
    });

    // console.log(newArr);

    this.mapData = newArr;

    console.log(this.mapData);


    this.initMap();
  }

  loadMapGeoJson() {
    let prmsArr = [];
    let prms1 = new Promise((resolve, reject) => {
      $.getJSON("../assets/jsonFile/state_boundries.json")
        .done(response => {
          //All State JSON Data
          this.StatesJSON = response;
          resolve();
        })
        .fail(failed => {
          console.log("State Boundries getJSON request failed!", failed);
        });
    });
    prmsArr.push(prms1);

    let prms2 = new Promise((resolve, reject) => {
      $.getJSON("../assets/jsonFile/updated_district_9_July.json")
        .done(resp => {
          //All District JSON Data
          this.DistrictsJSON = resp;
          resolve();
        })
        .fail(failed => {
          console.log("District Boundries getJSON request failed!", failed);
        });
    });
    prmsArr.push(prms2);

    Promise.all(prmsArr).then(async () => {
      //loadMap
      await this.loadAllData();
    });
  }

  initMap() {
    this.map = L.map("mapid", {
      scrollWheelZoom: false,
      dragging: false,
      minZoom: 4.5,
      maxZoom: 4.5,
      zoomControl: false
    }).setView([20.59, 78.96], 4.499999);

    let stateLayer = L.geoJSON(this.StatesJSON, {
      style: this.stateColorStyle
    }).addTo(this.map);

    if (stateLayer) {
      this.map.fitBounds(stateLayer.getBounds());
    }

    let coords = [];

    stateLayer.eachLayer((layer: any) => {
      // console.log(layer.getBounds().getCenter());
      layer._latlngs.forEach(lay => {
        let exec = lay[0];
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
        return [ x.lat, x.lng ];
      })

      let cordi = this.getCentroid(coords);

      let avgCord = { lat: cordi[0], lng: cordi[1] };

      // console.log(avgCord, layer.feature.properties.ST_NM);

      let tooltip: any = this.mapData.find(
        data => data.name == layer.feature.properties.ST_NM.toString()
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
        color: "#cccccc"
      });

      layer.on({
        mouseover: () => {
          let obj = null;
          // console.log(this.mapData);

          obj = this.mapData.filter(
            el => el.name == layer.feature.properties.ST_NM
          )[0];

          // console.log(obj);

          if (obj != undefined) {
            let text = "<p>State : <b>" +
            layer.feature.properties.ST_NM +
            "</b></p> <p> <b>";
            let arr = [obj.ulbName];
            let ranks = [obj.rank];
            if(obj.ulbName.toString().search(',') != -1 && obj.rank.toString().search(',') != -1){
              arr = obj.ulbName.split(",");
              ranks = obj.rank.split(",");
            }

            for(let item in arr){
              if(item == (arr.length -1).toString()){
                text += arr[item] + " (" + ranks[item] + ")</b></br> </p>";
              }else{
                text += arr[item] + " (" + ranks[item] + ")</b></br> <b>";
              }
            }

            stateLayer.bindTooltip(
              text,
              { className: "tooltip-custom", opacity: 1 }
            );
          } else {
            stateLayer.bindTooltip(
              "<b>" + layer.feature.properties.ST_NM + "</b>"
            );
          }
        }
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
      fillOpacity: 0.7
    };
  }

  randomColor(stateName, cord, tooltipText) {
    let states = this.mapData.map(x => x.name);
    let rand = this.colorArr[Math.floor(Math.random() * this.colorArr.length)];

    if (states.includes(stateName)) {
      this.colorArr = this.colorArr.filter(color => color != rand);
      // var marker = L.marker([cord.lat, cord.lng], { icon: this.yellowIcon }).bindTooltip('<p>Rank: <b>'+ tooltipText +'<b></p>',
      // {
      //   className: 'tooltip-custom-1',
      //   opacity: 1,
      //   permanent: true,
      //   direction: 'top'
      // }).addTo(this.map);
      // let numMarker = L.ExtraMarkers.icon({
      //   icon: "fa-number",
      //   number: tooltipText,
      //   markerColor: "yellow",
      //   iconColor: "black",
      //   shape: "star",
      //   iconAnchor: [20, 40] // point of the icon which will correspond to marker's location
      // });

      var point = L.point([-10, -10]);

      var marker = L.marker([cord.lat, cord.lng], { icon: this.yellowIcon }).bindTooltip('<p>Rank: <b>'+ tooltipText +'<b></p>',
      {
        className: 'tooltip-custom-1',
        opacity: 1,
        offset: point,
        permanent: true,
        direction: 'top'
      }).addTo(
        this.map
      );

      return "#009fe3";
    } else {
      return "#e8e8e8";
    }
  }

  getCentroid(arr) { 
    return arr.reduce(function (x,y) {
        return [x[0] + y[0]/arr.length, x[1] + y[1]/arr.length] 
    }, [0,0]) 
  }

  // common functions
  //check range between
  between(x, min, max) {
    return x >= min && x <= max;
  }
  filterByOverall(keys: any = [], dataInput: any = []) {
    let filteredData = [];

    for (let i = 0; i < keys.length; i++) {
      let values = dataInput
        .map(row => {
          if (this.between(row.population, keys[i].min, keys[i].max)) {
            return row;
          }
          return;
        })
        .filter(item => item);
      filteredData.push(...values);
    }
    return filteredData;
  }
}
