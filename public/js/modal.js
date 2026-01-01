const overlay = document.getElementById("overlay");
const form = document.getElementById("form");
function openOverlay() {
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => form.focus(), 300);
}
function closeOverlay() {
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resetErrorsField();
}
function resetErrorsField() {
  inputs = document.querySelectorAll(".just-validate-error-field");
  inputs.forEach((input) => {
    input.classList.remove("just-validate-error-field");
    input.removeAttribute("data-just-validate-fallback-disabled");
    input.removeAttribute("style");

    input
      .closest(".form__item")
      .querySelector(".just-validate-error-label")
      .remove();
  });
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

const formClose = document.getElementById("formClose");
formClose.addEventListener("click", (e) => {
  // Animation
  form.style.transform = "translateY(-140%) scale(0.6)";
  setTimeout(() => {
    if (openedBtn) {
      smartCloseOverlay(openedBtn);
    } else {
      closeOverlay();
    }

    form.style.transform = "";
  }, 300);
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

const validator = new JustValidate("#form");
validator
  .addField("#formName", [
    {
      rule: "required",
      errorMessage: "Введите ваше имя!",
    },
  ])
  .addField("#formTel", [
    {
      rule: "required",
      errorMessage: "Введите ваш телефон!",
    },
  ])
  .onSuccess((e) => {
    e.preventDefault();

    const formEl = e.target;
    formEl.reset();
    if (openedBtn) {
      smartCloseOverlay(openedBtn);
    } else {
      closeOverlay();
    }

    // AJAX
    togglePopup();
  });
