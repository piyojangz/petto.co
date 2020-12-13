import React from 'react';
import {Link} from 'react-router-dom'

function LogoImage(props) {

    return <Link to={`${process.env.PUBLIC_URL}/`} >
                <img style={{height:30}} src={`${process.env.PUBLIC_URL}/assets/images/icon/${props.logo}`} alt="" className="img-fluid" />
            </Link>;
}

export default LogoImage;