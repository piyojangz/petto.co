import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';

class BlogPage extends Component {

    constructor (props) {
        super (props)
    }

    render (){

        return (
            <div>
                <Breadcrumb title={'บทความ'}/>
                
                {/*Blog Details section*/}
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row"> 
                            <div className="col order-sec">
                                <div className="row blog-media">
                                    <div className="col-xl-6">
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                                <img style={{width:'100%'}} src={`https://upload.wikimedia.org/wikipedia/commons/3/3a/Betta_mahachaiensis.jpg`} className="img-fluid" alt=""/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h6>25 มกราคม 2021</h6>
                                                <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><h4>ปลากัดป่ามหาชัย</h4></Link>
                                                <ul className="post-social">
                                                    <li>โดย : วีระยุทธ ต.</li>
                                                    {/* <li><i className="fa fa-heart"></i> 5 Hits</li>
                                                    <li><i className="fa fa-comments"></i> 10 Comment</li> */}
                                                </ul>
                                                <p>มีลักษณะและรูปร่างคล้ายคลึงกับปลากัดภาคกลาง (B. splendens) มาก อีกทั้งยังมีที่อยู่อาศัยทับซ้อนกัน แต่มีความแตกต่างกันที่สีและรายละเอียดบางประการ เช่น สีของเกล็ดเป็นสีฟ้าอมเขียวหรือสีเขียวอย่างเดียวแวววาวทั้งตัว.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row blog-media">
                                    <div className="col-xl-6">
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                                <img style={{width:'100%'}} src={`https://upload.wikimedia.org/wikipedia/commons/3/3a/Betta_mahachaiensis.jpg`} className="img-fluid" alt=""/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h6>25 มกราคม 2021</h6>
                                                <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><h4>ปลากัดป่ามหาชัย</h4></Link>
                                                <ul className="post-social">
                                                    <li>โดย : วีระยุทธ ต.</li>
                                                    {/* <li><i className="fa fa-heart"></i> 5 Hits</li>
                                                    <li><i className="fa fa-comments"></i> 10 Comment</li> */}
                                                </ul>
                                                <p>มีลักษณะและรูปร่างคล้ายคลึงกับปลากัดภาคกลาง (B. splendens) มาก อีกทั้งยังมีที่อยู่อาศัยทับซ้อนกัน แต่มีความแตกต่างกันที่สีและรายละเอียดบางประการ เช่น สีของเกล็ดเป็นสีฟ้าอมเขียวหรือสีเขียวอย่างเดียวแวววาวทั้งตัว.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row blog-media">
                                    <div className="col-xl-6">
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details`} >
                                                <img style={{width:'100%'}} src={`https://upload.wikimedia.org/wikipedia/commons/3/3a/Betta_mahachaiensis.jpg`} className="img-fluid" alt=""/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="blog-right">
                                            <div>
                                                <h6>25 มกราคม 2021</h6>
                                                <Link to={`${process.env.PUBLIC_URL}/blog/details`} ><h4>ปลากัดป่ามหาชัย</h4></Link>
                                                <ul className="post-social">
                                                    <li>โดย : วีระยุทธ ต.</li>
                                                    {/* <li><i className="fa fa-heart"></i> 5 Hits</li>
                                                    <li><i className="fa fa-comments"></i> 10 Comment</li> */}
                                                </ul>
                                                <p>มีลักษณะและรูปร่างคล้ายคลึงกับปลากัดภาคกลาง (B. splendens) มาก อีกทั้งยังมีที่อยู่อาศัยทับซ้อนกัน แต่มีความแตกต่างกันที่สีและรายละเอียดบางประการ เช่น สีของเกล็ดเป็นสีฟ้าอมเขียวหรือสีเขียวอย่างเดียวแวววาวทั้งตัว.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default BlogPage