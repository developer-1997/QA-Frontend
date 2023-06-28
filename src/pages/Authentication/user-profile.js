import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { Link, useParams, useNavigate } from "react-router-dom"

import {
  getStudentDetail as onGetStudentDetail,
  addNewStudent as onaddNewStudent,
  updateStudent as onUpdateStudent,
  deleteStudent as onDeleteStudent,
  getStudentDetailSuccess as onGetStudentDetailSuccess,
} from "../../store/actions"


const UserProfile = () => {
  const navigate = useNavigate()
  //meta title
  document.title = "Profile | QAPRENEUR"

  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)
  const [User, setUser] = useState({});

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setUser(obj);
        setname(obj.username)
        setemail(obj.email)
        setidx(obj.uid)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || "",
      idx: idx || "",
      firstName: User.firstName || "",
      lastName: User.lastName || "",
      email: User.email || "",
      phone: User.phone || "",
      DOB: User.DOB || "",
      address: User.address || ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter UserName"),
      firstName: Yup.string().required("Please Enter First Name"),
      lastName: Yup.string().required("Please Enter Last Name"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      DOB: Yup.string().required("Please Enter DOB"),
      address: Yup.string().required("Please Enter Address"),
    }),
    onSubmit: values => {
      dispatch(editProfile(values))
    },
  })


  const handleButtonClick = (e, type, { handleSubmit, setFieldValue }) => {
    e.preventDefault()
    handleSubmit()
    return false
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="QAPreneur" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted ms-4">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <h4 className="card-title mb-4">Change User Name</h4> */}

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >


                <div>
                  <Card>
                    <CardBody>
                      <div className="pt-2 px-2">
                        <Row>
                          <Col lg="6">
                            <div className="mb-4">
                              <Label htmlFor="formrow-name-Input">
                                First Name<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="firstName"
                                type="text"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter First Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.firstName || ""}
                                invalid={
                                  validation.touched.firstName &&
                                    validation.errors.firstName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.firstName &&
                                validation.errors.firstName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.firstName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-4">
                              <Label htmlFor="formrow-name-Input">
                                Last Name<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="lastName"
                                type="text"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter Last Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.lastName || ""}
                                invalid={
                                  validation.touched.lastName &&
                                    validation.errors.lastName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.lastName &&
                                validation.errors.lastName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.lastName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="6">
                            <div className="mb-4">
                              <Label htmlFor="formrow-name-Input">
                                Email<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="email"
                                type="text"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter Email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email && validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-4">
                              <Label htmlFor="formrow-name-Input">
                                Phone<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="phone"
                                type="text"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter Phone"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone && validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone && validation.errors.phone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="6">
                            <div className="mb-4">
                              <Label htmlFor="formrow-name-Input">
                                DOB<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="DOB"
                                type="date"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter DOB"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.DOB || ""}
                                invalid={
                                  validation.touched.DOB && validation.errors.DOB
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.DOB && validation.errors.DOB ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.DOB}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-4">
                              <Label htmlFor="formrow-name-Input">
                                Address<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="address"
                                type="text"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter Address"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                invalid={
                                  validation.touched.address &&
                                    validation.errors.address
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.address &&
                                validation.errors.address ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.address}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div className="btn_outer_upsert pt-4 mt-3">
                        <div className="justify-content-center d-flex col-8 col-sm-12 col-md-12">
                          <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn_outline_bgwhite btn btn-primary me-3 px-4"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={e => handleButtonClick(e, "submit", validation)}
                            type="button"
                            color="primary"
                            // disabled={loading}
                            className="global_btn btn btn-primary px-4"
                          >
                            <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                            Update
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>


                {/* <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username
                        ? true
                        : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">
                      {validation.errors.username}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div> */}



              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
