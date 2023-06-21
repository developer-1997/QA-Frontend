import PropTypes from "prop-types"
import React, { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { isEmpty } from "lodash"
import { useFormik } from "formik"
import * as Yup from "yup"
import toastr from "toastr"
import {
  Col,
  Container,
  Row,
  Modal,
  Card,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  CardBody,
  Spinner,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"
import TableContainer from "../../../components/Common/TableContainer"
import {
  getRoles as onGetRoles,
  getColleges as onGetColleges,
  getCoachings as onGetCoachings,
  getStudents as onGetStudents,
  addNewStudent as onAddNewStudent,
  updateStudent as onUpdateStudent,
  deleteStudent as onDeleteStudent,
} from "../../../store/actions"
import { Name, Status, Action, StatusChangeToggle } from "./StudentListCol"

import { useSelector, useDispatch } from "react-redux"

const StudentsList = props => {
  const staticURL = process.env.REACT_APP_STATIC_URL
  document.title = "Student List | QAPRENEUR"

  const dispatch = useDispatch()
  const [student, setStudent] = useState()
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const toggle = () => {
    if (modal) {
      setModal(false)
      setStudent(null)
    } else {
      setModal(true)
    }
  }

  const { students, colleges, coachings, roles, loading } = useSelector(
    state => ({
      students: state?.students?.students,
      colleges: state.colleges?.colleges,
      coachings: state.coachings?.coachings,
      roles: state.roles?.roles,
      loading: state?.students?.loading,
    })
  )

  const studentRoleId = roles.filter(
    role => role.status === "active" && role.role === "student"
  )

  const [studentList, setStudentList] = useState([])

  const [deleteModal, setDeleteModal] = useState(false)
  const onClickDelete = student => {
    setStudent(student)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (student && student._id) {
      dispatch(onDeleteStudent(student._id))
    }
    setDeleteModal(false)
  }

  useEffect(() => {
    dispatch(onGetStudents())
  }, [dispatch])

  useEffect(() => {
    setStudentList(students)
  }, [students])

  useEffect(() => {
    if (!isEmpty(students)) {
      setStudentList(students)
    }
  }, [students])

  const handleChangeStatus = student => {
    const status = student.status === "active" ? "deactive" : "active"
    dispatch(onUpdateStudent({ status }, student._id, props.router.navigate))
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
        Header: "StudentId",
        accessor: "_id",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Mobile",
        accessor: "phone",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: cellProps => {
          return cellProps.value
        },
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: cellProps => {
          return cellProps.value
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
              onClickEdit={handleEditStudentClick}
            />
          )
        },
      },
    ],
    []
  )
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (student && student.name) || "",
      email: (student && student.email) || "",
      collegeId: student && student.collegeId,
      coachingId: student && student.coachingId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Student Name"),
      email: Yup.string().required("Please Select Your Email"),
    }),
    onSubmit: values => {
      if (studentRoleId && studentRoleId.length > 0 && studentRoleId[0]?._id) {
        values.roleId = studentRoleId[0]?._id

        if (isEdit)
          dispatch(onUpdateStudent(values, student._id, props.router.navigate))
        else dispatch(onAddNewStudent(values, props.router.navigate))
      } else {
        toastr.error("Student role not found")
      }
      setModal(false)
    },
  })

  const handleAddStudentClick = () => {
    setIsEdit(false)
    toggle()
  }

  const handleEditStudentClick = arg => {
    setStudent(arg)
    setIsEdit(true)
    setModal(true)
    toggle()
  }

  useEffect(() => {
    dispatch(onGetRoles())
    dispatch(onGetCoachings())
    dispatch(onGetColleges())
  }, [dispatch])

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        title="Are you sure you want to permanently erase the student."
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Students" breadcrumbItem="Students List" />
          <Row>
            <Col lg="12">
              <CardBody className="border-bottom">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0 card-title flex-grow-1"></h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="/students-create"
                      className="btn btn-primary global_btn me-1"
                      onClick={() => handleAddStudentClick()}
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      Add New Student
                    </Link>
                  </div>
                </div>
              </CardBody>
              <div>
                <TableContainer
                  loading={loading}
                  columns={columns}
                  data={students}
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
              {!!isEdit ? "Edit Student" : "Add Student"}
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
                  <Col sm="12" xl="12">
                    <Card>
                      <CardBody>
                        <Row>
                          <Col sm="12">
                            <div className="mb-3">
                              <Label htmlFor="formrow-name-Input">
                                Full Name
                                <span className="required_star">*</span>
                              </Label>
                              <Input
                                name="name"
                                type="text"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter Your Student Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div>
                              <Label>
                                {" "}
                                Email<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="email"
                                id="status1"
                                type="email"
                                placeholder="Enter Your Student Email"
                                className="form-control custom_form_control"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3 mt-3">
                              <Label
                                htmlFor="collegeId-input"
                                className="form-label"
                              >
                                Select College
                              </Label>
                              <Input
                                name="collegeId"
                                id="collegeId-input"
                                type="select"
                                className="form-select custom_form_control"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.collegeId || ""}
                                invalid={
                                  validation.touched.collegeId &&
                                  validation.errors.collegeId
                                    ? true
                                    : false
                                }
                              >
                                <option>Select College</option>
                                {colleges.map((college, index) => {
                                  return (
                                    <option key={index} value={college._id}>
                                      {college.name}
                                    </option>
                                  )
                                })}
                              </Input>
                              {validation.touched.collegeId &&
                              validation.errors.collegeId ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.collegeId}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3 mt-3">
                              <Label
                                htmlFor="coachingId-input"
                                className="form-label"
                              >
                                Select Coaching
                              </Label>
                              <Input
                                name="coachingId"
                                id="coachingId-input"
                                type="select"
                                className="form-select custom_form_control"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.coachingId || ""}
                                invalid={
                                  validation.touched.coachingId &&
                                  validation.errors.coachingId
                                    ? true
                                    : false
                                }
                              >
                                <option> Select Coaching</option>
                                {coachings.map((coaching, index) => {
                                  return (
                                    <option key={index} value={coaching._id}>
                                      {coaching.name}
                                    </option>
                                  )
                                })}
                              </Input>
                              {validation.touched.coachingId &&
                              validation.errors.coachingId ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.coachingId}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className="">
                  <Col className="" sm="12" xl="12">
                    <Card>
                      <CardBody className="d-flex w-100 justify-content-center">
                        <Button
                          type="submit"
                          color="primary"
                          disabled={loading}
                          className="global_btn"
                        >
                          <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                          {loading ? (
                            <Spinner className="ms-2" color="light" size="sm" />
                          ) : isEdit ? (
                            "Save Student"
                          ) : (
                            "Create Student"
                          )}
                        </Button>
                      </CardBody>
                    </Card>
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

export default withRouter(StudentsList)

StudentsList.propTypes = {
  history: PropTypes.object,
}
