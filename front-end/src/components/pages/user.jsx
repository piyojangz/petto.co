import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import Shoptop from "../products/common/shop-top";
import AuctionList from "../layouts/pets/auctionlist";
import PaidingList from "../layouts/pets/paidinglist";
import WaitingList from "../layouts/pets/waitinglist";
import WaitingReviewList from "../layouts/pets/waitingreviewlist";
import { setLoading } from "../../actions";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap-tabs";
import Modal from "react-modal";
import { Siteurl } from "../../services/script";
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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fulladdress: "",
      ismodal: false,
      pendingpaid: 0,
      pendingpaidlist: undefined,
      paid: 0,
      paidlist: undefined,
      review: 0,
      reviewlist: undefined,
      auction: 0,
      auctionlist: undefined,
      historylist: [],
      customer: {
        firstname: "",
        lastname: "",
        email: "",
        fulladdress: "",
        tel: "",
      },
    };
  }

  async componentDidMount() {
    const customer = cookie.load("customerdata");
    // console.log('this.state.customer',customer)
    if (customer) {
      const _customer = customer;
      await this.setState({
        customer: _customer,
        fulladdress: _customer.fulladdress,
        tel: _customer.tel,
      });

      this.getorderpendingpaid();
      this.getorderpaid();
      this.getorderreview();
      this.gethistory();
      this.getauction();
    }
  }

  getauction() {
    fetch(Siteurl + "service/getauctionhistorybycustid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        custid: this.state.customer.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            auctionlist: result.result,
            auction: result.result.length,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  gethistory() {
    fetch(Siteurl + "service/gethistory", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        custid: this.state.customer.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("historylist", result);
          this.setState({
            historylist: result.result,
          });
        },
        (error) => {
          console.log("error", error);
        }
      );
  }

  getorderpendingpaid() {
    fetch(Siteurl + "service/getorderpendingpaid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        custid: this.state.customer.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("resultresult", result);
          this.setState({
            pendingpaidlist: result.result,
            pendingpaid: result.result.length,
          });
        },
        (error) => {
          this.setState({ ismodal: false });
        }
      );
  }

  getorderpaid() {
    fetch(Siteurl + "service/getorderpaid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        custid: this.state.customer.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("resultresult", result);
          this.setState({
            paidlist: result.result,
            paid: result.result.length,
          });
        },
        (error) => {
          this.setState({ ismodal: false });
        }
      );
  }

  getorderreview() {
    fetch(Siteurl + "service/getorderreview", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        custid: this.state.customer.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            reviewlist: result.result,
            review: result.result.length,
          });
        },
        (error) => {
          this.setState({ ismodal: false });
        }
      );
  }

  logout() {
    // console.log("asdasdsa");
    // sessionStorage.removeItem("customer");
    cookie.remove("customerdata");
    window.location.href = "/pages/login/false";
  }

  closeModal() {
    this.setState({ ismodal: false });
  }

  saveaddress(event) {
    event.preventDefault();
    fetch(Siteurl + "service/setcustomeraddress", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        tel: this.state.tel,
        fulladdress: this.state.fulladdress,
        custid: this.state.customer.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let customer = this.state.customer;
          customer.fulladdress = this.state.fulladdress;
          customer.tel = this.state.tel;
          // sessionStorage.setItem("customer", JSON.stringify(customer));
          cookie.save("customer", JSON.stringify(result.result), { path: "/" });
          toast.success("อัพเดทข้อมูลเรียบร้อย");
          this.setState({ ismodal: false });
          window.location.href = "/pages/user";
        },
        (error) => {
          this.setState({ ismodal: false });
        }
      );
  }

  onShippingInfo() {
    this.setState({
      ismodal: true,
    });
  }

  isLoading(loading) {
    this.props.setLoading(loading);
  }

  onsubmitOrder() {
    this.getorderpendingpaid();
    this.getorderpaid();
    this.getorderreview();
    this.getauction();
  }

  render() {
    const { customer, ismodal, fulladdress, tel, historylist } = this.state;
    // console.log("fulladdress", fulladdress);
    return (
      <div>
        <Breadcrumb title={"Dashboard"} />

        {/*Dashboard section*/}
        <section className="section-b-space">
          <div className="container">
            {/* <Shoptop /> */}
            <Tabs onSelect={(index, label) => console.log(label + " selected")}>
              <Tab label="ข้อมูลส่วนตัว">
                <div className="no-slider row">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="dashboard-right">
                        <div className="dashboard">
                          <div className="page-title">
                            <h2>ข้อมูลส่วนตัว</h2>
                          </div>
                          <div className="box-account box-info">
                            <div className="box-head">
                              <div className="row">
                                <div className="col-6">
                                  <h2>บัญชี</h2>
                                </div>
                                <div className="col-6 text-right">
                                  <h2>
                                    <a
                                      href="javascript:;"
                                      onClick={() => this.logout()}
                                      style={{
                                        color: "red",
                                        textDecoration: "underline",
                                      }}
                                    >
                                      ออกจากระบบ
                                    </a>
                                  </h2>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="box">
                                  <div className="box-title">
                                    <h3>ข้อมูลสำหรับจัดส่ง</h3>
                                  </div>
                                  <div className="box-content">
                                    <h6>
                                      {customer.firstname} {customer.lastname}
                                    </h6>
                                    <h6>{customer.email}</h6>
                                    {/* <h6>
                                      <a href="#">เปลี่ยนรหัสผ่าน</a>
                                    </h6> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="box">
                                <div className="box-title" />
                                <div className="row">
                                  {/* <div className="col-sm-6">
                                                            <h6>Default Billing Address</h6>
                                                            <address>
                                                                You have not set a default billing address.<br/>
                                                                <a href="#">Edit Address</a>
                                                            </address>
                                                        </div> */}
                                  <div className="col-sm-6">
                                    <h6>เบอร์โทรศัพท์</h6>
                                    <p style={{ color: "#212529" }}>
                                      {customer.tel || "-"}
                                    </p>
                                    <h6>การจัดส่งสินค้า</h6>
                                    <address>
                                      {customer.fulladdress || "-"}
                                      <br />
                                      {customer.fulladdress == "" ? (
                                        <a
                                          href="javascript:;"
                                          onClick={() =>
                                            this.setState({
                                              ismodal: true,
                                            })
                                          }
                                        >
                                          เพิ่มที่อยู่สำหรับจัดส่ง
                                        </a>
                                      ) : (
                                        <a
                                          href="javascript:;"
                                          onClick={() =>
                                            this.setState({
                                              ismodal: true,
                                            })
                                          }
                                        >
                                          แก้ไข
                                        </a>
                                      )}
                                    </address>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="dashboard-right">
                        <div className="dashboard">
                          <div className="page-title">
                            <h2>ประวัติการซื้อ</h2>
                          </div>
                          {historylist.map((product, index) => (
                            <div className="row mb-2">
                              <div className="col-12 card">
                                <div className="media mr-2 bb-1">
                                  <img
                                    src={product.image}
                                    className="rounded mt-2 mr-2"
                                    style={{
                                      width: 30,
                                      height: 30,
                                    }}
                                    alt=""
                                  />{" "}
                                  <label className="mt-2">
                                    {product.name
                                      ? product.name
                                      : product.webname}
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
                                              <div className="col-4">
                                                {row.amount}
                                              </div>
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
                                          <p className="m-0 p-0">
                                            เลข tracking
                                          </p>
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
                                          style={{
                                            color: "green",
                                          }}
                                        >
                                          จัดส่งแล้ว {product.createdate}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                label={`รายการประมูล ${
                  this.state.auction > 0 ? `(${this.state.auction})` : ""
                }`}
              >
                <AuctionList auctionlist={this.state.auctionlist} />
              </Tab>
              <Tab
                label={`รายการที่ต้องชำระ ${
                  this.state.pendingpaid > 0
                    ? `(${this.state.pendingpaid})`
                    : ""
                }`}
              >
                <PaidingList
                  onaddShuppingInfo={this.onShippingInfo.bind(this)}
                  onsubmit={this.onsubmitOrder.bind(this)}
                  pendingdata={this.state.pendingpaidlist}
                />
              </Tab>
              <Tab
                label={`รายการที่ต้องได้รับ ${
                  this.state.paid > 0 ? `(${this.state.paid})` : ""
                }`}
              >
                <WaitingList
                  onsubmit={this.onsubmitOrder.bind(this)}
                  paiddata={this.state.paidlist}
                />
              </Tab>
              <Tab
                label={`รายการที่ต้องรีวิว ${
                  this.state.review > 0 ? `(${this.state.review})` : ""
                }`}
              >
                <WaitingReviewList
                  isLoading={this.isLoading.bind(this)}
                  onsubmit={this.onsubmitOrder.bind(this)}
                  reviewdata={this.state.reviewlist}
                />
              </Tab>
            </Tabs>
          </div>
        </section>
        <Modal isOpen={ismodal} style={customStyles}>
          <form method="post" onSubmit={(e) => this.saveaddress(e)}>
            <div class="modal-header">
              <h5 class="modal-title f-w-600" id="exampleModalLabel2">
                ข้อมูลที่อยู่สำหรับจัดส่งสินค้า
              </h5>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  required
                  className="form-control"
                  onChange={(v) => this.setState({ tel: v.target.value })}
                  value={tel}
                />
              </div>
              <div className="form-group">
                <label>ที่อยู่</label>
                <textarea
                  required
                  style={{ height: 200 }}
                  className="form-control"
                  onChange={(v) =>
                    this.setState({ fulladdress: v.target.value })
                  }
                  placeholder="ตัวอย่าง : 199/202 หมู่บ้านเรสท์ ซอยสายไหม 43 แขวงสายไหม เขตสายไหม กรุงเทพ 10220"
                  value={fulladdress}
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

export default connect(
  null,
  { setLoading }
)(User);
