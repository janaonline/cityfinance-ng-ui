export interface FinancialUploadQuestion<T> {
  key: keyof T;
  question: any;
  hint?: string;
}
