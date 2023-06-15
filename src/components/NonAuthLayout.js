import React from "react"
import PropTypes from "prop-types"
import withRouter from "./Common/withRouter"
import { Navigate } from "react-router-dom"

const NonAuthLayout = props => {
  if (
    localStorage.getItem("authUser") &&
    "/logout" !== props.router.location.pathname
  ) {
    return (
      <Navigate
        to={{ pathname: "/dashboard", state: { from: props.location } }}
      />
    )
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
}

export default withRouter(NonAuthLayout)
