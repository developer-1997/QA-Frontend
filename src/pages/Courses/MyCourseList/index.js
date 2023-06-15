import React, { useState } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Collapse,
  Label,
  Input,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import List from "./List"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const MyCourseList = () => {
  document.title = "My Course List | QAPRENEUR"

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [selectDate, setSelectDate] = useState()
  const dateChange = date => {
    setSelectDate(date)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Course" breadcrumbItem="My Course List" />

          <Row>
            <Col lg={12}>
              {/* <Card className="job-filter">
                <CardBody> */}
              <form action="#">
                <Row className="g-3">
                  <Col xxl={3} lg={3}>
                    <div className="course-search">
                      <Input
                        type="text"
                        className="form-control"
                        id="searchJob"
                        autoComplete="off"
                        placeholder="Search your Course"
                      />
                    </div>
                  </Col>
                </Row>
              </form>
              {/* </CardBody>
              </Card> */}
            </Col>
          </Row>

          <List />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default MyCourseList
