import React, { Component } from 'react';
import { apiCall } from "../../helper/NetworkRequest";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            dob: '',
            error: '',
            loader: false,
        };
    }

    /**
     * this method is used to call SWAPI API on login click
     */
    login = (event) => {
        event.preventDefault();

        this.setState({loader: true});
        apiCall(`https://swapi.dev/api/people/?search=${this.state.username}`)
            .then((resp) => this.apiSuccessCallback(resp))
            .catch((error) => this.apiFailureCallback(error));
    }

    /**
     * this method is a success callback function of login api call,
     * redirect to dashboard if successful
     * otherwise show error
     */
    apiSuccessCallback = (resp) => {
        let len = resp.data.results.length;
        let errorMsg = "Username does not exist";
        const username = this.state.username;

        for (let i = 0; i < len; i++) {
            if (resp.data.results[i].name === username) {
                if (resp.data.results[i].birth_year === this.state.dob) {
                    errorMsg = "";
                    this.props.addUser(username);
                    this.props.history.push('/home');
                    return;
                } else {
                    errorMsg = "DOB does not match";
                }
                break;
            }
        }

        this.setState({ error: errorMsg, loader: false });
    }

    /**
     * this method is a failure callback function of login api call
     */
    apiFailureCallback = (error) => {
        this.setState({ error: "Error", loader: false });
        console.error(error);
    }

    /**
     * this method is used to save keydown changes to state
     */
    onChangeHandler = (event) => {
        this.setState({[event.target.id]: event.target.value });
    }

    render() {
        let loader = null;
        if(this.state.loader){
            loader = <div>
                <div className="loader"></div>
                <div id="overlay"></div>
            </div>;
        }
        return (
            <div className="container">
                <div className="row center yellow">
                    <h1 className="jumbo">SWAPI</h1>
                    <p className="lead">The Star Wars API</p>
                </div>
                <div className="row">
                    <div className="offset-md-4 col-md-4 col-xs-12 form-box">
                        <form onSubmit={this.login} >
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    id="username"
                                    className="form-control"
                                    placeholder="Enter your Username"
                                    onChange = {this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    id="dob"
                                    className="form-control"
                                    placeholder="Enter your DOB"
                                    onChange = {this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <span className="danger">{this.state.error}</span>
                            </div>
                            <button
                                id="loginButton"
                                className="btn btn-primary btn-block"
                                type="submit"
                            >
                            LOGIN
                            </button>
                        </form>
                        {loader}
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;