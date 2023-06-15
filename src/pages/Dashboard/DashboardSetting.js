import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { withTranslation } from "react-i18next"

import AdminDashboard from "./index"
import StudentDashboard from "./StudentDashboard"

const DashboardSetting = props => {
  //meta title
  document.title = "DashboardSetting | QAPRENEUR"
  const [role, setRole] = useState("")

  useEffect(() => {
    const role = localStorage.getItem("authRole")
    setRole(role)
  })

  const dashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />
      case "student":
        return <StudentDashboard />
    }
  }

  return <React.Fragment>{dashboard()}</React.Fragment>
}

export default withTranslation()(DashboardSetting)
