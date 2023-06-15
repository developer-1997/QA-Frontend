import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Row } from "reactstrap"
import { jobListCandidate } from "../../../common/data/job"
import {
  getCourses as onGetCourses,
  updateCourse as onUpdateCourse,
  deleteCourse as onDeleteCourse,
} from "../../../store/actions"
import { useSelector, useDispatch } from "react-redux"

const List = () => {
  const dispatch = useDispatch()
  const staticURL = process.env.REACT_APP_STATIC_URL

  const { courses } = useSelector(state => ({
    courses: state?.courses?.courses,
  }))

  useEffect(() => {
    dispatch(onGetCourses())
  }, [dispatch])
  const activeBtn = ele => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active")
    } else {
      ele.closest("button").classList.add("active")
    }
  }
  return (
    <React.Fragment>
      <Row>
        {(courses || []).map((item, key) => (
          <Col xl={3} key={key}>
            <Card className="mt-3">
              <CardBody className="course-div">
                <div className="text-center mb-3 mb-3">
                  <img
                    src={staticURL + item.image}
                    alt=""
                    style={{
                      height: "188px",
                      width: "323px",
                      left: "306px",
                      top: "243px ",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="course-group">{item.courseName}</div>

                <div className="course-info"></div>

                <Row className="justify-content-center mt-4">
                  <Col
                    className="justify-content-center d-flex"
                    xs="10"
                    sm={6}
                    md={6}
                  >
                    <Link to="/candidate-overview" className="btn btn-primary ">
                      Enter Course
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  )
}

export default List
