import {
  smartOpenOverlay,
  animatedClose,
  windowClickCloseOverlayHandler,
  focusTrapHandler,
} from "../addition/modalsControl.js";
import RedactCardAdditionsController from "../addition/RedactCardAdditionsController.js";
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
      formRedact.dataset.productId = id;
      // Сравнивать с данными внутри и перерисовывать только при необходимости
      if (document.getElementById("redactTypesList")) {
        document.getElementById("redactTypesList").closest("li").remove();
      }
      if (document.getElementById("redactSizesList")) {
        document.getElementById("redactSizesList").closest("li").remove();
      }
      if (document.getElementById("redactColorsList")) {
        document.getElementById("redactColorsList").closest("li").remove();
      }

      const card = await getCardById(id);
      //   console.log(card);
      RedactCardAdditionsController.setValueHandler(card);
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
    RedactCardAdditionsController.resize(input);
    input.name = input.value.trim() || " ";
  }
});

formRedact.addEventListener("click", (e) => {
  if (e.target.closest(".addition__delete")) {
    e.stopPropagation();
    e.target.closest(".redact-form__addition").remove();
  } else if (e.target.closest(".addition__add")) {
    e.stopPropagation();
    const addItemLi = e.target.closest("li");
    const additionList = addItemLi.closest(".redact-form__additions");
    if (additionList.id === "redactColorsList") {
      const { additionItem, additionInput } =
        RedactCardAdditionsController.createAdditionColor();

      additionList.insertBefore(additionItem, addItemLi);
      RedactCardAdditionsController.resize(additionInput);
      additionInput.focus();
    } else {
      const { additionItem, additionInput } =
        RedactCardAdditionsController.createAddition();

      additionList.insertBefore(additionItem, addItemLi);
      RedactCardAdditionsController.resize(additionInput);
      additionInput.focus();
    }
  }
});
