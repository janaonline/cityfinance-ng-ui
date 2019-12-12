import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-extra-markers';
declare const $:any;

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeatMapComponent implements OnInit {

  overallFilter = new FormControl();
  overallList = [
    { label: '1 to 1000', min: 1, max: 1000 },
    { label: '1001 to 2000', min: 1001, max: 2000 },
    { label: '2001 to 3000', min: 2001, max: 3000 },
    { label: 'All', min: 1, max: 3000 }
  ]

  ulbsData:any = [
    { id: 1, name: 'Agra Municipal Corporation' },
    { id: 2, name: 'Aligarh Municipal Corporation' },
    { id: 3, name: 'Akbarpur Nagar Palika Parishad' },
    { id: 4, name: 'Allahabad Municipal Corporation' },
    { id: 5, name: 'Amroha Nagar Palika Parishad' },
    { id: 6, name: 'Kanpur Municipal Corporation' },
    { id: 7, name: 'Moradabad Nagar Nigam' },
    { id: 8, name: 'Fatehpur Nagar Palika Parishad' },
    { id: 9, name: 'Akbarpur Nagar Palika Parishad' },
    { id: 10, name: 'Meerut Nagar Nigam' },
  ];

  //map
  StatesJSON:any = null;
  DistrictsJSON:any = null;
  map:any = null;
  mapData:any = [
    {
      "id": 1,
      "name": "Delhi",
      "district_count": 1,
      "block_count": 1,
      "rank": 1
    },
    {
      "id": 3,
      "name": "Uttar Pradesh",
      "district_count": 1,
      "block_count": 1,
      "rank": 2
    },
    {
      "id": 2,
      "name": "Haryana",
      "district_count": 1,
      "block_count": 2,
      "rank": 3
    },
    {
      "id": 4,
      "name": "Rajasthan",
      "district_count": 1,
      "block_count": 2,
      "rank": 4
    }
  ];
  colorArr:any = ['#00A7D2', '#2e8c39', '#F39C12', '#FF7285', '#66d9d9', '#0e4b89', '#d50028'];

  yellowIcon = L.icon({
    iconUrl: '../../../../assets/images/map-marker.svg',
    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
  });

  constructor() { }

  ngOnInit() {
    this.loadMapGeoJson();
  }

  loadMapGeoJson(){
    let prmsArr = [];
    let prms1 = new Promise((resolve, reject) => {
      $.getJSON('../assets/jsonFile/state_boundries.json').done((response) => {//All State JSON Data
        this.StatesJSON = response;
        resolve();
      }).fail((failed) => {
          console.log('State Boundries getJSON request failed!', failed);
        });
      });
      prmsArr.push(prms1);
      
      let prms2 = new Promise((resolve, reject) => {
        $.getJSON('../assets/jsonFile/updated_district_9_July.json').done((resp) => {//All District JSON Data
          this.DistrictsJSON = resp;
          resolve();
        }).fail((failed) => {
          console.log('District Boundries getJSON request failed!', failed);
        });
      });
      prmsArr.push(prms2);
      
      Promise.all(prmsArr).then(async ()=>{
        //loadMap
        await this.initMap();
      })
  } 
          
  initMap(){
      this.map = L.map('mapid', {
        scrollWheelZoom: false,
        dragging: false,
        minZoom: 4.5, 
        maxZoom: 4.5,
        zoomControl: false 
      }).setView([20.59, 78.96], 4.499999);

      let stateLayer =  L.geoJSON(
                this.StatesJSON,
                {style: this.stateColorStyle}
              ).addTo(this.map); 


      if(stateLayer){
        this.map.fitBounds(stateLayer.getBounds());
      }

      let coords = [];

      stateLayer.eachLayer((layer:any)=>{

        layer._latlngs.forEach(lay => {
            let exec = lay[0];
            let data;
            if(exec.length){
              data = lay.map((cord) => {
                return cord;
              });
              coords.push(...data[0]);
            }else{
              coords.push(exec);
            }
        });

        let avgCord = this.averageGeolocation(coords);

        // console.log(avgCord, layer.feature.properties.ST_NM);

        let tooltip:any = this.mapData.find(data => data.name == layer.feature.properties.ST_NM.toString());
       
        if(tooltip){
          tooltip = tooltip.rank;
        }else{
          tooltip = '';
        }

        layer.setStyle({
          fillOpacity: 1,
          fillColor: this.randomColor(layer.feature.properties.ST_NM.toString(), avgCord, tooltip),
          weight: -1,
          color: '#cccccc',
        }); 

        layer.on({
        mouseover: () => {
            let obj = null;
            // console.log(this.mapData);
            
            obj = this.mapData.filter(el => el.name == layer.feature.properties.ST_NM)[0];

            // console.log(obj);

            if(obj != undefined){
              stateLayer.bindTooltip('<p>State : <b>' + layer.feature.properties.ST_NM + '</b> </p> <p>Districts : <b>' + obj.district_count + '</b> </p> <p>Blocks : <b>' + obj.block_count + '</b> </p>',
                {className: 'tooltip-custom', opacity: 1}
              );               
            }else{
              stateLayer.bindTooltip('<b>' + layer.feature.properties.ST_NM + '</b>');
            }
          }
        });
        coords = [];
      });
  }

  stateColorStyle(feature){
    return {
      fillColor: '#ffffff',
      // fillColor: getStateColorByStudents(feature.properties.ST_NM),
      weight: 1,
      opacity: 1,
      color: '#ece5e5',
      fillOpacity: 0.7
    }
  }

  randomColor(stateName, cord, tooltipText){
    let states = this.mapData.map(x=>x.name);
    let rand = this.colorArr[Math.floor(Math.random() * this.colorArr.length)];

    if(states.includes(stateName)){
      this.colorArr = this.colorArr.filter(color => color != rand);
      // var marker = L.marker([cord.lat, cord.lng], { icon: this.yellowIcon }).bindTooltip('<p>Rank: <b>'+ tooltipText +'<b></p>', 
      // {
      //   className: 'tooltip-custom-1', 
      //   opacity: 1,
      //   permanent: true, 
      //   direction: 'top'
      // }).addTo(this.map);
      let numMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: tooltipText,
        markerColor: 'yellow',
        shape: 'star',
        iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
      });

      var marker = L.marker([cord.lat, cord.lng], { icon: numMarker }).addTo(this.map);

      return '#009fe3';
    }else {
      return '#e8e8e8';
    }
  }

  averageGeolocation(coords) {
    if (coords.length === 1) {
        return coords[0];
    }

    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (let coord of coords) {
        let latitude = coord.lat * Math.PI / 180;
        let longitude = coord.lng * Math.PI / 180;

        x += Math.cos(latitude) * Math.cos(longitude);
        y += Math.cos(latitude) * Math.sin(longitude);
        z += Math.sin(latitude);
    }

    let total = coords.length;

    x = x / total;
    y = y / total;
    z = z / total;

    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);

    return {
        lat: centralLatitude * 180 / Math.PI,
        lng: centralLongitude * 180 / Math.PI
    };
}

}
