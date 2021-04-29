import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";
import {
  getBestSeller,
  getMensWear,
  getWomensWear,
} from "../../../services/index";
import { addToCart, addToWishlist, addToCompare } from "../../../actions/index";
import ProductItem from "./product-item";
import AuctionItem from "./auction-item";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
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

class WaitingReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ismodal: false,
      customer: undefined,
      file: [null],
      confirmreview: {
        orderid: "",
        itemid: "",
        itemname: "",
        rating: 5,
      },
    };
    this.fileObj = [];
    this.fileArray = [];

    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
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

  makereview(row, orderid) {
    console.log(row);
    let confirmreview = {
      orderid: orderid,
      itemid: row.itemid,
      itemname: row.name,
      rating: 5,
    };
    this.fileObj = [];
    this.fileArray = [];
    this.setState({ ismodal: true, confirmreview: confirmreview });
  }

  closeModal() {
    this.setState({ ismodal: false });
  }

  ratingChanged(newRating) {
    this.setState({
      confirmreview: {
        ...this.state.confirmreview,
        rating: newRating,
      },
    });
  }

  async uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    this.fileArray = [];
    for (let i = 0; i < this.fileObj.length; i++) {
      const base64 = await this.convertBase64(this.fileObj[i][0]);
      this.fileArray.push(base64);
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
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

  makeconfirmreview(event) {
    this.props.isLoading(true);
    event.preventDefault();
    const { confirmreview, customer } = this.state;

    fetch(Siteurl + "service/addreview", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        custid: customer.id,
        orderid: confirmreview.orderid,
        itemid: confirmreview.itemid,
        itemname: confirmreview.itemname,
        message: confirmreview.message,
        rating: confirmreview.rating,
        pictures: this.state.file,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          toast.success("ยืนยันข้อมูลเรียบร้อย");
          this.setState({ ismodal: false });
          this.props.isLoading(false);
          this.props.onsubmit();
        },
        (error) => {
          console.log(error);
          //this.setState({ ismodal: false });
        }
      );
  }

  render() {
    const { reviewdata } = this.props;
    const { customer, ismodal, fulladdress, confirmreview } = this.state;
    return (
      <div>
        <div className="title1 section-t-space">
          <h2 className="title-inner1">รีวิวสินค้า</h2>
        </div>
        <section className="section-b-space p-t-0">
          <div className="container">
            {reviewdata.map((product, index) => (
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
                        <div className="row pb-3">
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
                                <div className="col-md-12 text-right">
                                  <button
                                    className="btn btn-solid"
                                    onClick={() =>
                                      this.makereview(row, product.id)
                                    }
                                  >
                                    รีวิวสินค้าชิ้นนี้
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Modal isOpen={ismodal} style={customStyles}>
          <form method="post" onSubmit={(e) => this.makeconfirmreview(e)}>
            <div class="modal-header">
              <h5 class="modal-title">
                <b>{confirmreview.itemname}</b>{" "}
              </h5>
            </div>
            <div
              className="modal-body"
              className="form-group"
              style={{ maxHeight: 500, overflowY: "scroll" }}
            >
              <div className="form-group mt-2">
                <label>กรุณาเขียนรีวิวให้กับสินค้าชิ้นนี้</label>
                <textarea
                  className="form-control"
                  onChange={(v) =>
                    this.setState({
                      confirmreview: {
                        ...this.state.confirmreview,
                        message: v.target.value,
                      },
                    })
                  }
                  type="text"
                  required="required"
                  placeholder=""
                  value={this.state.payamount}
                />
              </div>
              <div className="form-group mt-2">
                <label>คะแนน</label>
                <ReactStars
                  count={5}
                  onChange={this.ratingChanged.bind(this)}
                  size={24}
                  value={5}
                  isHalf={false}
                  emptyIcon={<i className="far fa-star" />}
                  halfIcon={<i className="fa fa-star-half-alt" />}
                  fullIcon={<i className="fa fa-star" />}
                  activeColor="#ffd700"
                />
              </div>
              <div className="form-group multi-preview">
                <div className="row">
                  {(this.fileArray || []).map((url) => (
                    <div className="col-4">
                      <img
                        src={url}
                        alt=""
                        style={{ width: "100%" }}
                        className="m-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group mt-2">
                <label>รูปภาพ</label>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    onChange={this.uploadMultipleFiles}
                    accept="image/png, image/jpeg"
                    // multiple
                  />
                </div>
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
)(WaitingReviewList);
