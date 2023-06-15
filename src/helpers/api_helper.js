import axios from "axios"
import toastr from "toastr"
//apply base url for axios
const API_URL = process.env.REACT_APP_API_URL

const axiosApi = axios.create({
  baseURL: API_URL,
})

// axiosApi.defaults.headers.common["Authorization"] = "Bearer " + token
axiosApi.interceptors.request.use(function (response) {
  const token = localStorage.getItem("authToken")
  if (token !== undefined && token !== null) {
    response.headers["Authorization"] = `Bearer ${token}`
    // response.headers["Content-Type"] = "multipart/form-data"
  }
  return response
})

axiosApi.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log("error ", error)
    if (error.code === "ERR_NETWORK") {
      toastr.error(error.message)
    }

    if (
      error?.response?.data?.message === "jwt expired" ||
      "invalid token" === error?.response?.data?.message
    ) {
      toastr.error("Session expired.Please login again...!!!")
      setTimeout(() => {
        window.location =
          window.location.protocol + "//" + window.location.host + "/login"
        localStorage.clear()
      }, 1500)
    }
    const islogin = localStorage.getItem("authToken")

    if (islogin && error.response?.status === 401) {
      window.location =
        window.location.protocol + "//" + window.location.host + "/login"
      localStorage.clear()
    }

    return Promise.reject(error)
  }
)

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}
export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
