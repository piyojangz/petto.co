import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";

class Search extends Component {

    constructor (props) {
        super (props)

    }

    render (){


        return (
            <div>
                <Breadcrumb title={'ค้นหา'}/>
                
                
                {/*Search section*/}
                <section className="authentication-page section-b-space">
                    <div className="container">
                        <section className="search-block">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <form className="form-header">
                                            <div className="input-group">
                                                <input type="text" className="form-control"
                                                       aria-label="Amount (to the nearest dollar)"
                                                       placeholder="พิมพ์ชื่อสินค้า......" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-solid"><i
                                                            className="fa fa-search"></i>ค้นหาสินค้า
                                                        </button>
                                                    </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

            </div>
        )
    }
}

export default Search