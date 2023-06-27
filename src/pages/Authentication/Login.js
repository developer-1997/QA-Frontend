import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Col,
  Container,
  Form,
  Row,
  Input,
  Label,
  FormFeedback,
  Spinner,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import logolight from "../../assets/images/qapreneur/logo-light.png"
import CarouselPage from "./CarouselPage"
import { loginUser } from "../../store/actions"
import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"
import "./authentication.css"

const Login = props => {
  const [passwordShow, setPasswordShow] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  document.title = "Login | QAPRENEUR "

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter email"),
      password: Yup.string().required("Please Enter Password"),
    }),
    onSubmit: values => {
      dispatch(
        loginUser(values, props.router.navigate, isAdmin ? "admin" : "others")
      )
    },
  })

  const { loading } = useSelector(state => ({
    loading: state.Login.loading,
  }))

  useEffect(() => {
    const currentLocation = props.router.location.pathname
    const status = currentLocation.includes("admin")
    setIsAdmin(status)
  }, [])

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0 overflow-hidden">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={5} lg={5} md={12} sm={12}>
              <div className="auth-full-page-content p-md-5 p-4 vh-100 vh-sm-100">
                <div className="w-100 auth_content_container">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img
                          src={logolight}
                          alt=""
                          height="64.75px"
                          width="275.5px"
                          className="logo-dark-element"
                        />
                      </Link>
                    </div>
                    <div className="my-lg-auto mt-3">
                      <div className="mb-5">
                        <h5 className="text-primary page_title">Sign in</h5>
                        <p className="text-muted page_description">
                          Sign in to continue to QAPRENEUR.
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
                          <div className="mb-4">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control input_field"
                              placeholder="Enter email"
                              type="text"
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
                            <Label className="form-label">Password</Label>
                            <div className="input-group auth-pass-inputgroup">
                              <Input
                                name="password"
                                className="input_field"
                                value={validation.values.password || ""}
                                type={passwordShow ? "text" : "password"}
                                placeholder="Enter Password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.password &&
                                  validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              {/* <button
                                onClick={() => setPasswordShow(!passwordShow)}
                                className="btn btn-light "
                                type="button"
                                id="password-addon"
                              >
                                <i className="mdi mdi-eye-outline"></i>
                              </button> */}
                              {validation.touched.password &&
                              validation.errors.password ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>

                          {/* {!isAdmin && ( */}
                          <div className="text-end txt_forgot_psd py-1">
                            <Link to="/auth-recoverpw-2" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          {/* )} */}

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block custom_btn"
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
                                "Sign in"
                              )}
                            </button>
                          </div>
                        </Form>

                        {!isAdmin && (
                          <div className="mt-4 text-center">
                            <p className="txt_noAccount">
                              Don&apos;t have an account ?
                              <Link
                                to="/register"
                                className="fw-medium text-primary"
                              >
                                Sign up
                              </Link>
                            </p>
                          </div>
                        )}
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
export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
