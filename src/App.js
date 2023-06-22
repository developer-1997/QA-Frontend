import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { layoutTypes } from "./constants/layout"
import {
  authProtectedRoutes,
  publicRoutes,
  adminRoutes,
  studentsRoutes,
  websiteRoutes,
} from "./routes"
import {
  Authmiddleware,
  AdminMiddleware,
  StudentMiddleware,
  WebsiteMiddleware,
} from "./routes/route"
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"
import "./assets/scss/theme.scss"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "toastr/build/toastr.min.css"

const getLayout = layoutType => {
  let Layout = VerticalLayout
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout
      break
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout
      break
    default:
      break
  }
  return Layout
}

const App = () => {
  const { layoutType } = useSelector(state => ({
    layoutType: state.Layout.layoutType,
  }))

  const Layout = getLayout(layoutType)
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {websiteRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={route.component}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}

        {adminRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AdminMiddleware>
                <Layout>{route.component}</Layout>
              </AdminMiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}

        {studentsRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <StudentMiddleware>
                <Layout>{route.component}</Layout>
              </StudentMiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
