import React, {Component} from 'react';
import {Link} from "react-router-dom"
import { withTranslate } from 'react-redux-multilingual'

import {SlideUpDown} from "../../services/script"
import { ToastContainer } from 'react-toastify';

class ThemeSettings extends Component {

    constructor(props){
        super(props);

        this.state = {
            divName:'RTL',
            themeLayout: false
        }
    }


    /*=====================
     Tap on Top
     ==========================*/
    componentWillMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        if (document.documentElement.scrollTop > 600) {
            document.querySelector(".tap-top").style = "display: block";
        } else {
            document.querySelector(".tap-top").style = "display: none";
        }
    }
    clickToTop(){
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    }

    componentDidMount() {
        SlideUpDown('setting-title');
    }

    openSetting = () => {
        document.getElementById("setting_box").classList.add('open-setting');
        document.getElementById("setting-icon").classList.add('open-icon');
    }
    closeSetting = () => {
        document.getElementById("setting_box").classList.remove('open-setting');
        document.getElementById("setting-icon").classList.remove('open-icon');
    }

    // Color Picker
    changeColor(event, color){
        var elems = document.querySelectorAll(".color-box li");
        [].forEach.call(elems, function(elemt) {
            elemt.classList.remove('active');
        })

        event.target.classList.add('active');
        console.log(color)
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/`+color+`.css` );
    }

    ChangeRtl(divName){
        if(divName === 'RTL') {
            document.body.classList.add('rtl');
            this.setState({divName: 'LTR'});
        }else{
            document.body.classList.remove('rtl');
            this.setState({divName: 'RTL'});
        }
    }

    changeThemeLayout() {
        this.setState({
            themeLayout:!this.state.themeLayout
        })
    }

    render() {
        if(this.state.themeLayout){
            document.body.classList.add('dark');
        }else{
            document.body.classList.remove('dark');
        }
        let tap_to_top = {display: 'none'}

        return (
            <div>
                {/* <a href="javascript:void(0)" onClick={() => this.openSetting()}>
                    <div className="setting-sidebar" id="setting-icon">
                        <div>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                        </div>
                    </div>
                </a>  */}
                {/* <div className="sidebar-btn dark-light-btn">
                    <div className="dark-light">
                        <div
                            className="theme-layout-version"
                            onClick={() => this.changeThemeLayout()}
                        >{this.state.themeLayout?'Light':'Dark'}</div>
                    </div>
                </div> */}
                <div className="tap-top" onClick={this.clickToTop} style={tap_to_top}>
                    <div>
                        <i className="fa fa-angle-double-up"></i>
                    </div>
                </div>

                <ToastContainer/>
            </div>
        );
    }
}

export default withTranslate(ThemeSettings);
