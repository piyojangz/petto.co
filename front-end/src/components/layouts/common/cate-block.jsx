import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Slider6 } from "../../../services/script";
import { Siteurl } from "../../../services/script";
class CateBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document
      .getElementById("color")
      .setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color15.css`);
  }

  render() {
    return (
      <section className="section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Slider {...Slider6} className="slide-6">
                <div>
                  <div className="logo-block">
                    <Link to={`${process.env.PUBLIC_URL}/bestseller`}>
                      <img
                        style={{ width: 70 }}
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/logos/bestshop.png`}
                        alt=""
                      />
                      <center>
                        <h5>ร้านแนะนำ</h5>
                      </center>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="logo-block">
                    <Link to={`${process.env.PUBLIC_URL}/auction`}>
                      <img
                        style={{ width: 70 }}
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/logos/auction.png`}
                        alt=""
                      />
                      <center>
                        <h5>ประมูล</h5>
                      </center>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="logo-block">
                    <Link to={`${process.env.PUBLIC_URL}/category/0/ทั้งหมด`}>
                      <img
                        style={{ width: 70 }}
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/logos/cate.png`}
                        alt=""
                      />
                      <center>
                        <h5>หมวดหมู่</h5>
                      </center>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="logo-block">
                    <Link to={`${process.env.PUBLIC_URL}/promotion`}>
                      <img
                        style={{ width: 70 }}
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/logos/promotion.png`}
                        alt=""
                      />
                      <center>
                        <h5>โปรโมชั่น</h5>
                      </center>
                    </Link>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CateBlock;
