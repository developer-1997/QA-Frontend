import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_COACHINGS,
  GET_COACHING_DETAIL,
  ADD_NEW_COACHING,
  DELETE_COACHING,
  UPDATE_COACHING,
} from "./actionTypes"
import {
  getCoachingsSuccess,
  getCoachingsFail,
  getCoachingDetailSuccess,
  getCoachingDetailFail,
  addCoachingFail,
  addCoachingSuccess,
  updateCoachingSuccess,
  updateCoachingFail,
  deleteCoachingSuccess,
  deleteCoachingFail,
  updateCoachingLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCoachings,
  getCoachingsDetails,
  addNewCoaching,
  updateCoaching,
  deleteCoaching,
} from "helpers/backend_helper"

function* fetchCoachings() {
  try {
    yield put(updateCoachingLoadingState(true))
    const response = yield call(getCoachings)
    yield put(getCoachingsSuccess(response.data.data))
    yield put(updateCoachingLoadingState(false))
  } catch (error) {
    yield put(updateCoachingLoadingState(false))
    yield put(getCoachingsFail(error))
  }
}

function* fetchCoachingDetail({ coachingId }) {
  try {
    const response = yield call(getCoachingsDetails, coachingId)
    yield put(getCoachingDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getCoachingDetailFail(error))
  }
}

function* onUpdateCoaching({ payload: { coaching, coachingId, history } }) {
  try {
    const response = yield call(updateCoaching, coaching, coachingId)
    yield put(updateCoachingSuccess(response.data.data))
    toastr.success("Coaching updated successfully..!!")
  } catch (error) {
    yield put(updateCoachingFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/coachings-list"), 2000)
}

function* onDeleteCoaching({ payload: coachingId }) {
  try {
    const response = yield call(deleteCoaching, coachingId)
    toastr.success("Coaching deleted successfully..!!")
    yield put(deleteCoachingSuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteCoachingFail(error))
  }
}

function* onAddNewCoaching({ payload: { coaching, history } }) {
  try {
    yield put(updateCoachingLoadingState(true))
    const response = yield call(addNewCoaching, coaching)
    toastr.success("New Coaching Added Successfully..!!")
    yield put(addCoachingSuccess(response.data.data))
    yield put(updateCoachingLoadingState(false))
    setTimeout(() => {
      history("/coachings-list")
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateCoachingLoadingState(false))
    yield put(addCoachingFail(error))
  }
}

function* coachingsSaga() {
  yield takeEvery(GET_COACHINGS, fetchCoachings)
  yield takeEvery(GET_COACHING_DETAIL, fetchCoachingDetail)
  yield takeEvery(ADD_NEW_COACHING, onAddNewCoaching)
  yield takeEvery(UPDATE_COACHING, onUpdateCoaching)
  yield takeEvery(DELETE_COACHING, onDeleteCoaching)
}

export default coachingsSaga
