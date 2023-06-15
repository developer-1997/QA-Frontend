import {
  GET_TEST_CATEGORIES_FAIL,
  GET_TEST_CATEGORIES_SUCCESS,
  GET_TEST_CATEGORY_DETAIL_FAIL,
  GET_TEST_CATEGORY_DETAIL_SUCCESS,
  ADD_TEST_CATEGORY_SUCCESS,
  ADD_TEST_CATEGORY_FAIL,
  UPDATE_TEST_CATEGORY_SUCCESS,
  UPDATE_TEST_CATEGORY_FAIL,
  DELETE_TEST_CATEGORY_SUCCESS,
  DELETE_TEST_CATEGORY_FAIL,
  UPDATE_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  testCategories: [],
  testCategoryDetail: {},
  error: {},
  loading: false,
}

const testCategories = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TEST_CATEGORIES_SUCCESS:
      return {
        ...state,
        testCategories: action.payload,
      }

    case UPDATE_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_TEST_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_TEST_CATEGORY_SUCCESS:
      return {
        ...state,
        testCategories: [...state.testCategories, action.payload],
      }

    case ADD_TEST_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TEST_CATEGORY_DETAIL_SUCCESS:
      return {
        ...state,
        testCategoryDetail: action.payload,
      }

    case UPDATE_TEST_CATEGORY_SUCCESS:
      return {
        ...state,
        testCategories: state.testCategories.map(testCategory =>
          testCategory._id.toString() === action.payload._id.toString()
            ? { testCategory, ...action.payload }
            : testCategory
        ),
      }

    case UPDATE_TEST_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_TEST_CATEGORY_SUCCESS:
      return {
        ...state,
        testCategories: state.testCategories.filter(
          testCategory =>
            testCategory._id.toString() !== action.payload.data._id.toString()
        ),
      }

    case DELETE_TEST_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TEST_CATEGORY_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default testCategories
