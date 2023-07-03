import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
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
import Breadcrumbs from "../../components/Common/BackButtonBreadcrumb"
import CheckBox from "./CheckBox"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-datepicker/dist/react-datepicker.css"
import {
  getQuestionDetail as onGetQuestionDetail,
  addNewQuestion as onAddNewQuestion,
  updateQuestion as onUpdateQuestion,
  getQuestionDetailSuccess as onGetQuestionDetailSuccess,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"
import arrowRight from "../../assets/images/icons/arrowRightColored.svg"

const Questions = props => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const [editQuestion, setEditQuestion] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [questions, setQuestions] = useState([])
  const [form, setForm] = useState(true)
  const options = ["A", "B", "C", "D"]

  console.log("param", params)

  document.title = `${
    isEdit ? "Edit Question" : "Create New Question"
  } | QAPRENEUR`

  useEffect(() => {
    setEditQuestion({})
    const currentLocation = props.router.location.pathname
    const status = currentLocation.includes("questions-edit")
    setIsEdit(status)
    if (status && params?.id) {
      dispatch(onGetQuestionDetail(params.id))
    } else dispatch(onGetQuestionDetailSuccess())
  }, [params.id])

  const { loading, questionDetail } = useSelector(state => ({
    loading: state.questions.loading,
    questionDetail: state.questions?.questionDetail,
  }))

  if (Object.keys(editQuestion).length === 0 && !loading) {
    if (questionDetail) {
      const { question } = questionDetail
      question && setEditQuestion(JSON.parse(question))
    }
  }

  useEffect(() => {
    if (questionDetail) {
      if (questionDetail.questions) {
        const ques = questionDetail.questions.map(question => {
          const que = JSON.parse(question.question)
          que.questionId = question._id
          return que
        })
        setQuestions(ques)
      }
    }
  }, [questionDetail])

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: editQuestion?.question || "",
      A: editQuestion?.A || "",
      B: editQuestion?.B || "",
      C: editQuestion?.C || "",
      D: editQuestion?.D || "",
      answer: editQuestion?.answer,
      questionId: editQuestion?.questionId,
      description: editQuestion.description,
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Please Enter Question "),
      A: Yup.string().required("Please Enter option 1"),
      B: Yup.string().required("Please Enter option 2"),
      C: Yup.string().required("Please Enter option 3"),
      D: Yup.string().required("Please Enter option 4"),
      answer: Yup.string().required("Please Select Question Answer"),
    }),
    onSubmit: (values, { resetForm, setFieldValue }) => {
      if (isEdit) {
        // dispatch(
        //   onUpdateQuestion(
        //     values,
        //     editQuestion?.questionId,
        //     params.router.navigate,
        //     params.type
        //   )
        // )
      } else {
        const newQuestion = {
          question: values.question,
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
          answer: values.answer,
          description: values.description,
        }

        setQuestions([...questions, newQuestion])
        const answer = values.answer
        resetForm()

        setFieldValue("answer", "")
      }
    },
  })

  const { setFieldValue } = validation

  const handleButtonClick = async (e, status, validation) => {
    e.preventDefault()

    const values = validation.values

    await validation.handleSubmit()
    if (!isEdit && validation.isValid) {
      setForm(false)
      const newQuestion = {
        question: values.question,
        A: values.A,
        B: values.B,
        C: values.C,
        D: values.D,
        answer: values.answer,
        description: values.description,
      }

      const totalQuestion = [...questions, newQuestion]

      if (!isEdit) {
        dispatch(
          onAddNewQuestion(
            { questions: JSON.stringify(totalQuestion) },
            navigate,
            params?.id,
            params.type,
            params?.courseId,
            params?.chapterId
          )
        )
      }
    } else {
      console.log("pupdate", params)
      dispatch(
        onUpdateQuestion(
          { question: JSON.stringify(validation.values) },
          params.id,
          navigate,
          params.type
        )
      )
    }
  }
  const handleDeleteQuestion = index => {
    questions.splice(index, 1)
    setQuestions(questions)
  }

  const submitQuestion = (e, submitProp, validation) => {
    let obj = validation.values
    let requiredFields = ["question", "A", "B", "C", "D", "answer"]
    let isEmptyFields = requiredFields.every(field => {
      return obj.hasOwnProperty(field) && obj[field]
    })
    if (isEmptyFields) handleButtonClick(e, submitProp, validation)
  }

  console.log(validation)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Breadcrumbs
              title="Questions"
              navigate="/questions-list"
              breadcrumbItem={`${isEdit ? "Edit Question" : "Create Question"}`}
              // breadcrumbItem={(
              //   <Link
              //     className="btn_view_all"
              //     to=""
              //   >
              //     <img src={arrowRight} height="10" width="10" /> &nbsp;
              //     View All Jobs
              //   </Link>
              // )}
            />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {questions.map((question, key) => {
                      return (
                        <Row key={key} className="justify-content-center">
                          <Col lg="6">
                            <div className="d-block w-100 text-center mb-3">
                              <Label
                                htmlFor="formrow-name-Input"
                                className="justify-content-center question_number"
                              >
                                Question {key + 1}
                                <span className="required_star">*</span>
                                <Button
                                  type="button"
                                  className="btn btn-danger position-absolute end-0"
                                  onClick={() => handleDeleteQuestion(key)}
                                >
                                  {/* <i className="mdi mdi-delete font-size-16 align-middle me-2"></i> */}
                                  {loading ? (
                                    <Spinner
                                      className="ms-2"
                                      // color="light"
                                      size="sm"
                                    />
                                  ) : (
                                    "Delete"
                                  )}
                                </Button>
                              </Label>
                            </div>

                            <div className="mb-3 justify-content-center">
                              <label className="form-label form-label">
                                Question Title
                              </label>
                              <textarea
                                name="question"
                                type="text"
                                className="form-control question_option_input"
                                id="formrow-name-Input"
                                placeholder="Enter Question"
                                value={question.question || ""}
                                disabled
                                minLength={12}
                              />
                            </div>

                            <Card style={{ backgroundColor: "#E9ECEF" }}>
                              <CardBody>
                                <Row className="justify-content-center align-items-center mb-3">
                                  <Col lg="11">
                                    <div>
                                      <Input
                                        name="A"
                                        type="text"
                                        className="form-control question_option_input"
                                        id="formrow-name-Input"
                                        placeholder="Option - 1"
                                        value={question.A || ""}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="1">
                                    <div className="form-check mb-2">
                                      <input
                                        className="form-check-input question_option_radio"
                                        type="radio"
                                        value="A"
                                        checked={question.answer === "A"}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="justify-content-center align-items-center mb-3">
                                  <Col lg="11">
                                    <div>
                                      <Input
                                        name="B"
                                        type="text"
                                        className="form-control question_option_input"
                                        id="formrow-name-Input"
                                        placeholder="Option - 2"
                                        value={question.B || ""}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="1">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input question_option_radio"
                                        type="radio"
                                        id="exampleRadios1"
                                        checked={question.answer === "B"}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="justify-content-center align-items-center mb-3">
                                  <Col lg="11">
                                    <div>
                                      <Input
                                        name="C"
                                        type="text"
                                        className="form-control question_option_input"
                                        id="formrow-name-Input"
                                        placeholder="Option - 3"
                                        value={question.C || ""}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="1">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input question_option_radio"
                                        type="radio"
                                        id="exampleRadios1"
                                        checked={question.answer === "C"}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="justify-content-center align-items-center mb-3">
                                  <Col lg="11">
                                    <div>
                                      <Input
                                        name="D"
                                        type="text"
                                        className="form-control question_option_input"
                                        id="formrow-name-Input"
                                        placeholder="Option - 4"
                                        value={question.D || ""}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                  <Col lg="1">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input question_option_radio"
                                        type="radio"
                                        id="exampleRadios1"
                                        checked={question.answer === "D"}
                                        disabled
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>

                            <div className="mb-3 justify-content-center">
                              <label className="form-label form-label">
                                Description
                              </label>
                              <textarea
                                name="description"
                                type="text"
                                className="form-control question_option_input"
                                id="formrow-name-Input"
                                placeholder="Description"
                                value={question.description || ""}
                                disabled
                                minLength={12}
                              />
                            </div>
                          </Col>
                        </Row>
                      )
                    })}

                    {form && (
                      <>
                        <Row className="justify-content-center">
                          <Col lg="6">
                            <div className="d-block w-100 text-center mb-3">
                              <Label
                                htmlFor="formrow-name-Input"
                                className="justify-content-center question_number"
                              >
                                Question
                                {/* <span className="required_star">*</span> */}
                              </Label>
                            </div>

                            <div className="mb-3 justify-content-center mb-4">
                              <label className="form-label form-label">
                                Question Title
                              </label>
                              <textarea
                                name="question"
                                type="text"
                                className={`form-control custom_form_control ${
                                  validation.touched.question &&
                                  validation.errors.question
                                    ? "is-invalid"
                                    : ""
                                }`}
                                id="formrow-name-Input"
                                placeholder="Enter Question"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.question || ""}
                              />
                              {validation.touched.question &&
                              validation.errors.question ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.question}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <Card
                              style={{
                                backgroundColor: "#E9ECEF",
                                padding: 5,
                                borderRadius: 5,
                                marginBottom: 15,
                              }}
                            >
                              <div className="lbl_question_container justify-content-between align-items-center d-flex mx-3 pt-3 pb-2">
                                <label className="mb-0 lbl_question_options">
                                  Question Options
                                </label>
                                <label className="mb-0 lbl_question_options">
                                  Correct Answer
                                </label>
                              </div>
                              <CardBody>
                                {options.map((option, index) => (
                                  <Row
                                    key={index}
                                    className="justify-content-center align-items-center mb-3"
                                  >
                                    <Col lg="11">
                                      <div>
                                        <Input
                                          name={option}
                                          type="text"
                                          className="form-control question_option_input"
                                          id="formrow-name-Input"
                                          placeholder={`Option - ${index + 1}`}
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values[option] || ""
                                          }
                                          invalid={
                                            validation.touched[option] &&
                                            validation.errors[option]
                                              ? true
                                              : false
                                          }
                                        />
                                        {validation.touched[option] &&
                                        validation.errors[option] ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors[option]}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col lg="1">
                                      <CheckBox
                                        setFieldValue={setFieldValue}
                                        validation={validation}
                                        option={option}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                              </CardBody>
                            </Card>

                            <div className="mb-3 justify-content-center mb-4">
                              <textarea
                                name="description"
                                type="text"
                                id="formrow-name-Input"
                                placeholder="Answer Description"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.description || ""}
                              />
                            </div>
                          </Col>
                        </Row>

                        {!isEdit && (
                          <Row className="justify-content-center">
                            <Col className=" d-flex" lg={6}>
                              <Button
                                type="submit"
                                color=""
                                disabled={loading}
                                className="ms-4 btn btn-outline-primary"
                              >
                                <i className="bx bx-save font-size-16 align-middle me-2"></i>
                                {loading ? (
                                  <Spinner
                                    className="ms-2"
                                    color="light"
                                    size="sm"
                                  />
                                ) : (
                                  "Add New Question"
                                )}
                              </Button>
                            </Col>
                          </Row>
                        )}
                      </>
                    )}
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
                    {/* {!isEdit && ( */}
                    <Button
                      onClick={e => navigate(-1)}
                      type="button"
                      color=""
                      disabled={loading}
                      className="btn btn-outline-primary btn_outline_bgwhite me-3"
                    >
                      Cancel
                    </Button>
                    {/* )} */}
                    <Button
                      onClick={e => submitQuestion(e, "submit", validation)}
                      type="submit"
                      color="primary"
                      disabled={loading}
                      className="global_btn"
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      {loading ? (
                        <Spinner className="ms-2" color="light" size="sm" />
                      ) : isEdit ? (
                        "Save Question "
                      ) : (
                        "Create Question"
                      )}
                    </Button>
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

export default withRouter(Questions)

Questions.propTypes = {
  history: PropTypes.object,
}
