import axios from "axios";

/**
 * this method is used to make api calls from React component
 */
export function apiCall(url){
    return axios.get(url);
}