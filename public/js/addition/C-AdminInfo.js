import { getUser } from "../backendRequsts/usersCRUD.js";
import { getJWTToken } from "./jwtTokenControl.js";

export default class CAdminInfo {
  constructor(container) {
    this.container = container;
  }

  async render() {
    const user = await this.getCInfo();

    const article = this.createLayout(user);
    this.container.appendChild(article);
  }

  async getCInfo() {
    try {
      const user = await getUser(getJWTToken());
      if (user instanceof Error) {
        throw new Error(user);
      }

      return user;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  createLayout(user) {
    const article = document.createElement("article");
    article.classList.add("hero__c-user", "c-user");

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("c-user__img");

    const img = document.createElement("img");
    if (user.role === "ADMIN") {
      img.src = "/images/admin-panel/Admin.svg";
      img.alt = "Админ";
    } else if (user.role === "REDACTOR") {
      img.src = "/images/admin-panel/Redactor.svg";
      img.alt = "Редактор";
    }

    imgWrapper.appendChild(img);

    const info = document.createElement("div");
    info.classList.add("c-user__info");

    const nameEl = document.createElement("span");
    nameEl.textContent = user.name;

    const telEl = document.createElement("span");
    telEl.textContent = user.tel;

    const roleEl = document.createElement("span");
    roleEl.textContent = user.role;

    info.appendChild(nameEl);
    info.appendChild(telEl);
    info.appendChild(roleEl);

    article.appendChild(imgWrapper);
    article.appendChild(info);

    return article;
  }
}
