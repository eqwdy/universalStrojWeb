import {
  smartOpenOverlay,
  animatedClose,
  windowClickCloseOverlayHandler,
  focusTrapHandler,
} from "../addition/modalsControl.js";
import { resize, createAddition } from "../addition/redactCardAdditions.js";

const overlayRedact = document.getElementById("overlayRedact");
const formRedact = document.getElementById("formRedact");
const formRedactClose = document.getElementById("formRedactClose");
let openedOverlayRedactButton = null;

formRedactClose.addEventListener("click", () => {
  animatedClose(overlayRedact, formRedact, openedOverlayRedactButton);
});

window.addEventListener("mousedown", (e) => {
  const btn = e.target.closest(`[aria-controls="${overlayRedact.id}"]`);
  if (btn) {
    openedOverlayRedactButton = btn;

    if (openedOverlayRedactButton.dataset.productId) {
      formRedact.dataset.productId =
        openedOverlayRedactButton.dataset.productId;
    }

    smartOpenOverlay(overlayRedact, formRedact, openedOverlayRedactButton);
  } else {
    windowClickCloseOverlayHandler(
      e,
      overlayRedact,
      formRedact,
      openedOverlayRedactButton,
    );
  }
});

overlayRedact.addEventListener("keydown", (e) => {
  focusTrapHandler(e, overlayRedact);
});

formRedact.addEventListener("input", (e) => {
  if (e.target.classList.contains("addition__content")) {
    const input = e.target;
    resize(input);
    input.name = input.value.trim() || " ";
  }
});

const redactAdditionsList = document.getElementById("redactAdditionsList");
formRedact.addEventListener("click", (e) => {
  if (e.target.closest(".addition__delete")) {
    e.stopPropagation();
    e.target.closest(".redact-form__addition").remove();
  } else if (e.target.closest(".addition__add")) {
    e.stopPropagation();
    const newLi = createAddition();
    const addBtnLi = redactAdditionsList
      .querySelector(".addition__add")
      .closest("li");
    redactAdditionsList.insertBefore(newLi, addBtnLi);
    resize(newLi.querySelector(".addition__content"));
  }
});
