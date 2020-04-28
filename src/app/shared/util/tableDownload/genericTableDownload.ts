import { Cell, Workbook, Worksheet } from 'exceljs';
import { saveAs } from 'file-saver';

import { logoBase64 as emblemOfIndiaWithText } from '../../../../assets/images/emblemOfIndiaWithText.js';
import * as logoFile from '../../../dashboard/report/base64Logo.js';
import { ILogoOption, TableCellOption, TableDowloadOptions } from './models/options';

// /run/adeim / shadab / GIT / perfect -
//   ui / src / app / dashboard / report / base64Logo.js;
/**
 * @description How to use this class:
 * 1. Get the instance of this class using <code>getInstanse<code> static method.
 * 2. Call the downloadTable function with the table that needs to be download along with
 *    the options.
 *
 * Note: This class will uses values provided in data attributes of the table cell only.
 * All the text,fontSize, backgroundColor, text alignment, etc are fetched from data attributes.
 * For colSpan, we take from the table cell properties directly. Currently, we do not proide option to
 * change the font color.
 *
 */
export class TableDownloader {
  private constructor() {}
  private static instance: TableDownloader;

  private readonly _default = {
    cellWidth: 20,
    fontSize: 12,
    addLogoToHeader: true,
  };

  /**
   *
   * @description Why this variabnle exists? When we merge the cells in the exceljs,
   * we cannot get the proper number of the next cell.
   * For Ex:
   *  If we merge cells from A1 to D1, then the next cell shoud be E1, but exceljs
   * will generate next cell as B1. Due to this we have to manually keep track of the previous
   * cells for each row and reset it to 0, at the beginning of new row.
   */
  previousColumnNumber = 0;

  public static getInstance() {
    if (!TableDownloader.instance) {
      TableDownloader.instance = new TableDownloader();
    }
    return TableDownloader.instance;
  }

  downloadTable(table: HTMLTableElement, option: TableDowloadOptions) {
    this.previousColumnNumber = 0;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
    const noOfColumns = this.columnCountsFrom(table);
    if (!option.header || (option.header && option.header.addImage)) {
      this.addLogoToFile({
        workbook,
        worksheet,
        column: { from: 1, to: noOfColumns },
        row: { from: 1, to: 2 },
      });
    }
    if (option.extraTexts && option.extraTexts.atTop) {
      this.addExtraTextToWorksheet(worksheet, option.extraTexts.atTop);
    }

    const tableHeaderRows = this.getRowsFromTableHead(table);
    const tableBodyRows = this.getRowsFromTableBody(table);
    ((tableHeaderRows as any) as Array<HTMLTableRowElement>).forEach((row) => {
      this.addNewRowData(worksheet, { row });
    });

    ((tableBodyRows as any) as Array<HTMLTableRowElement>).forEach((row) => {
      this.addNewRowData(worksheet, { row });
    });

    if (option.extraTexts && option.extraTexts.atBottom) {
      this.addExtraTextToWorksheet(worksheet, option.extraTexts.atBottom);
    }

    worksheet.columns.forEach((col) => {
      col.width = this._default.cellWidth;
    });
    this.downloadWorkbook(workbook, `${option.filename}.${option.extension}`);
  }

  private columnCountsFrom(table: HTMLTableElement) {
    let maxNoOfColumns = 0;
    const tableHeaderRows = this.getRowsFromTableHead(table);
    ((tableHeaderRows as any) as Array<HTMLTableRowElement>).forEach((row) => {
      if (row.cells && row.cells.length && maxNoOfColumns < row.cells.length) {
        let columnsInRow = 0;
        for (let index = 0; index < row.cells.length; index++) {
          const cell = row.cells[index];
          columnsInRow += cell.colSpan ? cell.colSpan : 1;
        }
        maxNoOfColumns =
          columnsInRow > maxNoOfColumns ? columnsInRow : maxNoOfColumns;
      }
    });
    return maxNoOfColumns;
  }

  /**
   * @description Due to the size of image being used,
   * Image will use a minimun of two cells.
   */
  private addLogoToFile(option: ILogoOption) {
    const logo = option.workbook.addImage({
      base64: logoFile.logoBase64,
      extension: "png",
    });

    const logo2 = option.workbook.addImage({
      base64: emblemOfIndiaWithText,
      extension: "png",
    });

    const imageCellsTopLeft = this.getCellRange({
      cellStartIndex: option.column.from,
      cellEndIndex: 2,
      rowIndex: option.row.from,
    });
    const imageCellBottomRight = this.getCellRange({
      cellStartIndex: option.column.from,
      cellEndIndex: 2,
      rowIndex: option.row.from + 1,
    });

    const topLeftOfImageContainer = this.getCellRange({
      cellStartIndex: option.column.from,
      cellEndIndex: option.column.to,
      rowIndex: option.row.from,
    });
    const bottomRightofImageContainer = this.getCellRange({
      cellStartIndex: option.column.from,
      cellEndIndex: option.column.to,
      rowIndex: option.row.to,
    });

    option.worksheet.mergeCells(
      `${topLeftOfImageContainer.from}:${bottomRightofImageContainer.to}`
    );

    option.worksheet.addImage(logo, {
      tl: { col: 0, row: 0 },
      br: { col: 1, row: 2 },
    });

    option.worksheet.addImage(logo2, {
      tl: { col: option.column.to - 1.5, row: 0 },
      br: { col: option.column.to, row: 2 },
    });
    // Color for logo backgeound
    for (let i = option.row.from; i <= option.row.to; i++) {
      option.worksheet
        .getRow(i)
        .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "000001" },
            bgColor: { argb: "000001" },
          };
        });
    }
  }

  private getRowsFromTableBody(table: HTMLTableElement) {
    return <NodeListOf<HTMLTableRowElement>>table.querySelectorAll("tbody  tr");
  }

  private getRowsFromTableHead(table: HTMLTableElement) {
    return <NodeListOf<HTMLTableRowElement>>table.querySelectorAll("thead  tr");
  }

  private addNewRowData(
    worksheet: Worksheet,
    options: { row: HTMLTableRowElement }
  ) {
    this.previousColumnNumber = 0;
    const newRow = worksheet.addRow([""]);
    const currentRowIndex = worksheet.rowCount;

    const totalNoOfColumns = options.row.childElementCount;

    for (let i = 1; i <= totalNoOfColumns; i++) {
      const tableCell = options.row.cells.item(i - 1);

      this.applyAttributeToCell({
        cell: newRow.getCell(this.previousColumnNumber + 1),
        worksheet,
        rowIndex: currentRowIndex,
        cellIndex: i,
        tableCell,
      });
    }
  }

  private applyAttributeToCell(option: {
    cell: Cell;
    tableCell: HTMLTableDataCellElement | HTMLTableHeaderCellElement;
    worksheet: Worksheet;
    rowIndex: number;
    cellIndex: number;
  }) {
    const dataAttributes = <TableCellOption>(<any>option.tableCell.dataset);
    const text = dataAttributes.text;
    option.cell.value = text;
    option.cell.font = { size: this._default.fontSize };

    if (option.tableCell.colSpan > 1) {
      this.mergeCells(option.worksheet, {
        rowIndex: option.rowIndex,
        cellStartIndex: this.previousColumnNumber + 1,
        cellEndIndex: this.previousColumnNumber + option.tableCell.colSpan,
      });
      this.previousColumnNumber += option.tableCell.colSpan;
    } else {
      this.previousColumnNumber = option.cellIndex;
    }

    if (dataAttributes.background_color) {
      option.cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: dataAttributes.background_color },
      };
    }

    if (dataAttributes.text_align) {
      option.cell.alignment = { vertical: "middle" };
      option.cell.alignment.horizontal = dataAttributes.text_align;
    }

    if (dataAttributes.bold && dataAttributes.bold === "true") {
      option.cell.style.font.bold = true;
      option.cell.font.bold = true;
    }

    if (dataAttributes.font_size) {
      option.cell.font = !option.cell.font
        ? { size: +dataAttributes.font_size }
        : { ...option.cell.font, size: +dataAttributes.font_size };
    }
  }

  private mergeCells(
    worksheet: Worksheet,
    options: {
      cellStartIndex: number;
      cellEndIndex: number;
      rowIndex: number;
    }
  ) {
    const cellRange = this.getCellRange({
      rowIndex: options.rowIndex,
      cellStartIndex: options.cellStartIndex,
      cellEndIndex: options.cellEndIndex,
    });

    worksheet.mergeCells(`${cellRange.from}:${cellRange.to}`);
  }

  /**
   * @description Cell Index always starts from 1, and:
   *    INDEX 1 = A,
   *    INDEX 2 = B,
   *    INDEX 3 = C....so on.
   */

  private getCellRange(options: {
    cellStartIndex: number;
    cellEndIndex: number;
    rowIndex: number;
  }) {
    const baseNumber = 64;
    const from =
      String.fromCharCode(baseNumber + options.cellStartIndex) +
      options.rowIndex;
    const to =
      String.fromCharCode(baseNumber + options.cellEndIndex) + options.rowIndex;
    return { from, to };
  }

  private addExtraTextToWorksheet(
    worksheet: Worksheet,
    textsToAdd:
      | TableDowloadOptions["extraTexts"]["atTop"]
      | TableDowloadOptions["extraTexts"]["atBottom"]
  ) {
    if (!Object.keys(textsToAdd).length || !textsToAdd.rows.length) {
      return false;
    }

    if (textsToAdd.extraRowsBefore) {
      this.addEmptyRows(textsToAdd.extraRowsBefore, worksheet);
    }

    textsToAdd.rows.forEach((rowToAdd) => {
      const tableRow = this.createTableRowFromData(rowToAdd);
      this.addNewRowData(worksheet, { row: tableRow });
    });

    if (textsToAdd.extraRowAfter) {
      this.addEmptyRows(textsToAdd.extraRowAfter, worksheet);
    }
  }

  private createTableRowFromData(
    rowToAdd: TableDowloadOptions["extraTexts"]["atTop"]["rows"][0]
  ) {
    const tableRow = document.createElement("tr");
    rowToAdd.columns.forEach((col) => {
      const newTabCell = tableRow.insertCell();
      Object.keys(col).forEach((attributeName) => {
        newTabCell.setAttribute(`data-${attributeName}`, col[attributeName]);
        /**
         * NOTE Why are we applying colSpan seperately?
         * It is so because, currently, we get the colSpan from the table cell
         * colSpan property rather than from data-attribute. So if we dont apply to
         * cell, it will not be applied to the downloaded file.
         */
        if (col.colSpan) {
          newTabCell.colSpan = col.colSpan;
        }
      });
    });
    return tableRow;
  }

  private addEmptyRows(quantity: number, worksheet: Worksheet) {
    let qty = quantity;
    while (qty-- > 0) {
      worksheet.addRow([]);
    }
    return true;
  }

  private downloadWorkbook(workbook: Workbook, fileName: string) {
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);
    });
  }
}
