import { getCards } from "../backendRequsts/dbCardsCRUD.js";

class CatalogManager {
  async renderAllCatalogCards(container) {
    try {
      const cards = await getCards();

      if (!cards || cards instanceof Error || cards.length === 0) {
        window.location.href = "/";
        return;
      }

      cards.forEach((card) => {
        const catalogItem = this.createCatalogItem(card);
        container.appendChild(catalogItem);
      });
    } catch (e) {
      badAnswerPopup("Ошибка при загрузке товаров");
      console.error(e);
    }
  }

  async renderCatalogCards(count, container) {
    try {
      const cards = await getCards();

      if (!cards || cards instanceof Error || cards.length === 0) {
        badAnswerPopup("Товары сейчас не доступны");
      }

      const fragment = document.createDocumentFragment();
      cards.slice(0, count).forEach((card) => {
        const catalogItem = this.createCatalogItem(card);
        fragment.appendChild(catalogItem);
      });

      container.appendChild(fragment);
    } catch (e) {
      badAnswerPopup("Ошибка при загрузке товаров");
      console.error(e);
    }
  }

  createCatalogItem({ id, img, title, price, description }) {
    const li = document.createElement("li");
    li.className = "catalog__item";

    const a = document.createElement("a");
    a.href = `/catalog/card/${id}`;
    a.className = "link-reset";

    const article = document.createElement("article");
    article.className = "catalog__item-product product";

    const divImg = document.createElement("div");
    divImg.className = "product__img";

    const imgItem = document.createElement("img");
    imgItem.src = `/static/${img}`;
    imgItem.alt = title;
    imgItem.loading = "lazy";
    imgItem.width = 250;
    imgItem.setAttribute("itemprop", "image");

    divImg.appendChild(imgItem);

    const wrapper = document.createElement("div");
    wrapper.className = "product__wrapper";

    const h3 = document.createElement("h3");
    h3.className = "product__title";
    h3.setAttribute("itemprop", "name");
    h3.textContent = title;

    const divPrice = document.createElement("div");
    divPrice.className = "product__price";
    divPrice.setAttribute("itemprop", "price");
    divPrice.innerHTML = `${price}&nbsp;₽`;

    const p = document.createElement("p");
    p.className = "product__description";
    p.setAttribute("data-role", "productDescription");
    p.setAttribute("itemprop", "description");
    p.dataset.fullText = description.trim();
    p.textContent = this.getCuttedText(p.dataset.fullText, 10);

    wrapper.appendChild(h3);
    wrapper.appendChild(divPrice);
    wrapper.appendChild(p);

    article.appendChild(divImg);
    article.appendChild(wrapper);

    a.appendChild(article);
    li.appendChild(a);

    return li;
  }

  getCuttedText(text, maxWords) {
    const words = text.split(/\s+/);
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + " …"
      : text;
  }
}

export default new CatalogManager();
