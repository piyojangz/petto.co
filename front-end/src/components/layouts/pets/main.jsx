import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import { connect } from "react-redux";
// Import custom components
import Productoffer from "./productoffer";
import Productrecent from "./producrecent";
import CategoryCollection from "./categorycollection";
import AuctionCollection from "./auctioncollection";
import ShopCollection from "./shopcollection";
import CateBlock from "../common/cate-block";
import BlogSection from "../common/blogsection";
import HeaderThree from "../../common/headers/header-three";
import HeaderFive from "../../common/headers/header-five";
import FooterTwo from "../../common/footers/footer-two";
import ThemeSettings from "../../common/theme-settings";
import { Siteurl } from "../../../services/script";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import Loader from "react-loader-spinner";
import { Translate } from "@google-cloud/translate/build/src/v2";

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerlist: [],
      contentlist: [],
    };
  }

  componentDidMount() {
    document
      .getElementById("color")
      .setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color15.css`);

    this.getbanner();
    this.getcontentlist();
 
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

  getcontentlist = () => {
    fetch(Siteurl + "service/getcontentlist", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ limit: 10 }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ contentlist: result.result });
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

  banner(value, index) {
    return (
      <div key={"banner-" + index}>
        <div className="home">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="slider-contain">
                  <a href={`${value.externallink}`}>
                    <img src={value.image} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div> 
        <Helmet>
          <title>Petto.co | {this.props.trans.mainpage}</title>
        </Helmet>
        <HeaderFive logoName={"logo/petto_logo.png"} />
        <section className="p-0 small-slider">
          <Slider className="slide-1 home-slider">
            {this.state.bannerlist.map((value, index) => {
              return this.banner(value, index);
            })}
          </Slider>
        </section>
        {/*Logo Block section*/}
        <CateBlock />
        {/*Logo Block section end*/}
        {/*Product Slider*/}
        <Productoffer type={"pets"} title={this.props.trans.productoffer} />
        <Productrecent type={"pets"} title={this.props.trans.lastproduct} />
        <AuctionCollection type={"pets"} title={this.props.trans.auctionlist} />
        <ShopCollection type={"pets"} title={this.props.trans.shoprecommend} />
        {/*Product Slider End*/}

        {/*Banner Section*/}
        {/* <section className="pt-0 banner-6 ratio2_1">
          <div className="container">  */}
        {/* <div className="row partition3 banner-top-cls">
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/pets/banner/4.jpg`}
                                                className="img-fluid blur-up lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h2>Home</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/pets/banner/5.jpg`}
                                                className="img-fluid blur-up lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h2>cats</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/pets/banner/6.jpg`}
                                                className="img-fluid blur-up lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h2>bowls</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div> */}
        {/* </div>
        </section> */}
        {/*Banner Section End*/}

        {/*Category Section*/}
        <CategoryCollection title={this.props.trans.category} />
        {/*Category Section End*/}

        {/*Product Section*/}
        {/* <Collection type={'pets'} title="TOP COLLECTION" subtitle="Special Offer" /> */}
        {/*Product Section End*/}

        {/*Parallax banner*/}
        {/* <section className="p-0 pet-parallax">
                    <div className="full-banner parallax parallax-banner19  text-center p-center">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h4>choose what you love</h4>
                                        <h3>get upto 70% off</h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                                        since the 1500s, when an unknown printer took a galley of type and
                                        scrambled it to make
                                            a type specimen book. </p>
                                        <a href="#" className="btn btn-solid black-btn" tabIndex="0">shop now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pet-decor">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/dog.png`} alt="" className="img-fluid blur-up lazyload" />
                        </div>
                    </div>
                </section> */}
        {/*Parallax banner end*/}
        {/* Blog Section Section*/}
        <div className="container">
          <div className="title1 title5">
            <div className="row">
              <div className="col-6">
                <h2 className="title-inner1 text-left">
                  {this.props.trans.article}
                </h2>
              </div>
              <div className="col-6">
                <Link to={`${process.env.PUBLIC_URL}/blog/blog-page`}>
                  <h5 className="title-inner1 text-right">{`${
                    this.props.trans.more
                  } >`}</h5>
                </Link>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <section className="section-b-space p-t-0 ratio2_3">
          {/* <BlogSection /> */}

          <div className="container">
            <div className="row">
              {this.state.contentlist.map((row, index) => {
                return (
                  <div className="col-md-3 col-6" key={"div-" + index}>
                    <Link
                      to={`${process.env.PUBLIC_URL}/blog/details/${row.id}`}
                    >
                      <div className="classic-effect">
                        <img
                          style={{ width: "100%" }}
                          src={`${row.image}`}
                          className="img"
                          alt=""
                        />
                        <span />
                      </div>
                    </Link>
                    <div className="blog-details">
                      <h4>{`${row.createdate}`}</h4>
                      <Link to={`${process.env.PUBLIC_URL}/blog/details`}>
                        <p>{`${row.title}`}</p>
                      </Link>
                      <hr className="style1" />
                      {/*   <h6>by: John Dio , 2 Comment</h6> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* <div className="container ">
                    <div className="row">
                        <div className="col">
                            <div className="title1 title5">
                                <h4>Recent Story</h4>
                                <h2 className="title-inner1">from the blog</h2>
                                <hr role="tournament6" />
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section-b-space p-t-0 ratio2_3">
                    <BlogSection />*/}
        </section>
        {/* Blog Section End*/}
        {/* <ThemeSettings/> */}
        <FooterTwo logoName={"logo/petto_logo.png"} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  trans: state.lang.trans,
});

export default connect(mapStateToProps)(Pets);
