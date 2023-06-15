import courses from "store/courses/reducer"
import {
  GET_COURSES,
  GET_COURSES_FAIL,
  GET_COURSES_SUCCESS,
  GET_COURSE_DETAIL,
  ADD_NEW_COURSE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAIL,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  DELETE_COURSE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  GET_COURSE_DETAIL_FAIL,
  GET_COURSE_DETAIL_SUCCESS,
  UPDATE_COURSE_LOADING_STATE,
} from "./actionTypes"

export const getCourses = () => ({
  type: GET_COURSES,
})

export const getCoursesSuccess = courses => ({
  type: GET_COURSES_SUCCESS,
  payload: courses,
})

export const addNewCourse = (test, history) => ({
  type: ADD_NEW_COURSE,
  payload: { test, history },
})

export const addCourseSuccess = test => ({
  type: ADD_COURSE_SUCCESS,
  payload: test,
})

export const addCourseFail = error => ({
  type: ADD_COURSE_FAIL,
  payload: error,
})

export const updateCourse = (test, testId, history) => ({
  type: UPDATE_COURSE,
  payload: { test, testId, history },
})

export const updateCourseSuccess = test => ({
  type: UPDATE_COURSE_SUCCESS,
  payload: test,
})

export const updateCourseFail = error => ({
  type: UPDATE_COURSE_FAIL,
  payload: error,
})

export const deleteCourse = testId => ({
  type: DELETE_COURSE,
  payload: testId,
})

export const deleteCourseSuccess = test => ({
  type: DELETE_COURSE_SUCCESS,
  payload: test,
})

export const deleteCourseFail = error => ({
  type: DELETE_COURSE_FAIL,
  payload: error,
})

export const getCoursesFail = error => ({
  type: GET_COURSES_FAIL,
  payload: error,
})

export const getCourseDetail = testId => ({
  type: GET_COURSE_DETAIL,
  testId,
})

export const getCourseDetailSuccess = testDetails => ({
  type: GET_COURSE_DETAIL_SUCCESS,
  payload: testDetails,
})

export const getCourseDetailFail = error => ({
  type: GET_COURSE_DETAIL_FAIL,
  payload: error,
})

export const updateCourseLoadingState = status => ({
  type: UPDATE_COURSE_LOADING_STATE,
  payload: status,
})
