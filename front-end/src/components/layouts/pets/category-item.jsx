import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import {connect} from "react-redux";



import {getRelatedItems} from "../../../services";


class CategoryItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            open: false, 
            image: ''
        }
    }

    onClickHandle(img) {
        this.setState({ image : img} );
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onOpenCartModal = () => {
        this.setState({ cartModalopen: true });
        this.props.onAddToCartClicked();
    };
    onCloseCartModal = () => {
        this.setState({ cartModalopen: false });
    };

   
    render() {
        const {cate} = this.props;  
        return (
            <div>
                <div className="cate-box">
                    <div className="img-wrapper"> 
                        <div className="front">
                            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${cate.id}`} >
                                <img  src={`${cate.picture}`}
                                className="img-fluid lazyload bg-img"
                                alt="" />
                            </Link>
                        </div> 
                    </div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // relatedItems: getRelatedItems(state.data.products, ownProps.product.category),
    // symbol: state.data.symbol
})

export default connect(mapStateToProps) (CategoryItem);