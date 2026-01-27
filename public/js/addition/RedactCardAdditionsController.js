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
    // {
    //   const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
    //     "Типы товара",
    //     "redactTypesList",
    //   );

    //   if (types && types.length) {
    //     types.forEach((type) => {
    //       const { additionItem } = this.createAddition(type.text, type.value);
    //       additionList.insertBefore(additionItem, addItemLi);
    //     });
    //   } else {
    //     const { additionItem } = this.createAddition("", "");
    //     additionList.insertBefore(additionItem, addItemLi);
    //   }

    //   redactFormList.insertBefore(sectionItem, redactDescriptionLi);
    //   sectionItem.querySelectorAll(".addition__content").forEach((input) => {
    //     this.resize(input);
    //   });
    // }

    const typesOptions = {
      addition: types,
      additionTitle: "Типы товара",
      additionListId: "redactTypesList",
      container: redactFormList,
      description: redactDescriptionLi,
    };
    this.setValueAddition(typesOptions);

    const sizesOptions = {
      addition: sizes,
      additionTitle: "Размеры товара",
      additionListId: "redactSizesList",
      container: redactFormList,
      description: redactDescriptionLi,
    };
    this.setValueAddition(sizesOptions);

    const colorsOptions = {
      addition: colors,
      additionTitle: "Цвета товара",
      additionListId: "redactColorsList",
      container: redactFormList,
      description: redactDescriptionLi,
    };
    this.setValueAdditionColor(colorsOptions);
    // {
    //   const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
    //     "Цвета товара",
    //     "redactColorsList",
    //   );

    //   if (colors && colors.length) {
    //     colors.forEach((color) => {
    //       const { additionItem } = this.createAdditionColor(
    //         color.text,
    //         color.value,
    //       );
    //       additionList.insertBefore(additionItem, addItemLi);
    //     });
    //   } else {
    //     const { additionItem } = this.createAdditionColor();
    //     additionList.insertBefore(additionItem, addItemLi);
    //   }

    //   redactFormList.insertBefore(sectionItem, redactDescriptionLi);
    // }

    document.querySelectorAll(".addition__content").forEach((input) => {
      this.resize(input);
    });
  }

  setValueAddition({
    addition,
    additionTitle,
    additionListId,
    container,
    description,
  }) {
    const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
      additionTitle,
      additionListId,
    );

    if (addition && addition.length) {
      addition.forEach((el) => {
        const { additionItem } = this.createAddition(el.text, el.value);
        additionList.insertBefore(additionItem, addItemLi);
      });
    } else {
      const { additionItem } = this.createAddition();
      additionList.insertBefore(additionItem, addItemLi);
    }

    container.insertBefore(sectionItem, description);
    sectionItem.querySelectorAll(".addition__content").forEach((input) => {
      this.resize(input);
    });
  }

  setValueAdditionColor({
    addition,
    additionTitle,
    additionListId,
    container,
    description,
  }) {
    const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
      additionTitle,
      additionListId,
    );

    if (addition && addition.length) {
      addition.forEach((el) => {
        const { additionItem } = this.createAdditionColor(el.text, el.value);
        additionList.insertBefore(additionItem, addItemLi);
      });
    } else {
      const { additionItem } = this.createAdditionColor();
      additionList.insertBefore(additionItem, addItemLi);
    }

    container.insertBefore(sectionItem, description);
    sectionItem.querySelectorAll(".addition__content").forEach((input) => {
      this.resize(input);
    });
  }

  //   createSection(sectionTitle, additionListId) {
  //     const { sectionItem, additionList, addItemLi } = this.createAdditionEnv(
  //       sectionTitle,
  //       additionListId,
  //     );

  //     if (colors && colors.length) {
  //       colors.forEach((color) => {
  //         const { additionItem } = this.createAdditionColor(
  //           color.text,
  //           color.value,
  //         );
  //         additionList.insertBefore(additionItem, addItemLi);
  //       });
  //     } else {
  //       const { additionItem } = this.createAdditionColor("", "");
  //       additionList.insertBefore(additionItem, addItemLi);
  //     }

  //     redactFormList.insertBefore(sectionItem, redactDescriptionLi);
  //     sectionItem.querySelectorAll(".addition__content").forEach((input) => {
  //       this.resize(input);
  //     });
  //   }

  createAdditionEnv(title, listId) {
    const sectionItem = document.createElement("li");
    sectionItem.classList.add("redact-form__item");
    sectionItem.classList.add("redact-form__item-addition");

    const sectionTitleWrapper = document.createElement("div");
    sectionTitleWrapper.classList.add("redact-form__label-addition__wrapper");
    sectionTitleWrapper.innerHTML = `<svg fill="#fff" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M759.2 419.8L697.4 358 512 543.4 326.6 358l-61.8 61.8L512 667z"/>
    </svg>`;

    const sectionTitle = document.createElement("h3");
    sectionTitle.classList.add(
      "redact-form__label",
      "redact-form__label-addition",
    );
    sectionTitle.textContent = title;

    const additionList = document.createElement("ul");
    additionList.classList.add("redact-form__additions", "additionsHide");
    additionList.id = listId;
    additionList.style.height = 0;

    const addItemLi = document.createElement("li");
    addItemLi.classList.add(
      "redact-form__addition",
      "redact-form__addition-add",
    );

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.classList.add("addition__add");

    sectionTitleWrapper.addEventListener("click", () => {
      if (additionList.classList.contains("additionsHide")) {
        additionList.classList.remove("additionsHide");
        sectionTitleWrapper.classList.add("additions-visible");
        additionList.style.height = additionList.scrollHeight + "px";
        additionList.addEventListener(
          "transitionend",
          () => {
            additionList.style.height = "auto";
          },
          { once: true },
        );
      } else {
        additionList.classList.add("additionsHide");
        sectionTitleWrapper.classList.remove("additions-visible");
        additionList.style.height = 0;
      }
    });

    addItemLi.appendChild(addBtn);
    additionList.appendChild(addItemLi);

    sectionTitleWrapper.appendChild(sectionTitle);

    sectionItem.appendChild(sectionTitleWrapper);
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

  collectData() {
    const collectedData = {};

    const dataList = document.querySelector(".redact-form__items");
    dataList.querySelectorAll(".redact-form__item").forEach((li) => {
      if (li.classList.contains("redact-form__item-addition")) {
        const additionsList = li.querySelector(".redact-form__additions");
        const { additionKey, additionData } =
          this.collectAdditionData(additionsList);
        collectedData[additionKey] = additionData;
      } else {
        const input = li.querySelector(".redact-form__input");
        if (input) {
          collectedData[input.name] = input.value;
        }
      }
    });

    return JSON.stringify(collectedData);
  }

  collectAdditionData(additionsList) {
    let additionKey = "";
    let additionData = [];

    switch (additionsList.id) {
      case "redactTypesList":
        additionKey = "types";
        additionData = this.collectDefaultAdditionData(additionsList);
        break;

      case "redactSizesList":
        additionKey = "sizes";
        additionData = this.collectDefaultAdditionData(additionsList);
        break;

      case "redactColorsList":
        additionKey = "colors";
        additionData = this.collectColorData(additionsList);
        break;

      default:
        throw new Error("uncorrect list id");
    }

    return { additionKey, additionData };
  }

  collectDefaultAdditionData(list) {
    const additionData = [];
    const inputs = list.querySelectorAll("input[type='text']");
    inputs.forEach((input) => {
      if (input.value.trim() !== "") {
        additionData.push({
          value: input.name.trim(),
          text: input.value.trim(),
        });
      }
    });
    return additionData;
  }

  collectColorData(colorsList) {
    const colorsData = [];
    const additions = colorsList.querySelectorAll(".addition");
    additions.forEach((addition) => {
      let colorValue = "";
      let colorName = "";
      const inputs = addition.querySelectorAll("input");

      inputs.forEach((input) => {
        if (input.type === "color") {
          colorValue = input.value;
        } else if (input.type === "text") {
          colorName = input.value.trim();
        }
      });

      if (colorName.trim() !== "") {
        colorsData.push({ value: colorValue, text: colorName });
      }
    });
    return colorsData;
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
