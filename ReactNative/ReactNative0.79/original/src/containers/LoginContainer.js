import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/user';
import { LoginComponent } from '../components/LoginComponent';

const mapStateToProps = (state) => ({
  name: state.user.name,
  errorMessage: state.user.error,
  loggingIn: state.user.loggingIn,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

// import React from 'react'
// import { Text } from 'react-native'
// const LoginContainer = () => {
//   return (
//     <Text>LoginContainer </Text>
//   )
// }

// export default LoginContainer