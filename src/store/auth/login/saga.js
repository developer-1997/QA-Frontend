import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"
import {
  postFakeLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper"
import toastr from "toastr"
import { postJwtLogin } from "../../../helpers/backend_helper"

function* loginUser({ payload: { user, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(
        postJwtLogin,
        {
          email: user.email,
          password: user.password,
        },
        type
      )
      localStorage.setItem("authRole", response.data.user.roleId.role)
      localStorage.setItem("authUser", JSON.stringify(response.data.user))
      localStorage.setItem("authToken", response.token)
      toastr.success("You have successfully signed in!")

      yield put(loginSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      })
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history("/dashboard")
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      toastr.error(error.message)
    } else {
      toastr.error(error.response.data.message)
    }
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("authRole")

    history("/admin/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
