import React, { Component } from "react";
import { connect } from 'react-redux';

class Header extends Component{
    renderContent(){
        console.log(this.props.auth);
        switch (this.props.auth){
            case null:
                return;                
            case false:
                return "Log in with Google";
            default:
                return "Login aldy"
        }    
    };

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo"/>
                    Emaily
                    <a/>
                    <ul className="right">
                        <li>
                            { this.renderContent()}
                        </li>
                    </ul>
    
                </div>
            </nav>
        )
    }
};

function mapStateToProps(auth) {
    return {auth}
};

export default connect(mapStateToProps)(Header);