import PeLogo from "./pe-logo.svg";
import _join from "../node_modules/lodash-es/join";

await import("./styles.css")
  .then(() => console.log("Styles are loaded."))
  .catch(() =>
    console.log("An error occurred while loading the styles component")
  );

const container = createContainerComponent();
container.append(
  createTitleComponent(),
  createPeLogoComponent(),
  createPrintComponent(),
  createAlertComponent(),
  createHelloComponent()
);
document.body.appendChild(container);

function createContainerComponent() {
  return document.createElement("div");
}

function createTitleComponent() {
  const element = document.createElement("h1");
  element.textContent = _join(["Home", "Page"], " ");
  return element;
}

function createPeLogoComponent() {
  const img = new Image();
  img.src = PeLogo;
  img.width = 616;
  img.height = 220;
  return img;
}

function createPrintComponent() {
  const container = document.createElement("div");
  const button = document.createElement("button");

  container.textContent = "Print component (simple dynamic import): ";
  button.textContent = "Click me and check the console!";

  button.onclick = async () => {
    console.log("Print button is clicked!");
    try {
      const { default: print } = await import("./print.js");
      print?.();
    } catch (err) {
      console.error("An error occurred while loading the print component");
    }
  };

  container.appendChild(button);
  return container;
}

function createAlertComponent() {
  const container = document.createElement("div");
  const button = document.createElement("button");

  container.textContent = "Alert component (nested dynamic import): ";
  button.textContent = "Click me and check the console!";

  button.onclick = async () => {
    console.log("Alert button is clicked!");
    try {
      const { default: showAlert } = await import("./alert.js");
      showAlert?.();
    } catch (err) {
      console.error("An error occurred while loading the alert component");
    }
  };

  container.appendChild(button);
  return container;
}

function createHelloComponent() {
  const container = document.createElement("div");
  const button = document.createElement("button");

  container.textContent = "Hello component (JSON import): ";
  button.textContent = "Click me and check the console!";

  button.onclick = async () => {
    console.log("Hello button is clicked!");
    try {
      const data = await import("./hello.json", {
        assert: { type: "json" },
      });
      const hello = data?.hello;
      alert(`Message from hello.json: ${hello}`);
      console.log("The hello.json module is loaded!", data);
    } catch (err) {
      console.error("An error occurred while loading the hello component");
    }
  };

  container.appendChild(button);
  return container;
}
