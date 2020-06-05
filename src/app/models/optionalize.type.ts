export type Optionalize<T> = {
  [K in keyof T]?: T[K];
};
