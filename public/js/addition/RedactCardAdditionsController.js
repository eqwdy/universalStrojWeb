class RedactCardAdditionsController {
  setValueHandler({
    title,
    price,
    description,
    types = null,
    sizes = null,
    colors = null,
  }) {
    const redactTitle = document.getElementById("redactTitle");
    const redactPrice = document.getElementById("redactPrice");
    const redactDescription = document.getElementById("redactDescription");
    const redactDescriptionLi = redactDescription.closest("li");

    redactTitle.value = title;
    redactPrice.value = price;
    redactDescription.value = description;

    const redactFormList = redactTitle.closest(".redact-form__items");
    if (types) {
      const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
        "Типы товара",
        "redactTypesList",
      );

      types.forEach((type) => {
        const { additionItem } = this.createAddition(type.text, type.value);
        additionList.insertBefore(additionItem, addItemLi);
      });

      redactFormList.insertBefore(sectionItem, redactDescriptionLi);
      sectionItem.querySelectorAll(".addition__content").forEach((input) => {
        this.resize(input);
      });
    }
    if (sizes) {
      const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
        "Размеры товара",
        "redactSizesList",
      );

      sizes.forEach((size) => {
        const { additionItem } = this.createAddition(size.text, size.value);
        additionList.insertBefore(additionItem, addItemLi);
      });

      redactFormList.insertBefore(sectionItem, redactDescriptionLi);
      sectionItem.querySelectorAll(".addition__content").forEach((input) => {
        this.resize(input);
      });
    }
    if (colors) {
      const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
        "Цвета товара",
        "redactColorsList",
      );

      colors.forEach((color) => {
        const { additionItem } = this.createAdditionColor(
          color.text,
          color.value,
        );
        additionList.insertBefore(additionItem, addItemLi);
      });

      redactFormList.insertBefore(sectionItem, redactDescriptionLi);
      sectionItem.querySelectorAll(".addition__content").forEach((input) => {
        this.resize(input);
      });
    }
  }

  createAdditionEnv(title, listId) {
    const sectionItem = document.createElement("li");
    sectionItem.classList.add("redact-form__item");

    const sectionTitle = document.createElement("h3");
    sectionTitle.classList.add("redact-form__label");
    sectionTitle.textContent = title;

    const additionList = document.createElement("ul");
    additionList.classList.add("redact-form__additions");
    additionList.id = listId;

    const addItemLi = document.createElement("li");
    addItemLi.classList.add(
      "redact-form__addition",
      "redact-form__addition-add",
    );

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.classList.add("addition__add");

    addItemLi.appendChild(addBtn);
    additionList.appendChild(addItemLi);

    sectionItem.appendChild(sectionTitle);
    sectionItem.appendChild(additionList);

    return { sectionItem, sectionTitle, additionList, addItemLi, addBtn };
  }

  createAddition(text = null, value = null) {
    const { additionItem, additionWrapper, additionInput, deleteButton } =
      this.createLayoutAddition(text, value);

    document.dispatchEvent(
      new CustomEvent("redactAdditionAdd", {
        detail: { additionInput },
      }),
    );

    return { additionItem, additionWrapper, additionInput, deleteButton };
  }

  createAdditionColor(text = null, value = null) {
    const { additionItem, additionWrapper, additionInput, deleteButton } =
      this.createLayoutAddition(text, value);

    additionInput.classList.add("addition__content-palette");

    const additionPaletteWrapper = document.createElement("div");
    additionPaletteWrapper.classList.add("addition__palette");

    const additionPalette = document.createElement("input");
    additionPalette.type = "color";
    additionPalette.value = value || "#000000";
    // additionPalette.dataset.colorValue = additionPalette.value;

    additionPaletteWrapper.appendChild(additionPalette);
    additionWrapper.appendChild(additionPaletteWrapper);

    return {
      additionItem,
      additionWrapper,
      additionPaletteWrapper,
      additionPalette,
      additionInput,
      deleteButton,
    };
  }

  createLayoutAddition(text = null, value = null) {
    const additionItem = document.createElement("li");
    additionItem.classList.add("redact-form__addition");

    const additionWrapper = document.createElement("div");
    additionWrapper.classList.add("addition");

    const additionInput = document.createElement("input");
    additionInput.classList.add("addition__content", "redact-form__input");
    additionInput.type = "text";
    additionInput.value = text || "";
    additionInput.name = value || text || "";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("addition__delete");
    deleteButton.type = "button";
    deleteButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke-width="0" />
      <g stroke-linecap="round" stroke-linejoin="round"/>
      <path
          d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
          stroke="#ee2020"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"/>
      </g>
    </svg>`;

    additionWrapper.appendChild(additionInput);
    additionWrapper.appendChild(deleteButton);

    additionItem.appendChild(additionWrapper);

    return { additionItem, additionWrapper, additionInput, deleteButton };
  }

  resize(input) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = getComputedStyle(input).font;
    const textWidth = ctx.measureText(input.value).width;
    const maxWidth = 300;
    const minWidth = 80;
    let paddingsWidth = 45;
    if (input.classList.contains("addition__content-palette")) {
      paddingsWidth = 75;
    }
    const bordersWidth = 2;
    input.style.width =
      Math.min(
        Math.max(Math.ceil(textWidth + paddingsWidth + bordersWidth), minWidth),
        maxWidth,
      ) + "px";
  }
}

export default new RedactCardAdditionsController();
