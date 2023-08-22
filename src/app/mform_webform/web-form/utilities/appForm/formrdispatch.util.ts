import {
  setAnswerOptionsInQuestionsWithDynamicOptions,
  setInitialQuestions,
  updatedNestedQuestionList,
  updateQuestionList,
} from "./form.util";
import {
  CAPTURE_GPS,
  FOCUS_QUESTION,
  SET_FORM_DATA,
  SET_INITIAL_STATE,
  SET_LAST_UPDATED_QUESTION_INDEX,
  SET_UNIT_VALUE,
  SET_VILLAGE_WISE_LIMITS,
  TOGGLE_FORM_VIEW,
  UPDATE_QUESTION_BY_CHILD_CHECK,
  UPDATE_QUESTION_BY_VALUE,
  SET_DYNAMIC_OPTIONS,
  SET_QUESTIONS_VALUE_FROM_PREFILLED_ANSWERS,
  MAKE_FORM_QUESTIONS_DISABLED,
  SET_FORM_DATA_FROM_PREVIOUSLY_FILLED_FORM,
  TOGGLE_ANSWER_LIST,
  SET_ANSWER_OPTIONS_OF_QUESTION,
  MARK_FORM_AS_SUBMITTED,
  MAKE_SURVEY_FLAG_QUESTIONS_EDITABLE,
  SET_TRANSACTION_ID,
} from "./reducers/constants";
import { List, Map } from "immutable";
//   import {
//     makeFormQuestionsEditable,
//     makeQuestionsDisabled,
//     setValueInQuestionFromPrefilledAnswers,
//   } from "../utils/formUtils/setQuestionsValueFromPrefilledAnswers";
import { getQuestionsListAfterUpdatingAnswerOptionOfGivenQuestion } from "./question.util";
//   import { updateQuestionsFromSurveyFlagQuestions } from "../utils/formUtils/updateQuestionsFromSurveyFlagQuestions";

let initialFormState = {};

function scrollToElement(id: any) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
}

function dispatchForm(state: any, action: any) {
  let questions = state.questions;
  console.log("states", questions, action);
  switch (action.type) {
    case SET_LAST_UPDATED_QUESTION_INDEX:
      state = { ...state, lastQuestion: action.payload.lastQuestion };
      break;
    case FOCUS_QUESTION:
      let elementId = `question-${action.payload.order}`;
      scrollToElement(elementId);
      return state;
    case CAPTURE_GPS:
      state = state.set("questions", action.payload);
      return state;
    case SET_VILLAGE_WISE_LIMITS:
      state = state.set("villageWise", action.payload);
      return state;
    case SET_FORM_DATA:
      let dateNow: any = Date.now();
      localStorage.setItem("survey_start", dateNow);
      state = state.merge(
        Map({
          questions: setInitialQuestions(action.payload.questions),
          title: action.payload.title,
          formId: action.payload.formId,
          _id: action.payload._id,
          survey_start: Date.now(),
          showAnswerList: true,
        })
      );
      return state;
    case TOGGLE_FORM_VIEW:
      if (action.payload === "row") {
        return {
          ...state,
          view: "column",
        };
      } else {
        return {
          ...state,
          view: "row",
        };
      }
    case TOGGLE_ANSWER_LIST:
      return state.set("showAnswerList", !state.get("showAnswerList"));
    case SET_INITIAL_STATE:
      initialFormState = action.payload;
      return { ...initialFormState };
    case UPDATE_QUESTION_BY_VALUE:
      state = state.set("questions", action.payload);
      return state;
    case SET_UNIT_VALUE:
    case UPDATE_QUESTION_BY_CHILD_CHECK:
      const question = action.payload;
      if (
        action.nestedConfig &&
        action.nestedConfig.hasOwnProperty("parentOrder")
      )
        questions = updatedNestedQuestionList(
          question,
          questions,
          action.nestedConfig
        );
      else questions = updateQuestionList(question, questions);

      state = { ...state, questions: questions };
      console.log("questions", questions, state);
      return state;
    case SET_DYNAMIC_OPTIONS:
      questions = setAnswerOptionsInQuestionsWithDynamicOptions(
        questions,
        action.payload.dynamicOptionsArr
      );
      state = state.set("questions", questions);
      return state;
    //   case SET_QUESTIONS_VALUE_FROM_PREFILLED_ANSWERS:
    //     const prefilledAnswers = action.payload.prefilledAnswers;
    //     setValueInQuestionFromPrefilledAnswers(
    //       questions,
    //       prefilledAnswers,
    //       action.payload.dispatch
    //     );
    //     return state;
    //   case MAKE_FORM_QUESTIONS_DISABLED:
    //     const editableFormQuestions = action.payload.editableFormQuestions;
    //     const disabledQuestions = makeQuestionsDisabled(questions);
    //     const enabledQuestions = makeFormQuestionsEditable(
    //       disabledQuestions,
    //       editableFormQuestions
    //     );
    //     state = state.set("questions", enabledQuestions);
    //     return state;
    case SET_FORM_DATA_FROM_PREVIOUSLY_FILLED_FORM:
      state = state.merge(
        Map({
          questions: setInitialQuestions(action.payload.questions, false),
          title: action.payload.title,
          formId: action.payload.formId,
          _id: action.payload._id,
          survey_start: Date.now(),
        })
      );
      return state;
    case SET_ANSWER_OPTIONS_OF_QUESTION:
      state = state.set(
        "questions",
        getQuestionsListAfterUpdatingAnswerOptionOfGivenQuestion(
          questions,
          action.payload.questionOrder,
          action.payload.answer_option
        )
      );
      return state;
    case MARK_FORM_AS_SUBMITTED:
      state = state.set("isSubmitted", true);
      return state;
    //   case MAKE_SURVEY_FLAG_QUESTIONS_EDITABLE:
    //     state = state.set(
    //       "questions",
    //       updateQuestionsFromSurveyFlagQuestions({
    //         surveyFlagNestedQuestionConfigs:
    //           action?.payload?.surveyFlagNestedQuestionConfigs,
    //         surveyFlagQuestions: action?.payload?.surveyFlagQuestions,
    //         questions,
    //       })
    //     );
    //     return state;
    case SET_TRANSACTION_ID:
      state = state.set("transactionId", action?.payload?.transactionId);
      return state;
    default:
      break;
  }
  return state;
}

export { dispatchForm };
