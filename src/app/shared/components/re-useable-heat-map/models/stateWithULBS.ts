import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { ULBWithMapData } from 'src/app/shared/models/ulbsForMapResponse';

export interface IStateWithULBS extends IStateULBCovered {
  ulbs: ULBWithMapData[];
}
