import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import { getTotal, getCartProducts } from "../../reducers/index";
import { addToCart, addToWishlist, addToCompare } from "../../actions/index";
import { getVisibleproducts } from "../../services/index";
import ProductListItem from "./common/product-list-item";
import Breadcrumb from "../common/breadcrumb";
import { Siteurl, Cate6 } from "../../services/script";
import CategoryItem from "../layouts/pets/category-item";
import cookie from "react-cookies";
class Promotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      hasMoreItems: true,
      pricelength: 0,
      pricesort: "desc",
      bannerlist: [],
      cate: [],
    };
  }

  componentDidMount() {
    this.getbanner();
  }

  getbanner = () => {
    fetch(Siteurl + "service/getbanner", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ bannerlist: result.result });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const { symbol } = this.props;
    const { shoplists } = this.state;

    return (
      <div>
        <Helmet>
          <title>Pettogo.co | {this.props.trans.promotion}</title>
        </Helmet>
        <Breadcrumb title={this.props.trans.promotion} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="section-t-space portfolio-section portfolio-padding metro-section port-col">
                <InfiniteScroll
                  dataLength={this.state.limit} //This is important field to render the next data
                  // next={this.fetchMoreItems}
                  // hasMore={this.state.hasMoreItems}
                  // loader={<div className="loading-cls" />}
                  // endMessage={
                  //   <p className="seen-cls seen-it-cls">
                  //     <b>Yay! You have seen it all</b>
                  //   </p>
                  // }
                >
                  <div className="isotopeContainer row">
                    {this.state.bannerlist.map((value, index) => (
                      <div key={"banner-" + index}>
                        <div className="home mb-5">
                          <div className="container">
                            <div className="row">
                              <div className="col">
                                <div className="slider-contain">
                                <a href={`${value.externallink}`}  >
                                  <img
                                    src={value.image}
                                    alt=""
                                    style={{ width: "100%" }}
                                  />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cateId: ownProps.match.params.id,
  cateName: ownProps.match.params.name,
  symbol: state.data.symbol,
  trans: state.lang.trans,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(Promotion);
