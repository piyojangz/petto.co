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
class Shops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      hasMoreItems: true,
      pricelength: 0,
      pricesort: "desc",
      shoplists: [],
      cate: [],
    };
  }

  componentDidMount() {
    this.getshoprecommend();
  }

  getshoprecommend = () => {
    fetch(Siteurl + "service/getallshop", {
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
    const { symbol } = this.props;
    const { shoplists } = this.state;

    return (
      <div>
        <Breadcrumb title={"ร้านค้าทั้งหมด"} />
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
                    {shoplists.map((shop, index) => (
                      <div key={index} className="col-6">
                        <div className="product-box box-underline">
                          <div className="img-wrapper">
{
  shop.isrecommend === '1' && (
<div
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                padding: 2,
                                borderRadius: 5,
                                color: "#fff",
                                background: "#e74c3c",
                              }}
                            >
                              ร้านค้าแนะนำ
                            </div>
  )
}
                            
                            <div className="front">
                              <Link
                                to={`${process.env.PUBLIC_URL}/shop/${shop.id}`}
                              >
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
                              <Link
                                to={`${process.env.PUBLIC_URL}/shop/${shop.id}`}
                              >
                                <h6>
                                  {shop.title != "" ? shop.title : shop.webname}
                                </h6>
                              </Link>
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
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(Shops);
