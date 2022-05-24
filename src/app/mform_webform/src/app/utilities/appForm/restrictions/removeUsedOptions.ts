// import deepEqual from "deep-equal";
import { UPDATE_QUESTION_BY_CHILD_CHECK } from "../../reducers/constants";
import { computeNewValueForMultiSelectQuestion } from "../form.util";
import { checkIfQuestionOrderIsAvailableInRestriction } from "../question.util";

const deepEqual = require("deep-equal");

const applyRemoveUsedOptionsRestrictionFactoryFunction = () => {
  const questionInitialAnswerOptions: any = {};

  const checkIfAnswerOptionIdExistInQuestionAnswerOptions = (
    answerOptionId: any,
    answerOptions: any
  ) =>
    !!answerOptions.find(
      (answerOption: any) => answerOption?._id === answerOptionId
    );

  const getQuestionAnswerOption = (questionOrder: any, answerOptionId: any) =>
    questionInitialAnswerOptions?.[questionOrder]?.find(
      (initialAnswerOption: any) => initialAnswerOption?._id === answerOptionId
    );

  return (
    parentQuestion: any,
    parentQuestionValue: any,
    dispatchForm: any,
    questionToUpdate: any,
    nestedConfig: any,
    restrictionType: any
  ) => {
    if (
      !checkIfQuestionOrderIsAvailableInRestriction(
        parentQuestion?.order,
        questionToUpdate?.restrictions,
        restrictionType
      )
    ) {
      return;
    }
    if (!questionInitialAnswerOptions?.[questionToUpdate.order]) {
      questionInitialAnswerOptions[questionToUpdate.order] = [
        ...questionToUpdate?.answer_option,
      ];
    }

    //TODO make it pure function
    const addParentQuestionValueInQuestionToUpdateAnswerOptions = () => {
      if (parentQuestion?.value) {
        if (Array.isArray(parentQuestion?.value)) {
          parentQuestion.value.forEach((answerOptionId: any) =>
            questionToUpdate?.answer_option?.push(
              getQuestionAnswerOption(questionToUpdate?.order, answerOptionId)
            )
          );
        } else {
          questionToUpdate.answer_option.push(
            getQuestionAnswerOption(
              questionToUpdate?.order,
              parentQuestion?.value
            )
          );
        }
      }
    };

    //TODO make it pure function
    const removeParentQuestionValueFromQuestionToUpdateAnswerOptions = () => {
      if (Array.isArray(parentQuestion?.value) || parentQuestionValue?.target) {
        const newQuestionValue = computeNewValueForMultiSelectQuestion(
          parentQuestionValue,
          parentQuestion
        );
        newQuestionValue.forEach(
          (newVal) =>
            (questionToUpdate.answer_option =
              questionToUpdate?.answer_option?.filter(
                (option: any) => option?._id !== newVal
              ))
        );
      } else {
        questionToUpdate.answer_option =
          questionToUpdate?.answer_option?.filter(
            (option: any) => option?._id !== parentQuestionValue
          );
      }
    };

    //TODO make it pure function
    const removeParentQuestionValueFromQuestionToUpdateValue = () => {
      if (Array.isArray(questionToUpdate?.value)) {
        questionToUpdate.value = questionToUpdate?.value?.filter(
          (answerOptionId: any) =>
            checkIfAnswerOptionIdExistInQuestionAnswerOptions(
              answerOptionId,
              questionToUpdate?.answer_option
            )
        );
      } else if (deepEqual(parentQuestionValue, questionToUpdate?.value)) {
        questionToUpdate.value = "";
      }
    };

    //execute the functions in the same sequence
    addParentQuestionValueInQuestionToUpdateAnswerOptions();
    removeParentQuestionValueFromQuestionToUpdateAnswerOptions();
    removeParentQuestionValueFromQuestionToUpdateValue();

    questionToUpdate.answer_option.sort(
      (answerOptionOne: any, answerOptionTwo: any) =>
        parseInt(answerOptionOne?.viewSequence) -
        parseInt(answerOptionTwo?.viewSequence)
    );

    dispatchForm({
      type: UPDATE_QUESTION_BY_CHILD_CHECK,
      payload: {
        ...questionToUpdate,
      },
      nestedConfig,
    });
  };
};

const applyRemoveUsedOptionsRestriction =
  applyRemoveUsedOptionsRestrictionFactoryFunction();

export { applyRemoveUsedOptionsRestriction };
