import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeComponent from '../components/HomeComponent';
import { fetchUser, removeUser } from '../actions/user';

const mapStateToProps = (state) => ({
  username: state.user.name,
  isLoaded: state.user.loaded,
  planets: state.user.planets,
  planetsLoaded: state.user.planetsLoaded,
  fetchingPlanets: state.user.fetchingPlanets,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  removeUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
// import React from 'react'
// import { Text } from 'react-native'

// const HomeContainer = () => {
//   return (
//     <Text>Home Container </Text>
//   )
// }

// export default HomeContainer
