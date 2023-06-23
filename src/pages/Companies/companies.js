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
  getCompanyDetail as onGetCompanyDetail,
  addNewCompany as onaddNewCompany,
  updateCompany as onUpdateCompany,
  deleteCompany as onDeleteCompany,
  getCompanyDetailSuccess as onGetCompanyDetailSuccess,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import { map } from "lodash"
import withRouter from "components/Common/withRouter"

const Companies = props => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const [isEdit, setIsEdit] = useState(false)

  // useEffect(() => {
  //     const currentLocation = props.router?.location?.pathname
  //     const status = currentLocation?.includes("companies-edit")
  //     setIsEdit(status)
  //     if (status && params?.id) dispatch(onGetCompanyDetail(params.id))
  //     else dispatch(onGetCompanyDetailSuccess())
  // }, [])

  useEffect(() => {
    if (params.id) setIsEdit(true)
    else setIsEdit(false)
    dispatch(onGetCompanyDetail(params.id))
  }, [params.id])

  document.title = `${
    isEdit ? "Edit Company" : "Create New Company"
  } | QAPRENEUR`

  const { loading, companyDetail } = useSelector(state => ({
    loading: state.companies.loading,
    companyDetail: state.companies?.companyDetail,
  }))

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: companyDetail?.name || "",
      email: companyDetail?.email || "",
      phoneNumber: companyDetail?.phoneNumber || "",
      address: companyDetail?.address || "",
      technology: companyDetail?.technology || "",
      city: companyDetail?.city || "",
      state: companyDetail?.state || "",
      companySize: companyDetail?.companySize || "",
      founded: companyDetail?.founded || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Company Name"),
      email: Yup.string().required("Please Enter Company Email"),
      phoneNumber: Yup.string().required("Please Enter Mobile"),
      address: Yup.string().required("Address Line 1"),
      technology: Yup.string().required("Please Select Technology"),
      city: Yup.string().required("Please Select City"),
      state: Yup.string().required("Please Select State"),
      companySize: Yup.string().required("Please Enter Company Size"),
      founded: Yup.string().required("Please Enter Founded Date"),
    }),
    onSubmit: values => {
      console.log(values)
      if (isEdit) dispatch(onUpdateCompany(values, companyDetail._id, navigate))
      else dispatch(onaddNewCompany(values, navigate))
    },
  })

  const handleButtonClick = (e, type, { handleSubmit, setFieldValue }) => {
    e.preventDefault()
    handleSubmit()
    return false
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Form>
          <Breadcrumbs
            title="Companies"
            navigate="/companies-list"
            breadcrumbItem={`${isEdit ? "Edit Company" : "Create Company"}`}
          />

          <div>
            <Card>
              <CardBody>
                <div className="pt-2 px-2">
                  <Row>
                    <Col lg="6">
                      <div className="mb-4">
                        <Label htmlFor="formrow-name-Input">
                          Name<span className="required_star">*</span>
                        </Label>
                        <Input
                          name="name"
                          type="text"
                          className="form-control custom_form_control"
                          id="formrow-name-Input"
                          placeholder="Please Enter Company Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name
                              ? true
                              : false
                          }
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

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
                          placeholder="Please Enter Company Email"
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
                  </Row>

                  <Row>
                    <Col lg="6">
                      <div className="mb-4">
                        <Label htmlFor="formrow-name-Input">
                          Mobile<span className="required_star">*</span>
                        </Label>
                        <Input
                          name="phoneNumber"
                          type="text"
                          className="form-control custom_form_control"
                          id="formrow-name-Input"
                          placeholder="Please Enter Mobile"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phoneNumber || ""}
                          invalid={
                            validation.touched.phoneNumber &&
                            validation.errors.phoneNumber
                              ? true
                              : false
                          }
                        />
                        {validation.touched.phoneNumber &&
                        validation.errors.phoneNumber ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phoneNumber}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg="6">
                      <div className="mb-4">
                        <Label htmlFor="formrow-name-Input">
                          Address Line 1<span className="required_star">*</span>
                        </Label>
                        <Input
                          name="address"
                          type="text"
                          className="form-control custom_form_control"
                          id="formrow-name-Input"
                          placeholder="Address Line 1"
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

                  <Row>
                    <Col lg="6">
                      <div className="mb-4">
                        <Label htmlFor="formrow-name-Input">
                          Technology<span className="required_star">*</span>
                        </Label>
                        <Input
                          name="technology"
                          type="text"
                          className="form-control custom_form_control"
                          id="formrow-name-Input"
                          placeholder="Please Enter Technology"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.technology || ""}
                          invalid={
                            validation.touched.technology &&
                            validation.errors.technology
                              ? true
                              : false
                          }
                        />
                        {validation.touched.technology &&
                        validation.errors.technology ? (
                          <FormFeedback type="invalid">
                            {validation.errors.technology}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg="6">
                      <div className="mb-4">
                        <Label htmlFor="formrow-name-Input">
                          Company Size<span className="required_star">*</span>
                        </Label>
                        <Input
                          name="companySize"
                          type="text"
                          className="form-control custom_form_control"
                          id="formrow-name-Input"
                          placeholder="Please Enter Company Size"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.companySize || ""}
                          invalid={
                            validation.touched.companySize &&
                            validation.errors.companySize
                              ? true
                              : false
                          }
                        />
                        {validation.touched.companySize &&
                        validation.errors.companySize ? (
                          <FormFeedback type="invalid">
                            {validation.errors.companySize}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      <div className="mb-4">
                        <Label htmlFor="formrow-name-Input">
                          Founded<span className="required_star">*</span>
                        </Label>
                        <Input
                          name="founded"
                          type="date"
                          className="form-control custom_form_control"
                          id="formrow-name-Input"
                          placeholder="Please Enter Founded Date"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.founded || ""}
                          invalid={
                            validation.touched.founded &&
                            validation.errors.founded
                              ? true
                              : false
                          }
                        />
                        {validation.touched.founded &&
                        validation.errors.founded ? (
                          <FormFeedback type="invalid">
                            {validation.errors.founded}
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
                  </Row>
                </div>

                <div className="btn_outer_upsert pt-4 mt-3">
                  <div className="justify-content-center d-flex col-8 col-sm-12 col-md-12">
                    <button
                      type="button"
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

export default Companies
