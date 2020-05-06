import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRawIndiaGEOData } from 'src/app/models/geoDatas/india';
import * as topo from 'topojson';

@Injectable({
  providedIn: "root",
})
export class GeographicalService {
  constructor(private _http: HttpClient) {}

  loadRawIndiaGeoData() {
    return <Observable<IRawIndiaGEOData>>Observable.create(
      async (observer: Observer<{}>) => {
        try {
          const rawMapData = await (
            await fetch("/assets/jsonFile/india_v2.json")
          ).json();

          observer.next(rawMapData);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }
    );
  }

  loadConvertedIndiaGeoData() {
    return this.loadRawIndiaGeoData().pipe(
      map((rawData) => {
        return topo.feature(rawData, rawData.objects.india);
      })
    );
  }
}
