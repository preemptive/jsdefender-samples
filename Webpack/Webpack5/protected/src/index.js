import PeLogo from "./pe-logo.svg";
import _ from "lodash";

import(/* webpackChunkName: "styles" */ "./styles.css")
  .then((_module) => console.log("Styles are loaded."))
  .catch((_error) =>
    console.log("An error occured while loading the print component")
  );

const container = createContainerComponent();
container.appendChild(createTitleComponent());
container.appendChild(createPeLogoComponent());
container.appendChild(createPrintComponent());
container.appendChild(createAlertComponent());
container.appendChild(createHelloComponent());
document.body.appendChild(container);

function createContainerComponent() {
  const element = document.createElement("div");
  element.classList.add("container");

  return element;
}

function createTitleComponent() {
  const element = document.createElement("h1");
  element.innerHTML = _.join(["Hello,", "Webpack!"], " ");

  return element;
}

function createPeLogoComponent() {
  const peLogo = new Image();
  peLogo.src = PeLogo;
  peLogo.width = 616;
  peLogo.height = 220;

  return peLogo;
}

function createPrintComponent() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = "Print component (simple dynamic import): ";

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = function (e) {
    import(/* webpackChunkName: "print" */ "./print")
      .then((module) => {
        const print = module.default;

        print();
      })
      .catch((_error) => "An error occured while loading the print component");

    console.log("Print button is clicked!");
  };

  element.appendChild(btn);

  return element;
}

function createAlertComponent() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = "Alert component (nested dynamic import): ";

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = function (e) {
    import(/* webpackChunkName: "alert" */ "./alert")
      .then((module) => {
        const alert = module.default;

        alert();
      })
      .catch((_error) => "An error occured while loading the alert component");

    const temp = ()=>{
      console.log(true ? 'testing success': 'testing failed')
      console.log(true && 'success')
    }  
    temp();
    console.log("Alert button is clicked!");
  };

  element.appendChild(btn);

  return element;
}

function createHelloComponent() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = "Hello component (json import): ";

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = function (e) {
    import(/* webpackChunkName: "hello" */ "./hello.json")
      .then((module) => {
        console.log(
          "The hello.json module is loaded! See the network tab in dev tools..."
        );

        const hello = module.hello;
        alert(`Message from hello.json: ${hello}`);
      })
      .catch((_error) => "An error occured while loading the hello component");

    console.log("Hello button is clicked!");
  };

  element.appendChild(btn);

  return element;
}
