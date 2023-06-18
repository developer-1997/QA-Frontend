import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"

//Import Image
import logo from "../../../assets/images/logo-dark.png"
import logoLight from "../../../assets/images/logo-light.png"
import { getCourseDetail as onGetCourseDetail } from "../../../store/courses/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

//components
import CourseDetails from "components/PageComponents/CourseDetails"

const CourseDetail = props => {
  //meta title
  document.title = "Course Detail | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const { courseDetail } = useSelector(state => ({
    courseDetail: state.courses.courseDetail,
  }))
  console.log(courseDetail)

  const params = props.router.params
  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCourseDetail(params.id))
    } else {
      dispatch(onGetCourseDetail(1)) //remove this after full integration
    }
  }, [dispatch, onGetCourseDetail])

  //Print the Course
  const printCourse = () => {
    window.print()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          
          <Breadcrumb
            title="CourseList"
            breadcrumbItem="Course Profile"
            navigate="/courses-list"
          />

            <div>
                <CourseDetails courseDetail={courseDetail}   />
            </div>
            
        </Container>
      </div>
    </React.Fragment>
  )
}

CourseDetail.propTypes = {
  match: PropTypes.any,
}

export default withRouter(CourseDetail)
