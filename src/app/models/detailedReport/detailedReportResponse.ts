import { IBaseReponse } from '../baseReponse';

export interface IDetailedReportResponse extends IBaseReponse {
  data: {
    _id: string;
    ulb_code: string;
    line_item: string;
    head_of_account: string;
    groupCode: string;
    code: number;
    population: number;
    budget: IBudget[];
  }[];
}

export interface IBudget {
  year: string;
  amount: number;
}
