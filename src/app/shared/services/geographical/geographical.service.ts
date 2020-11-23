import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection, Geometry } from 'geojson';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRawIndiaGEOData } from 'src/app/models/geoDatas/india';
import * as topo from 'topojson';

@Injectable({
  providedIn: "root",
})
export class GeographicalService {
  private readonly rawIndiaMapCached = new BehaviorSubject<IRawIndiaGEOData>(
    null
  );
  private readonly convertedIndiaMapCached = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient) {}

  loadRawIndiaGeoData() {
    // if (this.rawIndiaMapCached.value) return this.rawIndiaMapCached;

    return this._http
      .get<IRawIndiaGEOData>("/assets/jsonFile/india_v2.json")
      .pipe(
        map((response) => {
          this.rawIndiaMapCached.next(response);
          return response;
        })
      );
  }

  loadConvertedIndiaGeoData() {
    return this.loadRawIndiaGeoData().pipe(
      map((rawData) => {
        return topo.feature(rawData, rawData.objects.india);
      })
    );
  }

  loadStatesGeoData(): Observable<
    FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >
  > {
    return this._http.get<any>("/assets/jsonFile/states_with_district_boundaries.json");
  }
}
