import colleges from "store/colleges/reducer"
import {
  GET_COLLEGES,
  GET_COLLEGES_FAIL,
  GET_COLLEGES_SUCCESS,
  GET_COLLEGE_DETAIL,
  ADD_NEW_COLLEGE,
  ADD_COLLEGE_SUCCESS,
  ADD_COLLEGE_FAIL,
  UPDATE_COLLEGE,
  UPDATE_COLLEGE_SUCCESS,
  UPDATE_COLLEGE_FAIL,
  DELETE_COLLEGE,
  DELETE_COLLEGE_SUCCESS,
  DELETE_COLLEGE_FAIL,
  GET_COLLEGE_DETAIL_FAIL,
  GET_COLLEGE_DETAIL_SUCCESS,
  UPDATE_COLLEGE_LOADING_STATE,
} from "./actionTypes"

export const getColleges = () => ({
  type: GET_COLLEGES,
})

export const getCollegesSuccess = colleges => ({
  type: GET_COLLEGES_SUCCESS,
  payload: colleges,
})

export const addNewCollege = (college, history) => ({
  type: ADD_NEW_COLLEGE,
  payload: { college, history },
})

export const addCollegeSuccess = college => ({
  type: ADD_COLLEGE_SUCCESS,
  payload: college,
})

export const addCollegeFail = error => ({
  type: ADD_COLLEGE_FAIL,
  payload: error,
})

export const updateCollege = (college, collegeId, history) => ({
  type: UPDATE_COLLEGE,
  payload: { college, collegeId, history },
})

export const updateCollegeSuccess = college => ({
  type: UPDATE_COLLEGE_SUCCESS,
  payload: college,
})

export const updateCollegeFail = error => ({
  type: UPDATE_COLLEGE_FAIL,
  payload: error,
})

export const deleteCollege = collegeId => ({
  type: DELETE_COLLEGE,
  payload: collegeId,
})

export const deleteCollegeSuccess = college => ({
  type: DELETE_COLLEGE_SUCCESS,
  payload: college,
})

export const deleteCollegeFail = error => ({
  type: DELETE_COLLEGE_FAIL,
  payload: error,
})

export const getCollegesFail = error => ({
  type: GET_COLLEGES_FAIL,
  payload: error,
})

export const getCollegeDetail = collegeId => ({
  type: GET_COLLEGE_DETAIL,
  collegeId,
})

export const getCollegeDetailSuccess = collegeDetails => ({
  type: GET_COLLEGE_DETAIL_SUCCESS,
  payload: collegeDetails,
})

export const getCollegeDetailFail = error => ({
  type: GET_COLLEGE_DETAIL_FAIL,
  payload: error,
})

export const updateCollegeLoadingState = status => ({
  type: UPDATE_COLLEGE_LOADING_STATE,
  payload: status,
})
