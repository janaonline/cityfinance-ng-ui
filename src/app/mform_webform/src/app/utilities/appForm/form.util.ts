import { List, Set, set } from "immutable";
import {
  ADHAR_REGEX,
  DEFAULT_USER_LANGUAGE,
  ERROR,
  errorMessageStrings,
  FORM_SUBMISSION_ADDITIONAL_INFO_QUESTION_NAME,
  QUESTION_TYPE,
  RESTRICTION,
  VALIDATION,
  SUCCESS,
} from "./constants";
import {
  restrictionChangingValues,
  restrictions,
  validations,
} from "./restriction.util";

import {
  SET_LAST_UPDATED_QUESTION_INDEX,
  UPDATE_QUESTION_BY_CHILD_CHECK,
} from "../reducers/constants";
import {
  checkIfQuestionHasGivenValidation,
  getGivenValidationFromValidationArray,
  getQuestionOfGivenOrder,
  getValidations,
  checkIfQuestionIsAFlagQuestion,
  makeQuestionEditable,
  isRequired,
  checkQuestionVisibilityAccordingToParentCollapsableHeader,
  getDynamicKeys,
  getEmptyRequiredQuestions,
} from "./question.util";

import { UnitConversionStrategy } from "./units.util";
import { validateDateTypeQuestion } from "./formUtils/vaildateDateTypeQuestion";

import * as _ from "lodash";
import { Map } from "immutable";

import { validateAadhaar } from "./index";

import { dispatchForm } from "./formrdispatch.util";

import { applyRestrictions } from "./restrictions";
import { dynamicOptionFillCount } from "./validations/dynamicOptionFillCount";

import { getFilesS3UrlAndUploadToS3 } from "./fileUpload.util";

const comparisionRestrictions = [
  RESTRICTION.LESS_THAN,
  RESTRICTION.LESS_THAN_EQUAL,
  RESTRICTION.EQUAL_TO,
  RESTRICTION.GREATER_THAN,
  RESTRICTION.GREAT_THAN_EQUAL,
];
function setInitialQuestions(
  questions: any,
  setQuestionValueAndVisibility = true
) {
  console.log("dddd", questions);
  const localStateObj = getLocallySavedQuestions();
  let nestedQuestions;
  let updatedQuestions: any = List.of(...questions);

  updatedQuestions = updatedQuestions.toJS();
  console.log("updatedQuestions", questions, updatedQuestions);
  // return true;
  updatedQuestions = disableAllAnswerOptionsWithDid(updatedQuestions);
  console.log("updatedQuestions", updatedQuestions);
  updatedQuestions = updatedQuestions.sort(
    (a: any, b: any) => a["viewSequence"] - b["viewSequence"]
  );
  updatedQuestions = updatedQuestions.map((question: any) => {
    return {
      ...question,
      type: question.input_type,
      shouldRecalculate: () =>
        question.restrictions.some((r: any) =>
          restrictionChangingValues.includes(r.type)
        ) || false,
      ...(setQuestionValueAndVisibility
        ? setDefaultValueAndVisibility(question, localStateObj)
        : {}),
    };
  });
  nestedQuestions = updatedQuestions.filter((question: any) =>
    question.order.includes(".")
  );
  updatedQuestions = setLoopingQuestion(
    updatedQuestions,
    nestedQuestions,
    localStateObj
  );
  updatedQuestions = updatedQuestions.filter(
    (question: any) => !question.order.includes(".")
  );
  return updatedQuestions;
}

function getLocallySavedQuestions() {
  let localState = localStorage.getItem("state");
  if (localState) {
    localState = JSON.parse(localState);
  }
  return localState;
}

function disableAllAnswerOptionsWithDid(questions: any) {
  console.log("qqq", questions);
  return questions.map((question: any) => {
    if (question.answer_option && question.answer_option.length) {
      const questionHasDidRestriction = question.restrictions.some(
        (restriction: any) => restriction.type == RESTRICTION.DID
      );
      console.log("questionHasDidRestriction", questionHasDidRestriction);
      question.answer_option = question.answer_option.map((option: any) => {
        if (option && option.did && option.did.length) {
          option.disabled = questionHasDidRestriction;
        }
        return option;
      });
    }
    return question;
  });
}

function setDefaultValueAndVisibility(question: any, savedStateObject: any) {
  if (savedStateObject && savedStateObject.hasOwnProperty(question.order)) {
    let value = savedStateObject[question.order];
    if (
      question.input_type === QUESTION_TYPE.NESTED_ONE ||
      question.input_type === QUESTION_TYPE.NESTED_TWO
    ) {
      value = savedStateObject[question.order].value;
    }
    return {
      value,
      visibility: true,
    };
  } else {
    return {
      value: question.value ? question.value : "",
      visibility: question.parent.length < 1,
    };
  }
}

function setLoopingQuestion(
  totalQuestions: any,
  nestedQuestions: any,
  localStateObj: any
) {
  const loopingQuestions = totalQuestions.filter(
    (question: any) =>
      question.type === QUESTION_TYPE.NESTED_ONE ||
      question.type === QUESTION_TYPE.NESTED_TWO
  );
  for (let question of loopingQuestions) {
    const index = totalQuestions.findIndex(
      (q: any) => q.order === question.order
    );
    const childQuestions = nestedQuestions.filter(
      (nestedQuestion: any) =>
        nestedQuestion.order.split(".")[0] === question.order
    );
    question = {
      ...question,
      childQuestions,
      nestedData: {},
    };
    if (
      localStateObj &&
      localStateObj[question.order] &&
      localStateObj[question.order].value
    ) {
      question = {
        ...question,
        value: localStateObj[question.order].value,
      };
      if (localStateObj[question.order].hasOwnProperty("childQuestionData")) {
        let childQuestionDataLocal =
          localStateObj[question.order].childQuestionData;
        let childQuestionDataLocalKeys = Object.keys(childQuestionDataLocal);
        let childQuestionData = List();
        for (let key of childQuestionDataLocalKeys) {
          let updatedChildList = childQuestions;
          updatedChildList = updatedChildList.map((childQuestion: any) => {
            return {
              ...childQuestion,
              ...setDefaultValueAndVisibility(
                childQuestion,
                childQuestionDataLocal[key]
              ),
            };
          });

          childQuestionData = childQuestionData.set(
            Number(key),
            updatedChildList
          );
        }
        question = {
          ...question,
          childQuestionData,
        };
      }
    }
    totalQuestions = List(totalQuestions).set(index, question);
    totalQuestions = totalQuestions.toJS();
    //   totalQuestions = totalQuestions.set(index, question);
  }
  console.log("total", totalQuestions);
  return totalQuestions;
}

const resetAllUniqueIdQuestionValue = ({
  questions,
  dispatchForm,
  updatedQuestion,
  nestedConfig,
}: any) => {
  if (
    nestedConfig?.hasOwnProperty?.("loopIndex") &&
    nestedConfig?.hasOwnProperty?.("parentOrder")
  ) {
    const childQuestions = getQuestionOfGivenOrder(
      questions,
      nestedConfig?.parentOrder
    )?.childQuestionData?.get?.(nestedConfig?.loopIndex);
    if (childQuestions) {
      questions = childQuestions;
    }
  }
  questions.forEach((question: any, index: any) => {
    if (
      !(
        question?.input_type == QUESTION_TYPE.UNIQUE_ID &&
        checkIfQuestionHasGivenValidation(question, VALIDATION.UNIQUE_ID)
      )
    ) {
      return;
    }
    if (
      getGivenValidationFromValidationArray(
        question?.validation,
        VALIDATION.UNIQUE_ID
      )?.value?.includes?.(updatedQuestion?.shortKey)
    ) {
      dispatchForm({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: { ...question, value: "" },
        nestedConfig: nestedConfig ? { ...nestedConfig, index } : undefined,
      });
    }
  });
};

/**
 * Generates Unit type question api response
 * @param questionValue
 * @param unitValue
 * @param validation
 * @param restrictions
 * @returns {{textValue: *, label: number, value: *}}
 */
function getUnitAnswerValues({
  questionValue,
  unitValue = 0,
  validation,
}: any) {
  let textValue = questionValue;
  let value = questionValue;
  let label = unitValue;
  validation.forEach(({ _id }: any) => {
    label = unitValue;
    value = UnitConversionStrategy.getStrategy(_id).convert(
      unitValue,
      questionValue
    );
  });
  return { value, label, textValue };
}

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
            accuracy: position?.coords?.accuracy,
          });
        },
        () => reject(new Error(ERROR.GPS_UNAVAILABLE))
      );
    } else {
      reject(new Error(ERROR.GPS_UNAVAILABLE));
    }
  });

const getAdditionalInfoOfQuestion = async (
  additionalInfoQuestionType: any,
  additionalInfoQuestionValue: any,
  parentQuestion: any
) => {
  const additionalInfo = parentQuestion?.additionalInfo || {};
  if (additionalInfoQuestionType === QUESTION_TYPE.GPS) {
    additionalInfo[additionalInfoQuestionType] = await getCurrentPosition();
  } else {
    additionalInfo[additionalInfoQuestionType] = additionalInfoQuestionValue;
  }
  return additionalInfo;
};

const validateUnitTypeQuestionValue = (question: any, questionValue: any) => {
  let questionError: any = "",
    updatedQuestionValue = questionValue;
  const { value: questionValueAfterUnitConversion } = getUnitAnswerValues({
    questionValue: questionValue,
    validation: question?.validation,
    unitValue: question?.unitValue || 0,
  });

  if (
    question?.min &&
    question?.max &&
    (questionValueAfterUnitConversion < question.min ||
      questionValueAfterUnitConversion > question.max) &&
    questionValue != ""
  ) {
    questionError = new Error("Value Is Invalid");
  }
  return { questionError, updatedQuestionValue };
};

const dispatch = (action: any) => {
  let temp = sessionStorage.getItem("allAppQuestions");
  let allQuestion;
  if (temp) {
    allQuestion = JSON.parse(temp);
  }
  let state: any = { questions: allQuestion };
  state = dispatchForm(state, action);
  console.log("dispatchAction", state);
  return state;
};

/**
 *
 * @param value input value
 * @param question modified question
 * @param questions
 * @param dispatch
 * @param nestedConfig
 * @returns {[]}
 */
function questionInputChange(
  value: any = {},
  question: any = {},
  questions: any,
  dispatching: any = {},
  nestedConfig: any = {},
  additionalInfoQuestionType: any = {}
) {
  let errors: any = [],
    success: any = [];
  let updatedQuestion = question;
  if (!question.visibility) {
    return { errors, success, updatedQuestion };
  }
  sessionStorage.setItem("allAppQuestions", JSON.stringify(questions));
  questions = List(questions);
  let state: any = { questions: questions };
  const index = questions.findIndex((q: any) => q.order === question.order);
  state = dispatch({
    type: SET_LAST_UPDATED_QUESTION_INDEX,
    payload: { lastQuestion: question },
  });
  const type = "input_type";

  // resetAllUniqueIdQuestionValue({
  //     questions,
  //     dispatchForm: dispatch,
  //     updatedQuestion: question,
  //     nestedConfig,
  // });

  //Todo write better abstraction
  // if (additionalInfoQuestionType) {
  //     getAdditionalInfoOfQuestion(
  //         additionalInfoQuestionType,
  //         value,
  //         question
  //     ).then((additionalInfoOfQuestion) => {
  //         dispatch({
  //             type: UPDATE_QUESTION_BY_CHILD_CHECK,
  //             payload: {
  //                 ...updatedQuestion,
  //                 additionalInfo: additionalInfoOfQuestion,
  //             },
  //             nestedConfig,
  //         });
  //     });
  //     return { errors, updatedQuestion, success };
  // }
  console.log("questionType", questions, question, value, question[type]);
  let targetValue: any;
  switch (question[type]) {
    case QUESTION_TYPE.BUTTON:
      break;
    case QUESTION_TYPE.UNIT:
      const { questionError, updatedQuestionValue } =
        validateUnitTypeQuestionValue(question, value);
      if (questionError) {
        errors.push(questionError);
        updatedQuestion = { ...question, value: "" };
      } else {
        updatedQuestion = { ...question, value: updatedQuestionValue };
      }
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
      break;
    case QUESTION_TYPE.TEXT:
      updatedQuestion = { ...question, value };
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
      break;
    case QUESTION_TYPE.DATE:
      const dateQuestionValidationError = validateDateTypeQuestion(
        question,
        value
      );
      if (dateQuestionValidationError?.length) {
        errors.push(...dateQuestionValidationError);
        updatedQuestion = { ...question, value: "" };
        state = dispatch({
          type: UPDATE_QUESTION_BY_CHILD_CHECK,
          payload: updatedQuestion,
          nestedConfig,
        });
      } else {
        updatedQuestion = { ...question, value };
        state = dispatch({
          type: UPDATE_QUESTION_BY_CHILD_CHECK,
          payload: updatedQuestion,
          nestedConfig,
        });
      }
      break;
    case QUESTION_TYPE.NUMERIC:
      updatedQuestion = {
        ...question,
        value: computeNumericQuestionValueByApplyingValidation(value, question),
      };
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
      break;
    case QUESTION_TYPE.GPS:
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let newValue = `${position.coords.latitude},${position.coords.longitude},${position.coords.accuracy}`;
            updatedQuestion = { ...question, value: newValue };
            state = dispatch({
              type: UPDATE_QUESTION_BY_CHILD_CHECK,
              payload: updatedQuestion,
              nestedConfig,
            });
          },
          (error) => errors.push(new Error(ERROR.GPS_UNAVAILABLE))
        );
      } else errors.push(new Error(ERROR.GPS_UNAVAILABLE));
      break;
    case QUESTION_TYPE.RADIO:
      updatedQuestion = { ...question, value };
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
      break;
    case QUESTION_TYPE.NESTED_TWO:
    case QUESTION_TYPE.NESTED_ONE:
      console.log("value", value, questions);
      targetValue = { target: value };
      let currentValue = value;
      let oldValue = question.value;
      let answerValueLength;
      answerValueLength = value;
      let childQuestionData = List();
      if (question[type] === QUESTION_TYPE.NESTED_TWO) {
        currentValue = computeNewValueForMultiSelectQuestion(
          targetValue,
          question
        );
        oldValue = oldValue?.length || 0;
        answerValueLength = currentValue.length;
      }
      const newMembersDifference = answerValueLength - oldValue;
      let childQ = questions
        .get(index)
        .childQuestions.map((child: any, idx: any) => {
          return {
            ...child,
            nestedConfig: {
              parentOrder: question.order,
              index: idx,
              loopIndex: question.answer_option.findIndex((option: any) =>
                option._id == value.hasOwnProperty("value")
                  ? value.value
                  : value
              ),
            },
          };
        });
      questions.get(index).childQuestions = childQ;
      console.log(
        "questions",
        question,
        value,
        questions,
        questions.get(index).childQuestions
      );
      if ("childQuestionData" in questions.get(index)) {
        let oldMembers = List(questions.getIn([index, "childQuestionData"]));
        console.log(
          "memebrs",
          newMembersDifference,
          oldMembers,
          questions.get(index)
        );
        if (newMembersDifference < 0) {
          if (question.type !== QUESTION_TYPE.NESTED_TWO) {
            oldMembers = oldMembers.slice(0, newMembersDifference);
          } else {
            const deletedMember = Set.of(...question.value)
              .subtract(Set.of(...currentValue))
              .toArray();
            const deletedMemberIndex = question.value.indexOf(deletedMember[0]);
            if (deletedMemberIndex >= 0) {
              oldMembers = oldMembers.delete(deletedMemberIndex);
            }
          }
        }
        for (let i = 0; i < newMembersDifference; i++) {
          oldMembers = oldMembers.push(
            _.cloneDeep(questions.get(index).childQuestions)
          );
        }
        questions = questions.set(index, {
          ...questions.get(index),
          childQuestionData: oldMembers,
        });
      } else {
        for (let i = 0; i < newMembersDifference; i++) {
          childQuestionData = childQuestionData.set(
            i,
            _.cloneDeep(questions.get(index).childQuestions)
          );
        }
        questions = questions.set(index, {
          ...questions.get(index),
          childQuestionData: childQuestionData,
        });
      }

      updatedQuestion = { ...questions.get(index), value: currentValue };
      console.log(
        "updated",
        updatedQuestion,
        question,
        childQuestionData,
        currentValue
      );
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });

      break;
    case QUESTION_TYPE.SINGLE_SELECT:
      updatedQuestion = { ...question, value };
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
      break;
    case QUESTION_TYPE.MULTI_SELECT:
    case QUESTION_TYPE.MULTI_SELECT_CHECKBOX:
    case QUESTION_TYPE.OPT_IN_OUT:
      targetValue = { target: value };
      updatedQuestion = {
        ...question,
        value: computeNewValueForMultiSelectQuestion(targetValue, question),
      };
      updatedQuestion.answer_option.map((option: any) => {
        if (updatedQuestion.value.includes(option._id)) option.checked = true;
        else option.checked = false;
      });

      updatedQuestion.selectedValue = updatedQuestion.answer_option
        .filter((item: any) => item.checked)
        .map((option: any) => ({
          label: option.name,
          textValue: "",
          value: option._id,
        }));
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
      break;
    case QUESTION_TYPE.UNIQUE_ID:
      dispatchUniqueIdQuestionValue(dispatch, question, value, nestedConfig);
      break;
    case QUESTION_TYPE.FILE_UPLOAD:
      const fileUploadQuestionValueErrors = validateFileUploadQuestion({
        ...question,
        value,
      });
      if (!fileUploadQuestionValueErrors?.length) {
        updatedQuestion = {
          ...question,
          value,
        };
        state = dispatch({
          type: UPDATE_QUESTION_BY_CHILD_CHECK,
          payload: updatedQuestion,
          nestedConfig,
        });
      } else {
        errors.push(...fileUploadQuestionValueErrors);
      }
      break;
    case QUESTION_TYPE.LABEL:
      updatedQuestion = getUpdatedLabelQuestion(question, value);
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
      break;
    case QUESTION_TYPE.IMAGE:
    default:
      updatedQuestion = { ...question, value };
      state = dispatch({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: updatedQuestion,
        nestedConfig,
      });
  }

  //removed
  questions = state.questions;
  if (errors.length === 0) {
    applyRestrictions({
      dispatchForm: dispatch,
      question,
      questionValue: value,
      questions,
      nestedConfig,
      updatedQuestion,
    });
    dynamicOptionFillCount({
      dispatchForm: dispatch,
      question,
      questionValue: value,
      questions,
      nestedConfig,
    });
  }
  console.log("questionChanginf", state);
  updatedQuestion = { ...updatedQuestion };
  questions = state.questions;
  return { errors, updatedQuestion, success, questions };
}

function computeNewValueForMultiSelectQuestion(
  { target: { checked, value } }: any,
  question: any
) {
  let newValue;
  console.log("target", checked, value);
  if (checked) {
    if (question.value) {
      newValue = [...question.value, value];
    } else {
      newValue = [value];
    }
  } else {
    newValue = question.value.filter((e: any) => e !== value);
  }
  // const validations = getValidations(question);
  // const selectAllValidation = validations.find(validation => validation._id === VALIDATION.SELECT_ALL);
  // if (selectAllValidation) {
  //     if (checked) {
  //         newValue = question.answer_option.map(option => option._id);
  //     } else newValue = null;
  // }
  return getMultiSelectValueByValidation(newValue, question);
}

/**
 *
 * @param value
 * @param question
 * @returns {Array<any>}
 *
 * Return the value of a multi-select question  that has validation 31 (De-select all option ).
 * If so the value is filtered according to the validation
 */
function getMultiSelectValueByValidation(value: any, question: any) {
  let newValue = List(value);
  const validations = getValidations(question);
  for (let i = 0; i < validations.length; i++) {
    switch (validations[i]._id) {
      case VALIDATION.SELECT_ALL:
        if (value?.length > (question?.value?.length || 0)) {
          newValue = question.answer_option.map((option: any) => option._id);
          newValue = List(newValue);
        } else {
          newValue = List();
        }
        break;
      case VALIDATION.DESELECT_ALL:
        if (value.includes(validations[i].error_msg)) {
          newValue = newValue.filter((val) => val === validations[i].error_msg);
        }
        break;
      case VALIDATION.CHECK_LIMIT:
        const { error_msg } = validations[i];
        if (newValue.size > Number(error_msg)) {
          newValue = newValue.pop();
        }
        break;
      default:
    }
  }
  console.log("naewValue", value, question, newValue.toJS(), newValue);
  return newValue.toJS();
}

const computeNumericQuestionValueByApplyingValidation = (
  value: any,
  question: any
) => {
  if (value === "") {
    return value;
  }
  if (
    value < 0 &&
    !(
      checkIfQuestionHasGivenValidation(question, VALIDATION.EQUATION) ||
      checkIfQuestionHasGivenValidation(question, VALIDATION.SINGED_NUMBER)
    )
  ) {
    return question.value;
  }
  const formatUptoFixedDecimalPlaceValidation = question.validations?.find?.(
    (validation: any) => validation?._id === VALIDATION.DECIMAL_PLACE
  );
  if (!formatUptoFixedDecimalPlaceValidation) {
    return parseFloat(value).toFixed();
  }
  const numberFormatPattern = formatUptoFixedDecimalPlaceValidation?.value;
  const numberOfPlacesAfterDecimalToFormat =
    numberFormatPattern?.split?.(".")?.[1]?.length || 0;
  return parseFloat(value).toFixed(numberOfPlacesAfterDecimalToFormat);
};

const dispatchUniqueIdQuestionValue = async (
  dispatch: any,
  question: any,
  questionValue: any,
  nestedConfig: any
) => {
  if (
    checkIfQuestionHasGivenValidation(question, VALIDATION.REDIRECT_EXTERNAL)
  ) {
    redirectToNewTabForUniqueIdQuestion(question);
  } else {
    let updatedQuestion = { ...question, value: questionValue };
    if (checkIfQuestionHasGivenValidation(question, VALIDATION.GET_UNIQUE_ID)) {
      updatedQuestion = await getTimestampForUniqueIdQuestion(question);
    }
    dispatch({
      type: UPDATE_QUESTION_BY_CHILD_CHECK,
      payload: updatedQuestion,
      nestedConfig,
    });
  }
};

const redirectToNewTabForUniqueIdQuestion = (question: any) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  const questionRedirectExternalValidation =
    getGivenValidationFromValidationArray(
      question.get("validation"),
      VALIDATION.REDIRECT_EXTERNAL
    );
  window.open(questionRedirectExternalValidation.value, "_blank");
};

const getTimestampForUniqueIdQuestion = async (question: any) => {
  try {
    if (!Map.isMap(question)) {
      question = Map(question);
    }
    //   const { data } = await api.get(`${BASE_URL}get-unique-id`);
    const { data }: any = {};
    question = question.set("value", data?.data);
    return question.toJSON();
  } catch (err) {
    console.log(err);
  }
};

const getUpdatedLabelQuestion = (question: any, value: any) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  const questionHasExpandValidation = question
    ?.get("validation")
    ?.find?.(
      (validation: any) => validation?._id === VALIDATION.EXPANDABLE_SECTION
    );

  if (questionHasExpandValidation) {
    return { ...question?.toJSON(), collapse: value };
  }
  return question.toJSON();
};

const validateFileUploadQuestion = (question: any) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  if (areDuplicateFilePresentInFileUploadQuestion(question)) {
    return [new Error("Duplicate File")];
  }
  const fileTypeErros = areFileUploadQuestionFilesTypeValid(question);
  if (fileTypeErros.length) {
    return fileTypeErros;
  }
  const fileSizeErros = areFileUploadQuestionFilesSizeValid(question);
  if (fileSizeErros.length) {
    return fileSizeErros;
  }
  const fileUploadCountErrors =
    areFileUploadQuestionFilesCountWithinLimit(question);
  if (fileUploadCountErrors.length) {
    return fileUploadCountErrors;
  }
  return;
};

const areDuplicateFilePresentInFileUploadQuestion = (question: any) => {
  console.log("file", question, question.get("value"));
  const filesToBeUploaded = question
    .get("value")
    .filter((fileValue: any) => !!fileValue?.file);
  return filesToBeUploaded.find((parentFileVal: any, parentFileIndex: any) => {
    return filesToBeUploaded.find((childFileVal: any, childFileIndex: any) => {
      if (parentFileIndex === childFileIndex) {
        return false;
      }
      return (
        parentFileVal?.file[0]?.size === childFileVal?.file[0]?.size &&
        parentFileVal?.file[0]?.name === childFileVal?.file[0]?.name &&
        parentFileVal?.file[0]?.type === childFileVal?.file[0]?.type
      );
    });
  });
};

const areFileUploadQuestionFilesTypeValid = (question: any) => {
  const defaultFileTypes = ["image/jpeg"];
  const errors = [];
  const fileTypeValidations = question
    .get("validation")
    .filter(
      (validation: any) => validation._id === VALIDATION.MIME_TYPE_OF_FILE
    )
    .map((validation: any) => validation?.value);

  const isFileTypePresentInFileTypeArr = (fileTypeArr: any, fileType: any) =>
    fileTypeArr.some(
      (fileTypeArrElement: any) => fileTypeArrElement === fileType
    );

  const isFileTypeValidationPresentInQuestion = () =>
    fileTypeValidations?.length;

  const getNotAllowedFileType = () => {
    return question
      .get("value")
      .filter((fileValue: any) => !!fileValue?.file)
      .find(
        (fileValue: any) =>
          !isFileTypePresentInFileTypeArr(
            isFileTypeValidationPresentInQuestion()
              ? fileTypeValidations
              : defaultFileTypes,
            fileValue?.file?.[0]?.type
          )
      );
  };

  const fileValue = getNotAllowedFileType();
  if (fileValue) {
    errors.push(
      new Error(`File Type Not Supported ${fileValue?.file?.[0]?.type}`)
    );
  }
  return errors;
};

//TODO move this in seperate file upload file
const areFileUploadQuestionFilesSizeValid = (question: any) => {
  const errors = [];
  const fileSizeValidation = question
    .get("validation")
    .find((validation: any) => validation._id === VALIDATION.MAX_FILE_SIZE);

  const isQuestionValid = question
    .get("value")
    ?.filter?.((fileValue: any) => !!fileValue?.file)
    ?.every?.(
      (fileValue: any) =>
        fileSizeValidation?.value * 1024 >= fileValue?.file[0]?.size
    );
  if (!isQuestionValid) {
    errors.push(
      new Error(
        `File Size Should Not Be Greater Than ${fileSizeValidation.value} KB`
      )
    );
  }
  return errors;
};

const areFileUploadQuestionFilesCountWithinLimit = (question: any) => {
  const errors = [];
  const fileCountValidation = question
    .get("validation")
    .find((validation: any) => validation._id === VALIDATION.MAX_FILE_COUNT);

  const isQuestionValid =
    question?.get("value")?.filter?.((fileValue: any) => !!fileValue?.file)
      ?.length <= fileCountValidation?.value;

  if (!isQuestionValid) {
    errors.push(
      new Error(
        `Number Of Files Should Not Be Greater Than ${fileCountValidation?.value}`
      )
    );
  }
  return errors;
};

function updateQuestionList(currentQuestion: any, questions: any) {
  const currentQuestionIndex = questions.findIndex(
    (q: any) => q.order === currentQuestion.order
  );
  console.log("question", currentQuestionIndex, questions);
  // questions[currentQuestionIndex] = {...currentQuestion}
  questions = List(questions).set(currentQuestionIndex, { ...currentQuestion });
  questions = updateChildQuestionVisibility(currentQuestion, questions);
  return questions;
}

function updateChildQuestionVisibility(
  currentQuestion: any,
  questions: any,
  visibilityStatus: any = null
) {
  console.log("questioning", questions, currentQuestion, visibilityStatus);
  const currentQuestionIndex = questions.findIndex(
    (question: any) => question.order === currentQuestion?.order
  );
  console.log("currentQuestionIndex", currentQuestionIndex);
  if (!List.isList(questions)) {
    questions = List(questions);
  }
  const questionsToBeChecked = questions?.skip(currentQuestionIndex + 1);
  console.log("questionsToBeChecked", questionsToBeChecked);
  for (const { order } of currentQuestion?.child) {
    let childQuestion = questionsToBeChecked.find(
      (question: any) => question.order == order
    );
    const childQuestionIndex = questions.findIndex(
      (question: any) => question.order == order
    );
    const questionMatchingParentState = isQuestionMatchingParentState(
      childQuestion,
      currentQuestion,
      questions
    );
    const shouldBeVisible =
      visibilityStatus ||
      (checkIfQuestionHasGivenValidation(
        childQuestion,
        VALIDATION.SKIP_LOGIC_REVERSE
      )
        ? !questionMatchingParentState
        : questionMatchingParentState);
    if (
      shouldBeVisible &&
      checkIfQuestionIsAFlagQuestion(currentQuestion) &&
      !isDisabled(currentQuestion)
    ) {
      childQuestion = makeQuestionEditable(childQuestion);
    }
    questions = questions.set(childQuestionIndex, {
      ...childQuestion,
      value: shouldBeVisible ? childQuestion.value : null,
      visibility: shouldBeVisible,
    });
    if (!questionMatchingParentState) {
      questions = updateChildQuestionVisibility(
        childQuestion,
        questions,
        false
      );
    }
  }
  return questions;
}

/**
 *
 * @param question
 * @param parentQuestion
 * @param questions
 * @returns {boolean|*}
 */
function isQuestionMatchingParentState(
  question: any,
  parentQuestion: any,
  questions: any
) {
  console.log(
    "isQuestionMatchingParentState",
    question,
    parentQuestion,
    questions
  );
  let comparisonCount = 0;
  const isValidationSix = question?.validation.find(
    (v: any) => v._id === VALIDATION.MULTIPLE_PARENT_OR
  );
  console.log("isValidationSix", isValidationSix);
  const questionHasParentValueDifferValidation =
    checkIfQuestionHasGivenValidation(question, VALIDATION.PARENT_VALUE_DIFFER);
  console.log(
    "questionHasParentValueDifferValidation",
    questionHasParentValueDifferValidation
  );
  const parentQuestionValueMap: any = {};
  for (let index = 0; index < question?.parent.length; index++) {
    const parentQuestion = questions.find(
      (p: any) => p.order === question?.parent[index].order
    );
    console.log("parentQuestion", parentQuestion);
    const parentValue = parentQuestion.value;
    console.log("parentValue", parentValue);
    if (parentQuestion) {
      const regExp = question?.parent[index].value;
      console.log("regExp", regExp);
      if (matchRegexByQuestionType(parentQuestion.type, regExp, parentValue)) {
        let temp = JSON.stringify(parentValue);
        if (temp) {
          parentQuestionValueMap[temp] = true;
        }
        comparisonCount++;
      }
    }
  }
  if (isValidationSix) {
    return comparisonCount > 0;
  } else if (questionHasParentValueDifferValidation) {
    return checkIfAllOfTheParentQuestionsValuesAreDifferent(
      parentQuestionValueMap,
      question?.parent
    );
  } else return comparisonCount === question?.parent.length;
}

function matchRegexByQuestionType(type: any, regExp: any, testValue: any) {
  console.log("matchRegexByQuestionType", type, regExp, testValue);
  let comparison;
  switch (type) {
    case QUESTION_TYPE.NUMERIC:
    case QUESTION_TYPE.SINGLE_SELECT:
    case QUESTION_TYPE.RADIO:
      comparison = new RegExp(regExp).test(
        testValue?.value ? testValue?.value : testValue
      );
      break;
    case QUESTION_TYPE.MULTI_SELECT:
    case QUESTION_TYPE.MULTI_SELECT_CHECKBOX:
      if (testValue) {
        let matchingValue = testValue.map((v: any) => v + "");
        comparison = matchingValue.some((value: any) =>
          new RegExp(regExp).test(value)
        );
      }
      break;
    default:
      comparison = new RegExp(regExp).test(testValue);
  }
  console.log("regex matchig", comparison);
  return comparison;
}

const checkIfAllOfTheParentQuestionsValuesAreDifferent = (
  parentQuestionValueMap: any,
  parentQuestions: any
) => Object.keys?.(parentQuestionValueMap)?.length === parentQuestions?.length;

function isDisabled(question: any) {
  return !!question.validation.find(
    (val: any) => val._id === VALIDATION.DISABLED_FOR_USER
  );
}

function updatedNestedQuestionList(
  currentQuestion: any,
  questions: any,
  nestedConfig: any
) {
  const parentQuestionIndex = questions.findIndex(
    (q: any) => q.order === nestedConfig.parentOrder
  );
  const keyPath = [
    parentQuestionIndex,
    "childQuestionData",
    nestedConfig.loopIndex,
  ];

  questions = List(questions).setIn(
    [...keyPath, nestedConfig.index],
    currentQuestion
  );

  const questionsToBeMutated = questions.getIn(keyPath);
  console.log("check", questionsToBeMutated, keyPath, questions);
  const result = updateQuestionsVisibilityByRestrictionCheck(
    currentQuestion,
    updateChildQuestionVisibility(currentQuestion, questionsToBeMutated)
  );
  questions = questions.setIn([...keyPath], result.toJS());

  console.log(
    "questionsConfig",
    questions,
    keyPath,
    result,
    nestedConfig,
    currentQuestion
  );
  return questions;
}

/**
 *
 * @param question
 * @param questionList
 * @returns {[]} Returns a updated question list by performing restriction checks on answer option
 */

function updateQuestionsVisibilityByRestrictionCheck(
  question: any,
  questionList: any
) {
  return questionList;
}

/**
 * Iterate all of the question and if the question exist in dynamicOptionsArr then update
 * the answer_option in question with dynamicOption
 *
 * @param questions it is the list of question
 * @param dynamicOptionsArr list of dynamic options
 * @returns {List<any>}
 */
const setAnswerOptionsInQuestionsWithDynamicOptions = (
  questions: any,
  dynamicOptionsArr: any
) => {
  questions = questions.map((question: any) => {
    let immutableQuestion = Map(question);
    const dynamicOptionArrayWithQuestionOrder =
      getDynamicOptionArrayWithGivenOrder(
        dynamicOptionsArr,
        immutableQuestion.get("order")
      );
    if (checkIfQuestionHasDynamicOptions(dynamicOptionArrayWithQuestionOrder)) {
      const immutableQuestionCurrentAnswerOption: any =
        immutableQuestion.get("answer_option") || [];
      immutableQuestion = immutableQuestion.set("answer_option", [
        ...immutableQuestionCurrentAnswerOption,
        ...dynamicOptionArrayWithQuestionOrder,
      ]);
      immutableQuestion = immutableQuestion.set("dynamicOptions", true);
    }
    return immutableQuestion.toJS();
  });
  return questions;
};

/**
 * Iterate all of the question and if the question exist in dynamicOptionsArr then update
 * the answer_option in question with dynamicOption
 *
 * @param dynamicOptionsArr list of dynamic options
 * @param order order of question whose dynamic option we want to get
 * @returns {[{_id: string, name: string, did:[{parent_option: string}] | []}]}
 */
const getDynamicOptionArrayWithGivenOrder = (
  dynamicOptionsArr: any,
  order: any
) =>
  dynamicOptionsArr
    .filter((dynamicOption: any) => dynamicOption.order === order)
    .map((dynamicOption: any) => ({
      ...dynamicOption,
      _id: getDynamicOptionId(dynamicOption),
      name: dynamicOption.optionName,
      did: getDidFromDynamicOption(dynamicOption),
    }));

const getDidFromDynamicOption = (dynamicOption: any) =>
  "parentOption" in dynamicOption
    ? [{ parent_option: `^(${dynamicOption.parentOption})$` }]
    : [];

const getDynamicOptionId = (dynamicOption: any) => {
  if (
    dynamicOption?.hasOwnProperty("nestedOptionId") &&
    dynamicOption?.hasOwnProperty("nestedParentOrder") &&
    dynamicOption?.hasOwnProperty("nestedForParentValue")
  ) {
    return dynamicOption?.nestedOptionId;
  }
  return dynamicOption?.optionId;
};

const checkIfQuestionHasDynamicOptions = (
  dynamicOptionArrayWithQuestionOrder: any
) =>
  dynamicOptionArrayWithQuestionOrder &&
  dynamicOptionArrayWithQuestionOrder.length;

/**
 *
 * @param value string value from input
 * @param config Object {  questions
                order: question.order,
                prevValue: currentValue,
                nestedConfig}
 * @returns {(*|Error)[]|*[]}
 *
 * Return a tuple containing the value and an error object.
 * Checks validation like 4 (Shows alert on a particular input value).
 *
 * Error object contains
 *  - message (Depending upon the validation/restriction type)
 *  - type ("text", "dialog")
 *
 */
function validateTextInputValueByValidationAndRestrictions(
  value: any,
  config: any
) {
  let { questions, order, nestedConfig } = config;
  console.log("value", value, config);
  if (nestedConfig.hasOwnProperty("parentOrder")) {
    const parentQuestionIndex = questions.findIndex(
      (q: any) => q.order === nestedConfig.parentOrder
    );
    const keyPath = [
      parentQuestionIndex,
      "childQuestionData",
      nestedConfig.loopIndex,
    ];
    questions = List(questions);
    config.questions = questions.getIn([...keyPath]);
  }
  const question = config.questions.find(
    (question: any) => question.order === order
  );
  config = { ...config, question };
  if (isNewValueValidToUpdate(value, config)) {
    let { restrictions, validation } = question;
    let [newValue, errorFromRestrictions] = getNewValueTupleByRestriction(
      value,
      { ...config, restrictions }
    );
    let [vValue, errorFromValidation] = checkNewValueByValidation(newValue, {
      ...config,
      validation,
    });
    if (errorFromRestrictions) {
      return [newValue, errorFromRestrictions];
    }
    if (errorFromValidation) {
      return [newValue, errorFromValidation];
    }
    return [newValue];
  } else {
    const errorMessage = getQuestionErrorMessage(question);
    console.log("errorMessage", errorMessage, value);
    return [value, new Error(errorMessage)];
  }
}

/**
 *
 * @param value
 * @param config Object {  questions
                order: question.order,
                prevValue: currentValue,
                nestedConfig
                }
 * @returns {boolean}
 */
function isNewValueValidToUpdate(value: any, config: any) {
  const { prevValue, question } = config;
  switch (question.type) {
    case QUESTION_TYPE.AADHAR_CARD:
      return validateAadhaar(value);
    case QUESTION_TYPE.NUMERIC:
      if (prevValue) {
        if (!value) return true;
      }
      const valueLength =
        value &&
        value.toString().split(".") &&
        value.toString().split(".")[0].length;
      if (
        (question?.max || question?.max === 0) &&
        valueLength > question.max
      ) {
        return false;
      }
      if ("min" in question && valueLength && valueLength < question.min) {
        return false;
      }
      if (
        question.validation.find((value: any) => value._id === VALIDATION.REGEX)
      ) {
        if (question.pattern) {
          return new RegExp(question.pattern).test(value);
        }
      }
      break;
    case QUESTION_TYPE.TEXT:
      if (prevValue) {
        if (!value) return true;
      }
      const textValueLength =
        value && value.toString() && value.toString().length;
      if (
        (question?.max || question?.max === 0) &&
        textValueLength > question.max
      ) {
        return false;
      }
      if (
        "min" in question &&
        textValueLength &&
        textValueLength < question.min
      ) {
        return false;
      }
      if (
        question.validation.find((value: any) => value._id === VALIDATION.REGEX)
      ) {
        if (question.pattern) {
          return new RegExp(question.pattern).test(value);
        }
      }
      break;
    default:
      break;
  }
  return true;
}

function getNewValueTupleByRestriction(value: any, config: any) {
  const { restrictions, questions } = config;
  const validRestrictions = restrictions.filter((r: any): any =>
    [...comparisionRestrictions].includes(r.type)
  );
  let newValueTuple = [value, null];
  let errorMessage = "";
  let valueHasError = false;
  for (let i = 0; i < validRestrictions.length; i++) {
    const [compareFunction, comparisionErrorString]: any =
      getComparisionCallback([validRestrictions[i]]);
    const { orders } = restrictions[i];
    for (let j = 0; j < orders.length; j++) {
      let questionObject = questions.find(
        (q: any) => q.order === orders[j].order
      );
      if (questionObject) {
        let comparedValues = [];
        switch (questionObject.type) {
          case QUESTION_TYPE.DATE:
          case QUESTION_TYPE.TIME:
            comparedValues = [value, questionObject.value];
            break;
          default:
            comparedValues = [Number(value), Number(questionObject.value)];
            break;
        }
        if (!compareFunction(...comparedValues)) {
          errorMessage = `${comparisionErrorString} Question: ${questionObject.title}`;
          valueHasError = true;
        }
      } else valueHasError = false;
    }
    if (valueHasError) {
      return (newValueTuple = [value, new Error(errorMessage)]);
    }
  }
  return newValueTuple;
}

/**
 * callback that checks the current question value with the specified question in the restriction object
 *
 * @param restrictions
 * @returns {((function(*, *): boolean)|string)[]}
 */
function getComparisionCallback(restrictions: any) {
  let compareFn = (a: any, b: any) => true;
  let comparisionErrorStringPrefix = "Value should be ";
  for (let i = 0; i < restrictions.length; i++) {
    switch (restrictions[i].type) {
      case RESTRICTION.LESS_THAN:
        compareFn = (a, b) => a < b;
        comparisionErrorStringPrefix = `${comparisionErrorStringPrefix} less than`;
        break;
      case RESTRICTION.LESS_THAN_EQUAL:
        comparisionErrorStringPrefix = `${comparisionErrorStringPrefix} less than or equal to`;
        compareFn = (a, b) => a <= b;
        break;
      case RESTRICTION.EQUAL_TO:
        comparisionErrorStringPrefix = `${comparisionErrorStringPrefix}  equal to`;
        compareFn = (a, b) => a === b;
        break;
      case RESTRICTION.GREATER_THAN:
        comparisionErrorStringPrefix = `${comparisionErrorStringPrefix} greater than`;
        compareFn = (a, b) => a > b;
        break;
      case RESTRICTION.GREAT_THAN_EQUAL:
        comparisionErrorStringPrefix = `${comparisionErrorStringPrefix} greater than or equal to`;
        compareFn = (a, b) => a >= b;
        break;
      default:
        break;
    }
  }
  return [compareFn, comparisionErrorStringPrefix];
}

function checkNewValueByValidation(value: any, config: any) {
  const { validation } = config;
  let tuple = [value];
  for (let i = 0; i < validation.length; i++) {
    if (validation[i]._id === VALIDATION.ALERT) {
      let regExpObj = validation[i];
      let showAlertInBetween = validation.find(
        (v: any) => v._id === VALIDATION.ALERT_IN_BETWEEN
      );
      let alertMessage = validation.find(
        (v: any) => v._id === VALIDATION.ALERT_MSG
      );
      if (new RegExp(regExpObj.error_msg).test(value)) {
        if (showAlertInBetween) {
          tuple = [value, new Error(alertMessage.error_msg || "")];
        }
      } else {
        if (!showAlertInBetween)
          tuple = [value, new Error(alertMessage.error_msg || "")];
      }
      return tuple;
    }
  }
  return tuple;
}

const getQuestionErrorMessage = (question: any) => {
  let errorMessage = "Value is invalid";
  const questionAlertMessageValidation =
    getQuestionAlertMessageValidation(question);
  if (!!questionAlertMessageValidation) {
    errorMessage = questionAlertMessageValidation?.error_msg;
  }
  return errorMessage;
};

const getQuestionAlertMessageValidation = (question: any) =>
  question?.validation?.find(
    (validation: any) => validation?._id === VALIDATION.ALERT_MSG
  );

function getUserPosition() {}

const getFilesObtainedFromPrefilledQuestion = (question: any) =>
  question?.get("value")?.filter?.((fileObj: any) => !fileObj.file);

const composeFileListArrToFilesArr = (fileListArr: any) =>
  fileListArr.map((file: any) => file?.[0]);

const getFilesNotObtainedFromPrefilledQuestion = (question: any) =>
  question
    ?.get("value")
    ?.filter?.((fileObj: any) => !!fileObj.file)
    ?.map?.((fileObj: any) => fileObj.file);

const composeResponseToFileArr = (response: any) =>
  response?.map?.((res: any) => ({
    label: res?.file_name,
    textValue: res?.file_url,
  }));

const updateFileUploadQuestionsValueWithS3Url = async (questions: any) => {
  try {
    const updatedQuestions = await Promise.all(
      questions.map(async (question: any) => {
        if (!Map.isMap(question)) {
          question = Map(question);
        }
        if (
          question.get("input_type") !== QUESTION_TYPE.FILE_UPLOAD ||
          !question.get("value")
        ) {
          return question.toJSON();
        }

        const filesObtainedFromPrefilledQuestion =
          getFilesObtainedFromPrefilledQuestion(question) || [];

        const filesNotObtainedFromPrefilledQuestion =
          getFilesNotObtainedFromPrefilledQuestion(question) || [];

        const response = filesNotObtainedFromPrefilledQuestion.length
          ? await getFilesS3UrlAndUploadToS3(
              filesNotObtainedFromPrefilledQuestion
            )
          : [];

        const fileArrFromResponse = composeResponseToFileArr(response);

        question = question.set("value", [
          ...filesObtainedFromPrefilledQuestion,
          ...fileArrFromResponse,
        ]);
        return question.toJSON();
      })
    );
    return List(updatedQuestions);
  } catch (err) {
    throw err;
  }
};

const getAdditionalInfoOfQuestionForFormSubmission = (question: any) => {
  const additionalInfoOfQuestion: any = {};
  for (let questionType in question?.additionalInfo) {
    additionalInfoOfQuestion[
      FORM_SUBMISSION_ADDITIONAL_INFO_QUESTION_NAME[questionType]
    ] = question?.additionalInfo[questionType];
  }
  return additionalInfoOfQuestion;
};

function getGpsAnswer({ value = "" }) {
  if (value) {
    return value.split(",").map((locationItem, i, arr) => {
      if (i === 0) {
        return {
          label: "accuracy",
          value: arr[2],
        };
      } else if (i === 1) {
        return {
          label: "longitude",
          value: arr[0],
        };
      } else
        return {
          label: "latitude",
          value: arr[1],
        };
    });
  }
  return [];
}

/**
 * Generates multiSelect questions api response
 * @param value
 * @param answer_option
 * @returns {[]}
 */
function getMultiSelectAnswerValues({ value = [], answer_option }: any) {
  const answers = [];
  if (value && value.length) {
    for (const item of value) {
      const option = answer_option.find((option: any) => option._id == item);
      if (option) {
        answers.push({ value: option._id, label: option.name });
      }
    }
  }
  return answers;
}

const composeFileUploadQuestionValueForFormSubmit = (
  fileUploadQuestionVal: any
) =>
  fileUploadQuestionVal?.map?.((questionVal: any) => ({
    textValue: questionVal?.textValue,
    label: questionVal?.label,
    value: "",
  }));

/**
 * Creates api response for form submission
 * @param questions
 * @returns {[][]}
 */
async function getQuestionResponseForSubmit(questions: any) {
  const response: any = [];
  const errors: any = [];
  const length = questions.size;
  for (let i = 0; i < length; i++) {
    const question = questions.get(i);
    const answerObject = {
      answer: [],
      input_type: question.type,
      nestedAnswer: [],
      order: question.order,
      ...getAdditionalInfoOfQuestionForFormSubmission(question),
    };

    let answer: any = {
      label: "",
      textValue: "",
      value: "",
    };
    switch (question.type) {
      case QUESTION_TYPE.GPS:
        answerObject.answer.push(...getGpsAnswer(question));
        break;
      case QUESTION_TYPE.UNIT:
        answer = getUnitAnswerValues(question);
        answerObject.answer.push(answer);
        break;
      case QUESTION_TYPE.ADDRESS:
      case QUESTION_TYPE.TEXT:
        answer.textValue = question.value;
        answerObject.answer.push(answer);
        break;
      case QUESTION_TYPE.AADHAR_CARD:
      case QUESTION_TYPE.NUMERIC:
        answer.value = question.value;
        if (
          question.validation.find((v: any) => v._id === VALIDATION.EQUATION) ||
          question.restrictions.find(
            (r: any) => r.type === RESTRICTION.SUM_FROM_LOOP
          )
        ) {
          answer.value = getDynamicKeys(question, questions).value;
        }
        answerObject.answer.push(answer);
        break;
      case QUESTION_TYPE.MULTI_SELECT_CHECKBOX:
      case QUESTION_TYPE.MULTI_SELECT:
        answerObject.answer.push(...getMultiSelectAnswerValues(question));
        break;
      case QUESTION_TYPE.CONSENT:
      case QUESTION_TYPE.SINGLE_SELECT:
      case QUESTION_TYPE.RADIO:
        answer.value = question.value;
        const answerOption = question.answer_option.find(
          (option: any) => option._id == question.value
        );
        if (answerOption) {
          answer.label = answerOption.name;
        }
        answerObject.answer.push(answer);
        break;
      case QUESTION_TYPE.IMAGE:
        answer.value = question.value;
        answerObject.answer.push(answer);
        break;
      case QUESTION_TYPE.AUDIO:
      case QUESTION_TYPE.TIME:
        answer.value = question.value;
        answerObject.answer.push(answer);
        break;
      case QUESTION_TYPE.DATE:
        answer.value = question?.value?.split?.("-")?.reverse?.()?.join?.("-");
        answerObject.answer.push(answer);
        break;
      case QUESTION_TYPE.NESTED_ONE:
        if (question.value) {
          answer.value = question.value;
          const answerOption = question.answer_option.find(
            (option: any) => option._id == question.value
          );
          if (answerOption) {
            answer.label = answerOption.name;
          }
          answerObject.answer.push(answer);
          const { childQuestionData } = question;
          for (let j = 0; j < childQuestionData?.size; j++) {
            const [nestedResponse, nestedResponseError] =
              await getQuestionResponseForSubmit(
                childQuestionData
                  .get(j)
                  .filter((question: any) => question.visibility)
              );
            answerObject.nestedAnswer.push({
              answerNestedData: nestedResponse,
              forParentValue: question?.value,
            });
          }
        }
        break;
      case QUESTION_TYPE.NESTED_TWO:
        answerObject.answer.push(...getMultiSelectAnswerValues(question));
        const { childQuestionData } = question;
        for (let j = 0; j < childQuestionData?.size; j++) {
          const [nestedResponse, nestedResponseError] =
            await getQuestionResponseForSubmit(
              childQuestionData
                .get(j)
                .filter((question: any) => question.visibility)
            );
          answerObject.nestedAnswer.push({
            answerNestedData: nestedResponse,
            forParentValue: question?.value,
          });
        }
        break;
      case QUESTION_TYPE.FILE_UPLOAD:
        answerObject.answer.push(
          ...(composeFileUploadQuestionValueForFormSubmit(question.value) || [
            answer,
          ])
        );
        break;
      default:
        answer.value = question.value;
        answerObject.answer.push(answer);
    }
    response.push(answerObject);
  }
  return [response, errors];
}

/**
 * Creates an api request object for submitting question
 * @param questions
 * @returns {[][]} Tuple of api request object and error
 */
async function prepareFormResponse(
  questions: any,
  { form }: any,
  transactionId: any,
  userLocation: any
) {
  try {
    //if fileUpload questions are present we have to upload the files and update the question
    //with s3 url
    questions = await updateFileUploadQuestionsValueWithS3Url(questions);
    let response: any = {};
    const error: any = [];
    const [question, questionError] = await getQuestionResponseForSubmit(
      questions
    );

    let localTime: any = localStorage.getItem("survey_start");
    response = {
      location: userLocation || {
        lat: "0.0",
        lng: "0.0",
        accuracy: "0.0",
      },
      question,
      transactionId: transactionId ? transactionId : form.get("transactionId"),
      language: "en",
      timeTaken: Date.now() - localTime,
      formUiniqueId: form.get("_id"),
      formId: form.get("formId"),
      version: 1,
      mobileCreatedAt: new Date(),
      mobileUpdatedAt: new Date(),
    };
    return [response, error];
  } catch (err) {
    throw err;
  }
}

const getFormTransactionId = () => {
  // if (formReviewAndEditPageMatch) {
  //   return prefilledForm?.transactionId;
  // }
  // if (draftPageMatch) {
  //   return draftFormTransactionId;
  // }
  // return null;
};

//TODO simplify this
async function submitForm(saveAsDraft = false, questions: any) {
  // try {
  const filledQuestions = List(questions);
  const errors = validateQuestions(filledQuestions);
  const emptyRequiredQuestions = getEmptyRequiredQuestions(questions);

  return emptyRequiredQuestions;
  console.log("errossubmit", errors, emptyRequiredQuestions);
  //   if (!errors.length && previewFormPageMatch) {
  //     setSuccess([{ message: SUCCESS.PREVIEW_FORM_SUBMIT_SUCCESS_MESSAGE }]);
  //     return;
  //   }
  //   if ((!errors.length && !submitError?.size) || saveAsDraft) {
  //     if (
  //       isLocationRequiredWhileSubmittingForm &&
  //       !userLocation &&
  //       !saveAsDraft
  //     ) {
  //       getUserPosition();
  //       return;
  //     }
  //     setPreparingFormResponse(true);

  //     const [response, responseErrors] = await prepareFormResponse(
  //       filledQuestions,
  //       { form },
  //       getFormTransactionId(),
  //       userLocation
  //     );
  //     if (!responseErrors.length && (saveAsDraft || draftPageMatch)) {
  //       response.timeTaken = getTimeTakenToSaveDraft(
  //         response.timeTaken,
  //         draft,
  //         draftMetadataList
  //       );
  //     }
  //     if (!responseErrors.length && !previewFormPageMatch && !saveAsDraft) {
  //       questionsHaveValidAnswerValidation && loaderDispatch(startLoader());
  //       shouldCallApi(true);
  //       setBody(response);
  //       if (draftPageMatch) {
  //         submitDraft({
  //           ...response,
  //           isFilled: true,
  //         });
  //         markDraftWithGivenTransactionIdAsCompletedInCache(
  //           getFormTransactionId(),
  //           formId,
  //           queryClient
  //         );
  //       }
  //       dispatch({ type: MARK_FORM_AS_SUBMITTED });
  //     }
  //     if (saveAsDraft) {
  //       submitDraft(response);
  //     }
  //   } else {
  //     //Todo remove setErrors in few days after everything is working fine
  //     const emptyRequiredQuestions = getEmptyRequiredQuestions(questions);
  //     if (emptyRequiredQuestions?.length) {
  //       setOpenPendingQuestionsList(true);
  //       setPendingQuestionList(emptyRequiredQuestions);
  //     }
  //     // : setErrors(errors);
  //   }
  // } catch (err) {
  //   setMessages([
  //     {
  //       message: err?.message || ERROR.DEFAULT_ERROR_MESSAGE,
  //       type: MESSAGE_TYPES.error,
  //     },
  //   ]);
  // } finally {
  //   setPreparingFormResponse(false);
  // }
}

const getQuestionAlertIfNoAnswerValidationError = (question: any) => {
  let error: any = "";
  question.validation.forEach((validation: any) => {
    if (validation._id === VALIDATION.ALERT_IF_NO_ANSWER) {
      let errorMessage = `${ERROR.PREFIX} ${question.label}. ${
        validation.error_msg || ERROR.ALERT_IF_NO_ANSWER
      }`;
      error = getErrorObject(question.value, errorMessage);
    }
  });
  return error;
};

function getErrorObject(answer: any, errorString: any) {
  let error = null;
  if (Array.isArray(answer)) {
    if (!answer.length) {
      return new Error(errorString);
    }
  }
  if (!answer) {
    return new Error(errorString);
  }
  return error;
}

/**
 *    Validates filled question before submitting.
 * @param list list of Questions to be Checked
 * @returns {[]|[]|number} Error Object
 */
function validateQuestions(list: any) {
  const errors: any = [];
  const length = list.size;
  if (!length) {
    return errors;
  }
  for (let i = 0; i < length; i++) {
    const item = list.get(i);
    const alertIfNoAnswerValidationError =
      getQuestionAlertIfNoAnswerValidationError(item);
    if (alertIfNoAnswerValidationError) {
      return [alertIfNoAnswerValidationError];
    }
    if (
      isRequired(item) &&
      checkQuestionVisibilityAccordingToParentCollapsableHeader(list, item)
    ) {
      let messageString = errorMessageStrings[item.type] || "Please Fill";
      const answer = item.value;
      let error: any = [];
      switch (item.type) {
        case QUESTION_TYPE.NUMERIC:
          error = getErrorObject(
            answer,
            `${ERROR.PREFIX} ${item.label}. ${messageString} ${item.title}`
          );
          if (error) return [error, ...errors];
          if (isNaN(Number(answer))) {
            return errors.push(new Error(`Invalid value at ${item.title}`));
          }
          break;
        case QUESTION_TYPE.NESTED_ONE:
        case QUESTION_TYPE.NESTED_TWO:
          error = getErrorObject(
            answer,
            `${ERROR.PREFIX} ${item.label}. ${messageString} ${item.title}`
          );
          if ("childQuestionData" in item) {
            const { childQuestionData } = item;
            for (let childItem of childQuestionData) {
              let childQuestionErrors: any = validateQuestions(childItem);
              if (childQuestionErrors.length)
                return [...childQuestionErrors, ...errors];
            }
          }
          if (error) return [error, ...errors];
          break;
        default:
          error = getErrorObject(
            answer,
            `${ERROR.PREFIX} ${item.label}. ${messageString} ${item.title}`
          );
          if (error) return [error, ...errors];
          break;
      }
    }
  }
  return errors;
}

function getDateInFormat(date: any) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${yy}-${mm}-${dd}`;
}

export {
  setInitialQuestions,
  questionInputChange,
  isDisabled,
  updateQuestionList,
  updatedNestedQuestionList,
  setAnswerOptionsInQuestionsWithDynamicOptions,
  computeNewValueForMultiSelectQuestion,
  validateTextInputValueByValidationAndRestrictions,
  matchRegexByQuestionType,
  getDateInFormat,
  submitForm,
};
