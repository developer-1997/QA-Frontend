import {
  GET_COMPANIES_FAIL,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_DETAIL_FAIL,
  GET_COMPANY_DETAIL_SUCCESS,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  UPDATE_COMPANY_LOADING_STATE,
} from "./actionTypes"

const INIT_STATE = {
  companies: [],
  companyDetail: {},
  error: {},
  loading: false,
}

const companies = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload,
      }

    case UPDATE_COMPANY_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      }

    case GET_COMPANIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        companies: [...state.companies, action.payload],
      }

    case ADD_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMPANY_DETAIL_SUCCESS:
      return {
        ...state,
        companyDetail: action.payload,
      }

    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.map(company =>
          company._id.toString() === action.payload._id.toString()
            ? { company, ...action.payload }
            : company
        ),
      }

    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          company => company._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMPANY_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default companies
