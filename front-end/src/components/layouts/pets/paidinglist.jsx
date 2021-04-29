import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import {
  getBestSeller,
  getMensWear,
  getWomensWear,
} from "../../../services/index";
import { addToCart, addToWishlist, addToCompare, addToWishlistUnsafe } from "../../../actions/index";
import ProductItem from "./product-item";
import AuctionItem from "./auction-item";
import Countdown from "react-countdown";
import Modal from "react-modal";
import { Siteurl } from "../../../services/script";
import { toast } from "react-toastify";
import cookie from "react-cookies";
// Renderer callback with condition
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

class PaidingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ismodal: false,
      customer: undefined,
      paymentlist: [],
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
      const _customer =  customer;
      await this.setState({
        customer: _customer,
      });
    }
  }

  closeModal() {
    this.setState({ ismodal: false });
  }

  getpaymentdetail(product) {
    fetch(Siteurl + "service/getpaymentmethod", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        merchantid: product.merchantid,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            paymentlist: result.result,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  paymentform(product) {
    if(this.state.customer.fulladdress == ""){
      alert('กรุณาระบุที่อยู่สำหรับจัดส่งสินค้า');
      this.props.onaddShuppingInfo(); 
      return false;
    }
    this.getpaymentdetail(product);
    this.setState({ ismodal: true, confirmorder: product });
  }

  convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async handleChangeImage(event) {
    const file = event.target.files[0];
    const base64 = await this.convertBase64(file);
    this.setState({
      confirmorder: {
        ...this.state.confirmorder,
        slipimg: base64,
      },
    });
  }

  confirmpayment(event) {
    event.preventDefault();
    const { confirmorder } = this.state;
    console.log(confirmorder);
    fetch(Siteurl + "service/confirmpayment", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        orderid: confirmorder.id,
        payacc: confirmorder.payacc,
        payamount: confirmorder.payamount,
        slipimg: confirmorder.slipimg,
        paydate: confirmorder.paydate,
        paytime: confirmorder.paytime,
        custid: confirmorder.custid,
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
          //this.setState({ ismodal: false });
        }
      );
  }

  render() {
    const { pendingdata } = this.props;
    const { customer, ismodal, fulladdress } = this.state;
    //console.log("pendingdata", pendingdata);
    const { date } = new Date();
    return (
      <div>
        <div className="title1 section-t-space">
          <h2 className="title-inner1">รายการที่ต้องชำระ</h2>
        </div>
        <section className="section-b-space p-t-0">
          <div className="container">
            {pendingdata.map((product, index) => (
              <div className="row mb-2">
                <div className="col-md-4 card">
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
                                    {row.price.toLocaleString(
                                      navigator.language,
                                      {
                                        minimumFractionDigits: 2,
                                      }
                                    )}
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
                        <p color={"#000000"}>ค่าจัดส่ง</p>
                      </div>
                      <div className="col-6 text-right">
                        <p>
                          ฿
                          {product.shippingfee.toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-6 text-right">
                        <p className="m-0 p-0">ยอดที่ต้องชำระทั้งสิ้น</p>
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
                      <div className="col-6 text-right">
                        <button
                          onClick={() => this.paymentform(product)}
                          className="btn btn-solid"
                          type="submit"
                        >
                          ชำระเงินรายการนี้
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Modal isOpen={ismodal} style={customStyles}> 
          <form method="post" onSubmit={(e) => this.confirmpayment(e)}>
            <div class="modal-header">
              <h5 class="modal-title">
                ชำระเงินสำหรับคำสั่งซื้อ{" "}
                <b>#{this.state.confirmorder.orderno}</b>
              </h5>
            </div>
            <div
              className="modal-body"
              className="form-group"
              style={{ maxHeight: 500, overflowY: "scroll" }}
            >
              <div className="form-group mt-2">
                <label>ช่องทางการชำระเงิน</label>
                <ul>
                  {this.state.paymentlist.map((val) => (
                    <li>
                      {" "}
                      <p>
                        {" "}
                        <img
                          src={val.banklogo}
                          style={{ width: 20 }}
                          className="img mr-2"
                        />
                        {`${val.acctype} - ${val.bankname}`}
                        <br />
                        {`เลขที่บัญชี ${val.accno} - ${val.accname}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="form-group mt-2">
                <label>จำนวนเงินที่โอน</label>
                <input
                  className="form-control"
                  onChange={(v) =>
                    this.setState({
                      confirmorder: {
                        ...this.state.confirmorder,
                        payamount: v.target.value,
                      },
                    })
                  }
                  type="number"
                  required="required"
                  placeholder="จำนวนเงิน (บาท)"
                  value={this.state.payamount}
                />
              </div>
              <div className="form-group">
                <label>ช่องทางการโอนเงิน</label>
                <select
                  class="custom-select"
                  required
                  onChange={(v) =>
                    this.setState({
                      confirmorder: {
                        ...this.state.confirmorder,
                        payacc: v.target.value,
                      },
                    })
                  }
                >
                  <option value="">--Select--</option>
                  {this.state.paymentlist.map((val) => (
                    <option
                      value={`${val.acctype} - ${val.bankname} - ${val.accno}`}
                    >{`${val.acctype} - ${val.bankname} - ${
                      val.accno
                    }`}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>วันที่โอน</label>
                <input
                  required
                  type="date"
                  className="form-control"
                  onChange={(v) =>
                    this.setState({
                      confirmorder: {
                        ...this.state.confirmorder,
                        paydate: v.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>เวลาโอน</label>
                <input
                  required
                  type="time"
                  className="form-control"
                  onChange={(v) =>
                    this.setState({
                      confirmorder: {
                        ...this.state.confirmorder,
                        paytime: v.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="form-group">
                {this.state.confirmorder.slipimg != "" && (
                  <img
                    src={this.state.confirmorder.slipimg}
                    className="img"
                    style={{
                      width: "100%",
                    }}
                  />
                )}
              </div>
              <div className="form-group">
                <label>รูปภาพ/สลิป</label>
                <input
                  required
                  className="form-control"
                  type="file"
                  accept="image/png, image/jpeg"
                  encType="multipart/form-data"
                  onChange={(e) => this.handleChangeImage(e)}
                />
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">
                ยืนยัน
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => this.closeModal()}
              >
                ปิดหน้านี้
              </button>
            </div>
          </form>
        </Modal>
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
)(PaidingList);
