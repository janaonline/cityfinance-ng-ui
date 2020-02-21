export interface ModalTableHeader {
  title: string,
  click?: boolean,
  id?: string,
  description?: string,
  total?: boolean,
  roundOff?: boolean
}

export const tableHeaders: any = [
  [
    {title: 'Population Category', click: true, id: 'populationCategory'},
    {title: 'Total number of ULBs', id: 'totalUlb'},
    {title: 'Number of ULBs with Data', id: 'numOfUlb'},
    {title: 'Own Revenue (A)', id: 'ownRevenue', roundOff: true, description: '(Rs in crores)'},
    {title: 'Revenue Expenditure (B)', id: 'revenueExpenditure', roundOff: true, description: '(Rs in crores)'},
    {title: 'Own Revenue %', id: 'ownRevenuePercentage', description: '(A/B)'},
    {title: 'Min. Own Revenue %', id: 'minOwnRevenuePercentage'},
    {title: 'Max. Own Revenue %', id: 'maxOwnRevenuePercentage'}
  ],
  [
    {title: 'Population Category', id: 'populationCategory'},
    {title: 'Number of ULBs', id: 'numOfUlb'},
    {title: 'Tax Revenue (a)', id: 'taxRevenue'},
    {title: 'Rental Income (b)', id: 'rentalIncome'},
    {title: 'Fees & user charges (c)', id: 'feesAndUserCharges'},
    {title: 'Own revenues', id: 'ownRevenues'},
    {title: 'Sale & hire charges', id: 'saleAndHireCharges'},
    {title: 'Assigned revenue', id: 'assignedRevenue'},
    {title: 'Grants', id: 'grants'},
    {title: 'Interest Income', id: 'interestIncome'},
    {title: 'Other Income', id: 'otherIncome'}
  ],
  [
    {title: 'Population Category', id: 'populationCategory'},
    {title: 'Assigned Revenue And Compensation', id: 'assignedRevenueAndCompensationCoverPercentage'},
    {title: 'Deficit Finance By Capital Grants', id: 'deficitFinanceByCapitalGrantsCoverPercentage'},
    {title: 'Interest Income', id: 'interestIncomeCoverPercentage'},
    {title: 'Other Income ', id: 'otherIncomeCoverPercentage'},
    {title: 'Own Revenue ', id: 'ownRevenueCoverPercentage', description: '(A/B)'},
    {title: 'Revenue Grants Contribution And Subsidies', id: 'revenueGrantsContributionAndSubsidiesCoverPercentage'},
    {title: 'Sale And Hire Charges ', id: 'saleAndHireChargesCoverPercentage'}
  ],
  [
    {title: 'Population Category', click: true, id: 'populationCategory'},
    {title: 'Number of ULBs', id: 'numOfUlb'},
    {title: 'Establishment expense', id: 'establishmentExpense'},
    {title: 'Administrative Expense', id: 'administrativeExpense'},
    {title: 'Operational & Maint. Expense', id: 'operationalAndMaintananceExpense'},
    {title: 'Interest & Finance Expense ', id: 'interestAndFinanceExpense'},
    {title: 'Revenue Grants', id: 'revenueGrants'},
    {title: 'Others', id: 'other'}
  ],
  [
    {title: 'Population Category', click: true, id: 'populationCategory'},
    {title: 'Total number of ULBs', id: 'totalUlb', total: true},
    {title: 'Number of ULBs with Data', id: 'numOfUlb', total: true},
    {title: 'Cash & Bank Balance (Rs in crore)', roundOff: true, id: 'cashAndBankBalance', total: true}
  ],
  [
    {title: 'Population Category', click: true, id: 'populationCategory'},
    {title: 'Total number of ULBs', id: 'totalUlb', total: true},
    {title: 'Number of ULBs with Data', id: 'numOfUlb', total: true},
    {title: 'Loans from Central Government', roundOff: true, id: 'LoanFromCentralGovernment', total: true},
    {title: 'Loans from State Government', roundOff: true, id: 'loanFromStateGovernment', total: true},
    {title: 'Loans from Financial Institutions', roundOff: true, id: 'loanFromFIIB', total: true},
    {title: 'Bonds and Other Debt Instruments', roundOff: true, id: 'bondsAndOtherDebtInstruments', total: true},
    {title: 'Others', id: 'others', roundOff: true, total: true},
    {title: 'Total Debt', id: 'total', roundOff: true, total: true}
  ]
];

export const modalTableHeaders: (ModalTableHeader[])[] = [
  [
    {title: 'ULB name', click: true, id: 'name'},
    {title: 'Population', id: 'population', total: true},
    {title: 'Own Revenues (A) ', id: 'ownRevenue', total: true, roundOff: true, description: '(Rs in crores)'},
    {title: 'Revenue Expenditure (B)', id: 'revenueExpenditure', roundOff: true, total: true, description: '(Rs in crores)'},
    {title: 'Own Revenue % (A/B)', id: 'ownRevenuePercentage'},
  ],
  [
    {title: 'ULB name', id: 'name'},
    {title: 'Population', id: 'population', total: true},
    {title: 'Own revenues', id: 'ownRevenues', total: true},
    {title: 'Sale & hire charges', id: 'saleAndHireCharges', total: true},
    {title: 'Assigned revenue', id: 'assignedRevenue', total: true},
    {title: 'Grants', id: 'grants', total: true},
    {title: 'Interest Income', id: 'interestIncome', total: true},
    {title: 'Other Income', id: 'otherIncome', total: true}
  ],
  [
    {title: 'ULB name', id: 'name'},
    {title: 'Population', id: 'population', total: true},
    {title: 'Assigned Revenue And Compensation', id: 'assignedRevenueAndCompensationCoverPercentage'},
    {title: 'Deficit Finance By Capital Grants', id: 'deficitFinanceByCapitalGrantsCoverPercentage'},
    {title: 'Interest Income', id: 'interestIncomeCoverPercentage'},
    {title: 'Other Income ', id: 'otherIncomeCoverPercentage'},
    {title: 'Own Revenue ', id: 'ownRevenueCoverPercentage', description: '(A/B)'},
    {title: 'Revenue Grants Contribution And Subsidies', id: 'revenueGrantsContributionAndSubsidiesCoverPercentage'},
    {title: 'Sale And Hire Charges ', id: 'saleAndHireChargesCoverPercentage'}
  ],
  [
    {title: 'ULB name', id: 'name'},
    {title: 'Population', id: 'population', total: true},
    {title: 'Establishment expense', id: 'establishmentExpense', total: true},
    {title: 'Administrative Expense', id: 'administrativeExpense', total: true},
    {title: 'Operational & Maint. Expense', id: 'operationalAndMaintananceExpense', total: true},
    {title: 'Interest & Finance Expense ', id: 'interestAndFinanceExpense', total: true},
    {title: 'Revenue Grants', id: 'revenueGrants', total: true},
    {title: 'Others', id: 'other', total: true}
  ],
  [
    {title: 'ULB name', click: true, id: 'name'},
    {title: 'Population', id: 'population', total: true},
    {title: 'Cash & Bank Balance (Rs in crore)', total: true, roundOff: true, id: 'cashAndBankBalance'}
  ],
  [
    {title: 'ULB name', click: true, id: 'name'},
    {title: 'Population', id: 'population', total: true},
    {title: 'Loans from Central Government', roundOff: true, id: 'LoanFromCentralGovernment', total: true},
    {title: 'Loans from State Government', roundOff: true, id: 'loanFromStateGovernment', total: true},
    {title: 'Loans from Financial Institutions', roundOff: true, id: 'loanFromFIIB', total: true},
    {title: 'Bonds and Other Debt Instruments', roundOff: true, id: 'bondsAndOtherDebtInstruments', total: true},
    {title: 'Others', id: 'others', total: true, roundOff: true},
    {title: 'Total Debt', id: 'total', total: true, roundOff: true}
  ]
];

