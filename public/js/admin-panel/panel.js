import AdminsList from "../addition/AdminList.js";
import CAdminInfo from "../addition/C-AdminInfo.js";
import { getJWTToken } from "../addition/jwtTokenControl.js";
import CatalogManager from "../addition/CatalogManager.js";

const cAdminContainer = document.getElementById("cAdminContainer");
const adminsContainer = document.getElementById("adminsContainer");
const catalogContainer = document.getElementById("catalogContainer");
const catalogControlButtonsContainer = document.getElementById(
  "catalogControlButtonsContainer",
);

try {
  const cAdminInfo = new CAdminInfo(cAdminContainer);
  cAdminInfo.render();
} catch (e) {
  console.error(e);
}

try {
  const adminsList = new AdminsList(adminsContainer);
  adminsList.render();
} catch (e) {
  console.error(e);
}

try {
  CatalogManager.initCatalog(catalogContainer, {
    token: getJWTToken(),
  }).then(() => {
    CatalogManager.renderCatalogControlButtons(catalogControlButtonsContainer);
  });
} catch (e) {
  console.error(e);
}
