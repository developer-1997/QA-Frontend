import jobs from "store/jobs/reducer"
import {
  GET_JOBS,
  GET_JOBS_FAIL,
  GET_JOBS_SUCCESS,
  GET_JOB_DETAIL,
  ADD_NEW_JOB,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
  UPDATE_JOB,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAIL,
  GET_JOB_DETAIL_FAIL,
  GET_JOB_DETAIL_SUCCESS,
  UPDATE_JOB_LOADING_STATE,
} from "./actionTypes"

export const getJobs = () => ({
  type: GET_JOBS,
})

export const getJobsSuccess = jobs => ({
  type: GET_JOBS_SUCCESS,
  payload: jobs,
})

export const addNewJob = (job, history) => ({
  type: ADD_NEW_JOB,
  payload: { job, history },
})

export const addJobSuccess = job => ({
  type: ADD_JOB_SUCCESS,
  payload: job,
})

export const addJobFail = error => ({
  type: ADD_JOB_FAIL,
  payload: error,
})

export const updateJob = (job, jobId, history) => ({
  type: UPDATE_JOB,
  payload: { job, jobId, history },
})

export const updateJobSuccess = job => ({
  type: UPDATE_JOB_SUCCESS,
  payload: job,
})

export const updateJobFail = error => ({
  type: UPDATE_JOB_FAIL,
  payload: error,
})

export const deleteJob = jobId => ({
  type: DELETE_JOB,
  payload: jobId,
})

export const deleteJobSuccess = job => ({
  type: DELETE_JOB_SUCCESS,
  payload: job,
})

export const deleteJobFail = error => ({
  type: DELETE_JOB_FAIL,
  payload: error,
})

export const getJobsFail = error => ({
  type: GET_JOBS_FAIL,
  payload: error,
})

export const getJobDetail = jobId => ({
  type: GET_JOB_DETAIL,
  jobId,
})

export const getJobDetailSuccess = jobDetails => ({
  type: GET_JOB_DETAIL_SUCCESS,
  payload: jobDetails,
})

export const getJobDetailFail = error => ({
  type: GET_JOB_DETAIL_FAIL,
  payload: error,
})

export const updateJobLoadingState = status => ({
  type: UPDATE_JOB_LOADING_STATE,
  payload: status,
})
