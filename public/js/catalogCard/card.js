import { ProductCard } from "../addition/ProductCard.js";
import { getCardById } from "../backendRequsts/cardsCRUD.js";

function getIdFromPath(path) {
  const match = path.match(/\/([^\/]+)\/?$/);
  return match ? match[1] : null;
}

const id = getIdFromPath(window.location.pathname);
if (!id) {
  badAnswer("ID товара не обнаружен");
  console.error("ID не обнаружен");
} else {
  renderCatalogCard(id);
}

async function renderCatalogCard(id) {
  const productCard = new ProductCard(await getCardById(id));
  if (!productCard || productCard instanceof Error) {
    badAnswerPopup("Товары не найдены");
  }

  const container = document.getElementById("cardContainer");
  if (container) {
    productCard.render(container);
  }
}
