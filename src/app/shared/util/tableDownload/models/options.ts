/**
 * @description File name should not contain extension. It should be only name.
 * <property>extraTexts</property> are text which are not in the table, but needed in
 * the downloaded file.
 */
export interface TableDowloadOptions {
  filename: string;
  extension: "xlsx";

  extraTexts?: {
    atTop?: IExtraText;
    atBottom?: IExtraText;
  };
}

export interface TableCellOption {
  text: string;
  text_align?: "center" | "left" | "right";
  background_color?: string;
  bold?: "true" | "false";
  font_size?: string;
}

export interface IExtraText {
  rows: {
    columns: (TableCellOption & { colSpan?: number })[];
  }[];
  extraRowAfter?: number;
  extraRowsBefore?: number;
}
