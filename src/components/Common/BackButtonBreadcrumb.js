import React from "react"
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const ButtonBreadcrumb = props => {
  const navigate = useNavigate()
  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          {/* <h4 className="mb-sm-0 font-size-18">{props.breadcrumbItem}</h4> */}
          {/* <Link to={props.back}> */}
          <p style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            <i className="mdi mdi-arrow-left  " id="edittooltip" />
            {props.name}
          </p>
          {/* </Link> */}
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <Link to={props.navigate}>{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.breadcrumbItem}</BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

ButtonBreadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
}

export default ButtonBreadcrumb
