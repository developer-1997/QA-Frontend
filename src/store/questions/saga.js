import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_QUESTIONS,
  GET_QUESTION_DETAIL,
  ADD_NEW_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "./actionTypes"

import {
  getQuestionsSuccess,
  getQuestionsFail,
  getQuestionDetailSuccess,
  getQuestionDetailFail,
  addQuestionFail,
  addQuestionSuccess,
  updateQuestionSuccess,
  updateQuestionFail,
  deleteQuestionSuccess,
  deleteQuestionFail,
  updateQuestionLoadingState,
} from "./actions"

import {
  getQuestions,
  getQuestionsDetails,
  addNewQuestion,
  updateQuestion,
  deleteQuestion,
} from "helpers/backend_helper"

function* fetchQuestions({ payload: { type, chapterId } }) {
  try {
    yield put(updateQuestionLoadingState(true))
    const response = yield call(getQuestions, type, chapterId)
    yield put(getQuestionsSuccess(response.data.data))
    yield put(updateQuestionLoadingState(false))
  } catch (error) {
    yield put(updateQuestionLoadingState(false))
    yield put(getQuestionsFail(error))
  }
}

function* fetchQuestionDetail({ questionId }) {
  try {
    const response = yield call(getQuestionsDetails, questionId)
    yield put(getQuestionDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getQuestionDetailFail(error))
  }
}

function* onUpdateQuestion({
  payload: { question, questionId, history, type },
}) {
  try {
    yield put(updateQuestionLoadingState(true))
    const response = yield call(updateQuestion, question, questionId)
    yield put(updateQuestionSuccess(response.data.data))
    toastr.success("Question updated successfully..!!")
    yield put(updateQuestionLoadingState(false))

    setTimeout(
      history(
        type == "test"
          ? `/tests-edit/${response.data.data.testId}`
          : "/courses-list"
      ),
      2000
    )
  } catch (error) {
    yield put(updateQuestionFail(error))
    toastr.error(error.response.data.message)
  }
}

function* onDeleteQuestion({ payload: { questionId, testId, history } }) {
  try {
    const response = yield call(deleteQuestion, questionId)
    toastr.success("Question deleted successfully..!!")
    yield put(deleteQuestionSuccess(response.data))
    // setTimeout(() => {
    //   history(`tests-edit/${testId}`)
    // }, 1000)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteQuestionFail(error))
  }
}

function* onAddNewQuestion({
  payload: { question, history, testId, type, courseId, chapterId },
}) {
  try {
    console.log(question, history, testId, type, courseId, chapterId)
    yield put(updateQuestionLoadingState(true))
    const response = yield call(
      addNewQuestion,
      question,
      testId,
      type,
      courseId,
      chapterId
    )
    toastr.success("New Question Added Successfully..!!")
    yield put(addQuestionSuccess(response.data))
    yield put(updateQuestionLoadingState(false))
    setTimeout(() => {
      type == "test"
        ? history("/tests-list")
        : history(`/courses-edit/${courseId}`)
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateQuestionLoadingState(false))
    yield put(addQuestionFail(error))
  }
}

function* questionsSaga() {
  yield takeEvery(GET_QUESTIONS, fetchQuestions)
  yield takeEvery(GET_QUESTION_DETAIL, fetchQuestionDetail)
  yield takeEvery(ADD_NEW_QUESTION, onAddNewQuestion)
  yield takeEvery(UPDATE_QUESTION, onUpdateQuestion)
  yield takeEvery(DELETE_QUESTION, onDeleteQuestion)
}

export default questionsSaga
