import React, { Component } from 'react';
import { getPlanetData } from "../../util/provider";

class HomeComponent extends Component {
  state = {
    user: "",
    loader: true,
    result: []
  };

  /**
   * On componentDidMount check if the user exist in store
   * then, fetch planets data
   * otherwise, logout
   */
  componentDidMount = async () => {
    let { user } = this.props;

    user ??= "Guest";

    if (user) {
      this.setState({ user });
      await this.getResult();
    } else {
      this.signout();
    }
  };

  /**
   * this method is used to logout the user and redirect it to login page
   */
  signout = () => {
    this.props.removeUser?.();
    this.props.history?.push?.('/');
  };

  /**
   * this method is used to get planets information and set to state
   */
  getResult = async () => {
    this.setState({ loader: true });

    try {
      const resp = await getPlanetData();
      await this.apiSuccessCallback(resp);
    } catch (err) {
      this.apiFailureCallback(new Error("Failed to fetch planet data", { cause: err }));
    }
  };

  /**
   * this method is success callback of planets api
   */
  apiSuccessCallback = async (resp) => {
    const data = resp?.data?.results ?? [];

    if (!Object.hasOwn(resp.data, 'results')) {
      console.warn("Results key missing in API response.");
    }

    this.setState({
      result: data,
      loader: false,
    });
  };

  /**
   * this method is failure callback of planets api
   */
  apiFailureCallback = (error) => {
    this.setState({ loader: false });
    alert(`Something went wrong!!\n${error?.cause?.message ?? "Unknown error"}`);
  };

  render() {
    const { user, loader, result } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="yellow">
              <h1>Welcome! {user}</h1>
            </div>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary float-right margin-top10"
              id="signoutBtn"
              onClick={this.signout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {result.length === 0 && !loader && (
              <p>No data found. 🪐</p>
            )}
            {result.map((item, i) => (
              <div className="response" key={i}>
                <p>Planet Name: {item.name}</p>
                <p>
                  Rotation period: {item.rotation_period}, Orbital period: {item.orbital_period}, Diameter: {item.diameter}
                </p>
                <p>
                  Climate: {item.climate}, Gravity: {item.gravity}, Terrain: {item.terrain}
                </p>
                <p>
                  Surface water: {item.surface_water}, Population: {item.population}
                </p>
              </div>
            ))}
            {loader && (
              <div>
                <div className="loader"></div>
                <div id="overlay"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
