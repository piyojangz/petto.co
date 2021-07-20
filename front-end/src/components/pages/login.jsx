import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../common/breadcrumb";
import CryptoJS from "crypto-js";
import { Siteurl } from "../../services/script";
import cookie from "react-cookies";
import { toast } from "react-toastify";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isregistersuccess: false,
      showpass:false
    };
  }
  componentDidMount() {
    this.setState({
      isregistersuccess: this.props.isregistersuccess == "true" ? true : false,
    });
  }

  Login = () => {
    const { email, password } = this.state;
    if (email == "" || password == "") {
      toast.warn("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    let _password = CryptoJS.MD5(password).toString();
    const prms = {
      email: this.state.email,
      password: _password,
    };
    fetch(Siteurl + "service/customerlogin", {
      method: "POST",
      headers: {
        // "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(prms),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          if (result.result != null) {
            // sessionStorage.setItem("customer", JSON.stringify(result.result));
            cookie.save("customerdata", JSON.stringify(result.result), {
              path: "/",
              maxAge: 100000 * 360,
            });

            window.location = "/";
          } else {
            toast.warn("ไม่พบรายชื่อนี้ในระบบ หรือ รหัสผ่านไม่ถูกต้อง");
          }
        },
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    console.log(prms);
  };
  render() {
    const { isregistersuccess } = this.state;
    return (
      <div>
          <div style={{background:'#d9b504',padding:2,textAlign:'center'}}>
        <a href={`https://seller.pettogo.co/`}> <h6 style={{textDecoration:'underline',color:'#fff',paddingTop:6}}>  ขายสินค้ากับ Petto.co</h6></a> 
         </div>
        <Breadcrumb title={"เข้าสู่ระบบ"} /> 
        {/*Login section*/}
        <section className="login-page section-b-space">
          <div className="container">
            {isregistersuccess == true && (
              <center>
                <div class="alert alert-danger" role="alert">
                  {"กรุณายืนยันอีเมลล์และทำตามขั้นตอนก่อนเข้าสู่ระบบค่ะ"}
                </div>
              </center>
            )}
            <div className="row">
              <div className="col-lg-6">
                <h3>เข้าสู่ระบบ</h3>
                <div className="theme-card">
                  <form className="theme-form">
                    <div className="form-group">
                      <label htmlFor="email">อีเมลล์ที่ใช้ลงทะเบียน</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="ระบุอีเมลล์"
                        required=""
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="review">รหัสผ่าน</label>
                      <div className="input-group">
                      <input
                        type={this.state.showpass?'text':'password'}
                        className="form-control"
                        id="review"
                        placeholder="ระบุรหัสผ่าน"
                        required=""
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                       <span className="input-group-append">
                       <div onClick={() => this.setState({showpass:!this.state.showpass})} className="btn btn-outline-secondary border-left-0 border" style={{height:54}}>
          <i class="fa  fa-eye" style={{lineHeight:3}} />
          </div>
        </span>
                      </div>
                    </div>
                    <a
                      href="javascript:;"
                      className="btn btn-petto"
                      onClick={() => this.Login()}
                    >
                      เข้าสู่ระบบ
                    </a>
                  </form>
                </div>
                <a
                  href="/pages/forget-password"
                  style={{ float: "right", marginTop: 15 }}
                >
                  ลืมรหัสผ่าน?
                </a>
              </div>
              <div className="col-lg-6 right-login">
                <h3>ลูกค้าใหม่</h3>
                <div className="theme-card authentication-right">
                  <h6 className="title-font">สมัครสมาชิก</h6>
                  <p>
                    สำหรับสมาชิกใหม่ เมื่อสมัครแล้วสามารถทำการซื้อสินค้ากับ
                    Pettogo.co ได้ทันที
                    <br />
                    ส่วนสำหรับผู้ขายต้องรอการยืนยันจากเจ้าหน้าที่ก่อน
                  </p>
                  <a
                    href={`${process.env.PUBLIC_URL}/pages/register/false`}
                    className="btn btn-petto-secondcolor"
                  >
                    สมัครสมาชิก
                  </a>
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
  isregistersuccess: ownProps.match.params.isregistersuccess,
});

export default connect(mapStateToProps)(Login);
