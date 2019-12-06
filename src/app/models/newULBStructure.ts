import { IBaseReponse } from './baseReponse';
import { IULB } from './ulb';

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
    code: string;
    amrut: "Yes" | "No";
    area: any;
    natureOfUlb: IULB["natureOfUlb"];
    type: IULB["type"];
    population: IULB["population"];
    wards: IULB["wards"];
  };

  ulbtypes: {
    name: IULB["type"];
    _id: string;
  };
  state: {
    _id: string;
    name: string;
    code: string;
    regionalName: string;
  };
}
