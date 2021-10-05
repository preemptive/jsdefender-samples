import Provider from "./utilities/provider.js";

class HomePage {
  constructor(username) {
    this._username = username;
    this._pageHtml = window.homePageHtml;
    this._loadingContainer = document.querySelector("#loadingContainer");
    this._provider = new Provider();
  }

  /**
   * On loadPage check if the user exist in store
   * then, fetch planets data
   * otherwise, logout
   */
  loadPage() {
    document.querySelector("#root").innerHTML = this._pageHtml;
    document.querySelector("#signoutBtn").addEventListener("click", this.signout.bind(this));
    if (this._username) {
      document.querySelector("#welcome").textContent = `Welcome! ${this._username}`;
      this.getResult();
    } else {
      this.signout();
    }
  }

  /**
   * this method is used to logout the user and redirect it to login page
   */
  signout() {
    this._username = '';
    window.location.reload();
  }

  /**
   * this method is used to get planets information and set to state
   */
  getResult() {
    this._loadingContainer.style.display = "inherit";

    this._provider.getPlanetData()
      .then((resp) => this.apiSuccessCallback(resp))
      .catch(() => this.apiFailureCallback());
  }

  /**
   * this method is success callback of planets api
   */
  apiSuccessCallback(resp) {
    resp.json().then((response) => {
      const planetsElement = document.querySelector("#planets");
      response.results.map((item, i) => {
        planetsElement.insertAdjacentHTML("beforeend", `
          <div class="response" key=${i}>
            <p>Planet Name: ${item.name}</p>
            <p>Rotation period: ${item.rotation_period}, Orbital period: ${item.orbital_period}, Diameter: ${item.diameter}</p>
            <p>Climate: ${item.climate}, Gravity: ${item.gravity}, Terrain: ${item.terrain}</p>
            <p>Surface water: ${item.surface_water}, Population: ${item.population}</p>
          </div>
        `);
      });
      this._loadingContainer.style.display = "none";
    }).catch(() => this.apiFailureCallback());
  }

  /**
   * this method is failure callback of planets api
   */
  apiFailureCallback() {
    this._loadingContainer.style.display = "none";
    alert("Something went wrong!!");
  }
}

export default HomePage;