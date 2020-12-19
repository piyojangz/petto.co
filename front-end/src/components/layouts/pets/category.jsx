import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Import custom components 
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

class Category extends Component {

  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Petto.co | หมวดหมู่</title>
          <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
        </Helmet> 
        <SpecialProducts /> 

      </div>
    )


  }
}

export default Category;