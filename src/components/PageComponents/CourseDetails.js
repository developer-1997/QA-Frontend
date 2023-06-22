import React, { useEffect } from "react"
import { Link } from "react-router-dom"

import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"

import imgClock from "../../assets/images/icons/imgClock.svg"
import imgCourseDetails from "../../assets/images/banners/img_course_details.jpg"
import arrowRight from "../../assets/images/icons/arrowRight.png"
import chapters from "store/chapters/reducer"

const CourseDetails = ({ courseDetail }) => {
  console.log("courseDetail", courseDetail)
  return (
    <div>
      <Row>
        <Col lg={5}>
          <Card>
            <CardBody>
              <div className="pt-3 px-2">
                <div>
                  <div className="course_heading">
                    <h4 className="course_title">
                      {courseDetail.courseName}
                      {/* Master software testing QA - 2023 */}
                    </h4>
                    <div className="course_time d-flex align-items-center">
                      <img src={imgClock} height={14} width={14} />
                      <label className="time ps-1 mb-0">
                        {courseDetail.courseDuration
                          ? courseDetail.courseDuration
                          : 0}{" "}
                        min
                      </label>
                    </div>
                  </div>

                  <div className="course_chapters_list">
                    <div className="chapter_list_progress">
                      <ul className="StepProgress">
                        {courseDetail.chapters.map((chapter, index) => {
                          return (
                            <>
                              <li className="StepProgress-item" key={index}>
                                <div className="course_chapter">
                                  <h4 className="chapter_name">
                                    {chapter.name}
                                  </h4>
                                  <p className="chapter_info mb-0">
                                    <span>6</span> Topics &#x2022;{" "}
                                    <span>40</span> Mins
                                  </p>
                                </div>
                              </li>
                            </>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={7}>
          <div>
            <Card>
              <CardBody>
                <div className="pt-3 px-2 d-flex justify-content-center">
                  <div>
                    <img
                      src={
                        courseDetail.image
                          ? courseDetail.image
                          : imgCourseDetails
                      }
                      height={698}
                      width={493}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody style={{ padding: 10 }}>
                <div className="px-2 d-flex justify-content-center">
                  <Link
                    to="/courses-create"
                    className="btn btn-primary global_btn me-1 px-5"
                  >
                    Take Test &nbsp;
                    <img src={arrowRight} height={12} width={12} />
                    {/* <i className="bx bx-plus-circle font-size-16 align-middle me-2"></i> */}
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CourseDetails
