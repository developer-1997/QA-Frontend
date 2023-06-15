import {
  GET_COLLEGES_FAIL,
  GET_COLLEGES_SUCCESS,
  GET_COLLEGE_DETAIL_FAIL,
  GET_COLLEGE_DETAIL_SUCCESS,
  ADD_COLLEGE_SUCCESS,
  ADD_COLLEGE_FAIL,
  UPDATE_COLLEGE_SUCCESS,
  UPDATE_COLLEGE_FAIL,
  DELETE_COLLEGE_SUCCESS,
  DELETE_COLLEGE_FAIL,
  UPDATE_COLLEGE_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  colleges: [],
  collegeDetail: {},
  error: {},
  loading: false,
}

const colleges = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COLLEGES_SUCCESS:
      return {
        ...state,
        colleges: action.payload,
      }

    case UPDATE_COLLEGE_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_COLLEGES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_COLLEGE_SUCCESS:
      return {
        ...state,
        colleges: [...state.colleges, action.payload],
      }

    case ADD_COLLEGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COLLEGE_DETAIL_SUCCESS:
      return {
        ...state,
        collegeDetail: action.payload,
      }

    case UPDATE_COLLEGE_SUCCESS:
      return {
        ...state,
        colleges: state.colleges.map(college =>
          college._id.toString() === action.payload._id.toString()
            ? { college, ...action.payload }
            : college
        ),
      }

    case UPDATE_COLLEGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COLLEGE_SUCCESS:
      return {
        ...state,
        colleges: state.colleges.filter(
          college => college._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_COLLEGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COLLEGE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default colleges
