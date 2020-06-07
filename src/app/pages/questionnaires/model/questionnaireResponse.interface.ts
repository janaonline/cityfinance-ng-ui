export interface IQuestionnaireResponse {
  message: string;
  success: boolean;
  data: {
    propertyTax: { [key: string]: string };
    userCharges: { [key: string]: string };
    documents: { [key: string]: { name: string; url: string }[] };
    stateName: string;
  }[];
}
