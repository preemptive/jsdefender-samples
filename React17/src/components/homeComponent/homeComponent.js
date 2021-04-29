import React, { Component } from 'react';
import { apiCall } from "../../helper/NetworkRequest";

class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            loader: true,
            result: []
        };
    }

    /**
     * On componentDidMount check if the user exist in store
     * then, fetch planets data
     * otherwise, logout
     */
    componentDidMount = () => {
        const { user } = this.props;
        if (user) {
            this.setState({ user: user });
            this.getResult();
        } else {
            this.signout();
        }
    }

    /**
     * this method is used to logout the user and redirect it to login page
     */
    signout = () => {
        this.props.removeUser();
        this.props.history.push('/');
    }

    /**
     * this method is used to get planets information and set to state
     */
    getResult = () => {
        this.setState({ loader: true });

        apiCall("https://swapi.dev/api/planets/?page=1")
            .then((resp) => this.apiSuccessCallback(resp))
            .catch((error) => this.apiFailureCallback(error));
    }

    /**
     * this method is success callback of planets api
     */
    apiSuccessCallback = (resp) => {
        let data = resp.data.results;

        this.setState({
            result: data,
            loader: false,
        });
    }

    /**
     * this method is failure callback of planets api
     */
    apiFailureCallback = (error) => {
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
                    <div className="col-md-8">
                        <div className="yellow">
                            <h1>Welcome! {this.state.user}</h1>
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
                        {this.state.result.map((item, i) => {
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
}

export default HomeComponent;