import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";

import { getRelatedItems } from "../../../services";

class ShopItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      cartModalopen: false,
      stock: "InStock",
      quantity: 1,
      image: "",
    };
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenCartModal = () => {
    this.setState({ cartModalopen: true });
    this.props.onAddToCartClicked();
  };
  onCloseCartModal = () => {
    this.setState({ cartModalopen: false });
  };

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    if (this.props.product.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  render() {
    const { shop } = this.props;
    return (
      <div>
        <div className="product-box">
          <div className="img-wrapper">
          <div
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                padding: 2,
                                borderRadius: 5,
                                color: "#fff",
                                background: "#e74c3c",
                              }}
                            >
                              ร้านค้าแนะนำ
                            </div>
            <div className="front">
              <Link to={`${process.env.PUBLIC_URL}/shop/${shop.id}`}>
                <img
                  src={`${shop.image}`}
                  style={{ width: "100%" }}
                  className="img-fluid lazyload bg-img"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="product-detail ">
            <div style={{ height: 50, paddingTop: 15 }}>
            <Link to={`${process.env.PUBLIC_URL}/shop/${shop.id}`}>
                <h6>{shop.title}</h6>
              </Link>
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

export default connect(mapStateToProps)(ShopItem);
