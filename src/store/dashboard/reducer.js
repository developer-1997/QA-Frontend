import {
  API_SUCCESS,
  API_FAIL,
  GET_CHARTS_DATA,
  GET_ADMIN_DASHBOARD_DATA,
} from "./actionTypes"

const INIT_STATE = {
  chartsData: [],
  dashboardData: [],
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsData: action.payload.data,
          }
        case GET_ADMIN_DASHBOARD_DATA:
          return {
            ...state,
            dashboardData: action.payload.data,
          }
        default:
          return state
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsDataError: action.payload.error,
          }

        default:
          return state
      }
    default:
      return state
  }
}

export default Dashboard
