const PREFIX_TAG = "190.1";
const LABEL_INSTRUCTION = "51";

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
    item["modelValue"] = getModalValue(item);
    item["value"] = getModalValue(item);
    if (item && item.validation && item.validation.length) {
      let findQuestionDisabledForUser = item.validation.find(
        (item) => item._id == "3"
      );
      item["isQuestionDisabled"] = findQuestionDisabledForUser ? true : false;

      let addPrefixTagInField = item.validation.find(
        (prefixValidation) => prefixValidation._id == PREFIX_TAG
      );
      console.log("addPrefixTagInField", addPrefixTagInField);
      if (addPrefixTagInField) {
        item["addPrefixInsideField"] = true;
        item["prefixValue"] = addPrefixTagInField?.value;

        let prefixValueLength = addPrefixTagInField?.value?.length;
        let modelValuePrefix = item?.modelValue?.substring(
          0,
          prefixValueLength
        );
        if (addPrefixTagInField?.value != modelValuePrefix) {
          const errorMsg = `${item?.title} must be starting with ${item?.addPrefixTagInField?.value}`;
          item["errorMessage"] = item && item.hint ? item.hint : errorMsg;
        }
      }

      let isLabelInstructionValidationExist = item.validation.find(
        (prefixValidation) =>
          prefixValidation._id == LABEL_INSTRUCTION
      );
      console.log(
        "isLabelInstructionValidationExist",
        isLabelInstructionValidationExist
      );
      if (isLabelInstructionValidationExist) {
        item["labelInstruction"] = isLabelInstructionValidationExist?.value;
      }
    }
    item.selectedValue = item.selectedValue ? item.selectedValue : [];
    for (const answer of item.selectedValue) {
      answer["label"] = answer.label
        ? answer.label
        : answer.name
        ? answer.name
        : "";
      answer["textValue"] = answer.textValue ? answer.textValue : "";
      answer["value"] = answer.value
        ? answer.value
        : !item.hasOwnProperty("answer_option") ||
          item.answer_option.length == 0
        ? ""
        : answer._id;
    }
    if (item.input_type == "4" || item.input_type == "6") {
      item["value"] = item.selectedValue.map((item) => item.value);
      item["selectedOptions"] =
        item.selectedValue.length > 1
          ? `${item.selectedValue[0].label}...+ ${
              item.selectedValue.length - 1
            } more`
          : item.selectedValue.length == 1
          ? item.selectedValue[0].label
          : "";
      for (const answer of item.selectedValue) {
        answer["label"] = answer.label
          ? answer.label
          : answer.name
          ? answer.name
          : "";
        answer["textValue"] = answer.textValue ? answer.textValue : "";
        answer["value"] = answer.value
          ? answer.value
          : !item.hasOwnProperty("answer_option") ||
            item.answer_option.length == 0
          ? ""
          : answer._id;
        for (const option of item.answer_option) {
          option["value"] = option._id;
          option["label"] = option.name;
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
