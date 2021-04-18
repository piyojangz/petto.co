import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Import custom components
import TopCollection from "./top-collection";
import SpecialProducts from "../common/products";
import BlogSection from "../common/blogsection";
import Instagram from "../common/instagram";
import LogoBlock from "../common/logo-block";
import { Product4 } from "../../../services/script";
import ProductItem from "../pets/product-item";
import ReactStars from "react-rating-stars-component";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
} from "../../../services/script";
import Shoptop from "../../products/common/shop-top";
import { Siteurl } from "../../../services/script";
class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: {
        title: "",
        items: [],
        reviews: undefined,
        reviewavg: 5,
      },
    };
  }

  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
    this.getshop(this.props.shopId);
    this.getitembyseller(this.props.shopId);
    this.getreview(this.props.shopId);
  }

  getshop = (id) => {
    fetch(Siteurl + "service/getshop", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result.result);
          this.setState({ shop: result.result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  getitembyseller = (id) => {
    fetch(Siteurl + "service/getitembyseller", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ items: result.result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  getreview = (id) => {
    fetch(Siteurl + "service/getreview", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let avg = 0;
          result.result.map((rw) => {
            avg = parseInt(avg) + parseInt(rw.star);
          });

          console.log("savg", avg);
          avg = avg / result.result.length;
          this.setState({ reviews: result.result, reviewavg: avg });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  renderstar(star) {
    return (
      <ReactStars
        edit={false}
        count={5}
        size={24}
        value={parseFloat(star)}
        isHalf={true}
        emptyIcon={<i className="far fa-star" />}
        halfIcon={<i className="fa fa-star-half-alt" />}
        fullIcon={<i className="fa fa-star" />}
        activeColor="#ffd700"
      />
    );
  }
  renderreview(review, index) {
    let pictures = review.pictures.split(",");
    return (
      <div className="mb-2">
        <div className="media m-0">
          <img
            src={`${review.reviewerimg}`}
            className="rounded-circle"
            style={{ width: 35, height: 35 }}
            alt=""
          />
          <div className="col-12 ">
            <label style={{ marginBottom: 0 }}>{`${review.firstname} ${
              review.lastname
            }`}</label>
            <div className="media-body">
              <div className="rating  three-star" data-score="2">
                {this.renderstar(review.star)}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>{`${review.message}`}</p>

            <section className="p-0 small-slider">
              <Slider {...Product4} className="product-4 product-m arrow">
                {review.video != "" && (
                  <div className="col-4">
                    <div key={1}>
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                          height="100"
                          src={review.video}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                )}
                {pictures.map((picture, index) => {
                  return (
                    <div className="col-4" key={"xp-" + index}>
                      <div key={1}>
                        <img
                          src={picture}
                          key={1}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </section>
          </div>
        </div>
        <hr />
      </div>
    );
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{`Pettogo.co || ${
            this.state.shop.title != ""
              ? this.state.shop.title
              : this.state.shop.webname
          }`}</title>
          <meta name="description" content={this.state.shop.description} />
        </Helmet>
        {/*Home Slider*/}
        <section className="p-0">
          {this.state.reviews != undefined && (
            <Shoptop
              shop={this.state.shop}
              shoprating={this.renderstar(this.state.reviewavg)}
            />
          )}
        </section>

        <SpecialProducts items={this.state.items} />
        {/* 
        {this.state.items > 0 &&
          this.state.items.map((product, index) => (
            <div key={index}>
              <ProductItem
                product={product}
                symbol={this.props.symbol}
                // onAddToCompareClicked={() => addToCompare(product)}
                // onAddToWishlistClicked={() => addToWishlist(product)}
                // onAddToCartClicked={() => addToCart(product, 1)} key={index}
              />
            </div>
          ))} */}

        <div className="col-12">
          <form className="theme-form mt-4 mb-4">
            <div className="form-row">
              <div className="col-md-12 ">
                <div className="title1 title5">
                  <div className="row">
                    <div className="col-7">
                      <div className="row">
                        <div className="ml-3">
                          <h2 className="title-inner1 text-left vertical-center">
                            {"รีวิว"}
                          </h2>
                        </div>
                      </div>
                    </div>
                    {this.state.shop.rating != null && (
                      <div className="col-5">
                        <div className="row">
                          <div className="ml-0">
                            <span>{this.state.reviewavg}/5.0</span>
                          </div>
                          <div className="ml-1">
                            <div className="media-body">
                              <div className="  three-star vertical-center">
                                {this.state.reviews != undefined &&
                                  this.renderstar(this.state.shop.rating)}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <h5 className="title-inner1 text-right vertical-center">
                        {"ดูเพิ่มเติม >"}
                      </h5> */}
                      </div>
                    )}
                  </div>
                  <hr />
                </div>
                {this.state.reviews ? (
                  this.state.reviews.map((review, index) => {
                    return this.renderreview(review, index);
                  })
                ) : (
                  <p className="text-ceenter">ยังไม่มีรีวิวรายการนี้ :p</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let shopId = ownProps.match.params.id;
  return {
    symbol: state.data.symbol,
    shopId: shopId,
  };
};

export default connect(mapStateToProps)(Shop);
