export interface IStateULBCoveredResponse {
  message: string;
  success: boolean;
  data: IStateULBCovered[];
}

export interface IStateULBCovered {
  _id: string;
  name: string;
  code: string;
  ulbCount: null;
  coveredUlbCount: number;
  coveredUlbPercentage: number;
}
