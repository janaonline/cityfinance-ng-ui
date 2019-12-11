import { IULB } from './ulb';

export interface IULBResponse {
  data: { [stateCode: string]: { state: string; ulbs: IULB[] } };
  msg: string;
  success: boolean;
}
