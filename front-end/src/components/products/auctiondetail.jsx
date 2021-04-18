import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import "../common/index.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import custom Components
import Service from "./common/service";
import BrandBlock from "./common/brand-block";
import NewProduct from "../common/new-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import Shoptop from "./common/shop-top";
import {
  addToCart,
  addToCartUnsafe,
  addToWishlist,
  addToWishlistUnsafe,
} from "../../actions";
import ImageZoom from "./common/product/image-zoom";
import SmallImages from "./common/product/small-image";
import { Siteurl } from "../../services/script";
import NumericInput from "react-numeric-input";
import moment from "moment";
import { toast } from "react-toastify";
class Auctiondetail extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nav1: null,
      nav2: null,
      customer: undefined,
      auction: undefined,
      stock: "InStock",
      quantity: 1,
      image: "",
      countdown: "",
      bidprice: 0,
      minprice: 0,
      auctionprice: 0,
    };
    this._updateauctioninterval = null;
  }

  // document.getElementById('idOfElement').classList.add('newClassName');

  async componentDidMount() {
    const customer = sessionStorage.getItem("customer");
    if (customer) {
      const _customer = JSON.parse(customer);
      await this.setState({
        customer: _customer,
      });
    }

    this.getacutionbyid(this.props.auctionid);
    this._updateauctioninterval = setInterval(() => {
      this.updateauctioninterval(this.props.auctionid);
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this._updateauctioninterval);
  }
  filterClick() {
    document.getElementById("filter").style.left = "-15px";
  }
  backClick() {
    document.getElementById("filter").style.left = "-365px";
  }

  submitauction = () => {
    let { auction, auctionprice, minprice, bidprice, customer } = this.state;
    if (customer == undefined) {
      window.location.href = "/pages/login/false";
    }
    if (bidprice < minprice) {
      alert(`ราคาขั้นต่ำคือ ${minprice} กรุณาตรวจสอบ`);
    } else {
      fetch(Siteurl + "service/submitauction", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          auctionid: auction.id,
          auctionprice: bidprice,
          custid: this.state.customer.id,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            toast.success("ส่งราคาเรียบร้อย");
            this.getacutionbyid(this.props.auctionid);
          },
          (error) => {
            this.setState({ ismodal: false });
          }
        );
    }
  };

  updateauctioninterval = (auctionid) => {
    fetch(Siteurl + "service/getauctionbyid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: auctionid }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let auction = result.result;
          this.setState({ auction: auction });

          let auctionprice =
            auction.currentprice > 0
              ? auction.currentprice
              : auction.startprice;
          let minprice =
            parseFloat(auctionprice) + parseFloat(auction.minimumbidamount);
          this.setState({
            bidprice: minprice,
            minprice: minprice,
            auctionprice: auctionprice,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  getacutionbyid = (auctionid) => {
    fetch(Siteurl + "service/getauctionbyid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: auctionid }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let auction = result.result;
          this.setState({ auction: auction });

          let dateto = moment(auction.dto).format("YYYY-MM-DD HH:mm:ss");
          let difftime = moment(dateto).diff(moment(), "seconds");

          var countDownDate = moment().add(difftime, "seconds");
          var intervalId = setInterval(() => {
            var diff = moment(countDownDate).diff(moment());
            this.updateTime(diff);
          }, 1000);

          this.setState({ intervalId });

          let auctionprice =
            auction.currentprice > 0
              ? auction.currentprice
              : auction.startprice;
          let minprice =
            parseFloat(auctionprice) + parseFloat(auction.minimumbidamount);
          this.setState({
            bidprice: minprice,
            minprice: minprice,
            auctionprice: auctionprice,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  updateTime(diff) {
    if (diff <= 0) {
      clearInterval(this.state.intervalId);
      this.setState({ countdown: "จบแล้ว" });
    } else {
      let strday = moment.utc(diff).format("D");
      strday = strday - 1;
      this.setState({
        countdown: moment.utc(diff).format(` ${strday} วัน HH:mm:ss`),
      });
    }
  }

  setbidingprice(val) {
    // console.log(val);
    this.setState({ bidprice: val });
  }

  render() {
    const { symbol } = this.props;
    let { auctionname } = this.props;
    let { auction, auctionprice, minprice } = this.state;

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>Pettogo.co | {`รายการประมูล`}</title>
          <meta name="description" content={`Pettogo.co – ${auctionname}`} />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb parent={"ประมูล"} title={auctionname} />

        {/*Section Start*/}
        {auction ? (
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-xs-12 mb-2">
                    <img
                      src={`${auction.image}`}
                      style={{ width: "100%" }}
                      className="img-fluid lazyload bg-img"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 col-xs-12">
                    <div className="auctionprice-box">
                      <div className="row">
                        <div className="col p-2">
                          <div
                            className="AuctionDate2 mb-2"
                            style={{
                              width: "100%",
                              borderBottom: "1px solid rgb(216 216 216)",
                            }}
                          >
                            <div>
                              {this.state.countdown != "จบแล้ว" && (
                                <label style={{ color: "#000" }}>
                                  เหลือเวลา
                                </label>
                              )}
                              {this.state.countdown}
                            </div>
                            <div className="row text-left  p-3">
                              <div className="col text-center">
                                <span style={{ fontSize: 25 }}>
                                  <i className="fa fa-user" />{" "}
                                  {auction.countofbidder}
                                  <p style={{ fontWeight: "lighter" }}>
                                    ผู้เข้าร่วม
                                  </p>
                                </span>
                              </div>
                              <div className="col text-center">
                                <span style={{ fontSize: 25 }}>
                                  <i className="fa fa-gavel" />{" "}
                                  {auction.countofbid}
                                  <p style={{ fontWeight: "lighter" }}>
                                    จำนวนบิด
                                  </p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <form>
                            <div class="form-group row">
                              <label
                                for="staticEmail"
                                class="col-sm-2 col-form-label"
                              >
                                <strong>
                                  {this.state.countdown == "จบแล้ว"
                                    ? `ราคาสุดท้าย`
                                    : `ราคาปัจจุบัน`}
                                </strong>
                              </label>
                              <div class="col-sm-10">
                                <h3
                                  style={{
                                    color: "rgb(0, 114, 190)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <span style={{ fontSize: 18 }}>{symbol}</span>
                                  {parseFloat(auctionprice).toLocaleString(
                                    navigator.language,
                                    {
                                      minimumFractionDigits: 0,
                                    }
                                  )}
                                </h3>
                                {auction.custid === this.state.customer.id && (
                                  <span style={{ color: "red" }}>
                                    (!คุณเป็นผู้เสนอราคานี้)
                                  </span>
                                )}
                              </div>
                            </div>
                            {this.state.countdown != "จบแล้ว" && (
                              <div class="form-group row">
                                <div class="col-sm-10">
                                  <label class="col-sm-2 col-form-label">
                                    {`ราคาขึ้นต่ำ`}
                                    <span className="min-bid">
                                      {minprice.toLocaleString(
                                        navigator.language,
                                        {
                                          minimumFractionDigits: 0,
                                        }
                                      )}
                                    </span>
                                  </label>
                                  <NumericInput
                                    disabled={
                                      auction.custid === this.state.customer.id
                                    }
                                    className="form-control"
                                    value={this.state.bidprice}
                                    min={minprice}
                                    step={auction.minimumbidamount}
                                    precision={0}
                                    size={5}
                                    onChange={(v) => this.setbidingprice(v)}
                                    mobile
                                  />
                                  {/* <input
                                  type="number"
                                  class="form-control"
                                  placeholder="ระบุราคาที่ต้องการประมูล"
                                  onChange={(v) =>
                                    this.setbidingprice(v.target.value)
                                  }
                                  value={this.state.bidprice}
                                /> */}
                                </div>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                    {this.state.countdown != "จบแล้ว" && (
                      <button
                        disabled={auction.custid === this.state.customer.id}
                        className="btn btn-solid "
                        style={{ borderRadius: 5, width: "100%" }}
                        onClick={() => this.submitauction()}
                      >
                        ส่งราคา
                      </button>
                    )}
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col">
                    <section className="tab-product m-0">
                      <h5>รายละเอียดสินค้า</h5>
                      <div
                        class="col-12"
                        dangerouslySetInnerHTML={{
                          __html: auction.description,
                        }}
                      />
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        {/*Section End*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let auctionid = ownProps.match.params.id;
  let name = ownProps.match.params.name;
  return {
    auctionid: auctionid,
    auctionname: name,
    // item: state.data.products.find((el) => el.id == productId),
    symbol: state.data.symbol,
  };
};

export default connect(
  mapStateToProps,
  { addToCart, addToCartUnsafe, addToWishlist }
)(Auctiondetail);
