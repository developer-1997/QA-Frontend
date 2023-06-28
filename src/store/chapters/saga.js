import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_CHAPTERS,
  GET_CHAPTER_DETAIL,
  ADD_NEW_CHAPTER,
  DELETE_CHAPTER,
  UPDATE_CHAPTER,
} from "./actionTypes"
import {
  getChaptersSuccess,
  getChaptersFail,
  getChapterDetailSuccess,
  getChapterDetailFail,
  addChapterFail,
  addChapterSuccess,
  updateChapterSuccess,
  updateChapterFail,
  deleteChapterSuccess,
  deleteChapterFail,
  updateChapterLoadingState,
} from "./actions"

import { getCourseDetail } from "store/actions"

//Include Both Helper File with needed methods
import {
  getChapters,
  getChaptersDetails,
  addNewChapter,
  updateChapter,
  deleteChapter,
} from "helpers/backend_helper"

function* fetchChapters() {
  try {
    const response = yield call(getChapters)
    yield put(getChaptersSuccess(response.data.data))
  } catch (error) {
    yield put(getChaptersFail(error))
  }
}

function* fetchChapterDetail({ chapterId }) {
  try {
    const response = yield call(getChaptersDetails, chapterId)
    yield put(getChapterDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getChapterDetailFail(error))
  }
}

function* onUpdateChapter({ payload: { chapter, chapterId, history } }) {
  try {
    const response = yield call(updateChapter, chapter, chapterId)
    yield put(updateChapterSuccess(response.data.data))
    toastr.success("Chapter updated successfully..!!")
  } catch (error) {
    yield put(updateChapterFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(() => {
    history(`/courses-edit/${courseId}`)
  })
}

function* onDeleteChapter({ payload: { chapterId, courseId, history } }) {
  try {
    const response = yield call(deleteChapter, chapterId)
    toastr.success("Chapter deleted successfully..!!")
    yield put(deleteChapterSuccess(response.data))
    yield put(getCourseDetail(courseId))
    setTimeout(() => {
      history(`/courses-edit/${courseId}`)
    })
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteChapterFail(error))
  }
}

function* onAddNewChapter({ payload: { chapter, courseId, history } }) {
  try {
    yield put(updateChapterLoadingState(true))
    const response = yield call(addNewChapter, courseId, chapter)
    toastr.success("Chapter Added Successfully..!!")
    yield put(addChapterSuccess(response.data.data))
    yield put(getCourseDetail(courseId))
    yield put(updateChapterLoadingState(false))
    setTimeout(() => {
      history(`/courses-edit/${courseId}`)
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateChapterLoadingState(false))
    yield put(addChapterFail(error))
  }
}

function* coursesSaga() {
  yield takeEvery(GET_CHAPTERS, fetchChapters)
  yield takeEvery(GET_CHAPTER_DETAIL, fetchChapterDetail)
  yield takeEvery(ADD_NEW_CHAPTER, onAddNewChapter)
  yield takeEvery(UPDATE_CHAPTER, onUpdateChapter)
  yield takeEvery(DELETE_CHAPTER, onDeleteChapter)
}

export default coursesSaga
