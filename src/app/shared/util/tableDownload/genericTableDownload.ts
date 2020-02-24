import { Cell, Workbook, Worksheet } from 'exceljs';
import { saveAs } from 'file-saver';

import { TableCellOption, TableDowloadOptions } from './models/options';

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
  private static instance: TableDownloader;

  private readonly _default = {
    cellWidth: 20,
    fontSize: 9
  };

  private constructor() {}

  public static getInstance() {
    if (!TableDownloader.instance) {
      TableDownloader.instance = new TableDownloader();
    }
    return TableDownloader.instance;
  }

  downloadTable(table: HTMLTableElement, option: TableDowloadOptions) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    if (option.extraTexts && option.extraTexts.atTop) {
      this.addExtraTextToWorksheet(worksheet, option.extraTexts.atTop);
    }

    const tableHeaderRows = this.getRowsFromTableHead(table);
    const tableBodyRows = this.getRowsFromTableBody(table);
    ((tableHeaderRows as any) as Array<HTMLTableRowElement>).forEach(row => {
      this.addNewRowData(worksheet, { row });
    });

    ((tableBodyRows as any) as Array<HTMLTableRowElement>).forEach(row => {
      this.addNewRowData(worksheet, { row });
    });

    if (option.extraTexts && option.extraTexts.atBottom) {
      this.addExtraTextToWorksheet(worksheet, option.extraTexts.atBottom);
    }

    worksheet.columns.forEach(col => {
      col.width = this._default.cellWidth;
    });
    this.downloadWorkbook(workbook, `${option.filename}.${option.extension}`);
  }

  private getRowsFromTableBody(table: HTMLTableElement) {
    return <NodeListOf<HTMLTableRowElement>>table.querySelectorAll('tbody  tr');
  }

  private getRowsFromTableHead(table: HTMLTableElement) {
    return <NodeListOf<HTMLTableRowElement>>table.querySelectorAll('thead  tr');
  }

  private addNewRowData(
    worksheet: Worksheet,
    options: { row: HTMLTableRowElement }
  ) {
    const newRow = worksheet.addRow(['']);
    const currentRowIndex = worksheet.actualRowCount;

    const totalNoOfColumns = options.row.childElementCount;
    for (let i = 1; i <= totalNoOfColumns; i++) {
      const tableCell = options.row.cells.item(i - 1);
      this.applyAttributeToCell({
        cell: newRow.getCell(i),
        worksheet,
        rowIndex: currentRowIndex,
        cellIndex: i,
        tableCell
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
        cellStartIndex: option.cellIndex,
        cellEndIndex: option.tableCell.colSpan
      });
    }

    if (dataAttributes.background_color) {
      option.cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: dataAttributes.background_color }
      };
    }

    if (dataAttributes.text_align) {
      option.cell.alignment = { vertical: 'middle' };
      option.cell.alignment.horizontal = dataAttributes.text_align;
    }

    if (dataAttributes.bold && dataAttributes.bold === 'true') {
      option.cell.font.bold = true;
    }

    if (dataAttributes.font_size) {
      option.cell.font = { size: +dataAttributes.font_size };
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
      cellEndIndex: options.cellEndIndex
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
      | TableDowloadOptions['extraTexts']['atTop']
      | TableDowloadOptions['extraTexts']['atBottom']
  ) {
    if (!Object.keys(textsToAdd).length || !textsToAdd.rows.length) {
      return false;
    }

    if (textsToAdd.extraRowsBefore) {
      this.addEmptyRows(textsToAdd.extraRowsBefore, worksheet);
    }

    textsToAdd.rows.forEach(rowToAdd => {
      const tableRow = this.createTableRowFromData(rowToAdd);
      this.addNewRowData(worksheet, { row: tableRow });
    });

    if (textsToAdd.extraRowAfter) {
      this.addEmptyRows(textsToAdd.extraRowAfter, worksheet);
    }
  }

  private createTableRowFromData(
    rowToAdd: TableDowloadOptions['extraTexts']['atTop']['rows'][0]
  ) {
    const tableRow = document.createElement('tr');
    rowToAdd.columns.forEach(col => {
      const newTabCell = tableRow.insertCell();
      Object.keys(col).forEach(attributeName => {
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
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      saveAs(blob, fileName);
    });
  }
}
