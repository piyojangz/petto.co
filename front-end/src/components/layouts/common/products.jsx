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
import { Link } from "react-router-dom";
class SpecialProducts extends Component {
  renderitems(items) {
    const { symbol } = this.props;
    return items.map((product, index) => (
      <div className="product-box">
        <div className="img-wrapper">
          {product.isoffer == 1 && (
            <div
              className="pl-1 pr-1 m-1"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: "#d93b42",
                color: "#fff",
                borderRadius: 5,
              }}
            >
              <i className="fa fa-flash" />
              <span style={{ fontSize: 12 }}>แนะนำ</span>
            </div>
          )}
          {/* <div className="lable-block">
                      {(product.new == true)? <span className="lable3">มาใหม่</span> : ''}
                      {(product.sale == true)? <span className="lable4">ราคาพิเศษ</span> : ''}

                  </div> */}
          <div className="front">
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                product.id
              }`}
            >
              <img src={`${product.image}`} className="img-fluid" alt="" />
            </Link>
          </div>
        </div>
        <div className="product-detail text-center mt-1">
          <div>
            {/* <div className="rating">
                          {RatingStars}
                      </div> */}
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                product.id
              }`}
            >
              <h6>{product.name}</h6>
            </Link>
            <h4 style={{ color: "#0072BE" }}>
              <span style={{ fontSize: 14 }}>{symbol}</span>
              {(product.discount > 0
                  ? product.discount
                  : product.price
                ).toLocaleString(navigator.language, {
                  minimumFractionDigits: 2,
                })}
              {product.discount > 0 && (
                <del>
                  <span className="money">
                    <span style={{ fontSize: 14 }}>{symbol}</span>
                    {product.price.toLocaleString(navigator.language, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </del>
              )}
            </h4>
          </div>
        </div>
      </div>
    ));
  }
  render() {
    const { items, symbol } = this.props;
    console.log("itemsitems", items);
    return (
      <div>
        <div className="title1 section-t-space">
          <h2 className="title-inner1">รายการสินค้า</h2>
        </div>
        <section className="section-b-space p-t-0">
          <div className="container">
            <div className="no-slider row">
              {items != undefined && this.renderitems(items)}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  {}
)(SpecialProducts);
