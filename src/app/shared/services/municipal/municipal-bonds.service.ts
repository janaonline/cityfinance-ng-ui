import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { IBondIssuer } from "../../../credit-rating/municipal-bond/models/bondIssuerResponse";
import { IBondIssureItemResponse } from "../../../credit-rating/municipal-bond/models/bondIssureItemResponse";
import { Filter, IULBResponse, MouProjectsResponse } from "../../../credit-rating/municipal-bond/models/ulbsResponse";

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

  getMouProjects(ulbId: string, params: any = {}, appliedFilters?: Filter[]) {
    return this._http
      .get<MouProjectsResponse>(`${environment.api.url}UA/get-mou-project/${ulbId}`, { params }).pipe(
        map((response) => {
          response.filters = appliedFilters || response.filters
            .map(filter => filter.key === 'implementationAgencies' ? { // TODO: remove when implemented from backend
              ...filter, options: [{
                ...filter.options[0],
                checked: true
              }]
            } : filter);
          return response;
        })
      );;
  }
  getMouProjects2(ulbId: string, params: any = {}, appliedFilters?: Filter[]) {

    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next({
          success: true,
          message: "Fetched Successfully",
          total: 6,
          rows: [
            {
              projectName: "kjlkj",
              implementationAgency: "Nellimarla Town Panchayat",
              totalProjectCost: "₹ 97878 CR",
              state: "Hariyana",
              city: "ABCD",
              ulbId: "5dd24729437ba31f7eb42ea8",
              projectId: "62d795bd4702d2580c061292",
              sectorId: "60783e454dff55e6c0cb80c8",
              ulbShare: "150",
              capitalExpenditureState: "₹ 98 CR",
              capitalExpenditureUlb: "₹ 100 CR",
              omExpensesState: "₹ 67 CR",
              omExpensesUlb: "₹ 88 CR",
              sector: "Drinking Water",
              startDate: "19-07-2022",
              estimatedCompletionDate: "19-07-2022",
              moreInformation: {
                name: "More information",
                url: "https://democityfinanceapi.dhwaniris.in/api/v1//UA/get-mou-project/5dd24729437ba31f7eb42ea8?csv=true&projects=62d795bd4702d2580c061292"
              },
              projectReport: {
                name: "Project Report file",
                url: "https://jana-cityfinance.s3.ap-south-1.amazonaws.com/objects/94d21e52-3439-4221-9844-2d76972c7107.pdf"
              },
              creditRating: {
                name: "Credit rating",
                url: "https://democityfinance.in/creditRating.pdf"
              }
            },
            {
              projectName: "dsad",
              implementationAgency: "Nellimarla Town Panchayat",
              totalProjectCost: "₹ 234 CR",
              state: "Punjab",
              city: "ABCD",
              ulbId: "5dd24729437ba31f7eb42ea8",
              projectId: "62d795bd4702d2580c061293",
              sectorId: "610f82d643612e3f5088ee21",
              ulbShare: "150",
              capitalExpenditureState: "₹ 98 CR",
              capitalExpenditureUlb: "₹ 100 CR",
              omExpensesState: "₹ 67 CR",
              omExpensesUlb: "₹ 88 CR",
              sector: "Rejuvenation of Water Bodies",
              startDate: "19-07-2022",
              estimatedCompletionDate: "19-07-2022",
              moreInformation: {
                name: "More information",
                url: "https://democityfinanceapi.dhwaniris.in/api/v1//UA/get-mou-project/5dd24729437ba31f7eb42ea8?csv=true&projects=62d795bd4702d2580c061293"
              },
              projectReport: {
                name: "Project Report file",
                url: "https://jana-cityfinance.s3.ap-south-1.amazonaws.com/objects/94d21e52-3439-4221-9844-2d76972c7107.pdf"
              },
              creditRating: {
                name: "Credit rating",
                url: "https://democityfinance.in/creditRating.pdf"
              }
            },
            {
              projectName: "werew",
              implementationAgency: "Nellimarla Town Panchayat",
              totalProjectCost: "₹ 234 CR",
              state: "Gujrat",
              city: "ABCD",
              ulbId: "5dd24729437ba31f7eb42ea8",
              projectId: "62d795bd4702d2580c061294",
              sectorId: "60783ed7e598021591943afa",
              ulbShare: "150",
              capitalExpenditureState: "₹ 98 CR",
              capitalExpenditureUlb: "₹ 100 CR",
              omExpensesState: "₹ 67 CR",
              omExpensesUlb: "₹ 88 CR",
              sector: "Rainwater Harvesting",
              startDate: "19-07-2022",
              estimatedCompletionDate: "19-07-2022",
              moreInformation: {
                name: "More information",
                url: "https://democityfinanceapi.dhwaniris.in/api/v1//UA/get-mou-project/5dd24729437ba31f7eb42ea8?csv=true&projects=62d795bd4702d2580c061294"
              },
              projectReport: {
                name: "Project Report file",
                url: "https://jana-cityfinance.s3.ap-south-1.amazonaws.com/objects/94d21e52-3439-4221-9844-2d76972c7107.pdf"
              },
              creditRating: {
                name: "Credit rating",
                url: "https://democityfinance.in/creditRating.pdf"
              }
            },
            {
              projectName: "asdas",
              implementationAgency: "Nellimarla Town Panchayat",
              totalProjectCost: "₹ 234234 CR",
              state: "Assam",
              city: "ABCD",
              ulbId: "5dd24729437ba31f7eb42ea8",
              projectId: "62d795bd4702d2580c061295",
              sectorId: "60783ed7e598021591943afd",
              ulbShare: "150",
              capitalExpenditureState: "₹ 98 CR",
              capitalExpenditureUlb: "₹ 100 CR",
              omExpensesState: "₹ 67 CR",
              omExpensesUlb: "₹ 88 CR",
              sector: "Solid Waste Management",
              startDate: "19-07-2022",
              estimatedCompletionDate: "19-07-2022",
              moreInformation: {
                name: "More information",
                url: "https://democityfinanceapi.dhwaniris.in/api/v1//UA/get-mou-project/5dd24729437ba31f7eb42ea8?csv=true&projects=62d795bd4702d2580c061295"
              },
              projectReport: {
                name: "Project Report file",
                url: "https://jana-cityfinance.s3.ap-south-1.amazonaws.com/objects/94d21e52-3439-4221-9844-2d76972c7107.pdf"
              },
              creditRating: {
                name: "Credit rating",
                url: "https://democityfinance.in/creditRating.pdf"
              }
            },
            {
              projectName: "asda",
              implementationAgency: "Nellimarla Town Panchayat",
              totalProjectCost: "₹ 234 CR",
              state: "Bihar",
              city: "ABCD",
              ulbId: "5dd24729437ba31f7eb42ea8",
              projectId: "62d795bd4702d2580c061296",
              sectorId: "610f82b843612e3f5088ee20",
              ulbShare: "150",
              capitalExpenditureState: "₹ 98 CR",
              capitalExpenditureUlb: "₹ 100 CR",
              omExpensesState: "₹ 67 CR",
              omExpensesUlb: "₹ 88 CR",
              sector: "Water Recycling",
              startDate: "19-07-2022",
              estimatedCompletionDate: "19-07-2022",
              moreInformation: {
                name: "More information",
                url: "https://democityfinanceapi.dhwaniris.in/api/v1//UA/get-mou-project/5dd24729437ba31f7eb42ea8?csv=true&projects=62d795bd4702d2580c061296"
              },
              projectReport: {
                name: "Project Report file",
                url: "https://jana-cityfinance.s3.ap-south-1.amazonaws.com/objects/94d21e52-3439-4221-9844-2d76972c7107.pdf"
              },
              creditRating: {
                name: "Credit rating",
                url: "https://democityfinance.in/creditRating.pdf"
              }
            },
            {
              projectName: "asdasd",
              implementationAgency: "Nellimarla Town Panchayat",
              totalProjectCost: "₹ 123 CR",
              state: "Delhi",
              city: "ABCD",
              ulbId: "5dd24729437ba31f7eb42ea8",
              projectId: "62d795bd4702d2580c061297",
              sectorId: "60783ed7e598021591943afa",
              ulbShare: "150",
              capitalExpenditureState: "₹ 98 CR",
              capitalExpenditureUlb: "₹ 100 CR",
              omExpensesState: "₹ 67 CR",
              omExpensesUlb: "₹ 88 CR",
              sector: "Rainwater Harvesting",
              startDate: "19-07-2022",
              estimatedCompletionDate: "19-07-2022",
              moreInformation: {
                name: "More information",
                url: "https://democityfinanceapi.dhwaniris.in/api/v1//UA/get-mou-project/5dd24729437ba31f7eb42ea8?csv=true&projects=62d795bd4702d2580c061297"
              },
              projectReport: {
                name: "Project Report file",
                url: "https://jana-cityfinance.s3.ap-south-1.amazonaws.com/objects/94d21e52-3439-4221-9844-2d76972c7107.pdf"
              },
              creditRating: {
                name: "Credit rating",
                url: "https://democityfinance.in/creditRating.pdf"
              }
            }
          ],
          columns: [
            {
              label: "State",
              key: "state",
              databaseKey: "name",
              query: '',
              sort: 1
            },
            {
              label: "City",
              key: "city",
              databaseKey: "ulb.name",
              query: '',
              sort: 0
            },
            {
              label: "Total Project cost",
              key: "totalProjectCost",
              databaseKey: "cost",
              sort: -1
            },
            {
              label: "Number of Projects",
              key: "totalProjectCost",
              databaseKey: "cost",
              sort: 1,
            },
            {
              label: "ULB Share(Funding Potential)",
              key: "ulbShare",
              databaseKey: "expenditure",
              sort: 1,
            },
          ]
        })
      }, 4000);
    })
  }
}
