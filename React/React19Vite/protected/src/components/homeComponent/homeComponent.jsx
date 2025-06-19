import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlanetData } from '../../util/provider';

const HomeComponent = ({ user, removeUser }) => {
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user);
      (async () => {
        await fetchPlanetData();
      })();
    } else {
      handleSignout();
    }
  }, [user]);

  const handleSignout = () => {
    removeUser?.();
    navigate('/');
  };

  const fetchPlanetData = async () => {
    setLoader(true);
    try {
      const resp = await getPlanetData();

      const data = resp?.data?.results ?? [];

      setResult(data);
    } catch {
      alert('Something went wrong!!');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="yellow">
            <h1>Welcome! {username}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary float-right margin-top10"
            id="signoutBtn"
            onClick={handleSignout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {result.map((item, i) => (
            <div className="response" key={item?.name ?? i}>
              <p>Planet Name: {item?.name}</p>
              <p>
                Rotation period: {item?.rotation_period}, Orbital period: {item?.orbital_period}, Diameter: {item?.diameter}
              </p>
              <p>
                Climate: {item?.climate}, Gravity: {item?.gravity}, Terrain: {item?.terrain}
              </p>
              <p>
                Surface water: {item?.surface_water}, Population: {item?.population}
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
};

export default HomeComponent;
