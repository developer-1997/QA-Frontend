import {
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
  GET_STUDENT_DETAIL_FAIL,
  GET_STUDENT_DETAIL_SUCCESS,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
  UPDATE_STUDENT_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  students: [],
  studentDetail: {},
  error: {},
  loading: false,
}

const students = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      }

    case UPDATE_STUDENT_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_STUDENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        students: [...state.students, action.payload],
      }

    case ADD_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_STUDENT_DETAIL_SUCCESS:
      return {
        ...state,
        studentDetail: action.payload,
      }

    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map(student =>
          student._id.toString() === action.payload._id.toString()
            ? { student, ...action.payload }
            : student
        ),
      }

    case UPDATE_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter(
          student => student._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_STUDENT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default students
