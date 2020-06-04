export interface IQuestionnaireResponse {
  message: string;
  success: boolean;
  data: {
    propertyTax: { [key: string]: string };
    userCharges: { [key: string]: string };
  }[];
}
