import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getTrendingCollection } from "../../../services";
import { Product4 } from "../../../services/script";
import { addToCart, addToWishlist, addToCompare } from "../../../actions";
import AuctionItem from "./auction-item";
import { Siteurl } from "../../../services/script";
class AuctionCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctionlist: [],
    };
  }
  componentDidMount() {
    this.getauctionlist();
  }

  getauctionlist = () => {
    fetch(Siteurl + "service/getauctionlist", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ auctionlist: result.result });
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
                      <Link to={`${process.env.PUBLIC_URL}/auction`}>
                        <h5 className="title-inner1 text-right">
                          {"ดูเพิ่มเติม >"}
                        </h5>
                      </Link>
                    </div>
                  </div>
                  <hr />
                </div>
                <Slider {...Product4} className="product-4 product-m no-arrow">
                  {this.state.auctionlist.map((product, index) => (
                    <div key={index}>
                      <AuctionItem
                        product={product}
                        symbol={symbol}
                        key={index}
                      />
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
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(AuctionCollection);
