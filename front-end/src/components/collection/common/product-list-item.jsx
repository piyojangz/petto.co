import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";

class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      stock: "InStock",
      quantity: 1,
      image: "",
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

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
    const {
      product,
      symbol,
      onAddToCartClicked,
      onAddToWishlistClicked,
      onAddToCompareClicked,
    } = this.props;
    const { open } = this.state;

    let images = product.image.split("#");

    return (
      <div className="product-box box-underline">
        <div className="row">
          <div className="col-5">
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
              <div className="front">
                <Link
                  to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                    product.id
                  }`}
                >
                  <img src={images[0]} className="img-fluid" alt="" />
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
                <h5  className="two-line-ellipsis">{product.name}</h5>
              </Link>
              <h3 style={{ color: "rgb(0, 114, 190)", fontWeight: "bold" }}>
                <span style={{ fontSize: 18 }}>{symbol}</span>
                {(product.discount
                  ? product.discount
                  : product.price
                ).toLocaleString(navigator.language, {
                  minimumFractionDigits: 2,
                })}
                {product.discount > 0 && (
                  <del>
                    <span className="money">
                      <span style={{ fontSize: 18 }}>{symbol}</span>
                      {product.price.toLocaleString(navigator.language, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </del>
                )}
              </h3>

              <Link
                to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                  product.id
                }`}
                className="btn btn-primary"
              >
                <h5 style={{ color: "#fff" }}>ดูรายละเอียด</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
