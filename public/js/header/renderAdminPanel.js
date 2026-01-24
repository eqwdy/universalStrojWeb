import { authAdmin } from "../backendRequsts/adminsCRUD.js";
import { getJWTToken, setJWTToken } from "../addition/jwtTokenControl.js";

async function renderHeaderPanelLink() {
  const token = getJWTToken();
  if (!token) {
    return;
  }

  const newToken = await authAdmin(token);
  if (newToken instanceof Error) {
    return;
  }

  const registerItem = document.getElementById("headerRegisterLink");
  registerItem.insertAdjacentElement("afterend", createHeaderPanelLink());

  setJWTToken(newToken);
}

function createHeaderPanelLink() {
  const li = document.createElement("li");
  li.classList.add("header__nav-item");

  const a = document.createElement("a");
  a.href = "/admin-panel";

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("header__basket-button");
  button.setAttribute("role", "button");
  button.setAttribute("aria-label", "Открыть админ-панель");

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("header__nav-panel");

  const img = document.createElement("img");
  img.src = "/images/header/pencil.svg";
  img.alt = "Админ-панель";

  imgWrapper.appendChild(img);
  button.appendChild(imgWrapper);
  a.appendChild(button);
  li.appendChild(a);

  return li;
}
renderHeaderPanelLink();
