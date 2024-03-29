import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Breadcrumb from "../common/breadcrumb";
import { removeFromWishlist } from "../../actions";
import { getCartTotal } from "../../services";
import { groupByKey, Siteurl } from "../../services/script";
import { removeAllCart, setLoading } from "../../actions";
import cookie from "react-cookies";
import resolve from "resolve";
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
class checkOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: undefined,
      merchantlist: [],
      cartItems: [],
    };
  }

  async componentDidMount() {
    const customer = cookie.load("customerdata");
    if (customer) {
      this.setState({ customer: customer });
    }

    const { cartItems, symbol, total } = this.props;
    const _uniqMerchant = [
      ...new Set(cartItems.map((item) => item.merchantid)),
    ];
    const _cartItems = groupByKey(cartItems, "merchantid", { omitKey: false });

    const mlist = new Array();
    await _uniqMerchant.map(async (id) => {
      mlist.push(this.getshop(id));
    });

    const result = await Promise.all(mlist);

    await this.setState({ merchantlist: result });
    await this.setState({ cartItems: _cartItems });
  }

  getshop = (id) => {
    return new Promise((resolve, reject) => {
      fetch(Siteurl + "service/getshop", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            resolve(new Object(result.result));
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  renderOrderlist() {
    const { symbol, total } = this.props;
    const { merchantlist, cartItems } = this.state;

    const uiview = [];
    merchantlist.map((merchant, index) => {
      // console.log("merchant,", merchant);
      uiview.push(
        <li key={index}>
          <img src={merchant.image} alt="" style={{ width: 30 }} />{" "}
          {merchant.name != "" ? merchant.name : merchant.title}
        </li>
      );

      const Items = cartItems[merchant.id];
      {
        if (Items != undefined) {
          Items.map((item, index) => {
            let images = item.image.split("#");
            uiview.push(
              <li key={index}>
                <img src={images[0]} alt="" style={{ width: 40 }} />
                {item.name} × {item.qty}{" "}
                <span>
                  {symbol} {numberWithCommas(item.sum)}{" "}
                  <code>
                    {"+ ค่าส่ง "}
                    {symbol}
                    {numberWithCommas(item.shippingfee)}
                  </code>
                </span>
              </li>
            );
          });
        }
      }
      //   uiview.push(
      //     <li className="pt-1">
      //       <b>ค่าจัดส่ง</b>
      //       <span style={{ color: "rgb(62 103 255)" }}>
      //         {symbol} {100}
      //       </span>
      //     </li>
      //   );
      uiview.push(<li className="pt-2" />);
    });
    return uiview;
  }

  submitorder() {
    this.props.setLoading(true);
    const { cartItems, symbol, total } = this.props;
    const { merchantlist, customer } = this.state;
    const { removeAllCart } = this.props;

    console.log({
      cartItems: cartItems,
      merchantlist: merchantlist,
      userid: customer.id,
    });
    fetch(Siteurl + "service/createorder", {
      method: "POST",
      headers: {
        // "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        cartItems: cartItems,
        merchantlist: merchantlist,
        userid: customer.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.props.setLoading(false);
          toast.success("ยืนยันรายการเรียบร้อย");
          removeAllCart();
        },
        (error) => {
          toast.warn(error);
        }
      );
  }
  render() {
    const { symbol, total } = this.props;
    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>Pettogo.co | ยืนยันการสั่งซื้อ</title>
          <meta name="description" content="Pettogo.co ยืนยันการสั่งซื้อ" />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"ยืนยันการสั่งซื้อ"} />

        <section className="section-b-space">
          <div className="container padding-cls">
            <div className="checkout-page">
              <div className="checkout-form">
                {/* <form> */}
                <div className="checkout row">
                  <div className="col-lg-6 col-sm-12 col-xs-12">
                    <div className="checkout-title">
                      <h3>ยืนยันข้อมูล</h3>
                    </div>
                    {/* <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">First Name</div>
                                                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.setStateFromInput} />
                                                    {this.validator.message('first_name', this.state.first_name, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Last Name</div>
                                                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.setStateFromInput} />
                                                    {this.validator.message('last_name', this.state.last_name, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Phone</div>
                                                    <input type="text" name="phone"  value={this.state.phone} onChange={this.setStateFromInput} />
                                                    {this.validator.message('phone', this.state.phone, 'required|phone')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Email Address</div>
                                                    <input type="text" name="email" value={this.state.email} onChange={this.setStateFromInput} />
                                                    {this.validator.message('email', this.state.email, 'required|email')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Country</div>
                                                    <select name="country" value={this.state.country} onChange={this.setStateFromInput}>
                                                        <option>India</option>
                                                        <option>South Africa</option>
                                                        <option>United State</option>
                                                        <option>Australia</option>
                                                    </select>
                                                    {this.validator.message('country', this.state.country, 'required')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Address</div>
                                                    <input type="text" name="address" value={this.state.address} onChange={this.setStateFromInput} placeholder="Street address" />
                                                    {this.validator.message('address', this.state.address, 'required|min:20|max:120')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Town/City</div>
                                                    <input type="text" name="city" value={this.state.city} onChange={this.setStateFromInput} />
                                                    {this.validator.message('city', this.state.city, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-6 col-xs-12">
                                                    <div className="field-label">State / County</div>
                                                    <input type="text" name="state" value={this.state.state} onChange={this.setStateFromInput} />
                                                    {this.validator.message('state', this.state.state, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-6 col-xs-12">
                                                    <div className="field-label">Postal Code</div>
                                                    <input type="text" name="pincode" value={this.state.spincode} onChange={this.setStateFromInput} />
                                                    {this.validator.message('pincode', this.state.pincode, 'required|integer')}
                                                </div>
                                                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <input type="checkbox" name="create_account" id="account-option"  checked={this.state.create_account} onChange={this.setStateFromCheckbox}/>
                                                    &ensp; <label htmlFor="account-option">Create An Account?</label>
                                                    {this.validator.message('checkbox', this.state.create_account, 'create_account')}
                                                </div>
                                            </div> */}
                  </div>
                  <div className="col-lg-12 col-sm-12 col-xs-12">
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            สินค้า <span> จำนวน</span>
                          </div>
                        </div>
                        <ul className="qty">{this.renderOrderlist()}</ul>
                        {/* <ul className="sub-total">
                                                        <li>Subtotal <span className="count">{symbol}{total}</span></li>
                                                        <li>Shipping <div className="shipping">
                                                            <div className="shopping-option">
                                                                <input type="checkbox" name="free-shipping" id="free-shipping" />
                                                                    <label htmlFor="free-shipping">Free Shipping</label>
                                                            </div>
                                                            <div className="shopping-option">
                                                                <input type="checkbox" name="local-pickup" id="local-pickup" />
                                                                    <label htmlFor="local-pickup">Local Pickup</label>
                                                            </div>
                                                        </div>
                                                        </li>
                                                    </ul> */}

                        <ul className="total">
                          <li>
                            รวม{" "}
                            <span className="count">
                              {symbol}
                              {numberWithCommas(total)}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div class="row cart-buttons">
                          <div class="col-6">
                            <Link  to={`${process.env.PUBLIC_URL}/cart`}> 
                            <button 
                              className="btn"
                              style={{ width: "100%" }}
                            >
                              ดูตะกร้า
                            </button>
                            </Link>
                          </div>
                          <div class="col-6">
                            <button
                              onClick={() => this.submitorder()}
                              className="btn btn-primary"
                              style={{ width: "100%" }}
                            >
                              ยืนยันการสั่งสินค้า
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="payment-box">
                                                    <div className="upper-box">
                                                        <div className="payment-options">
                                                            <ul>
                                                                <li>
                                                                    <div className="radio-option stripe">
                                                                        <input type="radio" name="payment-group" id="payment-2" defaultChecked={true} onClick={() => this.checkhandle('stripe')} />
                                                                        <label htmlFor="payment-2">Stripe</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="radio-option paypal">
                                                                        <input type="radio" name="payment-group" id="payment-1" onClick={() => this.checkhandle('paypal')} />
                                                                            <label htmlFor="payment-1">PayPal<span className="image"><img src={`${process.env.PUBLIC_URL}/assets/images/paypal.png`} alt=""/></span></label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {(total !== 0)?
                                                    <div className="text-right">
                                                        {(this.state.payment === 'stripe')? <button type="button" className="btn-solid btn" onClick={() => this.StripeClick()} >Place Order</button>:
                                                         <PaypalExpressBtn env={'sandbox'} client={client} currency={'USD'} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />}
                                                    </div>
                                                    : ''}
                                                </div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="row section-t-space">
                                        <div className="col-lg-6">
                                            <div className="stripe-section">
                                                <h5>stripe js example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4242424242424242</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>2/2020</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>2222</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 m-sm-t-2">
                                            <div className="stripe-section">
                                                <h5>paypal example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4152521541244</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>11/18</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>521</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                {/* </form> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cartList.cart,
  symbol: "฿",
  total: getCartTotal(state.cartList.cart),
});

export default connect(
  mapStateToProps,
  { removeFromWishlist, removeAllCart, setLoading }
)(checkOut);
