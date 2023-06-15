import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_COURSES,
  GET_COURSE_DETAIL,
  ADD_NEW_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
} from "./actionTypes"
import {
  getCoursesSuccess,
  getCoursesFail,
  getCourseDetailSuccess,
  getCourseDetailFail,
  addCourseFail,
  addCourseSuccess,
  updateCourseSuccess,
  updateCourseFail,
  deleteCourseSuccess,
  deleteCourseFail,
  updateCourseLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCourses,
  getCoursesDetails,
  addNewCourse,
  updateCourse,
  deleteCourse,
} from "helpers/backend_helper"

function* fetchCourses() {
  try {
    const response = yield call(getCourses)
    yield put(getCoursesSuccess(response.data.data))
  } catch (error) {
    yield put(getCoursesFail(error))
  }
}

function* fetchCourseDetail({ testId }) {
  try {
    const response = yield call(getCoursesDetails, testId)
    yield put(getCourseDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getCourseDetailFail(error))
  }
}

function* onUpdateCourse({ payload: { test, testId, history } }) {
  try {
    const response = yield call(updateCourse, test, testId)
    yield put(updateCourseSuccess(response.data.data))
    toastr.success("Course updated successfully..!!")
  } catch (error) {
    yield put(updateCourseFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/courses-list"), 2000)
}

function* onDeleteCourse({ payload: testId }) {
  try {
    const response = yield call(deleteCourse, testId)
    toastr.success("Course deleted successfully..!!")
    yield put(deleteCourseSuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteCourseFail(error))
  }
}

function* onAddNewCourse({ payload: { test, history } }) {
  try {
    yield put(updateCourseLoadingState(true))
    const response = yield call(addNewCourse, test)
    toastr.success("New Course Added Successfully..!!")
    yield put(addCourseSuccess(response.data.data))
    yield put(updateCourseLoadingState(false))
    setTimeout(() => {
      setTimeout(history(`/courses-edit/${response.data.data._id}`), 2000)
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateCourseLoadingState(false))
    yield put(addCourseFail(error))
  }
}

function* coursesSaga() {
  yield takeEvery(GET_COURSES, fetchCourses)
  yield takeEvery(GET_COURSE_DETAIL, fetchCourseDetail)
  yield takeEvery(ADD_NEW_COURSE, onAddNewCourse)
  yield takeEvery(UPDATE_COURSE, onUpdateCourse)
  yield takeEvery(DELETE_COURSE, onDeleteCourse)
}

export default coursesSaga
