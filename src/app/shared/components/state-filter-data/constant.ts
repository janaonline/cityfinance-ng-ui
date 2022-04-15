export const stateDashboardSubTabsList: any = [
    // Revenue Tab -> Sub Tabs
    {name: "Total Revenue", code: "TotalRevenue", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Revenue Per Capita", code: "RevenuePerCapita", yAxisLabel: 'Amount (in INR)', countAccessKey: "revenuePerCapita", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
    {name: "Revenue Mix", code: "RevenueMix", yAxisLabel: 'Amount (in INR)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: true},
    
    // Expenditure Tab -> Sub Tabs
    
    {name: "Total Surplus/Deficit", code: "DeficitOrSurplus", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "deficitOrSurplus", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Expenditure Mix", code: "ExpenditureMix", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: true},
    {name: "Revenue Expenditure Mix", code: "RevenueExpenditureMix", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
    {name: "Revenue Expenditure", code: "RevenueTotalExpenditure", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},

    // Own Revenue Tab -> Sub Tabs

    {name: "Total Own Revenue", code: "TotalOwnRevenue", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Own Revenue per Capita", code: "OwnRevenuePerCapita", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "revenuePerCapita", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
    {name: "Own Revenue Mix", code: "OwnRevenueMix", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: true},

    // Capital Expenditure Tab -> Sub Tabs

    {name: "Capital Expenditure", code: "CapitalTotalExpenditure", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Capital Expenditure Per Capita", code: "CapitalExpenditurePerCapita", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "revenueExpendPerCapita", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
  ];