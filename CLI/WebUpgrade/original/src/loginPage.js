import Provider from "./utilities/provider.js";
import HomePage from "./homePage.js";

class LoginPage {
  constructor() {
    this.state = {
      username: '',
      dob: '',
      error: '',
    };
    this._loadingContainer = document.querySelector("#loadingContainer");
    this._provider = new Provider();

    document.querySelector("form").addEventListener("submit", this.login.bind(this));
    const inputs = document.querySelectorAll("input");
  
    inputs.forEach((element) => {
      element.addEventListener("keyup", this.onChangeHandler.bind(this));
    });
  }

  /**
  * this method is used to call SWAPI API on login click
  */
  login(event) {
    event.preventDefault();

    this._loadingContainer.style.display = "inherit";
    document.querySelector("form .danger").textContent = "";
    this._provider = new Provider();
    this._provider.getUserProfile(this.state.username)
      .then((resp) => this.apiSuccessCallback(resp))
      .catch((error) => this.apiFailureCallback(error));
  }

  /**
  * this method is used to save keydown changes to state
  */
  onChangeHandler(event) {
    this.state[event.target.id] = event.target.value;
  }

  /**
   * this method is a success callback function of login api call,
   * redirect to dashboard if successful
   * otherwise show error
   */
  apiSuccessCallback(resp) {
    resp.json().then((response) => {
      let len = response.results.length;
      let errorMsg = "Username does not exist";
      const username = this.state.username;
  
      for (let i = 0; i < len; i++) {
        if (response.results[i].name === username) {
          if (response.results[i].birth_year === this.state.dob) {
            errorMsg = "";
            this.loadHomePage(username);
            this._loadingContainer.style.display = "none";
            return;
          } else {
            errorMsg = "DOB does not match";
          }
          break;
        }
      }
  
      this._loadingContainer.style.display = "none";
      document.querySelector("form .danger").textContent = errorMsg;
    }).catch((error) => this.apiFailureCallback(error));
  }

  /**
   * this method is a failure callback function of login api call
   */
  apiFailureCallback(error) {
    this._loadingContainer.style.display = "none";
    document.querySelector("form .danger").textContent = error;
  }

  /**
   * this method is used to load the home page upon successful login
   */
  loadHomePage(username) {
    this._homePage = new HomePage(username);
    this._homePage.loadPage();
  }
}

export default LoginPage;