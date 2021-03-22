import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { getRelatedItems } from "../../../services";
import moment from "moment";
class AuctionlistItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      image: "",
    };
  }
  componentDidMount() {
    const { product, symbol } = this.props;
    console.log("auc", product);
    let dateto = moment(product.dto).format("YYYY-MM-DD HH:mm:ss");
    let difftime = moment(dateto).diff(moment(), "seconds");

    var countDownDate = moment().add(difftime, "seconds");
    var intervalId = setInterval(() => {
      var diff = moment(countDownDate).diff(moment());
      this.updateTime(diff);
    }, 1000);
    this.setState({ intervalId });
  }

  updateTime(diff) {
    if (diff <= 0) {
      clearInterval(this.state.intervalId);
      this.setState({ countdown: "จบแล้ว" });
    } else {
      this.setState({
        countdown: moment.utc(diff).format("เหลือเวลา D วัน HH:mm:ss"),
      });
    }
  }
  render() {
    const { product, symbol } = this.props;
    return (
      <div>
        <div className="product-box">
          <div className="row">
            <div className="col-5">
              <div className="img-wrapper">
                <div className="front">
                  <Link
                    to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                      product.id
                    }`}
                  >
                    <img src={product.image} className="img-fluid" alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-7 ">
              <div>
                <Link
                  to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                    product.id
                  }`}
                >
                  <h5>{product.name}</h5>
                </Link>
                <h3 style={{ color: "rgb(0, 114, 190)", fontWeight: "bold" }}>
                  <span style={{ fontSize: 18 }}>{symbol}</span>
                  {parseFloat(product.startprice).toLocaleString(
                    navigator.language,
                    {
                      minimumFractionDigits: 0,
                    }
                  )}
                </h3>
                <span className="AuctionDate2">{this.state.countdown}</span>
                <br />
                {this.state.countdown != "จบแล้ว" && (
                  <Link
                    to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                      product.id
                    }`}
                    className="btn btn-primary"
                  >
                    <h5 style={{ color: "#fff" }}>เข้าประมูล</h5>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // relatedItems: getRelatedItems(state.data.products, ownProps.product.category),
  symbol: state.data.symbol,
});

export default connect(mapStateToProps)(AuctionlistItem);
