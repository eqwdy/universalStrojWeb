import { authAdmin } from "../backendRequsts/adminsCRUD.js";

export default async function checkIsAdminOrReturn() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    window.location.href = "/";
    return;
  }

  const newToken = await authAdmin(token);
  if (newToken instanceof Error) {
    window.location.href = "/";
    return;
  }

  localStorage.setItem("jwt", newToken);
  return true;
}
