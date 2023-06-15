import {
  GET_SKILLS_FAIL,
  GET_SKILLS_SUCCESS,
  GET_SKILL_DETAIL_FAIL,
  GET_SKILL_DETAIL_SUCCESS,
  ADD_SKILL_SUCCESS,
  ADD_SKILL_FAIL,
  UPDATE_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  UPDATE_SKILL_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  skills: [],
  skillDetail: {},
  error: {},
  loading: false,
}

const skills = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SKILLS_SUCCESS:
      return {
        ...state,
        skills: action.payload,
      }

    case UPDATE_SKILL_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_SKILLS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_SKILL_SUCCESS:
      return {
        ...state,
        skills: [...state.skills, action.payload],
      }

    case ADD_SKILL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SKILL_DETAIL_SUCCESS:
      return {
        ...state,
        skillDetail: action.payload,
      }

    case UPDATE_SKILL_SUCCESS:
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill._id.toString() === action.payload._id.toString()
            ? { skill, ...action.payload }
            : skill
        ),
      }

    case UPDATE_SKILL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_SKILL_SUCCESS:
      return {
        ...state,
        skills: state.skills.filter(
          skill => skill._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_SKILL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SKILL_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default skills
