import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IRawIndiaGEOData } from 'src/app/models/geoDatas/india';
import * as topo from 'topojson';

@Injectable({
  providedIn: "root",
})
export class GeographicalService {
  constructor(private _http: HttpClient) {}

  loadRawIndiaGeoData() {
    return this._http.get<IRawIndiaGEOData>("/assets/jsonFile/india_v2.json");
  }

  loadConvertedIndiaGeoData() {
    return this.loadRawIndiaGeoData().pipe(
      map((rawData) => {
        return topo.feature(rawData, rawData.objects.india);
      })
    );
  }
}
