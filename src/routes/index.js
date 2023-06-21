import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// // Pages Calendar
// import Calendar from "../pages/Calendar/index"

// //TestCategories
import TestCategoriesList from "../pages/TestCategories/TestCategoryList"

// //Tests
import TestsList from "../pages/Tests/TestList"
import Tests from "../pages/Tests/tests"
import TestDetail from "../pages/Tests/TestList/Tests-detail"

// Questions
import Questions from "../pages/Questions/questions"
import QuestionsDetails from "../pages/Questions/question-details"

// //Jobss
import JobsList from "../pages/Jobs/JobList"
import Jobs from "../pages/Jobs/jobs"

// //Course
import CoursesList from "../pages/Courses/CourseList"
import MyCoursesList from "../pages/Courses/MyCourseList"
import Courses from "../pages/Courses/courses"
import CourseDetail from "../pages/Courses/CourseList/Courses-detail"

// //Students
import StudentsList from "../pages/Students/StudentList"
import StudentDetail from "../pages/Students/StudentList/Students-detail"
import Students from "pages/Students/students"

// //Coachings
import CoachingsList from "../pages/Coachings/CoachingList"
import CoachingDetail from "../pages/Coachings/CoachingList/Coachings-detail"

// //Companies
import CompaniesList from "../pages/Companies/CompaniesList"
import CompanyDetail from "../pages/Companies/CompaniesList/Companies-detail"

// //Colleges
import CollegesList from "../pages/Colleges/CollegeList"
import CollegeDetail from "../pages/Colleges/CollegeList/Colleges-detail"

// Authentication related pages
import Home from "../pages/Home"

import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/DashboardSetting"
import StudentDashboard from "pages/Dashboard/StudentDashboard"

const adminRoutes = [
  //TestCategories
  { path: "/test-categories-list", component: <TestCategoriesList /> },

  //Tests
  { path: "/tests-create", component: <Tests /> },
  { path: "/questions-create/:type/:id", component: <Questions /> },
  { path: "/questions-edit/:type/:id", component: <Questions /> },
  {
    path: "/questions-create/:type/:courseId/:chapterId",
    component: <Questions />,
  },

  {
    path: "/questions-edit/chapters/:name/:id",
    component: <QuestionsDetails />,
  },

  //Course
  { path: "/courses-list", component: <CoursesList /> },
  { path: "/courses-edit/:id", component: <Courses /> },
  { path: "/courses-create", component: <Courses /> },
  { path: "/courses-create", component: <Courses /> },
  { path: "/course-details/:id", component: <CourseDetail /> },
]

const studentsRoutes = [
  { path: "/my-courses-list", component: <MyCoursesList /> },
]

const authProtectedRoutes = [
    { path: "/dashboard", component: <Dashboard /> },
    // { path: "/dashboard", component: <StudentDashboard /> },

  // //calendar
  // { path: "/calendar", component: <Calendar /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  //Tests
  { path: "/tests-list", component: <TestsList /> },
  { path: "/tests-edit/:id", component: <Tests /> },
  { path: "/tests-create", component: <Tests /> },
  { path: "/test-details/:id", component: <TestDetail /> },

  //Tests
  { path: "/jobs-list", component: <JobsList /> },
  { path: "/jobs-edit/:id", component: <Jobs /> },
  { path: "/jobs-create", component: <Jobs /> },

  //Student
  { path: "/students-list", component: <StudentsList /> },
  { path: "/student-details/:id", component: <StudentDetail /> },
  { path: "/students-create", component: <Students /> },
  { path: "/students-edit/:id", component: <Students /> },

  //Coaching
  { path: "/coachings-list", component: <CoachingsList /> },
  { path: "/coaching-details/:id", component: <CoachingDetail /> },

  //Company
  { path: "/companies-list", component: <CompaniesList /> },
  { path: "/company-details/:id", component: <CompanyDetail /> },

  //College
  { path: "/colleges-list", component: <CollegesList /> },
  { path: "/college-details/:id", component: <CollegeDetail /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  // {
  //   path: "/",
  //   exact: true,
  //   component: <Navigate to="/dashboard" />,
  // },
  //   exact: true,
  // { path: "/", component: <Home /> },
]

const publicRoutes = [
  // { path: "/", component: <Home /> },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/admin/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
]

const websiteRoutes = [{ path: "/", component: <Home /> }]

export {
  authProtectedRoutes,
  publicRoutes,
  adminRoutes,
  studentsRoutes,
  websiteRoutes,
}
