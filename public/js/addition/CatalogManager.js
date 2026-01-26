import {
  getCards,
  deleteAllCards,
  createExamplesCards,
} from "../backendRequsts/cardsCRUD.js";
import { getJWTToken } from "./jwtTokenControl.js";

class CatalogManager {
  async renderCatalogCards(container, options = {}) {
    const { count = null, token = null } = options;
    try {
      const fragment = document.createDocumentFragment();

      const cards = await this.getCards(count);

      if (token) {
        cards.forEach((card) => {
          const catalogItem = this.createAdminCatalogItem(card);
          fragment.appendChild(catalogItem);
        });
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

  createAdminCatalogItem({
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
    imgWrapper.classList.add("product__wrapper", "product__wrapper-img");

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("product__wrapper", "product__wrapper-title");

    const priceWrapper = document.createElement("div");
    priceWrapper.classList.add("product__wrapper", "product__wrapper-price");

    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add(
      "product__wrapper",
      "product__wrapper-description",
    );

    const redactButton = document.createElement("button");
    redactButton.classList.add("product__button-redact", "button");
    redactButton.textContent = "Редактировать";
    redactButton.addEventListener("click", () => {});
    redactButton.type = "button";
    redactButton.setAttribute("aria-controls", "overlayRedact");
    redactButton.dataset.productId = id;

    const hrefButton = document.createElement("a");
    hrefButton.href = `/catalog/card/${id}`;
    hrefButton.classList.add("product__button", "button", "button-arrow");
    hrefButton.textContent = "Перейти к карточке товара";

    imgWrapper.appendChild(this.createImgEl(img, title));
    titleWrapper.appendChild(this.createTitleEl(title));
    priceWrapper.appendChild(this.createPriceEl(price));
    descriptionWrapper.appendChild(this.createDescriptionEl(description));

    body.append(titleWrapper, priceWrapper, descriptionWrapper);

    article.appendChild(imgWrapper);
    article.appendChild(body);
    article.appendChild(redactButton);
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
