import { RESTRICTION } from "../constants";
import {
  checkIfQuestionOrderIsAvailableInRestriction,
  getRestrictionOfGivenType,
  getQuestionWithGivenOrderFromQuestionList,
} from "../question.util";
// import api from "../../config/api";
import { UPDATE_QUESTION_BY_CHILD_CHECK } from "../../reducers/constants";

const CALCULATE_WEIGHT_FOR_AGE_RESTRICTION_VALUES = {
  AGE: "AGE",
  WEIGHT: "WEIGHT",
  GENDER: "GENDER",
};

let weightForAgeTable: any = "";

const getQuestionOrderFromRestriction = (
  restriction: any,
  restrictionValue: any
) =>
  restriction?.orders?.find(
    (restrictionOrder: any) => restrictionOrder?.value === restrictionValue
  )?.order;

const getValueOfQuestionOfGivenOrder = ({
  parentQuestion,
  parentQuestionValue,
  questions,
  questionOrder,
}: any) =>
  parentQuestion?.order === questionOrder
    ? parentQuestionValue
    : getQuestionWithGivenOrderFromQuestionList(questionOrder, questions)
        ?.value;

const getMedian = ({ gender, age }: any) =>
  weightForAgeTable.find(
    (weightForAge: any) => weightForAge?.f1 == gender && weightForAge?.f2 == age
  )?.f3;

const getPhysique = (weightForAge: any) => {
  if (weightForAge > 80) {
    return 1;
  }
  if (weightForAge > 70) {
    return 2;
  }
  if (weightForAge > 60) {
    return 3;
  }
  if (weightForAge > 50) {
    return 4;
  }
  return 5;
};

const applyCalculateWeightForAgeRestriction = async ({
  parentQuestion,
  parentQuestionValue,
  dispatchForm,
  questionToUpdate,
  nestedConfig,
  questions,
}: any) => {
  if (
    !checkIfQuestionOrderIsAvailableInRestriction(
      parentQuestion?.order,
      questionToUpdate?.restrictions,
      RESTRICTION.CALCULATE_WEIGHT_FOR_AGE
    )
  ) {
    return;
  }
  const calculateWeightForAgeRestriction = getRestrictionOfGivenType(
    questionToUpdate?.restrictions,
    RESTRICTION.CALCULATE_WEIGHT_FOR_AGE
  );
  const ageQuestionOrder = getQuestionOrderFromRestriction(
    calculateWeightForAgeRestriction,
    CALCULATE_WEIGHT_FOR_AGE_RESTRICTION_VALUES.AGE
  );
  const weightQuestionOrder = getQuestionOrderFromRestriction(
    calculateWeightForAgeRestriction,
    CALCULATE_WEIGHT_FOR_AGE_RESTRICTION_VALUES.WEIGHT
  );
  const genderQuestionOrder = getQuestionOrderFromRestriction(
    calculateWeightForAgeRestriction,
    CALCULATE_WEIGHT_FOR_AGE_RESTRICTION_VALUES.GENDER
  );
  if (!weightForAgeTable) {
    // const weightForAgeTableResponse = await api.get("/reference-data");
    // weightForAgeTable = weightForAgeTableResponse.data.data;
  }
  const ageQuestionValue = getValueOfQuestionOfGivenOrder({
    parentQuestion,
    parentQuestionValue,
    questionOrder: ageQuestionOrder,
    questions,
  });

  const weightQuestionValue = getValueOfQuestionOfGivenOrder({
    parentQuestion,
    parentQuestionValue,
    questionOrder: weightQuestionOrder,
    questions,
  });
  const genderQuestionValue = getValueOfQuestionOfGivenOrder({
    parentQuestion,
    parentQuestionValue,
    questionOrder: genderQuestionOrder,
    questions,
  });
  const median = getMedian({
    gender: genderQuestionValue,
    age: ageQuestionValue,
  });
  if (!median) {
    return;
  }
  const weightForAge = (weightQuestionValue * 100) / median;
  const physique = getPhysique(weightForAge);
  dispatchForm({
    type: UPDATE_QUESTION_BY_CHILD_CHECK,
    payload: { ...questionToUpdate, value: `${physique}` },
    nestedConfig,
  });
};

export { applyCalculateWeightForAgeRestriction };
