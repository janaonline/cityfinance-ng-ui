import { IDocuments } from './documents.interface';

export interface IQuestionnaireDocumentsCollection {
  State_Acts_Doc: IDocuments[];
  State_Amendments_Doc: IDocuments[];
  City_Acts_Doc: IDocuments[];
  State_Rules_Doc: IDocuments[];
  City_Amendments_Doc: IDocuments[];
  City_Rules_Doc: IDocuments[];
  Admin_Doc: IDocuments[];
  Implement_Doc: IDocuments[];
  Other_Doc: IDocuments[];
}
