import skills from "store/skills/reducer"
import {
  GET_SKILLS,
  GET_SKILLS_FAIL,
  GET_SKILLS_SUCCESS,
  GET_SKILL_DETAIL,
  ADD_NEW_SKILL,
  ADD_SKILL_SUCCESS,
  ADD_SKILL_FAIL,
  UPDATE_SKILL,
  UPDATE_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  DELETE_SKILL,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  GET_SKILL_DETAIL_FAIL,
  GET_SKILL_DETAIL_SUCCESS,
  UPDATE_SKILL_LOADING_STATE,
} from "./actionTypes"

export const getSkills = () => ({
  type: GET_SKILLS,
})

export const getSkillsSuccess = skills => ({
  type: GET_SKILLS_SUCCESS,
  payload: skills,
})

export const addNewSkill = (skill, history) => ({
  type: ADD_NEW_SKILL,
  payload: { skill, history },
})

export const addSkillSuccess = skill => ({
  type: ADD_SKILL_SUCCESS,
  payload: skill,
})

export const addSkillFail = error => ({
  type: ADD_SKILL_FAIL,
  payload: error,
})

export const updateSkill = (skill, skillId, history) => ({
  type: UPDATE_SKILL,
  payload: { skill, skillId, history },
})

export const updateSkillSuccess = skill => ({
  type: UPDATE_SKILL_SUCCESS,
  payload: skill,
})

export const updateSkillFail = error => ({
  type: UPDATE_SKILL_FAIL,
  payload: error,
})

export const deleteSkill = skillId => ({
  type: DELETE_SKILL,
  payload: skillId,
})

export const deleteSkillSuccess = skill => ({
  type: DELETE_SKILL_SUCCESS,
  payload: skill,
})

export const deleteSkillFail = error => ({
  type: DELETE_SKILL_FAIL,
  payload: error,
})

export const getSkillsFail = error => ({
  type: GET_SKILLS_FAIL,
  payload: error,
})

export const getSkillDetail = skillId => ({
  type: GET_SKILL_DETAIL,
  skillId,
})

export const getSkillDetailSuccess = skillDetails => ({
  type: GET_SKILL_DETAIL_SUCCESS,
  payload: skillDetails,
})

export const getSkillDetailFail = error => ({
  type: GET_SKILL_DETAIL_FAIL,
  payload: error,
})

export const updateSkillLoadingState = status => ({
  type: UPDATE_SKILL_LOADING_STATE,
  payload: status,
})
