import React, { Component } from "react";
import { Siteurl } from "../../services/script";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";
const liff = window.liff;
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      userLineID: "",
      pictureUrl: "",
      statusMessage: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
      isaccept: false,
      showpass: false,
      showpass2: false,
    };
  }
  componentDidMount() {
    this.setState({ isaccept: this.props.isaccept == "true" ? true : false });

    console.log("liff", liff);
    this.getProfile();
  }

  getProfile() {
    liff.init({ liffId: "1656457430-BML1k06b" }, async () => {
      let getProfile = await liff.getProfile();
      this.setState({
        name: getProfile.displayName,
        userLineID: getProfile.userId,
        pictureUrl: getProfile.pictureUrl,
        statusMessage: getProfile.statusMessage,
        email: liff.getDecodedIDToken().email,
      });
    });
  }
  sendMessage() {
    liff
      .sendMessages([
        {
          type: "text",
          text: "Hi LIFF , " + this.state.userLineID,
        },
      ])
      .then(() => {
        liff.closeWindow();
      });
  }
  closeLIFF() {
    // ปิด
    liff.closeWindow();
  }

  Register = () => {
    const { isaccept } = this.state;
    if (isaccept == true) {
      this.doRegister();
      return true;
    } else {
      alert("กรุณาอ่านนโยบายและข้อกำหนดและติ๊กเครื่องหมายยอมรับ");
      return false;
    }
  };

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  doRegister = () => {
    const prms = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      repassword: this.state.repassword,
      userLineID: this.state.userLineID,
      pictureUrl: this.state.pictureUrl,
      name: this.state.name,
    };

    if (
      prms.firstname == "" ||
      prms.lastname == "" ||
      prms.email == "" ||
      prms.password == "" ||
      prms.repassword == ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (!this.validateEmail(prms.email)) {
      alert("รูปแบบอีเมลล์ไม่ถูกต้อง");
      return;
    }

    if (prms.password != prms.repassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    prms.password = CryptoJS.MD5(prms.password).toString();
    prms.repassword = CryptoJS.MD5(prms.repassword).toString();
    fetch(Siteurl + "service/registercust", {
      method: "POST",
      headers: {
        // "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(prms),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result != false) {
            this.closeLIFF();
            // window.location = "/pages/login/true";
          } else {
            alert("อีเมลล์นี้มีผู้ใช้งานแล้ว");
            return;
          }
        },
        (error) => {
          console.log(error);
          alert(error);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  handleChange = () => {
    this.setState({ isaccept: !this.state.isaccept });
  };

  render() {
    console.log("this.props.isaccept", this.props.isaccept);
    return (
      <div>
        <div style={{ background: "#d9b504", padding: 2, textAlign: "center" }}>
          <a href={`https://seller.pettogo.co/`}>
            {" "}
            <h6
              style={{
                textDecoration: "underline",
                color: "#fff",
                paddingTop: 6,
              }}
            >
              {" "}
              ขายสินค้ากับ Pettogo.co
            </h6>
          </a>
        </div>
        <Breadcrumb title={"สมัครสมาชิก"} />

        {/*Regsiter section*/}
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>สมัครสมาชิก</h3>
                <div className="theme-card">
                  <form className="theme-form">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">ชื่อ</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          placeholder="ชื่อจริง"
                          value={this.state.firstname}
                          required
                          onChange={(e) =>
                            this.setState({ firstname: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lname">นามสกุล</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lname"
                          placeholder="นามสกุล"
                          required
                          onChange={(e) =>
                            this.setState({ lastname: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">อีเมลล์</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="ระบุอีเมลล์"
                          required
                          // disabled={this.state.email != '' ? 'disabled' : ''}
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="review">รหัสผ่าน</label>
                          <div className="input-group">
                            <input
                              type={this.state.showpass ? "text" : "password"}
                              className="form-control"
                              id="review"
                              placeholder="ระบุรหัสผ่าน"
                              required=""
                              onChange={(e) =>
                                this.setState({ password: e.target.value })
                              }
                            />
                            <span className="input-group-append">
                              <div
                                onClick={() =>
                                  this.setState({
                                    showpass: !this.state.showpass,
                                  })
                                }
                                className="btn btn-outline-secondary border-left-0 border"
                                style={{ height: 46 }}
                              >
                                <i
                                  class="fa  fa-eye"
                                  style={{ lineHeight: 2.5 }}
                                />
                              </div>
                            </span>
                          </div>
                        </div>

                        {/* <label htmlFor="passw">รหัสผ่าน</label>
                        <input
                          type="password"
                          className="form-control"
                          id="passw"
                          placeholder="ระบุรหัสผ่าน"
                          required=""
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                        /> */}
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="review">ยืนยันรหัสผ่าน</label>
                          <div className="input-group">
                            <input
                              type={this.state.showpass2 ? "text" : "password"}
                              className="form-control"
                              id="review"
                              placeholder="ระบุรหัสผ่าน"
                              required=""
                              onChange={(e) =>
                                this.setState({ repassword: e.target.value })
                              }
                            />
                            <span className="input-group-append">
                              <div
                                onClick={() =>
                                  this.setState({
                                    showpass2: !this.state.showpass2,
                                  })
                                }
                                className="btn btn-outline-secondary border-left-0 border"
                                style={{ height: 46 }}
                              >
                                <i
                                  class="fa  fa-eye"
                                  style={{ lineHeight: 2.5 }}
                                />
                              </div>
                            </span>
                          </div>
                        </div>


                        {/* <label htmlFor="repassw">ยืนยันรหัสผ่าน</label>
                        <input
                          type="password"
                          className="form-control"
                          id="repassw"
                          placeholder="ระบุรหัสผ่าน"
                          required=""
                          onChange={(e) =>
                            this.setState({ repassword: e.target.value })
                          }
                        /> */}
                      </div>
                      <div className="col-md-6">
                        <span>
                          <label>
                            <input
                              type="checkbox"
                              checked={
                                this.state.isaccept == true ? "checked" : ""
                              }
                              ref="complete"
                              onChange={this.handleChange}
                            />
                            {" ยอมรับ"}
                          </label>
                        </span>{" "}
                        <a
                          href={`${process.env.PUBLIC_URL}/pages/termandcond`}
                          className="text-center tandc"
                        >
                          นโยบายและข้อกำหนด
                        </a>
                      </div>
                      <a
                        href="javascript:;"
                        className="btn-petto-secondcolor  text-center"
                        onClick={() => this.Register()}
                      >
                        ยืนยันการสมัครสมาชิก
                      </a>
                      {/* <a 
                        onClick={this.sendMessage.bind(this)}
                        style={{ marginRight: "20px" }}
                      >
                        Send Message
                      </a> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isaccept: ownProps.match.params.isaccept,
});

export default connect(mapStateToProps)(Register);
