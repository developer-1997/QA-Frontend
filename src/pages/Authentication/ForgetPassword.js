import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Alert,
  Label,
  Input,
  FormFeedback,
} from "reactstrap"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

import { useSelector, useDispatch } from "react-redux"

import withRouter from "components/Common/withRouter"

// action
import { userForgetPassword } from "../../store/actions"

// import images
import logolight from "../../assets/images/qapreneur/logo-light.png"

import CarouselPage from "./CarouselPage"

const ForgetPassword = props => {
  //meta title
  document.title = "Forget Password | QAPRENEUR"

  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Email"),
    }),
    onSubmit: values => {
      console.log(values)
      dispatch(userForgetPassword(values, props.history))
    },
  })

  const { forgetError, forgetSuccessMsg } = useSelector(state => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }))

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
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
                        <img
                          src={logolight}
                          alt=""
                          height="64.75px"
                          width="275.5px"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Reset Password</h5>
                        <p className="text-muted">
                          Re-Password with QAPRENEUR.
                        </p>
                      </div>

                      <div className="mt-4">
                        {forgetError && forgetError ? (
                          <Alert color="danger" style={{ marginTop: "13px" }}>
                            {forgetError}
                          </Alert>
                        ) : null}
                        {forgetSuccessMsg ? (
                          <Alert color="success" style={{ marginTop: "13px" }}>
                            {forgetSuccessMsg}
                          </Alert>
                        ) : null}

                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
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
                          <div className="mt-3 text-end">
                            <Button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Reset
                            </Button>
                          </div>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            Remember It ?{" "}
                            <Link
                              to="/register"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Sign In here{" "}
                            </Link>{" "}
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

ForgetPassword.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPassword)
