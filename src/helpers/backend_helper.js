import axios from "axios"
import { del, get, post, patch } from "./api_helper"
import * as url from "./url_helper"
const API_URL = process.env.REACT_APP_API_URL

// get roles
export const getRoles = () => get(url.GET_ROLES)

// get roles
export const getAdminDashboard = () => get(url.GET_ADMIN_DASHBOARD_DATA)

// Register Method
export const postJwtRegister = data => {
  return axios
    .post(API_URL + url.POST_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message = err.response.data.message
            break
          case 401:
            message = "Invalid credentials"
          case 400:
            message = err.response.data.message
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
export const postJwtLogin = (data, type) =>
  post(type === "admin" ? url.POST_JWT_ADMIN_LOGIN : url.POST_JWT_LOGIN, data)

// Forget Password Method
export const postJwtForgetPwd = data => post(url.POST_JWT_PASSWORD_FORGET, data)

/** Tests */
// add Test
export const addNewTest = test =>
  post(url.ADD_NEW_TEST, test, {
    headers: { "Content-Type": "multipart/form-data" },
  })

// update Test
export const updateTest = (test, testId) => {
  console.log(
    test,
    typeof test?.image?.name === "string"
      ? "multipart/form-data"
      : "application/json"
  )
  return patch(`${url.UPDATE_TEST}/${testId}`, test, {
    headers: {
      "Content-Type":
        typeof test?.image?.name === "string"
          ? "multipart/form-data"
          : "application/json",
    },
  })
}

// delete Test
export const deleteTest = testId =>
  del(`${url.DELETE_TEST}/${testId}`, { headers: { testId } })

// get test
export const getTests = () => get(url.GET_TESTS)

// get test details
export const getTestsDetails = id =>
  get(`${url.GET_TEST_DETAIL}/${id}`, { params: { id } })

/** TestsCategory */
// add Test
export const addNewTestCategory = testCategory =>
  post(url.ADD_NEW_TEST_CATEGORY, testCategory)

// update TestCategory
export const updateTestCategory = (testCategory, testCategoryId) =>
  patch(`${url.UPDATE_TEST_CATEGORY}/${testCategoryId}`, testCategory)

// delete TestCategory
export const deleteTestCategory = testCategory =>
  del(`${url.DELETE_TEST_CATEGORY}/${testCategory}`, {
    headers: { testCategory },
  })

// get testCategory
export const getTestCategories = () => get(url.GET_TEST_CATEGORIES)

// get testCategory details
export const getTestCategoriesDetails = id =>
  get(`${url.GET_TEST_CATEGORY_DETAIL}/${id}`, { params: { id } })

/** Courses */
// add Course
export const addNewCourse = test =>
  post(url.ADD_NEW_COURSE, test, {
    headers: { "Content-Type": "multipart/form-data" },
  })

// update Course
export const updateCourse = (test, testId) =>
  patch(`${url.UPDATE_COURSE}/${testId}`, test, {
    headers: { "Content-Type": "multipart/form-data" },
  })

// delete Course
export const deleteCourse = testId =>
  del(`${url.DELETE_COURSE}/${testId}`, { headers: { testId } })

// get test
export const getCourses = () => get(url.GET_COURSES)

// get test details
export const getCoursesDetails = id =>
  get(`${url.GET_COURSE_DETAIL}/${id}`, { params: { id } })

/** Students */
// add Student
export const addNewStudent = student =>
  post(url.ADD_NEW_STUDENT, student, {
    headers: {
      "Content-Type": "application/json ",
    },
  })

// update Student
export const updateStudent = (student, studentId) => {
  return patch(`${url.UPDATE_STUDENT}/${studentId}`, student, {
    headers: {
      "Content-Type":
        !student.image || typeof student?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })
}

// delete Student
export const deleteStudent = studentId =>
  del(`${url.DELETE_STUDENT}/${studentId}`, { headers: { studentId } })

// get student
export const getStudents = () => get(`${url.GET_STUDENTS}?role=student`)

// get student details
export const getStudentsDetails = id =>
  get(`${url.GET_STUDENT_DETAIL}/${id}`, { params: { id } })

/** Colleges */
// add College
export const addNewCollege = college =>
  post(url.ADD_NEW_COLLEGE, college, {
    headers: {
      "Content-Type":
        !college.image || typeof college?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// update College
export const updateCollege = (college, collegeId) =>
  patch(`${url.UPDATE_COLLEGE}/${collegeId}`, college, {
    headers: {
      "Content-Type":
        !college.image || typeof college?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// delete College
export const deleteCollege = collegeId =>
  del(`${url.DELETE_COLLEGE}/${collegeId}`, { headers: { collegeId } })

// get college
export const getColleges = () => get(`${url.GET_COLLEGES}?role=college`)

// get college details
export const getCollegesDetails = id =>
  get(`${url.GET_COLLEGE_DETAIL}/${id}`, { params: { id } })

/** Coachings */
// add Coaching
export const addNewCoaching = coaching =>
  post(url.ADD_NEW_COACHING, coaching, {
    headers: {
      "Content-Type":
        !coaching.image || typeof coaching?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// update Coaching
export const updateCoaching = (coaching, coachingId) =>
  patch(`${url.UPDATE_COACHING}/${coachingId}`, coaching, {
    headers: {
      "Content-Type":
        !coaching.image || typeof coaching?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// delete Coaching
export const deleteCoaching = coachingId =>
  del(`${url.DELETE_COACHING}/${coachingId}`, { headers: { coachingId } })

// get coaching
export const getCoachings = () => get(`${url.GET_COACHINGS}?role=coaching`)

// get coaching details
export const getCoachingsDetails = id =>
  get(`${url.GET_COACHING_DETAIL}/${id}`, { params: { id } })

/** Companies */
// add Company
export const addNewCompany = company =>
  post(url.ADD_NEW_COMPANY, company, {
    headers: {
      "Content-Type":
        !company.image || typeof company?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// update Company
export const updateCompany = (company, companyId) =>
  patch(`${url.UPDATE_COMPANY}/${companyId}`, company, {
    headers: {
      "Content-Type":
        !company.image || typeof company?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// delete Company
export const deleteCompany = companyId =>
  del(`${url.DELETE_COMPANY}/${companyId}`, { headers: { companyId } })

// get company
export const getCompanies = () => get(`${url.GET_COMPANIES}?role=company`)

// get company details
export const getCompaniesDetails = id =>
  get(`${url.GET_COMPANY_DETAIL}/${id}`, { params: { id } })

/** Jobs */
// add Job
export const addNewJob = job =>
  post(url.ADD_NEW_JOB, job, {
    headers: {
      "Content-Type":
        !job.image || typeof job?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// update Job
export const updateJob = (job, jobId) =>
  patch(`${url.UPDATE_JOB}/${jobId}`, job, {
    headers: {
      "Content-Type":
        !job.image || typeof job?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// delete Job
export const deleteJob = jobId =>
  del(`${url.DELETE_JOB}/${jobId}`, { headers: { jobId } })

// get job
export const getJobs = () => get(`${url.GET_JOBS}`)

// get job details
export const getJobsDetails = id =>
  get(`${url.GET_JOB_DETAIL}/${id}`, { params: { id } })

/** Skills */
// add Skill
export const addNewSkill = skill => post(url.ADD_NEW_SKILL, skill)

// update Skill
export const updateSkill = (skill, skillId) =>
  patch(`${url.UPDATE_SKILL}/${skillId}`, skill)

// delete Skill
export const deleteSkill = skillId =>
  del(`${url.DELETE_SKILL}/${skillId}`, { headers: { skillId } })

// get skill
export const getSkills = () => get(`${url.GET_SKILLS}`)

// get skill details
export const getSkillsDetails = id =>
  get(`${url.GET_SKILL_DETAIL}/${id}`, { params: { id } })

/** Questions */
// add Question
export const addNewQuestion = (question, testId, type, courseId, chapterId) =>
  post(
    type === "test"
      ? `${url.ADD_NEW_QUESTION}/${testId}`
      : `${url.ADD_NEW_QUESTION}/${courseId}/${chapterId}`,
    question
  )

// update Question
export const updateQuestion = (question, questionId) =>
  patch(`${url.UPDATE_QUESTION}/${questionId}`, question)

// delete Question
export const deleteQuestion = questionId =>
  del(`${url.DELETE_QUESTION}/${questionId}`, { headers: { questionId } })

// get question
export const getQuestions = (type, chapterId) =>
  get(`${type}/${chapterId}${url.GET_QUESTIONS}`)

// get question details
export const getQuestionsDetails = id =>
  get(`${url.GET_QUESTION_DETAIL}/${id}`, { params: { id } })

/** Chapters */
// add Chapter
export const addNewChapter = (courseId, chapter) =>
  post(`${url.ADD_NEW_CHAPTER}${courseId}/chapters`, chapter, {
    headers: {
      "Content-Type":
        !chapter.document || typeof chapter?.document?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// update Chapter
export const updateChapter = (chapter, chapterId) =>
  patch(`${url.UPDATE_CHAPTER}/${chapterId}`, chapter, {
    headers: {
      "Content-Type":
        !chapter.image || typeof chapter?.image?.name == "string"
          ? "application/json"
          : "multipart/form-data",
    },
  })

// delete Chapter
export const deleteChapter = chapterId =>
  del(`${url.DELETE_CHAPTER}/${chapterId}`, { headers: { chapterId } })

// get chapter
export const getChapters = () => get(`${url.GET_CHAPTERS}`)

// get chapter details
export const getChaptersDetails = id =>
  get(`${url.GET_CHAPTER_DETAIL}/${id}`, { params: { id } })
