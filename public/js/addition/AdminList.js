import { getAdmins, deleteAdmin } from "../backendRequsts/adminsCRUD.js";
import { getJWTToken, setJWTToken } from "./jwtTokenControl.js";

export default class AdminsList {
  constructor(container) {
    this.container = container;
  }

  async render() {
    const fragment = document.createDocumentFragment();

    const title = document.createElement("h2");
    title.classList.add("admins__title");
    title.textContent = "Список администраторов";

    const list = document.createElement("ul");
    list.classList.add("admins__list");
    list.id = "adminsList";

    const admins = await this.getAdmins();
    admins.forEach((admin) => {
      const item = this.createAdminItem(admin);
      list.appendChild(item);
    });

    const addButton = document.createElement("button");
    addButton.classList.add("button", "admins__button-add");
    addButton.setAttribute("aria-controls", "overlay");
    addButton.setAttribute("aria-expanded", "false");
    addButton.textContent = "Добавить админа";

    fragment.appendChild(title);
    fragment.appendChild(list);
    fragment.appendChild(addButton);

    this.container.appendChild(fragment);
  }

  createAdminItem({ name, tel, id }) {
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
      await this.deleteAdmin(id);
      li.remove();
    });

    li.appendChild(info);
    li.appendChild(button);

    return li;
  }

  async getAdmins() {
    const admins = await getAdmins(getJWTToken());
    return admins;
  }

  async deleteAdmin(id) {
    const result = await deleteAdmin(id, getJWTToken());
    return result;
  }

  async appendAdmin(formData) {}

  confirm(func) {}
}
