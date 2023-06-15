import companies from "store/companies/reducer"
import {
  GET_COMPANIES,
  GET_COMPANIES_FAIL,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_DETAIL,
  ADD_NEW_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  GET_COMPANY_DETAIL_FAIL,
  GET_COMPANY_DETAIL_SUCCESS,
  UPDATE_COMPANY_LOADING_STATE,
} from "./actionTypes"

export const getCompanies = () => ({
  type: GET_COMPANIES,
})

export const getCompaniesSuccess = companies => ({
  type: GET_COMPANIES_SUCCESS,
  payload: companies,
})

export const addNewCompany = (company, history) => ({
  type: ADD_NEW_COMPANY,
  payload: { company, history },
})

export const addCompanySuccess = company => ({
  type: ADD_COMPANY_SUCCESS,
  payload: company,
})

export const addCompanyFail = error => ({
  type: ADD_COMPANY_FAIL,
  payload: error,
})

export const updateCompany = (company, companyId, history) => ({
  type: UPDATE_COMPANY,
  payload: { company, companyId, history },
})

export const updateCompanySuccess = company => ({
  type: UPDATE_COMPANY_SUCCESS,
  payload: company,
})

export const updateCompanyFail = error => ({
  type: UPDATE_COMPANY_FAIL,
  payload: error,
})

export const deleteCompany = companyId => ({
  type: DELETE_COMPANY,
  payload: companyId,
})

export const deleteCompanySuccess = company => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: company,
})

export const deleteCompanyFail = error => ({
  type: DELETE_COMPANY_FAIL,
  payload: error,
})

export const getCompaniesFail = error => ({
  type: GET_COMPANIES_FAIL,
  payload: error,
})

export const getCompanyDetail = companyId => ({
  type: GET_COMPANY_DETAIL,
  companyId,
})

export const getCompanyDetailSuccess = companyDetails => ({
  type: GET_COMPANY_DETAIL_SUCCESS,
  payload: companyDetails,
})

export const getCompanyDetailFail = error => ({
  type: GET_COMPANY_DETAIL_FAIL,
  payload: error,
})

export const updateCompanyLoadingState = status => ({
  type: UPDATE_COMPANY_LOADING_STATE,
  payload: status,
})
