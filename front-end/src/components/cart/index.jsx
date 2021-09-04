import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Breadcrumb from "../common/breadcrumb";
import { getCartTotal } from "../../services";
import { removeFromCart, incrementQty, decrementQty } from "../../actions";
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
class cartComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cartItems, symbol, total } = this.props;
    console.log("cartItems", cartItems);
    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>Pettogo.co | ตะกร้าของฉัน</title>
          <meta
            name="description"
            content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses."
          />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"ตะกร้า"} />

        {cartItems.length > 0 ? (
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12" style={{ overflowX: "scroll" }}>
                  <table className="table cart-table table-responsive-xs">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">รูป</th>
                        <th scope="col">ชื่อสินค้า</th>
                        <th scope="col">ค่าส่ง</th>
                        <th scope="col">ราคา</th>
                        <th scope="col">จำนวน</th>
                        <th scope="col">สถานะ</th>
                        <th scope="col">สรุปยอด</th>
                      </tr>
                    </thead>
                    {cartItems.map((item, index) => {
                      let images = item.image.split("#");
                      let price = item.discount ? item.discount : item.price;
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              <Link
                                to={`${process.env.PUBLIC_URL}/product/${
                                  item.id
                                }`}
                              >
                                <img src={images[0]} alt="" />
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`${process.env.PUBLIC_URL}/product/${
                                  item.id
                                }`}
                              >
                                {item.name}
                              </Link>
                              <div className="mobile-cart-content row">
                                <div className="col-xs-3">
                                  <div className="qty-box">
                                    <div className="input-group">
                                      <div className="qty-box">
                                        <div className="input-group">
                                          <span className="input-group-prepend">
                                            <button
                                              type="button"
                                              className="btn quantity-left-minus"
                                              onClick={() =>
                                                this.props.decrementQty(item.id)
                                              }
                                              data-type="minus"
                                              data-field=""
                                            >
                                              <i className="fa fa-angle-left" />
                                            </button>
                                          </span>
                                          <input
                                            type="text"
                                            name="quantity"
                                            value={item.qty}
                                            readOnly={true}
                                            className="form-control input-number"
                                          />

                                          <span className="input-group-prepend">
                                            <button
                                              className="btn quantity-right-plus"
                                              onClick={() =>
                                                this.props.incrementQty(item, 1)
                                              }
                                              data-type="plus"
                                              disabled={
                                                item.qty >= item.stock
                                                  ? true
                                                  : false
                                              }
                                            >
                                              <i className="fa fa-angle-right" />
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                      {item.qty >= item.stock
                                        ? `ไม่สามารถเพิ่มได้มากกว่า ${
                                            item.stock
                                          }`
                                        : ""}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xs-3">
                                  <h2 className="td-color">
                                   ราคา {"฿"}
                                    {numberWithCommas(price)}
                                  </h2>
                                </div>
                                <div className="col-xs-3">
                                  <h2 className="td-color">
                                    <button
                                      style={{
                                        background: "#fff",
                                        fontSize: 14,
                                        borderWidth: 0,
                                      }}
                                      className="icon"
                                      onClick={() =>
                                        this.props.removeFromCart(item)
                                      }
                                    >
                                      {/* <i className="icon-close"></i> */}
                                      ยกเลิก
                                    </button>
                                  </h2>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5>
                                {"฿"}
                                {numberWithCommas(item.shippingfee)}
                              </h5>
                            </td>
                            <td>
                              <h2>
                                {"฿"}
                                {numberWithCommas(price)}
                              </h2>
                            </td>
                            <td>
                              <div className="qty-box">
                                <div className="input-group">
                                  <span className="input-group-prepend">
                                    <button
                                      type="button"
                                      className="btn quantity-left-minus"
                                      onClick={() =>
                                        this.props.decrementQty(item.id)
                                      }
                                      data-type="minus"
                                      data-field=""
                                    >
                                      <i className="fa fa-angle-left" />
                                    </button>
                                  </span>
                                  <input
                                    type="text"
                                    name="quantity"
                                    value={item.qty}
                                    readOnly={true}
                                    className="form-control input-number"
                                  />

                                  <span className="input-group-prepend">
                                    <button
                                      className="btn quantity-right-plus"
                                      onClick={() =>
                                        this.props.incrementQty(item, 1)
                                      }
                                      data-type="plus"
                                      disabled={
                                        item.qty >= item.stock ? true : false
                                      }
                                    >
                                      <i className="fa fa-angle-right" />
                                    </button>
                                  </span>
                                </div>
                              </div>
                              {item.qty >= item.stock
                                ? `ไม่สามารถเพิ่มได้มากกว่า ${item.stock}`
                                : ""}
                            </td>
                            <td>
                              <button
                                style={{
                                  background: "#fff",
                                  fontSize: 14,
                                  borderWidth: 0,
                                }}
                                className="icon"
                                onClick={() => this.props.removeFromCart(item)}
                              >
                                ยกเลิก
                              </button>
                            </td>
                            <td>
                              <h2 className="td-color">
                                {"฿"}
                                {numberWithCommas(item.sum)}
                              </h2>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <table className="table cart-table table-responsive-md">
                    <tfoot>
                      <tr>
                        <td>ยอดรวม :</td>
                        <td>
                          <h2>
                            {"฿"}
                            {numberWithCommas(total)}
                          </h2>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="row cart-buttons">
                <div className="col-6">
                  <Link
                    to={`${process.env.PUBLIC_URL}/category/0/ทั้งหมด`}
                    className="btn btn-solid"
                  >
                    เลือกสินค้าต่อ
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to={`${process.env.PUBLIC_URL}/checkout`}
                    className="btn btn-solid"
                  >
                    ยืนยันการสั่งซื้อ
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/icon-empty-cart.png`}
                        className="img-fluid mb-4"
                        alt=""
                      />
                      <h3>
                        <strong>Your Cart is Empty</strong>
                      </h3>
                      <h4>Explore more shortlist some items.</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cartList.cart,
  symbol: state.data.symbol,
  total: getCartTotal(state.cartList.cart),
});

export default connect(
  mapStateToProps,
  { removeFromCart, incrementQty, decrementQty }
)(cartComponent);
