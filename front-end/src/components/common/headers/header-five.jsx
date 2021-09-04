import React, { Component, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { IntlActions } from "react-redux-multilingual";
import Pace from "react-pace-progress";
// Import custom components
import store from "../../../store";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import { changeCurrency, setLang, setLoading } from "../../../actions";
import { connect } from "react-redux";
import TopBarDark from "./common/topbar-dark";
import LogoImage from "./common/logo";
import cookie from "react-cookies";
import Loader from "react-loader-spinner";
import { Siteurl } from "../../../services/script";
import Modal from "react-modal";
const FallbackContainer = (props) => {
  if (props.isload) {
    return (
      <div
        className="loader-wrapper"
        style={{ background: "rgb(255 255 255 / 22%)" }}
      >
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Loader
            type="Hearts"
            color="rgb(217, 59, 66)"
            height={80}
            width={80}
          />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class HeaderFive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      ismodal: false,
      customer: undefined,
      languageCodes: [],
      language: cookie.load("language") ? cookie.load("language") : "th",
      query: "",
      queryshop: "",
    };
  }
  /*=====================
		 Pre loader
		 ==========================*/

  changeHandler = async (language) => {
    await this.props.setLang(language);
    await this.setState({ language: language });
  };

  componentDidMount() {
    setTimeout(function() {
      document.querySelector(".loader-wrapper").style = "display: none";
    }, 2000);
    this.props.setLoading(false);
    const customer = cookie.load("customerdata");
    if (customer) {
      this.setState({ customer: customer });
      this.checkusersusspend(customer);
    }
  }

  checkusersusspend(customer) {
    fetch(Siteurl + "service/getsusspendcustomerbyid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: customer.id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.result == true) {
          this.setState({ ismodal: true });
        }
      });
  }
  handleSearch = () => {
    window.location = `search/${this.state.query}`;
  };
  queryChange = (evt) => {
    this.setState({ query: evt.target.value });
  };

  handleShopSearch = () => {
    window.location = `searchshop/${this.state.queryshop}`;
  };
  queryShopChange = (evt) => {
    this.setState({ queryshop: evt.target.value });
  };

  componentWillMount() {
    this.props.setLang(this.state.language);
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // if (number >= 300) {
    //   if (window.innerWidth < 576) {
    //     document.getElementById("sticky").classList.remove("fixed");
    //   } else document.getElementById("sticky").classList.add("fixed");
    // } else {
    //   document.getElementById("sticky").classList.remove("fixed");
    // }
  };

  changeLanguage(lang) {
    this.changeHandler(lang);
  }

  openNav() {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }
  openSearch() {
    document.getElementById("search-overlay").style.display = "block";
  }

  closeSearch() {
    document.getElementById("search-overlay").style.display = "none";
  }

  load = () => {
    this.setState({ isLoading: true });
    fetch().then(() => {
      // deal with data fetched
      this.setState({ isLoading: false });
    });
  };

  closeModal() {
    this.setState({ ismodal: false });
  }

  logout() {
    cookie.remove("customerdata", { path: "/" });
    window.location.href = "/pages/login/false";
  }

  render() {
    const { customer } = this.state;
    return (
      <div>
        <Modal isOpen={this.state.ismodal} style={customStyles}>
          <div class="modal-header">
            <h2>แจ้งเตือน</h2>
          </div>
          <div class="modal-body">
            <div>"บัญชีคุณถูกระงับ กรุณาติดต่อเจ้าหน้าที่"</div>
          </div>
          <div class="modal-footer">
            <button
              onClick={() => this.logout()}
              type="submit"
              class="btn btn-primary"
            >
              ออกจากบัญชีนี้
            </button>
          </div>
        </Modal>
        <FallbackContainer isload={this.props.isloading} />
        <header id="sticky" className="sticky">
          <p>{this.state.question}</p>
          {this.state.isLoading ? <Pace color="#27ae60" /> : null}
          <div className="mobile-fix-option" />
          {/*Top Header Component*/}
          <TopBarDark />

          <div className="container topnav">
            <div className="row">
              <div className="col-sm-12">
                <div className="main-menu">
                  <div className="menu-left category-nav-right">
                    <div className="brand-logo">
                      <LogoImage logo={this.props.logoName} />
                    </div>
                    <div className="navbar"> 
                          <div className="d-block d-sm-none">
                            <a href={`${process.env.PUBLIC_URL}`} style={{color:'#000'}}>
                              <i style={{color:'#0073bf'}} class="fa fa-home" /> หน้าหลัก
                            </a>
                          </div> 
                      {/* <a href="javascript:void(0)" onClick={this.openNav}>
												<div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
											</a> */}
                      {/*SideBar Navigation Component*/}
                      {/* <SideBar/> */}
                    </div>
                  </div>
                  <div className="menu-right pull-right">
                    {/*Top Navigation Bar Component*/}
                    {/* <NavBar/> */}

                    <div>
                      <div className="icon-nav">
                        <ul>
                          <li className="onhover-div mobile-search">
                            <div className="d-none d-sm-block">
                              <a href={`${process.env.PUBLIC_URL}`}>
                                <h6 style={{ textDecoration: "underline" }}>
                                  หน้าหลัก
                                </h6>
                              </a>
                            </div>
                          </li>
                          <li className="onhover-div mobile-search">
                            <div className="d-none d-sm-block">
                              <a href={`https://seller.pettogo.co/`}>
                                <h6 style={{ textDecoration: "underline" }}>
                                  ขายสินค้ากับ Pettogo.co
                                </h6>
                              </a>
                            </div>
                          </li>
                          <li className="onhover-div mobile-search">
                            <div>
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/icon/search.png`}
                                onClick={this.openSearch}
                                className="img-fluid"
                                alt=""
                              />
                              <i
                                className="fa fa-search"
                                onClick={this.openSearch}
                              />
                            </div>
                          </li>
                          {this.state.customer != undefined && (
                            <li className="onhover-div mobile-setting">
                              <div className="d-none d-sm-block">
                                <Link
                                  to={`${process.env.PUBLIC_URL}/pages/user`}
                                >
                                  <h6 style={{ textDecoration: "underline" }}>
                                    {this.state.customer.firstname}{" "}
                                    {this.state.customer.lastname}
                                  </h6>
                                </Link>
                              </div>
                            </li>
                          )}
                          <li className="onhover-div mobile-setting">
                            <div>
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/icon/setting.png`}
                                className="img-fluid"
                                alt=""
                              />
                              <i className="fa fa-cog" />
                            </div>
                            <div className="show-div setting">
                              {/* <h6>ผู้ใช้</h6> */}
                              {this.state.customer != undefined ? (
                                <div className=".d-block .d-sm-none">
                                  <ul>
                                    <li>
                                      <Link
                                        to={`${
                                          process.env.PUBLIC_URL
                                        }/pages/user`}
                                      >
                                        {this.state.customer.firstname}{" "}
                                        {this.state.customer.lastname}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              ) : (
                                <ul>
                                  <li>
                                    <Link
                                      to={`${
                                        process.env.PUBLIC_URL
                                      }/pages/login/false`}
                                    >
                                      เข้าสู่ระบบ
                                    </Link>
                                  </li>
                                  <li>
                                    <a
                                      href={`${
                                        process.env.PUBLIC_URL
                                      }/pages/register/false`}
                                    >
                                      สมัครสมาชิก
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              <h6>ภาษา</h6>
                              <ul>
                                <li>
                                  <a
                                    style={{
                                      textDecoration:
                                        this.state.language == "zh-CN"
                                          ? "underline"
                                          : "none",
                                    }}
                                    href={null}
                                    onClick={() => this.changeLanguage("zh-CN")}
                                  >
                                    Chinease
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    style={{
                                      textDecoration:
                                        this.state.language == "en"
                                          ? "underline"
                                          : "none",
                                    }}
                                    href={null}
                                    onClick={() => this.changeLanguage("en")}
                                  >
                                    English
                                  </a>{" "}
                                </li>
                                <li>
                                  <a
                                    style={{
                                      textDecoration:
                                        this.state.language == "th"
                                          ? "underline"
                                          : "none",
                                    }}
                                    href={null}
                                    onClick={() => this.changeLanguage("th")}
                                  >
                                    ไทย
                                  </a>{" "}
                                </li>
                              </ul>
                              {/* <h6>currency</h6>
															<ul className="list-inline">
																<li><a href={null} onClick={() => this.props.changeCurrency('€')}>euro</a> </li>
																<li><a href={null} onClick={() => this.props.changeCurrency('₹')}>rupees</a> </li>
																<li><a href={null} onClick={() => this.props.changeCurrency('£')}>pound</a> </li>
																<li><a href={null} onClick={() => this.props.changeCurrency('$')}>doller</a> </li>
															</ul> */}
                              <a href={`https://seller.pettogo.co/`}>
                                <h5
                                  style={{
                                    textDecoration: "underline",
                                    color: "#035cff",
                                    marginTop: 10,
                                  }}
                                >
                                  ขายสินค้ากับ Pettogo.co{" "}
                                </h5>{" "}
                              </a>
                            </div>
                          </li>
                          {/*Header Cart Component */}
                          <CartContainer />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="search-overlay" className="search-overlay">
          <div>
            <span
              className="closebtn"
              onClick={this.closeSearch}
              title="Close Overlay"
            >
              ×
            </span>
            <div className="overlay-content">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="txtsearch"
                        placeholder="ค้นหาสินค้า"
                        value={this.state.query}
                        onChange={this.queryChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.handleSearch}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="txtsearch"
                        placeholder="ค้นหาร้านค้า"
                        value={this.state.queryshop}
                        onChange={this.queryShopChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.handleShopSearch}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isloading: state.loading.isloading,
});

export default connect(
  mapStateToProps,
  { changeCurrency, setLang, setLoading }
)(HeaderFive);
