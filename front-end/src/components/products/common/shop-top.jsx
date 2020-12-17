import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { Link } from "react-router-dom";

class Shoptop extends Component {
  render() {
    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <form className="theme-form mt-4">
              <hr />
              <div className="form-row">
                <div className="col-md-12 ">
                  <div className="media m-0">
                    <img
                      src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t31.0-8/21427327_1662269207125713_6840415808923796799_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHzVqbIeITQAxNXS4ThrYH9zdD0ZQzUEILN0PRlDNQQgvTSH9TRWZJ0eKhj8jO0rjM&_nc_ohc=u87hRn6TGoAAX8rP_Pb&_nc_ht=scontent.fbkk5-5.fna&oh=33de20e8e470d5b8668c555354e6a258&oe=60018DE1`}
                      className="rounded"
                      style={{ width: 60, height: 60 }}
                      alt=""
                    />
                    <div className="col-md-12 ">
                      <div className="row">
                        <div className="col-6 ">
                          <i
                            class="fa fa-bullhorn mr-1"
                            aria-hidden="true"
                            style={{ color: "red" }}
                          />
                          <label style={{ marginBottom: 0 }}>
                            <b>{"ร้านค้าแนะนำ"}</b>
                          </label>
                        </div>
                        <div className="col-6 text-right">
                          <i
                            className="fa fa-star"
                            style={{ color: "#ffc107" }}
                          />
                          <label style={{ marginBottom: 0, color: "#f63b3b" }}>
                            4.8/5.0
                          </label>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12 ">
                          <label style={{ marginBottom: 0 }}>
                            ร้านขายปลาสวยงาม ราชพฤกษ์ ตลาดเทพเจริญ9 Fish Ville
                            Ratchaphruek
                          </label>
                          {/* <div className="media-body">
                            <div className="rating three-star">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                          </div>  */}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6 ">
                          <i
                            class="fa fa-check-circle"
                            aria-hidden="true"
                            style={{ color: "green" }}
                          />
                          <label style={{ marginBottom: 0 }}>
                            ร้านค้ายืนยัน
                          </label>
                        </div>
                        <div className="col-6 text-right">
                          <i
                            class="fa fa-heart"
                            aria-hidden="true"
                            style={{ color: "red" }}
                          />
                          <label style={{ marginBottom: 0 }}>200 ขายแล้ว</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
      </section>
    );
  }
}

export default Shoptop;
