import PropTypes from "prop-types"
import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "../../../components/Common/TableContainer"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  CardBody,
} from "reactstrap"
import {
  addNewTestCategory as onAddNewTestCategory,
  getTestCategories as onGetTestCategories,
  updateTestCategory as onUpdateTestCategory,
  deleteTestCategory as onDeleteTestCategory,
} from "../../../store/actions"
import {
  Name,
  DateFormate,
  Status,
  Action,
  StatusChangeToggle,
} from "./TestCategoryListCol"

import { useSelector, useDispatch } from "react-redux"

const TestCategoriesList = props => {
  const staticURL = process.env.REACT_APP_STATIC_URL
  document.title = "Test Category List | QAPRENEUR"
  const dispatch = useDispatch()
  const [testCategory, setTestCategory] = useState()
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const toggle = () => {
    if (modal) {
      setModal(false)
      setTestCategory(null)
    } else {
      setModal(true)
    }
  }

  const { testCategories, loading } = useSelector(state => ({
    testCategories: state?.testCategories?.testCategories,
    loading: state?.testCategories?.loading,
  }))

  const [testCategoryList, setTestCategoryList] = useState([])

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      type: (testCategory && testCategory.type) || "",
      status: (testCategory && testCategory.status) || "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Please Enter Test Category Type"),
      status: Yup.string().required("Please Enter Test Category Status"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateTestCategory = {
          type: values.type,
          status: values.status,
        }
        dispatch(onUpdateTestCategory(updateTestCategory, testCategory.id))
      } else {
        const newTestCategory = {
          type: values["type"],
          status: values["status"],
        }
        dispatch(onAddNewTestCategory(newTestCategory))
      }
      toggle()
    },
  })

  const handleAddTestCategoryClick = () => {
    setIsEdit(false)
    toggle()
  }

  const handleTestCategoryClick = arg => {
    const testCategory = arg
    setTestCategory({
      id: testCategory._id,
      type: testCategory.type,
      status: testCategory.status,
    })
    setIsEdit(true)
    toggle()
  }

  const [deleteModal, setDeleteModal] = useState(false)
  const onClickDelete = testCategory => {
    setTestCategory(testCategory)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (testCategory && testCategory._id) {
      dispatch(onDeleteTestCategory(testCategory._id))
    }
    setDeleteModal(false)
  }

  useEffect(() => {
    dispatch(onGetTestCategories())
  }, [dispatch])

  useEffect(() => {
    setTestCategoryList(testCategories)
  }, [testCategories])

  useEffect(() => {
    if (!isEmpty(testCategories)) {
      setTestCategoryList(testCategories)
    }
  }, [testCategories])

  const handleChangeStatus = testCategory => {
    const status = testCategory.status === "active" ? "deactive" : "active"
    dispatch(
      onUpdateTestCategory({ status }, testCategory._id, props.router.navigate)
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: cellProps => {
          console.log(cellProps)
        },
      },
      {
        Header: "Name",
        accessor: "type",
        Cell: cellProps => {
          return <Name {...cellProps} />
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
              onClickEdit={handleTestCategoryClick}
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
        title="Are you sure you want to permanently erase the test category."
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Test Category"
            breadcrumbItem="Test Category List"
          />
          <Row>
            <Col lg="12">
              <CardBody className="border-bottom">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0 card-title flex-grow-1"></h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="#!"
                      onClick={() => handleAddTestCategoryClick()}
                      className="btn btn-primary global_btn me-1"
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      Add New Test Category
                    </Link>
                  </div>
                </div>
              </CardBody>
              <div>
                <TableContainer
                  loading={loading}
                  columns={columns}
                  data={testCategories}
                  isGlobalFilter={true}
                  isAddOptions={false}
                  isJobListGlobalFilter={false}
                  customPageSize={10}
                  className="project-list-table table-nowrap align-middle table-borderless"
                />
              </div>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Test Category" : "Add Test Category"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label className="form-label">Name</Label>
                      <Input
                        name="type"
                        type="text"
                        className="custom_form_control"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.type || ""}
                        invalid={
                          validation.touched.type && validation.errors.type
                            ? true
                            : false
                        }
                      />
                      {validation.touched.type && validation.errors.type ? (
                        <FormFeedback type="invalid">
                          {validation.errors.type}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Status</Label>
                      <Input
                        name="status"
                        id="status1"
                        type="select"
                        className="form-select custom_form_control"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.status || ""}
                      >
                        <option value="">Choose Status</option>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                      </Input>
                      {validation.touched.status && validation.errors.status ? (
                        <FormFeedback type="invalid">
                          {validation.errors.status}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(TestCategoriesList)

TestCategoriesList.propTypes = {
  history: PropTypes.object,
}
