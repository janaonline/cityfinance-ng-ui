export interface ULBProfile {
  state: {
    name: string;
    _id: string;
  };
  name: string;
  type: "municipal" | "town panchayat" | "etc";
  code: string;
  area: "string";
  population: number;
  noOfWards: number;
  commissioner: {
    name: string;
    contact_no: number;
    emailId: string;
  };
  accountant: {
    name: string;
    contact_no: number;
    email: string;
  };
}
