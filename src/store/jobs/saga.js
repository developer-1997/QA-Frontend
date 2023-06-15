import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_JOBS,
  GET_JOB_DETAIL,
  ADD_NEW_JOB,
  DELETE_JOB,
  UPDATE_JOB,
} from "./actionTypes"
import {
  getJobsSuccess,
  getJobsFail,
  getJobDetailSuccess,
  getJobDetailFail,
  addJobFail,
  addJobSuccess,
  updateJobSuccess,
  updateJobFail,
  deleteJobSuccess,
  deleteJobFail,
  updateJobLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getJobs,
  getJobsDetails,
  addNewJob,
  updateJob,
  deleteJob,
} from "helpers/backend_helper"

function* fetchJobs() {
  try {
    console.log("here")
    yield put(updateJobLoadingState(true))
    const response = yield call(getJobs)
    yield put(getJobsSuccess(response.data.data))
    yield put(updateJobLoadingState(false))
  } catch (error) {
    yield put(updateJobLoadingState(false))
    yield put(getJobsFail(error))
  }
}

function* fetchJobDetail({ jobId }) {
  try {
    const response = yield call(getJobsDetails, jobId)
    yield put(getJobDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getJobDetailFail(error))
  }
}

function* onUpdateJob({ payload: { job, jobId, history } }) {
  try {
    const response = yield call(updateJob, job, jobId)
    yield put(updateJobSuccess(response.data.data))
    toastr.success("Job updated successfully..!!")
  } catch (error) {
    yield put(updateJobFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/jobs-list"), 2000)
}

function* onDeleteJob({ payload: jobId }) {
  try {
    const response = yield call(deleteJob, jobId)
    toastr.success("Job deleted successfully..!!")
    yield put(deleteJobSuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteJobFail(error))
  }
}

function* onAddNewJob({ payload: { job, history } }) {
  try {
    yield put(updateJobLoadingState(true))
    const response = yield call(addNewJob, job)
    toastr.success("New Job Added Successfully..!!")
    yield put(addJobSuccess(response.data.data))
    yield put(updateJobLoadingState(false))
    setTimeout(() => {
      history("/jobs-list")
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateJobLoadingState(false))
    yield put(addJobFail(error))
  }
}

function* jobsSaga() {
  yield takeEvery(GET_JOBS, fetchJobs)
  yield takeEvery(GET_JOB_DETAIL, fetchJobDetail)
  yield takeEvery(ADD_NEW_JOB, onAddNewJob)
  yield takeEvery(UPDATE_JOB, onUpdateJob)
  yield takeEvery(DELETE_JOB, onDeleteJob)
}

export default jobsSaga
