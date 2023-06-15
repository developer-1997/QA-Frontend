import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import testsCategorySaga from "./test-categories/saga"
import testsSaga from "./tests/saga"
import jobsSaga from "./jobs/saga"
import coursesSaga from "./courses/saga"
import studentsSaga from "./students/saga"
import companiesSaga from "./companies/saga"
import coachingsSaga from "./coachings/saga"
import collegesSaga from "./colleges/saga"
import rolesSaga from "./roles/saga"
import skillsSaga from "./skills/saga"
import dashboardSaga from "./dashboard/saga"
import questionSaga from "./questions/saga"
import chapterSaga from "./chapters/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(testsCategorySaga),
    fork(testsSaga),
    fork(jobsSaga),
    fork(coursesSaga),
    fork(studentsSaga),
    fork(companiesSaga),
    fork(coachingsSaga),
    fork(collegesSaga),
    fork(chapterSaga),
    fork(rolesSaga),
    fork(skillsSaga),
    fork(dashboardSaga),
    fork(questionSaga),
  ])
}
