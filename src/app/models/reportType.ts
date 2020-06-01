import { IULB } from './ulb';

export interface IReportType {
  isComparative: boolean;
  type: "Summary" | "Detailed";
  years: any[];
  yearList: any[];
  reportGroup: string;
  ulbList: IULB[];
  valueType: "absolute" | "per_capita";
}
