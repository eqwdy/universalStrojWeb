import { getJWTToken } from "../addition/jwtTokenControl.js";
import { createAdmin } from "../backendRequsts/adminsCRUD.js";
import {
  smartOpenOverlay,
  choseCloseOverlay,
  animatedClose,
  windowClickCloseOverlayHandler,
  focusTrapHandler,
} from "../addition/modalsControl.js";

const overlayAdmins = document.getElementById("overlay");
const formAdmins = document.getElementById("form");
const formAdminsClose = document.getElementById("formClose");
let openedOverlayAdminsButton = null;

formAdminsClose.addEventListener("click", () => {
  animatedClose(overlayAdmins, formAdmins, openedOverlayAdminsButton);
});

window.addEventListener("mousedown", (e) => {
  const btn = e.target.closest(`[aria-controls="${overlayAdmins.id}"]`);
  if (btn) {
    openedOverlayAdminsButton = btn;
    smartOpenOverlay(overlayAdmins, formAdmins, openedOverlayAdminsButton);
  } else {
    windowClickCloseOverlayHandler(
      e,
      overlayAdmins,
      formAdmins,
      openedOverlayAdminsButton,
    );
  }
});

overlayAdmins.addEventListener("keydown", (e) => {
  focusTrapHandler(e, overlayAdmins);
});

const validator = new JustValidate("#form");
const formAdminsTel = document.getElementById("formTel");
const formAdminsTelMask = new Inputmask("+7(999) 999-99-99");
formAdminsTelMask.mask(formAdminsTel);

validator
  .addField("#formName", [
    { rule: "required", errorMessage: "Введите имя!" },
    { rule: "minLength", value: 2, errorMessage: "Минимум 2 символа!" },
  ])
  .addField("#formTel", [
    {
      validator: () => {
        const digits = formAdminsTel.inputmask.unmaskedvalue();
        return digits.length >= 10;
      },
      errorMessage: "Введите телефон!",
    },
  ])
  .addField("#formPass", [
    { rule: "required", errorMessage: "Введите пароль!" },
    { rule: "minLength", value: 4, errorMessage: "Минимум 4 символа!" },
  ])
  .onSuccess(async (e) => {
    e.preventDefault();
    const formAdminsData = new FormData(formAdmins);

    try {
      const answer = await createAdmin(formAdminsData, getJWTToken());

      if (answer instanceof Error) {
        switch (answer.message) {
          case "Missing or uncorrect name":
            return badAnswerPopup("Некоррекное имя!");

          case "Missing or uncorrect telephone":
            return badAnswerPopup("Некоррекный телефон!");

          case "Missing or uncorrect password":
            return badAnswerPopup("Некоррекный пароль!");

          case "This telephone is already in use":
            return badAnswerPopup("Этот телефон уже используется!");

          default:
            return badAnswerPopup("Ошибка при регистрации!");
        }
      }

      if (answer.status !== "success") {
        console.error(answer);
        return badAnswerPopup("Ошибка при регистрации админа!");
      }

      goodAnswerPopup("Регистрация прошла успешно!");
      formAdmins.reset();
      choseCloseOverlay(overlayAdmins, openedOverlayAdminsButton);

      document.dispatchEvent(new Event("adminAdded"));
    } catch (e) {
      console.error(e);
      return badAnswer("Неожиданная ошибка при обновлении информации товара");
    }
  });
