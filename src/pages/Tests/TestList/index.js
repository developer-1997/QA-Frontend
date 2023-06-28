import PropTypes from "prop-types"
import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"
import { Col, Container, Row, CardBody } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "../../../components/Common/TableContainer"
import { testCreateActionPermission } from "../../../helpers/roles_permissions"
import {
  logoutUser as onLogoutUser,
  getTests as onGetTests,
  updateTest as onUpdateTest,
  deleteTest as onDeleteTest,
} from "../../../store/actions"
import {
  Name,
  DateFormate,
  Status,
  Action,
  StatusChangeToggle,
  ViewAction,
} from "./TestListCol"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const TestsList = props => {
  document.title = "Test List | QAPRENEUR"
  const role = localStorage.getItem("authRole")
  const history = useNavigate()
  const dispatch = useDispatch()
  const [test, setTest] = useState()

  const { tests, loading } = useSelector(state => ({
    tests: state?.tests?.tests,
    loading: state?.tests?.loading,
  }))

  const [testList, setTestList] = useState([])

  const onClickEdit = test => {
    // props.router.navigate(`/tests-edit/${test._id}`)
  }

  const [deleteModal, setDeleteModal] = useState(false)
  const onClickDelete = test => {
    setTest(test)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (test && test._id) {
      dispatch(onDeleteTest(test._id))
    }
    setDeleteModal(false)
  }

  useEffect(() => {
    dispatch(onGetTests())
  }, [dispatch])

  useEffect(() => {
    setTestList(tests)
  }, [tests])

  useEffect(() => {
    if (!isEmpty(tests)) {
      setTestList(tests)
    }
  }, [tests])

  const handleChangeStatus = test => {
    const status = test.status === "active" ? "deactive" : "active"
    dispatch(onUpdateTest({ status }, test._id, props.router.navigate))
    setTimeout(() => {
      dispatch(onLogoutUser(history))
    }, 1000)
  }

  let columns = useMemo(
    () => [
      {
        Header: "#",
      },
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => <Name {...cellProps} />,
      },
      {
        Header: "Duration(In minutes)",
        accessor: "duration",
        Cell: cellProps => (cellProps.value ? cellProps.value : "NA"),
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
            <>
              {testCreateActionPermission.includes(role) ? (
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
      testCreateActionPermission.includes(role)
    ) {
      return column
    }
  })

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        title="Are you sure you want to permanently erase the test."
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tests" breadcrumbItem="Tests List" />
          <Row>
            <Col lg="12">
              {testCreateActionPermission.includes(role) && (
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1"></h5>
                    <div className="flex-shrink-0">
                      <Link
                        to="/tests-create"
                        className="btn btn-primary global_btn me-1"
                      >
                        <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                        Add New Test
                      </Link>
                    </div>
                  </div>
                </CardBody>
              )}
              <div>
                <TableContainer
                  loading={loading}
                  columns={columns}
                  data={tests}
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

export default withRouter(TestsList)

TestsList.propTypes = {
  history: PropTypes.object,
}
