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
  CardHeader,
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
  getTestCategories as onGetTestCategories,
  getTestDetail as onGetTestDetail,
  addNewTest as onAddNewTest,
  updateTest as onUpdateTest,
  deleteQuestion as onDeleteQuestion,
  getTestDetailSuccess as onGetTestDetailSuccess,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import { map } from "lodash"
import withRouter from "components/Common/withRouter"
import QuestionList from "components/Custom/QuestionList"

const Tests = props => {
  const staticURL = process.env.REACT_APP_STATIC_URL
  const dispatch = useDispatch()
  const params = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedFiles, setselectedFiles] = useState([])
  document.title = `${isEdit ? "Edit Test" : "Create New Test"} | QAPRENEUR`

  useEffect(() => {
    dispatch(onGetTestCategories())
  }, [dispatch])

  useEffect(() => {
    const currentLocation = props.router.location.pathname
    const status = currentLocation.includes("tests-edit")
    setIsEdit(status)
    if (status && params?.id) dispatch(onGetTestDetail(params.id))
    else dispatch(onGetTestDetailSuccess())
  }, [])

  const { testCategories, loading, testDetail } = useSelector(state => ({
    testCategories: state.testCategories.testCategories,
    loading: state.tests.loading,
    testDetail: state.tests?.testDetail,
  }))

  useEffect(() => {
    if (isEdit && testDetail) {
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
      name: testDetail?.name || "",
      testCategoryId: testDetail?.testCategoryId || "",
      duration: testDetail?.duration || "",
      description: testDetail?.description || "",
      image: testDetail?.image || "",
      passingMark: testDetail?.passingMark || "",
      status: testDetail?.status || "",
      type: testDetail?.type || "",
      price: testDetail?.price || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Test Name"),
      testCategoryId: Yup.string().required("Please Select Test Category"),
      status: Yup.mixed()
        .oneOf(["active", "deactive"])
        .required("Please Select Test Status"),
      duration: Yup.string().required("Please Select Test Duration"),
      passingMark: Yup.string().required("Please Enter Passing Marks"),
      type: Yup.mixed()
        .oneOf(["free", "paid"])
        .required("Please Select Test Type"),
      price: Yup.string().required("Please Enter Price"),
    }),
    onSubmit: values => {
      values.questions = questions
      if (isEdit)
        dispatch(onUpdateTest(values, testDetail._id, props.router.navigate))
      else dispatch(onAddNewTest(values, props.router.navigate))
    },
  })

  const handleButtonClick = (e, type, { handleSubmit, setFieldValue }) => {
    e.preventDefault()
    if (type === "draft") setFieldValue("status", "deactive")
    handleSubmit()
    return false
  }

  const handleDeleteButton = id => {
    dispatch(onDeleteQuestion(id))
    setTimeout(() => {
      dispatch(onGetTestDetail(testDetail._id))
    }, 1000)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Form>
            <Breadcrumbs
              title="Tests"
              navigate="/tests-list"
              breadcrumbItem={`${isEdit ? "Edit Test" : "Create Test"}`}
            />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg="6">
                        <div className="mb-3">
                          <Label htmlFor="formrow-name-Input">
                            Test Name<span className="required_star">*</span>
                          </Label>
                          <Input
                            name="name"
                            type="text"
                            className="form-control custom_form_control"
                            id="formrow-name-Input"
                            placeholder="Enter Test Name"
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
                        <div className="mb-3">
                          <Label className="form-label">Select Category</Label>
                          <span className="required_star">*</span>

                          <Input
                            name="testCategoryId"
                            type="select"
                            className="form-select custom_form_control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.testCategoryId || ""}
                            invalid={
                              validation.touched.testCategoryId &&
                              validation.errors.testCategoryId
                                ? true
                                : false
                            }
                          >
                            <option>Select Category</option>

                            {testCategories &&
                              map(testCategories, (testCategory, index) => (
                                <option key={index} value={testCategory._id}>
                                  {testCategory.type}
                                </option>
                              ))}
                          </Input>
                          {validation.touched.testCategoryId &&
                          validation.errors.testCategoryId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.testCategoryId}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div>
                          <Label>
                            Duration( minutes)
                            <span className="required_star">*</span>
                          </Label>
                          <Input
                            name="duration"
                            id="status1"
                            type="select"
                            className="form-select custom_form_control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.duration || ""}
                            invalid={
                              validation.touched.duration &&
                              validation.errors.duration
                                ? true
                                : false
                            }
                          >
                            <option value="">Choose </option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                            <option value="120">120</option>
                          </Input>
                          {validation.touched.duration &&
                          validation.errors.duration ? (
                            <FormFeedback type="invalid">
                              {validation.errors.duration}
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

                            {testDetail?.image && selectedFiles.length == 0 && (
                              <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        src={staticURL + testDetail.image}
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
                          <Label htmlFor="formrow-passingMark-Input">
                            Passing Marks
                            <span className="required_star">*</span>
                          </Label>
                          <Input
                            name="passingMark"
                            type="Number"
                            className="form-control custom_form_control"
                            id="formrow-passingMark-Input"
                            placeholder="Enter Passing Marks"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.passingMark || ""}
                            invalid={
                              validation.touched.passingMark &&
                              validation.errors.passingMark
                                ? true
                                : false
                            }
                          />
                          {validation.touched.passingMark &&
                          validation.errors.passingMark ? (
                            <FormFeedback type="invalid">
                              {validation.errors.passingMark}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label htmlFor="status-input" className="form-label">
                            Select Status
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
                    </Row>

                    <Row>
                      <Col lg="6">
                        <div className="mb-3 mt-3">
                          <Label htmlFor="status-input" className="form-label">
                            Select Test Type
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
                            <option>Choose Test Type</option>
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
                            Test Price<span className="required_star">*</span>
                          </Label>
                          <Input
                            name="price"
                            type="Number"
                            className="form-control custom_form_control"
                            id="formrow-passingMark-Input"
                            placeholder="Enter Test Price"
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
            <Card style={{ borderColor: "#CED4DA", borderWidth: 1.5 }}>
              <CardHeader style={{ backgroundColor: "#E0E5FA" }}>
                <Row>
                  {!isEdit ? (
                    <Col className="justify-content-between d-flex">
                      <h5 className="sub_heading mb-0">Question List</h5>
                      <Link
                        onClick={e =>
                          handleButtonClick(e, "submit", validation)
                        }
                        className="btn btn-outline-primary"
                      >
                        <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                        {loading ? (
                          <Spinner className="ms-2" color="light" size="sm" />
                        ) : (
                          "Add Questions"
                        )}
                      </Link>
                    </Col>
                  ) : (
                    <Col className="justify-content-between d-flex">
                      <h5 className="sub_heading mb-0">Question List</h5>
                      <Link
                        to={`/questions-create/test/${testDetail?._id}`}
                        className="btn btn-outline-primary"
                      >
                        <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                        {loading ? (
                          <Spinner className="ms-2" color="light" size="sm" />
                        ) : (
                          "Add Questions"
                        )}
                      </Link>
                    </Col>
                  )}
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#F2F2F2" }}>
                {questions.map((question, index) => {
                  return (
                    <QuestionList
                      question={question}
                      key={index}
                      index={index}
                      handleDeleteButton={handleDeleteButton}
                    />
                  )
                })}
                {!questions.length && (
                  <div className="justify-content-center align-item-center">
                    <h4>No questions found</h4>
                  </div>
                )}
              </CardBody>
            </Card>

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
                      className="global_btn"
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      {loading ? (
                        <Spinner className="ms-2" color="light" size="sm" />
                      ) : isEdit ? (
                        "Save Test"
                      ) : (
                        "Create Test"
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

export default withRouter(Tests)

Tests.propTypes = {
  history: PropTypes.object,
}
