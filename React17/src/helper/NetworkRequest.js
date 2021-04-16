import axios from "axios";

export function apiCall(url){
    return axios.get(url);
}