import { UPDATE_QUESTION_BY_CHILD_CHECK } from "../../reducers/constants";
import { VALIDATION } from "../constants";
import { checkIfQuestionHasGivenValidation } from "../question.util";

const checkIfQuestionHasDynamicOptionsAndQuestionHasSmallestViewSequence = (
  questions: any,
  question: any
) => {
  if (!question?.dynamicOptions) {
    return false;
  }
  const dynamicOptionQuestions = questions
    ?.filter?.((question: any) => question?.dynamicOptions)
    ?.sort?.(
      (questionOne: any, questionTwo: any) =>
        parseInt(questionOne?.viewSequence) -
        parseInt(questionTwo?.viewSequence)
    );
  return dynamicOptionQuestions?.get?.(0)?.order === question?.order;
};

const getQuestionsWithDynamicOptionsFillCountValidation = (questions: any) =>
  questions?.filter((question: any) =>
    checkIfQuestionHasGivenValidation(
      question,
      VALIDATION.DYNAMIC_OPTION_FILL_COUNT
    )
  );

const getQuestionAnswerOptionWithGivenAnswerOptionId = (
  answerOptions: any,
  answerOptionId: any
) =>
  answerOptions?.find(
    (answerOption: any) => answerOption?._id === answerOptionId
  );

const dynamicOptionFillCount = ({
  dispatchForm,
  question,
  questionValue,
  questions,
  nestedConfig,
}: any) => {
  if (
    checkIfQuestionHasDynamicOptionsAndQuestionHasSmallestViewSequence(
      questions,
      question
    ) &&
    questionValue
  ) {
    const questionsWithDynamicOptionsFillCountValidation =
      getQuestionsWithDynamicOptionsFillCountValidation(questions);
    const selectedAnswerOption = getQuestionAnswerOptionWithGivenAnswerOptionId(
      question?.answer_option,
      questionValue
    );
    questionsWithDynamicOptionsFillCountValidation?.length &&
      questionsWithDynamicOptionsFillCountValidation.map(
        (questionWithDynamicOptionFillCountValidation: any) =>
          dispatchForm({
            type: UPDATE_QUESTION_BY_CHILD_CHECK,
            payload: {
              ...questionWithDynamicOptionFillCountValidation,
              value: selectedAnswerOption.filledCount + 1,
            },
            nestedConfig,
          })
      );
  }
};

export { dynamicOptionFillCount };
