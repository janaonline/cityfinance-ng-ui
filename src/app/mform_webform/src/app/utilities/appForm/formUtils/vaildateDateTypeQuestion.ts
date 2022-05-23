import {
  sub,
  compareAsc,
  endOfWeek,
  add,
  endOfMonth,
  startOfMonth,
  endOfYear,
  startOfYear,
  startOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";
import { Map } from "immutable";
import { VALIDATION } from "../constants";
import { checkIfQuestionHasGivenValidation } from "../question.util";

const TIME_PERIODS = {
  WEEK: "weeks",
  YEAR: "years",
  MONTH: "months",
  DAY: "days",
};

const START_AND_END_OF_TIME_PERIOD_FUNCTIONS = {
  [TIME_PERIODS.WEEK]: {
    start: startOfWeek,
    end: endOfWeek,
  },
  [TIME_PERIODS.YEAR]: {
    start: startOfYear,
    end: endOfYear,
  },
  [TIME_PERIODS.MONTH]: {
    start: startOfMonth,
    end: endOfMonth,
  },
  [TIME_PERIODS.DAY]: {
    start: startOfDay,
    end: endOfDay,
  },
};

const COMPARISON_TYPE = {
  PAST: "past",
  FUTURE: "future",
};

const subtractTimePeriodFromTodaysDate = (
  timePeriodType: any,
  timePeriodValue: any
) => {
  return START_AND_END_OF_TIME_PERIOD_FUNCTIONS[timePeriodType].start(
    sub(
      START_AND_END_OF_TIME_PERIOD_FUNCTIONS[timePeriodType].start(new Date()),
      {
        [timePeriodType]: timePeriodValue,
      }
    )
  );
};

const addTimePeriodFromTodaysDate = (
  timePeriodType: any,
  timePeriodValue: any
) => {
  return START_AND_END_OF_TIME_PERIOD_FUNCTIONS[timePeriodType].end(
    add(
      START_AND_END_OF_TIME_PERIOD_FUNCTIONS[timePeriodType].end(new Date()),
      {
        [timePeriodType]: timePeriodValue,
      }
    )
  );
};

const getCurrentFinancialYear = () => {
  const todaysDate = new Date();
  let startOfFinancialYear = startOfDay(
      new Date(todaysDate.getFullYear(), 3, 1)
    ),
    endOfFinancialYear = endOfDay(new Date(todaysDate.getFullYear(), 2, 31));

  startOfFinancialYear =
    compareAsc(startOfFinancialYear, todaysDate) === -1
      ? startOfFinancialYear
      : sub(startOfFinancialYear, { years: 1 });
  endOfFinancialYear =
    compareAsc(endOfFinancialYear, todaysDate) === 1
      ? endOfFinancialYear
      : add(endOfFinancialYear, { years: 1 });

  return { startOfFinancialYear, endOfFinancialYear };
};

const getFinancialYearDates = (validation: any, compType: any) => {
  let { endOfFinancialYear, startOfFinancialYear } = getCurrentFinancialYear();

  if (compType === COMPARISON_TYPE.PAST) {
    return sub(startOfFinancialYear, {
      years: validation.value,
    });
  } else {
    return add(endOfFinancialYear, { years: validation.value });
  }
};

const validateDateTypeQuestion = (question: any, newQuestionValue: any) => {
  if (!Map.isMap(question)) {
    question = Map(question);
  }
  let errors: any = [],
    pastDate: any = "",
    futureDate: any = "",
    presentDate: any = false,
    maxDate = new Date(8640000000000000),
    minDate = new Date(-8640000000000000);
  const submittedDate = new Date(newQuestionValue).setHours(0, 0, 0, 0);
  const currentDate = new Date();
  if (checkIfQuestionHasGivenValidation(question, VALIDATION.TODAY_DATE)) {
    return errors;
  }
  question.get("validation").forEach((validation: any) => {
    switch (validation._id) {
      case VALIDATION.PAST_NO_OF_DAYS:
        pastDate = subtractTimePeriodFromTodaysDate(
          TIME_PERIODS.DAY,
          validation.value
        );
        break;
      case VALIDATION.PAST_NO_OF_WEEK:
        pastDate = subtractTimePeriodFromTodaysDate(
          TIME_PERIODS.WEEK,
          validation.value
        );
        break;
      case VALIDATION.PAST_NO_OF_MONTH:
        pastDate = subtractTimePeriodFromTodaysDate(
          TIME_PERIODS.MONTH,
          validation.value
        );
        break;
      case VALIDATION.PAST_NO_OF_YEAR:
        pastDate = subtractTimePeriodFromTodaysDate(
          TIME_PERIODS.YEAR,
          validation.value
        );
        break;
      case VALIDATION.PAST_NO_OF_FINANCIAL_YEAR:
        pastDate = getFinancialYearDates(validation, COMPARISON_TYPE.PAST);
        break;
      case VALIDATION.PAST_DATE:
        pastDate = minDate;
        break;
      case VALIDATION.PAST_PRESENT_DATE:
        pastDate = minDate;
        presentDate = true;
        break;
      case VALIDATION.PAST_FIX_DATE:
        pastDate = startOfDay(
          new Date(validation.value.split("-").reverse().join("-"))
        );
        break;
      case VALIDATION.FUTURE_NO_OF_DAYS:
        futureDate = addTimePeriodFromTodaysDate(
          TIME_PERIODS.DAY,
          validation.value
        );
        break;
      case VALIDATION.FUTURE_NO_OF_WEEK:
        futureDate = addTimePeriodFromTodaysDate(
          TIME_PERIODS.WEEK,
          validation.value
        );
        break;
      case VALIDATION.FUTURE_NO_OF_MONTH:
        futureDate = addTimePeriodFromTodaysDate(
          TIME_PERIODS.MONTH,
          validation.value
        );
        break;
      case VALIDATION.FUTURE_NO_OF_YEAR:
        futureDate = addTimePeriodFromTodaysDate(
          TIME_PERIODS.YEAR,
          validation.value
        );
        break;
      case VALIDATION.FUTURE_NO_OF_FINANCIAL_YEAR:
        futureDate = getFinancialYearDates(validation, COMPARISON_TYPE.FUTURE);
        break;
      case VALIDATION.REQUIRED:
        break;
      // default:
      case VALIDATION.FUTURE_DATE:
        futureDate = maxDate;
        break;
      case VALIDATION.FUTURE_PRESENT_DATE:
        futureDate = maxDate;
        presentDate = true;
        break;
      case VALIDATION.FUTURE_FIX_DATE:
        futureDate = endOfDay(
          new Date(validation.value.split("-").reverse().join("-"))
        );
        break;
      default:
        break;
    }
  });
  const submittedDateCurrentDateComp = compareAsc(
    startOfDay(submittedDate),
    startOfDay(currentDate)
  );
  if (pastDate && futureDate) {
    if (
      compareAsc(startOfDay(submittedDate), pastDate) === -1 ||
      compareAsc(endOfDay(submittedDate), futureDate) === 1 ||
      (!presentDate && submittedDateCurrentDateComp === 0)
    ) {
      errors.push(new Error("Invalid Date"));
    }
  } else if (pastDate) {
    if (
      compareAsc(startOfDay(submittedDate), pastDate) === -1 ||
      (presentDate
        ? submittedDateCurrentDateComp === 1
        : submittedDateCurrentDateComp !== -1)
    ) {
      errors.push(new Error("Invalid Date"));
    }
  } else if (futureDate) {
    if (
      compareAsc(endOfDay(submittedDate), futureDate) === 1 ||
      (presentDate
        ? submittedDateCurrentDateComp === -1
        : submittedDateCurrentDateComp !== 1)
    ) {
      errors.push(new Error("Invalid Date"));
    }
  }

  return errors;
};

export { validateDateTypeQuestion };
