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

                    <h1>this is student dashboard</h1>

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
                                        <CardBody>
                                            <div className="statistics_info">
                                                <div className="stat_img">
                                                    <img src={imgJobs} height={48} width={48} />
                                                </div>
                                                <div className="text-center">
                                                    <h4 className="mb-0">Silver Plan </h4>
                                                    <p className="title_for_total text-muted fw-medium">
                                                    Sorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    </p>
                                                    <Link
                                                        className="btn_view_all"
                                                        to=""
                                                    >
                                                        Upgrade Plan &nbsp;
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
