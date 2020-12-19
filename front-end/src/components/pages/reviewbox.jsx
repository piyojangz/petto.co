import React, { Component } from 'react';
import { connect } from "react-redux";
import Breadcrumb from "../common/breadcrumb";
import { Link } from "react-router-dom";
class ReviewBox extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        let { symbol } = this.props;
        return (
            <div>
                <Breadcrumb title={'ปลากัดคัดเกรดครีบยาวสวยงาม'} />
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="form-row">
                                    <div className="col-md-12 ">
                                        <div className="media m-0">
                                            <Link to={`${process.env.PUBLIC_URL}/shop`}>
                                                <img
                                                    src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t31.0-8/21427327_1662269207125713_6840415808923796799_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHzVqbIeITQAxNXS4ThrYH9zdD0ZQzUEILN0PRlDNQQgvTSH9TRWZJ0eKhj8jO0rjM&_nc_ohc=u87hRn6TGoAAX8rP_Pb&_nc_ht=scontent.fbkk5-5.fna&oh=33de20e8e470d5b8668c555354e6a258&oe=60018DE1`}
                                                    className="rounded"
                                                    style={{ width: 30, height: 30 }}
                                                    alt=""
                                                />
                                            </Link>
                                            <div className="col-md-12 ">
                                                <div className="row mt-0">
                                                    <div className="col-6 ">
                                                        <label style={{ marginBottom: 0 }}>ร้านขายปลาสวยงาม ราชพฤกษ์ ...</label>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <label style={{ marginBottom: 0 }}>#2012110403292</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-row">
                                    <div className="col-md-12 ">
                                        <div className="media m-0">
                                            <Link to={`${process.env.PUBLIC_URL}/shop`}>
                                                <img
                                                    src={`https://cf.shopee.co.th/file/b08d2f6d4020e6603027bdf4a052744e`}
                                                    className="rounded"
                                                    style={{ width: 80, height: 80 }}
                                                    alt=""
                                                />
                                            </Link>
                                            <div className="col-md-12 ">
                                                <div className="row mt-0">
                                                    <div className="col-6 ">
                                                        <label style={{ marginBottom: 0 }}>ปลากัดคัดเกรดครีบยาวสวยงาม</label>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <h4>
                                                            <del>{symbol}{399}</del>
                                                            {/* <span>ลดไป {item.discount}%</span> */}
                                                        </h4>
                                                        <h3>{symbol}{299} </h3>
                                                    </div>
                                                </div>
                                                <div className="row mt-0">
                                                    <div className="col-6 ">
                                                        <label style={{ marginBottom: 0 }}>x1</label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="review">เขียนอธิบายเกี่ยวกับสินค้าชิ้นนี้</label>
                                            <textarea className="form-control" ></textarea>

                                        </div>
                                        <div className="form-group">
                                            <div className="text-center align-items-center">
                                                <div className="">
                                                    <div className="m-2 text-center align-items-center">
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/images/icon/vdobtn.png`}
                                                            className="rounded m-2"
                                                            style={{ width: 80, height: 80 }}
                                                            alt=""
                                                        />
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/images/icon/imgbtn.png`}
                                                            className="rounded m-2"
                                                            style={{ width: 80, height: 80 }}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href={`#`} className="btn btn-petto">ยืนยัน</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        symbol: state.data.symbol,
    };
};

export default connect(
    mapStateToProps,
    {}
)(ReviewBox);
