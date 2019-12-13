import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class ReportHelperService {
  constructor() {}

  /***************************************************************************
   ********************* MASTER DATA SECTION ***************************
   **************************************************************************/

  loadDefaultLinks() {
    return {
      "120-150": {
        index: -1,
        title: "Non-Tax Revenue",
        minVal: 120,
        maxVal: 150,
        equals: 0
      },
      "170-180": {
        index: -1,
        title: "Other Income",
        minVal: 170,
        maxVal: 180,
        equals: 0
      },
      "250, 270-290": {
        index: -1,
        title: "Other Expenses",
        minVal: 270,
        maxVal: 290,
        equals: 250
      },

      "310-312": {
        index: -1,
        title: "Reserves & Surplus",
        minVal: 310,
        maxVal: 312
      },
      "330-331": { index: -1, title: "Loans", minVal: 330, maxVal: 331 },
      "340-360": {
        index: -1,
        title: "Current Liabilities and Provisions",
        minVal: 340,
        maxVal: 360
      },
      "410-412": { index: -1, title: "Fixed Assets", minVal: 410, maxVal: 412 },
      "420-421": { index: -1, title: "Investments", minVal: 420, maxVal: 421 },
      "430-461": {
        index: -1,
        title: "Current Assets, Loans and Advances",
        minVal: 430,
        maxVal: 461
      },
      "470-480": { index: -1, title: "Other Assets", minVal: 470, maxVal: 480 }
    };
  }

  getIEReportMasterKeys() {
    return [
      "income",
      "110",
      "120",
      "130",
      "140",
      "150",
      "160",
      "170",
      "171",
      "180",
      "100",
      "totalIncome",
      "expenditure",
      "210",
      "220",
      "230",
      "240",
      "250",
      "260",
      "270",
      "271",
      "272",
      "200",
      "totalExp",
      "grossSurplusBefore",
      "280",
      "grossSurplusAfter",
      "290",
      "netBalance"
    ];
  }

  getIEReportLookup() {
    return {
      "110": {
        code: 110,
        head_of_account: "Revenue",
        line_item: "Tax Revenue"
      },
      "120": {
        code: 120,
        head_of_account: "Revenue",
        line_item: "Assigned Revenues & Compensation"
      },
      "130": {
        code: 130,
        head_of_account: "Revenue",
        line_item: "Rental Income from Municipal Properties"
      },
      "140": {
        code: 140,
        head_of_account: "Revenue",
        line_item: "Fee & User Charges"
      },
      "150": {
        code: 150,
        head_of_account: "Revenue",
        line_item: "Sale & Hire charges"
      },
      "160": {
        code: 160,
        head_of_account: "Revenue",
        line_item: "Revenue Grants, Contributions & Subsidies"
      },
      "170": {
        code: 170,
        head_of_account: "Revenue",
        line_item: "Income from Investment"
      },
      "171": {
        code: 171,
        head_of_account: "Revenue",
        line_item: "Interest earned"
      },
      "180": {
        code: 180,
        head_of_account: "Revenue",
        line_item: "Other Income"
      },
      "100": { code: 100, head_of_account: "Revenue", line_item: "Others" },
      "210": {
        code: 210,
        head_of_account: "Expense",
        line_item: "Establishment Expenses"
      },
      "220": {
        code: 220,
        head_of_account: "Expense",
        line_item: "Administrative Expenses"
      },
      "230": {
        code: 230,
        head_of_account: "Expense",
        line_item: "Operation & Maintenance"
      },
      "240": {
        code: 240,
        head_of_account: "Expense",
        line_item: "Interest & Finance Charges"
      },
      "250": {
        code: 250,
        head_of_account: "Expense",
        line_item: "Programme Expenses"
      },
      "260": {
        code: 260,
        head_of_account: "Expense",
        line_item: "Revenue Grants, Contributions & Subsidies (Exp)"
      },
      "270": {
        code: 270,
        head_of_account: "Expense",
        line_item: "Provisions and Write Off"
      },
      "271": {
        code: 271,
        head_of_account: "Expense",
        line_item: "Miscellaneous Expenses"
      },
      "272": {
        code: 272,
        head_of_account: "Expense",
        line_item: "Depreciation on Fixed Assets"
      },
      "280": {
        code: 280,
        head_of_account: "Expense",
        line_item: "Prior Period items"
      },
      "290": {
        code: 290,
        head_of_account: "Expense",
        line_item: "Transfer to Reserve Funds"
      },
      "200": { code: 200, head_of_account: "Expense", line_item: "Others" }
    };
  }

  getIECalcFields() {
    return [
      { keyName: "income", title: "A.Income", isCalc: false, prePushCode: 110 },
      {
        keyName: "totalIncome",
        title:
          "Total Income(A) (110 + 120 + 130 + 140 + 150 + 160 + 170 + 171 + 180 + 100)",
        isCalc: true,
        postPushCode: 180,
        addFields: [
          "110",
          "120",
          "130",
          "140",
          "150",
          "160",
          "170",
          "171",
          "180",
          "100"
        ]
      },
      {
        keyName: "expenditure",
        title: "B.Expenditure",
        isCalc: false,
        prePushCode: 210
      },
      {
        keyName: "totalExp",
        title:
          "Total Expenditure(B) (210 + 220 + 230 + 240 + 250 + 260 + 270 + 271 + 272 + 200)",
        isCalc: true,
        postPushCode: 272,
        addFields: [
          "210",
          "220",
          "230",
          "240",
          "250",
          "260",
          "270",
          "271",
          "272",
          "200"
        ]
      },
      {
        keyName: "grossSurplusBefore",
        title:
          "Gross Surplus/(Deficit) of Income over Expenditure before Prior Period Items (C) (A-B) ",
        isCalc: true,
        prePushCode: 280,
        addFields: ["totalIncome"],
        subtractFields: ["totalExp"]
      },
      {
        keyName: "grossSurplusAfter",
        title:
          "Gross Surplus/(Deficit) of Income over Expenditure after Prior Period Items item(D) (C-280)",
        isCalc: true,
        prePushCode: 290,
        addFields: ["grossSurplusBefore", "280"]
      },
      {
        keyName: "netBalance",
        title: "Net Surplus/(Deficit) carried over (E) (D-290)",
        isCalc: true,
        postPushCode: 290,
        addFields: ["grossSurplusAfter"],
        subtractFields: ["290"]
      }
    ];
  }

  getIESummaryMasterKeys() {
    return [
      "income",
      "110",
      "120-150",
      "160",
      "170-180",
      "100",
      "totalIncome",
      "expenditure",
      "210",
      "220",
      "230",
      "240",
      "260",
      "250, 270-290",
      "200",
      "totalExp",
      "surplusDeficit"
    ];
  }

  getIESummaryCalcFields() {
    return [
      { keyName: "income", title: "A.Income", isCalc: false },

      {
        keyName: "120-150",
        code: "120-150",
        title: "Non-Tax Revenue",
        isCalc: true,
        addFields: ["120", "130", "140", "150"],
        delFields: ["120", "130", "140", "150"]
      },
      {
        keyName: "170-180",
        code: "170-180",
        title: "Other Income",
        isCalc: true,
        addFields: ["170", "171", "180"],
        delFields: ["170", "171", "180"]
      },
      {
        keyName: "totalIncome",
        title: "Total Income(A)",
        isCalc: true,
        addFields: ["110", "120-150", "160", "170-180", "100"]
      },

      { keyName: "expenditure", title: "B.Expenditure", isCalc: false },
      {
        keyName: "250, 270-290",
        code: "250, 270-290",
        title: "Other Expenses",
        isCalc: true,
        addFields: ["250", "270", "271", "272", "280", "290"],
        delFields: ["250", "270", "271", "272", "280", "290"]
      },
      {
        keyName: "totalExp",
        title: "Total Expenditure(B)",
        isCalc: true,
        addFields: ["210", "220", "230", "240", "260", "250, 270-290", "200"]
      },

      {
        keyName: "surplusDeficit",
        title: "Surplus/(Deficit) (C) (A-B)",
        isCalc: true,
        addFields: ["totalIncome"],
        subtractFields: ["totalExp"]
      }
    ];
  }

  getBSReportMasterKeys() {
    return [
      "liabilities",
      "resSurplus",
      "310",
      "311",
      "312",
      "totalResSurplus",
      "gcSp",
      "320",
      "total320",
      "loans",
      "330",
      "331",
      "totalLoans",
      "curLibProv",
      "340",
      "341",
      "350",
      "360",
      "300",
      "totalCurLibProv",
      "totalLiability",
      "assets",
      "fixedAssets",
      "410",
      "411",
      "netBlock",
      "412",
      "totalFixedAssets",
      "investments",
      "420",
      "421",
      "totalInvestments",
      "curALA",
      "430",
      "431",
      "432",
      "netAmtOutstanding1",
      "440",
      "450",
      "460",
      "461",
      "netAmtOutstanding2",
      "totalCALA",
      "otherAssets",
      "470",
      "480",
      "400",
      "totalOtherAssets",
      "totalAssets"
    ];
  }

  getBSReportLookup() {
    return {
      "310": {
        code: 310,
        head_of_account: "Revenue",
        line_item: "Municipal (General) Fund"
      },
      "311": {
        code: 311,
        head_of_account: "Revenue",
        line_item: "Earmarked Funds"
      },
      "312": { code: 312, head_of_account: "Revenue", line_item: "Reserves" },
      "320": {
        code: 320,
        head_of_account: "Revenue",
        line_item: "Grants, Contribution for Specific purposes"
      },
      "330": {
        code: 330,
        head_of_account: "Revenue",
        line_item: "Secured Loans"
      },
      "331": {
        code: 331,
        head_of_account: "Revenue",
        line_item: "Unsecured Loans"
      },
      "340": {
        code: 340,
        head_of_account: "Revenue",
        line_item: "Deposits received"
      },
      "341": {
        code: 341,
        head_of_account: "Revenue",
        line_item: "Deposit Works"
      },
      "350": {
        code: 350,
        head_of_account: "Revenue",
        line_item: "Other Liabilities (Sundry Creditors)"
      },
      "360": { code: 360, head_of_account: "Revenue", line_item: "Provisions" },
      "300": { code: 300, head_of_account: "Expense", line_item: "Others" },
      "410": {
        code: 410,
        head_of_account: "Expense",
        line_item: "Gross Block"
      },
      "411": {
        code: 411,
        head_of_account: "Expense",
        line_item: "Accumulated Depreciation"
      },
      "412": {
        code: 412,
        head_of_account: "Expense",
        line_item: "Capital Work-in-progress"
      },
      "420": {
        code: 420,
        head_of_account: "Expense",
        line_item: "Investment - General Fund"
      },
      "421": {
        code: 421,
        head_of_account: "Expense",
        line_item: "Investment - Other Funds"
      },
      "430": {
        code: 430,
        head_of_account: "Expense",
        line_item: "Stock in Hand (Inventories)"
      },
      "431": {
        code: 431,
        head_of_account: "Expense",
        line_item: "Sundry Debtors (Receivables)"
      },
      "432": {
        code: 432,
        head_of_account: "Expense",
        line_item: "Accumulated Provisions against Bad and Doubtful Receivables"
      },
      "440": {
        code: 440,
        head_of_account: "Expense",
        line_item: "Prepaid Expenses"
      },
      "450": {
        code: 450,
        head_of_account: "Expense",
        line_item: "Cash and Bank Balance"
      },
      "460": {
        code: 460,
        head_of_account: "Expense",
        line_item: "Loans, Advances and Deposits"
      },
      "461": {
        code: 461,
        head_of_account: "Expense",
        line_item: "accumulated provisions against loans, advances and deposits"
      },
      "470": {
        code: 470,
        head_of_account: "Expense",
        line_item: "Other Assets"
      },
      "480": {
        code: 480,
        head_of_account: "Expense",
        line_item: "Miscellaneous Expenditure (to the extent not written off)"
      },
      "400": { code: 400, head_of_account: "Expense", line_item: "Others" }
    };
  }

  // Balance Sheet -> Detailed Report.
  getBSCalcFields() {
    return [
      { keyName: "liabilities", title: "A. Liabilities", isCalc: false },
      { keyName: "resSurplus", title: "I. Reserves & Surplus", isCalc: false },
      {
        keyName: "totalResSurplus",
        title: "Total Reserves & Surplus I (310 + 311 + 312)",
        isCalc: true,
        addFields: ["310", "311", "312"]
      },
      {
        keyName: "gcSp",
        title: "II. Grants , Contribution for specific purposes",
        isCalc: false
      },
      {
        keyName: "total320",
        title: "Total Grants , Contribution for specific purposes (II) (320)",
        isCalc: true,
        addFields: ["320"]
      },
      { keyName: "loans", title: "III. Loans", isCalc: false },
      {
        keyName: "totalLoans",
        title: "Total Loans (III) (330 + 331)",
        isCalc: true,
        addFields: ["330", "331"]
      },
      {
        keyName: "curLibProv",
        title: "IV. Current Liabilities and Provisions",
        isCalc: false
      },
      {
        keyName: "totalCurLibProv",
        title:
          "Total Current Liabilities and Provisions (IV) (340 + 341 + 350 + 360 + 300)",
        isCalc: true,
        addFields: ["340", "341", "350", "360", "300"]
      },
      {
        keyName: "totalLiability",
        title: "Total Liabilities (I + II + III + IV)",
        isCalc: true,
        addFields: [
          "totalResSurplus",
          "total320",
          "totalLoans",
          "totalCurLibProv"
        ]
      },
      { keyName: "assets", title: "B. Assets", isCalc: false },
      { keyName: "fixedAssets", title: "I. Fixed Assets", isCalc: false },
      {
        keyName: "netBlock",
        title: "Net Block (410 - 411)",
        isCalc: true,
        addFields: ["410", "411"]
      },
      {
        keyName: "totalFixedAssets",
        title: "Total Fixed Assets (I) (410 - 411 + 412)",
        isCalc: true,
        addFields: ["netBlock", "412"]
      },
      { keyName: "investments", title: "II. Investments", isCalc: false },
      {
        keyName: "totalInvestments",
        title: "Total Investments (II) (420 + 421)",
        isCalc: true,
        addFields: ["420", "421"]
      },
      {
        keyName: "curALA",
        title: "III. Current Assets, Loans and Advances",
        isCalc: false
      },
      {
        keyName: "netAmtOutstanding1",
        title: "Net amount outstanding (431 - 432) ",
        isCalc: true,
        addFields: ["430", "431", "432"]
      },
      {
        keyName: "netAmtOutstanding2",
        title:
          "Net amount outstanding (II) (430 + 431 + 432 + 440 + 450 + 460)",
        isCalc: true,
        addFields: ["440", "450", "460", "461"]
      },

      {
        keyName: "totalCALA",
        title: "Total Current Assets, Loans and Advances (III)",
        isCalc: true,
        addFields: ["netAmtOutstanding1", "netAmtOutstanding2"]
      },
      { keyName: "otherAssets", title: "IV. Other Assets", isCalc: false },

      {
        keyName: "totalOtherAssets",
        title: "Total Other Assets (IV) (470 + 480 + 400)",
        isCalc: true,
        addFields: ["470", "480", "400"]
      },

      {
        keyName: "totalAssets",
        title: "Total Assets (I + II + III + IV)",
        isCalc: true,
        addFields: [
          "totalFixedAssets",
          "totalInvestments",
          "totalCALA",
          "470",
          "480",
          "400"
        ]
      }
    ];
  }

  getBSSummaryReportMasterKeys() {
    return [
      "liabilities",
      "310-312",
      "320",
      "330-331",
      "340-360",
      "300",
      "totalLiability",
      "assets",
      "410-412",
      "420-421",
      "430-461",
      "470-480",
      "400",
      "totalAssets"
    ];
  }

  getBSSummaryCalcFields() {
    return [
      { keyName: "liabilities", title: "A. Liabilities", isCalc: false },
      {
        keyName: "310-312",
        code: "310-312",
        title: "Reserves & Surplus",
        isCalc: true,
        addFields: ["310", "311", "312"],
        delFields: ["310", "311", "312"]
      },
      {
        keyName: "330-331",
        code: "330-331",
        title: "Loans",
        isCalc: true,
        addFields: ["330", "331"],
        delFields: ["330", "331"]
      },
      {
        keyName: "340-360",
        code: "340-360",
        title: "Current Liabilities and Provisions",
        isCalc: true,
        addFields: ["340", "341", "350", "360"],
        delFields: ["340", "341", "350", "360"]
      },

      {
        keyName: "totalLiability",
        title: "Total Liabilities (A)",
        isCalc: true,
        addFields: ["310-312", "320", "330-331", "340-360", "300"]
      },

      { keyName: "assets", title: "B. Assets", isCalc: false },
      {
        keyName: "410-412",
        code: "410-412",
        title: "Fixed Assets",
        isCalc: true,
        addFields: ["410", "411", "412"],
        delFields: ["410", "411", "412"]
      },
      {
        keyName: "420-421",
        code: "420-421",
        title: "Investments",
        isCalc: true,
        addFields: ["420", "421"],
        delFields: ["420", "421"]
      },
      {
        keyName: "430-461",
        code: "430-461",
        title: "Current Assets, Loans and Advances",
        isCalc: true,
        addFields: ["430", "431", "432", "440", "450", "460", "461"],
        delFields: ["430", "431", "432", "440", "450", "460", "461"]
      },
      {
        keyName: "470-480",
        code: "470-480",
        title: "Other Assets",
        isCalc: true,
        addFields: ["470", "480"],
        delFields: ["470", "480"]
      },
      {
        keyName: "totalAssets",
        title: "Total Assets (B)",
        isCalc: true,
        addFields: ["410-412", "420-421", "430-461", "470-480", "400"]
      }
    ];
  }
  // { keyName: 'netAmtOutstanding1', title: 'Net amount outstanding (i)', isCalc: true, addFields: ['430', '431'], subtractFields: ['432'] },
  // { keyName: 'netAmtOutstanding2', title: 'Net amount outstanding (ii)', isCalc: true, addFields: ['440', '450', '460'], subtractFields: ['461'] },
  // { keyName: 'totalCALA', title: 'Total Current Assets, Loans and Advances (i + ii)', isCalc: true, addFields: ['netAmtOutstanding1', 'netAmtOutstanding2'] },

  /***************************************************************************
   ********************* METHOD DEFINITION SECTION ***************************
   **************************************************************************/

  populateCalcFields(result: any, years: any[], reportType) {
    // let calcFields = [];
    // if(reportType == 'BS'){
    //   calcFields = this.getBSCalcFields();
    // } else if(reportType == 'BSSUM'){
    //   calcFields = this.getBSSummaryCalcFields();
    // } else if(reportType == 'IE') {
    //   calcFields = this.getIECalcFields();
    // } else { // IE Summary
    //   calcFields = this.getIESummaryCalcFields();
    // }
    // // for (let i = 0; i < calcFields.length; i++) {
    // //   result[calcFields[i].keyName] = { 'line_item': calcFields[i].title, isBold: true };
    // // }

    // for (let i = 0; i < calcFields.length; i++) {
    //   let keyName = calcFields[i].keyName;
    //   result[keyName] = { 'line_item': calcFields[i].title, isBold: true };
    //   if(calcFields[i].code){
    //     result[keyName]['code'] = calcFields[i].code;
    //     result[keyName].isBold = false;
    //   }
    //   if(calcFields[i].isCalc){
    //     for (let j = 0; j < years.length; j++) {

    //       let sum = 0;
    //       const addFields = calcFields[i].addFields;
    //       const subtractFields = calcFields[i].subtractFields;

    //       /** loop through each result line item and add values for specific year */
    //       for (let k = 0; k < addFields.length; k++) {
    //         if(result[addFields[k]] && result[addFields[k]][years[j]['title']]){ // if amount available for specified year then add them
    //           sum = sum + result[addFields[k]][years[j]['title']];
    //         }

    //         if(calcFields[i].delFields && calcFields[i].delFields.indexOf(result[addFields[k]]) > -1){ //if the line item comes under delete fields then delete them
    //           delete result[addFields[k]];
    //         }
    //       }

    //       if(subtractFields && subtractFields.length>0){
    //         if(result[subtractFields[0]] && result[subtractFields[0]][years[j]['title']]){
    //           sum = sum - result[subtractFields[0]][years[j]['title']];
    //         }
    //       }

    //       result[keyName][years[j]['title']] = sum;

    //     }
    //   }
    // }

    return true;
  }

  calculateIESurplus(aggregate, years) {
    const temp = {};
    for (let i = 0; i < years.length; i++) {
      const yr = years[i].title;
      temp[yr] = aggregate["Revenue"][yr] - aggregate["Expense"][yr];
    }
    return temp;
  }

  // getSummaryReport(report: any, years: any) {
  //   let links = this.loadDefaultLinks();
  //   const linksKey = Object.keys(links)
  //   let keys = Object.keys(report);
  //   for (let i = 0; i < keys.length; i++) {
  //     for (let j = 0; j < report[keys[i]].length; j++) {
  //       const entry = report[keys[i]][j];
  //       // { "code": 110, "line_item": "Tax Revenue", "head_of_account": "Revenue", "2016-17": 60912400, "percentChange": "--" }

  //       loopK: for (let k = 0; k < linksKey.length; k++) {
  //         const link = links[linksKey[k]];
  //         if ( (entry['code'] >= link['minVal'] && entry['code'] <= link['maxVal']) || entry['code'] == link['equals']) {
  //           if (link['index'] == -1) {
  //             link['index'] = j;
  //             entry.code = linksKey[k];
  //             entry.line_item = link['title'];
  //           } else {
  //             let prevEntry = report[keys[i]][link['index']];
  //             // prevEntry['2015-16'] = this.add(prevEntry['2015-16'], entry['2015-16']);
  //             // prevEntry['2016-17'] = this.add(prevEntry['2016-17'], entry['2016-17']);

  //             for (let i = 0; i < years.length; i++) {
  //               let yr = years[i].title;
  //               prevEntry[yr] = Math.round(this.add( parseFloat(prevEntry[yr]), parseFloat(entry[yr])));

  //             }
  //             report[keys[i]][link['index']] = prevEntry;
  //             report[keys[i]].splice(j, 1);
  //           }
  //           j = j - 1;
  //           continue loopK;
  //         }
  //       }

  //     };
  //   }

  //   return report;
  // }

  // add(a, b){
  //   if(a && b){
  //     return a+b;
  //   } else if(a){
  //     return a;
  //   } else{
  //     return b;
  //   }
  // }
}
