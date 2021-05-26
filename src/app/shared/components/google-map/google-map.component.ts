import { Component, OnInit, ViewChild } from "@angular/core";
import { EventEmitter, Output } from "@angular/core";

import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { UtiReportService } from "../../../pages/ulbform/utilisation-report/uti-report.service";

@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"],
})
export class GoogleMapComponent implements OnInit {
  constructor(private UtiReportService: UtiReportService) {}
  @Output()
  locationSelected  = new EventEmitter<boolean>();

  title = "angular-maps";
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  options = {
    types: [],
    componentRestrictions: { country: "IN" },
  };

  location: any = {
    lat: {},
    long: {},
  };
  title_add;
  latitude;
  longitude;
  zoom;

  getLocation;

  ngOnInit() {
    this.getLocation = this.UtiReportService.getLocation();
    if (this.getLocation !== null) {
      this.latitude = parseFloat (this.getLocation.lat);
      this.longitude = parseFloat (this.getLocation.lng);
      this.zoom = 15;
    } else {
      this.setCurrentLocation();
    }
  }
  public handleAddressChange(address: Address) {
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
  }
  public setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  chooseLocation(e) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
  }

  onSubmit() {
    this.location.lat = this.latitude.toFixed(5);
    this.location.long = this.longitude.toFixed(5);
    this.UtiReportService.setLocation(this.location)
    this.locationSelected.emit(true)
  }

  onDrag(e) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
  }
}
