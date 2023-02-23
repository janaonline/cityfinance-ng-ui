const PREFIX_TAG = "190.1";
const LABEL_INSTRUCTION = "51";
const DISABLED_FOR_USER = "3";
const DECIMAL_PLACE = "14";
const VALIDATION = {
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
const RESTRICTION = {
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

const QUESTION_TYPE = {
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
function initForm(elementId, data, isEdit, _listner) {
  let ele = document.getElementById(elementId);
  ele.setAttribute("questionresponse", JSON.stringify(isEdit ? prepareWebformQuestion(data) : data));


  ele.addEventListener("submitQuestion", _listner);
}

function getModalValue(data) {
  let modalValue = data && data.selectedValue && data.selectedValue[0];
  if (modalValue) {
    return modalValue.textValue
      ? modalValue.textValue
      : modalValue.value
      ? modalValue.value
      : !data.hasOwnProperty("answer_option") || data.answer_option.length == 0
      ? ""
      : modalValue._id;
  } else {
    return "";
  }
}

function prepareWebformQuestion(questionDataSource, isViewOnly = false) {
  // this function is used in case of edit
  const questionResponse = questionDataSource;
  for (const item of questionResponse) {
    item["modelValue"] = this.getModalValue(item);
    item["value"] = this.getModalValue(item);
    if (item && item.validation && item.validation.length) {
      let findQuestionDisabledForUser = item.validation.find(item => item._id == VALIDATION.DISABLED_FOR_USER);
      item["isQuestionDisabled"] = findQuestionDisabledForUser ? true : false;

      let addPrefixTagInField = item.validation.find(prefixValidation => prefixValidation._id == VALIDATION.PREFIX_TAG);
      console.log('addPrefixTagInField', addPrefixTagInField);
      if (addPrefixTagInField) {
        item['addPrefixInsideField'] = true;
        item['prefixValue'] = addPrefixTagInField?.value;

        let prefixValueLength = addPrefixTagInField?.value?.length;
        let modelValuePrefix = item?.modelValue?.substring(0, prefixValueLength);
        if (addPrefixTagInField?.value != modelValuePrefix) {
          const errorMsg = `${item?.title} must be starting with ${item?.addPrefixTagInField?.value}`;
          item['errorMessage'] = item && item.hint ? item.hint : errorMsg;
        }
      }

      let isLabelInstructionValidationExist = item.validation.find(prefixValidation => prefixValidation._id == VALIDATION.LABEL_INSTRUCTION);
      console.log('isLabelInstructionValidationExist', isLabelInstructionValidationExist);
      if (isLabelInstructionValidationExist) {
        item['labelInstruction'] = isLabelInstructionValidationExist?.value;
      }

      let isDecimalValidationExist = item.validation.find(prefixValidation => prefixValidation._id == VALIDATION.DECIMAL_PLACE);
      if (isDecimalValidationExist) {
        item['skipDigitOnlyValidation'] = true;
      } else {
        item['skipDigitOnlyValidation'] = false;
      }
    }
    item.selectedValue = item.selectedValue?item.selectedValue:[]
    for (const answer of item.selectedValue) {
      answer['label'] = answer.label ? answer.label : answer.name ? answer.name : '';
      answer['textValue'] = answer.textValue ? answer.textValue : '';
      answer['value'] = answer.value ? answer.value : (!item.hasOwnProperty('answer_option') || item.answer_option.length == 0) ? '' : answer._id;
    }
    if (item.input_type == QUESTION_TYPE.MULTI_SELECT|| item.input_type == QUESTION_TYPE.MULTI_SELECT_CHECKBOX || item.input_type == QUESTION_TYPE.NESTED_TWO) {

      item["value"] = item.selectedValue.map((item) => item.value);
      item['selectedOptions'] = item.selectedValue.length > 1 ? `${item.selectedValue[0].label}...+ ${item.selectedValue.length - 1} more` : item.selectedValue.length == 1 ? item.selectedValue[0].label : '';
      for (const answer of item.selectedValue) {
        answer['label'] = answer.label ? answer.label : answer.name ? answer.name : '';
        answer['textValue'] = answer.textValue ? answer.textValue : '';
        answer['value'] = answer.value ? answer.value : (!item.hasOwnProperty('answer_option') || item.answer_option.length == 0) ? '' : answer._id;
        for (const option of item.answer_option) {
          option['value'] = option._id;
          option['label'] = option.name;
        }
        let answerOptionIndex = item.answer_option.findIndex(
          (option) => option._id == answer.value
        );
        console.log("answerOptionIndex", answerOptionIndex);
        if (answerOptionIndex > -1) {
          item.answer_option[answerOptionIndex]["checked"] = true;
        }
      }
    }
    if (isViewOnly) {
      item["isQuestionDisabled"] = true;
    }
  }
  return questionResponse;
}
