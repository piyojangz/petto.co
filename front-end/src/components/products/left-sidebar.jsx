import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import "../common/index.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import custom Components
import Service from "./common/service";
import BrandBlock from "./common/brand-block";
import NewProduct from "../common/new-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import Shoptop from "./common/shop-top";
import { addToCart, addToCartUnsafe, addToWishlist } from "../../actions";
import ImageZoom from "./common/product/image-zoom";
import SmallImages from "./common/product/small-image";
import { Siteurl } from "../../services/script";
class LeftSideBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nav1: null,
      nav2: null,
      productdetail: {
        name: "",
        category: "",
        image: "",
      },
      shop: {},
    };
  }

  // document.getElementById('idOfElement').classList.add('newClassName');

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });

    this.getproductbyid(this.props.productId);
  }

  filterClick() {
    document.getElementById("filter").style.left = "-15px";
  }
  backClick() {
    document.getElementById("filter").style.left = "-365px";
  }

  getproductbyid = (productId) => {
    fetch(Siteurl + "service/getproductbyid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: productId }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ productdetail: result.result });
          this.getshop(result.result.merchantid);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

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

  render() {
    const {
      symbol,
      item,
      addToCart,
      addToCartUnsafe,
      addToWishlist,
    } = this.props;
    var products = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      fade: true,
    };
    var productsnav = {
      slidesToShow: 3,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true,
    };

    let productdetail = this.state.productdetail;

    let images = productdetail.image.split("#");
    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>
            Pettogo.co | {productdetail.category} | {productdetail.name}
          </title>
          <meta name="description" content="Pettogo.co – ตลาดสัตว์เลี้ยง." />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb
          parent={productdetail.category}
          title={productdetail.name}
        />

        {/*Section Start*/}
        {productdetail ? (
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  {/* <div className="col-sm-3 collection-filter" id="filter">
                    <div className="collection-mobile-back pl-5">
                      <span onClick={this.backClick} className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true" />{" "}
                        back
                      </span>
                    </div> */}

                  {/* <BrandBlock/> */}
                  {/* <Service /> */}
                  {/*side-bar single product slider start*/}
                  {/* <NewProduct /> */}
                  {/*side-bar single product slider end*/}
                  {/* </div> */}
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="filter-main-btn mb-2">
                            {/* <span
                              onClick={this.filterClick}
                              className="filter-btn"
                            >
                              <i className="fa fa-filter" aria-hidden="true" />{" "}
                              กรองข้อมูล
                            </span> */}
                          </div>
                        </div>
                      </div>
                      {productdetail.video && (
                        <div>
                          <div className="row">
                            <div className="col-lg-12 product-thumbnail">
                              <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                  src={productdetail.video}
                                  allow="autoplay; encrypted-media"
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      )}

                      <div className="row">
                        <div className="col-lg-6 product-thumbnail">
                          <Slider
                            {...products}
                            asNavFor={this.state.nav2}
                            ref={(slider) => (this.slider1 = slider)}
                            className="product-slick"
                          >
                            {images.map((vari, index) => (
                              <div key={index}>
                                <ImageZoom image={vari} />
                              </div>
                            ))}
                            {/* <div key={1}>
                              <ImageZoom image={images} />
                            </div> */}
                            {/* {item.variants
                              ? item.variants.map((vari, index) => (
                                  <div key={index}>
                                    <ImageZoom image={vari.images} />
                                  </div>
                                ))
                              : item.pictures.map((vari, index) => (
                                  <div key={index}>
                                    <ImageZoom image={vari} />
                                  </div>
                                ))} */}
                          </Slider>
                          <SmallImages
                            item={productdetail}
                            settings={productsnav}
                            navOne={this.state.nav1}
                          />
                        </div>
                        <DetailsWithPrice
                          symbol={symbol}
                          item={productdetail}
                          navOne={this.state.nav1}
                          addToCartClicked={addToCart}
                          BuynowClicked={addToCartUnsafe}
                          addToWishlistClicked={addToWishlist}
                        />
                      </div>
                    </div>
                    <Shoptop shop={this.state.shop} />
                    <DetailsTopTabs item={productdetail} />
                    {/* <BrandBlock/> */}
                    {/* <Service /> */}
                    {/*side-bar single product slider start*/}
                    {/* <NewProduct /> */}
                    {/*side-bar single product slider end*/}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        {/*Section End*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let productId = ownProps.match.params.id;
  return {
    productId: productId,
    // item: state.data.products.find((el) => el.id == productId),
    symbol: state.data.symbol,
  };
};

export default connect(
  mapStateToProps,
  { addToCart, addToCartUnsafe, addToWishlist }
)(LeftSideBar);
