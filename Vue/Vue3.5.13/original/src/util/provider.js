import axios from "axios";

const BASE_URL = "https://swapi.py4e.com/api/";

const apiCall = (url) => axios.get(`${BASE_URL}${url ?? ''}`);

export const getUserProfile = (user) => {
  const searchQuery = user?.trim() ?? '';
  return apiCall(`people/?search=${searchQuery}`);
};

export const getPlanetData = () => {
  return apiCall(`planets/?page=${1}`);
};