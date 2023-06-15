import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"
import loginTopImg from "../../assets/images/banners/imgTopLeft.svg"
import topRightImg from "../../assets/images/banners/topRight.svg"
import bottomLeftImg from "../../assets/images/banners/bottomLeft.svg"
import bottomRightImg from "../../assets/images/banners/bottomRight.svg"
import rightIcon from "../../assets/images/rightIcon.svg"

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={7} lg={7} md={6} sm={12}>
        <div className="auth-full-bg pt-lg-5 p-4 login_banner vh-sm-100">
          <div className="w-100 h-100 banner_content_outer">
            {/* <div className="bg-overlay"></div> */}
            <div className="d-flex h-100 flex-column">
              <div className="p-4 m-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="banner_content">
                      <h1>
                        Over 10 Years in{" "}
                        <span className="txt_hltd">Distant learning</span> for
                        Skill Development
                      </h1>
                      <p className="pb-2">
                        Lorem ipsum dolor sit amet consectetur. Scelerisque eget
                        varius tempor nulla. Praesent nullam massa dui mattis{" "}
                      </p>
                      <ul className="px-0">
                        <li>
                          <div className="d-flex align-items-center mb-3">
                            <img src={rightIcon} height={22} width={22} />
                            <p className="mx-3 my-0">Expert trainers</p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center mb-3">
                            <img src={rightIcon} height={22} width={22} />
                            <p className="mx-3 my-0">Online remote learning</p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center mb-3">
                            <img src={rightIcon} height={22} width={22} />
                            <p className="mx-3 my-0">Lifetime access</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* <div className="text-center">
                      <h4 className="mb-3">
                        <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                        <span className="text-primary">5k</span>+ Satisfied
                        clients
                      </h4>
                      <div dir="ltr">
                        <Carousel
                          className="owl-carousel owl-theme auth-review-carousel slider_css"
                          id="auth-review-carousel"
                          showThumbs={false}
                        >
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Fantastic theme with a ton of options.
                                  If you just want the HTML to integrate with
                                  your project, then this is the package. You
                                  can find the files in the &apos;dist&lsquo;
                                  folder...no need to install git and all the
                                  other stuff the documentation talks about.
                                  &ldquo;
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;If Every Vendor on Envato are as
                                  supportive as Themesbrand, Development with be
                                  a nice experience. You guys are Wonderful.
                                  Keep us the good work. &ldquo;
                                </p>
                              </div>
                            </div>
                          </div>
                        </Carousel>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <img
            height={200}
            width={200}
            src={require("../../assets/images/banners/imgTopLeft.png")}
          /> */}

          <div className="topLeft_img">
            <img src={loginTopImg} height={400} width={500} />
          </div>

          <div className="topRight_img">
            <img src={topRightImg} height={200} width={200} />
          </div>

          <div className="bottomLeft_img">
            <img src={bottomLeftImg} height={200} width={200} />
          </div>

          <div className="bottomRight_img">
            <img src={bottomRightImg} height={150} width={150} />
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
