export const ADHAR_REGEX = "^\\d{4}\\d{4}\\d{4}$";

export const ERROR: any = {
  PREFIX: "Error at Question no",
  FORM_UNSUPPORTED:
    "Some Questions are not supported in this form. Please Try Again after some time.",
  GPS_UNAVAILABLE: "Gps not available",
  UNIQUE_ID_ERROR: "Unable to Generate ,please check internet connection",
  DEFAULT_ERROR_MESSAGE: "Error occured",
  PAST_DATE_TIME_PERIOD: "Date Must Be Greater Than Or Equal To",
  FUTURE_DATE_TIME_PERIOD: "Date Must Be Less Than Or Equal To",
  FINANCIAL_YEAR_TIME_PERIOD: "Date Must Be Between",
  ALERT_IF_NO_ANSWER: "Please Fill The Question",
  CORRECT_ANSWER: "Answer is correct",
  INCORRECT_ANSWER: "Answer is incorrect",
};

export const SUCCESS: any = {
  PREVIEW_FORM_SUBMIT_SUCCESS_MESSAGE: "All of the questions are valid",
};

export const TRANSACTION_ID_KEY_IN_SESSION_STORAGE = "transactionId";

export const VALIDATION: any = {
  REQUIRED: "1",
  REGEX: "2",
  DISABLED_FOR_USER: "3",
  ALERT: "4",
  ALERT_MSG: "4.1",
  ALERT_IN_BETWEEN: "4.2",
  ALERT_IF_NO_ANSWER: "4.3",
  EQUATION: "5",
  RANDOM_SELECT: "9",
  MULTIPLE_PARENT_OR: "6",
  FUTURE_DATE: "21",
  FUTURE_PRESENT_DATE: "22",
  PAST_DATE: "23",
  PAST_PRESENT_DATE: "24",
  TODAY_DATE: "25",
  DESELECT_ALL: "31",
  CHECK_LIMIT: "32",
  SELECT_ALL: "33",
  PREDEFINED_ANSWER: "40",
  SHOW_PREDEFINED_ANSWER: "41",
  HIDE_PREDEFINED_ANSWER: "42",
  LABEL_INSTRUCTION: "51",
  LABEL_HTML: "50",
  LABEL_IMAGE: "50.1",
  LABEL_HTML_TEXT: "52",
  LABEL_IMAGE_DEPRECATED: "53",
  LABEL_VIDEO: "50.2",
  LABEL_PDF: "50.3",
  HIDE_OPTION: "56",
  VILLAGE_WISE_LIMIT: "57",
  HIDE_LABEL: "96",
  UNIT_LENGTH: "71",
  UNIT_AREA: "72",
  UNIT_TEMPERATURE: "73",
  UNIT_TIME: "74",
  UNIT_MASS: "75",
  UNIT_VOLUME: "76",
  UNIT_SPEED: "77",
  UNIQUE_ID: "99",
  DECIMAL_PLACE: "14",
  MAX_FILE_SIZE: "81",
  MAX_FILE_COUNT: "82",
  MIME_TYPE_OF_FILE: "83",
  GET_UNIQUE_ID: "92",
  EXPANDABLE_SECTION: "54",
  PAST_NO_OF_DAYS: "26.1",
  PAST_NO_OF_WEEK: "26.2",
  PAST_NO_OF_MONTH: "26.3",
  PAST_NO_OF_YEAR: "26.4",
  PAST_NO_OF_FINANCIAL_YEAR: "26.5",
  FUTURE_NO_OF_DAYS: "27.1",
  FUTURE_NO_OF_WEEK: "27.2",
  FUTURE_NO_OF_MONTH: "27.3",
  FUTURE_NO_OF_YEAR: "27.4",
  FUTURE_NO_OF_FINANCIAL_YEAR: "27.5",
  MASTER_DISTRICT: "58",
  MASTER_BLOCK: "59",
  MASTER_VILLAGE: "60",
  VALID_ANSWER: "94",
  SINGED_NUMBER: "15",
  ADDITIONAL_INFO_IMAGE: "36",
  ADDITIONAL_INFO_GPS: "37",
  OR_CONDITION_WHEN_SELECTING_DYNAMIC_OPTION: "7",
  IMAGE_QUALITY: "45",
  PARENT_VALUE_DIFFER: "8",
  REQUEST_FOR_CALL: "121",
  CALL_RECORDING_BY_REQUEST_ID: "122",
  REDIRECT_EXTERNAL: "91",
  DYNAMIC_OPTION_FILL_COUNT: "56",
  DIRECT_VALUE_IN_BODMAS: "98",
  SKIP_LOGIC_REVERSE: "6.1",
  PAST_FIX_DATE: "26",
  FUTURE_FIX_DATE: "27",
  THIRD_PARTY_CALL: "93",
  VALIDATE_UNIQUE_CODE: "120",
  CALL_EXTERNAL_API: "126.1",
  PREFIX_TAG: "190.1",
  CURRENCY_FORMAT: "208",	
  WORD_LIMIT: "209"
};
export const RESTRICTION: any = {
  LESS_THAN: "3",
  LESS_THAN_EQUAL: "4",
  EQUAL_TO: "5",
  GREATER_THAN: "6",
  GREAT_THAN_EQUAL: "7",
  BACKEND_SUM: "8",
  ADDITION: "9.1",
  SUBTRACTION: "9.2",
  MULTIPLICATION: "9.3",
  DIVISION: "9.4",
  SUM_FROM_LOOP: "10",
  DID: "11",
  DYNAMIC_OPTION: "15",
  DYNAMIC_OPTION_FILTER: "15.1",
  DYNAMIC_OPTION_LOOP: "16",
  DYNAMIC_OPTION_LOOP_FILTER: "16.1",
  CHANGE_TITLE: "12",
  CALCULATE_AGE: "20",
  CALCULATE_AGE_SPLIT_MONTH: "20.1",
  CALCULATE_AGE_SPLIT_DAYS: "20.2",
  CALCULATE_AGE_IN_DAYS: "20.3",
  CALCULATE_AGE_IN_MONTHS: "20.4",
  REMOVE_USED_OPTIONS: "14",
  CLEAR_DID_CHILD: "17",
  CALCULATE_WEIGHT_FOR_AGE: "21",
  PARAMS_FOR_THIRD_PARTY_CALL: "30",
};

export const QUESTION_TYPE: any = {
  TEXT: "1",
  NUMERIC: "2",
  SINGLE_SELECT: "3",
  MULTI_SELECT: "4",
  RADIO: "5",
  MULTI_SELECT_CHECKBOX: "6",
  IMAGE: "7",
  BUTTON: "8",
  LABEL: "10",
  AUDIO: "12",
  ADDRESS: "13",
  DATE: "14",
  AADHAR_CARD: "15",
  GPS: "19",
  NESTED_ONE: "20",
  NESTED_TWO: "21",
  CONSENT: "22",
  UNIT: "23",
  UNIQUE_ID: "27",
  TIME: "28",
  CONTENT: "29",
  OPT_IN_OUT: "30",
  FILE_UPLOAD: "11",
};

export const htmlInputTypes: any = {
  [QUESTION_TYPE.TEXT]: "text",
  [QUESTION_TYPE.UNIQUE_ID]: "textButton",
  [QUESTION_TYPE.BUTTON]: "textButton",
  [QUESTION_TYPE.NUMERIC]: "number",
  [QUESTION_TYPE.SINGLE_SELECT]: "select",
  [QUESTION_TYPE.OPT_IN_OUT]: "checkbox",
  [QUESTION_TYPE.MULTI_SELECT]: "checkbox",
  [QUESTION_TYPE.RADIO]: "radio",
  [QUESTION_TYPE.MULTI_SELECT_CHECKBOX]: "checkbox",
  [QUESTION_TYPE.IMAGE]: "image",
  [QUESTION_TYPE.LABEL]: "10",
  [QUESTION_TYPE.CONTENT]: "10",
  [QUESTION_TYPE.AUDIO]: "audio",
  [QUESTION_TYPE.ADDRESS]: "textArea",
  [QUESTION_TYPE.DATE]: "date",
  [QUESTION_TYPE.AADHAR_CARD]: "number",
  [QUESTION_TYPE.GPS]: "button",
  [QUESTION_TYPE.NESTED_ONE]: "select",
  [QUESTION_TYPE.NESTED_TWO]: "checkbox",
  [QUESTION_TYPE.CONSENT]: "radio",
  [QUESTION_TYPE.TIME]: "time",
  [QUESTION_TYPE.UNIT]: "unit",
  [QUESTION_TYPE.FILE_UPLOAD]: "upload",
};
export const errorMessageStrings: any = {
  [QUESTION_TYPE.TEXT]: "Please fill",
  [QUESTION_TYPE.NUMERIC]: "Please fill",
  [QUESTION_TYPE.SINGLE_SELECT]: "Please select",
  [QUESTION_TYPE.MULTI_SELECT]: "Please check",
  [QUESTION_TYPE.MULTI_SELECT_CHECKBOX]: "Please check",
  [QUESTION_TYPE.RADIO]: "Please choose ",
  [QUESTION_TYPE.IMAGE]: "Please capture",
  [QUESTION_TYPE.AUDIO]: "audio",
  [QUESTION_TYPE.ADDRESS]: "Please fill",
  [QUESTION_TYPE.DATE]: "Please enter",
  [QUESTION_TYPE.AADHAR_CARD]: "Please fill",
  [QUESTION_TYPE.GPS]: "button",
  [QUESTION_TYPE.NESTED_ONE]: "Please Select",
  [QUESTION_TYPE.NESTED_TWO]: "Please Select",
  [QUESTION_TYPE.CONSENT]: "Please check",
  [QUESTION_TYPE.TIME]: "Plese enter",
};

export const ADDITIONAL_INFO_VALIDATION_QUESTION_MAP: any = {
  [VALIDATION.ADDITIONAL_INFO_IMAGE]: QUESTION_TYPE.IMAGE,
  [VALIDATION.ADDITIONAL_INFO_GPS]: QUESTION_TYPE.GPS,
};

export const FORM_SUBMISSION_ADDITIONAL_INFO_QUESTION_NAME: any = {
  [QUESTION_TYPE.IMAGE]: "image",
  [QUESTION_TYPE.GPS]: "location",
};

export const UNIT: any = {
  TEMPERATURE: "tp",
  LENGTH: "ln",
  AREA: "ar",
  TIME: "time",
  MASS: "mass",
  VOLUME: "vl",
  SPEED: "speed",
};

export const QUERY_STRINGS: any = {
  FORM_SOURCE: "form_source",
  FORM_TYPE: "form_type",
  ORGANIZATION_ID: "organization_id",
  PROJECT_ID: "project_id",
  FORM_ID: "form_id",
  TOKEN: "token",
};

export const QUERY_STRINGS_VALUES: any = {
  [QUERY_STRINGS.FORM_SOURCE]: {
    external: "external",
  },
  [QUERY_STRINGS.FORM_TYPE]: {
    preview: "preview",
  },
};

export const IMAGE_QUALITY: any = {
  HIGH: "HIGH",
  LOW: "LOW",
  MEDIUM: "MEDIUM",
};

export const DEFAULT_USER_LANGUAGE: string = "en";

export const DEFAULT_FILETYPE_EXTENSION: any = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/msword",
  "application/vnd.openxmlformatsofficedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const FILETYPE_EXT_ERROR_MSG: any = {
  "image/png": ".PNG files are not allowed",
  "image/jpg": ".JPG files are not allowed",
  "image/jpeg": ".JPEG files are not allowed",
  "application/msword": ".DOC files are not allowed",
  "application/vnd.openxmlformatsofficedocument.wordprocessingml.document":
    ".DOCX files are not allowed",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".DOC files are not allowed",
  "application/pdf": ".PDF files are not allowed",
  "application/vnd.ms-excel": ".CSV / .XLS files are not allowed",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    ".XLSX files are not allowed",
  defaultMessage: "This file is not supported",
};
