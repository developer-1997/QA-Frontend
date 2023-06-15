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
          <Row>
            <Col lg={4}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          <div>
                            <h4 className="sun_heading">
                              {courseDetail.courseName}
                            </h4>
                          </div>

                          <div className="mt-3">
                            <div className="text-muted font-size-14">
                              <p className="para">
                                Neque porro quisquam est, qui dolorem ipsum quia
                                dolor sit amet, consectetur, adipisci velit, sed
                                quia non numquam eius modi tempora incidunt ut
                                labore et dolore magnam enim ad minima veniam
                                quis
                              </p>

                              <p className="para mb-4">
                                Ut enim ad minima veniam, quis nostrum
                                exercitationem ullam corporis suscipit
                                laboriosam, nisi ut aliquid ex ea reprehenderit
                                qui in ea voluptate velit esse quam nihil
                                molestiae consequatur, vel illum qui dolorem eum
                                fugiat quo voluptas nulla pariatur? At vero eos
                                et accusamus et iusto odio dignissimos ducimus
                                qui blanditiis praesentium voluptatum deleniti
                                atque corrupti quos dolores et quas molestias
                                excepturi sint occaecati cupiditate non
                                provident, similique sunt
                              </p>

                              {/* <div className="mt-4">
                                <h5 className="mb-3">Title: </h5>

                                <div>
                                  <div className="row">
                                    <div className="col-lg-4 col-sm-6">
                                      <div>
                                        <ul className="ps-4">
                                          <li className="py-1">
                                            Donec sodales sagittis
                                          </li>
                                          <li className="py-1">
                                            Sed consequat leo eget
                                          </li>
                                          <li className="py-1">
                                            Aliquam lorem ante
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                      <div>
                                        <ul className="ps-4">
                                          <li className="py-1">
                                            Aenean ligula eget
                                          </li>
                                          <li className="py-1">
                                            Cum sociis natoque
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          <div>
                            <h4 className="sun_heading">About</h4>
                          </div>

                          <div className="mt-3">
                            <div className="text-muted font-size-14">
                              <p className="para">
                                Neque porro quisquam est, qui dolorem ipsum quia
                                dolor sit amet, consectetur, adipisci velit, sed
                                quia non numquam eius modi tempora incidunt ut
                                labore et dolore magnam enim ad minima veniam
                                quis
                              </p>

                              <p className="para mb-4">
                                Ut enim ad minima veniam, quis nostrum
                                exercitationem ullam corporis suscipit
                                laboriosam, nisi ut aliquid ex ea reprehenderit
                                qui in ea voluptate velit esse quam nihil
                                molestiae consequatur, vel illum qui dolorem eum
                                fugiat quo voluptas nulla pariatur? At vero eos
                                et accusamus et iusto odio dignissimos ducimus
                                qui blanditiis praesentium voluptatum deleniti
                                atque corrupti quos dolores et quas molestias
                                excepturi sint occaecati cupiditate non
                                provident, similique sunt
                              </p>

                              {/* <div className="mt-4">
                                <h5 className="mb-3">Title: </h5>

                                <div>
                                  <div className="row">
                                    <div className="col-lg-4 col-sm-6">
                                      <div>
                                        <ul className="ps-4">
                                          <li className="py-1">
                                            Donec sodales sagittis
                                          </li>
                                          <li className="py-1">
                                            Sed consequat leo eget
                                          </li>
                                          <li className="py-1">
                                            Aliquam lorem ante
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                      <div>
                                        <ul className="ps-4">
                                          <li className="py-1">
                                            Aenean ligula eget
                                          </li>
                                          <li className="py-1">
                                            Cum sociis natoque
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

CourseDetail.propTypes = {
  match: PropTypes.any,
}

export default withRouter(CourseDetail)
