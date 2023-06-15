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
  getCoachings as onGetCoachings,
  addNewCoaching as onAddNewCoaching,
  updateCoaching as onUpdateCoaching,
  deleteCoaching as onDeleteCoaching,
} from "../../../store/actions"
import {
  Name,
  Status,
  Action,
  StatusChangeToggle,
  Address,
} from "./CoachingListCol"
import { useSelector, useDispatch } from "react-redux"

const CoachingsList = props => {
  const staticURL = process.env.REACT_APP_STATIC_URL
  document.title = "Coaching List | QAPRENEUR"

  const dispatch = useDispatch()
  const [coaching, setCoaching] = useState()
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { coachings, loading, roles } = useSelector(state => ({
    coachings: state?.coachings?.coachings,
    roles: state.roles?.roles,
    loading: state?.coachings?.loading,
  }))

  const coachingRoleId = roles.filter(
    role => role.status === "active" && role.role === "coaching"
  )

  const toggle = () => {
    if (modal) {
      setModal(false)
      setCoaching(null)
    } else {
      setModal(true)
    }
  }

  const [deleteModal, setDeleteModal] = useState(false)
  const onClickDelete = coaching => {
    setCoaching(coaching)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (coaching && coaching._id) {
      dispatch(onDeleteCoaching(coaching._id))
    }
    setDeleteModal(false)
  }

  const handleAddCoachingClick = () => {
    setIsEdit(false)
    setCoaching(null)
    toggle()
  }

  const handleEditCoachingClick = arg => {
    setCoaching(arg)
    setIsEdit(true)
    setModal(true)
    toggle()
  }

  useEffect(() => {
    dispatch(onGetCoachings())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetRoles())
  }, [dispatch])

  const handleChangeStatus = coaching => {
    const status = coaching.status === "active" ? "deactive" : "active"
    dispatch(onUpdateCoaching({ status }, coaching._id, props.router.navigate))
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: coaching?.name || "",
      email: coaching?.email || "",
      address: coaching?.address || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your College Full Name"),
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: values => {
      if (
        coachingRoleId &&
        coachingRoleId.length > 0 &&
        coachingRoleId[0]?._id
      ) {
        values.roleId = coachingRoleId[0]?._id
        if (isEdit)
          dispatch(
            onUpdateCoaching(values, coaching._id, props.router.navigate)
          )
        else dispatch(onAddNewCoaching(values, props.router.navigate))
      } else {
        toastr.error("Coaching role not found")
      }
      setTimeout(() => {
        setModal(false)
      }, 1000)
    },
  })

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
        Header: "CoachingId",
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
          return <Address {...cellProps} />
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
              onClickEdit={handleEditCoachingClick}
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
        title="Are you sure you want to permanently erase the coaching."
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Coachings" breadcrumbItem="Coachings List" />
          <Row>
            <Col lg="12">
              <CardBody className="border-bottom">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0 card-title flex-grow-1"></h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="#"
                      className="btn btn-primary global_btn me-1"
                      onClick={() => handleAddCoachingClick()}
                    >
                      <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                      Add New Coaching
                    </Link>
                  </div>
                </div>
              </CardBody>
              <div>
                <TableContainer
                  loading={loading}
                  columns={columns}
                  data={coachings}
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
              {!!isEdit ? "Edit Coaching" : "Add Coaching"}
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
                                placeholder="Enter Your Coaching Name"
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
                            <div className="mb-3">
                              <Label>
                                {" "}
                                Email<span className="required_star">*</span>
                              </Label>
                              <Input
                                name="email"
                                id="status1"
                                type="email"
                                placeholder="Enter Your  Email"
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
                            <div className="mb-3">
                              <Label>Address</Label>
                              <textarea
                                name="address"
                                type="text"
                                className="form-control custom_form_control"
                                id="formrow-name-Input"
                                placeholder="Enter Your Address"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                              />
                              {validation.touched.address &&
                              validation.errors.address ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.address}
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
                            "Save Coaching"
                          ) : (
                            "Create Coaching"
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

export default withRouter(CoachingsList)

CoachingsList.propTypes = {
  history: PropTypes.object,
}
