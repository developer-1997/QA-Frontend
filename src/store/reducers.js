import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//testCategories
import testCategories from "./test-categories/reducer"

//tests
import tests from "./tests/reducer"

//questions
import questions from "./questions/reducer"

//jobs
import jobs from "./jobs/reducer"

//courses
import courses from "./courses/reducer"

//chapters
import chapters from "./chapters/reducer"

//students
import students from "./students/reducer"

//coachings
import coachings from "./coachings/reducer"

//companies
import companies from "./companies/reducer"

//colleges
import colleges from "./colleges/reducer"

//roles
import roles from "./roles/reducer"

//skills
import skills from "./skills/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  testCategories,
  tests,
  jobs,
  roles,
  chapters,
  questions,
  skills,
  courses,
  students,
  colleges,
  Dashboard,
  coachings,
  companies,
})

export default rootReducer
