import React, { Component } from 'react';
import { apiCall } from "../helper/NetworkRequest";
import './ExploreContainer.css';

type MyState = {
  loader: Boolean,
  result: Array<[]>
};

class ExploreContainer extends Component<{}, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loader: true,
      result: []
    };
  }

  /**
   * on component mount fetch list of planets from SWAPI
   */
  componentDidMount = () => {
    this.getResult();
  }
  
  /**
   * this method is used to fetch the list of planets
   */
  getResult = () => {
    this.setState({ loader: true });

    apiCall("https://swapi.dev/api/planets/?page=1")
      .then((resp) => this.apiSuccessCallback(resp))
      .catch((error) => this.apiFailureCallback(error));
  }

  /**
   * this method is planets api success callback, set the data into state
   */
  apiSuccessCallback = (resp: any) => {
    let data = resp.data.results;

    this.setState({
      result: data,
      loader: false,
    });
  }

  /**
   * this method is planets api failure callback, shows error
   */
  apiFailureCallback = (error: any) => {
    this.setState({ loader: false });
    console.error(error);
    alert("Something went wrong!!");
  }

  render() {
    let loader = null;
    if (this.state.loader) {
      loader = <div>
        <div className="loader"></div>
        <div id="overlay"></div>
      </div>;
    } else {
      loader = null;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.state.result.map((item: any, i: any) => {
                return(
                  <div className="response" key={i}>
                      <p>Planet Name: {item.name}</p>
                      <p>Rotation period: {item.rotation_period}, Orbital period: {item.orbital_period}, Diameter: {item.diameter}</p>
                      <p>Climate: {item.climate}, Gravity: {item.gravity}, Terrain: {item.terrain}</p>
                      <p>Surface water: {item.surface_water}, Population: {item.population}</p>
                  </div>
                );
            })}
            {loader}
          </div>
        </div>
      </div>
    );
  }
};

export default ExploreContainer;
