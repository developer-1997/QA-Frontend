import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { Card, CardBody, Col, Container, Row, Table, Button } from "reactstrap"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"

//Import Image
import logo from "../../../assets/images/logo-dark.png"
import logoLight from "../../../assets/images/logo-light.png"
import { getStudentDetail as onGetStudentDetail } from "../../../store/students/actions"
import Avatar from "../../../assets/images/users/user_placeholder.png"
import PlaceholderImg from "../../../assets/images/users/img_placeholder.png"
//redux
import { useSelector, useDispatch } from "react-redux"

const StudentDetail = props => {
  //meta title
  document.title = "Student Detail | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const { studentDetail } = useSelector(state => ({
    studentDetail: state.students.studentDetail,
  }))
  console.log(studentDetail)

  const params = props.router.params
  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetStudentDetail(params.id))
    } else {
      dispatch(onGetStudentDetail(1)) //remove this after full integration
    }
  }, [dispatch, onGetStudentDetail])

  //Print the Student
  const printStudent = () => {
    window.print()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="StudentList"
            breadcrumbItem="Student Profile"
            navigate="/students-list"
          />
          <Row>
            <Col lg={12}>
              {/* <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row justify-content-center">
                      <div className="col-xl-11">
                        <div>
                          <div>
                            <h4>{studentDetail.name}</h4>
                          </div>

                          <div className="mt-4">
                            <div className="text-muted font-size-14">
                              <p>{studentDetail.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card> */}

              <div className="custom_card">
                <div>
                  <div className="cover_pic"></div>

                  <div className="position-relative">
                    <div className="profile_pic">
                      <img
                        src={`http://54.166.60.45:8000${studentDetail.image}`}
                        height={150}
                        width={150}
                      />
                    </div>
                    <div className="row">
                      <div className="col-xl-12 mt-3">
                        <div className="profile_info">
                          {/* <div className="profile_pic">
                          <img src="" height={150} width={150} />
                        </div> */}

                          <div>
                            <div>
                              <h4 className="profile_name">
                                {studentDetail.name}
                              </h4>
                            </div>

                            <div className="mt-0">
                              <div className="text-muted font-size-14">
                                <p className="profile_email">
                                  {studentDetail.email}
                                </p>
                              </div>
                            </div>

                            <div className="d-flex">
                              <div className="info_badge">
                                <span>Completed Manual Testing</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row">
                      <div className="col-xl-11">
                        <div>
                          <div>
                            <h4>About</h4>
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
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          <div>
                            <h4 className="sun_heading">Personal Details</h4>
                          </div>

                          <div className="mt-4">
                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    First Name
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Aaliya
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Last Name
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Sharma
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Email
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Aaliyas@Gmail.com
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Mobile Number
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    +91 9876543210
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Date of Birth
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    15 Oct 96
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Gender
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Female
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Address
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    911, Dear ridge, Ashok Vatika, Indore
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    City
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Indore
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    State
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Madhya Pradesh
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Country
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    India
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          <div>
                            <h4 className="sun_heading">Skills</h4>
                          </div>

                          <div className="mt-4">
                            <span className="skill_tag">Quality Analysts</span>
                            <span className="skill_tag">Quality Assurance</span>
                            <span className="skill_tag">
                              Quality Management
                            </span>
                            <span className="skill_tag">test cases</span>
                            <span className="skill_tag">Mobile Testing</span>
                            <span className="skill_tag">Test Planning</span>
                            <span className="skill_tag">Quality Analysts</span>
                            <span className="skill_tag">Quality Assurance</span>
                            <span className="skill_tag">
                              Quality Management
                            </span>
                            <span className="skill_tag">test cases</span>
                            <span className="skill_tag">Mobile Testing</span>
                            <span className="skill_tag">Test Planning</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          <div>
                            <h4 className="sun_heading">Employment History </h4>
                          </div>

                          <div className="mt-4 d-flex">
                            <div className="me-4">
                              <img
                                src={PlaceholderImg}
                                alt=""
                                height="47"
                                width="59"
                                className="tr_img"
                              />
                            </div>
                            <div>
                              <h4 className="post_name">
                                Quality Assurance Engineer
                              </h4>
                              <p className="employer_name mb-1">
                                Sonata Software Limited
                                <span>&nbsp; &#x2022; &nbsp;Full-time</span>
                              </p>
                              <p className="work_time my-2">
                                June 2020 Present
                                <span>&nbsp;&#x2022;&nbsp;2 years</span>
                              </p>
                              <p className="employee_extra_info mb-1">
                                Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambledLorem
                                Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum.
                              </p>
                            </div>
                          </div>

                          <div className="full_devider my-4"></div>

                          <div className="mt-4 d-flex">
                            <div className="me-4">
                              <img
                                src={PlaceholderImg}
                                alt=""
                                height="47"
                                width="59"
                                className="tr_img"
                              />
                            </div>
                            <div>
                              <h4 className="post_name">
                                Quality Assurance Engineer
                              </h4>
                              <p className="employer_name mb-1">
                                Newgen Software Technologies Ltd
                                <span>&nbsp; &#x2022; &nbsp;Full-time</span>
                              </p>
                              <p className="work_time my-2">
                                June 2018
                                <span>&nbsp;&#x2022;&nbsp;3 years</span>
                              </p>
                              <p className="employee_extra_info mb-1">
                                Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambledLorem
                                Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          <div>
                            <h4 className="sun_heading">Educational Details</h4>
                          </div>

                          <div className="mt-4">
                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    College Name
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Medi-Caps University
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Degree Name
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    B.Tech
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    year of starting
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    2018
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    year of passing
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    2022
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Education Type
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Regular
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Percentage
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    70%
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    City
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Indore
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    State
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Madhya Pradesh
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Country
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    India
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          {/* <div>
                            <h4 className="sun_heading">Resume</h4>
                          </div> */}
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="sun_heading mb-0">Resume</h4>
                            <Button
                              onClick={e => console.log(e)}
                              type="button"
                              color="primary"
                              className="btn btn-outline-primary btn_outline_bgwhite"
                            >
                              {/* <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i> */}
                              <i className="bx bx-download font-size-16 align-middle me-2"></i>
                              Download
                            </Button>
                          </div>

                          <div className="full_devider my-2"></div>

                          <div className="mt-4">
                            <h5 className="resume_name">
                              Aaliya-Sharma-QA-Resume.pdf &#x2022;{" "}
                              <span> Updated on 24 May 2023</span>
                            </h5>

                            <div className="me-4">
                              <img
                                src={PlaceholderImg}
                                alt=""
                                height="171"
                                width="147"
                                className="img_resume"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3 px-2">
                    <div className="row justify-content-center">
                      <div className="col-xl-12">
                        <div>
                          <div>
                            <h4 className="sun_heading">Test Results</h4>
                          </div>

                          <div className="mt-4">
                            <h2>here will be the Table</h2>
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

StudentDetail.propTypes = {
  match: PropTypes.any,
}

export default withRouter(StudentDetail)
