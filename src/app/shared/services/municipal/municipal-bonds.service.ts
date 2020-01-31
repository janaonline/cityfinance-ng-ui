import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IBondIssuer } from '../../../credit-rating/municipal-bond/models/bondIssuerResponse';
import { IBondIssureItemResponse } from '../../../credit-rating/municipal-bond/models/bondIssureItemResponse';
import { IULBResponse } from '../../../credit-rating/municipal-bond/models/ulbsResponse';

@Injectable({
  providedIn: "root"
})
export class MunicipalBondsService {
  constructor(private _http: HttpClient) {}

  private AllBondIssuerItems: IBondIssureItemResponse;

  getBondIssuer() {
    return this._http.get<IBondIssuer>(
      `${environment.api.url}api/admin/v1/BondIssuer`
    );
  }

  getBondIssuerItem(searchOption?: { ulbs: string[]; years: string[] }) {
    if (this.AllBondIssuerItems) {
      return this.getBondIssuerItemFromCache(searchOption);
    }
    return this._http
      .get<IBondIssureItemResponse>(
        `${environment.api.url}api/admin/v1/BondIssuerItem`
      )
      .pipe(
        map(response => {
          this.AllBondIssuerItems = response;
          const sorted = this.getLastUpdateBondIsuueItem(
            response.data.length,
            response.data
          );
          return { total: sorted.length, data: sorted };
        })
      );
  }

  private getBondIssuerItemFromCache(searchOption?: {
    ulbs: string[];
    years: string[];
  }) {
    if (
      !searchOption ||
      (!searchOption.ulbs.length && !searchOption.years.length)
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
  }) {
    const list: IBondIssureItemResponse["data"] = [];
    if (searchOption.ulbs && searchOption.ulbs.length) {
      searchOption.ulbs.forEach(ulbName => {
        if (searchOption.years && searchOption.years.length) {
          searchOption.years.forEach(year => {
            const ulbFound = this.AllBondIssuerItems.data.find(
              item => item.ulb === ulbName && item.yearOfBondIssued === year
            );
            if (ulbFound) {
              list.push(ulbFound);
            }
          });
        } else {
          const ulbFound = this.AllBondIssuerItems.data.find(
            ulb => ulb.ulb === ulbName
          );
          if (ulbFound) {
            list.push(ulbFound);
          }
        }
      });
    } else {
      this.AllBondIssuerItems.data.filter(ulb => {
        if (searchOption.years.find(year => year === ulb.yearOfBondIssued)) {
          list.push(ulb);
        }
      });
    }
    return list;
  }

  getULBS() {
    return this._http
      .get<IULBResponse>(`${environment.api.url}api/admin/v1/Bond/Ulbs`)
      .pipe(
        map(response => {
          response.data = response.data.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          return response;
        })
      );
  }
}
