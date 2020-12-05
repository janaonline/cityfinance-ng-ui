import { SolidWasteManagementDocuments } from './financial-data.interface';

export interface ISolidWasteQuestion {
  key: keyof SolidWasteManagementDocuments;
  question: string;
}

type fileKeys = keyof SolidWasteManagementDocuments;
export type SolidWasteEmitValue = {
  [key in fileKeys]?: { name: string; url: string }[];
};
