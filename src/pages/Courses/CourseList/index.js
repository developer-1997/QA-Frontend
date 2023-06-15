import PropTypes from "prop-types"
import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"
import { Col, Container, Row, CardBody } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "../../../components/Common/TableContainer"
import {
  getCourses as onGetCourses,
  updateCourse as onUpdateCourse,
  deleteCourse as onDeleteCourse,
} from "../../../store/actions"
import {
  Name,
  CourseId,
  DateFormate,
  Status,
  Action,
  StatusChangeToggle,
} from "./CourseListCol"

import { useSelector, useDispatch } from "react-redux"

const CoursesList = props => {
  const staticURL = process.env.REACT_APP_STATIC_URL
  document.title = "Course List | QAPRENEUR"

  const dispatch = useDispatch()
  const [course, setCourse] = useState()

  const { courses, loading } = useSelector(state => ({
    courses: state?.courses?.courses,
    loading: state?.courses?.loading,
  }))

  const [courseList, setCourseList] = useState([])

  const onClickEdit = course => {
    // props.router.navigate(`/courses-edit/${course._id}`)
  }

  const [deleteModal, setDeleteModal] = useState(false)
  const onClickDelete = course => {
    setCourse(course)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (course && course._id) {
      dispatch(onDeleteCourse(course._id))
    }
    setDeleteModal(false)
  }

  useEffect(() => {
    dispatch(onGetCourses())
  }, [dispatch])

  useEffect(() => {
    setCourseList(courses)
  }, [courses])

  useEffect(() => {
    if (!isEmpty(courses)) {
      setCourseList(courses)
    }
  }, [courses])

  const handleChangeStatus = course => {
    const status = course.status === "active" ? "deactive" : "active"
    dispatch(onUpdateCourse({ status }, course._id, props.router.navigate))
  }

  const columns = useMemo(
    () => [
      {
        Header: "#",
      },
      {
        Header: "Name",
        accessor: "image",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => <Name {...cellProps} />,
      },
      {
        Header: "Duration",
        accessor: "courseDuration",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Created Date",
        accessor: "createdAt",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              <DateFormate {...cellProps} />
            </>
          )
        },
      },
      {
        Header: "Status",
        accessor: "status",
        disableFilters: true,
        Cell: cellProps => {
          return <Status {...cellProps} />
        },
      },
      {
        Header: "Active/Deactive",
        Cell: cellProps => {
          return (
            <StatusChangeToggle
              cellProps={cellProps}
              handleChangeStatus={handleChangeStatus}
            />
          )
        },
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <Action
              cellProps={cellProps}
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
            />
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        title="Are you sure you want to permanently erase the course."
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Courses"
            navigate="/courses-list"
            breadcrumbItem="Courses List"
          />
          <Row>
            <Col lg="12">
              <CardBody className="border-bottom">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0 card-title flex-grow-1"></h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="/courses-create"
                      className="btn btn-primary global_btn me-1"
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      Add New Course
                    </Link>
                  </div>
                </div>
              </CardBody>
              <div>
                <TableContainer
                  loading={loading}
                  columns={columns}
                  data={courses}
                  isGlobalFilter={true}
                  isAddOptions={false}
                  isJobListGlobalFilter={false}
                  customPageSize={10}
                  className="project-list-table table-nowrap align-middle table-borderless"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(CoursesList)

CoursesList.propTypes = {
  history: PropTypes.object,
}
