import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'

// Custom Components
import HeaderOne from './common/headers/header-one';
import HeaderTwo from './common/headers/header-two';
import HeaderThree from './common/headers/header-three';

import FooterOne from "./common/footers/footer-one";
import FooterTwo from "./common/footers/footer-two";
import FooterThree from "./common/footers/footer-three";
import HeaderFive from "./common/headers/header-five"
// ThemeSettings
import ThemeSettings from "./common/theme-settings"



class App extends Component { 
    render() {
        return (
            <div>
                <HeaderFive logoName={'logo/petto_logo.png'} />
                {this.props.children}
                <FooterTwo logoName={'logo/petto_logo.png'}/>

                <ThemeSettings />

            </div>
        );
    }
}

export default withTranslate(App);
