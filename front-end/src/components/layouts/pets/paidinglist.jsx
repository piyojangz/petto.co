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

class PaidingList extends Component {
  render() {
    const {
      bestSeller,
      mensWear,
      womensWear,
      symbol,
      addToCart,
      addToWishlist,
      addToCompare,
    } = this.props;
    return (
      <div>
        <div className="title1 section-t-space">
          <h2 className="title-inner1">รายการประมูล</h2>
        </div>
        <section className="section-b-space p-t-0">
          <div className="container">
            {bestSeller.map((product, index) => (
              <div className="row mb-2">
                <div className="col-12 card">
                  <div className="media mr-2 bb-1">
                    <img
                      src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t31.0-8/21427327_1662269207125713_6840415808923796799_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHzVqbIeITQAxNXS4ThrYH9zdD0ZQzUEILN0PRlDNQQgvTSH9TRWZJ0eKhj8jO0rjM&_nc_ohc=u87hRn6TGoAAX8rP_Pb&_nc_ht=scontent.fbkk5-5.fna&oh=33de20e8e470d5b8668c555354e6a258&oe=60018DE1`}
                      className="rounded mt-2 mr-2"
                      style={{ width: 30, height: 30 }}
                      alt=""
                    />{" "}
                    <label className="mt-2">
                      ร้านขายปลาสวยงาม ราชพฤกษ์ ตลาดเทพเจริญ9 Fish Ville
                      Ratchaphruek
                    </label>
                  </div>
                  <div className="m-0 mt-3">
                    <div className="row pb-3">
                      <div className="col-4">
                        <img
                          src={`https://upload.wikimedia.org/wikipedia/commons/e/ec/Betta_reflected.jpg`}
                          className="img-fluid lazyload rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-8">
                        <div className="front">
                          <label>เพศเมีย หางสั้น เกิด 28 กันยายน 2563</label>
                          <div className="row">
                            <div className="col-5">Orderid</div>
                            <div className="col-7 text-right">
                              2011014514
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">x1</div>
                            <div className="col-8 text-right">
                              <p>
                                (ส่วนลดลูกค้าใหม่)
                                <strike>฿35,900</strike>
                              </p>
                              <p className="petto-price">฿30,900</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 text-right">
                              <button className="btn btn-solid" type="submit">
                                ชำระเงิน
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
)(PaidingList);
