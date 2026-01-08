const popup = document.getElementById("popup");
const popupInner = document.getElementById("popupInner");
const popupClose = document.getElementById("popupClose");

let popupTimer;
function openPopup() {
  clearTimeout(popupTimer);
  popup.setAttribute("aria-hidden", "false");

  const timerBar = popup.querySelector(".popup__timer");
  timerBar.style.animation = "none";
  timerBar.offsetHeight;
  timerBar.style.animation = "timerBar 3s linear forwards";
}
function closePopup() {
  popup.setAttribute("aria-hidden", "true");
}
function togglePopup() {
  openPopup();
  popupTimer = setTimeout(closePopup, 3000);
}

function redactPopup(text) {
  popupInner.innerHTML = text;
}
popupClose.addEventListener("click", closePopup);
function triggerShakePopup() {
  popup.classList.add("shake");
  popup.addEventListener(
    "animationend",
    () => {
      popup.classList.remove("shake");
    },
    { once: true }
  );
}

function goodAnswerPopup(text) {
  redactPopup(text);
  popup.querySelector(".popup__timer").style.backgroundColor =
    "var(--color-popup-timer-green)";
  togglePopup();
}
function badAnswerPopup(text) {
  redactPopup(text);
  popup.querySelector(".popup__timer").style.backgroundColor =
    "var(--color-popup-timer-red)";
  togglePopup();
  triggerShakePopup();
}
