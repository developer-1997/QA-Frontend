import {
  GET_COACHINGS_FAIL,
  GET_COACHINGS_SUCCESS,
  GET_COACHING_DETAIL_FAIL,
  GET_COACHING_DETAIL_SUCCESS,
  ADD_COACHING_SUCCESS,
  ADD_COACHING_FAIL,
  UPDATE_COACHING_SUCCESS,
  UPDATE_COACHING_FAIL,
  DELETE_COACHING_SUCCESS,
  DELETE_COACHING_FAIL,
  UPDATE_COACHING_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  coachings: [],
  coachingDetail: {},
  error: {},
  loading: false,
}

const coachings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COACHINGS_SUCCESS:
      return {
        ...state,
        coachings: action.payload,
      }

    case UPDATE_COACHING_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_COACHINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_COACHING_SUCCESS:
      return {
        ...state,
        coachings: [...state.coachings, action.payload],
      }

    case ADD_COACHING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COACHING_DETAIL_SUCCESS:
      return {
        ...state,
        coachingDetail: action.payload,
      }

    case UPDATE_COACHING_SUCCESS:
      return {
        ...state,
        coachings: state.coachings.map(coaching =>
          coaching._id.toString() === action.payload._id.toString()
            ? { coaching, ...action.payload }
            : coaching
        ),
      }

    case UPDATE_COACHING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COACHING_SUCCESS:
      return {
        ...state,
        coachings: state.coachings.filter(
          coaching => coaching._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_COACHING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COACHING_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default coachings
