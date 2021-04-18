import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import moment from "moment";
import { getRelatedItems } from "../../../services";

class AuctionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: undefined,
      open: false,
      cartModalopen: false,
      stock: "InStock",
      quantity: 1,
      image: "",
      countdown: "",
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
      let strday = moment.utc(diff).format("D");
      strday = strday - 1;
      this.setState({
        countdown: moment.utc(diff).format(` ${strday} วัน HH:mm:ss`),
      });
    }
  }

  render() {
    const { product, symbol } = this.props;
    return (
      <div>
        <div className="product-box">
          <div className="img-wrapper">
            <div className="front">
            <Link to={`${process.env.PUBLIC_URL}/auctiondetail/${product.id}`}>
                <img
                  src={`${product.image}`}
                  style={{ width: "100%" }}
                  className="img-fluid lazyload bg-img"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="product-detail text-left mt-1 pr-1 pl-1">
            <div>
              <Link to={`${process.env.PUBLIC_URL}/auctiondetail/${product.id}`}>
                <h6>{product.name}</h6>
              </Link>
              <div className="row mt-2">
                <div className="col-5">
                  <span className="AuctionDate">{this.state.countdown}</span>
                </div>
                <div className="col-7">
                  <div style={{float:'right',alignItems:'center'}}>
                    <div className="iAuction">
                      <i className="fa fa-gavel" />
                    </div>
                    <span className="AuctionPrice ml-1"> 
                      {symbol}
                      {parseFloat(
                        product.currentprice > 0
                          ? product.currentprice
                          : product.startprice
                      ).toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  symbol: state.data.symbol,
});

export default connect(mapStateToProps)(AuctionItem);
