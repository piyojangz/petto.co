import React, { Component } from 'react';
import Slider from 'react-slick';

import { Slider6 } from "../../../services/script";

class CateBlock extends Component {

    render() {
        return (
            <section className="section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Slider {...Slider6} className="slide-6">
                                <div>
                                    <div className="logo-block" >
                                        <a href={null}>
                                            <img style={{width:70}} src={`${process.env.PUBLIC_URL}/assets/images/logos/bestshop.png`} alt="" />
                                            <center><h5>ร้านขายดี</h5></center>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block" >
                                        <a href={null}>
                                            <img style={{width:70}}  src={`${process.env.PUBLIC_URL}/assets/images/logos/auction.png`} alt="" />
                                            <center><h5>ประมูล</h5></center>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block" >
                                        <a href={null}>
                                            <img style={{width:70}}  src={`${process.env.PUBLIC_URL}/assets/images/logos/cate.png`} alt="" />
                                            <center><h5>หมวดหมู่</h5></center>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="logo-block" >
                                        <a href={null}>
                                            <img style={{width:70}}  src={`${process.env.PUBLIC_URL}/assets/images/logos/promotion.png`} alt="" />
                                            <center><h5>โปรโมชั่น</h5></center>
                                        </a>
                                    </div>
                                </div> 
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default CateBlock;