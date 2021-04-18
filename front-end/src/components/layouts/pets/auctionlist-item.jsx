import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { getRelatedItems } from "../../../services";
import moment from "moment";
class AuctionlistItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      image: "",
    };
  }
  componentDidMount() {
    const { product, symbol } = this.props;
    console.log("auc", product);
    let dateto = moment(product.dto).format("YYYY-MM-DD HH:mm:ss");
    let difftime = moment(dateto).diff(moment(), "seconds");

    var countDownDate = moment().add(difftime, "seconds");
    var intervalId = setInterval(() => {
      var diff = moment(countDownDate).diff(moment());
      this.updateTime(diff);
    }, 1000);
    this.setState({ intervalId });
  }

  updateTime(diff) {
    if (diff <= 0) {
      clearInterval(this.state.intervalId);
      this.setState({ countdown: "จบแล้ว" });
    } else {
      let strday = moment.utc(diff).format("D");
      strday = strday - 1;
      this.setState({
        countdown: moment.utc(diff).format(` ${strday} วัน HH:mm:ss`),
      });
    }
  }
  render() {
    const { product, symbol } = this.props;
    return (
      <div className="pb-2" style={{ borderBottom: "1px solid #ddd" }}>
        <div className="product-box">
          <div className="row">
            <div className="col-5">
              <div className="img-wrapper">
                <div className="front">
                  {/* <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}> */}
                  <img src={product.image} className="img-fluid" alt="" />
                  {/* </Link> */}
                </div>
              </div>
              <h5>{product.name}</h5>
            </div>
            <div className="col-7 ">
              <div> 
                <div className="auctionprice-box">
                <div className="AuctionDate2 mb-2">
                    {this.state.countdown}
                  </div>
                  <strong>ราคาปัจจุบัน</strong>
                  <h3 style={{ color: "rgb(0, 114, 190)", fontWeight: "bold" }}>
                    <span style={{ fontSize: 18 }}>{symbol}</span>
                    {parseFloat(
                      product.currentprice > 0
                        ? product.currentprice
                        : product.startprice
                    ).toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                    })}
                  </h3> 
                </div>
                {this.state.countdown != "จบแล้ว" && (
                     <Link to={`${process.env.PUBLIC_URL}/auctiondetail/${product.id}/ประมูล`}>
                    <button className="btn btn-primary" style={{borderRadius:5,width:'100%'}}>
                      เข้าประมูล
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // relatedItems: getRelatedItems(state.data.products, ownProps.product.category),
  symbol: state.data.symbol,
});

export default connect(mapStateToProps)(AuctionlistItem);
