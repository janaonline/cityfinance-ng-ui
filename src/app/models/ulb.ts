import { ulbType } from '../dashboard/report/report/ulbTypes';

export interface IULB {
  amrut: 'Yes' | 'No'| undefined;
  _id: string;
  area: number;
  code: string;
  name: string;
  natureOfUlb: string;
  population: number;
  type: ulbType;
  wards: number;
  state: string;
}
