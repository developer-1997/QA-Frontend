import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_SKILLS,
  GET_SKILL_DETAIL,
  ADD_NEW_SKILL,
  DELETE_SKILL,
  UPDATE_SKILL,
} from "./actionTypes"
import {
  getSkillsSuccess,
  getSkillsFail,
  getSkillDetailSuccess,
  getSkillDetailFail,
  addSkillFail,
  addSkillSuccess,
  updateSkillSuccess,
  updateSkillFail,
  deleteSkillSuccess,
  deleteSkillFail,
  updateSkillLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getSkills,
  getSkillsDetails,
  addNewSkill,
  updateSkill,
  deleteSkill,
} from "helpers/backend_helper"

function* fetchSkills() {
  try {
    yield put(updateSkillLoadingState(true))
    const response = yield call(getSkills)
    yield put(getSkillsSuccess(response.data.data))
    yield put(updateSkillLoadingState(false))
  } catch (error) {
    yield put(updateSkillLoadingState(false))
    yield put(getSkillsFail(error))
  }
}

function* fetchSkillDetail({ skillId }) {
  try {
    const response = yield call(getSkillsDetails, skillId)
    yield put(getSkillDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getSkillDetailFail(error))
  }
}

function* onUpdateSkill({ payload: { skill, skillId, history } }) {
  try {
    const response = yield call(updateSkill, skill, skillId)
    yield put(updateSkillSuccess(response.data.data))
    toastr.success("Skill updated successfully..!!")
  } catch (error) {
    yield put(updateSkillFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/skills-list"), 2000)
}

function* onDeleteSkill({ payload: skillId }) {
  try {
    const response = yield call(deleteSkill, skillId)
    toastr.success("Skill deleted successfully..!!")
    yield put(deleteSkillSuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteSkillFail(error))
  }
}

function* onAddNewSkill({ payload: { skill, history } }) {
  try {
    yield put(updateSkillLoadingState(true))
    const response = yield call(addNewSkill, skill)
    toastr.success("New Skill Added Successfully..!!")
    yield put(addSkillSuccess(response.data.data))
    yield put(updateSkillLoadingState(false))
    setTimeout(() => {
      history("/skills-list")
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateSkillLoadingState(false))
    yield put(addSkillFail(error))
  }
}

function* skillsSaga() {
  yield takeEvery(GET_SKILLS, fetchSkills)
  yield takeEvery(GET_SKILL_DETAIL, fetchSkillDetail)
  yield takeEvery(ADD_NEW_SKILL, onAddNewSkill)
  yield takeEvery(UPDATE_SKILL, onUpdateSkill)
  yield takeEvery(DELETE_SKILL, onDeleteSkill)
}

export default skillsSaga
