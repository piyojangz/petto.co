import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";

class Register extends Component {

    constructor (props) {
        super (props)

    }

    render (){


        return (
            <div>
                <Breadcrumb title={'สมัครสมาชิก'}/>
                
                
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>สมัครสมาชิก</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">ชื่อ</label>
                                                <input type="text" className="form-control" id="fname"
                                                       placeholder="ชื่อจริง" required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">นามสกุล</label>
                                                <input type="password" className="form-control" id="lname"
                                                       placeholder="นามสกุล" required="" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">อีเมลล์</label>
                                                <input type="text" className="form-control" id="email"
                                                       placeholder="ระบุอีเมลล์" required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">รหัสผ่าน</label>
                                                <input type="password" className="form-control" id="review"
                                                       placeholder="ระบุรหัสผ่าน" required="" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">ยืนยันรหัสผ่าน</label>
                                                <input type="password" className="form-control" id="review"
                                                       placeholder="ระบุรหัสผ่าน" required="" />
                                            </div>
                                            <a href={`${process.env.PUBLIC_URL}/pages/termandcond`} className="text-center tandc">นโยบายและข้อกำหนด</a>
                                            <a href="#" className="btn-petto-secondcolor  text-center">ยืนยันการสมัครสมาชิก</a>
                                        </div>
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

export default Register