import React, { useEffect, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import SimpleBar from "simplebar-react"
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import {
  testListPermission,
  collegeListPermission,
  courseListPermission,
  myCourseListPermission,
  studentListPermission,
  testCategoryListPermission,
  jobsListPermission,
} from "helpers/roles_permissions"

const SidebarContent = props => {
  const ref = useRef()
  const authRole = localStorage.getItem("authRole")
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
            </li>
            {testCategoryListPermission.includes(authRole) && (
              <li>
                <Link to="/test-categories-list">
                  <i className="mdi mdi-text-box-plus"></i>
                  <span>{props.t("Test Category")}</span>
                </Link>
              </li>
            )}
            {testListPermission.includes(authRole) && (
              <li>
                <Link to="/tests-list">
                  <i className="bx bx-detail"></i>
                  {["admin", "coaching"].includes(authRole) ? (
                    <span>{props.t("Test List")}</span>
                  ) : (
                    <span>{props.t("My Test ")}</span>
                  )}
                </Link>
              </li>
            )}
            {courseListPermission.includes(authRole) && (
              <li>
                <Link to="/courses-list">
                  <i className="bx bx-layout"></i>
                  <span>{props.t("Course List")}</span>
                </Link>
              </li>
            )}
            {myCourseListPermission.includes(authRole) && (
              <li>
                <Link to="/my-courses-list">
                  <i className="bx bx-layout"></i>
                  <span>{props.t("My Course")}</span>
                </Link>
              </li>
            )}

            {["admin", "coaching", "company", "student"].includes(authRole) && (
              <li>
                <Link to="/#">
                  <i className="bx bxs-news"></i>
                  {["admin"].includes(authRole) && (
                    <span>{props.t("Plan List")}</span>
                  )}

                  {["student"].includes(authRole) && (
                    <span>{props.t("My Plan ")}</span>
                  )}

                  {["coaching", "company"].includes(authRole) && (
                    <span>{props.t("Plan")}</span>
                  )}
                </Link>
              </li>
            )}
            {studentListPermission.includes(authRole) && (
              <li>
                <Link to="/students-list" className="has-arrow">
                  <i className="fas fa-user-graduate"></i>
                  <span>{props.t("Student List")}</span>
                </Link>
              </li>
            )}
            {collegeListPermission.includes(authRole) && (
              <li>
                <Link to="/colleges-list" className="has-arrow ">
                  <i className="bx bxs-graduation"></i>
                  <span>{props.t("College List")}</span>
                </Link>
              </li>
            )}
            {["admin"].includes(authRole) && (
              <>
                <li>
                  <Link to="/coachings-list" className="has-arrow ">
                    <i className="bx bx-book-content"></i>
                    <span>{props.t("Coaching List")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/companies-list" className="has-arrow ">
                    <i className="far fa-building"></i>
                    <span>{props.t("Company List")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-detail"></i>
                    <span>{props.t("MockTest Request")}</span>
                  </Link>
                </li>
              </>
            )}
            {jobsListPermission.includes(authRole) && (
              <li>
                <Link to="/jobs-list" className="has-arrow ">
                  <i className="bx bxs-news"></i>
                  <span>{props.t("Job List")}</span>
                </Link>
              </li>
            )}
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-bell"></i>
                <span>{props.t("Notification List")}</span>
              </Link>
            </li>
            {["admin", "student"].includes(authRole) && (
              <li>
                <Link to="/#" className="has-arrow ">
                  <i className="bx bx-envelope"></i>

                  <span>{props.t("Contact Us/Support")}</span>
                </Link>
              </li>
            )}
            {["admin", "student"].includes(authRole) && (
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-help-circle" />
                  {["admin"].includes(authRole) && (
                    <span>{props.t("Inquiries")}</span>
                  )}

                  {["student"].includes(authRole) && (
                    <span>{props.t("My Inquiries")}</span>
                  )}
                </Link>
              </li>
            )}
            <li>
              <Link to="/#">
                <i className="bx bx-grid-alt"></i>
                <span key="t-jobs">{props.t("Transition History")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
