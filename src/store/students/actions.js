import students from "store/students/reducer"
import {
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_STUDENTS_SUCCESS,
  GET_STUDENT_DETAIL,
  ADD_NEW_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  UPDATE_STUDENT,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
  DELETE_STUDENT,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
  GET_STUDENT_DETAIL_FAIL,
  GET_STUDENT_DETAIL_SUCCESS,
  UPDATE_STUDENT_LOADING_STATE,
} from "./actionTypes"

export const getStudents = () => ({
  type: GET_STUDENTS,
})

export const getStudentsSuccess = students => ({
  type: GET_STUDENTS_SUCCESS,
  payload: students,
})

export const addNewStudent = (student, history) => ({
  type: ADD_NEW_STUDENT,
  payload: { student, history },
})

export const addStudentSuccess = student => ({
  type: ADD_STUDENT_SUCCESS,
  payload: student,
})

export const addStudentFail = error => ({
  type: ADD_STUDENT_FAIL,
  payload: error,
})

export const updateStudent = (student, studentId, history) => ({
  type: UPDATE_STUDENT,
  payload: { student, studentId, history },
})

export const updateStudentSuccess = student => ({
  type: UPDATE_STUDENT_SUCCESS,
  payload: student,
})

export const updateStudentFail = error => ({
  type: UPDATE_STUDENT_FAIL,
  payload: error,
})

export const deleteStudent = studentId => ({
  type: DELETE_STUDENT,
  payload: studentId,
})

export const deleteStudentSuccess = student => ({
  type: DELETE_STUDENT_SUCCESS,
  payload: student,
})

export const deleteStudentFail = error => ({
  type: DELETE_STUDENT_FAIL,
  payload: error,
})

export const getStudentsFail = error => ({
  type: GET_STUDENTS_FAIL,
  payload: error,
})

export const getStudentDetail = studentId => ({
  type: GET_STUDENT_DETAIL,
  studentId,
})

export const getStudentDetailSuccess = studentDetails => ({
  type: GET_STUDENT_DETAIL_SUCCESS,
  payload: studentDetails,
})

export const getStudentDetailFail = error => ({
  type: GET_STUDENT_DETAIL_FAIL,
  payload: error,
})

export const updateStudentLoadingState = status => ({
  type: UPDATE_STUDENT_LOADING_STATE,
  payload: status,
})
