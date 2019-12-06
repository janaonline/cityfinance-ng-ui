import { IBaseReponse } from './baseReponse';

export interface NewULBStructureResponse extends IBaseReponse {
  data: NewULBStructure[];
}

export interface NewULBStructure {
  amount: number;
  financialYear: string;
  ulb: {
    _id: string;
    state: string;
    name: string;
    ulbType: string;
    code: string;
    amrut?: 'Yes'|'No';
  };
  state: {
    _id: string;
    name: string;
    code: string;
    regionalName: string;
  };
}
