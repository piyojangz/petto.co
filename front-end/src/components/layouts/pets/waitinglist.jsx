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

class WaitingList extends Component {
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
          <h2 className="title-inner1">รายการสินค้าที่ต้องได้รับ</h2>
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
                            <div className="col-4">ขนส่ง</div>
                            <div className="col-8 text-right">
                              KERRY 
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">Track</div>
                            <div className="col-8 text-right">
                              1sxd415456wfs
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">x1</div>
                            <div className="col-8 text-right">
                              <p>ยอดคำสั่งซื้อทั้งหมด: <p className="petto-price">฿30,900</p></p>
                             
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 text-right">
                              <button className="btn btn-solid" type="submit">
                                ฉันได้รับสินค้านี้แล้ว
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
)(WaitingList);
