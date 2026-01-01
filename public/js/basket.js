const basketInner = document.getElementById("basketInner");
const basketClose = document.getElementById("basketClose");
function openBasket() {
  basketInner.setAttribute("aria-hidden", "false");
  basketClose.setAttribute("aria-hidden", "false");
  basketClose.disabled = false;
}
function closeBasket() {
  basketInner.setAttribute("aria-hidden", "true");
  basketClose.setAttribute("aria-hidden", "true");
  basketClose.disabled = true;
}

const openBtns = document.querySelectorAll('[aria-controls="basketInner"]');
if (openBtns.length > 0) {
  openBtns.forEach((btn) => {
    btn.addEventListener("click", openBasket);
  });
} else {
  console.warn("Кнопки открытия корзины не найдены");
}

basketClose.addEventListener("click", closeBasket);

class TableManager {
  constructor(columns, headerLabels) {
    this.columns = columns;
    this.headerLabels = headerLabels;
    this.element = null;
  }

  escapeHtml(text) {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  createTable() {
    const table = document.createElement("table");
    table.className = "table";
    return table;
  }

  createHeader() {
    const thead = document.createElement("thead");
    thead.className = "table__header";

    const headerRow = document.createElement("tr");
    headerRow.className = "table__items";

    this.columns.forEach((col) => {
      const th = document.createElement("th");
      th.className = "table__title";
      th.scope = "col";
      th.textContent = this.headerLabels[col] || col;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    return thead;
  }

  createBody() {
    const tbody = document.createElement("tbody");
    tbody.className = "table__body";
    return tbody;
  }

  render(container) {
    this.element = this.createTable();
    this.element.appendChild(this.createHeader());
    this.element.appendChild(this.createBody());

    container.appendChild(this.element);
    return this.element;
  }

  createRow(data) {
    const row = document.createElement("tr");
    row.className = "table__items";

    this.columns.forEach((col) => {
      const cell = document.createElement("td");
      cell.className = "table__item";
      cell.innerHTML = this.escapeHtml(data[col] || "");
      row.appendChild(cell);
    });

    const deleteCell = document.createElement("td");
    deleteCell.className = "table__item table__item--actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "table__item-delete";
    deleteBtn.type = "button";
    deleteBtn.setAttribute("aria-label", "Удалить товар");

    deleteBtn.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>`;

    deleteBtn.addEventListener("click", () => this.removeRow(row));
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    return row;
  }

  addRow(data) {
    if (!this.element) {
      console.error("Таблица не инициализирована");
      return false;
    }

    const tbody = this.element.tBodies[0];
    const row = this.createRow(data);
    tbody.appendChild(row);

    this.updateNotify();
    return true;
  }

  removeRow(rowElement) {
    const tbody = this.element.tBodies[0];
    if (tbody && rowElement.parentNode === tbody) {
      tbody.removeChild(rowElement);
      this.updateNotify();
    }
  }

  clearRows() {
    const tbody = this.element?.tBodies[0];
    if (tbody) {
      tbody.innerHTML = "";
      this.updateNotify();
    }
  }

  updateNotify() {
    const count = this.element?.tBodies[0]?.rows.length || 0;

    if (count > 0) {
      this.showNotify(count);
    } else {
      this.removeNotify();
    }
  }

  showNotify(count) {
    const btns = document.querySelectorAll('[aria-controls="basketInner"]');

    btns.forEach((btn) => {
      const existingNotify = btn.querySelector(".basket__button-notify");

      if (existingNotify) {
        existingNotify.textContent = count;
      } else {
        const notify = document.createElement("span");
        notify.className = "basket__button-notify";
        notify.textContent = count;
        btn.appendChild(notify);
      }
    });
  }

  removeNotify() {
    const notifies = document.querySelectorAll(".basket__button-notify");
    notifies.forEach((notify) => notify.remove());
  }
}
