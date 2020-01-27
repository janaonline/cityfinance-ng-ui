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
      if (!searchOption) {
        return of(this.AllBondIssuerItems.data);
      }

      return of(this.filterBondIssueItem(searchOption));
    }
    return this._http
      .get<IBondIssureItemResponse>(
        `${environment.api.url}api/admin/v1/BondIssuerItem`
      )
      .pipe(
        map(response => {
          this.AllBondIssuerItems = response;
          const sorted = this.getLastUpdateBondIsuueItem(3, response.data);
          return sorted;
        })
      );
  }

  private getLastUpdateBondIsuueItem(
    quantity: number,
    bondIssuerList: IBondIssureItemResponse["data"]
  ) {
    const sorted = bondIssuerList.sort(
      (a, b) =>
        new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime()
    );
    return sorted.slice(0, quantity - 1);
  }

  private filterBondIssueItem(searchOption?: {
    ulbs: string[];
    years: string[];
  }) {
    const list: IBondIssureItemResponse["data"] = [];
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
    return list;
  }

  getULBS() {
    return this._http.get<IULBResponse>(
      `${environment.api.url}api/admin/v1/Bond/Ulbs`
    );
  }
}
