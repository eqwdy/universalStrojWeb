import { getAdmins, deleteAdmin } from "../backendRequsts/adminsCRUD.js";
import { getJWTToken, setJWTToken } from "./jwtTokenControl.js";

export default class AdminsList {
  constructor(container) {
    this.container = container;
  }

  async render() {
    const admins = await this.getAdmins();
    const article = this.createLayout(admins);
    this.container.appendChild(article);
  }

  async createAdminItem({ name, tel, id }) {
    const li = document.createElement("li");
    li.classList.add("admins__item", "admin");
    li.setAttribute("data-id", id);

    const info = document.createElement("div");
    info.classList.add("admin__info");

    const nameEl = document.createElement("span");
    nameEl.classList.add("admin__name");
    nameEl.textContent = name;

    const telEl = document.createElement("span");
    telEl.classList.add("admin__tel");
    telEl.textContent = tel;

    info.appendChild(nameEl);
    info.appendChild(telEl);

    const button = document.createElement("button");
    button.classList.add("admin__button-delete");
    button.type = "button";
    button.role = "button";
    button.setAttribute("aria-label", "Удалить админа");
    button.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
    </svg>`;
    button.addEventListener("click", async () => {
      const deleteResult = await this.deleteAdmin(id);
      if (deleteResult) li.remove();
    });

    li.appendChild(info);
    li.appendChild(button);

    return li;
  }

  createLayout(admins) {
    const article = document.createElement("article");
    article.classList.add("hero__admins", "admins");

    const title = document.createElement("h2");
    title.classList.add("admins__title");
    title.textContent = "Список администраторов";

    const list = document.createElement("ul");
    list.classList.add("admins__list");
    list.id = "adminsList";

    admins.forEach(async (admin) => {
      const item = await this.createAdminItem(admin);
      if (!item) return;
      list.appendChild(item);
    });

    const addButton = document.createElement("button");
    addButton.classList.add("button", "admins__button-add");
    addButton.setAttribute("aria-controls", "overlay");
    addButton.setAttribute("aria-expanded", "false");
    addButton.textContent = "Добавить админа";

    article.appendChild(title);
    article.appendChild(list);
    article.appendChild(addButton);

    return article;
  }

  async getAdmins() {
    try {
      const admins = await getAdmins(getJWTToken());
      return admins;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async deleteAdmin(id) {
    try {
      const isAgree = await this.confirm();
      if (!isAgree) return;

      const result = await deleteAdmin(id, getJWTToken());
      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  confirm() {
    return new Promise((resolve) => {
      const dialog = document.getElementById("confirmDialog");
      dialog.classList.remove("hidden");

      const yesBtn = document.getElementById("confirmYes");
      const noBtn = document.getElementById("confirmNo");

      yesBtn.onclick = () => {
        dialog.classList.add("hidden");
        resolve(true);
      };

      noBtn.onclick = () => {
        dialog.classList.add("hidden");
        resolve(false);
      };
    });
  }
}
