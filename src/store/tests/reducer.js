import {
  GET_TESTS_FAIL,
  GET_TESTS_SUCCESS,
  GET_TEST_DETAIL_FAIL,
  GET_TEST_DETAIL_SUCCESS,
  ADD_TEST_SUCCESS,
  ADD_TEST_FAIL,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAIL,
  DELETE_TEST_SUCCESS,
  DELETE_TEST_FAIL,
  UPDATE_TEST_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  tests: [],
  testDetail: {},
  error: {},
  loading: false,
}

const tests = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TESTS_SUCCESS:
      return {
        ...state,
        tests: action.payload,
      }

    case UPDATE_TEST_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_TESTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_TEST_SUCCESS:
      return {
        ...state,
        tests: [...state.tests, action.payload],
      }

    case ADD_TEST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TEST_DETAIL_SUCCESS:
      return {
        ...state,
        testDetail: action.payload,
      }

    case UPDATE_TEST_SUCCESS:
      return {
        ...state,
        tests: state.tests.map(test =>
          test._id.toString() === action.payload._id.toString()
            ? { test, ...action.payload }
            : test
        ),
      }

    case UPDATE_TEST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_TEST_SUCCESS:
      return {
        ...state,
        tests: state.tests.filter(
          test => test._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_TEST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TEST_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default tests
