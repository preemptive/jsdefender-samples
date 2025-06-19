import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../util/provider';

const LoginComponent = ({ addUser }) => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      const resp = await getUserProfile(username);
      handleApiSuccess(resp);
    } catch (err) {
      handleApiFailure(err);
    }
  };

  const handleApiSuccess = (resp) => {
    const results = resp.data.results;
    let errorMsg = 'Username does not exist';

    for (const user of results) {
      if (user.name === username) {
        if (user.birth_year === dob) {
          errorMsg = '';
          addUser(username);
          navigate('/home');
          return;
        } else {
          errorMsg = 'DOB does not match';
        }
        break;
      }
    }

    setError(errorMsg);
    setLoader(false);
  };

  const handleApiFailure = () => {
    setError('Error');
    setLoader(false);
  };

  return (
    <div className="container">
      <div className="row center yellow">
        <h1 className="jumbo">SWAPI</h1>
        <p className="lead">The Star Wars API</p>
      </div>
      <div className="row">
        <div className="offset-md-4 col-md-4 col-xs-12 form-box">
          <form onSubmit={login}>
            <div className="form-group">
              <label>Username</label>
              <input
                id="username"
                className="form-control"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                id="dob"
                className="form-control"
                placeholder="Enter your DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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
};

export default LoginComponent;
