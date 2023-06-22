import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Dropzone from "react-dropzone"
import {
    Card,
    CardBody,
    Button,
    Col,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    CardHeader,
    Input,
    Label,
    Row,
    Form,
    FormFeedback,
    Spinner,
    UncontrolledTooltip,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-datepicker/dist/react-datepicker.css"
import {
    getCollegeDetail as onGetCollegeDetail,
    addNewCollege as onaddNewCollege,
    updateCollege as onUpdateCollege,
    deleteCollege as onDeleteCollege,
    getCollegeDetailSuccess as onGetCollegeDetailSuccess,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import { map } from "lodash"
import withRouter from "components/Common/withRouter"




const Colleges = props => {
    const dispatch = useDispatch()
    const params = useParams()
    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
        const currentLocation = props.router?.location?.pathname
        const status = currentLocation?.includes("colleges-edit")
        setIsEdit(status)
        if (status && params?.id) dispatch(onGetCollegeDetail(params.id))
        else dispatch(onGetCollegeDetailSuccess())
    }, [])


    document.title = `${isEdit ? "Edit College" : "Create New College"
        } | QAPRENEUR`


    const { loading, collegeDetail } = useSelector(state => ({
        loading: state.colleges.loading,
        collegeDetail: state.colleges?.studentDetail,
    }))


    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: collegeDetail?.name || "",
            email: collegeDetail?.email || "",
            phoneNumber: collegeDetail?.phoneNumber || "",
            addressLine1: collegeDetail?.addressLine1 || "",
            city: collegeDetail?.city || "",
            state: collegeDetail?.state || "",
            establishmentDate: collegeDetail?.establishmentDate || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter College Name"),
            email: Yup.string().required("Please Enter College Email"),
            phoneNumber: Yup.string().required("Please Enter Mobile"),
            addressLine1: Yup.string().required("Address Line 1"),
            city: Yup.string().required("Please Select City"),
            state: Yup.string().required("Please Select State"),
            establishmentDate: Yup.string().required("Please Enter Establishment Date"),
        }),
        onSubmit: values => {
            console.log(values)
            if (isEdit)
                dispatch(onUpdateStudent(values, collegeDetail._id, props.router.navigate))
            else dispatch(onaddNewStudent(values, props.router.navigate))
        },
    })



    const handleButtonClick = (e, type, { handleSubmit, setFieldValue }) => {
        e.preventDefault()
        handleSubmit()
        return false
    }



    return (
        <div className="page-content">
            <Container fluid>

                <Form>
                    <Breadcrumbs
                        title="Colleges"
                        navigate="/colleges-list"
                        breadcrumbItem={`${isEdit ? "Edit College" : "Create College"}`}
                    />


                    <div>
                        <Card>
                            <CardBody>
                                <div className="pt-2 px-2">
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-4">
                                                <Label htmlFor="formrow-name-Input">
                                                    Name<span className="required_star">*</span>
                                                </Label>
                                                <Input
                                                    name="name"
                                                    type="text"
                                                    className="form-control custom_form_control"
                                                    id="formrow-name-Input"
                                                    placeholder="Please Enter College Name"
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
                                        </Col>

                                        <Col lg="6">
                                            <div className="mb-4">
                                                <Label htmlFor="formrow-name-Input">
                                                    Email<span className="required_star">*</span>
                                                </Label>
                                                <Input
                                                    name="email"
                                                    type="text"
                                                    className="form-control custom_form_control"
                                                    id="formrow-name-Input"
                                                    placeholder="Please Enter College Email"
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
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-4">
                                                <Label htmlFor="formrow-name-Input">
                                                    Mobile<span className="required_star">*</span>
                                                </Label>
                                                <Input
                                                    name="phoneNumber"
                                                    type="text"
                                                    className="form-control custom_form_control"
                                                    id="formrow-name-Input"
                                                    placeholder="Please Enter Mobile"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.phoneNumber || ""}
                                                    invalid={
                                                        validation.touched.phoneNumber &&
                                                            validation.errors.phoneNumber
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.phoneNumber &&
                                                    validation.errors.phoneNumber ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.phoneNumber}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col lg="6">
                                            <div className="mb-4">
                                                <Label htmlFor="formrow-name-Input">
                                                    Address Line 1<span className="required_star">*</span>
                                                </Label>
                                                <Input
                                                    name="addressLine1"
                                                    type="text"
                                                    className="form-control custom_form_control"
                                                    id="formrow-name-Input"
                                                    placeholder="Address Line 1"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.addressLine1 || ""}
                                                    invalid={
                                                        validation.touched.addressLine1 &&
                                                            validation.errors.addressLine1
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.addressLine1 &&
                                                    validation.errors.addressLine1 ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.addressLine1}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-4">
                                                <Label htmlFor="formrow-name-Input">
                                                    Establishment Date<span className="required_star">*</span>
                                                </Label>
                                                <Input
                                                    name="establishmentDate"
                                                    type="date"
                                                    className="form-control custom_form_control"
                                                    id="formrow-name-Input"
                                                    placeholder="Please Enter Establishment Date"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.establishmentDate || ""}
                                                    invalid={
                                                        validation.touched.establishmentDate && validation.errors.establishmentDate
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.establishmentDate && validation.errors.establishmentDate ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.establishmentDate}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-4">
                                                <Label className="form-label">Select City</Label>
                                                <span className="required_star">*</span>

                                                <Input
                                                    name="city"
                                                    type="select"
                                                    className="form-select custom_form_control"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.city || ""}
                                                    invalid={
                                                        validation.touched.city && validation.errors.city
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <option>Select City</option>
                                                    <option value="Bhopal">Bhopal</option>
                                                    <option value="Indore">Indore</option>
                                                    <option value="Vidisha">Vidisha</option>
                                                </Input>
                                                {validation.touched.city && validation.errors.city ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.city}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-4">
                                                <Label className="form-label">Select State</Label>
                                                <span className="required_star">*</span>

                                                <Input
                                                    name="state"
                                                    type="select"
                                                    className="form-select custom_form_control"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.state || ""}
                                                    invalid={
                                                        validation.touched.state && validation.errors.state
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <option>Select State</option>
                                                    <option value="MadhyaPradesh">Madhya Pradesh</option>
                                                    <option value="Maharashtra">Maharashtra</option>
                                                    <option value="Punjab">Punjab</option>
                                                </Input>
                                                {validation.touched.state && validation.errors.state ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.state}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>

                                </div>

                                <div className="btn_outer_upsert pt-4 mt-3">
                                    <div className="justify-content-center d-flex col-8 col-sm-12 col-md-12">
                                        <button
                                            type="button"
                                            className="btn_outline_bgwhite btn btn-primary me-3 px-4"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={e => handleButtonClick(e, "submit", validation)}
                                            type="button"
                                            color="primary"
                                            disabled={loading}
                                            className="global_btn btn btn-primary px-4"
                                        >
                                            <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i>
                                            {loading ? (
                                                <Spinner className="ms-2" color="light" size="sm" />
                                            ) : isEdit ? (
                                                "Save"
                                            ) : (
                                                "Create"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Form>

            </Container>
        </div>
    )
}



export default Colleges;