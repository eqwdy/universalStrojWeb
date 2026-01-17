const burger = document.getElementById("burger");
const burgerBtn = document.getElementById("burgerBtn");
const burgerInner = document.getElementById("burgerInner");
const burgerClose = document.getElementById("burgerClose");
function openBurger() {
  burgerBtn.setAttribute("aria-expanded", "true");
}
function closeBurger() {
  burgerBtn.setAttribute("aria-expanded", "false");
}

burgerBtn.addEventListener("click", openBurger);
burgerClose.addEventListener("click", closeBurger);
