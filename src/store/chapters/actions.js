import chapters from "store/chapters/reducer"
import {
  GET_CHAPTERS,
  GET_CHAPTERS_FAIL,
  GET_CHAPTERS_SUCCESS,
  GET_CHAPTER_DETAIL,
  ADD_NEW_CHAPTER,
  ADD_CHAPTER_SUCCESS,
  ADD_CHAPTER_FAIL,
  UPDATE_CHAPTER,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_FAIL,
  DELETE_CHAPTER,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAIL,
  GET_CHAPTER_DETAIL_FAIL,
  GET_CHAPTER_DETAIL_SUCCESS,
  UPDATE_CHAPTER_LOADING_STATE,
} from "./actionTypes"

export const getChapters = () => ({
  type: GET_CHAPTERS,
})

export const getChaptersSuccess = chapters => ({
  type: GET_CHAPTERS_SUCCESS,
  payload: chapters,
})

export const addNewChapter = (chapter, courseId, history) => ({
  type: ADD_NEW_CHAPTER,
  payload: { chapter, courseId, history },
})

export const addChapterSuccess = chapter => ({
  type: ADD_CHAPTER_SUCCESS,
  payload: chapter,
})

export const addChapterFail = error => ({
  type: ADD_CHAPTER_FAIL,
  payload: error,
})

export const updateChapter = (chapter, chapterId, history) => ({
  type: UPDATE_CHAPTER,
  payload: { chapter, chapterId, history },
})

export const updateChapterSuccess = chapter => ({
  type: UPDATE_CHAPTER_SUCCESS,
  payload: chapter,
})

export const updateChapterFail = error => ({
  type: UPDATE_CHAPTER_FAIL,
  payload: error,
})

export const deleteChapter = (chapterId, courseId, history) => ({
  type: DELETE_CHAPTER,
  payload: { chapterId, courseId, history },
})

export const deleteChapterSuccess = chapter => ({
  type: DELETE_CHAPTER_SUCCESS,
  payload: chapter,
})

export const deleteChapterFail = error => ({
  type: DELETE_CHAPTER_FAIL,
  payload: error,
})

export const getChaptersFail = error => ({
  type: GET_CHAPTERS_FAIL,
  payload: error,
})

export const getChapterDetail = chapterId => ({
  type: GET_CHAPTER_DETAIL,
  chapterId,
})

export const getChapterDetailSuccess = chapterDetails => ({
  type: GET_CHAPTER_DETAIL_SUCCESS,
  payload: chapterDetails,
})

export const getChapterDetailFail = error => ({
  type: GET_CHAPTER_DETAIL_FAIL,
  payload: error,
})

export const updateChapterLoadingState = status => ({
  type: UPDATE_CHAPTER_LOADING_STATE,
  payload: status,
})
