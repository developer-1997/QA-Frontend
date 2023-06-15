import {
  GET_TEST_CATEGORIES,
  GET_TEST_CATEGORIES_FAIL,
  GET_TEST_CATEGORIES_SUCCESS,
  GET_TEST_CATEGORY_DETAIL,
  ADD_NEW_TEST_CATEGORY,
  ADD_TEST_CATEGORY_SUCCESS,
  ADD_TEST_CATEGORY_FAIL,
  UPDATE_TEST_CATEGORY,
  UPDATE_TEST_CATEGORY_SUCCESS,
  UPDATE_TEST_CATEGORY_FAIL,
  DELETE_TEST_CATEGORY,
  DELETE_TEST_CATEGORY_SUCCESS,
  DELETE_TEST_CATEGORY_FAIL,
  GET_TEST_CATEGORY_DETAIL_FAIL,
  GET_TEST_CATEGORY_DETAIL_SUCCESS,
  UPDATE_LOADING_STATE,
} from "./actionTypes"

export const getTestCategories = () => ({
  type: GET_TEST_CATEGORIES,
})

export const getTestCategoriesSuccess = testCategories => ({
  type: GET_TEST_CATEGORIES_SUCCESS,
  payload: testCategories,
})

export const addNewTestCategory = testCategory => ({
  type: ADD_NEW_TEST_CATEGORY,
  payload: testCategory,
})

export const addTestCategorySuccess = testCategory => ({
  type: ADD_TEST_CATEGORY_SUCCESS,
  payload: testCategory,
})

export const addTestCategoryFail = error => ({
  type: ADD_TEST_CATEGORY_FAIL,
  payload: error,
})

export const updateTestCategory = (testCategory, testCategoryId) => ({
  type: UPDATE_TEST_CATEGORY,
  payload: { testCategory, testCategoryId },
})

export const updateTestCategorySuccess = testCategory => ({
  type: UPDATE_TEST_CATEGORY_SUCCESS,
  payload: testCategory,
})

export const updateLoadingState = status => ({
  type: UPDATE_LOADING_STATE,
  payload: status,
})

export const updateTestCategoryFail = error => ({
  type: UPDATE_TEST_CATEGORY_FAIL,
  payload: error,
})

export const deleteTestCategory = testCategory => ({
  type: DELETE_TEST_CATEGORY,
  payload: testCategory,
})

export const deleteTestCategorySuccess = testCategory => ({
  type: DELETE_TEST_CATEGORY_SUCCESS,
  payload: testCategory,
})

export const deleteTestCategoryFail = error => ({
  type: DELETE_TEST_CATEGORY_FAIL,
  payload: error,
})

export const getTestCategoriesFail = error => ({
  type: GET_TEST_CATEGORIES_FAIL,
  payload: error,
})

export const getTestCategoryDetail = testCategoryId => ({
  type: GET_TEST_CATEGORY_DETAIL,
  testCategoryId,
})

export const getTestCategoryDetailSuccess = testCategoryDetails => ({
  type: GET_TEST_CATEGORY_DETAIL_SUCCESS,
  payload: testCategoryDetails,
})

export const getTestCategoryDetailFail = error => ({
  type: GET_TEST_CATEGORY_DETAIL_FAIL,
  payload: error,
})
