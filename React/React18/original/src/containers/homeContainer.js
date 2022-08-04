import React from 'react';
import { connect } from 'react-redux';
import { removeUser } from "../actions/user";
import { bindActionCreators } from 'redux';
import HomeComponent from "../components/homeComponent/homeComponent";

const HomeContainer = (props) => {
    return(
        <HomeComponent
            user={props.user}
            history={props.history}
            removeUser={props.removeUser}
        />
    );
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeUser: removeUser,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);