/*
* @Author: Vrindarak Vishwakarma
* @Date: 2019-26-04 10:30:00
* @Last Modified by: (Email)
* @Last Modified time: (Format: 2019-22-04 10:43:40)
*/

export interface Validator {
  name: string;
  validator: any;
  message: string;
}

export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  id: number;
  endpoint: string;
  method: string;
  status: boolean;
  synchronous?: boolean;
}
