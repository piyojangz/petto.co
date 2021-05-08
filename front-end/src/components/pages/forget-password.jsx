import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Siteurl } from "../../services/script";
import { toast } from "react-toastify";
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  ForgetPassword(e) {
    e.preventDefault();
    const { email } = this.state;
    const prms = {
      email: this.state.email,
    };
    fetch(Siteurl + "service/customerresetpassword", {
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
          if (result != null) {
            toast.success(
              "รหัสผ่านชั่วคราวได้ถูกส่งไปยังอีเมลล์/ไลน์ของท่านแล้ว อย่าลืมเปลี่ยนพาสเวิร์ดนะคะ"
            );
          } else {
            toast.warn("ไม่พบอีเมลล์นี้ในระบบ");
          }

          this.setState({ email: "" });
        },
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <Breadcrumb title={"ลืมรหัสผ่าน?"} />

        {/*Forget Password section*/}
        <section className="pwd-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <h2>ลืมรหัสผ่าน</h2>
                <form
                  className="theme-form"
                  onSubmit={(e) => this.ForgetPassword(e)}
                >
                  <div className="form-row">
                    <div className="col-md-12">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        value={this.state.email}
                        placeholder="ระบุอีเมลล์ที่ใช้ลงทะเบียน"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-petto">
                      ยืนยัน
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ForgetPassword;
