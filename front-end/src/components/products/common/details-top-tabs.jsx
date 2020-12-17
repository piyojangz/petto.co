import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { Link } from "react-router-dom";

class DetailsTopTabs extends Component {
  render() {
    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <Tabs className="tab-content nav-material">
              <TabList className="nav nav-tabs nav-material">
                <Tab className="nav-item">
                  <span className="nav-link active">
                    <i className="icofont icofont-ui-home" />
                    ลักษณะสินค้า
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
                <table className="table table-striped mb-0">
                  <tbody>
                    <tr>
                      <th>สี :</th>
                      <td>ทอง</td>
                    </tr>
                    <tr>
                      <th>พันธุ์ :</th>
                      <td>จีน</td>
                    </tr>
                    <tr>
                      <th>ประเภท :</th>
                      <td>ปลาสวยงาม</td>
                    </tr>
                  </tbody>
                </table>
              </TabPanel>
              {/* <TabPanel>
                <p className="mt-4 p-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </TabPanel> */}
              {/* <TabPanel>
                                <div className="mt-4 text-center">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe
                                            src="https://www.youtube.com/embed/BUWzX78Ye_8"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
                            </TabPanel> */}
              <TabPanel>
                <form className="theme-form mt-4">
                  <div className="form-row">
                    <div className="col-md-12 ">
                      <div className="title1 title5">
                        <div className="row">
                          <div className="col-8">
                            <div className="row">
                              <div className="ml-3">
                                <h2 className="title-inner1 text-left vertical-center">
                                  {"รีวิว"}
                                </h2>
                              </div>
                              <div className="ml-1">
                                <p>4.5/5.0</p>
                              </div>
                              <div className="ml-1">
                                <div className="media-body">
                                  <div className="rating three-star vertical-center">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <h5 className="title-inner1 text-right vertical-center">
                              {"ดูเพิ่มเติม >"}
                            </h5>
                          </div>
                        </div>
                        <hr />
                      </div>
                      <div className="media m-0">
                        <img
                          src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-9/118582591_10218072880599813_1509440737429185966_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeF__0Kl8lGrZmsYDOp5WDYM6GDEov0ROXDoYMSi_RE5cAJXxbRVcdmaEty7Nc3oDM4&_nc_ohc=XgSV3-WYxZ0AX_LbX1l&_nc_ht=scontent.fbkk5-5.fna&oh=161e70082bd4dd389d171e54583d575d&oe=60009F2E`}
                          className="rounded-circle"
                          style={{ width: 35, height: 35 }}
                          alt=""
                        />
                        <div className="col-md-12 ">
                          <label style={{ marginBottom: 0 }}>
                            วีระยุทธ ตะสูงเนิน
                          </label>
                          <div className="media-body">
                            <div className="rating three-star">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p>
                        ได้รับสินค้าถูกต้องตามที่สั่ง ใส่ภาชนะมาอย่างดี
                        ปลาไม่ช้ำ แนะนำร้านนี้เลย ถูก ดี ไม่แพง
                      </p>
                      <div className="row">
                        <div className="col-4">
                          <div key={1}>
                            <div className="embed-responsive embed-responsive-16by9">
                              <iframe
                                height="100"
                                src="https://www.youtube.com/embed/ubK-U9HgTIo"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div key={1}>
                            <img
                              src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-9/118582591_10218072880599813_1509440737429185966_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeF__0Kl8lGrZmsYDOp5WDYM6GDEov0ROXDoYMSi_RE5cAJXxbRVcdmaEty7Nc3oDM4&_nc_ohc=XgSV3-WYxZ0AX_LbX1l&_nc_ht=scontent.fbkk5-5.fna&oh=161e70082bd4dd389d171e54583d575d&oe=60009F2E`}
                              key={1}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div key={1}>
                            <img
                              src={`https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.0-9/118582591_10218072880599813_1509440737429185966_o.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeF__0Kl8lGrZmsYDOp5WDYM6GDEov0ROXDoYMSi_RE5cAJXxbRVcdmaEty7Nc3oDM4&_nc_ohc=XgSV3-WYxZ0AX_LbX1l&_nc_ht=scontent.fbkk5-5.fna&oh=161e70082bd4dd389d171e54583d575d&oe=60009F2E`}
                              key={1}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="review"
                        placeholder="Enter your Review Subjects"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <textarea
                        className="form-control"
                        placeholder="Wrire Your Testimonial Here"
                        id="exampleFormControlTextarea1"
                        rows="6"
                      />
                    </div> */}
                    {/* <div className="col-md-12">
                      <button className="btn btn-petto" type="submit">
                        Submit YOur Review
                      </button>
                    </div> */}
                  </div>
                </form>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

export default DetailsTopTabs;
