export interface IULBResponse {
  timestamp: number;
  success: boolean;
  message: string;
  data: ULB[];
}

export interface ULB {
  name: string;
  years: string[];
  state?: string; // State Id
  stateName: string;
}


export interface Rows {
  projectName: string;
  implementationAgency: string;
  totalProjectCost: number;
  stateShare: number;
  ulbShare: number;
  capitalExpenditureState: number;
  capitalExpenditureUlb: number;
  omExpensesState: number;
  omExpensesUlb: number;
  sector: string;
  startDate: string;
  estimatedCompletionDate: string;
  moreInformation: Link;
  projectReport: Link;
  creditRating: Link;
}
export interface Link {
  name: string;
  url: string;
}
export interface Columns {
  label: string;
  key: string;
  databaseKey?: string | boolean;
}

export interface Filters {
  key: string;
  name: string;
  options?: FilterOption[] | null;
}
export interface FilterOption {
  _id: string;
  name: string;
  checked?: boolean;
  sectorId?: string | null;
}

export interface MouProjectsResponse {
  success: boolean;
  message: string;
  rows?: (Rows)[] | null;
  filters: Filters[];
  columns?: (Columns)[] | null;
  total: number;
}
