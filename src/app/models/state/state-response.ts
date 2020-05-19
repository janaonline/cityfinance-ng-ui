import { IState } from './state';

export interface IStateListResponse {
  message: string;
  timestamp: string;
  success: boolean;
  data: IState[];
}
