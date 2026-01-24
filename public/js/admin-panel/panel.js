import AdminsList from "../addition/AdminList.js";
import CAdminInfo from "../addition/C-AdminInfo.js";
// import { getUser } from "../backendRequsts/usersCRUD.js";
// import { getJWTToken } from "../addition/jwtTokenControl.js";
import CatalogManager from "../addition/CatalogManager.js";

const cAdminContainer = document.getElementById("cAdminContainer");
const adminsContainer = document.getElementById("adminsContainer");

try {
  const cAdminInfo = new CAdminInfo(cAdminContainer);
  cAdminInfo.render();
} catch (e) {
  console.error(e);
}

try {
  const adminsList = new AdminsList(adminsContainer);
  adminsList.render().then(() => {
    document.dispatchEvent(new Event("adminsRendered"));
  });
} catch (e) {
  console.error(e);
}

try {
  const catalogContainer = document.getElementById("catalogItems");
  CatalogManager.renderCatalogCards(4, catalogContainer);
} catch (e) {
  console.error(e);
}
