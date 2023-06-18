import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  UncontrolledTooltip,
} from "reactstrap"

import Breadcrumb from "../../../components/Common/Breadcrumb"
import { getTestDetail as onGetTestDetail } from "../../../store/tests/actions"
import { useSelector, useDispatch } from "react-redux"

const TestDetail = props => {
  const BASE_URL = process.env.REACT_APP_STATIC_URL
  const [questions, setQuestions] = useState([])

  document.title = "Test Detail | QAPRENEUR"

  const dispatch = useDispatch()

  const { testDetail } = useSelector(state => ({
    testDetail: state.tests.testDetail,
  }))

  const params = props.router.params

  useEffect(() => {
    if (testDetail) {
      console.log(testDetail)
      if (testDetail.questions) {
        const ques = testDetail.questions.map(question => {
          const que = JSON.parse(question.question)
          que.questionId = question._id
          return que
        })
        setQuestions(ques)
      }
    }
  }, [testDetail])

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetTestDetail(params.id))
    } else {
      dispatch(onGetTestDetail(1))
    }
  }, [dispatch, onGetTestDetail])

  const handleDeleteButton = id => {
    dispatch(onDeleteQuestion(id, testDetail._id, props.router.navigate))
    dispatch(onGetTestDetail(testDetail._id))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="TestList"
            breadcrumbItem="Test Profile"
            navigate="/tests-list"
          />
          <Row>
            <Col lg={12}>
              <div className="custom_card">
                <div>
                  <div className="cover_pic"></div>

                  <div className="position-relative">
                    <div className="profile_pic">
                      <img
                        src={`${BASE_URL}${testDetail.image}`}
                        height={150}
                        width={150}
                      />
                    </div>
                    <div className="row">
                      <div className="col-xl-12 mt-3">
                        <div className="profile_info">
                          <div>
                            <div>
                              <h4 className="profile_name">
                                {testDetail.name}
                              </h4>
                            </div>

                            <div className="mt-0">
                              <div className="text-muted font-size-14">
                                <p className="profile_email">
                                  {testDetail.email}
                                </p>
                              </div>
                            </div>

                            <div className="d-flex">
                              <div className="info_badge">
                                <span>Information Technology</span>
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
                            <h4 className="sun_heading">More Information</h4>
                          </div>

                          <div className="mt-4">
                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    {testDetail.name}
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Larsen & Toubro (L&T)
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Industry
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    IT
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
                                    {testDetail.email}
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
                                    Listed
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    15 Oct 96
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Founded
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    1946
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Headquarters
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Mumbai
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Website
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    https://www.larsentoubro.com/
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Test Size
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    50001-100000
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={7}>
                                <div className="mt-4 mt-sm-0 mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    Location
                                  </p>
                                  <h5 className="font-size-15 sm_content">
                                    Pune
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
              <Card style={{ borderColor: "#CED4DA", borderWidth: 1.5 }}>
                <CardHeader style={{ backgroundColor: "#E0E5FA" }}>
                  <Row>
                    <div>
                      <h4 className="sun_heading">Questions</h4>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#F2F2F2" }}>
                  {questions.length
                    ? questions.map((question, index) => {
                        console.log(question)
                        return (
                          <Card key={index} style={{ marginBottom: 10 }}>
                            <CardBody style={{ padding: "12px 20px" }}>
                              <Row>
                                <Col
                                  lg="6"
                                  className="justify-content-left d-flex question_text"
                                >
                                  {`${index + 1}. ${question.question}`}
                                </Col>
                                <Col
                                  lg="6"
                                  className="justify-content-end d-flex question_answer px-lg-0"
                                >
                                  {`Answer : ${question.answer}`}

                                  <Link
                                    to={`/questions-edit/test/${question.questionId}`}
                                    className="text-muted font-weight-bold px-2 ms-3"
                                  >
                                    {/* <i className="bx bx-pencil font-size-16 align-middle ml-2"></i> */}
                                    <i
                                      className="mdi mdi-pencil edit_blue_icon font-size-15"
                                      id="edittooltip"
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="edittooltip"
                                    >
                                      Edit
                                    </UncontrolledTooltip>
                                  </Link>

                                  <Link
                                    onClick={() =>
                                      handleDeleteButton(question.questionId)
                                    }
                                  >
                                    <i
                                      className="mdi mdi-delete delete_red_icon font-size-15"
                                      id="deletetooltip"
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="deletetooltip"
                                    >
                                      Delete
                                    </UncontrolledTooltip>
                                  </Link>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        )
                      })
                    : "No Questions"}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

TestDetail.propTypes = {
  match: PropTypes.any,
}

export default withRouter(TestDetail)
