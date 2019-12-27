import { Injectable } from '@angular/core';
import * as ExcelJs from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import * as logoFile from './base64Logo.js';

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

interface CustomArray<T> {
  flat(): Array<T>;
  flatMap(func: (x: T) => T): Array<T>;
}

@Injectable()
export class ExcelService {
  constructor() {}

  transformTableToExcelData(title, html, filename) {
    filename = title;
    let excel = [];
    const rows = document.querySelectorAll("table tr");
    const cellsToMerge: {
      row: { from: number; to: number };
      column: { from: number; to: number };
    }[] = [];

    let largestColumnInARow = -1;
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      let row = [];
      const cols = rows[rowIndex].querySelectorAll("td, th");
      largestColumnInARow =
        largestColumnInARow < cols.length ? cols.length : largestColumnInARow;
      let columnCounter = 0;
      for (let columnIndex = 0; columnIndex < cols.length; columnIndex++) {
        if (cols[columnIndex].innerHTML) {
          const element = <HTMLElement>cols[columnIndex];
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

    // Here we are set column if multiple date are selected.
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

    // excel =excel.map(row => {
    //   row.length >= largestColumnInARow ? row : ;
    // })
    excel = excel.map((columns, index) => {
      if (excel.slice(2).every(column => column[0] === "") && index) {
        return columns.slice(1);
      } else {
        return columns;
      }
    });
    this.generateExcel(title, headers, excel, filename, cellsToMerge);
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

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: "png"
    });
    worksheet.addImage(logo, "B1:C2");
    worksheet.mergeCells("A1:D2");
    // worksheet.mergeCells('A1:' + this.getCellNameByNumber(header.length) + '2');
    if (cellsToMerge && cellsToMerge.length) {
      // cellsToMerge.forEach(cell => worksheet.mergeCells(cell));
    }
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

    // Blank Row
    worksheet.addRow([]);

    // Add Rows and formatting
    for (let i = 0; i < data.length; i++) {
      const row = worksheet.addRow(data[i]);
      const rowToMerges = cellsToMerge.filter(
        option => option.row.from - 3 === i
      );
      rowToMerges.forEach(rowToMerge => {
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
          console.log(cell, number);
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
          cell.alignment = {
            vertical: "bottom",
            horizontal: this.canAlignRight(cell) ? "right" : "left"
          };
          cell.font = { bold: true, size: 9 };
          if (i == 0 && number % 2 == 0) {
            cell.alignment = {
              vertical: "bottom",
              horizontal: this.canAlignRight(cell) ? "right" : "left"
            };
            cell.font = { bold: false };
            // } else{
            //   cell.alignment = { vertical: 'middle', horizontal: 'center' };
            // }
          } else {
            // if(i==1){
            cell.alignment = {
              vertical: "middle",
              horizontal: cell.value.toString().includes("Total")
                ? "right"
                : "center"
            };
          }
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

    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 40;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.addRow([]);

    // Footer Row
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
    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      const date = new Date().toLocaleDateString();
      FileSaver.saveAs(blob, excelFileName + `_(${date})` + EXCEL_EXTENSION);
    });
  }

  canAlignRight(cell) {
    return (
      cell.value.includes("Total") ||
      cell.value.includes("Net") ||
      cell.value.includes("Gross") ||
      cell.value.includes("Net Surplus") ||
      cell.value.includes("Surplus/(Deficit) (C) (A-B)") ||
      cell.value.includes("Surplus/(Deficit) (C) (A-B)") ||
      cell.value.includes("Surplus/(Deficit) (C) (A-B)") ||
      cell.value.includes("Surplus/(Deficit) (C) (A-B)") ||
      cell.value.includes("Surplus/(Deficit) (C) (A-B)")
    );
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  getCellNameByNumber(num: number): string {
    if (num == 4) {
      return "D";
    } else if (num == 5) {
      return "E";
    } else if (num == 6) {
      return "F";
    } else if (num == 7) {
      return "G";
    } else if (num == 8) {
      return "H";
    } else if (num == 9) {
      return "I";
    } else if (num == 10) {
      return "J";
    }
  }
}
