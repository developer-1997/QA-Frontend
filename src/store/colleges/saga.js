import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_COLLEGES,
  GET_COLLEGE_DETAIL,
  ADD_NEW_COLLEGE,
  DELETE_COLLEGE,
  UPDATE_COLLEGE,
} from "./actionTypes"
import {
  getCollegesSuccess,
  getCollegesFail,
  getCollegeDetailSuccess,
  getCollegeDetailFail,
  addCollegeFail,
  addCollegeSuccess,
  updateCollegeSuccess,
  updateCollegeFail,
  deleteCollegeSuccess,
  deleteCollegeFail,
  updateCollegeLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getColleges,
  getCollegesDetails,
  addNewCollege,
  updateCollege,
  deleteCollege,
} from "helpers/backend_helper"

function* fetchColleges() {
  try {
    yield put(updateCollegeLoadingState(true))
    const response = yield call(getColleges)
    yield put(getCollegesSuccess(response.data.data))
    yield put(updateCollegeLoadingState(false))
  } catch (error) {
    yield put(updateCollegeLoadingState(false))
    yield put(getCollegesFail(error))
  }
}

function* fetchCollegeDetail({ collegeId }) {
  try {
    const response = yield call(getCollegesDetails, collegeId)
    yield put(getCollegeDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getCollegeDetailFail(error))
  }
}

function* onUpdateCollege({ payload: { college, collegeId, history } }) {
  try {
    const response = yield call(updateCollege, college, collegeId)
    yield put(updateCollegeSuccess(response.data.data))
    toastr.success("College updated successfully..!!")
  } catch (error) {
    yield put(updateCollegeFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/colleges-list"), 2000)
}

function* onDeleteCollege({ payload: collegeId }) {
  try {
    const response = yield call(deleteCollege, collegeId)
    toastr.success("College deleted successfully..!!")
    yield put(deleteCollegeSuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteCollegeFail(error))
  }
}

function* onAddNewCollege({ payload: { college, history } }) {
  try {
    yield put(updateCollegeLoadingState(true))
    const response = yield call(addNewCollege, college)
    toastr.success("New College Added Successfully..!!")
    yield put(addCollegeSuccess(response.data.data))
    yield put(updateCollegeLoadingState(false))
    setTimeout(() => {
      history("/colleges-list")
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateCollegeLoadingState(false))
    yield put(addCollegeFail(error))
  }
}

function* collegesSaga() {
  yield takeEvery(GET_COLLEGES, fetchColleges)
  yield takeEvery(GET_COLLEGE_DETAIL, fetchCollegeDetail)
  yield takeEvery(ADD_NEW_COLLEGE, onAddNewCollege)
  yield takeEvery(UPDATE_COLLEGE, onUpdateCollege)
  yield takeEvery(DELETE_COLLEGE, onDeleteCollege)
}

export default collegesSaga
