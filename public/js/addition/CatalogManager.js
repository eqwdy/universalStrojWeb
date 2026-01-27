import {
  getCards,
  deleteAllCards,
  createExamplesCards,
  deleteCardsById,
} from "../backendRequsts/cardsCRUD.js";
import { getJWTToken } from "./jwtTokenControl.js";

class CatalogManager {
  async renderCatalogCards(container, options = {}) {
    const { count = null, token = null } = options;
    try {
      const fragment = document.createDocumentFragment();

      const cards = await this.getCards(count);

      if (token) {
        for (const card of cards) {
          const catalogItem = await this.createAdminCatalogItem(card);
          fragment.appendChild(catalogItem);
        }
      } else {
        cards.forEach((card) => {
          const catalogItem = this.createCatalogItem(card);
          fragment.appendChild(catalogItem);
        });
      }

      container.appendChild(fragment);
    } catch (e) {
      badAnswerPopup("Ошибка при загрузке товаров");
      console.error(e);
    }
  }

  async initCatalog(container, options) {
    await this.renderCatalogCards(container, options);
    document.addEventListener("catalogCardDbChanged", async () => {
      container.querySelectorAll(".catalog__item").forEach((el) => el.remove());
      await this.renderCatalogCards(container, options);
    });
  }

  async renderCatalogControlButtons(container) {
    const { createExamplesButton, deleteAllButton } =
      this.createCatalogControlButtons();

    container.appendChild(createExamplesButton);
    container.appendChild(deleteAllButton);
  }

  createCatalogItem({ id, img, title, price, description }) {
    const titlePar = title.trim();
    const descriptionPar = description.trim();

    const li = document.createElement("li");
    li.classList.add("catalog__item");

    const link = document.createElement("a");
    link.href = `/catalog/card/${id}`;
    link.className = "link-reset";

    const article = document.createElement("article");
    article.className = "catalog__item-product product";

    const body = document.createElement("div");
    body.className = "product__body";

    const imgEl = this.createImgEl(img);
    const titleEl = this.createTitleEl(titlePar);
    const priceEl = this.createPriceEl(price);

    const descriptionEl = this.createDescriptionEl(descriptionPar);
    descriptionEl.dataset.fullText = description.trim();
    descriptionEl.textContent = this.getCuttedText(descriptionPar, 10);

    body.appendChild(titleEl);
    body.appendChild(priceEl);
    body.appendChild(descriptionEl);

    article.appendChild(imgEl);
    article.appendChild(body);

    link.appendChild(article);
    li.appendChild(link);

    return li;
  }

  async createAdminCatalogItem({
    id,
    img,
    title,
    price,
    types,
    sizes,
    colors,
    description,
  }) {
    const li = document.createElement("li");
    li.classList.add("catalog__item");

    const article = document.createElement("article");
    article.classList.add("catalog__item-product", "product");
    article.dataset.productId = id;

    const body = document.createElement("div");
    body.classList.add("product__body");

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("product__wrapper-img");

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("product__wrapper", "product__wrapper-title");

    const priceWrapper = document.createElement("div");
    priceWrapper.classList.add("product__wrapper", "product__wrapper-price");

    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add(
      "product__wrapper",
      "product__wrapper-description",
    );

    imgWrapper.appendChild(this.createImgEl(img, title));
    titleWrapper.appendChild(this.createTitleEl(title));
    priceWrapper.appendChild(this.createPriceEl(price));
    descriptionWrapper.appendChild(this.createDescriptionEl(description));

    body.append(titleWrapper, priceWrapper, descriptionWrapper);

    article.appendChild(imgWrapper);
    article.appendChild(body);

    const { redactButton, deleteButton, hrefButton } =
      this.createAdminButtons(id);

    deleteButton.addEventListener("click", async () => {
      try {
        const confirmText = "Вы уверены, что хотите удалить карточку товара?";
        const isAgree = await redactConfirm(confirmText);
        if (!isAgree) return;

        const asnwer = await deleteCardsById(id, getJWTToken());
        goodAnswerPopup("Карточка с товаром удалена!");
      } catch (e) {
        console.error(e);
        badAnswerPopup("Ошибка при удалении карточки товара!");
      }
    });

    const controlButtonsWrapper = document.createElement("div");
    controlButtonsWrapper.classList.add("product__button-wrapper");

    controlButtonsWrapper.appendChild(redactButton);
    controlButtonsWrapper.appendChild(deleteButton);

    article.appendChild(controlButtonsWrapper);
    article.appendChild(hrefButton);

    li.appendChild(article);

    return li;
  }

  createCatalogControlButtons() {
    const createExamplesButton = document.createElement("button");
    createExamplesButton.classList.add("button");
    createExamplesButton.textContent = "Создать экземляры";
    createExamplesButton.addEventListener("click", async () => {
      try {
        const asnwer = await createExamplesCards(getJWTToken());
        if (!asnwer || asnwer instanceof Error) {
          badAnswerPopup("Ошибка!");
        }

        goodAnswerPopup("Карточки товаров были созданы!");
      } catch (e) {
        badAnswerPopup("Ошибка при создании экземляров!");
        console.error(e);
        return;
      }
    });

    const deleteAllButton = document.createElement("button");
    deleteAllButton.classList.add("button", "button-red");
    deleteAllButton.textContent = "Удалить все";
    deleteAllButton.addEventListener("click", async () => {
      try {
        const asnwer = await deleteAllCards(getJWTToken());
        if (!asnwer || asnwer instanceof Error) {
          badAnswerPopup("Ошибка!");
        }

        goodAnswerPopup("Карточки товаров были удалены!");
      } catch (e) {
        badAnswerPopup("Ошибка при удалении всех карточек!");
        console.error(e);
        return;
      }
    });

    return { createExamplesButton, deleteAllButton };
  }

  createImgEl(imgSrc, title) {
    const divImg = document.createElement("div");
    divImg.classList.add("product__img");

    const imgItem = document.createElement("img");
    imgItem.src = `/static/${imgSrc}`;
    imgItem.alt = title;
    imgItem.loading = "lazy";
    imgItem.width = 250;
    imgItem.setAttribute("itemprop", "image");

    divImg.appendChild(imgItem);

    return divImg;
  }

  createTitleEl(title) {
    const titleEl = document.createElement("h3");
    titleEl.classList.add("product__title");
    titleEl.setAttribute("itemprop", "name");
    titleEl.textContent = title;

    return titleEl;
  }

  createPriceEl(price) {
    const priceEl = document.createElement("div");
    priceEl.classList.add("product__price");
    priceEl.setAttribute("itemprop", "price");
    priceEl.innerHTML = `${price}&nbsp;₽`;

    return priceEl;
  }

  createDescriptionEl(description) {
    const desc = document.createElement("p");
    desc.classList.add("product__description");
    desc.setAttribute("data-role", "productDescription");
    desc.setAttribute("itemprop", "description");
    desc.textContent = description.trim();

    return desc;
  }

  createRedactEl() {
    const redactElData = document.createElement("span");
    redactElData.classList.add("product__redact");
    const redactSvg = document.createElement("img");
    redactSvg.src = "../../images/header/pencil.svg";

    redactElData.appendChild(redactSvg);

    return redactElData;
  }

  createAdminButtons(id) {
    const redactButton = document.createElement("button");
    redactButton.classList.add(
      "product__button-redact",
      "product__button-absolute",
      "button-reset",
    );
    redactButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-width="0"/>
    <g stroke-linecap="round" stroke-linejoin="round"/>
    <g> <path d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z" stroke="#000000" stroke-width="1.8240000000000003" stroke-linecap="round" stroke-linejoin="round"/> </g>
    </svg>`;
    redactButton.type = "button";
    redactButton.setAttribute("aria-controls", "overlayRedact");
    redactButton.dataset.productId = id;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "product__button-delete",
      "product__button-absolute",
      "button-reset",
    );
    deleteButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke-width="0"></g>
      <g stroke-linecap="round" stroke-linejoin="round"></g>
      <path d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ee2020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>`;
    deleteButton.type = "button";
    deleteButton.dataset.productId = id;

    const hrefButton = document.createElement("a");
    hrefButton.href = `/catalog/card/${id}`;
    hrefButton.classList.add("product__button", "button", "button-arrow");
    hrefButton.textContent = "Перейти к карточке товара";

    return { redactButton, deleteButton, hrefButton };
  }

  async getCards(count = null) {
    try {
      let cards = await getCards();

      if (!cards || cards instanceof Error || cards.length === 0) {
        badAnswerPopup("Товары сейчас не доступны");
      }

      if (count) {
        cards = cards.slice(0, count);
      }

      return cards;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  getCuttedText(text, maxWords) {
    const words = text.split(/\s+/);
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + " …"
      : text;
  }
}

export default new CatalogManager();
