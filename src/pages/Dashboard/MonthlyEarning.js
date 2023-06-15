import React from "react"

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

import Pie from "pages/AllCharts/echart/piechart"

const MonthlyEarning = () => {
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Monthly Earning</CardTitle>
          <Row>
            <Pie dataColors='["--bs-primary","--bs-warning","--bs-info", "--bs-success"]' />
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarning
