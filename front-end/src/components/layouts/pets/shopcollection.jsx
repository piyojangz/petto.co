import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getShoplistCollection } from "../../../services";
import { Product4 , Product5} from "../../../services/script";
import { addToCart, addToWishlist, addToCompare } from "../../../actions";
import ShopItem from "./shop-item";
import { Siteurl } from "../../../services/script";
class ShopCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoplists: [],
    };
  }

  componentDidMount() {
    this.getshoprecommend();
  }

  getshoprecommend = () => {
    fetch(Siteurl + "service/getshoprecommend", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ shoplists: result.result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const {
      items,
      symbol,
      addToCart,
      addToWishlist,
      addToCompare,
      title,
      subtitle, 
    } = this.props; 
    return (
      <div>
        {/*Paragraph*/}
        <section className="section-b-space j-box pets-box ratio_square">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title1 title5">
                  {subtitle ? <h4>{subtitle}</h4> : ""}
                  <div className="row">
                    <div className="col-6">
                      <h2 className="title-inner1 text-left">{title}</h2>
                    </div>
                    <div className="col-6">
                      <h5 className="title-inner1 text-right">
                        {"ดูเพิ่มเติม >"}
                      </h5>
                    </div>
                  </div>
                  <hr />
                </div>
                <Slider {...Product4} className="product-4 product-m no-arrow">
                  {this.state.shoplists.map((shop, index) => (
                    <div key={index}>
                      <ShopItem shop={shop} key={index} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ 
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(ShopCollection);
