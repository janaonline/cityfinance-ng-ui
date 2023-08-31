import { RESTRICTION, QUESTION_TYPE } from "../constants";
import {
  checkIfQuestionOrderIsAvailableInRestriction,
  getQuestionOfGivenOrder,
} from "../question.util";
import * as _ from "lodash";
import { UPDATE_QUESTION_BY_CHILD_CHECK } from "../../reducers/constants";

const checkIfQuestionValueIsInAnswerOptions = ({
  questionValue,
  answerOptions,
}: any) => {
  const enabledAnswerOptionIds = answerOptions
    ?.filter((option: any) => !option?.disabled)
    ?.map((option: any) => option?._id);
  if (Array.isArray(questionValue)) {
    return (
      _.difference(
        questionValue,
        _.intersection(questionValue, enabledAnswerOptionIds)
      )?.length === 0
    );
  }
  return answerOptions?.some?.((option: any) => option?._id == questionValue);
};

const filterQuestionValueIfPresentInAnswerOptions = ({
  questionValues,
  answerOptions,
}: any) => {
  const enabledAnswerOptionIds = answerOptions
    ?.filter((option: any) => !option.disabled)
    ?.map((option: any) => option._id);
  return questionValues.filter((value: any) =>
    enabledAnswerOptionIds.includes(value)
  );
};

const getUpdatedQuestionValue = ({ questionValue, answerOptions }: any) => {
  let updatedValue = questionValue;
  if (
    !checkIfQuestionValueIsInAnswerOptions({
      questionValue,
      answerOptions: answerOptions,
    })
  ) {
    if (Array.isArray(questionValue)) {
      updatedValue = filterQuestionValueIfPresentInAnswerOptions({
        questionValues: questionValue,
        answerOptions: answerOptions,
      });
    } else {
      updatedValue = "";
    }
  }
  return updatedValue;
};

const applyDidRestriction = ({
  parentQuestion,
  dispatchForm,
  questionToUpdate,
  nestedConfig,
  questions,
}: any) => {
  console.log('applyDidRestrictionCalled parentQuestion', parentQuestion)
  console.log('applyDidRestrictionCalled dispatchForm', dispatchForm)
  console.log('applyDidRestrictionCalled questionToUpdate', questionToUpdate)
  console.log('applyDidRestrictionCalled nestedConfig', nestedConfig)
  console.log('applyDidRestrictionCalled questions', questions)
  console.log('checkIfQuestionOrderIsAvailableInRestriction', checkIfQuestionOrderIsAvailableInRestriction(
    parentQuestion?.order,
    questionToUpdate?.restrictions,
    RESTRICTION.DID
  ))
  if (
    !checkIfQuestionOrderIsAvailableInRestriction(
      parentQuestion?.order,
      questionToUpdate?.restrictions,
      RESTRICTION.DID
    )
  ) {
    return;
  }
  const updatedAnswerOptions = questionToUpdate?.answer_option?.map?.(
    (option: any) => {
      if (option?.["did"]?.length) {
        option.visibility = option?.["did"]?.every?.((did: any) => {
          const didParent =
            !("parentOrder" in did) || did.parentOrder == parentQuestion?.order
              ? parentQuestion
              : getQuestionOfGivenOrder(questions, did?.parentOrder);
          if (Array.isArray(didParent?.value)) {
            return didParent?.value?.some?.((value: any) =>
              new RegExp(did?.parent_option).test(value)
            );
          }
          return new RegExp(did?.parent_option).test(didParent?.value);
        });
        option.disabled = !option?.visibility;
        option.checked = option.visibility ? option.disabled : option.visibility;
        // let findValueArrayIndex = questionToUpdate?.value.findIndex(valueId => (valueId == option._id) && (option.visibility == false));
        // console.log('findValueArrayIndex', findValueArrayIndex);
        let findSelectedValueIndex = questionToUpdate?.selectedValue.findIndex((selectedValue: any) => (selectedValue?.value == option._id) && (option.visibility == false));
        if ((questionToUpdate.input_type == QUESTION_TYPE.SINGLE_SELECT)) {
            console.log('if called')
            if ((questionToUpdate?.value.includes(option._id)) && (option.visibility == false)) {
              questionToUpdate['value'] = '';
              questionToUpdate['modelValue'] = '';
              questionToUpdate['selectedValue'] = [];
            } else if (parentQuestion?.isSelectValue) {
              /**
               * this is using to disabled the child question value on parent question selection
               */
              questionToUpdate['value'] = '';
              questionToUpdate['modelValue'] = '';
              questionToUpdate['selectedValue'] = [];
            }
        } else {
          let findValueArrayIndex = questionToUpdate?.value.findIndex((valueId: any) => (valueId == option._id) && (option.visibility == false));
          console.log('findValueArrayIndex', findValueArrayIndex);
          if (findValueArrayIndex > -1) {
            questionToUpdate?.value.splice(findValueArrayIndex, 1);
          }
        }
        console.log('findSelectedValueIndex', findSelectedValueIndex);
        if (findSelectedValueIndex > -1) {
          questionToUpdate?.selectedValue.splice(findSelectedValueIndex, 1);
        }
      }
      console.log('questionToUpdate', questionToUpdate)
      return option;
    }
  );

  let questionValue = getUpdatedQuestionValue({
    questionValue: questionToUpdate?.value,
    answerOptions: updatedAnswerOptions,
  });
  dispatchForm({
    type: UPDATE_QUESTION_BY_CHILD_CHECK,
    payload: {
      ...questionToUpdate,
      value: questionValue,
      answer_option: updatedAnswerOptions,
    },
    nestedConfig,
  });
};

export { applyDidRestriction };
