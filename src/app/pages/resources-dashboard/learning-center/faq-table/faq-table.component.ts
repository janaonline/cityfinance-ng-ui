import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-faq-table',
  templateUrl: './faq-table.component.html',
  styleUrls: ['./faq-table.component.scss']
})
export class FaqTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

   AccountingTermsGlossary = [
    {
     "Term": "Tax Revenue",
     "Definition": "Tax revenue is the income gained by the government through taxation"
    },
    {
     "Term": "Non-Tax Revenue",
     "Definition": "Revenue to the government from sources other than taxes is called non-tax revenue e.g. income from interest, dividend, fees, fines, etc."
    },
    {
     "Term": "Assigned Revenues & Compensation",
     "Definition": "The term is used to refer to various tax\/duty\/cess\/surcharge\/levy etc., proceeds of which are (traditionally) collected by State Government (on behalf of) local bodies viz., Panchayat\/Municipality and (subsequently) adjusted with\/assigned to them."
    },
    {
     "Term": "Rental Income from Municipal Properties",
     "Definition": "the income received as rent from the buildings, sites etc"
    },
    {
     "Term": "Fee & User Charges",
     "Definition": "A user fee is a sum of money paid as a necessary condition to gain access to a particular service or facility. Examples of user fees could include highway tolls or parking garages. "
    },
    {
     "Term": "Sale & Hire charges",
     "Definition": "the amount of money received when municipal assets hired and sold."
    },
    {
     "Term": "Revenue Grants, Contributions & Subsidies",
     "Definition": "Grants are sums that usually do not have to be repaid but are to be used for defined purposes. Subsidies, on the other hand, refer to direct contributions, tax breaks and other special assistance that governments provide businesses to offset operating costs over a lengthy time period."
    },
    {
     "Term": "Income from Investment",
     "Definition": "Investment income is money that someone earns from an increase in the value of investments. It includes dividends paid on stocks, capital gains derived from property sales and interest earned on a savings or money market account."
    },
    {
     "Term": "Interest earned",
     "Definition": "Interest earned is the amount of interest earned from investments that pay the holder a regular series of mandated payments. For example, interest earned can be generated from funds invested in a certificate of deposit or an interest-bearing bank account."
    },
    {
     "Term": "Other Income",
     "Definition": "other income sources of the ULB"
    },
    {
     "Term": "Establishment Expenses",
     "Definition": "Establishment expenses on the other hand are expenses incurred after the company is incorporated. They are fixed in nature like building rent, office maintenance expenses etc."
    },
    {
     "Term": "Administrative Expenses",
     "Definition": "Administrative expenses are expenses an organization incurs that are not directly tied to a specific core function such as manufacturing, production, or sales. These overhead expenses are related to the organization as a whole, as opposed to individual departments or business units."
    },
    {
     "Term": "Operation & Maintenance",
     "Definition": "Operation and Maintenance Expenses means the reasonable and necessary costs of operating, maintaining, administering and repairing the System, including salaries, wages, costs of materials and supplies, insurance and audits, but excluding depreciation, debt service, tax equivalents and capital expenditures."
    },
    {
     "Term": "Interest & Finance Charges",
     "Definition": "the finance charge is the total fees that you pay to borrow the money in question. This means that the finance charge includes the interest and other fees that you pay in addition to paying back the loan."
    },
    {
     "Term": "Programme Expenses",
     "Definition": "Program expenses are those expenses incurred in order to deliver specific programs. These expenses are distinct from the other main categories of expenses for a nonprofit, which are fundraising expenses and management & administration expenses"
    },
    {
     "Term": "Revenue Grants, Contributions & Subsidies (Exp)",
     "Definition": null
    },
    {
     "Term": "Provisions and Write Off",
     "Definition": "Debt that cannot be recovered or collected from a debtor is bad debt. Under the provision or allowance method of accounting, businesses credit the \"Accounts Receivable\" category on the balance sheet by the amount of the uncollected debt. ... Under the direct write-off method, bad debts are expensed"
    },
    {
     "Term": "Miscellaneous Expenses",
     "Definition": "Miscellaneous expense is a term used to define and cover costs that typically do not fit within specific tax categories or account ledgers"
    },
    {
     "Term": "Depreciation on Fixed Assets",
     "Definition": "Depreciation is the systematic reduction of the recorded cost of a fixed asset. Examples of fixed assets that can be depreciated are buildings, furniture, and office equipment. The only exception is land, which is not depreciated "
    },
    {
     "Term": "Municipal (General) Fund",
     "Definition": "General Fund is the main operating fund for the City. It accounts for sources and uses of resources that (primarily) are discretionary to the City Council in the provision of activities, programs and services deemed necessary and desirable by the community"
    },
    {
     "Term": "Earmarked Funds",
     "Definition": "An earmark is a provision inserted into a discretionary spending appropriations bill that directs funds to a specific recipient while circumventing the merit-based or competitive funds allocation process."
    },
    {
     "Term": "Reserves",
     "Definition": "A reserve is a retained earnings secured by a company to strengthen a company's financial position, clear debt & credits, buy fixed assets, company expansion, legal requirements, investment and other plans. These are usually done to save the cash from being used in other purposes."
    },
    {
     "Term": "Grants, Contribution for Specific purposes",
     "Definition": "Grants are funds given by a specific party, particularly the government, corporations, foundations, educational institutions, businesses, or an individual for specific purposes of the ULB"
    },
    {
     "Term": "Secured Loans",
     "Definition": "A secured loan is a loan backed by collateral—financial assets you own, that can be used as payment to the lender if you don't pay back the loan."
    },
    {
     "Term": "Unsecured Loans",
     "Definition": "An Unsecured Loan is a loan provided solely based on the creditworthiness of the borrower without pledging any collateral as security in the event of default or non-payment of dues. Unsecured loans are also referred to as personal loans and generally provided to borrowers with high credit ratings."
    },
    {
     "Term": "Deposits received",
     "Definition": "money that a company receives from a customer prior to the company earning it (by providing the customer with goods or services). In other words, the company receives the asset Cash and has an obligation to provide the goods or services to the customer or to return the money."
    },
    {
     "Term": "Deposit Works",
     "Definition": "The term 'Deposit Works' is applied to works of construction or repairs and maintenance, the cost of which is met out of Government grants to autonomous or semi-autonomous bodies or institutions through their Administrative Ministries, or is financed from non-Government sources wholly or partly"
    },
    {
     "Term": "Other Liabilities (Sundry Creditors)",
     "Definition": "Sundry creditors are considered as liabilities to a business as they are supposed to pay outstanding amount, for a specific transaction, based on the agreed timeline by both the parties"
    },
    {
     "Term": "Provisions",
     "Definition": "Provisions represent funds put aside by a company to cover anticipated losses in the future"
    },
    {
     "Term": "Gross Block Assets",
     "Definition": "Gross block is the sum total of all assets of the company valued at their cost of acquisition. This is inclusive of the depreciation that is to be charged on each asset. Net block is the gross block less accumulated depreciation on assets. Net block is actually what the asset are worth to the company."
    },
    {
     "Term": "Accumulated Depreciation",
     "Definition": "Accumulated depreciation is the total amount of the depreciation expenditure allocated to a particular asset since the asset was used. It is a contra asset account, i.e. a negative asset account that offsets the balance in the asset account with which it is usually linked"
    },
    {
     "Term": "Capital Work-in-progress",
     "Definition": "Capital work in progress means if any machine is not completed till the date of the balance sheet all the costs incurred on the same are added to the Capital work in progress account."
    },
    {
     "Term": "Investment - General Fund",
     "Definition": "General fund refers to revenues accruing to the state from taxes, fees, interest earnings, and other sources which can be used for the general operation of state government. General fund revenues are not specifically required in statute or in the constitution to support particular programs or agencies"
    },
    {
     "Term": "Investment - Other Funds",
     "Definition": "All other types of funds available as investments with the ULBs"
    },
    {
     "Term": "Stock in Hand (Inventories)",
     "Definition": "With 'on hand inventory' is generally intended the amount of stock items available to an ULB , ready to be immediately sold or used by consumers"
    },
    {
     "Term": "Sundry Debtors (Receivables)",
     "Definition": "A person who receives goods or services from a business in credit or does not make the payment immediately and is liable to pay the business in the future is called a Sundry Debtor. "
    },
    {
     "Term": "Accumulated Provisions against Bad and Doubtful Receivables",
     "Definition": "The provision for doubtful debts is the estimated amount of bad debt that will arise from accounts receivable that have been issued but not yet collected. It is identical to the allowance for doubtful accounts."
    },
    {
     "Term": "Prepaid Expenses",
     "Definition": " A prepaid expense is a type of asset on the balance sheet that results from a business making advanced payments for goods or services to be received in the future. Prepaid expenses are initially recorded as assets, but their value is expensed over time onto the income statement."
    },
    {
     "Term": "Cash and Bank Balance",
     "Definition": "Cash and bank balances heading generally includes following: Cash in hand, Balances available with banks, Demand deposits (funds kept in bank account which can be withdrawn at any time without  prior notice); Any other short term highly liquid investments that are readily convertible to known amount of cash e.g. term deposits, prize bonds etc."
    },
    {
     "Term": "Loans, Advances and Deposits",
     "Definition": "Loans refer to a debt provided by a financial institution for a particular period while Advances are the funds provided by the banks to the business to fulfill working capital requirement which are to be payable within one year."
    },
    {
     "Term": "CAGR",
     "Definition": "Compounded Annual Growth Rate(CAGR) = Rate of annual increase\/decrease in total revenue between the base year and the latest year"
    },
    {
     "Term": "Revenue Per Capita",
     "Definition": "Total Revenue earned or received by  the ULB per person during the financial year"
    },
    {
     "Term": "Revenue Mix",
     "Definition": "Revenue mix refers to the combination of own revenues, assigned revenues, grants-in-aid (central and state grants) and other receipts, which together constitute the total revenue of the ULB"
    },
    {
     "Term": "Total Revenue",
     "Definition": "\"Sum of:  (a) tax revenues, (b) non-tax revenues, (c) assigned (shared) revenue, (c) grants-in-aid, (d) loans and (e) other receipts."
    },
    {
     "Term": "Total Surplus Deficit",
     "Definition": "Excess\/Deficit of Total Revenue over Total Expenditure"
    },
    {
     "Term": "Expenditure Mix",
     "Definition": "Expenditure mix refers to the combination of revenue expenditure and capital expenditure, which constitute the total expenditure of the ULB"
    },
    {
     "Term": "Capital Expenditure",
     "Definition": "Expenditure incurred by a ULB towards buying and building long term assets including public infrastructure, construction of building and other fixed assets such as vehicles,equipment,etc"
    },
    {
     "Term": "Total Property tax collection",
     "Definition": "The total amount of property tax collected by the ULB, noted under own revenue."
    }
   ]

}

 


