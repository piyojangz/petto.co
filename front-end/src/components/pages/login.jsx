import React, { Component } from 'react';

import Breadcrumb from "../common/breadcrumb";

class Login extends Component {

    constructor(props) {
        super(props)

    }

    render() {


        return (
            <div>
                <Breadcrumb title={'เข้าสู่ระบบ'} />
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>เข้าสู่ระบบ</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">อีเมลล์ที่ใช้ลงทะเบียน</label>
                                            <input type="text" className="form-control" id="email" placeholder="ระบุอีเมลล์"
                                                required="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">รหัสผ่าน</label>
                                            <input type="password" className="form-control" id="review"
                                                placeholder="ระบุรหัสผ่าน" required="" />
                                        </div>
                                        <a href={`${process.env.PUBLIC_URL}/pages/login`} className="btn btn-petto">เข้าสู่ระบบ</a>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>ลูกค้าใหม่</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">สมัครสมาชิก</h6>
                                    <p>สำหรับสมาชิกใหม่ เมื่อสมัครแล้วสามารถทำการซื้อสินค้ากับ Petto.co ได้ทันที<br />ส่วนสำหรับผู้ขายต้องรอการยืนยันจากเจ้าหน้าที่ก่อน</p>
                                    <a href={`${process.env.PUBLIC_URL}/pages/register`} className="btn btn-petto-secondcolor">สมัครสมาชิก</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Login