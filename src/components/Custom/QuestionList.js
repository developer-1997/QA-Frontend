import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap"

const QuestionList = props => {
  const {
    index,
    question: { question, answer, questionId },
  } = props
  return (
    <Card style={{ marginBottom: 10 }}>
      <CardBody style={{ padding: "12px 20px" }}>
        <Row>
          <Col lg="6" className="justify-content-left d-flex question_text">
            {`${index + 1}. ${question}`}
          </Col>
          <Col
            lg="6"
            className="justify-content-end d-flex question_answer px-lg-0"
          >
            {`Answer : ${answer}`}
            <Link
              to={`/questions-edit/test/${questionId}`}
              className="text-muted font-weight-bold px-2 ms-3"
            >
              <i
                className="mdi mdi-pencil edit_blue_icon font-size-15"
                id="edittooltip"
              />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>

            <Link onClick={() => props.handleDeleteButton(questionId)}>
              <i
                className="mdi mdi-delete delete_red_icon font-size-15"
                id="deletetooltip"
              />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default QuestionList
