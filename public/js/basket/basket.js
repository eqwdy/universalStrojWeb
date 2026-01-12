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

    deleteBtn.addEventListener("click", () => this.removeRowAndData(row));
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
    return true;
  }

  removeRowAndData(rowElement) {
    const tbody = this.element.tBodies[0];

    if (tbody.rows.length === 1) {
      this.dropTableAndData();
    }

    if (tbody && rowElement.parentNode === tbody) {
      const index = rowElement.sectionRowIndex;
      tbody.removeChild(rowElement);

      let basket = JSON.parse(localStorage.getItem("basket")) || [];
      basket.splice(index, 1);
      localStorage.setItem("basket", JSON.stringify(basket));
    }

    refreshNotify();
  }

  clearRows() {
    const tbody = this.element?.tBodies[0];
    if (tbody) {
      tbody.innerHTML = "";
    }

    refreshNotify();
  }

  dropTableAndData() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }

    localStorage.setItem("basket", JSON.stringify([]));

    const basketContainer = document
      .getElementById("basket")
      .querySelector(".container");
    basketContainer.appendChild(fallback);

    document.querySelectorAll(".button-request")?.forEach((btn) => {
      btn.classList.add("visually-hidden");
    });
    refreshNotify();
  }
}

const tableWrapper = document.getElementById("tableWrapper");
const fallback = document.getElementById("fallback");
fallback.remove();

const basketStorage = JSON.parse(localStorage.getItem("basket"));

if (basketStorage && basketStorage.length) {
  const columns = ["title", "type", "size", "color", "price", "quantity"];
  const headers = {
    title: "Продукция",
    type: "Тип",
    size: "Размер",
    color: "Цвет",
    price: "Цена",
    quantity: "Количество",
  };

  const table = new TableManager(columns, headers);
  table.render(tableWrapper);

  basketStorage.forEach((product) => {
    table.addRow({
      title: product.title,
      type: product.type || "",
      size: product.size || "",
      color: product.color || "",
      price: `${product.price}\u00A0₽`,
      quantity: `${product.quantity}\u00A0м²`,
    });
  });

  fallback.remove();
  const basketButton = document.querySelector(".basket__button");
  basketButton.classList.remove("visually-hidden");
} else {
  document
    .getElementById("basket")
    .querySelector(".container")
    .appendChild(fallback);

  const basketButton = document.querySelector(".basket__button");
  basketButton.classList.add("visually-hidden");
}

function renderFallback(container) {
  const fallback = document.createElement("article");
  fallback.classList.add("fallback");
  fallback.id = "fallback";

  const wrapper = document.createElement("div");
}
