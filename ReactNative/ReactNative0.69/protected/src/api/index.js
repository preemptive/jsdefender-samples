import axios from 'axios';

const BASE_URL = "https://swapi.dev/api/";

const apiCall = (url) => axios.get(`${BASE_URL}/${url}`);

export const getUserProfile = (user) => apiCall(`people/?search=${user}`);

export const getPlanetData = () => apiCall('planets/?page=1');