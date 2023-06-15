import coachings from "store/coachings/reducer"
import {
  GET_COACHINGS,
  GET_COACHINGS_FAIL,
  GET_COACHINGS_SUCCESS,
  GET_COACHING_DETAIL,
  ADD_NEW_COACHING,
  ADD_COACHING_SUCCESS,
  ADD_COACHING_FAIL,
  UPDATE_COACHING,
  UPDATE_COACHING_SUCCESS,
  UPDATE_COACHING_FAIL,
  DELETE_COACHING,
  DELETE_COACHING_SUCCESS,
  DELETE_COACHING_FAIL,
  GET_COACHING_DETAIL_FAIL,
  GET_COACHING_DETAIL_SUCCESS,
  UPDATE_COACHING_LOADING_STATE,
} from "./actionTypes"

export const getCoachings = () => ({
  type: GET_COACHINGS,
})

export const getCoachingsSuccess = coachings => ({
  type: GET_COACHINGS_SUCCESS,
  payload: coachings,
})

export const addNewCoaching = (coaching, history) => ({
  type: ADD_NEW_COACHING,
  payload: { coaching, history },
})

export const addCoachingSuccess = coaching => ({
  type: ADD_COACHING_SUCCESS,
  payload: coaching,
})

export const addCoachingFail = error => ({
  type: ADD_COACHING_FAIL,
  payload: error,
})

export const updateCoaching = (coaching, coachingId, history) => ({
  type: UPDATE_COACHING,
  payload: { coaching, coachingId, history },
})

export const updateCoachingSuccess = coaching => ({
  type: UPDATE_COACHING_SUCCESS,
  payload: coaching,
})

export const updateCoachingFail = error => ({
  type: UPDATE_COACHING_FAIL,
  payload: error,
})

export const deleteCoaching = coachingId => ({
  type: DELETE_COACHING,
  payload: coachingId,
})

export const deleteCoachingSuccess = coaching => ({
  type: DELETE_COACHING_SUCCESS,
  payload: coaching,
})

export const deleteCoachingFail = error => ({
  type: DELETE_COACHING_FAIL,
  payload: error,
})

export const getCoachingsFail = error => ({
  type: GET_COACHINGS_FAIL,
  payload: error,
})

export const getCoachingDetail = coachingId => ({
  type: GET_COACHING_DETAIL,
  coachingId,
})

export const getCoachingDetailSuccess = coachingDetails => ({
  type: GET_COACHING_DETAIL_SUCCESS,
  payload: coachingDetails,
})

export const getCoachingDetailFail = error => ({
  type: GET_COACHING_DETAIL_FAIL,
  payload: error,
})

export const updateCoachingLoadingState = status => ({
  type: UPDATE_COACHING_LOADING_STATE,
  payload: status,
})
