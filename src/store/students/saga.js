import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_STUDENTS,
  GET_STUDENT_DETAIL,
  ADD_NEW_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
} from "./actionTypes"
import {
  getStudentsSuccess,
  getStudentsFail,
  getStudentDetailSuccess,
  getStudentDetailFail,
  addStudentFail,
  addStudentSuccess,
  updateStudentSuccess,
  updateStudentFail,
  deleteStudentSuccess,
  deleteStudentFail,
  updateStudentLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getStudents,
  getStudentsDetails,
  addNewStudent,
  updateStudent,
  deleteStudent,
} from "helpers/backend_helper"

function* fetchStudents() {
  try {
    yield put(updateStudentLoadingState(true))
    const response = yield call(getStudents)
    yield put(getStudentsSuccess(response.data.data))
    yield put(updateStudentLoadingState(false))
  } catch (error) {
    yield put(getStudentsFail(error))
    yield put(updateStudentLoadingState(false))
  }
}

function* fetchStudentDetail({ studentId }) {
  try {
    const response = yield call(getStudentsDetails, studentId)
    yield put(getStudentDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getStudentDetailFail(error))
  }
}

function* onUpdateStudent({ payload: { student, studentId, history } }) {
  try {
    const response = yield call(updateStudent, student, studentId)
    yield put(updateStudentSuccess(response.data.data))
    toastr.success("Student updated successfully..!!")
  } catch (error) {
    yield put(updateStudentFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/students-list"), 2000)
}

function* onDeleteStudent({ payload: studentId }) {
  try {
    const response = yield call(deleteStudent, studentId)
    toastr.success("Student deleted successfully..!!")
    yield put(deleteStudentSuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteStudentFail(error))
  }
}

function* onAddNewStudent({ payload: { student, history } }) {
  try {
    yield put(updateStudentLoadingState(true))
    const response = yield call(addNewStudent, student)
    toastr.success("New Student Added Successfully..!!")
    yield put(addStudentSuccess(response.data.data))
    yield put(updateStudentLoadingState(false))
    setTimeout(() => {
      history("/students-list")
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateStudentLoadingState(false))
    yield put(addStudentFail(error))
  }
}

function* studentsSaga() {
  yield takeEvery(GET_STUDENTS, fetchStudents)
  yield takeEvery(GET_STUDENT_DETAIL, fetchStudentDetail)
  yield takeEvery(ADD_NEW_STUDENT, onAddNewStudent)
  yield takeEvery(UPDATE_STUDENT, onUpdateStudent)
  yield takeEvery(DELETE_STUDENT, onDeleteStudent)
}

export default studentsSaga
