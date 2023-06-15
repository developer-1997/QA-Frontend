import questions from "store/questions/reducer"
import {
  GET_QUESTIONS,
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTION_DETAIL,
  ADD_NEW_QUESTION,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAIL,
  UPDATE_QUESTION,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
  GET_QUESTION_DETAIL_FAIL,
  GET_QUESTION_DETAIL_SUCCESS,
  UPDATE_QUESTION_LOADING_STATE,
} from "./actionTypes"

export const getQuestions = (type, chapterId) => ({
  type: GET_QUESTIONS,
  payload: { type, chapterId },
})

export const getQuestionsSuccess = questions => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: questions,
})

export const addNewQuestion = (
  question,
  history,
  testId,
  type,
  courseId,
  chapterId
) => ({
  type: ADD_NEW_QUESTION,
  payload: { question, history, testId, type, courseId, chapterId },
})

export const addQuestionSuccess = question => ({
  type: ADD_QUESTION_SUCCESS,
  payload: question,
})

export const addQuestionFail = error => ({
  type: ADD_QUESTION_FAIL,
  payload: error,
})

export const updateQuestion = (question, questionId, history, type) => ({
  type: UPDATE_QUESTION,
  payload: { question, questionId, history, type },
})

export const updateQuestionSuccess = question => ({
  type: UPDATE_QUESTION_SUCCESS,
  payload: question,
})

export const updateQuestionFail = error => ({
  type: UPDATE_QUESTION_FAIL,
  payload: error,
})

export const deleteQuestion = questionId => ({
  type: DELETE_QUESTION,
  payload: questionId,
})

export const deleteQuestionSuccess = question => ({
  type: DELETE_QUESTION_SUCCESS,
  payload: question,
})

export const deleteQuestionFail = error => ({
  type: DELETE_QUESTION_FAIL,
  payload: error,
})

export const getQuestionsFail = error => ({
  type: GET_QUESTIONS_FAIL,
  payload: error,
})

export const getQuestionDetail = questionId => ({
  type: GET_QUESTION_DETAIL,
  questionId,
})

export const getQuestionDetailSuccess = questionDetails => ({
  type: GET_QUESTION_DETAIL_SUCCESS,
  payload: questionDetails,
})

export const getQuestionDetailFail = error => ({
  type: GET_QUESTION_DETAIL_FAIL,
  payload: error,
})

export const updateQuestionLoadingState = status => ({
  type: UPDATE_QUESTION_LOADING_STATE,
  payload: status,
})
