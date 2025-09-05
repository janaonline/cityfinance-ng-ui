
import { ChartResStruct } from '../shared/components/charts/chart-interfaces';
import { IULB } from "./ulb";

// export interface ChartOptions extends Partial<ChartJSOptions<keyof ChartTypeRegistry>> { }

type compareType = 'state' | 'national' | 'popCat' | 'ulbType' | 'ulbs';
export type LineItemType = 'revenue' | 'ownRevenue' | 'revex' | 'capex';
export type CalcType = 'total' | 'perCapita' | 'mix';

export interface IFinancialIndicatorsChart {
    years: string[];
    compareType: compareType,
    ulbId?: string,
    stateId?: string,
    lineItem: LineItemType,
    calcType: CalcType,
    compareUlbs: string[]
    compareUlbsObj?: IULB[],
}

export interface IFinancialIndicatorRes {
    data: ChartResStruct,
    success: boolean,
}

export interface IFinancialIndicatorInfo {
    msg: string
    text: 'success' | 'danger'
}