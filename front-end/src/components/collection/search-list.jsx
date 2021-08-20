import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import { getTotal, getCartProducts } from "../../reducers/index";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  setLoading,
} from "../../actions/index";
import { getVisibleproducts } from "../../services/index";
import ProductListItem from "./common/product-list-item";
import Breadcrumb from "../common/breadcrumb";
import { Siteurl, Cate6 } from "../../services/script";
import CategoryItem from "../layouts/pets/category-item";
import cookie from "react-cookies";
class Searchlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      hasMoreItems: true,
      products: [],
      pricelength: 0,
      pricesort: "desc",
      cate: [],
    };
  }

  componentWillMount() {
    this.getproduct(this.props.q);
  }

  getproduct = (q) => {
    this.props.setLoading(true);
    fetch(Siteurl + "service/getproductsbysearch", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        limit: 100,
        searchtext:q
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          this.setState({ products: result.result });
          this.props.setLoading(false);
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
    const { symbol } = this.props;
    const { products } = this.state;

    return (
      <div>
        <Breadcrumb title={'ผลการค้นหา'} />
        <div className="container-fluid"> 
          <div className="row">
            <div className="col-12">
              <div className="section-t-space portfolio-section portfolio-padding metro-section port-col">
                {products.length > 0 ? (
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
                      {products
                        .slice(0, this.state.limit)
                        .map((product, index) => (
                          <div className="col-12 mb-3" key={index}>
                            <ProductListItem
                              product={product}
                              symbol={symbol}
                              onAddToCompareClicked={() =>
                                addToCompare(product)
                              }
                              onAddToWishlistClicked={() =>
                                addToWishlist(product)
                              }
                              onAddToCartClicked={addToCart}
                              key={index}
                            />
                          </div>
                        ))}
                    </div>
                  </InfiniteScroll>
                ) : (
                  <div className="row">
                    <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/empty-search.jpg`}
                        className="img-fluid mb-4"
                      />
                      <h3>ขออภัย ไม่มีผลการค้นหาที่ท่านเลือก</h3> 
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  q: ownProps.match.params.q, 
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare, setLoading }
)(Searchlist);
