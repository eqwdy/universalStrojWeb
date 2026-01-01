const popup = document.getElementById("popup");
const popupInner = document.getElementById("popupInner");
const popupClose = document.getElementById("popupClose");
function openPopup() {
  popup.setAttribute("aria-hidden", "false");
}
function closePopup() {
  popup.setAttribute("aria-hidden", "true");
}
function togglePopup() {
  openPopup();
  setTimeout(closePopup, 3000);
}

function redactPopup(text) {
  popupInner.textContent = text;
}

function showCustomPopup(text) {
  redactPopup(text);
  togglePopup();
}
popupClose.addEventListener("click", closePopup);
