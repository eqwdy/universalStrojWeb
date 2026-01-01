const overlay = document.getElementById("overlay");
const card = document.getElementById("card");
let cardImg = document.getElementById("cardImg");
let cardTitle = card.querySelector("card__title");
let cardPrice = card.querySelector("card__price");
let cardDesc = card.querySelector("card__description");
function openOverlay() {
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => card.focus(), 300);
}
function closeOverlay() {
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function smartOpenOverlay(btn) {
  openOverlay();
  btn.setAttribute("aria-expanded", "true");
}
function smartCloseOverlay(btn) {
  closeOverlay();
  btn.setAttribute("aria-expanded", "false");
  btn.focus();
}
const openBtns = document.querySelectorAll('[aria-controls="overlay"]');
let openedBtn = null;
openBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    openedBtn = btn;
    if (openedBtn) {
      smartOpenOverlay(openedBtn);
    } else {
      openOverlay();
    }
  });
});

const cardClose = document.getElementById("cardClose");
cardClose.addEventListener("click", (e) => {
  if (openedBtn) {
    smartCloseOverlay(openedBtn);
  } else {
    closeOverlay();
  }
});
window.addEventListener("click", (e) => {
  const overlayStatus = overlay.getAttribute("aria-hidden") === "false";
  if (overlayStatus && e.target === overlay) {
    if (openedBtn) {
      smartCloseOverlay(openedBtn);
    } else {
      closeOverlay();
    }
  }
});

overlay.addEventListener("keydown", (e) => {
  // focus trap
  if (e.key === "Tab") {
    const focusableElements = form.querySelectorAll(
      'button, textarea, input, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift+Tab → если на первом элементе, прыгнуть на последний
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab → если на последнем элементе, прыгнуть на первый
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  if (e.key === "Escape") {
    if (openedBtn) {
      smartCloseOverlay(openedBtn);
    } else {
      closeOverlay();
    }
  }
});
