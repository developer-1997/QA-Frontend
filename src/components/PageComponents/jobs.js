import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

//images
import experienceIcon from "../../assets/images/icons/experience.svg"
import salaryIcon from "../../assets/images/icons/salary.svg"
import onsiteIcon from "../../assets/images/icons/onSite.svg"
import locationIcon from "../../assets/images/icons/location.svg"
import arrowRightWhite from "../../assets/images/icons/arrowRight.png"
import placeholder from "../../assets/images/users/img_placeholder.png"




const Jobs = () => {
    return (
        <div>
            <Card>
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
            </Card>
        </div>
    )
}


export default Jobs;