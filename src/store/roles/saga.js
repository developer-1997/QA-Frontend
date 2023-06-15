import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_ROLES } from "./actionTypes"
import { getRolesSuccess, getRolesFail } from "./actions"

//Include Both Helper File with needed methods
import { getRoles } from "helpers/backend_helper"

function* fetchRoles() {
  try {
    const response = yield call(getRoles)
    yield put(getRolesSuccess(response.data.data))
  } catch (error) {
    yield put(getRolesFail(error))
  }
}

function* rolesSaga() {
  yield takeEvery(GET_ROLES, fetchRoles)
}

export default rolesSaga
