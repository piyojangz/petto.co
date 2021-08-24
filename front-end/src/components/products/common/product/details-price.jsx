import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Modal from "react-responsive-modal";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class DetailsWithPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      quantity: 0,
      stock: "มีสินค้า",
      nav3: null,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({
      nav3: this.slider3,
    });

    setTimeout(() => {
      const { item } = this.props;
      // this.setState({ quantity: parseInt(item.stock) });
    }, 500);
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "มีสินค้า" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    if (this.props.item.stock > this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({
        stock: `ไม่สามารถสั่งได้มากกว่า ${this.props.item.stock}`,
      });
    }
  };
  changeQty = (e) => {
    this.setState({
      quantity: parseInt(e.target.value) ? parseInt(e.target.value) : 0,
    });
  };

  addtoCart(item) {
    const { addToCartClicked } = this.props;

    if (this.props.item.stock >= this.state.quantity) {
      addToCartClicked(item, this.state.quantity);
      this.props.item.stock = this.props.item.stock - this.state.quantity;
    } else {
      this.setState({
        stock: `ไม่สามารถสั่งได้มากกว่า ${this.props.item.stock}`,
      });
    }
  }

  render() {
    const {
      symbol,
      item,
      addToCartClicked,
      BuynowClicked,
      addToWishlistClicked,
    } = this.props;

    var colorsnav = {
      slidesToShow: 6,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true,
    };

    console.log("item", item);

    return (
      <div className="col-lg-6 rtl-text">
        <div className="product-right">
          <h2> {item.name} </h2>
          <h4 style={{ color: "#0072BE" }}>
            {item.discount > 0 && (
              <del>
                <span style={{ fontSize: 18 }}>{symbol}</span>
                {item.price.toLocaleString(navigator.language, {
                  minimumFractionDigits: 2,
                })}
              </del>
            )}
            {/* <span>ลดไป {item.discount}%</span> */}
          </h4>
          <h3 style={{ color: "#0072BE" }}>
            <span style={{ fontSize: 18 }}>{symbol}</span>
            {numberWithCommas(
              parseFloat(
                item.discount > 0 ? item.discount : item.price
              ).toLocaleString(navigator.language, {
                minimumFractionDigits: 2,
              })
            )}{" "}
          </h3>
          {/* {item.variants?
                    <ul >
                        <Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)} className="color-variant">
                            {item.variants.map((vari, i) => {
                                return <li className={vari.color} key={i} title={vari.color}></li>
                            })}
                        </Slider>
                    </ul>:''} */}
          <div className="product-description border-product">
            {/* {item.size?
                            <div>
                                <h6 className="product-title size-text">select size
                                    <span><a href="#" data-toggle="modal"
                                             data-target="#sizemodal" onClick={this.onOpenModal} >size chart</a></span></h6>
                                <div className="modal fade" id="sizemodal" tabIndex="-1"
                                     role="dialog" aria-labelledby="exampleModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered"
                                         role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title"
                                                    id="exampleModalLabel">Sheer Straight
                                                    Kurta</h5>
                                                <button type="button" className="close"
                                                        data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="size-box">
                            <ul>
                                {item.size.map((size, i) => {
                                    return <li key={i}><a href="#">{size}</a></li>
                                })}
                            </ul>
                        </div>
                            </div>:''} */}
            <span className="instock-cls">{this.state.stock}</span>
            <h6 className="product-title">คลัง : {item.stock}</h6>
            <div className="qty-box">
              <div className="input-group">
                {/* {this.state.quantity > item.stock && ( */}
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    onClick={this.minusQty}
                    data-type="minus"
                    data-field=""
                  >
                    <i className="fa fa-angle-left" />
                  </button>
                </span>
                {/* )} */}

                <input
                  // disabled={this.state.quantity <= item.stock}
                  type="text"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.changeQty}
                  className="form-control input-number"
                />
                {/* {this.state.quantity > item.stock && ( */}
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    onClick={this.plusQty}
                    data-type="plus"
                    data-field=""
                  >
                    <i className="fa fa-angle-right" />
                  </button>
                </span>
                {/* )} */}
              </div>
            </div>
          </div>
          <div className="product-buttons">
            <a className="btn btn-solid" onClick={() => this.addtoCart(item)}>
              เพิ่มสินค้าลงตะกร้า
            </a>
            {/* <Link
              to={`${process.env.PUBLIC_URL}/checkout`}
              className="btn btn-solid"
              onClick={() => BuynowClicked(item, this.state.quantity)}
            >
              ซื้อเลย
            </Link> */}
          </div>
          <div className="border-product">
            <h6 className="product-title">รายละเอียดสินค้า</h6>
            <p>{item.shortDetails}</p>
          </div>
          {/* <div className="border-product">
                        <h6 className="product-title">share it</h6>
                        <div className="product-icon">
                            <ul className="product-social">
                                <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                                <button className="wishlist-btn" onClick={() => addToWishlistClicked(item)}><i
                                    className="fa fa-heart"></i><span
                                    className="title-font">Add To WishList</span>
                                </button>
                        </div>
                    </div> */}
          {/* <div className="border-product">
                        <h6 className="product-title">Time Reminder</h6>
                        <div className="timer">
                            <p id="demo">
                                <span>25
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Days</span>
                                </span>
                                <span>22
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Hrs</span>
                                </span>
                                <span>13
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Min</span>
                                </span>
                                <span>57
                                    <span className="timer-cal">Sec</span>
                                </span>
                            </p>
                        </div>
                    </div> */}
        </div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Sheer Straight Kurta
                </h5>
              </div>
              <div className="modal-body">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DetailsWithPrice;
