import {
  smartOpenOverlay,
  choseCloseOverlay,
  animatedClose,
  windowClickCloseOverlayHandler,
  focusTrapHandler,
} from "../addition/modalsControl.js";

const overlay = document.getElementById("overlay");
const form = document.getElementById("form");
const formClose = document.getElementById("formClose");
let openedOverlayButton = null;

formClose.addEventListener("click", () => {
  animatedClose(overlay, form, openedOverlayButton);
});

window.addEventListener("mousedown", (e) => {
  const btn = e.target.closest(`[aria-controls="${overlay.id}"]`);
  if (btn) {
    openedOverlayButton = btn;
    smartOpenOverlay(overlay, form, openedOverlayButton);
  } else {
    windowClickCloseOverlayHandler(e, overlay, form, openedOverlayButton);
  }
});

overlay.addEventListener("keydown", (e) => {
  focusTrapHandler(e, overlay, openedOverlayButton);
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
  .onSuccess(async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let result = await sendDataToTg(formData);
    if (result.success) {
      goodAnswerPopup(
        "<span>Ваша заяка <br />отправленна!</span> <span>Мы вам перезвоним</span>",
      );

      form.reset();
      choseCloseOverlay(overlay, openedOverlayButton);
    } else {
      badAnswerPopup("<span>Ошибка при отправке!</span>");
    }
  });
