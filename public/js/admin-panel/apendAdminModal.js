import { getJWTToken, setJWTToken } from "../addition/jwtTokenControl.js";
import { createAdmin } from "../backendRequsts/adminsCRUD.js";

const overlay = document.getElementById("overlay");
const form = document.getElementById("form");
function openOverlay() {
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => form.focus(), 300);
}
function closeOverlay() {
  document.activeElement.blur();
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resetErrorsField();
}
function resetErrorsField() {
  let inputs = document.querySelectorAll(".just-validate-error-field");
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
let openModalBtns = document.querySelectorAll('[aria-controls="overlay"]');
document.addEventListener("adminsRendered", () => {
  openModalBtns = document.querySelectorAll('[aria-controls="overlay"]');
});
let openedModalBtn = null;
document.addEventListener("click", (e) => {
  const btn = e.target.closest('[aria-controls="overlay"]');
  if (btn) {
    smartOpenOverlay(btn);
  }
});

const formClose = document.getElementById("formClose");
formClose.addEventListener("click", (e) => {
  // Animation
  form.style.transform = "translateY(-140%) scale(0.6)";
  setTimeout(() => {
    if (openedModalBtn) {
      smartCloseOverlay(openedModalBtn);
    } else {
      closeOverlay();
    }

    form.style.transform = "";
  }, 300);
});
window.addEventListener("click", (e) => {
  const overlayStatus = overlay.getAttribute("aria-hidden") === "false";
  if (overlayStatus && e.target === overlay) {
    if (openedModalBtn) {
      smartCloseOverlay(openedModalBtn);
    } else {
      closeOverlay();
    }
  }
});

overlay.addEventListener("keydown", (e) => {
  // focus trap
  if (e.key === "Tab") {
    const focusableElements = form.querySelectorAll(
      'button, textarea, input, [tabindex]:not([tabindex="-1"])',
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
    if (openedModalBtn) {
      smartCloseOverlay(openedModalBtn);
    } else {
      closeOverlay();
    }
  }
});

const validator = new JustValidate("#form");
const formTel = document.getElementById("formTel");
const formTelMask = new Inputmask("+7(999) 999-99-99");
formTelMask.mask(formTel);

validator
  .addField("#formName", [
    {
      rule: "required",
      errorMessage: "Введите имя!",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа!",
    },
  ])
  .addField("#formTel", [
    {
      validator: () => {
        const digits = formTel.inputmask.unmaskedvalue();
        return digits.length >= 10;
      },
      errorMessage: "Введите телефон!",
    },
  ])
  .addField("#formPass", [
    {
      rule: "required",
      errorMessage: "Введите пароль!",
    },
    {
      rule: "minLength",
      value: 4,
      errorMessage: "Минимум 4 символа!",
    },
  ])
  .onSuccess(async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const answer = await createAdmin(formData, getJWTToken());
    if (answer instanceof Error) {
      return badAnswerPopup("Ошибка при регистрации");
    }

    if (answer.status !== "success") {
      console.error(answer);
      return badAnswerPopup("Ошибка при регистрации админа");
    }

    goodAnswerPopup("Регистрация прошла успешно");
    console.log(answer);
    form.reset();
  });
