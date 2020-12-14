import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { getCategoryCollection } from '../../../services'
import { Cate6 } from '../../../services/script'
import { addToCart, addToWishlist, addToCompare } from "../../../actions";
import CategoryItem from './category-item';

class CategoryCollection extends Component {

    render() {
        const { items, symbol, addToCart, addToWishlist, addToCompare, title, subtitle } = this.props;
        return (
            <div>
                {/*Paragraph*/}
                <section className="section-b-space j-box pets-box ratio_square">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="title1 title5">
                                    {subtitle ? <h4>{subtitle}</h4> : ''}
                                    <div className="row">
                                        <div className="col-6">
                                            <h2 className="title-inner1 text-left">{title}</h2>
                                        </div>
                                        <div className="col-6">
                                            <h5 className="title-inner1 text-right">{'ดูเพิ่มเติม >'}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                <Slider {...Cate6} className="product-4 product-m no-arrow">
                                    {items.map((cate, index) =>
                                        <div key={index}>
                                            <CategoryItem
                                                cate={cate}
                                                key={index} />
                                        </div>)
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    //ownProps.type
    items: getCategoryCollection(state.categoryList.category)
})

export default connect(mapStateToProps, { addToCart, addToWishlist, addToCompare })(CategoryCollection);