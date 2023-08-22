const SET_INITIAL_STATE = 0x0001;
/**
 *
 * @constant {number}  Updates question answer value
 */
const UPDATE_QUESTION_BY_VALUE = 0x0002;

/**
 *
 * @constant {number} Updates question value as well as sets visibility of all the dependents question.
 *                        (Using only parent key )
 */
const UPDATE_QUESTION_BY_CHILD_CHECK = 0x0003;

const GET_FORM_QUESTIONS = 0x0004;

/**
 *
 * @constant {number} To fetch form Data for the first time
 */
const SET_FORM_DATA = 0x0005;

/**
 *
 * @constant {number} Captures gps coordinates
 */
const CAPTURE_GPS = 0x0006;

/**
 *
 * @constant {number} Scroll to  question from  element clicked from
 */
const FOCUS_QUESTION = 0x0007;

/**
 *
 * @constant {number} Set users data in local storage as well as  UserProvider Context
 */
const SET_USER = 0x0008;
/**
 *
 * @constant {number} Toggle Entire app theme
 */
const TOGGLE_THEME = 0x0009;
/**
 *
 * @constant {number} Toggle current form view i.e Horizontal or vertical
 */
const TOGGLE_FORM_VIEW = 0x0010;

/**
 *
 * @constant {number} Set the answer_option in select field with the help of dynamic options array
 */
const SET_DYNAMIC_OPTIONS = 0x0013;

/**
 *
 * @constant {number} Set the answer_option in select field with the help of dynamic options array
 */
const SET_QUESTIONS_VALUE_FROM_PREFILLED_ANSWERS = 0x0014;

/**
 *
 * @constant {number} Set question as disabled
 */
const MAKE_FORM_QUESTIONS_DISABLED = 0x0016;

/**
 *
 * @constant {number} Set the form data based on the form which has been previously filled
 */
const SET_FORM_DATA_FROM_PREVIOUSLY_FILLED_FORM = 0x0015;

const SET_LAST_UPDATED_QUESTION_INDEX = 0x0011;

const LOGOUT_USER = 0x0012;

const SET_UNIT_VALUE = "setUnitVal";

const SET_VILLAGE_WISE_LIMITS = "svwl";

const TOGGLE_ANSWER_LIST = "toggle answer list";

const SET_ANSWER_OPTIONS_OF_QUESTION = "set answer options of question";

const MARK_FORM_AS_SUBMITTED = "mark form as submitted";

const MAKE_SURVEY_FLAG_QUESTIONS_EDITABLE = "make question editable";

const SET_TRANSACTION_ID = "set transactionId";

export {
  SET_INITIAL_STATE,
  SET_USER,
  UPDATE_QUESTION_BY_VALUE,
  UPDATE_QUESTION_BY_CHILD_CHECK,
  SET_FORM_DATA,
  CAPTURE_GPS,
  FOCUS_QUESTION,
  TOGGLE_THEME,
  TOGGLE_FORM_VIEW,
  SET_LAST_UPDATED_QUESTION_INDEX,
  SET_VILLAGE_WISE_LIMITS,
  LOGOUT_USER,
  SET_UNIT_VALUE,
  SET_DYNAMIC_OPTIONS,
  SET_QUESTIONS_VALUE_FROM_PREFILLED_ANSWERS,
  MAKE_FORM_QUESTIONS_DISABLED,
  SET_FORM_DATA_FROM_PREVIOUSLY_FILLED_FORM,
  TOGGLE_ANSWER_LIST,
  SET_ANSWER_OPTIONS_OF_QUESTION,
  MARK_FORM_AS_SUBMITTED,
  MAKE_SURVEY_FLAG_QUESTIONS_EDITABLE,
  SET_TRANSACTION_ID
};
