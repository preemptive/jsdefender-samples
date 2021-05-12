import axios from "axios";

const BASE_URL = "https://swapi.dev/api/";

function apiCall(url: string) {
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