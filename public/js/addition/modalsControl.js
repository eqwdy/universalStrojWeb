export function openOverlay(overlay, form) {
  document.body.style.overflow = "hidden";
  overlay.setAttribute("aria-hidden", "false");
  const firstInput = form.querySelector("input, textarea, button");
  if (firstInput) setTimeout(() => firstInput.focus(), 400);
}

export function closeOverlay(overlay) {
  document.activeElement.blur();
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resetErrorsField();
}

export function resetErrorsField() {
  let inputs = document.querySelectorAll(".just-validate-error-field");
  if (inputs) {
    inputs.forEach((input) => {
      input.classList.remove("just-validate-error-field");
      input.removeAttribute("data-just-validate-fallback-disabled");
      input.removeAttribute("style");

      const errorLabel = input
        .closest(".form__item")
        ?.querySelector(".just-validate-error-label");
      if (errorLabel) errorLabel.remove();
    });
  }
}

export function smartOpenOverlay(overlay, form, btn) {
  btn.setAttribute("aria-expanded", "true");
  openOverlay(overlay, form);
}

export function smartCloseOverlay(overlay, btn) {
  closeOverlay(overlay);
  btn.setAttribute("aria-expanded", "false");
  btn.focus();
}

export function choseCloseOverlay(overlay, btn = null) {
  if (btn) {
    smartCloseOverlay(overlay, btn);
  } else {
    closeOverlay(overlay);
  }
}

export function animatedClose(overlay, form, btn = null) {
  form.style.transform = "translateY(-140%) scale(0.6)";
  setTimeout(() => {
    choseCloseOverlay(overlay, btn);
    form.style.transform = "";
  }, 300);
}

export function focusTrapHandler(e, overlay, btn = null) {
  if (e.key === "Tab") {
    const focusableElements = overlay.querySelectorAll(
      'button, textarea, input, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  if (e.key === "Escape") {
    choseCloseOverlay(overlay, btn);
  }
}

export function windowClickCloseOverlayHandler(e, overlay, form, btn = null) {
  const overlayStatus = overlay.getAttribute("aria-hidden") === "false";

  if (overlayStatus && !form.contains(e.target)) {
    choseCloseOverlay(overlay, btn);
  }
}
