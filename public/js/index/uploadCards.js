import CatalogManager from "../addition/CatalogManager.js";

const catalogContainer = document.getElementById("catalogItems");
await CatalogManager.initCatalog(catalogContainer, { count: 4 });
