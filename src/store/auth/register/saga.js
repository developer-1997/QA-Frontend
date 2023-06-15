import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Both Helper File with needed methods
import { postJwtRegister } from "../../../helpers/backend_helper"

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtRegister, user)
      yield put(registerUserSuccessful(response.data.user))
      localStorage.setItem("authRole", response.data.user.roleId.role)
      localStorage.setItem("authUser", JSON.stringify(response.data.user))
      localStorage.setItem("authToken", response.token)
    }
  } catch (error) {
    console.log("There was an error registering: ", error)
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
