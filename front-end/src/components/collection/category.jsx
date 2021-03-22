import React, { Component } from "react";
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
class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      hasMoreItems: true,
      products: [],
      cate: [],
    };
  }

  componentWillMount() {
    this.getmaincate(this.props.cateId);
    this.getproduct(this.props.cateId);
  }

  getproduct = (cateId) => {
    fetch(Siteurl + "service/getproductbycateid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: cateId }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          this.setState({ products: result.result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  getmaincate = (cateId) => {
    fetch(Siteurl + "service/getcatebyParentId", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: cateId }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("cate", result);
          this.setState({ cate: result.result });
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
    const { symbol, cateName } = this.props;
    const { products } = this.state;

    return (
      <div>
        <Breadcrumb title={"หมวดหมู่ > " + cateName} />

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-3">
              <Slider {...Cate6} className="product-4 product-m no-arrow">
                {this.state.cate.map((cate, index) => (
                  <div key={index} style={{maxWidth:87}}>
                    <CategoryItem cate={cate} key={index} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
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
                          <div
                            className="col-12 mb-3"
                            key={index}
                          >
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
                      <h3>ขออภัย ยังไม่มีสินค้าในหมวดนี้ </h3>
                      <Link
                        to={`${process.env.PUBLIC_URL}/`}
                        className="btn btn-solid"
                      >
                        ดูสินค้าอื่น
                      </Link>
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
  cateId: ownProps.match.params.id,
  cateName: ownProps.match.params.name,
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(Category);
