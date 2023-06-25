import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import withRouter from "components/Common/withRouter"
import toastr from "toastr"
import { registerUser, apiError, registerUserFailed } from "../../store/actions"
import logolight from "../../assets/images/qapreneur/logo-light.png"
import CarouselPage from "./CarouselPage"
import { getRoles as onGetRoles } from "../../store/roles/actions"
import { useSelector, useDispatch } from "react-redux"
import "./authentication.css"

const Register = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetRoles())
  }, [dispatch])

  const { roles } = useSelector(state => ({
    roles: state.roles.roles,
  }))

  const activeRoles = roles.filter(
    role => role.status === "active" && role.role !== "admin"
  )

  document.title = "Register | QAPRENEUR "
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      roleId: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Email"),
      name: Yup.string().required("Please Enter Username"),
      phone: Yup.string().required("Please Enter Phone"),
      roleId: Yup.string().required("Please Select Role"),
      password: Yup.string().min(8).required("Please Enter Password"),
      passwordConfirm: Yup.string()
        .label("confirm password")
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: values => {
      dispatch(registerUser(values))
    },
    isSubmitting: false,
  })

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  if (registrationError) {
    toastr.error(registrationError)
    dispatch(registerUserFailed(null))
  }

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0 overflow-hidden">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={5} lg={5} md={6} sm={12}>
              <div className="auth-full-page-content p-md-5 p-4 overflow-auto vh-100 vh-sm-100">
                <div className="w-100 auth_content_container">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="dashboard" className="d-block auth-logo">
                        <img
                          src={logolight}
                          alt=""
                          height="64.75px"
                          width="275.5px"
                          className="auth-logo-dark"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div className="mb-5">
                        <h5 className="text-primary page_title">
                          Registration
                        </h5>
                        <p className="text-muted page_description">
                          Register to continue QAPRENEUR.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Name</Label>
                            <Input
                              name="name"
                              className="input_field"
                              type="text"
                              placeholder="Enter name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={
                                validation.touched.name &&
                                validation.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.name &&
                            validation.errors.name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control input_field"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Phone</Label>
                            <Input
                              name="phone"
                              type="text"
                              className="input_field"
                              placeholder="Enter phone"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.phone || ""}
                              invalid={
                                validation.touched.phone &&
                                validation.errors.phone
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.phone &&
                            validation.errors.phone ? (
                              <FormFeedback type="invalid">
                                {validation.errors.phone}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="d-block mb-2">Role </Label>
                            {activeRoles.map((role, key) => {
                              return (
                                <div
                                  key={key}
                                  className="form-check form-check-inline"
                                >
                                  <Input
                                    name="roleId"
                                    type="radio"
                                    className="form-check-input"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.roleId || role._id}
                                    invalid={
                                      validation.touched.roleId &&
                                      validation.errors.roleId
                                        ? true
                                        : false
                                    }
                                  />
                                  <Label
                                    className="form-check-label"
                                    htmlFor="customRadioInline1"
                                  >
                                    {role.role}
                                  </Label>
                                </div>
                              )
                            })}
                            {validation.touched.roleId &&
                            validation.errors.roleId ? (
                              <FormFeedback type="invalid">
                                {validation.errors.roleId}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type="password"
                              className="input_field"
                              placeholder="Enter password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">
                              Confirm Password
                            </Label>
                            <Input
                              name="passwordConfirm"
                              type="password"
                              className="input_field"
                              placeholder="Enter confirm password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.passwordConfirm || ""}
                              invalid={
                                validation.touched.passwordConfirm &&
                                validation.errors.passwordConfirm
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.passwordConfirm &&
                            validation.errors.passwordConfirm ? (
                              <FormFeedback type="invalid">
                                {validation.errors.passwordConfirm}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="py-1">
                            <p className="mb-0 txt_terms_condition">
                              By registering you agree to the qapreneur{" "}
                              <a href="#" className="text-primary">
                                Terms of Use
                              </a>
                            </p>
                          </div>

                          <div className="mt-3 d-grid text-center">
                            <button
                              className="btn btn-primary waves-effect waves-light custom_btn "
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? (
                                <Spinner
                                  className="ms-2"
                                  color="light"
                                  size="sm"
                                />
                              ) : (
                                "Register"
                              )}
                            </button>
                          </div>
                        </Form>

                        <div className="mt-4 text-center">
                          <p className="txt_noAccount">
                            Already have an account ?
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              Login
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Register)

Register.propTypes = {
  history: PropTypes.object,
}
