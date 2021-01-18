export enum ulbType {
  "municipality" = "Municipality",
  "townPanchayat" = "Town Panchayat",
  "municipalCorporation" = "Municipal Corporation"
}

export const ulbTypes = [
  { type: ulbType.municipalCorporation },
  { type: ulbType.municipality },
  { type: ulbType.townPanchayat }
];
