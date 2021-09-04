import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { Link } from "react-router-dom";

class Shoptop extends Component {
  render() {
    const { shop, shoprating } = this.props;
    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <form className="theme-form mt-4">
              {/* <hr /> */}
              <div className="form-row">
                <div className="col-md-12 ">
                  <div className="media m-0">
                    <Link to={`${process.env.PUBLIC_URL}/shop/${shop.id}`}>
                      <img
                        src={`${shop.image}`}
                        className="rounded ml-2"
                        style={{ width: 60, height: 60 }}
                        alt=""
                      />
                    </Link>
                    <div className="col-md-12 ">
                      <div className="row">
                        <div className="col-6 ">
                          {shop.isrecommend == 1 && (
                            <div>
                              <i
                                class="fa fa-bullhorn mr-1"
                                aria-hidden="true"
                                style={{ color: "red" }}
                              />
                              <label style={{ marginBottom: 0 }}>
                                <b>{"ร้านค้าแนะนำ"}</b>
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="col-6 text-right">
                          <label
                            style={{
                              marginBottom: 0,
                              color: "#f63b3b",
                              marginTop: -10,
                            }}
                          >
                            {shoprating}
                          </label>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12 ">
                          <Link
                            to={`${process.env.PUBLIC_URL}/shop/${shop.id}`}
                          >
                            <label style={{ marginBottom: 0 }}>
                              {shop.title}
                            </label>
                          </Link>
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
                        <div className="col">
                          {["2", "3", "4"].includes(shop.packageid) && (
                            <div>
                              <i
                                class="fa fa-check-circle"
                                aria-hidden="true"
                                style={{ color: "green" }}
                              />
                              <label style={{ marginBottom: 0 }}>
                                ร้านค้ายืนยัน
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="col">
                          <i
                            className="fa fa-heart"
                            aria-hidden="true"
                            style={{ color: "red" }}
                          />
                          <label style={{ marginBottom: 0 }}>
                            ขายไปแล้ว {shop.sold || "0"} ชิ้น
                          </label>
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
        <div className="row">
          <div
            className="col-sm-12 col-lg-12"
            style={{ paddingLeft: 20, paddingRight: 20 }}
          >
            <div dangerouslySetInnerHTML={{ __html: shop.textcustom }} />
          </div>
        </div>
        <hr />
      </section>
    );
  }
}

export default Shoptop;
