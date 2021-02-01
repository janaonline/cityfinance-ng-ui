import { IULB } from 'src/app/models/ulb';

export interface IBasicLedgerData {
  success: boolean;
  msg: string;
  data: Datum[];
}

export interface Datum {
  _id: ID;
  ulbList: UlbList[];
}

export interface ID {
  state: string;
  name: string;
}

export interface UlbList {
  financialYear: Array<FinancialYear | null>;
  ulb: string;
  name: string;
  ulbType: IULB["type"];
  code: string;
  searchedName?: string;
}

export enum FinancialYear {
  The201516 = "2015-16",
  The201617 = "2016-17",
  The201718 = "2017-18",
  The201819 = "2018-19",
  The201920 = "2019-20",
}
