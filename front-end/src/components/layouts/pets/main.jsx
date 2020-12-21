import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import { connect } from 'react-redux'
// Import custom components
import Collection from "./collection"
import CategoryCollection from "./categorycollection"
import AuctionCollection from "./auctioncollection"
import ShopCollection from "./shopcollection"
import CateBlock from "../common/cate-block"
import BlogSection from "../common/blogsection";
import HeaderThree from "../../common/headers/header-three"
import HeaderFive from "../../common/headers/header-five"
import FooterTwo from "../../common/footers/footer-two"
import ThemeSettings from "../../common/theme-settings"
import { changeCurrency } from '../../../actions'

class Pets extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color15.css`);
        this.props.changeCurrency('฿')
    }

    render() { 
        return (
            <div>
                <Helmet>
                    <title>Petto.co | หน้าหลัก</title>
                </Helmet>
                <HeaderFive logoName={'logo/petto_logo.png'} />
                <section className="p-0 small-slider">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <img src={`https://image.shutterstock.com/image-vector/1212-shopping-day-sale-banner-600w-1572000139.jpg`} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <img src={`https://image.shutterstock.com/image-vector/1212-shopping-day-sale-banner-600w-1572000139.jpg`} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                {/*Logo Block section*/}
                <CateBlock />
                {/*Logo Block section end*/}
                {/*Product Slider*/}
                <Collection type={'pets'} title="สินค้าแนะนำ" />
                <AuctionCollection type={'pets'} title="รายการประมูล" />
                <ShopCollection type={'pets'} title="ร้านค้าแนะนำ" />
                {/*Product Slider End*/}

                {/*Banner Section*/}
                <section className="pt-0 banner-6 ratio2_1">
                    <div className="container">
                        <div className="row partition3">
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-left">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/pets/banner/1.jpg`}
                                                className="img-fluid blur-up lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h2>แบนเนอร์1</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-right text-right">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/pets/banner/2.jpg`}
                                                className="img-fluid blur-up lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h2>แบนเนอร์2</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#">
                                    <div className="collection-banner p-left">
                                        <div className="img-part">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/pets/banner/3.jpg`}
                                                className="img-fluid blur-up lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner banner-3">
                                            <div>
                                                <h2>แบนเนอร์3</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
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
                    </div>
                </section>
                {/*Banner Section End*/}

                {/*Category Section*/}
                <CategoryCollection   title="หมวดหมู่"  />
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
                <div className="container ">
                    <div className="row">
                        <div className="col">
                            <div className="title1 title5">
                                <h4>บทความ</h4>
                                {/* <h2 className="title-inner1">from the blog</h2> */}
                                <hr role="tournament6" />
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section-b-space p-t-0 ratio2_3">
                    <BlogSection />
                </section>
                {/* Blog Section End*/}
                {/* <ThemeSettings/> */}
                <FooterTwo logoName={'logo/petto_logo.png'} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
})

export default connect(mapStateToProps,{ changeCurrency })(Pets);