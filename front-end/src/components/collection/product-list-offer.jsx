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
class Productlistoffer extends Component {
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
    this.getproduct(this.props.cateId);
  }

  getproduct = (cateId) => {
    this.props.setLoading(true);
    fetch(Siteurl + "service/getproductoffer", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        limit: 100,
        pricelength: this.state.pricelength,
        pricesort: this.state.pricesort,
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
        <Breadcrumb title={this.props.trans.productoffer} />
        <div className="container-fluid">
          <div class="row">
            <div className="col-12">
              <div class="panel panel-default">
              <div class="panel-body">
                  <div class="form-group">
                    <label class="filter-col" style={{ margin: 0 }}>
                      ช่วงราคา
                    </label>
                    <select
                      id="pref-perpage"
                      class="form-control"
                      value={this.state.pricelength}
                      onChange={(v) =>
                        this.setState({ pricelength: v.target.value })
                      }
                    >
                      <option value="0">ทั้งหมด</option>
                      <option value="1">0 - 100</option>
                      <option value="2">101 - 1,000</option>
                      <option value="3">1,001 - 5,000</option>
                      <option value="4">5,001 10,000</option>
                      <option value="5">10,000 ขึ้นไป</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="filter-col" for="pref-orderby">
                      เรียงลำดับ:
                    </label>
                    <select
                      id="pref-orderby"
                      class="form-control"
                      value={this.state.pricesort}
                      onChange={(v) =>
                        this.setState({ pricesort: v.target.value })
                      }
                    >
                      <option value="desc">มากไปน้อย</option>
                      <option value="asc">น้อยไปมาก</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <button
                      onClick={() => this.getproduct()}
                      className="btn btn-petto"
                    >
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>
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
                      <h3>ขออภัย ยังไม่มีสินค้าในหมวดนี้ </h3>
                      <Link
                        to={`${process.env.PUBLIC_URL}/`}
                        className="btn btn-solid"
                      >
                        {this.props.trans.seemore}
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
  trans: state.lang.trans,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare, setLoading }
)(Productlistoffer);
