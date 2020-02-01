export const func = () => console.log("hhhhh");

function component() {
  const element = document.createElement("div");
  element.id = "app";
  return element;
}

document.body.appendChild(component());
