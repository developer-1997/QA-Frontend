import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
//i18n
import { withTranslation } from "react-i18next"
import phoneIcon from "../../assets/images/home/phone-icon.svg"
import headerLeft from "../../assets/images/home/header_left.png"
import header_right_two from "../../assets/images/home/header_right_two.png"
import about_banner from "../../assets/images/home/about_banner.png"
import about_icon from "../../assets/images/home/about-icon.svg"
import about_shape1 from "../../assets/images/home/about_shape1.png"
import about_shape2 from "../../assets/images/home/about_shape2.png"
import banner from "../../assets/images/home/banner.png"
import brand1 from "../../assets/images/home/brand1.svg"
import brand2 from "../../assets/images/home/brand2.svg"
import brand3 from "../../assets/images/home/brand3.svg"
import brand4 from "../../assets/images/home/brand4.svg"
import brand5 from "../../assets/images/home/brand5.svg"
import brand6 from "../../assets/images/home/brand6.svg"
import contact_us_banner from "../../assets/images/home/contact_us_banner.png"
import customizable_sol from "../../assets/images/home/customizable_sol.svg"
import degree_program from "../../assets/images/home/degree_program.svg"
import features_bg from "../../assets/images/home/features_bg.png"
import header_left from "../../assets/images/home/header_left.png"
import header_right from "../../assets/images/home/header_right.png"
import header_right_one from "../../assets/images/home/header_right_one.png"
import hybrid_program from "../../assets/images/home/hybrid_program.svg"
import non_degree_program from "../../assets/images/home/non_degree_program.svg"
import off_campus from "../../assets/images/home/off_campus.svg"
import right_arrow from "../../assets/images/home/right_arrow.svg"
import arrow_right from "../../assets/images/home/arrow_right.svg"
import black_arrow from "../../assets/images/home/black_arrow.svg"
import rightIcon from "../../assets/images/home/rightIcon.svg"
import scalable_sol from "../../assets/images/home/scalable_sol.svg"
import support from "../../assets/images/home/support.svg"
import title_bottom_shape from "../../assets/images/home/title_bottom_shape.svg"
import why_us_banner from "../../assets/images/home/why_us_banner.png"
import why_us_bg from "../../assets/images/home/why_us_bg.png"
import our_features1 from "../../assets/images/home/our_features1.png"
import our_features2 from "../../assets/images/home/our_features2.png"
import our_features3 from "../../assets/images/home/our_features3.png"
import logo from "../../assets/images/home/logo.png"
import facebook from "../../assets/images/home/facebook.svg"
import insta from "../../assets/images/home/insta.svg"
import linkedin from "../../assets/images/home/linkedin.svg"
import twitter from "../../assets/images/home/twitter.svg"
import youtube from "../../assets/images/home/youtube.svg"
import footer_logo from "../../assets/images/home/footer_logo.png"
import loginIcon from "../../assets/images/home/login.svg"
import signupIcon from "../../assets/images/home/signup.svg"
import star from "../../assets/images/home/star.svg"
import testimonial_shap from "../../assets/images/home/testimonial_shap.png"
import quotes_circle from "../../assets/images/home/quotes_circle.svg"
import hamburger from "../../assets/images/home/hamburger.png"

import "../../assets/css/home.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"
import { Link as ScrollLink } from "react-scroll"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Home = () => {
  //meta title
  document.title = "Home | QAPRENEUR"

  const [isHovered, setIsHovered] = useState(true)
  const [isHoveredLogin, setIsHoveredLogin] = useState(false)

  const handleHoverLogin = () => {
    setIsHoveredLogin(true)
  }

  const handleLeaveLogin = () => {
    setIsHoveredLogin(false)
  }

  const handleHover = () => {
    setIsHovered(true)
  }

  const handleLeave = () => {
    setIsHovered(false)
  }

  let settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "25%",
  }

  if (window.innerWidth < 768) {
    settings.centerPadding = "0"
  }

  return (
    <React.Fragment>
      <div>
        <div id="top_bar" className="top_bar">
          <div className="top_bar_container">
            <div className="top_bar_inner">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <div className="navbar-brand">
                    <img src={logo} width={235} height={55} />
                  </div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                  >
                    <div className="navbar-nav">
                      <ul className="list-unstyled mb-0">
                        <li className="px-2 navbar_menu">
                          <ScrollLink
                            to="top_bar"
                            activeClass="active_menu"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            Home
                          </ScrollLink>
                        </li>
                        <li className="navbar_menu px-2">
                          <ScrollLink
                            to="section_about_us"
                            activeClass="active_menu"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            About
                          </ScrollLink>
                        </li>
                        <li className="navbar_menu px-2">
                          <ScrollLink
                            to="section_online_test"
                            activeClass="active_menu"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            Test
                          </ScrollLink>
                        </li>
                        <li className="navbar_menu px-2">
                          <ScrollLink
                            to="section_membership_plan"
                            activeClass="active_menu"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            Pricing
                          </ScrollLink>
                        </li>
                        <li className="navbar_menu px-2">
                          <ScrollLink
                            to="section_contact_us"
                            activeClass="active_menu"
                            spy={true}
                            smooth={true}
                            duration={500}
                          >
                            Contact
                          </ScrollLink>
                        </li>
                      </ul>
                      <div className="login_and_signUp">
                        <Link
                          className={`home_global_btn me-1 btn_login ${
                            isHoveredLogin ? "hovered" : ""
                          }`}
                          to="/login"
                          onMouseEnter={handleHoverLogin}
                          onMouseLeave={handleLeaveLogin}
                          onFocus={handleHoverLogin}
                          onBlur={handleLeaveLogin}
                        >
                          <i
                            className={`display-2 text-muted bx bx-user ${
                              isHoveredLogin ? "hoveredIcon" : ""
                            } `}
                          ></i>{" "}
                          &nbsp;Login
                        </Link>

                        <Link
                          className={`home_global_btn me-1 signup_btn ${
                            isHovered ? "hovered" : ""
                          }`}
                          to="register"
                          onMouseEnter={handleHover}
                          onMouseLeave={handleLeave}
                          onFocus={handleHover}
                          onBlur={handleLeave}
                        >
                          <img src={signupIcon} height="22" width="22" /> &nbsp;
                          Signup
                          {/* <i className={`display-2 text-muted bx bx-user-plus user-icon i_plus ${isHovered  ? 'hoveredIcon' : ''}`}></i>&nbsp;Sign Up */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div id="section_home" className="header">
          <div className="header_content">
            <h1>The Best Program to Enroll for Exchange</h1>
            <p className="mb-4">
              Excepteur sint occaecat cupidatat non proident sunt in culpa qui
              officia deserunt mollit.
            </p>

            <div className="online_support d-flex justify-content-center align-items-center">
              <div className="me-3">
                <img src={phoneIcon} height="50" width="50" />
              </div>
              <div>
                <p className="txt_online_support mb-0">online support</p>
                <p className="txt_mobile mb-0">+012 (345) 6789</p>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-2">
              <a href="#">
                Find courses &nbsp;
                <img src={arrow_right} width="19" height="15" />
              </a>
            </div>
          </div>

          <div className="img_header_left">
            <img src={headerLeft} height="336" width="327" />
          </div>

          <div className="img_header_right">
            <img src={header_right_two} height="486" width="408" />
          </div>
        </div>

        <div id="section_about_us" className="about_us">
          <div className="row">
            <div className="col-md-12 col-lg-8 col-sm-12 py-5">
              <div className="d-flex justify-content-center align-items-center ">
                <div className="about_banner_container position-relative py-5">
                  <img src={about_banner} width="520" height="370" />

                  <div className="enroll_learners d-flex justify-content-center align-items-center">
                    <div className="me-3">
                      <img src={about_icon} height="50" width="50" />
                    </div>
                    <div>
                      <p className="lbl_learners_count mb-0">20K+</p>
                      <p className="lbl_learners mb-0">Enrolled Learners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-sm-12">
              <div className=" about_us_content">
                <div className="about_us_header">
                  <p className="lbl_about_us mx-4 px-4">About Us</p>
                  <div className=" mx-4 px-4 mb-2">
                    <h2 className="aboutus_heading section_heading mb-0">
                      Over 10 Years in{" "}
                      <span style={{ color: "#F89752" }}>Distant learning</span>{" "}
                      for Skill Development
                    </h2>
                    <img src={title_bottom_shape} height="15" width="103" />
                  </div>

                  <p className="section_desc mx-4 px-4">
                    Lorem ipsum dolor sit amet consectur adipiscing elit sed
                    eiusmod ex tempor incididunt labore dolore magna aliquaenim
                    ad minim.
                  </p>
                </div>

                <ul className="list-unstyled  mx-4 px-4">
                  <li>
                    <div className="d-flex align-items-center mb-3">
                      <img src={rightIcon} height="22" width="22" />
                      <p className="mx-3 my-0 aboutus_list">Expert trainers</p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center mb-3">
                      <img src={rightIcon} height="22" width="22" />
                      <p className="mx-3 my-0 aboutus_list">
                        Online remote learning
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center mb-3">
                      <img src={rightIcon} height="22" width="22" />
                      <p className="mx-3 my-0 aboutus_list">Lifetime access</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="section_online_test" className="home_container">
          <div className="online_test">
            <div className="online_test_header text-center">
              <h5 className="small_heading_title">online categories</h5>
              <h2 className="section_heading">
                Online <span style={{ color: "#F89752" }}>Test</span> For Remote
                Learning.
              </h2>
              <img src={title_bottom_shape} height="15" width="103" />
            </div>
            <p className="section_desc text-center mt-3">
              Consectetur adipiscing elit sed do eiusmod tempor.
            </p>

            <div className="test_list_container">
              <div className="row my-5">
                <div className="col-lg-3 col-md-6 online_test_container">
                  <div className="online_test_cat">
                    <img src={degree_program} height="80" width="80" />
                    <h3 className="cat_title mt-4">Online Degree Programs</h3>
                    <p className="cat_desc">
                      Lorem ipsum dolor consec tur elit adicing sed umod tempor.
                    </p>
                    <span className="num_of_courses">7 Courses</span>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 online_test_container">
                  <div className="online_test_cat non_degree">
                    <img src={non_degree_program} height="80" width="80" />
                    <h3 className="cat_title mt-4">Non-Degree Programs</h3>
                    <p className="cat_desc">
                      Lorem ipsum dolor consec tur elit adicing sed umod tempor.
                    </p>
                    <span className="num_of_courses">4 Courses</span>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 online_test_container">
                  <div className="online_test_cat off_campus">
                    <img src={off_campus} height="80" width="80" />
                    <h3 className="cat_title mt-4">Off-Campus Programs</h3>
                    <p className="cat_desc">
                      Lorem ipsum dolor consec tur elit adicing sed umod tempor.
                    </p>
                    <span className="num_of_courses">8 Courses</span>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 online_test_container">
                  <div className="online_test_cat hybrid_distance">
                    <img src={hybrid_program} height="80" width="80" />
                    <h3 className="cat_title mt-4">Hybrid Distance Programs</h3>
                    <p className="cat_desc">
                      Lorem ipsum dolor consec tur elit adicing sed umod tempor.
                    </p>
                    <span className="num_of_courses">8 Courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section_why_us" className="why_us my-5">
          <div className="home_container">
            <div className="why_us_inner">
              <div className="why_us_banner">
                <img src={why_us_banner} width="770" height="470" />
              </div>
              <div className="why_us_content">
                <div className="text-start mb-5">
                  <h5 className="small_heading_title">why us</h5>
                  <h2 className="section_heading">Why Choose Us</h2>
                  <img src={title_bottom_shape} height="15" width="103" />
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div>
                    <img src={customizable_sol} height="80" width="80" />
                  </div>
                  <div className="ms-4">
                    <h3 className="choose_title">customizable solution</h3>
                    <p className="choose_desc">
                      Nostrud exer ciation laboris nis aliqup comodo perspiatix
                      omnis iste natus.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div>
                    <img src={scalable_sol} height="80" width="80" />
                  </div>
                  <div className="ms-4">
                    <h3 className="choose_title">scalable solutions</h3>
                    <p className="choose_desc">
                      Omnis iste natus error sit voluptatem accusan tium
                      doloreque laudantum.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div>
                    <img src={support} height="80" width="80" />
                  </div>
                  <div className="ms-4">
                    <h3 className="choose_title">24x7 Support</h3>
                    <p className="choose_desc">
                      Tempor incididunt ut labore et dolore magna aliqua enim
                      minim veniam quis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section_our_features" className="our_features my-5">
          <div className="features_inner">
            <div className="text-center">
              <h5 className="small_heading_title">features</h5>
              <h2 className="section_heading">Our features</h2>
              <img src={title_bottom_shape} height="15" width="103" />
            </div>

            <div className="features_container mt-5 pt-5">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },

                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },

                  1100: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="features_item position-relative">
                    <div className="feature_img">
                      <img src={our_features1} height="370" width="370" />
                    </div>
                    <div className="feature_content">
                      <h3 className="feature_heading small_heading_title">
                        Online
                      </h3>
                      <h2 className="feature_title">
                        Become a Better Blogger: Content Planning
                      </h2>
                      <p className="feature_desc">
                        Lorem ipsum dolor sit amet cons tetur adipisicing sed do
                        eiusmod ux tempor incid idunt labore dol oremagna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="features_item position-relative">
                    <div className="feature_img">
                      <img src={our_features2} height="370" width="370" />
                    </div>
                    <div className="feature_content">
                      <h3 className="feature_heading small_heading_title">
                        Lecture
                      </h3>
                      <h2 className="feature_title">
                        Become a Better Blogger: Content Planning
                      </h2>
                      <p className="feature_desc">
                        Lorem ipsum dolor sit amet cons tetur adipisicing sed do
                        eiusmod ux tempor incid idunt labore dol oremagna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="features_item position-relative">
                    <div className="feature_img">
                      <img src={our_features3} height="370" width="370" />
                    </div>
                    <div className="feature_content">
                      <h3 className="feature_heading small_heading_title">
                        Business
                      </h3>
                      <h2 className="feature_title">
                        Become a Better Blogger: Content Planning
                      </h2>
                      <p className="feature_desc">
                        Lorem ipsum dolor sit amet cons tetur adipisicing sed do
                        eiusmod ux tempor incid idunt labore dol oremagna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="features_item position-relative">
                    <div className="feature_img">
                      <img src={our_features1} height="370" width="370" />
                    </div>
                    <div className="feature_content">
                      <h3 className="feature_heading small_heading_title">
                        Online
                      </h3>
                      <h2 className="feature_title">
                        Become a Better Blogger: Content Planning
                      </h2>
                      <p className="feature_desc">
                        Lorem ipsum dolor sit amet cons tetur adipisicing sed do
                        eiusmod ux tempor incid idunt labore dol oremagna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="features_item position-relative">
                    <div className="feature_img">
                      <img src={our_features2} height="370" width="370" />
                    </div>
                    <div className="feature_content">
                      <h3 className="feature_heading small_heading_title">
                        Lecture
                      </h3>
                      <h2 className="feature_title">
                        Become a Better Blogger: Content Planning
                      </h2>
                      <p className="feature_desc">
                        Lorem ipsum dolor sit amet cons tetur adipisicing sed do
                        eiusmod ux tempor incid idunt labore dol oremagna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="features_item position-relative">
                    <div className="feature_img">
                      <img src={our_features3} height="370" width="370" />
                    </div>
                    <div className="feature_content">
                      <h3 className="feature_heading small_heading_title">
                        Business
                      </h3>
                      <h2 className="feature_title">
                        Become a Better Blogger: Content Planning
                      </h2>
                      <p className="feature_desc">
                        Lorem ipsum dolor sit amet cons tetur adipisicing sed do
                        eiusmod ux tempor incid idunt labore dol oremagna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="features_item position-relative">
                    <div className="feature_img">
                      <img src={our_features1} height="370" width="370" />
                    </div>
                    <div className="feature_content">
                      <h3 className="feature_heading small_heading_title">
                        Online
                      </h3>
                      <h2 className="feature_title">
                        Become a Better Blogger: Content Planning
                      </h2>
                      <p className="feature_desc">
                        Lorem ipsum dolor sit amet cons tetur adipisicing sed do
                        eiusmod ux tempor incid idunt labore dol oremagna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div id="section_membership_plan" className="home_container">
          <div className="membership_plan py-5">
            <div className="text-center">
              <h5 className="small_heading_title">pricing table</h5>
              <h2 className="section_heading">Great Membership Plan</h2>
              <img src={title_bottom_shape} height="15" width="103" />
            </div>

            <div className="plan_list">
              <div className="row mt-5">
                <div className="col-lg-4 col-md-6">
                  <div className="plan_container text-center">
                    <h5 className="plan_name">Silver Plan</h5>
                    <h3 className="plan_amount mb-0 px-lg-5">$29.00</h3>
                    <p className="lbl_per_month">per month</p>
                    <p className="plan_desc mx-2">
                      Lorem ipsum dolor sit amet consect adipisicing elit sed.
                      do eilt se.
                    </p>

                    <div className="plan_benefits">
                      <ul className="list-unstyled text-center">
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Courses included: 1
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Individual Course
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Course learning checks
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Course discussions
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Offline learning
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <button className="btn_select_plan">
                      Select Plan &nbsp;
                      <img src={black_arrow} height="14" width="14" />
                    </button>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="plan_container text-center">
                    <h5 className="plan_name">Gold Plan</h5>
                    <h3 className="plan_amount mb-0 px-lg-5">$49.00</h3>
                    <p className="lbl_per_month">per month</p>
                    <p className="plan_desc mx-2">
                      Lorem ipsum dolor sit amet consect adipisicing elit sed.
                      do eilt se.
                    </p>

                    <div className="plan_benefits">
                      <ul className="list-unstyled text-center">
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Courses included: 1
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Individual Course
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Course learning checks
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Course discussions
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Offline learning
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <button className="btn_select_plan">
                      Select Plan &nbsp;
                      <img src={black_arrow} height="14" width="14" />
                    </button>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="plan_container text-center">
                    <h5 className="plan_name">Diamond Plan</h5>
                    <h3 className="plan_amount mb-0 px-lg-5">$79.00</h3>
                    <p className="lbl_per_month">per month</p>
                    <p className="plan_desc mx-2">
                      Lorem ipsum dolor sit amet consect adipisicing elit sed.
                      do eilt se.
                    </p>

                    <div className="plan_benefits">
                      <ul className="list-unstyled text-center">
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Courses included: 1
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Individual Course
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Course learning checks
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Course discussions
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={right_arrow} height="15" width="15" />
                            <p className="mx-2 my-0 list_item">
                              Offline learning
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <button className="btn_select_plan">
                      Select Plan &nbsp;
                      <img src={black_arrow} height="14" width="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials py-5">
          <div className="home_container">
            <div className="testimonials_inner">
              <div className="row">
                <div className="col-lg-4">
                  <div className="testimonials_header">
                    <h5 className="small_heading_title">Testimonials</h5>
                    <h2 className="section_heading">
                      What Our Students Have To Say
                    </h2>
                    <img src={title_bottom_shape} height="15" width="103" />
                    <p className="testi_desc mt-3">
                      Lorem ipsum dolor sit amet consectur adipiscing elit sed
                      eiusmod tempor incididunt labore dolore magna aliquaenim
                      ad minim.
                    </p>

                    <button
                      type="button"
                      className="btn btn-primary button mt-4"
                    >
                      View All &nbsp;
                      <img src={arrow_right} width="19" height="15" />
                    </button>
                  </div>
                </div>

                <div className="col-lg-8">
                  <Slider {...settings}>
                    <div className="p-3">
                      <div className="testi_container position-relative">
                        <div className="testi_shape">
                          <img
                            src={testimonial_shap}
                            width="123"
                            height="121"
                          />
                        </div>
                        <div className="position-relative">
                          <div className="testi_user_img my-3">
                            <img src={about_banner} width="70" height="70" />
                          </div>
                          <div className="quotes_circle">
                            <img src={quotes_circle} width="28" height="25" />
                          </div>
                        </div>
                        <div>
                          <p className="testi_desc">
                            Lorem ipsum dolor amet consec tur elit adicing sed
                            do usmod zx tempor enim minim veniam quis nostrud
                            exer citation.
                          </p>
                          <div className="user_ratings d-flex align-items-center justify-content-start gap-1 mb-3">
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                          </div>
                          <h3 className="user_name">Thomas Lopez</h3>
                          <p className="user_profile">Designer</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="testi_container position-relative">
                        <div className="testi_shape">
                          <img
                            src={testimonial_shap}
                            width="123"
                            height="121"
                          />
                        </div>
                        <div className="position-relative">
                          <div className="testi_user_img my-3">
                            <img src={about_banner} width="70" height="70" />
                          </div>
                          <div className="quotes_circle">
                            <img src={quotes_circle} width="28" height="25" />
                          </div>
                        </div>

                        <div>
                          <p className="testi_desc">
                            Lorem ipsum dolor amet consec tur elit adicing sed
                            do usmod zx tempor enim minim veniam quis nostrud
                            exer citation.
                          </p>
                          <div className="user_ratings d-flex align-items-center justify-content-start gap-1 mb-3">
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                          </div>
                          <h3 className="user_name">Thomas Lopez</h3>
                          <p className="user_profile">Designer</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="testi_container position-relative">
                        <div className="testi_shape">
                          <img
                            src={testimonial_shap}
                            width="123"
                            height="121"
                          />
                        </div>
                        <div className="position-relative">
                          <div className="testi_user_img my-3">
                            <img src={about_banner} width="70" height="70" />
                          </div>
                          <div className="quotes_circle">
                            <img src={quotes_circle} width="28" height="25" />
                          </div>
                        </div>
                        <div>
                          <p className="testi_desc">
                            Lorem ipsum dolor amet consec tur elit adicing sed
                            do usmod zx tempor enim minim veniam quis nostrud
                            exer citation.
                          </p>
                          <div className="user_ratings d-flex align-items-center justify-content-start gap-1 mb-3">
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                          </div>
                          <h3 className="user_name">Thomas Lopez</h3>
                          <p className="user_profile">Designer</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="testi_container position-relative">
                        <div className="testi_shape">
                          <img
                            src={testimonial_shap}
                            width="123"
                            height="121"
                          />
                        </div>
                        <div className="position-relative">
                          <div className="testi_user_img my-3">
                            <img src={about_banner} width="70" height="70" />
                          </div>
                          <div className="quotes_circle">
                            <img src={quotes_circle} width="28" height="25" />
                          </div>
                        </div>
                        <div>
                          <p className="testi_desc">
                            Lorem ipsum dolor amet consec tur elit adicing sed
                            do usmod zx tempor enim minim veniam quis nostrud
                            exer citation.
                          </p>
                          <div className="user_ratings d-flex align-items-center justify-content-start gap-1 mb-3">
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                            <img src={star} width="17" height="14" />
                          </div>
                          <h3 className="user_name">Thomas Lopez</h3>
                          <p className="user_profile">Designer</p>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section_our_partners" className="our_partners py-5">
          <div className="home_container">
            <div className="our_partners_header text-center">
              <h5 className="small_heading_title">our partners</h5>
              <h2 className="section_heading">Learn with Our Partners</h2>
              <img src={title_bottom_shape} height="15" width="103" />
              <p className="plan_desc mt-3">
                Lorem ipsum dolor sit amet consect adipisicing elit sed. do eilt
                se.
              </p>
            </div>

            <div className="partners_container py-5 d-flex justify-content-around align-items-center">
              <div>
                <img src={brand1} height="120" width="120" />
              </div>
              <div>
                <img src={brand2} height="120" width="120" />
              </div>
              <div>
                <img src={brand3} height="120" width="120" />
              </div>
              <div>
                <img src={brand4} height="120" width="120" />
              </div>
              <div>
                <img src={brand5} height="120" width="120" />
              </div>
              <div>
                <img src={brand6} height="120" width="120" />
              </div>
            </div>
          </div>
        </div>

        <div id="section_contact_us" className="contact_us py-5">
          <div className="home_container">
            <div className="contact_us_inner">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className=" contact_us_banner">
                    <img
                      src={contact_us_banner}
                      //   height="519"
                      //   width="781"
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="contact_us_header">
                    <h5 className="small_heading_title">contact us</h5>
                    <h2 className="section_heading">Get In Touch</h2>
                    <img src={title_bottom_shape} height="15" width="103" />
                    <p className="plan_desc mt-3">
                      Lorem ipsum dolor sit amet consect adipisicing elit sed.
                      do eilt se.
                    </p>
                  </div>

                  <form className="contact_us_form my-4">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        className="form-control home_input_field"
                        id="name"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-control home_input_field"
                        id="email"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="Phone number"
                        className="form-control home_input_field"
                        id="Phone number"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="form-floating">
                      <textarea
                        className="home_input_field p-2 w-100"
                        // aria-placeholder="Your message"
                        placeholder=" Your message"
                        id="floatingTextarea2"
                        style={{ height: "100px" }}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary button mt-4"
                    >
                      Submit Message &nbsp;
                      <img src={arrow_right} width="19" height="15" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section_main_footer" className="main_footer py-5">
          <div className="home_container">
            <div className="footer_inner">
              <div className="row">
                <div className="col-lg-3 mb-4">
                  <div className="footer_logo">
                    <img src={footer_logo} width="293" height="100" />
                  </div>
                  <p className="footer_text">
                    Lorem ipsum dolor amet consecto adi pisicing elit sed eiusm
                    tempor incidid unt labore dolore.
                  </p>
                  <p className="footer_text mb-2">
                    Add: 70-80 Upper St Norwich NR2
                  </p>
                  <p className="footer_text mb-2">Call: +01 123 5641 231</p>
                  <p className="footer_text mb-2">Email:info@edublink.com</p>
                </div>

                <div className="col-lg-3 mb-4">
                  <div className="ms-lg-auto footer_quick_links_menu">
                    <h3 className="foot_section_headting mb-4">Quick link</h3>
                    <ul className="list-unstyled">
                      <li className="footer_text py-1">
                        <ScrollLink
                          to="section_home"
                          smooth={true}
                          duration={500}
                        >
                          Home
                        </ScrollLink>
                      </li>
                      <li className="footer_text py-1">
                        <ScrollLink
                          to="section_about_us"
                          smooth={true}
                          duration={500}
                        >
                          About
                        </ScrollLink>
                      </li>
                      <li className="footer_text py-1">
                        <ScrollLink
                          to="section_online_test"
                          smooth={true}
                          duration={500}
                        >
                          Test
                        </ScrollLink>
                      </li>
                      <li className="footer_text py-1">
                        <ScrollLink
                          to="section_membership_plan"
                          smooth={true}
                          duration={500}
                        >
                          Price
                        </ScrollLink>
                      </li>
                      <li className="footer_text py-1">
                        <Link className="py-1" to="/login">
                          Sign In
                        </Link>
                      </li>
                      <li className="footer_text py-1">
                        <Link className="py-1" to="register">
                          Registration
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 mb-4">
                  <div className="ps-lg-5 footer_quick_links">
                    <h3 className="foot_section_headting mb-4">Quick link</h3>
                    <ul className="list-unstyled">
                      <li className="footer_text py-1">
                        <a href="#">Contact Us</a>
                      </li>
                      <li className="footer_text py-1">
                        <a href="#">FAQ</a>
                      </li>
                      <li className="footer_text py-1">
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li className="footer_text py-1">
                        <a href="#">Terms Of Service</a>
                      </li>
                      <li className="footer_text py-1">
                        <a href="#">Return Policy</a>
                      </li>
                      <li className="footer_text py-1">
                        <a href="#">Shipping Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 mb-4">
                  <h3 className="foot_section_headting mb-4">Contacts</h3>
                  <ul className="list-unstyled me-5 social_icons_container">
                    <li className="footer_text py-1">
                      <a href="#">
                        <img src={facebook} width="25" height="25" />
                      </a>
                    </li>
                    <li className="footer_text py-1">
                      <a href="#">
                        <img src={linkedin} width="25" height="25" />
                      </a>
                    </li>
                    <li className="footer_text py-1">
                      <a href="#">
                        <img src={insta} width="25" height="25" />
                      </a>
                    </li>
                    <li className="footer_text py-1">
                      <a href="#">
                        <img src={twitter} width="25" height="25" />
                      </a>
                    </li>
                    <li className="footer_text py-1">
                      <a href="#">
                        <img src={youtube} width="25" height="25" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_bar py-4 d-flex justify-content-center align-items-center">
          <p className="mb-0">
            Copyright 2023 <a href="#">QAPrenure</a> Designed By{" "}
            <a href="#">QAPrenure</a> All Right Reserved
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Home)
