/**
 * @description Add new key to the given type/interface.
 *
 * @example
 *
 * interface User { name: string; id: string };
 *
 * type AdvancedUser = TAddedKey<'super_power', User>;
 * output: AdvancedUser = {name: string, id: string, super_power: string}
 *
 */
export type TAddKey<T extends string, U> = {
  [P in T]: string;
} &
  {
    [P in keyof U]: U[P];
  };
