import { IULB } from './ulb';

export interface IULBResponse {
  data: { [key: string]: { state: string; ulbs: IULB[] } };
  msg: string;
  success: boolean;
}
