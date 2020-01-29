/**
 * IMPORTANT
 * Do not use this class for downloading the table content other than the report tables.
 * It is specifically made for that tabl only. For a more generic table to csv,
 * create another class using this class as base.
 */
import { Injectable } from '@angular/core';
import * as ExcelJs from 'exceljs';
import * as FileSaver from 'file-saver';

import * as logoFile from './base64Logo.js';
import { IIExcelInput } from './models/excelFormat';

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

interface CustomArray<T> {
  flat(): Array<T>;
  flatMap(func: (x: T) => T): Array<T>;
}

@Injectable()
export class ExcelService {
  private readonly DEFAULT = {
    FONT_SIZE: 14
  };
  constructor() {}

  transformTableToExcelData(title: string, html, filename: string) {
    filename = title;
    let excel = [];

    // Get all the row from table
    const rows = document.querySelectorAll("table tr");
    const cellsToMerge: {
      row: { from: number; to: number };
      column: { from: number; to: number };
    }[] = [];

    let largestColumnInARow = -1;
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      let row = [];

      // Get all the columns for the current row.
      const cols = rows[rowIndex].querySelectorAll("td, th");
      largestColumnInARow =
        largestColumnInARow < cols.length ? cols.length : largestColumnInARow;
      let columnCounter = 0;
      for (let columnIndex = 0; columnIndex < cols.length; columnIndex++) {
        if (cols[columnIndex].innerHTML) {
          const element = <HTMLElement>cols[columnIndex];

          // If a row or column is merged, we will need to merge them in csv/xls file also.
          const rowspan = element.getAttribute("rowspan");
          const colspan = element.getAttribute("colspan");
          if (rowspan || colspan) {
            const rowNumber = 3 + rowIndex;
            cellsToMerge.push({
              row: {
                from: rowNumber,
                to: rowNumber + (+rowspan ? +rowspan - 1 : 0)
              },
              column: {
                from: columnCounter,
                to: columnCounter + (+colspan ? +colspan : 0)
              }
            });
            columnCounter += +colspan ? +colspan : 1;
          }

          row[columnIndex] = cols[columnIndex]["innerText"];
        } else {
          row[columnIndex] = "";
        }
      }
      if (row.length < largestColumnInARow) {
        const newArray = new Array(largestColumnInARow - row.length).fill("");
        row = newArray.concat(row);
      }
      excel.push(row);
    }

    // Here we are set column if multiple date/year are selected.
    excel = excel.map((row, index) => {
      if (row.length < largestColumnInARow) {
        const newArray: CustomArray<string> | any = [];
        const tableHeaders = Array.from(
          rows[index + 1].querySelectorAll("td, th")
        );
        tableHeaders.forEach(header => {
          const noOfColumnRequired = +header.getAttribute("colspan");
          const emptyColumns = new Array(noOfColumnRequired).fill("");
          emptyColumns[0] = header.textContent;
          newArray.push(emptyColumns);
        });
        row = newArray.flat();
        return row;
      } else {
        return row;
      }
    });
    if (excel.length == 0) {
      alert("No records to download");
    }
    const headers = [];
    const tableTitles = rows[2].querySelectorAll("th");
    for (let i = 0; i < tableTitles.length; i++) {
      headers.push(tableTitles[i].innerHTML);
    }

    excel = excel.map((columns, index) => {
      if (excel.slice(2).every(column => column[0] === "") && index) {
        return columns.slice(1);
      } else {
        return columns;
      }
    });
    this.generateExcel(title, headers, excel, filename, cellsToMerge);
  }

  addLogoToFile(workbook: ExcelJs.Workbook, worksheet: ExcelJs.Worksheet) {
    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: "png"
    });
    // worksheet.addImage(logo, {
    //   tl: { col: 0.1, row: 0.1 },
    //   ext: { width: 180, height: 31 }
    // });
    worksheet.addImage(logo, "A1:A2");
    worksheet.mergeCells("A1:A2");

    // Color for logo backgeound
    worksheet
      .getRow(1)
      .eachCell({ includeEmpty: true }, function(cell, rowNumber) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "000001" },
          bgColor: { argb: "000001" }
        };
      });
    worksheet
      .getRow(2)
      .eachCell({ includeEmpty: true }, function(cell, rowNumber) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "000001" },
          bgColor: { argb: "000001" }
        };
      });
  }

  generateExcel(
    title: string,
    header: any[],
    data: any[],
    excelFileName: string,
    cellsToMerge: {
      row: { from: number; to: number };
      column: { from: number; to: number };
    }[]
  ) {
    // Create workbook and worksheet
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    this.addLogoToFile(workbook, worksheet);

    // Blank Row after  logo is placed.
    worksheet.addRow([]);

    // Add Rows and formatting
    for (let i = 0; i < data.length; i++) {
      const row = worksheet.addRow(data[i]);
      const rowToMerges = cellsToMerge.filter(
        option => option.row.from - 3 === i
      );
      rowToMerges.forEach(rowToMerge => {
        /**
         * Merge the rows and columns given. 65 = A, 90 = Z. Since columns in excel file are
         * in the format A1, B1, C1 and so on. We will need to merge them.
         */

        const rowFrom =
          String.fromCharCode(65 + rowToMerge.column.from) +
          rowToMerge.row.from;
        const rowTo =
          String.fromCharCode(65 + rowToMerge.column.from) + rowToMerge.row.to;
        if (rowFrom !== rowTo) {
          worksheet.mergeCells(`${rowFrom}:${rowTo}`);
        }
      });

      if (i < 3 || !data[i][0]) {
        row.eachCell((cell, number) => {
          // Yellow color for headers / bold text.
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFFF00" },
            bgColor: { argb: "FF0000FF" }
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
          };

          // console.log(cell.value, this.canAlignRight(cell) ? "right" : "left");
          cell.alignment = {
            vertical: "bottom",
            horizontal: this.canAlignRight(cell) ? "right" : "left"
          };
          if (
            number === 2 &&
            (cell.value === "A.Income" || cell.value === "B.Expenditure")
          ) {
            cell.alignment.horizontal = "left";
          }
          cell.font = { bold: true, size: 9 };
          cell.alignment = {
            vertical: "middle",
            horizontal:
              cell.value.toString().includes("Total") ||
              this.isAmountValue(<string>cell.value) ||
              this.canAlignRight(cell)
                ? "right"
                : "center"
          };
          if (this.isSubHeader(cell)) {
            cell.alignment.horizontal = "left";
          }
          // if (i == 0 && number % 2 == 0) {
          //   // console.log(
          //   //   cell.value,
          //   //   this.canAlignRight(cell) ? "right" : "left"
          //   // );
          //   // cell.alignment = {
          //   //   vertical: "bottom",
          //   //   horizontal: this.canAlignRight(cell) ? "right" : "left"
          //   // };
          //   // cell.font = { bold: false };
          // } else {
          // }
        });
      } else {
        row.eachCell((cell, number) => {
          if (cell.value && number == 1) {
            cell.alignment = {
              vertical: "middle",
              horizontal: "center",
              wrapText: true
            };
          } else if (cell.value && number >= 3) {
            cell.alignment = {
              wrapText: true,

              vertical: "bottom",
              horizontal: this.canAlignRight(cell) ? "right" : "left"
            };
          }
        });
      }

      // Merge column here.
      rowToMerges.forEach(option => {
        if (option.column.from === option.column.to) {
          return;
        }
        const columnFrom =
          String.fromCharCode(65 + option.column.from) + option.row.from;
        const columnTo =
          String.fromCharCode(65 + option.column.to - 1) + option.row.from;
        worksheet.mergeCells(`${columnFrom}:${columnTo}`);
      });
    }

    this.setColumnsWidth(worksheet);
    worksheet.addRow([]);

    this.addBackgroundColorToLogoRow(worksheet);

    // Footer Row
    this.setFooter(worksheet);

    // Generate Excel File with given name
    // workbook.xlsx.writeBuffer().then((data: any) => {
    //   const blob = new Blob([data], {
    //     type:
    //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //   });
    //   const date = new Date().toLocaleDateString();
    //   FileSaver.saveAs(blob, excelFileName + `_(${date})` + EXCEL_EXTENSION);
    // });
    const date = new Date().toLocaleDateString();
    this.downloadFile(workbook, excelFileName + `_(${date})` + EXCEL_EXTENSION);
  }

  private downloadFile(workbook: ExcelJs.Workbook, fileName: string) {
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      FileSaver.saveAs(blob, fileName);
    });
  }

  addBackgroundColorToLogoRow(worksheet: ExcelJs.Worksheet) {
    const length = worksheet.actualColumnCount;
    if (length < 2) {
      return;
    }
    const col = String.fromCharCode(65 + length - 1);
    worksheet.getCell(`B1`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00000000" },
      bgColor: { argb: "FFFFFFFF" }
    };
    worksheet.mergeCells(`B1:${col}2`);
  }

  isSubHeader(cell) {
    return (
      cell.value === "B.Expenditure" ||
      cell.value === "A.Income" ||
      cell.value === "A. Liabilities" ||
      cell.value === "B. Assets" ||
      cell.value === "I. Reserves & Surplus" ||
      cell.value === "II. Grants , Contribution for specific purposes" ||
      cell.value === "III. Loans" ||
      cell.value === "IV. Current Liabilities and Provisions" ||
      cell.value === "I. Fixed Assets" ||
      cell.value === "II. Investments" ||
      cell.value === "III. Current Assets, Loans and Advances" ||
      cell.value === "IV. Other Assets"
    );
  }

  setFooter(worksheet: ExcelJs.Worksheet) {
    const footerRow = worksheet.addRow([
      "This is system generated excel sheet."
    ]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFCCFFE5" }
    };
    footerRow.getCell(1).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
  }

  setColumnsWidth(
    worksheet: ExcelJs.Worksheet,
    minWidth?: number,
    maxWidth?: number
  ) {
    for (let i = 0; i <= worksheet.actualColumnCount; i++) {
      if (i === 0) {
        worksheet.getColumn(1).width = minWidth ? minWidth : 25;
      } else if (i === 1) {
        worksheet.getColumn(2).width = minWidth ? minWidth : 32;
      } else {
        const newColumnWidth = this.getColumnWidth(worksheet.getColumn(i));
        worksheet.getColumn(i).width =
          maxWidth && newColumnWidth > maxWidth ? maxWidth : newColumnWidth;
      }
    }
  }

  getColumnWidth(column) {
    const minColumnWidth = 25;
    let maxNoOfCharacters = 0;
    column.values.forEach((value: string | null | undefined) => {
      if (!value) {
        return;
      }
      maxNoOfCharacters =
        value.length > maxNoOfCharacters ? value.length : maxNoOfCharacters;
    });
    return maxNoOfCharacters ? maxNoOfCharacters * 0.9 : minColumnWidth;
  }

  isAmountValue(value: string) {
    const indexOfFirstBracket = value.indexOf("(");
    let newValue = value;
    if (indexOfFirstBracket >= 0) {
      newValue = value.slice(value.indexOf("(") + 1, value.indexOf(")"));
    } else if (value.indexOf("%") >= 0) {
      newValue = value.slice(0, value.indexOf("%"));
    }
    newValue = newValue
      .split(",")
      .pop()
      .split(")")[0];
    return !isNaN(<any>newValue);
  }

  canAlignRight(cell) {
    return (
      this.isAmountValue(cell.value) ||
      cell.value.includes("Total") ||
      cell.value.includes("Net") ||
      cell.value.includes("Gross") ||
      cell.value.includes("Net Surplus") ||
      cell.value.includes("Surplus/(Deficit) (C) (A-B)") ||
      cell.value.includes("Data not available")
    );
  }

  downloadJSONAs(data: IIExcelInput) {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Data", {
      properties: { tabColor: { argb: "FFC0000" } }
    });

    if (data.skipStartingRows) {
      this.addEmptyRow(data.skipStartingRows, worksheet);
    }

    data.rows.forEach((columns, rowIndex) => {
      let texts = columns.map(cell => cell.text || "");
      if (data.skipStartingColumns) {
        texts = new Array(data.skipStartingColumns).fill(" ").concat(texts);
      }
      const row = worksheet.addRow(texts);
      row.font = {
        size: data.fontSize ? data.fontSize : this.DEFAULT.FONT_SIZE
      };
      row.eachCell((cell, cellIndex) => {
        const cellColumnConfig =
          columns[cellIndex - 1 - (data.skipStartingColumns || 0)];
        cell.style.font.bold = cellColumnConfig && cellColumnConfig.bold;
        // cell.alignment = { wrapText: true };
        if (cellColumnConfig && cellColumnConfig.backgroundColor) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: cellColumnConfig.backgroundColor }
          };
          /**
           * In the above line, you may be wondering why are we applying bakgrund color to
           * fbColor?. Well, we are usign solid pattern, and in solid pattern, fbColor is
           * applied to cell's background.
           */
        }
      });
    });

    this.setColumnsWidth(worksheet, 10, 30);
    worksheet.getCell("D6").alignment = { wrapText: true };

    const fileName = data.fileName.includes(EXCEL_EXTENSION)
      ? data.fileName
      : data.fileName + EXCEL_EXTENSION;
    this.downloadFile(workbook, fileName);
  }

  private addEmptyRow(rowQuantity: number, wokrsheet: ExcelJs.Worksheet) {
    while (rowQuantity-- > 0) {
      wokrsheet.addRow([""]);
    }
  }
}
