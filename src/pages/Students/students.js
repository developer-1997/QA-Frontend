import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Dropzone from "react-dropzone"
import {
  Card,
  CardBody,
  Button,
  Col,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
  Input,
  Label,
  Row,
  Form,
  FormFeedback,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-datepicker/dist/react-datepicker.css"
import {
  getStudentDetail as onGetStudentDetail,
  addNewStudent as onaddNewStudent,
  updateStudent as onUpdateStudent,
  deleteStudent as onDeleteStudent,
  getStudentDetailSuccess as onGetStudentDetailSuccess,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import { map } from "lodash"
import withRouter from "components/Common/withRouter"

const Students = props => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const currentLocation = props.router.location.pathname
    const status = currentLocation.includes("students-edit")
    setIsEdit(status)
    if (status && params?.id) dispatch(onGetStudentDetail(params.id))
    else dispatch(onGetStudentDetailSuccess())
  }, [])

  document.title = `${
    isEdit ? "Edit Student" : "Create New Student"
  } | QAPRENEUR`

  const { loading, studentDetail } = useSelector(state => ({
    loading: state.students.loading,
    studentDetail: state.students?.studentDetail,
  }))

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: studentDetail?.firstName || "",
      lastName: studentDetail?.lastName || "",
      email: studentDetail?.email || "",
      phone: studentDetail?.phone || "",
      DOB: studentDetail?.DOB || "",
      gender: studentDetail?.gender || "",
      address: studentDetail?.address || "",
      city: studentDetail?.city || "",
      state: studentDetail?.state || "",
      country: studentDetail?.country || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter First Name"),
      lastName: Yup.string().required("Please Enter Last Name"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      DOB: Yup.string().required("Please Enter DOB"),
      gender: Yup.string().required("Please Select Gender"),
      address: Yup.string().required("Please Enter Address"),
      city: Yup.string().required("Please Select City"),
      state: Yup.string().required("Please Select State"),
      country: Yup.string().required("Please Select Country"),
    }),
    onSubmit: values => {
      if (isEdit)
        dispatch(
          onUpdateStudent(values, studentDetail._id, props.router.navigate)
        )
      else dispatch(onaddNewStudent(values, props.router.navigate))
    },
  })

  const handleButtonClick = (e, type, { handleSubmit, setFieldValue }) => {
    e.preventDefault()
    handleSubmit()
    return false
  }

  return (
    <div className="page-content">
      {/* <h1>this is student add and edit page</h1> */}

      <Container fluid>
        <Form>
          <Breadcrumbs
            title="Students"
            navigate="/students-list"
            breadcrumbItem={`${isEdit ? "Edit Student" : "Create Student"}`}
          />

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
                        <Label className="form-label">Select Gender</Label>
                        <span className="required_star">*</span>

                        <Input
                          name="gender"
                          type="select"
                          className="form-select custom_form_control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.gender || ""}
                          invalid={
                            validation.touched.gender &&
                            validation.errors.gender
                              ? true
                              : false
                          }
                        >
                          <option>Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="transgender">Transgender</option>
                        </Input>
                        {validation.touched.gender &&
                        validation.errors.gender ? (
                          <FormFeedback type="invalid">
                            {validation.errors.gender}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <Row>
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
                    <Col lg="6">
                      <div className="mb-4">
                        <Label className="form-label">Select City</Label>
                        <span className="required_star">*</span>

                        <Input
                          name="city"
                          type="select"
                          className="form-select custom_form_control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.city || ""}
                          invalid={
                            validation.touched.city && validation.errors.city
                              ? true
                              : false
                          }
                        >
                          <option>Select City</option>
                          <option value="Bhopal">Bhopal</option>
                          <option value="Indore">Indore</option>
                          <option value="Vidisha">Vidisha</option>
                        </Input>
                        {validation.touched.city && validation.errors.city ? (
                          <FormFeedback type="invalid">
                            {validation.errors.city}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      <div className="mb-4">
                        <Label className="form-label">Select State</Label>
                        <span className="required_star">*</span>

                        <Input
                          name="state"
                          type="select"
                          className="form-select custom_form_control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.state || ""}
                          invalid={
                            validation.touched.state && validation.errors.state
                              ? true
                              : false
                          }
                        >
                          <option>Select State</option>
                          <option value="MadhyaPradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Punjab">Punjab</option>
                        </Input>
                        {validation.touched.state && validation.errors.state ? (
                          <FormFeedback type="invalid">
                            {validation.errors.state}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-4">
                        <Label className="form-label">Select Country</Label>
                        <span className="required_star">*</span>

                        <Input
                          name="country"
                          type="select"
                          className="form-select custom_form_control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.country || ""}
                          invalid={
                            validation.touched.country &&
                            validation.errors.country
                              ? true
                              : false
                          }
                        >
                          <option>Select Country</option>
                          <option value="India">India</option>
                          <option value="China">China</option>
                          <option value="Russia">Russia</option>
                        </Input>
                        {validation.touched.country &&
                        validation.errors.country ? (
                          <FormFeedback type="invalid">
                            {validation.errors.country}
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
                      disabled={loading}
                      className="global_btn btn btn-primary px-4"
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      {loading ? (
                        <Spinner className="ms-2" color="light" size="sm" />
                      ) : isEdit ? (
                        "Save"
                      ) : (
                        "Create"
                      )}
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default withRouter(Students)
