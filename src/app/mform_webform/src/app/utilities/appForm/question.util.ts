import { matchRegexByQuestionType, getDateInFormat } from "./form.util";
import {
  htmlInputTypes,
  IMAGE_QUALITY,
  QUESTION_TYPE,
  RESTRICTION,
  UNIT,
  VALIDATION,
} from "./constants";
import { List, Map } from "immutable";

function isDisabled(question: any) {
  return !!question.validation.find(
    (val: any) => val._id === VALIDATION.DISABLED_FOR_USER
  );
}

const checkQuestionVisibilityAccordingToParentCollapsableHeader = (
  questions: any,
  questionToCheckVisibility: any
) => {
  const questionIndex = questions?.findIndex?.(
    (question: any) => question?.order == questionToCheckVisibility?.order
  );
  const parentCollapsableHeaderQuestion = questions
    ?.slice?.(0, questionIndex + 1)
    ?.findLast?.(
      (question: any) =>
        question?.input_type == QUESTION_TYPE.LABEL &&
        checkIfQuestionHasGivenValidation(
          question,
          VALIDATION.EXPANDABLE_SECTION
        )
    );
  if (!parentCollapsableHeaderQuestion) {
    return true;
  }
  return (
    parentCollapsableHeaderQuestion?.visibility &&
    !parentCollapsableHeaderQuestion?.collapse
  );
};

const checkIfQuestionHasGivenValidation = (
  question: any,
  validationToCheckInQuestion: any
) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  return question
    .get("validation")
    ?.some((validation: any) => validation._id === validationToCheckInQuestion);
};

const getGivenValidationFromValidationArray = (
  validationArr: any,
  validationToCheckInQuestion: any
) =>
  validationArr.find(
    (validation: any) => validation._id == validationToCheckInQuestion
  );

const getQuestionOfGivenOrder = (questions: any, questionOrder: any) =>
  questions.find((question: any) => question.order == questionOrder);

const getValidations = (question: any) => question.validation;

const checkIfQuestionIsAFlagQuestion = (question: any) => !!question.flag;

const makeQuestionEditable = (question: any) => {
  if (!isDisabled(question)) {
    return question;
  }
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  let questionValidation = List(question.get("validation"));
  questionValidation = questionValidation.filter(
    (validation: any) => validation._id !== VALIDATION.DISABLED_FOR_USER
  );
  return question.set("validation", questionValidation.toArray()).toJSON();
};

function isQuestionNested(questionOrder: any) {
  return !Number.isSafeInteger(Number(questionOrder));
}

const getQuestionWeightageForQuestionValue = (question: any) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  let questionValues = question?.get?.("value");
  if (!Array.isArray(questionValues)) {
    questionValues = [question?.get?.("value")];
  }
  return question
    ?.get("weightage")
    ?.find(
      (answerOptionWeitage: any) =>
        questionValues?.every((questionValue: any) =>
          new RegExp(answerOptionWeitage?.answer).test(questionValue)
        ) &&
        questionValues?.length ===
          answerOptionWeitage?.answer?.split?.("|")?.length
    );
};

const getQuestionValueForBodmas = (question: any) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  const questionInputType = question?.get("input_type");
  if (
    !(
      questionInputType === QUESTION_TYPE.MULTI_SELECT ||
      questionInputType === QUESTION_TYPE.MULTI_SELECT_CHECKBOX ||
      questionInputType === QUESTION_TYPE.SINGLE_SELECT ||
      questionInputType === QUESTION_TYPE.RADIO
    ) ||
    checkIfQuestionHasGivenValidation(
      question,
      VALIDATION.DIRECT_VALUE_IN_BODMAS
    )
  ) {
    return isNaN(question?.get("value")) ? 0 : question?.get("value");
  }
  const questionWeitageForQuestionValue =
    getQuestionWeightageForQuestionValue(question);
  if (questionWeitageForQuestionValue) {
    return questionWeitageForQuestionValue?.value;
  }
  return Array.isArray(question.get("value")) ? 0 : question.get("value");
};

/**
 * Calculates derived value of a question having restriction like 3,4,6,7
 * @param relatedQuestionsOrders
 * @param operation
 * @param questions
 * @returns {[]}
 */
function getDerivedValueFromNumericRestriction(
  relatedQuestionsOrders: any,
  operation: any,
  questions: any
) {
  let sum: any = [];
  relatedQuestionsOrders.forEach((relatedQuestionOrder: any) => {
    if (!isQuestionNested(relatedQuestionOrder.order)) {
      const relatedQuestion = questions.find(
        (question: any) => question.order == relatedQuestionOrder.order
      );
      if (relatedQuestion) {
        const relatedQuestionValue = getQuestionValueForBodmas(relatedQuestion);
        if (relatedQuestionValue) {
          sum.push(Number(relatedQuestionValue));
        }
      }
    }
  });
  if (sum.length)
    sum = sum.reduce((a: any, b: any) => eval(`${a} ${operation} ${b}`));
  return sum;
}

const getQuestionsListAfterUpdatingAnswerOptionOfGivenQuestion = (
  questions: any,
  questionOrder: any,
  answerOption: any
) => {
  const questionIndexInQuestionList =
    getIndexOfGivenQuestionOrderInQuestionList(questions, questionOrder);
  if (!List.isList(questions)) {
    questions = List(questions);
  }
  const question = questions.get(questionIndexInQuestionList);
  questions = questions.set(questionIndexInQuestionList, {
    ...question,
    answer_option: answerOption,
  });
  return questions;
};

const getIndexOfGivenQuestionOrderInQuestionList = (
  questions: any,
  questionOrder: any
) => questions.findIndex((question: any) => question.order === questionOrder);

function getTitleProps(question: any, index: any) {
  return {
    ...question,
    order: question.order,
    label: question.label,
    information: question.information,
    title: question.title,
    type: question.type,
    restrictions: question.restrictions,
    validation: question.validation,
    required: isRequired(question),
    resource_urls: question.resource_urls,
    flagMessage: question?.flagMessage,
    width: question.width ? question.width : "50",
  };
}

const isRequired = (question: any) => {
  if (question.visibility) {
    if (question.hasOwnProperty("visible")) return question.visible;
  }
  if (question.validation) {
    return Boolean(
      question.validation.find(
        (v: any) => v._id.toString() == VALIDATION.REQUIRED
      )
    );
  }
  return false;
};

const getRestrictionOfGivenType = (restrictions: any, restrictionType: any) =>
  restrictions?.find(
    (restriction: any) => restriction?.type === restrictionType
  );

const checkIfQuestionOrderIsAvailableInRestriction = (
  questionOrder: any,
  restrictions: any,
  restrictionType: any
) => {
  const restriction = getRestrictionOfGivenType(restrictions, restrictionType);
  return !!restriction?.orders?.find(
    (restrictionOrder: any) => restrictionOrder.order === questionOrder
  );
};

function hasChildQuestionsData(question: any) {
  return (
    question.hasOwnProperty("childQuestionData") &&
    question.childQuestionData.size
  );
}

function mapChildQuestionDataAsAnswerOptions(
  question: any,
  restrictionOrderObject: any,
  filterRestrictionObj: any,
  allOfTheRestrictionConditionShouldBeFulfilled = true
) {
  function checkIfOptionShouldBeAdded(memberQuestionList: any) {
    return filterRestrictionObj.orders[
      allOfTheRestrictionConditionShouldBeFulfilled ? "every" : "some"
    ]((order: any) => {
      let question = memberQuestionList.find(
        (q: any) => q.order === order.order
      );
      if (question && question.value) {
        return matchRegexByQuestionType(
          question.type,
          order.value,
          question.value
        );
      }
      return false;
    });
  }

  const options: any = [];
  question.childQuestionData.forEach(
    (memberQuestionList: any, memberIndex: any) => {
      let relatedMemberQuestion = memberQuestionList.find(
        (m: any) => m.order === restrictionOrderObject.order
      );
      const option = {
        _id: `${memberIndex + 1}`,
        name: relatedMemberQuestion.value,
        did: [],
      };
      if (relatedMemberQuestion.value) {
        if (filterRestrictionObj) {
          if (checkIfOptionShouldBeAdded(memberQuestionList)) {
            options.push(option);
          }
        } else {
          options.push(option);
        }
      }
    }
  );
  return options;
}

/**
 * return an object with keys such as option and value if they are dynamically dependent on other question values.
 * Eg.(restriction 11 ,9.1,9.2);
 *
 * @param question
 * @param questions
 * @returns {{options: *}}
 */
function getDynamicKeys(question: any, questions: any) {
  let { answer_option: answerOptions, value } = question;
  let dynamicKeysObject: any = { options: question.answer_option, value };
  const { restrictions, validation } = question;

  switch (question.type) {
    case QUESTION_TYPE.NESTED_ONE:
    case QUESTION_TYPE.NESTED_TWO:
    case QUESTION_TYPE.MULTI_SELECT_CHECKBOX:
    case QUESTION_TYPE.SINGLE_SELECT:
    case QUESTION_TYPE.MULTI_SELECT:
    case QUESTION_TYPE.RADIO:
    case QUESTION_TYPE.NUMERIC:
      restrictions.forEach(({ orders: relatedQuestionsOrders, type }: any) => {
        // eslint-disable-next-line default-case
        switch (type) {
          case RESTRICTION.SUM_FROM_LOOP:
            dynamicKeysObject.value = 0;
            relatedQuestionsOrders.forEach((relatedQuestionOrder: any) => {
              const relatedQuestion = questions.find(
                (question: any) =>
                  question.order === `${parseInt(relatedQuestionOrder.order)}`
              );
              if (relatedQuestion && hasChildQuestionsData(relatedQuestion)) {
                dynamicKeysObject.value +=
                  relatedQuestion.childQuestionData.reduce(
                    (sum: any, child: any) =>
                      sum +
                        Number(
                          child.find(
                            (child: any) =>
                              child.order == relatedQuestionOrder.order
                          ).value
                        ) || 0,
                    0
                  );
              }
            });
            break;
          case RESTRICTION.SUBTRACTION:
            dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
              relatedQuestionsOrders,
              "-",
              questions
            );
            dynamicKeysObject.disabled = true;
            break;

          case RESTRICTION.ADDITION:
            dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
              relatedQuestionsOrders,
              "+",
              questions
            );
            dynamicKeysObject.disabled = true;
            break;

          case RESTRICTION.MULTIPLICATION:
            dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
              relatedQuestionsOrders,
              "*",
              questions
            );
            dynamicKeysObject.disabled = true;
            break;
          case RESTRICTION.DIVISION:
            dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
              relatedQuestionsOrders,
              "/",
              questions
            );
            dynamicKeysObject.disabled = true;
            break;
          case RESTRICTION.DYNAMIC_OPTION:
          case RESTRICTION.DYNAMIC_OPTION_LOOP:
            const filtersRestrictionObj = question.restrictions.find(
              (r: any) => r.type === `${type}.1`
            );
            const questionHasOrConditionWhenSelectingDynamicOptionValidation =
              checkIfQuestionHasGivenValidation(
                question,
                VALIDATION.OR_CONDITION_WHEN_SELECTING_DYNAMIC_OPTION
              );
            relatedQuestionsOrders.forEach((relatedQuestionOrder: any) => {
              if (isQuestionNested(relatedQuestionOrder.order)) {
                const relatedQuestion = questions.find(
                  (question: any) =>
                    question.order === `${parseInt(relatedQuestionOrder.order)}`
                );
                const hideOptionValidation = validation.find(
                  ({ _id }: any) => _id === VALIDATION.HIDE_PREDEFINED_ANSWER
                );
                if (relatedQuestion && hasChildQuestionsData(relatedQuestion)) {
                  let newAnswerOptions: any =
                    mapChildQuestionDataAsAnswerOptions(
                      relatedQuestion,
                      relatedQuestionOrder,
                      filtersRestrictionObj,
                      !questionHasOrConditionWhenSelectingDynamicOptionValidation
                    );
                  if (newAnswerOptions?.length) {
                    if (hideOptionValidation) {
                      answerOptions = [...newAnswerOptions];
                    } else {
                      answerOptions = [...newAnswerOptions, ...answerOptions];
                    }
                  } else {
                    if (hideOptionValidation) {
                      answerOptions = [
                        { _id: `99`, name: "No eligible members", did: [] },
                      ];
                    }
                  }
                } else {
                  if (hideOptionValidation) {
                    answerOptions = [
                      { _id: `99`, name: "No eligible members", did: [] },
                    ];
                  }
                }
                dynamicKeysObject = {
                  ...dynamicKeysObject,
                  options: answerOptions,
                };
              }
            });
            break;
        }
      });
      validation.forEach((v: any) => {
        if (v._id === VALIDATION.VILLAGE_WISE_LIMIT) {
          const options = answerOptions.map((option: any) => {
            if (option.count >= option.limit) {
              option.visibility = false;
              option.disabled = !option.visibility;
            }
            return option;
          });
          dynamicKeysObject = { ...dynamicKeysObject, options };
        }

        if (v._id === VALIDATION.EQUATION) {
          let equation = v.value;
          let orders = questions.filter((question: any) =>
            equation.match(new RegExp(`\\b${question.shortKey}\\b`))
          );
          orders.forEach((order: any) => {
            const questionValue = getQuestionValueForBodmas(order);
            equation = equation.replace(
              order.shortKey,
              questionValue ? `(${questionValue})` : 0
            );
          });
          dynamicKeysObject.value = orders?.length ? eval(equation) : 0;
        }
      });
      break;

    case QUESTION_TYPE.TIME:
    case QUESTION_TYPE.DATE:
      validation.forEach((validation: any) => {
        switch (validation._id) {
          case VALIDATION.TODAY_DATE:
            dynamicKeysObject.value = getDateInFormat(new Date());
            break;
          // case VALIDATION.FUTURE_DATE:
          //   dynamicKeysObject.min = getDateInFormat(
          //     new Date(new Date().setDate(new Date().getDate() + 1))
          //   );
          //   break;
          // case VALIDATION.FUTURE_PRESENT_DATE:
          //   dynamicKeysObject.min = getDateInFormat(new Date());
          //   break;
          // case VALIDATION.PAST_PRESENT_DATE:
          //   if (question.type === QUESTION_TYPE.TIME) {
          //     dynamicKeysObject.max = getTimeInFormat(new Date());
          //   } else {
          //     dynamicKeysObject.max = getDateInFormat(new Date());
          //   }
          //   break;
          // case VALIDATION.PAST_DATE:
          //   dynamicKeysObject.max = getDateInFormat(
          //     new Date(new Date().setDate(new Date().getDate() - 1))
          //   );
          // break;
          default:
            break;
        }
      });
      break;
    default:
      break;
  }
  return dynamicKeysObject;
}

const getQuestionWithGivenOrderFromQuestionList = (
  questionOrder: any,
  questions: any
) => questions?.find((question: any) => question?.order === questionOrder);

const getEmptyRequiredQuestions = (questions: any, nestedConfig: any = "") => {
  let requiredQuestions: any = [];
  if (!questions) {
    return requiredQuestions;
  }
  questions.forEach((question: any) => {
    let emptyQuestion: any = {
      order: question?.order,
      label: question?.label,
      title: question?.title,
      nestedQuestions: [],
      visibility: question.visibility,
      id: getQuestionUniqueId(question, nestedConfig),
    };
    if (
      (question?.input_type == QUESTION_TYPE.NESTED_ONE ||
        question?.input_type == QUESTION_TYPE.NESTED_TWO) &&
      question?.childQuestionData?.size
    ) {
      question.childQuestionData.forEach(
        (childQuestions: any, loopIndex: any) => {
          emptyQuestion.nestedQuestions.push(
            ...getEmptyRequiredQuestions(childQuestions, { loopIndex })
          );
        }
      );
      if (emptyQuestion?.nestedQuestions?.length) {
        requiredQuestions.push(emptyQuestion);
      }
      return;
    }
    if (
      isRequired(question) &&
      !isQuestionFilled(question) &&
      checkQuestionVisibilityAccordingToParentCollapsableHeader(
        questions,
        question
      )
    ) {
      requiredQuestions.push(emptyQuestion);
    }
  });
  return requiredQuestions;
};

const getQuestionUniqueId = (question: any, nestedConfig: any) =>
  question?._id +
  (nestedConfig?.hasOwnProperty("loopIndex") ? nestedConfig.loopIndex : "");

const isQuestionFilled = (question: any) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  if (Array.isArray(question?.get?.("value"))) {
    return question?.get?.("value")?.length;
  }
  return !!question?.get?.("value");
};

export {
  checkIfQuestionHasGivenValidation,
  getGivenValidationFromValidationArray,
  getQuestionOfGivenOrder,
  getValidations,
  checkIfQuestionIsAFlagQuestion,
  makeQuestionEditable,
  getQuestionsListAfterUpdatingAnswerOptionOfGivenQuestion,
  getTitleProps,
  isRequired,
  checkIfQuestionOrderIsAvailableInRestriction,
  getRestrictionOfGivenType,
  getQuestionWithGivenOrderFromQuestionList,
  checkQuestionVisibilityAccordingToParentCollapsableHeader,
  getDynamicKeys,
  getEmptyRequiredQuestions,
};
