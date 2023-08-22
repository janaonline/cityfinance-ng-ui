import { UPDATE_QUESTION_BY_CHILD_CHECK } from "../../reducers/constants";
import { RESTRICTION } from "../constants";
import {
  getQuestionWithGivenOrderFromQuestionList,
  checkIfQuestionOrderIsAvailableInRestriction,
  getQuestionOfGivenOrder,
} from "../question.util";
import { applyCalculateAgeRestriction } from "./calculateAge";
import { applyCalculateWeightForAgeRestriction } from "./calculateWeightForAge";
import { applyDidRestriction } from "./did";
import { applyRemoveUsedOptionsRestriction } from "./removeUsedOptions";

const chnageTitleOfQuetsionsWithGivenOrder = ({
  dispatchForm,
  newTitle,
  questionOrders,
  questions,
  nestedConfig,
}: any) => {
  questionOrders.forEach((questionOrder: any) => {
    const questionToUpdate = getQuestionWithGivenOrderFromQuestionList(
      questionOrder?.order,
      questions
    );
    dispatchForm({
      type: UPDATE_QUESTION_BY_CHILD_CHECK,
      payload: { ...questionToUpdate, title: newTitle },
      nestedConfig,
    });
  });
};

const applyClearDidChildRestriction = ({
  dispatchForm,
  question,
  questions,
  nestedConfig,
}: any) => {
  questions.forEach((questionToUpdate: any) => {
    if (
      checkIfQuestionOrderIsAvailableInRestriction(
        questionToUpdate?.order,
        question?.restrictions,
        RESTRICTION.CLEAR_DID_CHILD
      )
    ) {
      dispatchForm({
        type: UPDATE_QUESTION_BY_CHILD_CHECK,
        payload: { ...questionToUpdate, value: "" },
        nestedConfig,
      });
    }

    if (questionToUpdate?.childQuestionData) {
      questionToUpdate.childQuestionData.forEach(
        (childQuestions: any, childQuestionsIndex: any) => {
          childQuestions?.size &&
            childQuestions.forEach(
              (childQuestion: any, childQuestionIndex: any) => {
                if (
                  checkIfQuestionOrderIsAvailableInRestriction(
                    childQuestion?.order,
                    question?.restrictions,
                    RESTRICTION.CLEAR_DID_CHILD
                  )
                ) {
                  dispatchForm({
                    type: UPDATE_QUESTION_BY_CHILD_CHECK,
                    payload: { ...childQuestion, value: "" },
                    nestedConfig: {
                      parentOrder: questionToUpdate?.order,
                      index: childQuestionIndex,
                      loopIndex: childQuestionsIndex,
                    },
                  });
                }
              }
            );
        }
      );
    }
  });
};

const applyRestrictionWhichChangeOtherQuestion = ({
  dispatchForm,
  question,
  questionValue,
  questions,
  nestedConfig,
}: any) => {
  question.restrictions.forEach((restriction: any) => {
    switch (restriction?.type) {
      case RESTRICTION.CHANGE_TITLE:
        chnageTitleOfQuetsionsWithGivenOrder({
          dispatchForm,
          newTitle: questionValue,
          questionOrders: restriction.orders,
          questions,
          nestedConfig,
        });
        break;
      case RESTRICTION.CLEAR_DID_CHILD:
        applyClearDidChildRestriction({
          dispatchForm,
          question,
          questions,
          nestedConfig,
        });
        break;
      default:
        return;
    }
  });
};

const applyRestrictionWhichDependOnValueOfOtherQuestion = ({
  dispatchForm,
  question,
  questionValue,
  questions,
  nestedConfig,
  updatedQuestion,
}: any) => {
  if (
    ["loopIndex", "index", "parentOrder"].every((configProp) =>
      nestedConfig?.hasOwnProperty(configProp)
    )
  ) {
    questions =
      getQuestionOfGivenOrder(
        questions,
        nestedConfig?.parentOrder
      )?.childQuestionData?.get?.(nestedConfig?.loopIndex) || questions;
  }
  questions.forEach((questionToUpdate: any, index: any) => {
    questionToUpdate.restrictions.forEach((restriction: any) => {
      switch (restriction.type) {
        case RESTRICTION.CALCULATE_AGE:
        case RESTRICTION.CALCULATE_AGE_SPLIT_DAYS:
        case RESTRICTION.CALCULATE_AGE_SPLIT_MONTH:
        case RESTRICTION.CALCULATE_AGE_IN_DAYS:
        case RESTRICTION.CALCULATE_AGE_IN_MONTHS:
          applyCalculateAgeRestriction(
            question,
            questionValue,
            dispatchForm,
            questionToUpdate,
            nestedConfig,
            restriction.type
          );
          break;
        case RESTRICTION.REMOVE_USED_OPTIONS:
          applyRemoveUsedOptionsRestriction(
            question,
            questionValue,
            dispatchForm,
            questionToUpdate,
            nestedConfig,
            restriction.type
          );
          break;
        case RESTRICTION.CALCULATE_WEIGHT_FOR_AGE:
          applyCalculateWeightForAgeRestriction({
            parentQuestion: question,
            parentQuestionValue: questionValue,
            dispatchForm,
            questionToUpdate,
            nestedConfig,
            questions,
          });
          break;
        case RESTRICTION.DID:
          applyDidRestriction({
            dispatchForm,
            nestedConfig: nestedConfig ? { ...nestedConfig, index } : undefined,
            parentQuestion: updatedQuestion,
            questionToUpdate,
            questions,
          });
          break;
        default:
          return;
      }
    });
  });
};

const applyRestrictions = ({
  dispatchForm,
  question,
  questionValue,
  questions,
  nestedConfig,
  updatedQuestion,
}: any) => {
  applyRestrictionWhichChangeOtherQuestion({
    dispatchForm,
    question,
    questionValue,
    questions,
    nestedConfig,
  });
  applyRestrictionWhichDependOnValueOfOtherQuestion({
    dispatchForm,
    question,
    questionValue,
    questions,
    nestedConfig,
    updatedQuestion,
  });
};

export { applyRestrictions };
