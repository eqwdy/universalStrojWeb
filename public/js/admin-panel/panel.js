import AdminsList from "../addition/AdminList.js";
// import { getUser } from "../backendRequsts/usersCRUD.js";
// import { getJWTToken } from "../addition/jwtTokenControl.js";

// const nameEl = document.getElementById("userName");
// const telEl = document.getElementById("userTel");
// const user = await getUser(getJWTToken());
// nameEl.textContent = `Имя: ${user.name}`;
// telEl.textContent = `Телефон: ${user.tel}`;

const adminsContainer = document.getElementById("adminsContainer");
const adminsList = new AdminsList(adminsContainer);
adminsList.render().then(() => {
  document.dispatchEvent(new Event("adminsRendered"));
});
