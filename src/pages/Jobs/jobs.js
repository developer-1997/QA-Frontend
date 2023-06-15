import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
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
} from "reactstrap"
import Select from "react-select"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-datepicker/dist/react-datepicker.css"
import {
  getSkills as onGetSkills,
  getJobDetail as onGetJobDetail,
  addNewJob as onAddNewJob,
  updateJob as onUpdateJob,
  getJobDetailSuccess as onGetJobDetailSuccess,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"

const Jobs = props => {
  const dispatch = useDispatch()
  const params = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [selectedMulti, setselectedMulti] = useState(null)

  document.title = `${isEdit ? "Edit Job" : "Create New Job"} | QAPRENEUR`

  useEffect(() => {
    const currentLocation = props.router.location.pathname
    const status = currentLocation.includes("jobs-edit")
    setIsEdit(status)
    if (status && params?.id) dispatch(onGetJobDetail(params.id))
    else dispatch(onGetJobDetailSuccess())
  }, [])

  useEffect(() => {
    dispatch(onGetSkills())
  }, [dispatch])

  const { skills, loading, jobDetail } = useSelector(state => ({
    skills: state.skills.skills,
    loading: state.jobs.loading,
    jobDetail: state.jobs?.jobDetail,
  }))

  const newArray = skills.map(obj => {
    return { label: obj.name, value: obj._id }
  })

  useEffect(() => {
    if (jobDetail && newArray) {
      const selected = newArray.filter(obj => {
        if (jobDetail.skillIds.includes(obj.value)) {
          return obj
        }
      })
      setselectedMulti(selected)
    }
  }, [jobDetail])

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      jobTitle: jobDetail?.jobTitle || "",
      description: jobDetail?.description || "",
      type: jobDetail?.type,
      description: jobDetail?.description || "",
      skillIds: jobDetail?.skillIds || "",
      location: jobDetail?.location || "",
      status: jobDetail?.status || "",
      experience: jobDetail?.experience || "",
      salaryRange: jobDetail?.salaryRange || "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("Please Enter Your Job Title"),
      status: Yup.string().required("Please Enter Your Status"),
      type: Yup.string().required("Please Select Job Type"),
      // skillIds: Yup.string().required("Please Select skill"),
      experience: Yup.string().required("Please Enter Your Experience"),
      salaryRange: Yup.string().required("Please Enter Your Salary Range"),
      location: Yup.string().required("Please Enter Your Location"),
    }),
    onSubmit: values => {
      console.log(values, "values")
      if (isEdit)
        dispatch(onUpdateJob(values, jobDetail._id, props.router.navigate))
      else dispatch(onAddNewJob(values, props.router.navigate))
    },
  })
  console.log(validation.values.type)
  const handleButtonClick = (e, type, { handleSubmit, setFieldValue }) => {
    e.preventDefault()
    const filterselectedMulti = selectedMulti
    const skillIds = filterselectedMulti.length
      ? filterselectedMulti.map(value => value.value)
      : []
    console.log(skillIds)
    setFieldValue("skillIds", skillIds)
    if (type === "draft") setFieldValue("status", "deactive")
    handleSubmit()
    return false
  }

  const optionGroup = [
    {
      label: "Select Skill",
      options: newArray,
    },
  ]

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Form>
            <Breadcrumbs
              title="Jobs"
              navigate="/jobs-list"
              breadcrumbItem={`${isEdit ? "Edit Job" : "Create Job"}`}
            />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="12">
                        <div className="mb-3">
                          <Label htmlFor="formrow-name-Input">Job Name*</Label>
                          <Input
                            name="jobTitle"
                            type="text"
                            className="form-control"
                            id="formrow-jobTitle-Input"
                            placeholder="e.g Looking for QA Engineer"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.jobTitle || ""}
                            invalid={
                              validation.touched.jobTitle &&
                              validation.errors.jobTitle
                                ? true
                                : false
                            }
                          />
                          {validation.touched.jobTitle &&
                          validation.errors.jobTitle ? (
                            <FormFeedback type="invalid">
                              {validation.errors.jobTitle}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <label className="control-label">Description</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={validation.values.description}
                          onReady={editor => {}}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            validation.setFieldValue("description", data)
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label className="d-block mb-3">
                            Employement Type :
                          </Label>
                          <div className="form-check form-check-inline">
                            <Input
                              type="radio"
                              id="customRadioInline1"
                              name="type"
                              className="form-check-input"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={"full-time"}
                              invalid={
                                validation.touched.type &&
                                validation.errors.type
                                  ? true
                                  : false
                              }
                              defaultChecked={
                                validation.values.type === "full-time"
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="customRadioInline1"
                            >
                              Full Time
                            </Label>
                          </div>
                          &nbsp;
                          <div className="form-check form-check-inline">
                            <Input
                              type="radio"
                              id="customRadioInline2"
                              name="type"
                              className="form-check-input"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={"part-time"}
                              invalid={
                                validation.touched.type &&
                                validation.errors.type
                                  ? true
                                  : false
                              }
                              defaultChecked={
                                validation.values.type === "part-time"
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="customRadioInline2"
                            >
                              Part Time
                            </Label>
                          </div>
                          &nbsp;
                          <div className="form-check form-check-inline">
                            <Input
                              type="radio"
                              id="customRadioInline2"
                              name="type"
                              className="form-check-input"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={"on-demand"}
                              invalid={
                                validation.touched.type &&
                                validation.errors.type
                                  ? true
                                  : false
                              }
                              defaultChecked={
                                validation.values.type === "on-demand"
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="customRadioInline2"
                            >
                              On demand
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <label className="control-label">
                            Required Skill
                          </label>
                          <Select
                            value={selectedMulti}
                            isMulti={true}
                            onChange={e => {
                              handleMulti(e)
                            }}
                            name="skillIds"
                            options={optionGroup}
                            className="select2-selection"
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.skillIds &&
                              validation.errors.skillIds
                                ? true
                                : false
                            }
                          />
                          {validation.touched.skillIds &&
                          validation.errors.skillIds ? (
                            <FormFeedback type="invalid">
                              {validation.errors.skillIds}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label htmlFor="formrow-passingMark-Input">
                            Location*
                          </Label>
                          <Input
                            name="location"
                            type="text"
                            className="form-control"
                            id="formrow-passingMark-Input"
                            placeholder="Enter locarion"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.location || ""}
                            invalid={
                              validation.touched.location &&
                              validation.errors.location
                                ? true
                                : false
                            }
                          />
                          {validation.touched.location &&
                          validation.errors.location ? (
                            <FormFeedback type="invalid">
                              {validation.errors.location}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label htmlFor="formrow-passingMark-Input">
                            Salary Range*
                          </Label>
                          <Input
                            name="salaryRange"
                            type="text"
                            className="form-control"
                            id="formrow-passingMark-Input"
                            placeholder="Enter Salary Range*"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.salaryRange || ""}
                            invalid={
                              validation.touched.salaryRange &&
                              validation.errors.salaryRange
                                ? true
                                : false
                            }
                          />
                          {validation.touched.salaryRange &&
                          validation.errors.salaryRange ? (
                            <FormFeedback type="invalid">
                              {validation.errors.salaryRange}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label htmlFor="status-input" className="form-label">
                            Experiance
                          </Label>
                          <Input
                            name="experience"
                            id="status-input"
                            type="text"
                            placeholder="Enter Experience"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.experience || ""}
                            invalid={
                              validation.touched.experience &&
                              validation.errors.experience
                                ? true
                                : false
                            }
                          />

                          {validation.touched.experience &&
                          validation.errors.experience ? (
                            <FormFeedback type="invalid">
                              {validation.errors.experience}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label htmlFor="status-input" className="form-label">
                            Status
                          </Label>
                          <Input
                            name="status"
                            id="status-input"
                            type="select"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.status || ""}
                            invalid={
                              validation.touched.status &&
                              validation.errors.status
                                ? true
                                : false
                            }
                          >
                            <option>Choose Status</option>
                            <option value="active">Active</option>
                            <option value="deactive">Deactive</option>
                          </Input>
                          {validation.touched.status &&
                          validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Card>
              <CardBody>
                <Row className="justify-content-center">
                  <Col
                    className="justify-content-center d-flex"
                    xs="8"
                    sm={6}
                    md={4}
                  >
                    <Button
                      onClick={e => handleButtonClick(e, "submit", validation)}
                      type="button"
                      color="primary"
                      disabled={loading}
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      {loading ? (
                        <Spinner className="ms-2" color="light" size="sm" />
                      ) : isEdit ? (
                        "Save Job"
                      ) : (
                        "Create Job"
                      )}
                    </Button>
                    {!isEdit && (
                      <Button
                        onClick={e => handleButtonClick(e, "draft", validation)}
                        type="button"
                        color=""
                        disabled={loading}
                        className="ms-4 btn btn-outline-secondary"
                      >
                        <i className="bx bx-save font-size-16 align-middle me-2"></i>
                        {loading ? (
                          <Spinner className="ms-2" color="light" size="sm" />
                        ) : (
                          "Save As Draft"
                        )}
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Jobs)

Jobs.propTypes = {
  history: PropTypes.object,
}
