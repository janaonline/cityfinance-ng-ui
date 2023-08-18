import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";

@Component({
  selector: "app-map-dialog",
  templateUrl: "./map-dialog.component.html",
  styleUrls: ["./map-dialog.component.scss"],
})
export class MapDialogComponent implements OnInit {
  options = {
    types: [],
    componentRestrictions: { country: "IN" },
  };
  zoom: number = 15;
  latitude: number;
  longitude: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MapDialogComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    const { latitude, longitude } = this.data;
    if (latitude && longitude) {
      this.latitude = latitude;
      this.longitude = longitude;
    } else {
      this.setCurrentLocation();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  

  public handleAddressChange(address: Address) {
    console.log(address);
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
    this.dialogRef.close(`${this.latitude},${this.longitude}`);
  }

  onDrag(e) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
  }
}
