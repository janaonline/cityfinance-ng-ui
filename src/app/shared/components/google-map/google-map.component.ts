import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  title = 'angular-maps';
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  options = {
    types : [],
    componentRestrictions: { country: 'IN' }
  }

  title_add;
  latitude;
  longitude;
  zoom;

  ngOnInit() {
    this.setCurrentLocation();
  }
  public handleAddressChange(address: Address) {
 console.log(address);
    
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    
  }
  public setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      })
    }    
  }
  chooseLocation(e){
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng
  }
}
