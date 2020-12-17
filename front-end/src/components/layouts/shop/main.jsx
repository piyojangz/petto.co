import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';

// Import custom components
import TopCollection from './top-collection';
import SpecialProducts from "../common/products";
import BlogSection from "../common/blogsection";
import Instagram from "../common/instagram";
import LogoBlock from "../common/logo-block";
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "../../../services/script"
import Shoptop from "../../products/common/shop-top";

class Shop extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `#` );
    }

	render() {
		return (
			<div>
                <Helmet>
                    <title>Petto.co | ร้านขายปลาสวยงาม ราชพฤกษ์ ตลาดเทพเจริญ9 Fish Ville
                              Ratchaphruek</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*Home Slider*/}
                <section className="p-0">
                <Shoptop />
                </section>
                {/*Home Section End*/}

                {/*collection banner*/}
                {/* <section className="pb-0">
                    <div className="container">
                        <div className="row partition2">
                            <div className="col-md-6">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                    <div className="collection-banner p-right text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner1.jpg`} className="img-fluid" alt=""/>
                                            <div className="contain-banner">
                                                <div>
                                                    <h4>save 30%</h4>
                                                    <h2>men</h2>
                                                </div>
                                            </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                    <div className="collection-banner p-right text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt=""/>
                                            <div className="contain-banner">
                                                <div>
                                                    <h4>save 60%</h4>
                                                    <h2>women</h2>
                                                </div>
                                            </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/*collection banner end*/}

                {/* <TopCollection type={'pets'} /> */}

                {/*Parallax banner*/}
                {/* <section className="p-0">
                    <div className="full-banner parallax-banner1 parallax text-center p-left">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2018</h2>
                                        <h3>fashion trends</h3>
                                        <h4>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/*Parallax banner End*/}

                <SpecialProducts />

                {/*service layout*/}
                {/* <div className="container">
                    <section className="service border-section small-section ">
                        <div className="row">
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                    <div className="media-body">
                                        <h4>free shipping</h4>
                                        <p>free shipping world wide</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                    <div className="media-body">
                                        <h4>24 X 7 service</h4>
                                        <p>online service for new customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                    <div className="media-body">
                                        <h4>festival offer</h4>
                                        <p>new online special festival offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div> */}
                {/*Blog Section end*/}
                {/* <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title1 section-t-space">
                                <h4>Recent Story</h4>
                                <h2 className="title-inner1">from the blog</h2>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <section className="blog p-t-0">
                    <BlogSection />
                </section> */}
                {/*Blog Section End*/}

                {/* <Instagram /> */}

                {/*logo section*/}
                {/* <LogoBlock /> */}
                {/*logo section end*/}

                <div className="col-12">
                <form className="theme-form mt-4 mb-4">
                  <div className="form-row">
                    <div className="col-md-12 ">
                      <div className="title1 title5">
                        <div className="row">
                          <div className="col-8">
                            <div className="row">
                              <div className="ml-3">
                                <h2 className="title-inner1 text-left vertical-center">
                                  {"รีวิว"}
                                </h2>
                              </div>
                              <div className="ml-1">
                                <p>4.5/5.0</p>
                              </div>
                              <div className="ml-1">
                                <div className="media-body">
                                  <div className="rating three-star vertical-center">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <h5 className="title-inner1 text-right vertical-center">
                              {"ดูเพิ่มเติม >"}
                            </h5>
                          </div>
                        </div>
                        <hr />
                      </div>
                      <div className="media m-0">
                        <img
                          src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-9/118582591_10218072880599813_1509440737429185966_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeF__0Kl8lGrZmsYDOp5WDYM6GDEov0ROXDoYMSi_RE5cAJXxbRVcdmaEty7Nc3oDM4&_nc_ohc=XgSV3-WYxZ0AX_LbX1l&_nc_ht=scontent.fbkk5-5.fna&oh=161e70082bd4dd389d171e54583d575d&oe=60009F2E`}
                          className="rounded-circle"
                          style={{ width: 35, height: 35 }}
                          alt=""
                        />
                        <div className="col-md-12 ">
                          <label style={{ marginBottom: 0 }}>
                            วีระยุทธ ตะสูงเนิน
                          </label>
                          <div className="media-body">
                            <div className="rating three-star">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p>
                        ได้รับสินค้าถูกต้องตามที่สั่ง ใส่ภาชนะมาอย่างดี
                        ปลาไม่ช้ำ แนะนำร้านนี้เลย ถูก ดี ไม่แพง
                      </p>
                      <div className="row">
                        <div className="col-4">
                          <div key={1}>
                            <div className="embed-responsive embed-responsive-16by9">
                              <iframe
                                height="100"
                                src="https://www.youtube.com/embed/ubK-U9HgTIo"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div key={1}>
                            <img
                              src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-9/118582591_10218072880599813_1509440737429185966_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeF__0Kl8lGrZmsYDOp5WDYM6GDEov0ROXDoYMSi_RE5cAJXxbRVcdmaEty7Nc3oDM4&_nc_ohc=XgSV3-WYxZ0AX_LbX1l&_nc_ht=scontent.fbkk5-5.fna&oh=161e70082bd4dd389d171e54583d575d&oe=60009F2E`}
                              key={1}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div key={1}>
                            <img
                              src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-9/118582591_10218072880599813_1509440737429185966_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeF__0Kl8lGrZmsYDOp5WDYM6GDEov0ROXDoYMSi_RE5cAJXxbRVcdmaEty7Nc3oDM4&_nc_ohc=XgSV3-WYxZ0AX_LbX1l&_nc_ht=scontent.fbkk5-5.fna&oh=161e70082bd4dd389d171e54583d575d&oe=60009F2E`}
                              key={1}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </form>
                </div>

			</div>
			)


	}
}

export default Shop;