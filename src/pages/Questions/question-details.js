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
  Spinner,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-datepicker/dist/react-datepicker.css"
import {
  getQuestions as onGetQuestions,
  getQuestionDetail as onGetQuestionDetail,
  getQuestionDetailSuccess as onGetQuestionDetailSuccess,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"

const Questions = props => {
  const dispatch = useDispatch()
  const params = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [moduleName, setModuleName] = useState("")
  // const [chapterQuestions, setChapterQuestions] = useState([])
  document.title = `${
    isEdit ? `Edit Question Module - ${moduleName}` : "Create New Question"
  } | QAPRENEUR`

  useEffect(() => {
    const currentLocation = props.router.location.pathname
    const status = currentLocation.includes("questions-edit")
    setIsEdit(status)
    if (params?.id) dispatch(onGetQuestions("chapters", params.id))
    if (!moduleName) setModuleName(params.name)
  }, [])

  const { loading, testDetail, questions } = useSelector(state => ({
    loading: state.tests.loading,
    testDetail: state.tests?.testDetail,
    questions: state.questions?.questions,
  }))
  console.log(questions)
  const chapterQuestions = questions?.map(question => {
    const quest = {}
    quest.question = JSON.parse(question?.question)
    quest.id = question?._id
    return quest
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Form>
            <Breadcrumbs
              title="Questions"
              navigate="/tests-list"
              breadcrumbItem={`${
                isEdit
                  ? `Edit Question Module - ${moduleName}`
                  : "Create Question"
              }`}
            />
            <Card style={{ borderColor: "#CED4DA", borderWidth: 1.5 }}>
              <CardHeader style={{ backgroundColor: "#E0E5FA" }}>
                <Row>
                  {!isEdit ? (
                    <Col className="justify-content-end d-flex">
                      <Link className="btn btn-outline-primary">
                        <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                        Add Questions
                      </Link>
                    </Col>
                  ) : (
                    <Col className="justify-content-end d-flex">
                      <Link className="btn btn-outline-primary">
                        <i className="bx bx-pencil   font-size-16 align-middle me-2"></i>
                        Edit
                      </Link>
                    </Col>
                  )}
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#F2F2F2" }}>
                {chapterQuestions?.map((quest, index) => {
                  const {
                    question: { answer, question },
                    id,
                  } = quest

                  return (
                    <Card key={index} style={{ marginBottom: 10 }}>
                      <CardBody style={{ padding: "12px 20px" }}>
                        <Row>
                          <Col
                            lg="6"
                            className="justify-content-left d-flex question_text"
                          >
                            {`${index + 1}. ${question}`}
                          </Col>
                          <Col
                            lg="6"
                            className="justify-content-end d-flex question_answer px-lg-0"
                          >
                            {`Answer : ${answer}`}
                            <Link
                              to={`/questions-edit/chapter/${id}`}
                              className="text-muted font-weight-bold px-2 ms-3"
                            >
                              <i className="bx bx-pencil font-size-16 align-middle ml-2"></i>
                            </Link>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  )
                })}
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
