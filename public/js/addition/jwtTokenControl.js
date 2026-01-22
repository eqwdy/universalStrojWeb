export function getJWTToken() {
  return localStorage.getItem("jwt");
}

export function setJWTToken(token) {
  localStorage.setItem("jwt", token);
}
