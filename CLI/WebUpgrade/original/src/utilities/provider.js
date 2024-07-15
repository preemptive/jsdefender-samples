class Provider {
  constructor() {
    this.BASE_URL = "https://swapi.dev/api/";
  }

  getUserProfile(user) {
    return fetch(this.BASE_URL + `people/?search=${user}`);
  }

  getPlanetData() {
    return fetch(this.BASE_URL + 'planets/?page=1');
  }
}

export default Provider;