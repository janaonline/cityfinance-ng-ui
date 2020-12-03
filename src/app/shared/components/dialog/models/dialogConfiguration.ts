export interface IDialogConfiguration {
  message: string;
  buttons?: {
    confirm?: IButtonConfiguration;
    cancel?: IButtonConfiguration;
    [key: string]: IButtonConfiguration;
  };
}

/**
 * @description The callback passed must be synchronous function. If it is asynchronous, the the dialog will
 * be closed before the completed of the execution of the function.
 */
interface IButtonConfiguration {
  text: string;
  callback?: Function;
}
