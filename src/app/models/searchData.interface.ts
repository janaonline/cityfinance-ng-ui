export type TWithSearchedData<T extends string> = {
  [P in T]: string;
};

export type TArray<T extends string, U extends Object> = {
  [K in T]: string;
};
