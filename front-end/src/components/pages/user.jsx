import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import Shoptop from "../products/common/shop-top";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"; 
import AuctionList from "../layouts/pets/auctionlist";
import PaidingList from "../layouts/pets/paidinglist";
import WaitingList from "../layouts/pets/waitinglist";
import WaitingReviewList from "../layouts/pets/waitingreviewlist";

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Breadcrumb title={"Dashboard"} />

        {/*Dashboard section*/}
        <section className="section-b-space">
          <div className="container">
            <Shoptop />

            <Tabs className="theme-tab">
              <TabList className="tabs tab-title">
                <Tab className="petto-tabs">ข้อมูลส่วนตัว</Tab>
                <Tab className="petto-tabs">รายการประมูล</Tab>
                <Tab className="petto-tabs">รายการที่ต้องชำระ</Tab>
                <Tab className="petto-tabs">รายการที่ต้องได้รับ</Tab>
                <Tab className="petto-tabs">รายการที่ต้องรีวิว</Tab>
              </TabList>

              <TabPanel>
                <div className="no-slider row">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="dashboard-right">
                        <div className="dashboard">
                          <div className="page-title">
                            <h2>ข้อมูลส่วนตัว</h2>
                          </div>
                          <div className="box-account box-info">
                            <div className="box-head">
                              <h2>บัญชี</h2>
                            </div>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="box">
                                  <div className="box-title">
                                    <h3>ข้อมูลติดต่อ</h3>
                                    <a href="#">แก้ไข</a>
                                  </div>
                                  <div className="box-content">
                                    <h6>วีระยุทธ ตะสูงเนิน</h6>
                                    <h6>petto@gmail.com</h6>
                                    <h6>
                                      <a href="#">เปลี่ยนรหัสผ่าน</a>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="box">
                                {/* <div className="box-title">
                                                        <h3>Address Book</h3>
                                                        <a href="#">Manage Addresses</a>
                                                    </div> */}
                                <div className="row">
                                  {/* <div className="col-sm-6">
                                                            <h6>Default Billing Address</h6>
                                                            <address>
                                                                You have not set a default billing address.<br/>
                                                                <a href="#">Edit Address</a>
                                                            </address>
                                                        </div> */}
                                  <div className="col-sm-6">
                                    <h6>การจัดส่งสินค้า</h6>
                                    <address>
                                      199/152 มบ.เรสท์สายไหม ซอยสายไหม43
                                      แขวงสายไหม เขตสายไหม กรุงเทพ 10220
                                      <br />
                                      <a href="#">แก้ไข</a>
                                    </address>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <AuctionList /> 
              </TabPanel>
              <TabPanel>
                <PaidingList /> 
              </TabPanel>
              <TabPanel>
                <WaitingList /> 
              </TabPanel>
              <TabPanel>
                <WaitingReviewList /> 
              </TabPanel>
            </Tabs>
          </div>
        </section>
      </div>
    );
  }
}

export default User;
