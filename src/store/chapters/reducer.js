import {
  GET_CHAPTERS_FAIL,
  GET_CHAPTERS_SUCCESS,
  GET_CHAPTER_DETAIL_FAIL,
  GET_CHAPTER_DETAIL_SUCCESS,
  ADD_CHAPTER_SUCCESS,
  ADD_CHAPTER_FAIL,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_FAIL,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAIL,
  UPDATE_CHAPTER_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  chapters: [],
  chapterDetail: {},
  error: {},
  loading: false,
}

const chapters = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CHAPTERS_SUCCESS:
      return {
        ...state,
        chapters: action.payload,
      }

    case UPDATE_CHAPTER_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_CHAPTERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: [...state.chapters, action.payload],
      }

    case ADD_CHAPTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CHAPTER_DETAIL_SUCCESS:
      return {
        ...state,
        chapterDetail: action.payload,
      }

    case UPDATE_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: state.chapters.map(chapter =>
          chapter._id.toString() === action.payload._id.toString()
            ? { chapter, ...action.payload }
            : chapter
        ),
      }

    case UPDATE_CHAPTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: state.chapters.filter(
          chapter => chapter._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_CHAPTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CHAPTER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default chapters
