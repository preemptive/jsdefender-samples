import axios from "axios";

let BASE_URL;
BASE_URL ??= "https://swapi.py4e.com/api/"; 

function apiCall(url) {
    return axios.get(BASE_URL + url);
}

export function getPlanetData() {
    return apiCall('planets/?page=1');
}

export function getPeopleData() {
    return apiCall('people/?page=1');
}

export function getFilmData() {
    return apiCall('films/?page=1');
}