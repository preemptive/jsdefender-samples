import axios from "axios";

export function apiCall(url: string) {
    return axios.get(url);
}