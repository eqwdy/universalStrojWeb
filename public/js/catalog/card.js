class ProductCard {
  constructor(options) {
    this.data = {
      imgSrc: options.imgSrc,
      title: options.title,
      price: options.price,
      types: options.types || [],
      sizes: options.sizes || [],
      colors: options.colors || [],
      description: options.description || "",
    };
    this.elements = {};
    this.state = {
      quantity: 1,
      activeRadio: null,
    };
  }

  render(container) {
    const card = this.createCard();
    container.appendChild(card);
    return card;
  }

  createCard() {
    const card = document.createElement("article");
    card.classList.add("card");
    this.elements.card = card;

    const body = this.createBody();
    if (this.data.types.length) {
      body.appendChild(
        this.createRadioGroup({
          title: "Тип",
          id: "typeGroup",
          options: this.data.types,
          type: "default",
        })
      );
    }

    if (this.data.sizes.length) {
      body.appendChild(
        this.createRadioGroup({
          title: "Размер",
          id: "sizeGroup",
          options: this.data.sizes,
          type: "default",
        })
      );
    }

    if (this.data.colors.length) {
      body.appendChild(
        this.createRadioGroup({
          title: "Цвет",
          id: "colorGroup",
          options: this.data.colors,
          type: "color",
        })
      );
    }

    if (this.data.description) {
      const desc = this.createDescription();
      if (desc) body.appendChild(desc);
    }

    card.appendChild(this.createImg());
    card.appendChild(body);
    card.appendChild(this.createBuySection());

    return card;
  }

  createImg() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card__img");

    const img = document.createElement("img");
    img.src = this.data.imgSrc;
    img.alt = this.data.title || "Изображение товара";

    wrapper.appendChild(img);
    return wrapper;
  }

  createBody() {
    const body = document.createElement("div");
    body.classList.add("card__body");

    const title = document.createElement("h1");
    title.classList.add("card__title");
    title.textContent = this.data.title;

    const price = document.createElement("div");
    price.classList.add("card__price");
    price.setAttribute("data-value", this.data.price);
    price.textContent = `${this.data.price} ₽`;
    price.id = "cardPrice";

    body.appendChild(title);
    body.appendChild(price);
    this.elements.price = price;

    return body;
  }

  createBuySection() {
    const section = document.createElement("div");
    section.classList.add("card__buy");

    const title = document.createElement("h2");
    title.classList.add("count__title");
    title.textContent = "Количество:";

    const countWrapper = document.createElement("div");
    countWrapper.classList.add("card__buy-count", "count");

    const decreaseBtn = this.createButton({
      classes: ["count__button", "count__button-minus"],
      label: "Уменьшить количество",
      action: () => this.changeQuantity(false),
    });

    const increaseBtn = this.createButton({
      classes: ["count__button", "count__button-plus"],
      label: "Увеличить количество",
      action: () => this.changeQuantity(true),
    });

    const input = document.createElement("input");
    input.type = "number";
    input.name = "quantity";
    input.autocomplete = "off";
    input.min = "1";
    input.maxLength = "5";
    input.classList.add("count__input");
    input.id = "countInput";
    input.value = this.state.quantity;
    input.setAttribute("aria-label", "Количество");
    input.addEventListener("change", () => this.validateQuantity());

    this.elements.quantityInput = input;

    countWrapper.appendChild(decreaseBtn);
    countWrapper.appendChild(input);
    countWrapper.appendChild(increaseBtn);

    const buyBtn = this.createButton({
      classes: ["card__buy-button", "button"],
      text: "Добавить в корзину",
      id: "cardToBasket",
      action: () => {
        if (this.validateRadio()) {
          this.handleAddToCart();
        } else {
          showCustomPopup("Выберите значения!");
        }
      },
    });

    section.appendChild(title);
    section.appendChild(countWrapper);
    section.appendChild(buyBtn);

    return section;
  }

  createRadioGroup({ title, id, options, type }) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card__radio");

    const heading = document.createElement("h2");
    heading.classList.add("card__radio-title");
    heading.id = id;
    heading.textContent = title;

    const group = document.createElement("div");
    group.classList.add(`card__radio-group${type === "color" ? "-color" : ""}`);
    group.role = "radiogroup";
    group.setAttribute("aria-labelledby", id);

    options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.value = option.value;
      btn.role = "radio";
      btn.tabIndex = 0;
      btn.setAttribute("aria-checked", "false");
      if (type !== "color") {
        btn.classList.add("card__radio-button");
        btn.textContent = option.text || option.value;
        btn.addEventListener("click", () => this.selectRadioOption(btn, group));
      } else {
        btn.classList.add(`card__radio-button-color`);
        btn.setAttribute("aria-label", `${option.text}`);
        const colorDot = document.createElement("div");
        colorDot.classList.add(`card__radio-${option.value}`);
        btn.appendChild(colorDot);
        btn.addEventListener("click", () =>
          this.selectRadioOption(btn, group, ".card__radio-button-color")
        );
      }

      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });

      group.appendChild(btn);
      if (index === 0) this.state.activeRadio = btn;
    });

    wrapper.appendChild(heading);
    wrapper.appendChild(group);
    return wrapper;
  }

  createDescription() {
    if (!this.data.description) return null;

    const wrapper = document.createElement("div");
    wrapper.classList.add("card__description-wrapper");

    const button = this.createButton({
      classes: ["card__description-button"],
      attributes: [
        { name: "aria-controls", value: "cardDescription" },
        { name: "aria-expanded", value: "false" },
      ],
      tabIndex: 0,
      text: "Описание",
    });

    const content = document.createElement("p");
    content.classList.add("card__description");
    content.id = "cardDescription";
    content.setAttribute("aria-live", "polite");
    content.setAttribute("aria-hidden", "true");
    content.textContent = this.data.description;

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        button.setAttribute("aria-expanded", "false");
        content.setAttribute("aria-hidden", "true");
        content.style.height = "";
      } else {
        button.setAttribute("aria-expanded", "true");
        content.setAttribute("aria-hidden", "false");
        content.style.height = content.scrollHeight + 5 + "px";
      }
    });

    wrapper.appendChild(button);
    wrapper.appendChild(content);
    this.elements.description = { button, content };

    return wrapper;
  }

  createButton({
    classes = [],
    text,
    id,
    action,
    type = "button",
    label,
    attributes,
    tabIndex,
    role,
    value,
  }) {
    const btn = document.createElement("button");
    if (classes.length > 0) {
      btn.classList.add(...classes);
    }
    if (text) {
      btn.textContent = text;
    }
    if (id) {
      btn.id = id;
    }
    btn.type = type;
    if (label) {
      btn.setAttribute("aria-label", label);
    }
    if (action) {
      btn.addEventListener("click", action);
    }
    if (Array.isArray(attributes)) {
      for (const attribute of attributes) {
        if (attribute && attribute.name && attribute.value) {
          btn.setAttribute(attribute.name, attribute.value);
        }
      }
    }
    if (tabIndex !== undefined) {
      btn.tabIndex = tabIndex;
    }
    if (role) {
      btn.setAttribute("role", role);
    }
    if (value) {
      btn.value = value;
    }

    return btn;
  }

  selectRadioOption(selectedBtn, group, btnSelector = ".card__radio-button") {
    const buttons = group.querySelectorAll(btnSelector);
    buttons.forEach((btn) => {
      btn.setAttribute("aria-checked", "false");
    });

    selectedBtn.setAttribute("aria-checked", "true");
    this.state.activeRadio = selectedBtn;
  }

  changeQuantity(increase) {
    let newQuantity = this.state.quantity;

    if (increase) {
      newQuantity++;
    } else {
      newQuantity = Math.max(1, newQuantity - 1);
    }

    this.state.quantity = newQuantity;
    this.elements.quantityInput.value = newQuantity;
  }

  validateQuantity() {
    const input = this.elements.quantityInput;
    let value = parseInt(input.value, 10);

    if (isNaN(value) || value < 1) {
      value = 1;
    }

    value = Math.min(999, value);

    input.value = value;
    this.state.quantity = value;
  }

  validateRadio() {
    let result = false;
    const radioGroups = document.querySelectorAll(".card__radio-group");
    let radioGroupCount = 0;

    radioGroups.forEach((group) => {
      const radioBtns = group.querySelectorAll(".card__radio-button");
      radioBtns.forEach((btn) => {
        if (btn.getAttribute("aria-checked") === "true") {
          radioGroupCount += 1;
          return;
        }
      });
    });

    if (radioGroupCount === radioGroups.length) {
      result = true;
    }
    return result;
  }

  handleAddToCart() {
    const quantity = this.state.quantity;
    const price = parseInt(this.elements.price.getAttribute("data-value"), 10);
    const totalPrice = price * quantity;

    const rowData = {
      product: this.data.title,
      price: `${totalPrice}\u00A0₽`,
      quantity: `${quantity}\u00A0м²`,
    };

    if (!window.tableManager) {
      window.tableManager = new TableManager(["product", "price", "quantity"], {
        product: "Название товара",
        price: "Цена",
        quantity: "Количество",
      });

      const basketInner = document.getElementById("basketInner");
      if (basketInner) {
        window.tableManager.render(basketInner);
      }
    }

    window.tableManager.addRow(rowData);
    showCustomPopup("Добавлено в корзину!");
  }
}

function createPlitkaCard() {
  const productData = {
    imgSrc: "/images/catalog/plitka.jpg",
    title: "Тротуарная плитка",
    price: 580,
    types: [
      { value: "old-town", text: "Старый город" },
      { value: "coil", text: "Катушка" },
      { value: "sota", text: "Сота" },
    ],
    sizes: [
      { value: "25mm", text: "25мм" },
      { value: "40mm", text: "40мм" },
      { value: "60mm", text: "60мм" },
    ],
    colors: [
      { value: "black", text: "Чёрный" },
      { value: "gray", text: "Серый" },
      { value: "white", text: "Белый" },
      { value: "brown", text: "Коричневый" },
      { value: "red", text: "Красный" },
      { value: "yellow", text: "Жёлтый" },
      { value: "orange", text: "Оранжевый" },
      { value: "olive", text: "Оливковый" },
    ],
    description:
      "Производим тротуарную плитку: кирпич, старый город, катушка, сота. Толщина 25 мм, 40 мм, 60 мм. Цвета: серый, коричневый, красный, чёрный, оливковый, белый, жёлтый, оранжевый.",
  };
  return productData;
}
function createSpheresCard() {
  const productData = {
    imgSrc: "/images/catalog/polySpheres.jpg",
    title: "Бетонные полусферы",
    price: 850,
    sizes: [{ value: "480x250", text: "480x250" }],
    description:
      "Производим бетонные полусферы диаметром 480 мм, высотой 250 мм, вес 65 кг.",
  };
  return productData;
}
function createPorebrikCard() {
  const productData = {
    imgSrc: "/images/catalog/porebrik.jpg",
    title: "Поребрик",
    price: 120,
    sizes: [{ value: "470х60х200", text: "470х60х200" }],
    colors: [
      { value: "gray", text: "Серый" },
      { value: "brown", text: "Коричневый" },
      { value: "red", text: "Красный" },
    ],
    description:
      "Производим поребрики 470х60х200 мм, серого, красного и коричневого цветов.",
  };
  return productData;
}
function createBorduresCard() {
  const productData = {
    imgSrc: "/images/catalog/bordures.jpg",
    title: "Дорожные бордюры",
    price: 500,
    description: "Производим и устанавливаем дорожные бордюры.",
  };

  return productData;
}
function createFbsCard() {
  const productData = {
    imgSrc: "/images/catalog/blocks.jpg",
    title: "Блоки ФБС",
    price: 2800,
    sizes: [{ value: "individual", text: "Индивидуальный" }],
    description:
      "Производим блоки ФБС 24.3.6, 24.4.6, половинки, а также можем изготовить блоки под индивидуальный размер",
  };
  return productData;
}
function createRoundesCard() {
  const productData = {
    imgSrc: "/images/index/catalog/roundes.jpeg",
    title: "Бетонные кольца и крышки",
    price: 3350,
    sizes: [
      { value: "1m", text: "Диаметр 1м" },
      { value: "1.5m", text: "Диаметр 1.5м" },
    ],
    description:
      "Производим бетонные кольца диаметром 1 и 1,5 метра, высотой 0,3, 0,6, 0,9 и 1 метр. Так же делаем крышки и днища к ним",
  };
  return productData;
}

let productData = createRoundesCard();
const productCard = new ProductCard(productData);
const container = document.getElementById("cardContainer");
if (container) {
  productCard.render(container);
}
