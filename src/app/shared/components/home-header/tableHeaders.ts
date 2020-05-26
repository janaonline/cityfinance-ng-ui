export interface ModalTableHeader {
  title: string;
  click?: boolean;
  id?: string;
  description?: string;
  total?: boolean;
  roundOff?: boolean;
  showInr?: boolean;
  suffix?: string;
  colSpan?: number;
  rowSpan?: number;
}

export const tableHeaders: any = [
  [
    { title: "Population Category", click: true, id: "populationCategory" },
    { title: "Total number of ULBs", id: "totalUlb" },
    { title: "Number of ULBs with Data", id: "numOfUlb", showInr: true },
    {
      title: "Own Revenue (A)",
      id: "ownRevenue",
      roundOff: true,
      description: "(Rs in crores)",
    },
    {
      title: "Revenue Expenditure (B)",
      id: "revenueExpenditure",
      roundOff: true,
      description: "(Rs in crores)",
    },
    {
      title: "Own Revenue %",
      id: "ownRevenuePercentage",
      description: "(A/B)",
    },
    { title: "Min. Own Revenue %", id: "minOwnRevenuePercentage" },
    { title: "Max. Own Revenue %", id: "maxOwnRevenuePercentage" },
  ],
  [
    { title: "Population Category", id: "populationCategory" },
    { title: "Number of ULBs", id: "numOfUlb" },
    { title: "Tax Revenue (a)", id: "taxRevenue" },
    { title: "Rental Income (b)", id: "rentalIncome" },
    { title: "Fees & user charges (c)", id: "feesAndUserCharges" },
    { title: "Own revenues", id: "ownRevenues" },
    { title: "Sale & hire charges", id: "saleAndHireCharges" },
    { title: "Assigned revenue", id: "assignedRevenue" },
    { title: "Grants", id: "grants" },
    { title: "Interest Income", id: "interestIncome" },
    { title: "Other Income", id: "otherIncome" },
  ],
  /* [
    {title: 'Population Category', id: 'populationCategory'},
    {
      title: 'Assigned Revenue And Compensation',
      id: 'assignedRevenueAndCompensationCoverPercentage',
    },
    {
      title: 'Deficit Finance By Capital Grants',
      id: 'deficitFinanceByCapitalGrantsCoverPercentage',
    },
    {title: 'Interest Income', id: 'interestIncomeCoverPercentage'},
    {title: 'Other Income ', id: 'otherIncomeCoverPercentage'},
    {
      title: 'Own Revenue ',
      id: 'ownRevenueCoverPercentage',
      description: '(A/B)',
    },
    {
      title: 'Revenue Grants Contribution And Subsidies',
      id: 'revenueGrantsContributionAndSubsidiesCoverPercentage',
    },
    {
      title: 'Sale And Hire Charges ',
      id: 'saleAndHireChargesCoverPercentage',
    },
  ],*/
  [
    { title: "Population Category", click: true, id: "populationCategory" },
    { title: "Number of ULBs", id: "numOfUlb" },
    { title: "Establishment expense", id: "establishmentExpense" },
    { title: "Administrative Expense", id: "administrativeExpense" },
    {
      title: "Operational & Maint. Expense",
      id: "operationalAndMaintananceExpense",
    },
    { title: "Interest & Finance Expense ", id: "interestAndFinanceExpense" },
    { title: "Revenue Grants", id: "revenueGrants" },
    { title: "Others", id: "other" },
  ],
  [
    { title: "Population Category", click: true, id: "populationCategory" },
    { title: "Total number of ULBs", id: "totalUlb", total: true },
    {
      title: "Number of ULBs with Data",
      id: "numOfUlb",
      total: true,
      showInr: true,
    },
    {
      title: "Cash & Bank Balance",
      description: "(Rs in crores)",
      roundOff: true,
      id: "cashAndBankBalance",
      total: true,
    },
  ],
  [
    { title: "Population Category", click: true, id: "populationCategory" },
    { title: "Total number of ULBs", id: "totalUlb", total: true },
    {
      title: "Number of ULBs with Data",
      id: "numOfUlb",
      total: true,
      showInr: true,
    },
    {
      title: "Loans from Central Government",
      roundOff: true,
      id: "LoanFromCentralGovernment",
      total: true,
    },
    {
      title: "Loans from State Government",
      roundOff: true,
      id: "loanFromStateGovernment",
      total: true,
    },
    {
      title: "Loans from Financial Institutions",
      roundOff: true,
      id: "loanFromFIIB",
      total: true,
    },
    {
      title: "Bonds and Other Debt Instruments",
      roundOff: true,
      id: "bondsAndOtherDebtInstruments",
      total: true,
    },
    { title: "Others", id: "others", roundOff: true, total: true },
    { title: "Total Debt", id: "total", roundOff: true, total: true },
  ],
];

export const modalTableHeaders: ModalTableHeader[][] = [
  [
    { title: "ULB name", click: true, id: "name" },
    { title: "Population", id: "population", total: true },
    { title: "Audit Status", id: "audited" },
    {
      title: "Own Revenues (A) ",
      id: "ownRevenue",
      total: true,
      showInr: true,
      roundOff: true,
      description: "(Rs in crores)",
    },
    {
      title: "Revenue Expenditure (B)",
      id: "revenueExpenditure",
      showInr: true,
      roundOff: true,
      total: true,
      description: "(Rs in crores)",
    },
    { title: "Own Revenue % (A/B)", id: "ownRevenuePercentage" },
  ],
  [
    { title: "ULB name", id: "name" },
    { title: "Population", id: "population", total: true },
    { title: "Audit Status", id: "audited" },
    { title: "Own revenues", id: "ownRevenues", suffix: "%" },
    { title: "Sale & hire charges", id: "saleAndHireCharges", suffix: "%" },
    { title: "Assigned revenue", id: "assignedRevenue", suffix: "%" },
    { title: "Grants", id: "grants", suffix: "%" },
    { title: "Interest Income", id: "interestIncome", suffix: "%" },
    { title: "Other Income", id: "otherIncome", suffix: "%" },
    { title: "Total", id: "total", suffix: "%" },
  ],
  /* [
    {title: 'ULB name', id: 'name'},
    {title: 'Population', id: 'population', total: true},
    {
      title: 'Assigned Revenue And Compensation',
      suffix: '%',
      id: 'assignedRevenueAndCompensationCoverPercentage',
    },
    {title: 'Audit Status', id: 'audited'},
    {
      title: 'Deficit Finance By Capital Grants',
      suffix: '%',
      id: 'deficitFinanceByCapitalGrantsCoverPercentage',
    },
    {
      title: 'Interest Income',
      suffix: '%',
      id: 'interestIncomeCoverPercentage',
    },
    {title: 'Other Income ', suffix: '%', id: 'otherIncomeCoverPercentage'},
    {
      title: 'Own Revenue ',
      suffix: '%',
      id: 'ownRevenueCoverPercentage',
      description: '(A/B)',
    },
    {
      title: 'Revenue Grants Contribution And Subsidies',
      suffix: '%',
      id: 'revenueGrantsContributionAndSubsidiesCoverPercentage',
    },
    {
      title: 'Sale And Hire Charges ',
      suffix: '%',
      id: 'saleAndHireChargesCoverPercentage',
    },
    {title: 'Total', id: 'total', suffix: '%'},
  ],*/
  [
    { title: "ULB name", id: "name" },
    { title: "Population", id: "population", total: true },
    { title: "Establishment expense", suffix: "%", id: "establishmentExpense" },
    { title: "Audit Status", id: "audited" },
    {
      title: "Administrative Expense",
      suffix: "%",
      id: "administrativeExpense",
    },
    {
      title: "Operational & Maint. Expense",
      suffix: "%",
      id: "operationalAndMaintananceExpense",
    },
    {
      title: "Interest & Finance Expense ",
      suffix: "%",
      id: "interestAndFinanceExpense",
    },
    { title: "Revenue Grants", suffix: "%", id: "revenueGrants" },
    { title: "Others", suffix: "%", id: "other" },
    { title: "Total", id: "total", suffix: "%" },
  ],
  [
    { title: "ULB name", click: true, id: "name" },
    { title: "Population", id: "population", total: true },
    { title: "Audit Status", id: "audited" },
    {
      title: "Cash & Bank Balance (Rs in crore)",
      showInr: true,
      total: true,
      roundOff: true,
      id: "cashAndBankBalance",
    },
  ],
  [
    { title: "ULB name", click: true, id: "name" },
    { title: "Population", id: "population", total: true },
    { title: "Audit Status", id: "audited", total: false },
    {
      title: "Loans from Central Government",
      showInr: true,
      roundOff: true,
      id: "LoanFromCentralGovernment",
      total: true,
    },
    {
      title: "Loans from State Government",
      showInr: true,
      roundOff: true,
      id: "loanFromStateGovernment",
      total: true,
    },
    {
      title: "Loans from Financial Institutions",
      showInr: true,
      roundOff: true,
      id: "loanFromFIIB",
      total: true,
    },
    {
      title: "Bonds and Other Debt Instruments",
      showInr: true,
      roundOff: true,
      id: "bondsAndOtherDebtInstruments",
      total: true,
    },
    {
      title: "Others",
      id: "others",
      total: true,
      showInr: true,
      roundOff: true,
    },
    {
      title: "Total Debt",
      id: "total",
      total: true,
      showInr: true,
      roundOff: true,
    },
  ],
];

export const creditRatingModalHeaders: ModalTableHeader[][] = [
  [
    { id: "ulb", title: "ULB" },
    { id: "agency", title: "Agency" },
    { id: "status", title: "Rating Status" },
    { id: "date", title: "Date" },
  ],
];

export const ulbUploadList: ModalTableHeader[] = [
  { id: "ulbName", click: true, title: "ULB Name" },
  { id: "ulbCode", click: true, title: "ULB Code" },
  { id: "financialYear", click: true, title: "Financial Year" },
  { id: "audited", click: true, title: "Audit Status" },
  { id: "status", title: "Status" },
  { id: "action", title: "Action" },
];

export const overAllReportMain: ModalTableHeader[] = [
  { title: "State", id: "state", rowSpan: 2 },
  { title: "Total ULBs", id: "total", rowSpan: 2 },
  { title: "ULB Uploaded", id: "count", colSpan: 2 },
  { title: "Total ULBs Not Uploaded", id: "count", colSpan: 2 },
  { title: "ULBS Under Review", id: "count", colSpan: 2 },
  { title: "ULBs Data Accepted", id: "count", colSpan: 2 },
  { title: "ULBs Data Rejected", id: "count", colSpan: 2 },
];
export const overAllSubHeader: ModalTableHeader[] = [
  { title: "Nos.", id: "count" },
  { title: "%", id: "uploadedPercentage" },
  { title: "Nos.", id: "notUploaded" },
  { title: "%", id: "notUploadedPercentage" },
  { title: "Nos.", id: "pending" },
  { title: "%", id: "pendingPercentage" },
  { title: "Nos.", id: "approved" },
  { title: "%", id: "approvedPercentage" },
  { title: "Nos.", id: "rejected" },
  { title: "%", id: "rejectedPercentage" },
];

export const stateWiseReportMain: ModalTableHeader[] = [
  { id: "name", title: "State", rowSpan: 2 },
  { id: "total", title: "Total ULBs", rowSpan: 2 },
  { title: "ULB Uploaded", id: "count", colSpan: 2 },
  { title: "Total ULBs Not Uploaded", id: "count", colSpan: 2 },
  { title: "ULBS Under Review", id: "count", colSpan: 2 },
  { title: "ULBs Data Accepted", id: "count", colSpan: 2 },
  { title: "ULBs Data Rejected", id: "count", colSpan: 2 },
];
export const stateWiseReportSub: ModalTableHeader[] = [...overAllSubHeader];

export const ulbWiseReportMain: ModalTableHeader[] = [
  { id: "state", title: "State", rowSpan: 2 },
  { id: "name", title: "ULB", rowSpan: 2 },
  { id: "total", title: "Total ULBs", rowSpan: 2 },
  { title: "ULB Uploaded", id: "count", colSpan: 2 },
  { title: "Total ULBs Not Uploaded", id: "count", colSpan: 2 },
  { title: "ULBS Under Review", id: "count", colSpan: 2 },
  { title: "ULBs Data Accepted", id: "count", colSpan: 2 },
  { title: "ULBs Data Rejected", id: "count", colSpan: 2 },
];
export const ulbWiseReportSub = [...stateWiseReportSub];

export const usageReportMain: ModalTableHeader[] = [
  { id: "month", title: "Month", rowSpan: 2 },
  { id: "visitCount", title: "No of Visits", rowSpan: 2 },
  { id: "state", title: "No of Users Registered", rowSpan: 2 },
  { title: "No. of User Logged In", id: "numOfRegUser", colSpan: 5 },
  { title: "No of Reports Downloaded", id: "count", rowSpan: 2 },
];
export const usageReportSub: ModalTableHeader[] = [
  { id: "intTheMonth", title: "In a Month", rowSpan: 1 },
  { id: "moreThan10Times", title: "More Than 10 Times", rowSpan: 1 },
  { id: "moreThan5Times", title: "More Than 5 Times", rowSpan: 1 },
  { id: "moreThan1Times", title: "More Than 1 Time", rowSpan: 1 },
  { id: "oneTime", title: "1 Time", rowSpan: 1 },
];
