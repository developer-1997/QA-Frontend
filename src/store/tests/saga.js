import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_TESTS,
  GET_TEST_DETAIL,
  ADD_NEW_TEST,
  DELETE_TEST,
  UPDATE_TEST,
} from "./actionTypes"
import {
  getTestsSuccess,
  getTestsFail,
  getTestDetailSuccess,
  getTestDetailFail,
  addTestFail,
  addTestSuccess,
  updateTestSuccess,
  updateTestFail,
  deleteTestSuccess,
  deleteTestFail,
  updateTestLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getTests,
  getTestsDetails,
  addNewTest,
  updateTest,
  deleteTest,
} from "helpers/backend_helper"

function* fetchTests() {
  try {
    yield put(updateTestLoadingState(true))
    const response = yield call(getTests)
    yield put(getTestsSuccess(response.data.data))
    yield put(updateTestLoadingState(false))
  } catch (error) {
    yield put(updateTestLoadingState(false))
    yield put(getTestsFail(error))
  }
}

function* fetchTestDetail({ testId }) {
  try {
    const response = yield call(getTestsDetails, testId)
    yield put(getTestDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getTestDetailFail(error))
  }
}

function* onUpdateTest({ payload: { test, testId, history } }) {
  try {
    const response = yield call(updateTest, test, testId)
    yield put(updateTestSuccess(response.data.data))
    toastr.success("Test updated successfully..!!")
  } catch (error) {
    yield put(updateTestFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/tests-list"), 2000)
}

function* onDeleteTest({ payload: testId }) {
  try {
    const response = yield call(deleteTest, testId)
    toastr.success("Test deleted successfully..!!")
    yield put(deleteTestSuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteTestFail(error))
  }
}

function* onAddNewTest({ payload: { test, history } }) {
  try {
    yield put(updateTestLoadingState(true))
    const response = yield call(addNewTest, test)
    // toastr.success("New Test Added Successfully..!!")
    yield put(addTestSuccess(response.data.data))
    yield put(updateTestLoadingState(false))
    setTimeout(() => {
      history(`/questions-create/test/${response.data.data._id}`)
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateTestLoadingState(false))
    yield put(addTestFail(error))
  }
}

function* testsSaga() {
  yield takeEvery(GET_TESTS, fetchTests)
  yield takeEvery(GET_TEST_DETAIL, fetchTestDetail)
  yield takeEvery(ADD_NEW_TEST, onAddNewTest)
  yield takeEvery(UPDATE_TEST, onUpdateTest)
  yield takeEvery(DELETE_TEST, onDeleteTest)
}

export default testsSaga
