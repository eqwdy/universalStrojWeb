import {
  smartOpenOverlay,
  animatedClose,
  windowClickCloseOverlayHandler,
  focusTrapHandler,
} from "../addition/modalsControl.js";
import {
  resize,
  createAddition,
  setValueHandler,
} from "../addition/redactCardAdditions.js";
import { getCardById } from "../backendRequsts/cardsCRUD.js";

const overlayRedact = document.getElementById("overlayRedact");
const formRedact = document.getElementById("formRedact");
const formRedactClose = document.getElementById("formRedactClose");
let openedOverlayRedactButton = null;

formRedactClose.addEventListener("click", () => {
  animatedClose(overlayRedact, formRedact, openedOverlayRedactButton);
});

window.addEventListener("mousedown", async (e) => {
  const btn = e.target.closest(`[aria-controls="${overlayRedact.id}"]`);
  if (btn) {
    openedOverlayRedactButton = btn;

    if (openedOverlayRedactButton.dataset.productId) {
      const id = openedOverlayRedactButton.dataset.productId;
      if (document.getElementById("redactTypesList")) {
        // Сравнивать с данными внутри и перерисовывать при необходимости
        document.getElementById("redactTypesList").closest("li").remove();
      }
      if (document.getElementById("redactSizesList")) {
        // Сравнивать с данными внутри и перерисовывать при необходимости
        document.getElementById("redactSizesList").closest("li").remove();
      }
      if (document.getElementById("redactColorsList")) {
        // Сравнивать с данными внутри и перерисовывать при необходимости
        document.getElementById("redactColorsList").closest("li").remove();
      }

      const card = await getCardById(id);
      console.log(card);
      setValueHandler(card);
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

formRedact.addEventListener("click", (e) => {
  if (e.target.closest(".addition__delete")) {
    e.stopPropagation();
    e.target.closest(".redact-form__addition").remove();
  } else if (e.target.closest(".addition__add")) {
    e.stopPropagation();
    const newLi = createAddition();
    const addBtnLi = e.target.closest("li");
    const redactAdditionsList = addBtnLi.closest(".redact-form__additions");
    redactAdditionsList.insertBefore(newLi, addBtnLi);
    resize(newLi.querySelector(".addition__content"));
  }
});
