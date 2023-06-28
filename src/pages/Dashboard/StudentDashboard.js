import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import classNames from "classnames"

//import action
import { getChartsData as onGetChartsData } from "../../store/actions"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import Jobs from "components/PageComponents/jobs"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
import Apaexlinecolumn from "pages/AllCharts/apex/apaexlinecolumn"

//images
import imgJobs from "../../assets/images/icons/jobs.svg"
import imgTests from "../../assets/images/icons/tests.svg"
import imgCoachings from "../../assets/images/icons/coachings.svg"
import arrowRight from "../../assets/images/icons/arrowRightColored.svg"
import arrowRightWhite from "../../assets/images/icons/arrowRight.png"
import placeholder from "../../assets/images/users/img_placeholder.png"

import experienceIcon from "../../assets/images/icons/experience.svg"
import salaryIcon from "../../assets/images/icons/salary.svg"
import onsiteIcon from "../../assets/images/icons/onSite.svg"
import locationIcon from "../../assets/images/icons/location.svg"


const StudentDashboard = props => {
    const [modal, setmodal] = useState(false)
    const [subscribemodal, setSubscribemodal] = useState(false)

    const { chartsData } = useSelector(state => ({
        chartsData: state.Dashboard.chartsData,
    }))

    const reports = [
        {
            title: "Total User",
            iconClass: "fas fa-user-friends",
            description: "1,235",
        },
        {
            title: "Total Students",
            iconClass: "fas fa-user-graduate",
            description: "35, 723",
        },
        {
            title: "Total Coaching",
            iconClass: "bx bx-building-house",
            description: "166",
        },
        {
            title: "Total Colleges",
            iconClass: "bx bxs-graduation",
            description: "1622",
        },
        {
            title: "Total Companies",
            iconClass: "mdi mdi-office-building-outline",
            description: "162",
        },
        {
            title: "Total Earning  ",
            iconClass: "mdi mdi-currency-inr",
            description: "168",
        },
        {
            title: "Subscribers",
            iconClass: "mdi mdi-bell-ring",
            description: "1622",
        },
        {
            title: "Student Appeared",
            iconClass: "mdi mdi-view-list-outline",
            description: "1622",
        },
    ]

    const jobDetails = [
        {
            "jobTitle": "QA Engineer"
        },
        {
            "jobTitle": "QA Engineer"
        },
        {
            "jobTitle": "QA Engineer"
        },
        {
            "jobTitle": "QA Engineer"
        }
    ]

    useEffect(() => {
        setTimeout(() => {
            setSubscribemodal(true)
        }, 2000)
    }, [])

    const [periodData, setPeriodData] = useState([])
    const [periodType, setPeriodType] = useState("yearly")

    useEffect(() => {
        setPeriodData(chartsData)
    }, [chartsData])

    const onChangeChartPeriod = pType => {
        setPeriodType(pType)
        dispatch(onGetChartsData(pType))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(onGetChartsData("yearly"))
    }, [dispatch])

    //meta title
    document.title = "Dashboard | QAPRENEUR"

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={props.t("Dashboards")}
                        breadcrumbItem={props.t("Dashboard")}
                    />

                    <Row>
                        <Col xl="4">
                            <WelcomeComp />
                            {/* <MonthlyEarning /> */}
                        </Col>
                        <Col xl="8">
                            {/* <Row>
                                {reports.map((report, key) => (
                                    <Col md="3" key={"_col_" + key}>
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <div className="d-block text-align-center">
                                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon d-inline-flex">
                                                        <span className="avatar-title rounded-circle bg-primary">
                                                            <i
                                                                className={
                                                                    " " + report.iconClass + " font-size-24"
                                                                }
                                                            ></i>
                                                        </span>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <p className="text-muted fw-medium">
                                                            {report.title}
                                                        </p>
                                                        <h4 className="mb-0">{report.description}</h4>
                                                    </div>
                                                    
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row> */}


                            <Row>
                                <Col md="3" >
                                    <Card className="mini-stats-wid">
                                        <CardBody style={{padding: 10}} >
                                            <div className="plan_information">
                                                <div className="plan_info">
                                                    {/* <img src={imgJobs} height={48} width={48} /> */}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="lbl_activeplan">Active Plan</p>
                                                        <div className="plan_price">₹27
                                                            <label className="plan_dur">/m</label>
                                                        </div>
                                                    </div>
                                                    <div className="px-3 pt-3">
                                                        <h4 className="plan_type">Silver Plan </h4>
                                                        <p className="mb-0 lbl_plan_remains">29 days <label className="lbl_remains">Remaining</label> </p>
                                                    </div>
                                                    
                                                </div>
                                                <div>
                                                    <p className="plan_desc">
                                                        Sorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    </p>
                                                    <Link
                                                        className="btn_upgrade_plan"
                                                        to=""
                                                    >
                                                        Upgrade Plan
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>


                                <Col md="3" >
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="statistics_info">
                                                <div className="stat_img">
                                                    <img src={imgJobs} height={48} width={48} />
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="mb-0">152 </h4>
                                                    <p className="title_for_total text-muted fw-medium">
                                                        Total Jobs
                                                    </p>
                                                    <Link
                                                        className="btn_view_all"
                                                        to=""
                                                    >
                                                        View All Jobs &nbsp;
                                                        <img src={arrowRight} height="10" width="10" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md="3" >
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="statistics_info">
                                                <div className="stat_img">
                                                    <img src={imgTests} height={48} width={48} />
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="mb-0">5423</h4>
                                                    <p className="title_for_total text-muted fw-medium">
                                                        Total Tests
                                                    </p>
                                                    <Link
                                                        className="btn_view_all"
                                                        to=""
                                                    >
                                                        View All Tests &nbsp;
                                                        <img src={arrowRight} height="10" width="10" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md="3" >
                                    <Card className="mini-stats-wid">
                                        <CardBody>
                                            <div className="statistics_info">
                                                <div className="stat_img">
                                                    <img src={imgCoachings} height={48} width={48} />
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="mb-0">439</h4>
                                                    <p className="title_for_total text-muted fw-medium">
                                                        Total Coachings
                                                    </p>
                                                    <Link
                                                        className="btn_view_all"
                                                        to=""
                                                    >
                                                        View All Coachings &nbsp;
                                                        <img src={arrowRight} height="10" width="10" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            {/* <Card>
                                <CardBody>
                                    <div className="d-sm-flex flex-wrap">
                                        <h4 className="card-title mb-4">Email Sent</h4>
                                        <div className="ms-auto">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link
                                                        to="#"
                                                        className={classNames(
                                                            { active: periodType === "weekly" },
                                                            "nav-link"
                                                        )}
                                                        onClick={() => {
                                                            onChangeChartPeriod("weekly")
                                                        }}
                                                        id="one_month"
                                                    >
                                                        Week
                                                    </Link>{" "}
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        to="#"
                                                        className={classNames(
                                                            { active: periodType === "monthly" },
                                                            "nav-link"
                                                        )}
                                                        onClick={() => {
                                                            onChangeChartPeriod("monthly")
                                                        }}
                                                        id="one_month"
                                                    >
                                                        Month
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        to="#"
                                                        className={classNames(
                                                            { active: periodType === "yearly" },
                                                            "nav-link"
                                                        )}
                                                        onClick={() => {
                                                            onChangeChartPeriod("yearly")
                                                        }}
                                                        id="one_month"
                                                    >
                                                        Year
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <Apaexlinecolumn dataColors='["--bs-primary", "--bs-success"]' />
                                </CardBody>
                            </Card> */}
                        </Col>
                    </Row>

                    <div>
                        <Row>
                            <Col xl="6">
                                <Card>
                                    <CardBody>
                                        <div className="section_test_course">
                                            <div className="section_header">
                                                <h3 className="section_main_heading">Test</h3>
                                                <Link
                                                    className="btn_bgwhite"
                                                    to=""
                                                >
                                                    View All Tests &nbsp;
                                                    <img src={arrowRight} height="10" width="10" />
                                                </Link>
                                            </div>

                                            <div>
                                                <table className="me-0 w-100 tbl_student_dashboard">
                                                    <thead>
                                                        <tr>
                                                            <th>Test Name</th>
                                                            <th>Category</th>
                                                            <th>Duration</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="rw_name_info">
                                                                    <div className="rw_img_outer">
                                                                        <img src={placeholder} height={47} width={72} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="rw_title">Web Automation with Python Test</h4>
                                                                        <p className="rw_description">Lorem ipsum dolor , consectetur adipiscing</p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_cat_info">
                                                                    <p className="cat_name">Automation Testing</p>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_dur_info">
                                                                    <p className="dur_val"><span>45</span> Mins</p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <div className="rw_name_info">
                                                                    <div className="rw_img_outer">
                                                                        <img src={placeholder} height={47} width={72} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="rw_title">SpeedCheck</h4>
                                                                        <p className="rw_description">Lorem ipsum dolor , consectetur adipiscing</p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_cat_info">
                                                                    <p className="cat_name">Automation Testing</p>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_dur_info">
                                                                    <p className="dur_val"><span>45</span> Mins</p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <div className="rw_name_info">
                                                                    <div className="rw_img_outer">
                                                                        <img src={placeholder} height={47} width={72} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="rw_title">PerformanceProbe</h4>
                                                                        <p className="rw_description">Lorem ipsum dolor , consectetur adipiscing</p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_cat_info">
                                                                    <p className="cat_name">Manual Testing</p>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_dur_info">
                                                                    <p className="dur_val"><span>45</span> Mins</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xl="6">
                                <Card>
                                    <CardBody>
                                        <div className="section_test_course">
                                            <div className="section_header">
                                                <h3 className="section_main_heading">Courses</h3>
                                                <Link
                                                    className="btn_bgwhite"
                                                    to=""
                                                >
                                                    View All Courses &nbsp;
                                                    <img src={arrowRight} height="10" width="10" />
                                                </Link>
                                            </div>

                                            <div>
                                                <table className="me-0 w-100 tbl_student_dashboard">
                                                    <thead>
                                                        <tr>
                                                            <th>Course Name</th>
                                                            <th>Duration</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="rw_name_info">
                                                                    <div className="rw_img_outer">
                                                                        <img src={placeholder} height={47} width={72} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="rw_title">Web Automation with Python Test</h4>
                                                                        <p className="rw_description">Lorem ipsum dolor , consectetur adipiscing</p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_dur_info">
                                                                    <p className="dur_val"><span>45</span> Mins</p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <div className="rw_name_info">
                                                                    <div className="rw_img_outer">
                                                                        <img src={placeholder} height={47} width={72} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="rw_title">SpeedCheck</h4>
                                                                        <p className="rw_description">Lorem ipsum dolor , consectetur adipiscing</p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_dur_info">
                                                                    <p className="dur_val"><span>45</span> Mins</p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <div className="rw_name_info">
                                                                    <div className="rw_img_outer">
                                                                        <img src={placeholder} height={47} width={72} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="rw_title">PerformanceProbe</h4>
                                                                        <p className="rw_description">Lorem ipsum dolor , consectetur adipiscing</p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="rw_dur_info">
                                                                    <p className="dur_val"><span>45</span> Mins</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>


                        <div>
                            <div className="section_header">
                                <h3 className="section_main_heading">Latest Jobs</h3>
                                <Link
                                    className="btn_bgwhite"
                                    to=""
                                >
                                    View All Jobs &nbsp;
                                    <img src={arrowRight} height="10" width="10" />
                                </Link>
                            </div>

                            <div>
                                {jobDetails.map((job, index) => (
                                    <Jobs key={index} />
                                ))}


                                {/* <Card>
                                    <CardBody>
                                        <div className="job_full_info">
                                            <div className="job_info_inner">
                                                <div className="job_short_info">
                                                    <div className="img_job_outer">
                                                        <img src={placeholder} width={72} height={72} />
                                                    </div>
                                                    <div>
                                                        <h3 className="job_title">Candidates for QA Engineer - Vadodara <span className="job_ad_time"> &#x2022; 5 days ago</span> </h3>
                                                        <p className="job_company_name">Foursis Technical Solutions </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Link
                                                        className="btn_apply_now"
                                                        to=""
                                                    >
                                                        apply now &nbsp;
                                                        <img src={arrowRightWhite} height="10" width="10" /> 
                                                    </Link>
                                                </div>
                                            </div>

                                            <p className="job_description">looking to hire a Quality Assurance Engineer who possesses a passion to test scalable apps, learning and growing quickly. Your work will directly impact millions of lives as you will be...</p>

                                            <div className="jobs_additional_info">
                                                <div className="additional_info">
                                                    <img src={onsiteIcon} width={35} height={35} />
                                                    <p className="mb-0 additional_info_name">On Site</p>
                                                </div>

                                                <div className="additional_info">
                                                    <img src={salaryIcon} width={35} height={35} />
                                                    <p className="mb-0 additional_info_name">6 - 12 Lac</p>
                                                </div>

                                                <div className="additional_info">
                                                    <img src={experienceIcon} width={35} height={35} />
                                                    <p className="mb-0 additional_info_name">5-8 Years</p>
                                                </div>

                                                <div className="additional_info">
                                                    <img src={locationIcon} width={35} height={35} />
                                                    <p className="mb-0 additional_info_name">Jamshedpur, Jharkhand, India</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card> */}


                            </div>
                        </div>


                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

StudentDashboard.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(StudentDashboard)
