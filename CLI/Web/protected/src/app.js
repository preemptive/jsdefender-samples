import LoginPage from "./loginPage.js";

const app = async () => {
  window.loginPage = new LoginPage();
  const response = await fetch("./home.html");
  window.homePageHtml = await response.text();
};

document.addEventListener("DOMContentLoaded", app);