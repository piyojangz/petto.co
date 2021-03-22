import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { Link } from "react-router-dom";
import { Siteurl } from "../../../services/script";
import { Product4, Product5 } from "../../../services/script";
import Slider from "react-slick";
import { connect } from "react-redux";
class DetailsTopTabs extends Component {
  constructor() {
    super();
    this.state = {
      item: undefined,
      review: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      const { item } = this.props;
      this.setState({ item: item });
      this.getreview(item.id);
    }, 1000);
  }

  getreview = (id) => {
    fetch(Siteurl + "service/getreviewbyproductid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ review: result.result });
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
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < star) {
        stars.push(<i className="fa fa-star" style={{ color: "#ffa200" }} />);
      } else {
        stars.push(<i className="fa fa-star" style={{ color: "#ddd" }} />);
      }
    }
    return stars;
  }
  renderreview(review, index) {
    let pictures = review.pictures.split(",");
    return (
      <div className="col-12">
        <form className="theme-form mt-4 mb-4">
          <div className="form-row">
            <div className="col-md-12 ">
              <div className="media m-0">
                <img
                  src={`${review.reviewerimg}`}
                  className="rounded-circle"
                  style={{ width: 35, height: 35 }}
                  alt=""
                />
                <div className="col-md-12 ">
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
            </div>
            <div className="col-md-6">
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
        </form>
      </div>
    );
  }

  render() {
    const { item, review } = this.state;
    // console.log("item", item);
    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            {item != undefined && (
              <Tabs className="tab-content nav-material">
                <TabList className="nav nav-tabs nav-material">
                  <Tab className="nav-item">
                    <span className="nav-link active">
                      <i className="icofont icofont-ui-home" />
                      รายละเอียดสินค้า
                    </span>
                    <div className="material-border" />
                  </Tab>
                  {/* <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-man-in-glasses" />
                    รายละเอียดสินค้า
                  </span>
                  <div className="material-border" />
                </Tab> */}
                  {/* <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Video</span>
                                    <div className="material-border"></div>
                                </Tab> */}
                  <Tab className="nav-item">
                    <span className="nav-link">
                      <i className="icofont icofont-contacts" />
                      รีวิว
                    </span>
                    <div className="material-border" />
                  </Tab>
                </TabList>
                <TabPanel className="tab-pane fade mt-4 show active">
                  <form className="theme-form mt-4">
                    <div className="form-row">
                      <div
                        class="col-12"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  </form>
                </TabPanel>
                <TabPanel>
                  <form className="theme-form mt-4">
                    <div className="form-row">
                      <div className="col-md-12 ">
                        {review.length > 0 ? (
                          review.map((review, index) => {
                            return this.renderreview(review, index);
                          })
                        ) : (
                          <p className="text-center">ยังไม่มีรีวิวสินค้านี้ค่ะ :)</p>
                        )}
                      </div>
                    </div>
                  </form>
                </TabPanel>
              </Tabs>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default DetailsTopTabs;
