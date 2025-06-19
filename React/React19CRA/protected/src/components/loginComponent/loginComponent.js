import React, { Component } from 'react';
import { getUserProfile } from "../../util/provider";

class LoginComponent extends Component {
  state = {
    username: '',
    dob: '',
    error: '',
    loader: false,
  };

  /**
   * this method is used to call SWAPI API on login click
   */
  login = async (event) => {
    event.preventDefault();
    this.setState({ loader: true });

    try {
      const resp = await getUserProfile(this.state.username);
      await this.apiSuccessCallback(resp);
    } catch {
      this.apiFailureCallback();
    }
  };

  /**
   * this method is a success callback function of login api call,
   * redirect to dashboard if successful
   * otherwise show error
   */
  apiSuccessCallback = async (resp) => {
    const { username, dob } = this.state;
    const results = resp?.data?.results ?? [];

    const user = results.find((u) => u.name === username) ?? null;
    let errorMsg = "Username does not exist";

    if (user) {
      if (user.birth_year === dob) {
        this.props.addUser?.(username);
        this.props.history?.push?.('/home');
        return;
      } else {
        errorMsg = "DOB does not match";
      }
    }

    this.setState({ error: errorMsg, loader: false });
  };

  /**
   * this method is a failure callback function of login api call
   */
  apiFailureCallback = () => {
    this.setState({ error: "Error", loader: false });
  };

  onChangeHandler = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  render() {
    const { loader, error } = this.state;

    return (
      <div className="container">
        <div className="row center yellow">
          <h1 className="jumbo">SWAPI</h1>
          <p className="lead">The Star Wars API</p>
        </div>
        <div className="row">
          <div className="offset-md-4 col-md-4 col-xs-12 form-box">
            <form onSubmit={this.login}>
              <div className="form-group">
                <label>Username</label>
                <input
                  id="username"
                  className="form-control"
                  placeholder="Enter your Username"
                  onChange={this.onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  id="dob"
                  className="form-control"
                  placeholder="Enter your DOB"
                  onChange={this.onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <span className="danger">{error}</span>
              </div>
              <button
                id="loginButton"
                className="btn btn-primary btn-block"
                type="submit"
              >
                LOGIN
              </button>
            </form>

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

export default LoginComponent;
