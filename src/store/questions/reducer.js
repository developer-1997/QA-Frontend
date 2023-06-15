import {
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTION_DETAIL_FAIL,
  GET_QUESTION_DETAIL_SUCCESS,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAIL,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
  UPDATE_QUESTION_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  questions: [],
  questionDetail: {},
  error: {},
  loading: false,
}

const questions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      }

    case UPDATE_QUESTION_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      }

    case ADD_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_QUESTION_DETAIL_SUCCESS:
      return {
        ...state,
        questionDetail: action.payload,
      }

    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.map(question =>
          question._id.toString() === action.payload._id.toString()
            ? { question, ...action.payload }
            : question
        ),
      }

    case UPDATE_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(
          question => question._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_QUESTION_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default questions
