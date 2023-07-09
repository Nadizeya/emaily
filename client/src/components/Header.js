import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from "./Payment";

class Header extends Component{
    renderContent(){
        console.log(this.props.auth);
        switch (this.props.auth.auth){
            case null:
                return;                
            case false:
                return(
                    <li><a href="/auth/google">Log in with Google</a></li>
                );
            default:
                return[
                    <li key="1"><Payment/></li>,
                    <li key="3" style={{margin: '0px 15px'}}>
                    Credits: {this.props.auth.auth.credits}
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ] ;
        }    
    };

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className= "left brand-logo" 
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        { this.renderContent()}                        
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