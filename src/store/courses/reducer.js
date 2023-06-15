import {
  GET_COURSES_FAIL,
  GET_COURSES_SUCCESS,
  GET_COURSE_DETAIL_FAIL,
  GET_COURSE_DETAIL_SUCCESS,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAIL,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  UPDATE_COURSE_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  courses: [],
  courseDetail: {},
  error: {},
  loading: false,
}

const courses = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
      }

    case UPDATE_COURSE_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_COURSES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      }

    case ADD_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        courseDetail: action.payload,
      }

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id.toString() === action.payload._id.toString()
            ? { course, ...action.payload }
            : course
        ),
      }

    case UPDATE_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(
          course => course._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COURSE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default courses
