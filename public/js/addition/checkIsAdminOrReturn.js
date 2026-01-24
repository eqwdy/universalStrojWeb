import { authAdmin } from "../backendRequsts/adminsCRUD.js";
import { getJWTToken, setJWTToken } from "./jwtTokenControl.js";

export default async function checkIsAdminOrReturn() {
  const token = getJWTToken();
  if (!token) {
    window.location.href = "/";
    return;
  }

  const newToken = await authAdmin(token);
  if (newToken instanceof Error) {
    window.location.href = "/";
    return;
  }

  setJWTToken(newToken);
  return true;
}
