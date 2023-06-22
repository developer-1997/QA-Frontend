import { call, put, takeEvery } from "redux-saga/effects"
import toastr from "toastr"

// Crypto Redux States
import {
  GET_COMPANIES,
  GET_COMPANY_DETAIL,
  ADD_NEW_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
} from "./actionTypes"
import {
  getCompaniesSuccess,
  getCompaniesFail,
  getCompanyDetailSuccess,
  getCompanyDetailFail,
  addCompanyFail,
  addCompanySuccess,
  updateCompanySuccess,
  updateCompanyFail,
  deleteCompanySuccess,
  deleteCompanyFail,
  updateCompanyLoadingState,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCompanies,
  getCompaniesDetails,
  addNewCompany,
  updateCompany,
  deleteCompany,
} from "helpers/backend_helper"

function* fetchCompanies() {
  try {
    const response = yield call(getCompanies)
    yield put(getCompaniesSuccess(response.data.data))
  } catch (error) {
    yield put(getCompaniesFail(error))
  }
}

function* fetchCompanyDetail({ companyId }) {
  try {
    const response = yield call(getCompaniesDetails, companyId)
    yield put(getCompanyDetailSuccess(response.data.data))
  } catch (error) {
    yield put(getCompanyDetailFail(error))
  }
}

function* onUpdateCompany({ payload: { company, companyId, history } }) {
  try {
    const response = yield call(updateCompany, company, companyId)
    yield put(updateCompanySuccess(response.data.data))
    toastr.success("Company updated successfully..!!")
  } catch (error) {
    yield put(updateCompanyFail(error))
    toastr.error(error.response.data.message)
  }
  setTimeout(history("/companies-list"), 2000)
}

function* onDeleteCompany({ payload: companyId }) {
  try {
    const response = yield call(deleteCompany, companyId)
    toastr.success("Company deleted successfully..!!")
    yield put(deleteCompanySuccess(response.data))
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(deleteCompanyFail(error))
  }
}

function* onAddNewCompany({ payload: { company, history } }) {
  try {
    yield put(updateCompanyLoadingState(true))
    const response = yield call(addNewCompany, company)
    toastr.success("New Company Added Successfully..!!")
    yield put(addCompanySuccess(response.data.data))
    yield put(updateCompanyLoadingState(false))
    setTimeout(() => {
      history("/companies-list")
    }, 1500)
  } catch (error) {
    toastr.error(error.response.data.message)
    yield put(updateCompanyLoadingState(false))
    yield put(addCompanyFail(error))
  }
}

function* companysSaga() {
  yield takeEvery(GET_COMPANIES, fetchCompanies)
  yield takeEvery(GET_COMPANY_DETAIL, fetchCompanyDetail)
  yield takeEvery(ADD_NEW_COMPANY, onAddNewCompany)
  yield takeEvery(UPDATE_COMPANY, onUpdateCompany)
  yield takeEvery(DELETE_COMPANY, onDeleteCompany)
}

export default companysSaga
