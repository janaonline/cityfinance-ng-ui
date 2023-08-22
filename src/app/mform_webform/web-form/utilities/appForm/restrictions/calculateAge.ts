import {
  compareAsc,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  startOfDay,
} from "date-fns";
import { UPDATE_QUESTION_BY_CHILD_CHECK } from "../../reducers/constants";
import { RESTRICTION } from "../constants";
import { checkIfQuestionOrderIsAvailableInRestriction } from "../question.util";

const applyCalculateAgeRestriction = (
  parentQuestion: any,
  parentQuestionValue: any,
  dispatchForm: any,
  questionToUpdate: any,
  nestedConfig: any,
  restrictionType: any
) => {
  if (
    !checkIfQuestionOrderIsAvailableInRestriction(
      parentQuestion.order,
      questionToUpdate.restrictions,
      restrictionType
    )
  ) {
    return;
  }
  let newQuestionValue: any = "",
    todayDate = startOfDay(new Date()),
    dateOfBirth = startOfDay(new Date(parentQuestionValue));

  if (restrictionType === RESTRICTION.CALCULATE_AGE) {
    newQuestionValue = differenceInYears(todayDate, dateOfBirth);
  }
  if (restrictionType === RESTRICTION.CALCULATE_AGE_IN_MONTHS) {
    newQuestionValue = differenceInMonths(todayDate, dateOfBirth);
  }
  if (restrictionType === RESTRICTION.CALCULATE_AGE_IN_DAYS) {
    newQuestionValue = differenceInDays(todayDate, dateOfBirth);
  }

  if (restrictionType === RESTRICTION.CALCULATE_AGE_SPLIT_MONTH) {
    newQuestionValue = calculateNumberOfMonthsLeftInBirthDay(dateOfBirth);
  }
  if (restrictionType === RESTRICTION.CALCULATE_AGE_SPLIT_DAYS) {
    newQuestionValue = calculateNumberOfDaysLeftInBirthDay(dateOfBirth);
  }

  dispatchForm({
    type: UPDATE_QUESTION_BY_CHILD_CHECK,
    payload: {
      ...questionToUpdate,
      value: newQuestionValue,
    },
    nestedConfig,
  });
};

const calculateNumberOfMonthsLeftInBirthDay = (dateOfBirth: any) => {
  const todayDate = startOfDay(new Date());
  let nextBirthDay = getNextBirthDay(dateOfBirth);
  return differenceInMonths(nextBirthDay, todayDate);
};

const calculateNumberOfDaysLeftInBirthDay = (dateOfBirth: any) => {
  const todayDate = startOfDay(new Date());
  let nextBirthDay = getNextBirthDay(dateOfBirth);
  return differenceInDays(nextBirthDay, todayDate);
};

const getNextBirthDay = (dateOfBirth: any) => {
  let birthDayInCurrentYear = dateOfBirth.setFullYear(new Date().getFullYear());
  if (checkIfBirthDayInCurrentYearLessThanTodaysDate(birthDayInCurrentYear)) {
    return dateOfBirth.setFullYear(new Date().getFullYear() + 1);
  }
  return birthDayInCurrentYear;
};

const checkIfBirthDayInCurrentYearLessThanTodaysDate = (
  birthDayInCurrentYear: any
) => compareAsc(startOfDay(new Date()), birthDayInCurrentYear) === 1;

export { applyCalculateAgeRestriction };
