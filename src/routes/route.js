import React from "react"
import { Navigate } from "react-router-dom"

const Authmiddleware = props => {
  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    )
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

const AdminMiddleware = props => {
  if (
    localStorage.getItem("authUser") &&
    localStorage.getItem("authRole").includes("admin")
  ) {
    return <React.Fragment>{props.children}</React.Fragment>
  } else if (localStorage.getItem("authUser")) {
    return (
      <Navigate
        to={{ pathname: "/dashboard", state: { from: props.location } }}
      />
    )
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

const StudentMiddleware = props => {
  if (
    localStorage.getItem("authUser") &&
    localStorage.getItem("authRole").includes("student")
  ) {
    return <React.Fragment>{props.children}</React.Fragment>
  } else if (localStorage.getItem("authUser")) {
    return (
      <Navigate
        to={{ pathname: "/dashboard", state: { from: props.location } }}
      />
    )
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

export { Authmiddleware, AdminMiddleware, StudentMiddleware }
