import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IBondIssuer } from '../../../credit-rating/municipal-bond/models/bondIssuerResponse';
import { IBondIssureItemResponse } from '../../../credit-rating/municipal-bond/models/bondIssureItemResponse';
import { IULBResponse } from '../../../credit-rating/municipal-bond/models/ulbsResponse';

@Injectable({
  providedIn: "root",
})
export class MunicipalBondsService {
  constructor(private _http: HttpClient) {}

  private AllBondIssuerItems: IBondIssureItemResponse;

  getBondIssuer() {
    return this._http.get<IBondIssuer>(`${environment.api.url}/BondIssuer`);
  }

  getBondIssuerItem(searchOption?: {
    ulbs: string[];
    years: string[];
    states: string[];
  }) {
    if (this.AllBondIssuerItems) {
      return this.getBondIssuerItemFromCache(searchOption);
    }

    return this._http
      .get<IBondIssureItemResponse>(`${environment.api.url}/BondIssuerItem`)
      .pipe(
        map((response) => {
          this.AllBondIssuerItems = response;
          const sorted = this.getLastUpdateBondIsuueItem(
            response.data.length,
            response.data
          );
          return { total: sorted.length, data: sorted };
        }),
        switchMap(() => this.getBondIssuerItemFromCache(searchOption))
      );
  }

  private getBondIssuerItemFromCache(searchOption?: {
    ulbs: string[];
    years: string[];
    states: string[];
  }) {
    if (
      !searchOption ||
      (!searchOption.ulbs.length &&
        !searchOption.years.length &&
        !searchOption.states.length)
    ) {
      return this.getAllBondIssuerItems();
    }
    const data = this.filterBondIssueItem(searchOption);
    return of({ total: data.length, data });
  }

  private getAllBondIssuerItems() {
    const allData = this.AllBondIssuerItems.data;
    return of({ total: allData.length, data: allData });
  }

  private getLastUpdateBondIsuueItem(
    quantity: number,
    bondIssuerList: IBondIssureItemResponse["data"]
  ) {
    const sorted = bondIssuerList.sort(
      (a, b) =>
        new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime()
    );
    return sorted.slice(0, quantity);
  }

  private filterBondIssueItem(searchOption?: {
    ulbs: string[];
    years: string[];
    states: string[];
  }) {
    let list: IBondIssureItemResponse["data"] = [];

    if (searchOption.ulbs && searchOption.ulbs.length) {
      searchOption.ulbs.forEach((ulbName) => {
        if (searchOption.years && searchOption.years.length) {
          searchOption.years.forEach((year) => {
            const ulbFound = this.AllBondIssuerItems.data.find(
              (item) => item.ulb === ulbName && item.yearOfBondIssued === year
            );
            if (ulbFound) {
              list.push(ulbFound);
            }
          });
        } else {
          const ulbFound = this.AllBondIssuerItems.data.filter(
            (ulb) => ulb.ulb === ulbName
          );
          if (ulbFound.length) {
            list = list.concat(ulbFound);
          }
        }
      });
    }
    if (searchOption.years && searchOption.years.length) {
      this.AllBondIssuerItems.data.filter((ulb) => {
        if (searchOption.years.find((year) => year === ulb.yearOfBondIssued)) {
          list.push(ulb);
        }
      });
    }

    if (searchOption.states && searchOption.states.length) {
      list = (list.length ? list : this.AllBondIssuerItems.data).filter((ulb) =>
        searchOption.states.includes(ulb["state"])
      );
    }
    return list;
  }

  getULBS() {
    return this._http
      .get<IULBResponse>(`${environment.api.url}/Bond/Ulbs`)
      .pipe(
        map((response) => {
          response.data = response.data.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          return response;
        })
      );
  }
}
