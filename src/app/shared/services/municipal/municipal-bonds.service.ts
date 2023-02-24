import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { IBondIssuer } from "../../../credit-rating/municipal-bond/models/bondIssuerResponse";
import { IBondIssureItemResponse } from "../../../credit-rating/municipal-bond/models/bondIssureItemResponse";
import { Filter, IULBResponse, MouProjectsByUlbResponse, ProjectsResponse } from "../../../credit-rating/municipal-bond/models/ulbsResponse";

@Injectable({
  providedIn: "root",
})
export class MunicipalBondsService {
  constructor(private _http: HttpClient) { }

  private AllBondIssuerItems: IBondIssureItemResponse;

  getBondIssuer() {
    return this._http.get<IBondIssuer>(`${environment.api.url}/BondIssuer`);
  }

  getBondIssuerItem(searchOption?: {
    ulbs?: string[];
    years?: string[];
    states?: string[];
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
    ulbs?: string[];
    years?: string[];
    states?: string[];
  }) {
    if (
      !searchOption ||
      (!searchOption?.ulbs.length &&
        !searchOption?.years.length &&
        !searchOption?.states.length)
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
    ulbs?: string[];
    years?: string[];
    states?: string[];
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
    } else if (searchOption.years && searchOption.years.length) {
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
    return list.filter(
      (ulb, indexA) => indexA === list.findIndex((ulb2) => ulb2._id === ulb._id)
    );
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

  private formatNumber(num: number, maxDecimal: number) {
    const decimalPlaces = num.toString().split('.')[1]?.length || 0;
    return decimalPlaces > maxDecimal ? num.toFixed(maxDecimal) : num.toString();
  }

  private getNumberInCrore(number, divideTo) {
    return '₹ ' + (number < divideTo ? this.formatNumber(number / divideTo, 4) : (number / divideTo).toFixed(2)) + ' Cr';
  }
  private getPercent(a, b) {
    return a == 0 ? 0 : Math.min((100 - (a - b) / a * 100), 100).toFixed(2);
  }

  getMouProjectsByUlb(ulbId: string, params: any = {}, appliedFilters?: Filter[]) {
    delete params['implementationAgencies']; // TODO: remove when implemented from backend
    return this._http
      .get<MouProjectsByUlbResponse>(`${environment.api.url}UA/get-mou-project/${ulbId}`, { params }).pipe(
        map((response) => {
          response.filters = appliedFilters || response.filters
            .map(filter => filter.key === 'implementationAgencies' ? { // TODO: remove when implemented from backend
              ...filter, options: [{
                ...filter.options[0],
                checked: true
              }]
            } : filter);
          response.rows = response.rows.map(row => ({
            ...row,
            ...['totalProjectCost', 'capitalExpenditureState', 'capitalExpenditureUlb', 'omExpensesState', 'omExpensesUlb', 'expenditure']
              .reduce((obj, key) => { if((row as any).hasOwnProperty(key)) obj[key] = this.getNumberInCrore(row[key], row.divideTo); return obj; }, {}),
            ...(row.stateShare && { stateShare: this.getNumberInCrore(row.stateShare, row.divideTo) + ` (${this.getPercent(row.totalProjectCost, row.stateShare)})%`,}),
            ...(row.ulbShare && { ulbShare: this.getNumberInCrore(row.ulbShare, row.divideTo) + ` (${this.getPercent(row.totalProjectCost, row.ulbShare)})%`,})
          }));
          return response;
        })
      );;
  }
  getProjects(queryParams: string, columns) {
    return this._http.get<ProjectsResponse>(`${environment.api.url}/UA/get-projects?${queryParams}`).pipe(
      map((response) => {
        const searchableAndDefaultSortColumn = ['stateName', 'ulbName'];
        response.columns = columns || response.columns.map(column => ({
          ...column,
          sort: 0,
          ...(searchableAndDefaultSortColumn.includes(column.key) && { query: '' })
        }));
        response.data = response.data.map(item => ({
          ...item,
          ulbShare: (item.ulbShare as number / 100).toFixed(2),
          totalProjectCost: (item.totalProjectCost as number / 100).toFixed(2),
        }))
        return response;
      })
    );
  }
}
