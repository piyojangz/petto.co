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

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <p className="petto-timeup">หมดเวลาแล้ว</p>;
  } else {
    // Render a countdown
    return (
      <div className="product-description border-product">
        <h6 className="product-title mb-0">เวลาที่เหลือ</h6>
        <div className="petto-timer">
          <p>
            <span className="mr-2">
              {hours}
              <span className="padding-l time">:Hour</span>
            </span>
            <span className="mr-2">
              {minutes}
              <span className="padding-l time">:Min</span>
            </span>
            <span className="mr-2">
              {seconds}
              <span className="padding-l time">:Sec</span>
            </span>
          </p>
        </div>
      </div>
    );
  }
};

class AuctionList extends Component {
  render() {
    const { symbol, auctionlist } = this.props;
    return (
      <div>
        <div className="title1 section-t-space">
          <h2 className="title-inner1">รายการประมูล</h2>
        </div>
        <section className="section-b-space p-t-0">
          <div className="container">
            {auctionlist.map((product, index) => (
              <div key={index}  className="card p-2">
                <AuctionItem product={product} symbol={symbol} key={index} />
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
)(AuctionList);
