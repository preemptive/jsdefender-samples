import axios from "axios";

const BASE_URL = "https://swapi.dev/api/";

function apiCall(url) {
    return axios.get(BASE_URL + url);
}

export function getUserProfile(user) {
    return apiCall(`people/?search=${user}`);
}

export function getPlanetData() {
    return apiCall('planets/?page=1');
}