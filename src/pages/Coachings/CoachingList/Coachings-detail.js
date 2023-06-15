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
import { getCoachingDetail as onGetCoachingDetail } from "../../../store/coachings/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

const CoachingDetail = props => {
  //meta title
  document.title = "Coaching Detail | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const { coachingDetail } = useSelector(state => ({
    coachingDetail: state.coachings.coachingDetail,
  }))
  console.log(coachingDetail)

  const params = props.router.params
  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCoachingDetail(params.id))
    } else {
      dispatch(onGetCoachingDetail(1)) //remove this after full integration
    }
  }, [dispatch, onGetCoachingDetail])

  //Print the Coaching
  const printCoaching = () => {
    window.print()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="CompanyList"
            breadcrumbItem="Company Profile"
            navigate="/companies-list"
          />
          <Row>
            <Col lg={12}>
              <div className="custom_card">
                <div>
                  <div className="cover_pic"></div>

                  <div className="position-relative">
                    <div className="profile_pic">
                      <img
                        src={`http://54.166.60.45:8000${coachingDetail.image}`}
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
                                {coachingDetail.name}
                              </h4>
                            </div>

                            <div className="mt-0">
                              <div className="text-muted font-size-14">
                                <p className="profile_email">
                                  {coachingDetail.email}
                                </p>
                              </div>
                            </div>

                            <div>
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
                            <h4 className="sun_heading">More Information</h4>
                          </div>

                          <div className="mt-4">
                            <Row>
                              <Col sm={5}>
                                <div className="mb-4">
                                  <p className="text-muted mb-2 sm_title">
                                    {coachingDetail.name}
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
                                    {coachingDetail.email}
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
                                    Company Size
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

CoachingDetail.propTypes = {
  match: PropTypes.any,
}

export default withRouter(CoachingDetail)
