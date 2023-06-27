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
  Input,
  Label,
  Row,
  Form,
  FormFeedback,
  Spinner,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-datepicker/dist/react-datepicker.css"
import {
  getCourseDetail as onGetCourseDetail,
  addNewCourse as onAddNewCourse,
  addNewChapter as onAddNewChapter,
  updateCourse as onUpdateCourse,
  deleteChapter as onDeleteChapter,
  getCourseDetailSuccess as onGetCourseDetailSuccess,
} from "../../store/actions"
import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"
import toastr from "toastr"

const Courses = props => {
  const staticURL = process.env.REACT_APP_STATIC_URL
  const dispatch = useDispatch()
  const params = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [selectedFiles, setselectedFiles] = useState([])

  document.title = `${isEdit ? "Edit Course" : "Create New Course"} | QAPRENEUR`

  useEffect(() => {
    const currentLocation = props.router.location.pathname
    const status = currentLocation.includes("courses-edit")
    setIsEdit(status)
    console.log(params.id)
    if (status && params?.id) dispatch(onGetCourseDetail(params.id))
    else dispatch(onGetCourseDetailSuccess())
  }, [])

  const { error, loading, courseDetail } = useSelector(state => ({
    error: state?.courseCategories?.error?.response?.data?.message,
    loading: state.courses.loading,
    courseDetail: state.courses?.courseDetail,
  }))

  function handleAcceptedFiles(files) {
    validation.setFieldValue("image", files[0])
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      courseName: courseDetail?.courseName || "",
      courseDuration: courseDetail?.courseDuration || "",
      description: courseDetail?.description || "",
      image: courseDetail?.image || "",
      status: courseDetail?.status || "",
      type: courseDetail?.type || "",
      price: courseDetail?.price || "",
    },
    validationSchema: Yup.object({
      courseName: Yup.string().required("Please Enter Course Name"),
      status: Yup.mixed()
        .oneOf(["active", "deactive"])
        .required("Please Select Course Status"),
      courseDuration: Yup.number().required("Please Enter Course Duration"),
      type: Yup.mixed()
        .oneOf(["free", "paid"])
        .required("Please Select Course Type"),
      price: Yup.string().required("Please Enter Course Price"),
    }),
    onSubmit: values => {
      if (isEdit)
        dispatch(
          onUpdateCourse(values, courseDetail._id, props.router.navigate)
        )
      else dispatch(onAddNewCourse(values, props.router.navigate))
    },
  })

  const chapterValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      document: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Module Name"),
    }),
    onSubmit: values => {
      if (!courseDetail?._id) {
        // toastr.error("Please Add Course First")
        validation.handleSubmit()
        return
      }
      dispatch(
        onAddNewChapter(values, courseDetail?._id, props.router.navigate)
      )
    },
  })

  const { setFieldValue } = chapterValidation

  const handleButtonClick = (e, type, { handleSubmit, setFieldValue }) => {
    e.preventDefault()
    if (type === "draft") setFieldValue("status", "deactive")
    handleSubmit()
    return false
  }

  const handleDeleteModule = chapterId => {
    dispatch(
      onDeleteChapter(chapterId, courseDetail?._id, props.router.navigate)
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Form>
            <Breadcrumbs
              title="Courses"
              navigate="/courses-list"
              breadcrumbItem={`${isEdit ? "Edit Course" : "Create Course"}`}
            />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="6">
                        <div className="mb-3">
                          <Label htmlFor="formrow-name-Input">
                            Course name
                            <span className="required_star">*</span>
                          </Label>
                          <Input
                            name="courseName"
                            type="text"
                            className="form-control custom_form_control"
                            id="formrow-name-Input"
                            placeholder="Enter Course Name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.courseName || ""}
                            invalid={
                              validation.touched.courseName &&
                              validation.errors.courseName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.courseName &&
                          validation.errors.courseName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.courseName}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div>
                          <Label>
                            Duration<span className="required_star">*</span>
                          </Label>
                          <Input
                            name="courseDuration"
                            id="status1"
                            type="number"
                            className="form-control custom_form_control"
                            placeholder="Enter course Duration"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.courseDuration || ""}
                            invalid={
                              validation.touched.courseDuration &&
                              validation.errors.courseDuration
                                ? true
                                : false
                            }
                          />
                          {validation.touched.courseDuration &&
                          validation.errors.courseDuration ? (
                            <FormFeedback type="invalid">
                              {validation.errors.courseDuration}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3 mt-3">
                          <Label htmlFor="status-input" className="form-label">
                            Status
                          </Label>
                          <Input
                            name="status"
                            id="status-input"
                            type="select"
                            className="form-select custom_form_control"
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
                      <Col lg="6">
                        <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                          <label className="control-label">Upload Image</label>
                          <Dropzone
                            maxFiles={1}
                            onDrop={acceptedFiles => {
                              handleAcceptedFiles(acceptedFiles)
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick mt-2"
                                  {...getRootProps()}
                                >
                                  <input name="image" {...getInputProps()} />
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {selectedFiles.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              )
                            })}

                            {courseDetail?.image &&
                              selectedFiles.length == 0 && (
                                <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          src={staticURL + courseDetail.image}
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              )}
                          </div>
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
                          <Label htmlFor="status-input" className="form-label">
                            Select Course Type
                          </Label>
                          <Input
                            name="type"
                            id="status-input"
                            type="select"
                            className="form-select custom_form_control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.type || ""}
                            invalid={
                              validation.touched.type && validation.errors.type
                                ? true
                                : false
                            }
                          >
                            <option>Select Course Type</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                          </Input>
                          {validation.touched.type && validation.errors.type ? (
                            <FormFeedback type="invalid">
                              {validation.errors.type}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label htmlFor="formrow-passingMark-Input">
                            Course price<span className="required_star">*</span>
                          </Label>
                          <Input
                            name="price"
                            type="Number"
                            className="form-control custom_form_control"
                            id="formrow-passingMark-Input"
                            placeholder="Enter course Price"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.price || ""}
                            invalid={
                              validation.touched.price &&
                              validation.errors.price
                                ? true
                                : false
                            }
                          />
                          {validation.touched.price &&
                          validation.errors.price ? (
                            <FormFeedback type="invalid">
                              {validation.errors.price}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>

          <Card className="add_module">
            <CardBody className="add_module">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Add Module</h3>
                {/* <Button
                  onClick={e => handleAddModuleButtonClick(e)}
                  type="button"
                  color="primary"
                  className="global_btn"
                >
                  <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                  Add New Module
                </Button> */}
              </div>
              {courseDetail?.chapters?.map((chapter, index) => {
                return (
                  <div key={index} className="accordion" id="accordionExample">
                    <div className="accordion-item mb-3">
                      <div className="accordion-header">
                        <div
                          className="accordion-button position-relative"
                          type="button"
                          data-bs-target={`#collapseExample${index}`}
                          data-bs-toggle="collapse"
                          aria-expanded="true"
                        >
                          <span>Module </span>
                          <Button
                            onClick={() => handleDeleteModule(chapter._id)}
                            type="button"
                            color="btn btn-outline-danger acc_header_btn"
                            className="me-3 d-flex position-absolute py-1"
                          >
                            <i className="bx bx-trash font-size-16 align-middle me-1"></i>
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div
                        id={`collapseExample${index}`}
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <Label htmlFor="name">
                                  Module name
                                  <span className="required_star">*</span>
                                </Label>
                                <Input
                                  name="name"
                                  type="text"
                                  className="form-control custom_form_control"
                                  id="name"
                                  placeholder="Enter Module Name"
                                  value={chapter.name}
                                  disabled
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="mb-3">
                                <Label htmlFor="document" className="invisible">
                                  ""
                                </Label>
                                <Input
                                  type="file"
                                  className="form-control custom_input custom_form_control"
                                  id="document"
                                  placeholder="Enter Course Name"
                                  multiple
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex">
                                <Button
                                  type="button"
                                  color="primary"
                                  className="me-3 global_btn"
                                  onClick={() =>
                                    props.router.navigate(
                                      `/questions-create/chapter/${courseDetail._id}/${chapter._id}`
                                    )
                                  }
                                >
                                  <i className="bx bx-plus-circle font-size-16 align-middle me-1"></i>
                                  Add Test
                                </Button>

                                <Button
                                  type="button"
                                  color="primary"
                                  className="global_btn"
                                  onClick={() =>
                                    props.router.navigate(
                                      `/questions-edit/chapters/${chapter.name}/${chapter._id}`
                                    )
                                  }
                                >
                                  <i className="bx bx-show-alt font-size-16 align-middle me-1"></i>
                                  View Test
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <Form
                onSubmit={e => {
                  e.preventDefault()
                  chapterValidation.handleSubmit()
                  return false
                }}
              >
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item mb-3">
                    <div className="accordion-header">
                      <div
                        className="accordion-button position-relative"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="true"
                      >
                        <span>Module </span>
                      </div>
                    </div>
                    <div
                      id="collapseExample"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <Label htmlFor="name">
                                Module name
                                <span className="required_star">*</span>
                              </Label>
                              <Input
                                name="name"
                                type="text"
                                className="form-control custom_form_control"
                                id="name"
                                placeholder="Enter Module Name"
                                onChange={chapterValidation.handleChange}
                                onBlur={chapterValidation.handleBlur}
                                value={chapterValidation.values.name || ""}
                                invalid={
                                  chapterValidation.touched.name &&
                                  chapterValidation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {chapterValidation.touched.name &&
                              chapterValidation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {chapterValidation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <Label htmlFor="document" className="invisible">
                                ""
                              </Label>
                              <Input
                                name="document"
                                type="file"
                                className="form-control custom_input custom_form_control"
                                id="document"
                                placeholder="Enter Course Name"
                                multiple
                                onChange={event => {
                                  const files = Array.from(event.target.files)
                                  setFieldValue("document", files)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex">
                              <Button
                                type="submit"
                                color="primary"
                                className="me-3 global_btn"
                              >
                                <i className="bx bx-plus-circle font-size-16 align-middle me-1"></i>
                                Save Chapter
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Row className="justify-content-center">
                <Col
                  className="justify-content-center d-flex"
                  xs="8"
                  sm={12}
                  md={12}
                >
                  <Button
                    onClick={e => handleButtonClick(e, "submit", validation)}
                    type="button"
                    color="primary"
                    className="global_btn"
                    disabled={loading}
                  >
                    <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                    {loading ? (
                      <Spinner className="ms-2" color="light" size="sm" />
                    ) : isEdit ? (
                      "Save Course"
                    ) : (
                      "Create Course"
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Courses)

Courses.propTypes = {
  history: PropTypes.object,
}
