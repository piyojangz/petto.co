import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getCategoryCollection } from "../../../services";
import { Cate6 } from "../../../services/script";
import { addToCart, addToWishlist, addToCompare } from "../../../actions";
import CategoryItem from "./category-item";
import { Siteurl } from "../../../services/script";
class CategoryCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cate: [],
    };
  }

  componentDidMount() {
    this.getmaincate();
  }

  getmaincate = () => {
    fetch(Siteurl + "service/getcateparent", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("cate", result);
          this.setState({ cate: result.result });
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

  render() {
    const {
      items,
      symbol,
      addToCart,
      addToWishlist,
      addToCompare,
      title,
      subtitle,
    } = this.props;
    return (
      <div>
        {/*Paragraph*/}
        <section className="section-b-space j-box pets-box ratio_square">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title1 title5">
                  {subtitle ? <h4>{subtitle}</h4> : ""}
                  <div className="row">
                    <div className="col-6">
                      <h2 className="title-inner1 text-left">{title}</h2>
                    </div>
                    <div className="col-6">
                      <Link to={`${process.env.PUBLIC_URL}/category/0/ทั้งหมด`}>
                      <h5 className="title-inner1 text-right">
                        {"ดูเพิ่มเติม >"}
                      </h5>
                      </Link>
                    </div>
                  </div>
                  <hr />
                </div>
                <Slider {...Cate6} className="product-4 product-m no-arrow">
                  {this.state.cate.map((cate, index) => (
                    <div key={index}>
                      <CategoryItem cate={cate} key={index} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //ownProps.type
  items: getCategoryCollection(state.categoryList.category),
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare }
)(CategoryCollection);
