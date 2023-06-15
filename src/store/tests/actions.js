import tests from "store/tests/reducer"
import {
  GET_TESTS,
  GET_TESTS_FAIL,
  GET_TESTS_SUCCESS,
  GET_TEST_DETAIL,
  ADD_NEW_TEST,
  ADD_TEST_SUCCESS,
  ADD_TEST_FAIL,
  UPDATE_TEST,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAIL,
  DELETE_TEST,
  DELETE_TEST_SUCCESS,
  DELETE_TEST_FAIL,
  GET_TEST_DETAIL_FAIL,
  GET_TEST_DETAIL_SUCCESS,
  UPDATE_TEST_LOADING_STATE,
} from "./actionTypes"

export const getTests = () => ({
  type: GET_TESTS,
})

export const getTestsSuccess = tests => ({
  type: GET_TESTS_SUCCESS,
  payload: tests,
})

export const addNewTest = (test, history) => ({
  type: ADD_NEW_TEST,
  payload: { test, history },
})

export const addTestSuccess = test => ({
  type: ADD_TEST_SUCCESS,
  payload: test,
})

export const addTestFail = error => ({
  type: ADD_TEST_FAIL,
  payload: error,
})

export const updateTest = (test, testId, history) => ({
  type: UPDATE_TEST,
  payload: { test, testId, history },
})

export const updateTestSuccess = test => ({
  type: UPDATE_TEST_SUCCESS,
  payload: test,
})

export const updateTestFail = error => ({
  type: UPDATE_TEST_FAIL,
  payload: error,
})

export const deleteTest = testId => ({
  type: DELETE_TEST,
  payload: testId,
})

export const deleteTestSuccess = test => ({
  type: DELETE_TEST_SUCCESS,
  payload: test,
})

export const deleteTestFail = error => ({
  type: DELETE_TEST_FAIL,
  payload: error,
})

export const getTestsFail = error => ({
  type: GET_TESTS_FAIL,
  payload: error,
})

export const getTestDetail = testId => ({
  type: GET_TEST_DETAIL,
  testId,
})

export const getTestDetailSuccess = testDetails => ({
  type: GET_TEST_DETAIL_SUCCESS,
  payload: testDetails,
})

export const getTestDetailFail = error => ({
  type: GET_TEST_DETAIL_FAIL,
  payload: error,
})

export const updateTestLoadingState = status => ({
  type: UPDATE_TEST_LOADING_STATE,
  payload: status,
})
