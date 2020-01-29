export interface IIExcelInput {
  fileName: string;
  skipStartingColumns?: number;
  skipStartingRows?: number;
  fontSize?: number;
  rows: ICell[][];
}

export interface ICell {
  text: string;
  backgroundColor?: string;
  bold: boolean;
}
