export type IListType = "state" | "ulb";

// export enum FormSTATUS {
//   COMPLETED = true,
//   SAVED_AS_DRAFT = false,
// }

export const formStatusList: { name: string; value: boolean }[] = [
  { name: "COMPLETED", value: true },
  { name: "SAVED AS DRAFT", value: false },
];
