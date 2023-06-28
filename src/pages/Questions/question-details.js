import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Form,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/BackButtonBreadcrumb"
import "react-datepicker/dist/react-datepicker.css"
import {
  getQuestions as onGetQuestions,
  deleteQuestion as onDeleteQuestion,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"
import QuestionList from "components/Custom/QuestionList"

const Questions = props => {
  const navigate = useNavigate()
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

  const { loading, questions } = useSelector(state => ({
    loading: state.questions.loading,
    questions: state.questions?.questions,
  }))
  let chapterQuestions = questions?.map(question => {
    const quest = {}
    quest.question = question ? JSON.parse(question?.question) : ""
    quest.id = question?._id
    return quest
  })

  const handleDeleteButton = id => {
    dispatch(onDeleteQuestion(id))
    setTimeout(() => {
      dispatch(onGetQuestions("chapters", params.id))
    }, 1000)
  }

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
              name="Back to Create Course"
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
                {!loading &&
                  chapterQuestions?.map((quest, index) => {
                    if (quest.id) {
                      const { question } = quest
                      question.questionId = quest.id
                      return (
                        question.question && (
                          <QuestionList
                            question={question}
                            key={index}
                            index={index}
                            handleDeleteButton={handleDeleteButton}
                          />
                        )
                      )
                    }
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
