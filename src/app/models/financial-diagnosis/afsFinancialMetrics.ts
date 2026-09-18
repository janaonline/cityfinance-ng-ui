/**
 * Shapes for the "AFS Analysis" data set (Dataset 2 - AFS Financial Metrics)
 * as described in `AFS_Analysis_Calculation_and_Filter_Documentation.pdf`
 * (shared dbt / SQL model, one row per ULB x financial year, plus one
 * artificial "CAGR" row per ULB - see section 3.2/3.9/3.10 of that doc).
 *
 * These are consumed by the Financial Diagnosis PDF report
 * (`FinancialDiagnosisReportComponent`) rendered from the Dalgo
 * city-brief screen (`dalgo/citybrief-dashboard`).
 */

/** The pseudo financial-year value used for the CAGR row (see doc section 3.2). */
export const CAGR_ROW_KEY = "CAGR";

/** One point on the "Property Tax* (Cr.)" trend chart, from `GET property-tax/:ulbId/collection-trend`. */
export interface IPropertyTaxTrendPoint {
  financialYear: string;
  /** Raw rupees. `null` means "no data reported for this year" - distinct from a genuine 0. */
  valueInRupees: number | null;
}

export interface IAfsFinancialMetricsRow {
  ulb_code: string;
  ulb_name: string;
  state_name: string;
  iso_code?: string;
  /** e.g. "2019-20" ... "2022-23", or the literal "CAGR" pseudo-row. */
  financial_year: string;
  ulb_type: string;
  population?: number;
  area?: number;

  // Bond metrics (section 3.8) - repeated across every year row for a ULB.
  noOfBondsRaised?: number;
  amountRaisedInCr?: number;

  // Revenue & income metrics (section 3.4/3.5/3.10)
  initialTotalOwnSourceRevenue?: number;
  /** Adjusted OSR: Initial OSR - AFS Property Tax + Preferred Property Tax. */
  totalOwnSourceRevenue?: number;
  revenueGrants?: number;
  assignedRevenue?: number;
  otherIncome?: number;
  /** Original `indicators.totRevenue` value (doc keeps the "Intial" spelling). */
  initialTotalRevenue?: number;
  /** Adjusted Total Revenue: Initial Total Revenue - AFS PT + Preferred PT. */
  totalRevenue?: number;
  /** Direct AFS value for code 110. */
  taxRevenue?: number;
  /** Derived: Initial OSR - Tax Revenue. */
  nonTaxRevenue?: number;
  /** AFS ledger Property Tax, code 11001. */
  propertyTax?: number;
  /** Property Tax OPM collection (displayPriority 1.20) x 100,000. */
  totalPropertyTaxCollection?: number;

  // Percentage metrics (section 3.6)
  taxRevenueAsPercentOfOsr?: number;
  nonTaxRevenueAsPercentOfOsr?: number;
  propertyTaxAsPercentOfOsr?: number;

  // Debt (section 3.7)
  securedLoans?: number;
  unsecuredLoans?: number;

  // Expenditure heads (section 3.7, codes 210-300)
  establishmentExpenditure?: number;
  administrativeExpenses?: number;
  operationAndMaintenance?: number;
  interestAndFinanceCharges?: number;
  programmeExpenses?: number;
  revenueGrantsContributionsAndSubsidies?: number;
  provisionsAndWriteOff?: number;
  miscellaneousExpenses?: number;
  depreciation?: number;
  priorPeriodItems?: number;
  transferToReserveFunds?: number;
  other?: number;
  /** Direct `indicators.totRevenueExpenditure` - NOT the sum of the heads above. */
  totalExpenditure?: number;
}

/**
 * Everything the Financial Diagnosis PDF template needs for a single ULB:
 * the ULB header/master fields plus one Dataset-2 row per tracked
 * financial year and the CAGR row.
 */
export interface IFinancialDiagnosisReportData {
  ulbCode: string;
  ulbName: string;
  stateName: string;
  ulbType: string;
  population?: number;
  area?: number;
  /** Credit rating agency grade, cross-referenced from the Credit Rating module. Defaults to "NA". */
  creditRating?: string;
  /** Financial years reported in order, e.g. ["2019-20", "2020-21", "2021-22", "2022-23"]. */
  years: string[];
  /** One row per `years` entry, keyed the same way. */
  yearlyData: { [year: string]: IAfsFinancialMetricsRow };
  /** The dedicated "CAGR" row, if returned by the API. */
  cagr?: IAfsFinancialMetricsRow;
  /**
   * The "Property Tax* (Cr.)" chart's own 6-year series (2018-19 to 2023-24)
   * from `property-tax/:ulbId/collection-trend` - a wider, independent range
   * from `years` above (see that endpoint's own PROPERTY_TAX_CHART_YEARS).
   */
  propertyTaxTrend?: IPropertyTaxTrendPoint[];
}
