import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_TEST_CATEGORIES,
  GET_TEST_CATEGORY_DETAIL,
  ADD_NEW_TEST_CATEGORY,
  DELETE_TEST_CATEGORY,
  UPDATE_TEST_CATEGORY,
} from "./actionTypes"
import {
  getTestCategoriesSuccess,
  getTestCategoriesFail,
  getTestCategoryDetailSuccess,
  getTestCategoryDetailFail,
  addTestCategoryFail,
  addTestCategorySuccess,
  updateTestCategorySuccess,
  updateTestCategoryFail,
  deleteTestCategorySuccess,
  deleteTestCategoryFail,
  updateLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getTestCategories,
  getTestCategoriesDetails,
  addNewTestCategory,
  updateTestCategory,
  deleteTestCategory,
} from "helpers/backend_helper"

function* fetchTestCategories() {
  try {
    const response = yield call(getTestCategories)
    yield put(getTestCategoriesSuccess(response.data.data))
  } catch (error) {
    yield put(getTestCategoriesFail(error))
  }
}

function* fetchTestCategoryDetail({ testCategoryId }) {
  try {
    const response = yield call(getTestCategoriesDetails, testCategoryId)
    yield put(getTestCategoryDetailSuccess(response))
  } catch (error) {
    yield put(getTestCategoryDetailFail(error))
  }
}

function* onUpdateTestCategory({ payload: { testCategory, testCategoryId } }) {
  yield put(updateLoadingState(true))
  try {
    const response = yield call(
      updateTestCategory,
      testCategory,
      testCategoryId
    )
    yield put(updateTestCategorySuccess(response.data.data))
    yield put(updateLoadingState(false))
  } catch (error) {
    yield put(updateTestCategoryFail(error))
    yield put(updateLoadingState(false))
  }
}

function* onDeleteTestCategory({ payload: testCategory }) {
  try {
    const response = yield call(deleteTestCategory, testCategory)
    yield put(deleteTestCategorySuccess(response))
  } catch (error) {
    yield put(deleteTestCategoryFail(error))
  }
}

function* onAddNewTestCategory({ payload: testCategory }) {
  try {
    const response = yield call(addNewTestCategory, testCategory)
    yield put(addTestCategorySuccess(response.data.data))
  } catch (error) {
    yield put(addTestCategoryFail(error))
  }
}

function* testCategoriesSaga() {
  yield takeEvery(GET_TEST_CATEGORIES, fetchTestCategories)
  yield takeEvery(GET_TEST_CATEGORY_DETAIL, fetchTestCategoryDetail)
  yield takeEvery(ADD_NEW_TEST_CATEGORY, onAddNewTestCategory)
  yield takeEvery(UPDATE_TEST_CATEGORY, onUpdateTestCategory)
  yield takeEvery(DELETE_TEST_CATEGORY, onDeleteTestCategory)
}

export default testCategoriesSaga
