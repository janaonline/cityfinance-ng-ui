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


export interface Row {
  projectName: string;
  implementationAgency: string;
  totalProjectCost: number | string;
  stateShare: number | string;
  ulbShare: number | string;
  projectId: string;
  capitalExpenditureState: number | string;
  capitalExpenditureUlb: number | string;
  omExpensesState: number | string;
  omExpensesUlb: number | string;
  sector: string;
  startDate: string;
  estimatedCompletionDate: string;
  moreInformation: Link;
  projectReport: Link;
  creditRating: Link;
  divideTo: number;
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

export interface Filter {
  key: string;
  name: string;
  query?: string;
  options?: FilterOption[] | null;
}
export interface FilterOption {
  _id: string;
  name: string;
  checked?: boolean;
  sectorId?: string | null;
}

export interface MouProjectsByUlbResponse {
  success: boolean;
  message: string;
  rows?: (Row)[] | null;
  filters: Filter[];
  columns?: (Columns)[] | null;
  total: number;
}


export interface ProjectsResponse {
  success: boolean;
  message: string;
  data?: (DataEntity)[] | null;
  total: number;
  columns?: (ColumnsEntity)[] | null;
}
export interface DataEntity {
  _id: string;
  ulbName: string;
  stateName: string;
  totalProjectCost: number | string;
  totalProjects: number;
  ulbShare: number | string;
}
export interface ColumnsEntity {
  label: string;
  key: string;
  sort?: 0 | 1 | -1;
  query?: string;
}

