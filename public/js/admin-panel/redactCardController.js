import {
  smartOpenOverlay,
  choseCloseOverlay,
  animatedClose,
  windowClickCloseOverlayHandler,
  focusTrapHandler,
} from "../addition/modalsControl.js";

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
