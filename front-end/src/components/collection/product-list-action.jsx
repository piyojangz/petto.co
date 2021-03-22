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
import AuctionlistItem from "../layouts/pets/auctionlist-item";
class Productlistauction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      hasMoreItems: true,
      auctionlist: [],
    };
  }

  componentWillMount() {
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
    const { symbol } = this.props;
    const { auctionlist } = this.state;

    return (
      <div>
        <Breadcrumb title={"ประมูล"} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="section-t-space portfolio-section portfolio-padding metro-section port-col">
                {auctionlist.length > 0 ? (
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
                      {auctionlist
                        .slice(0, this.state.limit)
                        .map((product, index) => (
                          <div className="col-12 mb-3" key={index}>
                            <AuctionlistItem
                              product={product}
                              symbol={symbol}
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
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(Productlistauction);
