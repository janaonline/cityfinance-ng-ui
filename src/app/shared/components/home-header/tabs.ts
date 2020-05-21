export const AnalyticsTabs: { [name: string]: IAnalyticsTabs } = {
  OWN_REVENUE: { id: 0, name: "Own Revenues", url: "/analytics/own-revenues" },
  REVENUE_SOURCES: {
    id: 1,
    name: "Revenue Sources",
    url: "/analytics/revenue-sources",
  },
  REVENUE_EXPENDITURE: {
    id: 2,
    name: "Revenue Expenditure",
    url: "/analytics/revenue-expenditure",
  },
  CASH_BANK_BALANCE: {
    id: 3,
    name: "Cash and Bank Balance",
    url: "/analytics/cash-bank-balance",
  },
  OUTSTANDING_DEBT: {
    id: 4,
    name: "Outstanding Debt",
    url: "/analytics/outstanding-debt",
  },
};

export interface IAnalyticsTabs {
  name: string;
  id: number;
  url: string;
}
