import { NewULBStructure } from '../newULBStructure';

export interface ULBsStatistics {
  [stateId: string]: {
    stateName: string;
    stateCode: string;
    _id: string;
    totalULBS: NewULBStructure[];
    ulbsByYears: {
      [year: string]: NewULBStructure[];
    };
  };
}
