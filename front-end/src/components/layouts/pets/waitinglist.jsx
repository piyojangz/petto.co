import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";

import {
  getBestSeller,
  getMensWear,
  getWomensWear,
} from "../../../services/index";
import { addToCart, addToWishlist, addToCompare } from "../../../actions/index";
import ProductItem from "./product-item";
import AuctionItem from "./auction-item";
import Countdown from "react-countdown";
import Modal from "react-modal";
import { Siteurl } from "../../../services/script";
import { toast } from "react-toastify";
import cookie from "react-cookies";
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
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
class WaitingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ismodal: false,
      customer: undefined,
      confirmorder: {
        orderno: "",
        payamount: 0,
        slipimg: "",
      },
    };
  }

  async componentDidMount() {
    const customer = cookie.load("customerdata");
    if (customer) {
      const _customer = customer;
      await this.setState({
        customer: _customer,
      });
    }
  }

  confirmdeliver(product) {
    if (window.confirm("ยืนยันการรับสินค้า")) { 
        fetch(Siteurl + "service/confirmdeliver", {
          method: "POST",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify({
            id: product.id,
          }),
        })
          .then((res) => res.json())
          .then(
            (result) => {
              toast.success("ยืนยันข้อมูลเรียบร้อย");
              this.setState({ ismodal: false });
              this.props.onsubmit();
            },
            (error) => {
              console.log(error);
            }
          ); 
    }
  }

  render() {
    const { paiddata } = this.props;
    const { customer, ismodal, fulladdress } = this.state;
    return (
      <div>
        <div className="title1 section-t-space">
          <h2 className="title-inner1">รายการสินค้าที่ต้องได้รับ</h2>
        </div>

        <section className="section-b-space p-t-0">
          <div className="container">
            {paiddata.map((product, index) => (
              <div className="row mb-2">
                <div className="col-12 card">
                  <div className="media mr-2 bb-1">
                    <img
                      src={product.image}
                      className="rounded mt-2 mr-2"
                      style={{ width: 30, height: 30 }}
                      alt=""
                    />{" "}
                    <label className="mt-2">
                      {product.name ? product.name : product.webname}
                    </label>
                  </div>
                  <div className="media mr-2 bb-1">
                    Orderno : <b>#{product.orderno}</b>
                  </div>
                  <div className="m-0 mt-3">
                    {product.orderdetails.map((row, index) => {
                      return (
                        <div key={index} className="row pb-3">
                          <div className="col-4">
                            <img
                              src={row.image}
                              className="img-fluid lazyload rounded"
                              alt=""
                            />
                          </div>
                          <div className="col-8">
                            <div className="front">
                              <label>{row.name}</label>
                              <div className="row">
                                <div className="col-4">{row.amount}</div>
                                <div className="col-8 text-right">
                                  <p>
                                    ฿
                                    {numberWithCommas(row.price)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="row mb-2">
                      <div className="col-6 text-right">
                        <p className="m-0 p-0">ยอดชำระ</p>
                      </div>
                      <div className="col-6 text-right">
                        <p className="petto-price">
                          ฿
                          {product.grandtotal.toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    {product.status == "3" && (
                      <div>
                        <div className="row mb-2">
                          <div className="col-6 text-right">
                            <p className="m-0 p-0">บริษัทขนส่ง</p>
                          </div>
                          <div className="col-6 text-right">
                            <p className="m-0 p-0">
                              {product.delivery_company}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6 text-right">
                            <p className="m-0 p-0">เลข tracking</p>
                          </div>
                          <div className="col-6 text-right">
                            <p className="m-0 p-0">
                              {product.delivery_trackid}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-6 text-right">
                            <p className="m-0 p-0">อื่นๆ</p>
                          </div>
                          <div className="col-6 text-right">
                            <p className="m-0 p-0">
                              {product.delivery_other || "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row mb-2">
                      <div className="col-6 text-right" />
                      {product.status === "3" && (
                        <div className="col-6 text-right">
                          <p
                            className="m-0 p-0"
                            style={{ color: "greenyellow" }}
                          >
                            จัดส่งแล้ว
                          </p>
                        </div>
                      )}
                      {product.status !== "3" &&
                        (product.isconfirm === "1" ? (
                          <div className="col-6 text-right">
                            <p
                              className="m-0 p-0"
                              style={{ color: "greenyellow" }}
                            >
                              ยืนยันข้อมูลแล้ว
                            </p>
                          </div>
                        ) : (
                          <div className="col-6 text-right">
                            <p className="m-0 p-0">รอตรวจสอบจากร้านค้า</p>
                          </div>
                        ))}
                    </div>
                    {product.isconfirm === "1" && (
                      <div className="row  mb-2">
                        <div className="col-md-12 text-right">
                          <button
                            onClick={() => this.confirmdeliver(product)}
                            className="btn btn-solid"
                            type="submit"
                          >
                            ฉันได้รับสินค้านี้แล้ว
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bestSeller: getBestSeller(state.data.products),
  mensWear: getMensWear(state.data.products),
  womensWear: getWomensWear(state.data.products),
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(WaitingList);
