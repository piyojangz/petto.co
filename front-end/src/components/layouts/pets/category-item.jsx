import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { getRelatedItems } from "../../../services";

class CategoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
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

  render() {
    const { cate } = this.props;
    let image =
      "https://www.jaipuriaschoolpatna.in/wp-content/uploads/2016/11/blank-img.jpg";
    if (cate.picture != "") {
      image = cate.picture;
    }

    return (
      <div>
        <div className="cate">
          <div className="img-wrapper">
            <div className="front">
              <a
                href={`${process.env.PUBLIC_URL}/category/${cate.id}/${
                  cate.name
                }`}
              >
                <img
                  src={`${image}`}
                  className="img-fluid lazyload bg-img"
                  alt=""
                />
              </a>
              <p style={{ textAlign: "center", marginTop: 5, color: "#000" }}>
                {cate.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // relatedItems: getRelatedItems(state.data.products, ownProps.product.category),
  // symbol: state.data.symbol
});

export default connect(mapStateToProps)(CategoryItem);
