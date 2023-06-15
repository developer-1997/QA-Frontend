import PropTypes from "prop-types"
import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"
import { Col, Container, Row, CardBody } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "../../../components/Common/TableContainer"
import { jobCreateActionPermission } from "../../../helpers/roles_permissions"
import {
  logoutUser as onLogoutUser,
  getJobs as onGetJobs,
  updateJob as onUpdateJob,
  deleteJob as onDeleteJob,
} from "../../../store/actions"
import {
  JobTitle,
  DateFormate,
  Status,
  Action,
  StatusChangeToggle,
  ViewAction,
} from "./JobListCol"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const JobsList = props => {
  const staticURL = process.env.REACT_APP_STATIC_URL
  document.title = "Job List | QAPRENEUR"
  const role = localStorage.getItem("authRole")
  const history = useNavigate()
  const dispatch = useDispatch()
  const [job, setJob] = useState()

  const { jobs, loading } = useSelector(state => ({
    jobs: state?.jobs?.jobs,
    loading: state?.jobs?.loading,
  }))

  const [jobList, setJobList] = useState([])

  const onClickEdit = job => {
    props.router.navigate(`/jobs-edit/${job._id}`)
  }

  const [deleteModal, setDeleteModal] = useState(false)
  const onClickDelete = job => {
    setJob(job)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (job && job._id) {
      dispatch(onDeleteJob(job._id))
    }
    setDeleteModal(false)
  }

  useEffect(() => {
    console.log("calling")
    dispatch(onGetJobs())
  }, [dispatch])

  useEffect(() => {
    setJobList(jobs)
  }, [jobs])

  useEffect(() => {
    if (!isEmpty(jobs)) {
      setJobList(jobs)
    }
  }, [jobs])

  const handleChangeStatus = job => {
    const status = job.status === "active" ? "deactive" : "active"
    dispatch(onUpdateJob({ status }, job._id, props.router.navigate))
    setTimeout(() => {
      dispatch(onLogoutUser(history))
    }, 1000)
  }

  let columns = useMemo(
    () => [
      {
        Header: "##",
        accessor: "index",
        Cell: key => {
          console.log(key)
          // return cellProps.value
        },
      },
      {
        Header: "Job Title",
        accessor: "jobTitle",
        Cell: cellProps => {
          return <JobTitle {...cellProps} />
        },
      },
      {
        Header: "Employment Type",
        accessor: "type",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Salary Range",
        accessor: "salaryRange",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Experience",
        accessor: "experience",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Applicant",
        accessor: "",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Posted On",
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
            <>
              {jobCreateActionPermission.includes(role) ? (
                <Action
                  cellProps={cellProps}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              ) : (
                <ViewAction
                  cellProps={cellProps}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              )}
            </>
          )
        },
      },
    ],
    []
  )

  columns = columns.filter(column => {
    if (column.Header != "Active/Deactive") {
      return column
    }
    if (
      column.Header === "Active/Deactive" &&
      jobCreateActionPermission.includes(role)
    ) {
      return column
    }
  })

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        title="Are you sure you want to permanently erase the job."
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Jobs" breadcrumbItem="Jobs List" />
          <Row>
            <Col lg="12">
              {jobCreateActionPermission.includes(role) && (
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1"></h5>
                    <div className="flex-shrink-0">
                      <Link to="/jobs-create" className="btn btn-primary me-1">
                        <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                        Add New Job
                      </Link>
                    </div>
                  </div>
                </CardBody>
              )}
              <div>
                <TableContainer
                  loading={loading}
                  columns={columns}
                  data={jobs}
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

export default withRouter(JobsList)

JobsList.propTypes = {
  history: PropTypes.object,
}
