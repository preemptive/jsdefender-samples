import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import axios from "axios";

const BASE_URL = "https://swapi.py4e.com/api/";

function apiCall(url: string){
    return axios.get(BASE_URL + url);
}

export function getPlanetData() {
    return apiCall('planets/?page=1');
}
