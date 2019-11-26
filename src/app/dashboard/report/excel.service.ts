import { Injectable } from '@angular/core';
import * as ExcelJs from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import * as logoFile from './base64Logo.js';

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable()
export class ExcelService {
  constructor() {}

  transformTableToExcelData(title, html, filename) {
    filename = title;
    const excel = [];
    const rows = document.querySelectorAll("table tr");

    for (let i = 1; i < rows.length; i++) {
      const row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (let j = 0; j < cols.length; j++) {
        if (cols[j].innerHTML) {
          row[j] = cols[j]["innerText"];
        } else {
          row[j] = "";
        }
      }
      excel.push(row);
    }
    if (excel.length == 0) {
      alert("No records to download");
    }
    const headers = [];
    const tableTitles = rows[2].querySelectorAll("th");
    for (let i = 0; i < tableTitles.length; i++) {
      headers.push(tableTitles[i].innerHTML);
    }
    this.generateExcel(title, headers, excel, filename);
  }

  generateExcel(
    title: string,
    header: any[],
    data: any[],
    excelFileName: string
  ) {
    // Create workbook and worksheet
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: "png"
    });
    worksheet.addImage(logo, "B1:E2");
    // worksheet.mergeCells('A1:D2');
    worksheet.mergeCells("A1:" + this.getCellNameByNumber(header.length) + "2");

    worksheet
      .getRow(1)
      .eachCell({ includeEmpty: true }, function(cell, rowNumber) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "333333" },
          bgColor: { argb: "333333" }
        };
      });
    worksheet
      .getRow(2)
      .eachCell({ includeEmpty: true }, function(cell, rowNumber) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "333333" },
          bgColor: { argb: "333333" }
        };
      });

    // Blank Row
    worksheet.addRow([]);

    // Add Rows and formatting
    for (let i = 0; i < data.length; i++) {
      const row = worksheet.addRow(data[i]);
      if (i < 2 || !data[i][0]) {
        row.eachCell((cell, number) => {
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
          cell.alignment = { vertical: "bottom", horizontal: "right" };
          cell.font = { bold: true, size: 9 };
          if (i == 0 && number % 2 == 0) {
            cell.alignment = { vertical: "bottom", horizontal: "left" };
            cell.font = { bold: false };
            // } else{
            //   cell.alignment = { vertical: 'middle', horizontal: 'center' };
            // }
          } else {
            // if(i==1){
            cell.alignment = { vertical: "middle", horizontal: "center" };
          }
        });
      } else {
        row.eachCell((cell, number) => {
          if (cell.value && number == 1) {
            cell.alignment = { vertical: "middle", horizontal: "center" };
          } else if (cell.value && number >= 3) {
            cell.alignment = { vertical: "bottom", horizontal: "right" };
          }
        });
      }
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
      FileSaver.saveAs(blob, excelFileName + EXCEL_EXTENSION);
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log("worksheet", worksheet);
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
