import React from 'react';
import { connect } from 'react-redux';
import addUser from "../actions/user";
import { bindActionCreators } from 'redux';
import LoginComponent from "../components/loginComponent/loginComponent";

const loginContainer = (props) =>{
    return(
        <LoginComponent
            history={props.history}
            addUser={props.addUser}
        />
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addUser: addUser,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(loginContainer);